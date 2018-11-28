---
templateKey: blog-post
title: Building infinite scroll in React Native
date: 2016-12-15T12:00:00.000Z
author: "Robert DeLuca"
tags: 
  - react native
  - react
  - infinite scroll
  - impagination
image: /img/2016-12-15-building-infinite-scroll-in-react-native_react-native-header.jpg
description: Tackling infinite scroll can be hard on any platform. But thankfully React Native allows you to use base JavaScript libraries to solve problems in native apps. We're going to take Impagination.js and build an infinite scrolling list that is silky smooth and painless data management.
cta_text: Does your team need help building complex UI in React Native? Frontside can unblock your team and ship software with confidence regularly.
published: true
directory_index: false
---

In high school, I spent a long time trying to learn how to build iOS
apps. After many months of attempting what seemed impossible at the time,
I decided to throw in the towel. So I gave up and to went to design,
which ultimately led to web work.

That desire to build native mobile apps _never_ went away for me. But learning
an entirely new language and ecosystem wasn't something that I could do
in my spare time. So when React Native busted onto the scene in 2015
it caught my attention. Since it's written in JavaScript, React Native
allows you (the JS dev) to use technologies you're already familiar
with to build truly native apps.

Around the same time at The Frontside we started to write most of
our libraries in pure JavaScript. This allowed us to wrap those libraries in
whatever framework we happened to be working in at the time. That means
we can take problems we've solved in Ember apps and use them in a React Native
project. Which is exactly what we're going to do today!

### Introduction

The purpose of this post is to build an infinite scroll component for
React Native based
on
[Impagination.js](https://github.com/flexyford/impagination). We'll
talk more about Impagination a little later but for now, just know
Impagination is a lazy data layer for your paged records.

We're also going to lean on [NativeBase](http://nativebase.io/) for
nice prestyled native looking components. If you're coming from the
web think of NativeBase like Bootstrap. The main difference is the
styling will be tailored to the OS running the app. So in iOS, you're going
to get iOS styled elements and in Android, you'll get Android styled
elements.

The API we will be using is a Rails app that returns paginated data
which is generated from the [faker](https://github.com/stympy/faker)
gem. Impagination will work with any paginated API, so if you would
like you can sub in your own API here.

Here's an iOS screenshot of what we're going to build:

<img
src="/img/2016/12/15/building-infinite-scroll-in-react-native/impagination-react-native-ios.png"
alt="iOS Screenshot of the app we will be building"
style="width: 80%;"
/>

You can also check out the repo for what we're [going to
build here](https://github.com/Robdel12/robotImpagination). If you
haven't set up React Native on your machine yet, you should take a moment
and do that. The getting started docs are a
[great resource.](https://facebook.github.io/react-native/docs/getting-started.html)

To sum up our goals for this post into a list:

- Introduce Impagination
- Create the React Native app
- Create a component that will be shared in iOS and Android
- Use NativeBase for styling
- Create an Impagination dataset
- Render that dataset to the app screen
- Listen for scroll events to request new data


### Hello Impagination

Before we start actually building our app I want to take second to
talk about Impagination. Like I said earlier, Impagination is a lazy
data layer for your paged records. All you provide Impagination is the
logic to fetch a single page, plus how many records you want it to
pre-fetch ahead of you. Impagination will handle the rest for you.

Impagination is built using an event-driven immutable style and
has zero dependencies. That means you can use it anywhere that JS
can run! From the server to the client, it doesn't matter as long as
it's JS.

There are two required attributes for creating an Impagination
dataset: `fetch` and `pageSize`.

`fetch` is a function that will tell Impagination how to go get the
data you are requesting as you scroll through the infinite
list.

`pageSize` is an integer that tells Impagination how many
records are in each page.

Okay, that's enough of an introduction to Impagination. As we build
our app I will stop and explain more of Impagination as we build
the app.

### Creating the app

Let's start creating our React Native app! I'm going to call this app
`robotImpagination` since the gem generating our fake data uses a bunch of
different robots for images. Feel free to name your app whatever you like.

`react-native init robotImpagination`

This will create a hello world react native app. If you cd into that
directory and run `react-native run-ios` (or `react-native
run-android`) it should start the React Native packager, build the iOS
app, and launch the simulator.

Now that we have confirmed that the app will build, shut it all
down. We need to install a couple dependencies to build our infinite scroll.
Let's install NativeBase first: `yarn add native-base`.
Then Impagination: `yarn add impagination`. You should now
see both of those libraries in your `package.json` file.


### No place like Home

Make your way to the `index.ios.js` (or `index.android.js` if you're
doing android dev). You should see a couple imports and then a class
that's extending `Component`:

``` javascript
export default class robotImpagination extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit index.android.js
        </Text>
        <Text style={styles.instructions}>
          Double tap R on your keyboard to reload,{'\n'}
          Shake or press menu button for dev menu
        </Text>
      </View>
    );
  }
}
```

Delete everything inside of the render method. We're going to replace
that with a `<Home />` component. This component will be used in both
the `index.ios.js` & `index.android.js` files.

``` javascript
export default class robotImpagination extends Component {
  render() {
    return (
      <Home />
    );
  }
}
```

If you tried to run this right now, it wouldn't work. We still need to
create that component and import it. For smaller projects, I like to
put my components in a `components` folder. You can name it and place
it where ever you would like. For me it's `components` in the root of the
project: `robotImpagination/components/Home.js`

Inside of `Home.js` we should import React, the `Text` component from
React Native, and create a component that returns "Hello!":

``` javascript
import React, { Component } from 'react';
import { Text } from 'react-native';

export default class Home extends Component {
  render() {
    return (
      <Text>Hello!</Text>
    );
  }
}
```

Now that we've actually created the `<Home />` component we can import
and use it in both of our index files (`index.ios.js` & `index.android.js`).

Your index files should look something like this now:

``` javascript
import React, { Component } from 'react';

import {
  AppRegistry,
} from 'react-native';

import Home from './components/Home';

export default class robotImpagination extends Component {
  render() {
    return (
      <Home />
    );
  }
}

AppRegistry.registerComponent('robotImpagination', () => robotImpagination);
```

Awesome! If you refresh your simulator you should now see a poorly styled
"Hello!".

`<Home />` will be the main component we will be working out
of. This is so our code will run on both iOS & Android. Write once,
compile to both!

### Furnishing our Home

We now have an app that's uglier than what we started with. Don't
fret, we're going to call on NativeBase to make everything look nice
and clean. Inside of `Home.js` lets import four components:

``` javascript
// Native base for nice prestyled components
import {
  Header,
  Container,
  Title,
  Content,
} from 'native-base';
```

These components will provide the structure & styling going forward. I
recommend taking 10 minutes to review
the [NativeBase docs](http://nativebase.io/docs/v0.5.13/). Now we can
make our lonely "Hello!" text look much better:

``` javascript
// imports here

export default class Home extends Component {
  render() {
    return (
      <Container>
        <Header>
          <Title>Robot Impagination</Title>
        </Header>
        <Content>
          <Text>Hello!</Text>
        </Content>
      </Container>
    );
  }
}
```

This should give you a styled header with bold text inside of it and our
"Hello!" text isn't in the very top left of the device. Nice!

Next, we should create at least one "card" where we will be rendering the
content of each record into. Later on we will iterate over an array
returning many of these, but for now, we're only going to create one card.

Thankfully we don't have to style this ourselves since NativeBase has
a
[card component](http://nativebase.io/docs/v0.5.13/components#card). We
need to import two more components from NativeBase:

``` javascript
// Native base for nice prestyled components
import {
  Header,
  Container,
  Title,
  Content,
  Card,
  CardItem
} from 'native-base';
```

And additionally the `Image` component from `react-native`:

``` javascript
import {
  Image,
  Text,
} from 'react-native';
```

Now that we have access to these components lets fill it in:

``` javascript
// imports here

export default class Home extends Component {
  render() {
    return (
      <Container>
        <Header>
          <Title>Robot Impagination</Title>
        </Header>
        <Content>
          <Card style={{margin: 10}}>
            <CardItem>
              <Text>Hello!</Text>
            </CardItem>
            <CardItem>
              <Image style={{resizeMode: 'cover'}} source={{uri: "https://placekitten.com/640/440"}} />
            </CardItem>
            <CardItem>
              <Text>Item description</Text>
            </CardItem>
          </Card>
        </Content>
      </Container>
    );
  }
}

```

Our app should look something like this:

<img
  src="/img/2016-12-15-building-infinite-scroll-in-react-native_card-component-ios-screenshot.png"
  alt="iOS Screenshot of the new card component styling"
  style="width: 80%;"
/>

We have a nicely styled app with styled cards, lets start scrolling through
paginated data!

### Creating an Impagination dataset

The first thing we have to do is import Impagination into `Home.js`:

``` javascript
import Dataset from 'impagination';
```

Now create a method called `setupImpagination` inside of our Home
component. `setupImpagination` is where we're going to create a new
instance of Impagination, set the pageSize, and set the dataset on the
components local state. Earlier I mentioned that there are two
required params from Impagination to work. Let's start by filling in
those two params.

``` javascript
export default class Home extends Component {
  setupImpagination() {
    let dataset = new Dataset({
      pageSize: 15,

      // Where to fetch the data from.
      fetch(pageOffset, pageSize, stats) {
        return fetch(`https://serene-beach-38011.herokuapp.com/api/faker?page=${pageOffset + 1}&per_page=${pageSize}`)
          .then(response => response.json())
          .catch((error) => {
            console.error(error);
          });
      }
    });
  }

  render() {
    // ...
  }
}
```

The `fetch` function is where Impagination will hit your API to get
more pages. There are three arguments passed to the fetch function:
`pageOffset` which is the current page it's going to fetch, `pageSize`
which is a number of records in a page, and `stats` which can hold
`totalPages` if your API supports it.

**Note:** you may need to add one to `pageOffset` since it's zero
based.

This looks great! But we still have some work to do in order for it to
work. We currently have no way of accessing the data that is emitted by
Impagination.


Impagination has two different objects you will work with. One is
`state` which holds all of the current records and the current state
regarding that data. The other is the `dataset` which allows you to
call Impagination methods like `setReadOffset`.

A new `state` is emitted every single time the data has changed. We can
listen for these changes using Impagination's `observe` method:

``` javascript
export default class Home extends Component {
  setupImpagination() {
    let dataset = new Dataset({
      pageSize: 15,

      // Anytime there's a new state emitted, we want to set that on
      // the componets local state.
      observe: (datasetState) => {
        this.setState({datasetState});
      },

      // Where to fetch the data from.
      fetch(pageOffset, pageSize, stats) {
        return fetch(`https://serene-beach-38011.herokuapp.com/api/faker?page=${pageOffset + 1}&per_page=${pageSize}`)
          .then(response => response.json())
          .catch((error) => {
            console.error(error);
          });
      }
    });
  }

  render() {
    // ...
  }
}
```

Now that we're
[calling
`setState`](https://facebook.github.io/react/docs/react-component.html#setstate) we
have to create our state object in the component constructor:

``` javascript
export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dataset: null,
      datasetState: null,
    };
  }

  setupImpagination() { //... }
  render() { //... }
}
```

While we're here we'll also add `dataset` into our state object.

To pull all of this together and start fetching data we need to set the
dataset on the components local state. Then we need to set the
`readOffset` to record `0`. This is so Impagination knows exactly what
record you are on when scrolling through the list. If we get close to
the end it will automatically fetch new records. You can read more
about [how this all
works here.](https://github.com/flexyford/impagination#load-horizon)

The final look of our `setupImpagination` method:

``` javascript
export default class Home extends Component {
  constructor(props) { //... }

  setupImpagination() {
    let dataset = new Dataset({
      pageSize: 15,

      // Anytime there's a new state emitted, we want to set that on
      // the componets local state.
      observe: (datasetState) => {
        this.setState({datasetState});
      },

      // Where to fetch the data from.
      fetch(pageOffset, pageSize, stats) {
        return fetch(`https://serene-beach-38011.herokuapp.com/api/faker?page=${pageOffset + 1}&per_page=${pageSize}`)
          .then(response => response.json())
          .catch((error) => {
            console.error(error);
          });
      }
    });

    // Set the readOffset to the first record in the state
    dataset.setReadOffset(0);
    this.setState({dataset});
  }

  render() { //... }
}
```

Finally, as soon as the component starts to mount we want to setup our
data store. In `componentWillMount` lets call `setupImpagination`:

``` javascript
export default class Home extends Component {
  constructor(props) { //... }

  setupImpagination() { //... }

  componentWillMount() {
    this.setupImpagination();
  }

  render() { //... }
}
```

Bam! Now when the app loads it will go off and fetch the first 15
records from the API and set it on the local state of the
component. You can now access these records by doing
`this.state.datasetState`.

### Looping over the datasetState

With the styling and data now in place lets render it to the
screen. `this.state.datasetState` is an array-like object. This means we can
iterate over the state while still being able to access getters like
`this.state.datasetState.readOffset` (which returns the current
`readOffset`).

We're going to map over the Impagination `state` and return a card:

``` javascript
export default class Home extends Component {
  constructor(props) { //... }

  setupImpagination() { //... }

  componentWillMount() { //... }

  render() {
    return (
      <Container>
        <Header>
          <Title>Robot Impagination</Title>
        </Header>
        <Content>
          {this.state.datasetState.map(record => {
            return (
              <Card style={{margin: 10}}>
                <CardItem>
                  <Text>Hello!</Text>
                </CardItem>
                <CardItem>
                  <Image style={{resizeMode: 'cover'}} source={{uri: "https://placekitten.com/640/440"}} />
                </CardItem>
                <CardItem>
                  <Text>Item description</Text>
                </CardItem>
              </Card>
            );
          })}
        </Content>
      </Container>
    );
  }
}
```

If you refresh your simulator you should now see 15 kittens. But it's
15 cards with same text over and over again. We can start to pull
information from each record we're iterating over:

``` javascript
export default class Home extends Component {
  constructor(props) { //... }

  setupImpagination() { //... }

  componentWillMount() { //... }

  render() {
    return (
      <Container>
        <Header>
          <Title>Robot Impagination</Title>
        </Header>
        <Content>
          {this.state.datasetState.map(record => {
            return (
              <Card style={{margin: 10}}>
                <CardItem>
                  <Text>{record.content.title}</Text>
                </CardItem>
                <CardItem>
                  <Image style={{resizeMode: 'cover'}} source={{uri: record.content.image}} />
                </CardItem>
                <CardItem>
                  <Text>{record.content.description}</Text>
                </CardItem>
              </Card>
            );
          })}
        </Content>
      </Container>
    );
  }
}
```

Refreshing your simulator should bring up an error message that says
`Cannot read property 'title' of null`. This is because Impagination
emits an array with 15 items as soon as it's instantiated. Each record
in the array has five state properties:

- `isRequested`
- `isSettled`
- `isPending`
- `isResolved`
- `isRejected`

With these properties, we can tell exactly what state each record is
in. This allows us to display different UI for each individual record
if we please. In this case, we're going to show a loading spinner if
the record hasn't settled yet.

Import the spinner component from NativeBase:

``` javascript
// Native base for nice prestyled components
import {
  Header,
  Container,
  Title,
  Content,
  Card,
  CardItem,
  Spinner,
} from 'native-base';
```

Then add a conditional inside the map function that returns different
JSX:

``` javascript
export default class Home extends Component {
  constructor(props) { //... }

  setupImpagination() { //... }

  componentWillMount() { //... }

  render() {
    return (
      <Container>
        <Header>
          <Title>Robot Impagination</Title>
        </Header>
        <Content>
          {this.state.datasetState.map(record => {
            if (!record.isSettled) {
              return <Spinner key={Math.random()}/>;
            }

            return (
              <Card style={styles.cardContainer}>
                <CardItem>
                  <Text>{record.content.title}</Text>
                </CardItem>
                <CardItem>
                  <Image style={{resizeMode: 'cover'}} source={{uri: record.content.image}} />
                </CardItem>
                <CardItem>
                  <Text>{record.content.description}</Text>
                </CardItem>
              </Card>
            );
          })}
        </Content>
      </Container>
    );
  }
}
```

This is great! It now will render each record with their own
content. But it's pretty hard to read that `render` method, we should
refactor the card into its own presentation component. Create another
component in the `components` folder called `RobotItem.js`. Then copy
and paste the card component code from `Home.js`:


``` javascript
import React, { Component } from 'react';
import {
  Text,
  Image,
} from 'react-native';

import {
  Card,
  CardItem,
} from 'native-base';

export default class RobotItem extends Component {
  constructor(props) {
    super(props);

    this.recordData = props.record.content;
  }

  render() {
    return (
      <Card style={{margin: 10}}>
        <CardItem>
          <Text>{this.recordData.title}</Text>
        </CardItem>
        <CardItem>
          <Image style={{resizeMode: 'cover'}} source={{uri: this.recordData.image}} />
        </CardItem>
        <CardItem>
          <Text>{this.recordData.description}</Text>
        </CardItem>
      </Card>
    );
  }
}

```

We also create a little shorthand in the constructor so we don't have
to type `this.props.record.content` each time we have to access
data.

There's still a little bit of refactoring left in `Home.js`. We're
going to pull the map out of the render function and put it into its
own method called `renderItem`.

``` javascript
export default class Home extends Component {
  constructor(props) { //... }

  setupImpagination() { //... }

  componentWillMount() { //... }

  renderItem() {
    return this.state.datasetState.map(record => {
      if (!record.isSettled) {
        return <Spinner key={Math.random()}/>;
      }

      return <RobotItem record={record} key={record.content.id} />;
    });
  }

  render() {
    return (
      <Container>
        <Header>
          <Title>Robot Impagination</Title>
        </Header>
        <Content>
          {this.renderItem()}
        </Content>
      </Container>
    );
  }
}
```

Don't forget to prune the imports we're no longer using at the top of
`Home.js`.

### Putting the "infinite" in scroll

We're so close! It's now rendering all 15 items in our first page but
we're not able to scroll to the bottom and retrieve new records. Why?
It's because as we scroll we have to set Impagination's
`readOffset`. Basically, we have to tell Impagination which record is
currently being viewed by the user.

As we progress through the list of records Impagination will fetch more pages
if [we're within the `loadHorizon`.](https://github.com/flexyford/impagination#load-horizon)
By default, the `loadHorizon` is the same as the page size. This means
Impagination is constantly keeping track of where we're at so it can
smartly fetch new records as needed. If you up the `loadHorizon` to 30
it'll load even more pages ahead of the current scroll position.

In order to set the `readOffset` we're going to hook into the
`onScroll` event on the `<Content>` component. The `<Content>`
component descends from React Natives `ScrollView` component, so if
you're not using NativeBase you can still use this same method.

Let's create a method called `setCurrentReadOffset` and then call that
anytime the scroll event is called.

``` javascript
export default class Home extends Component {
  constructor(props) { //... }

  setupImpagination() { //... }

  componentWillMount() { //... }

  renderItem() { //... }

  setCurrentReadOffset = (event) => {
    // Log the current scroll position in the list in pixels
    console.log(event.nativeEvent.contentOffset.y);
  }

  render() {
    return (
      <Container>
        <Header>
          <Title>Robot Impagination</Title>
        </Header>
        <Content onScroll={this.setCurrentReadOffset}>
          {this.renderItem()}
        </Content>
      </Container>
    );
  }
}
```

If you refresh your simulator, enable remote JS debugging, scroll the
list, and then look in the JS console you should see a bunch of logs
with numbers. This is the current scroll position of the list in
pixels. We're going to use `contentOffset.y` to help calculate what
record we're seeing in the viewport.

Since this list is rendering items with the _exact_ same height each
time it's pretty easy for us to figure out what item is currently
scrolled into view. You take the `currentOffset.y` and divide it by the
items height. That's your current `readOffset` (aka the current record
in view).

Finally, we should throttle the amount of times `setCurrentReadOffset`
is called. As of right now it's called every single time there's a
scroll event, which is extremely noisy. We'll cut this down by
setting `scrollEventThrottle` to `300` (ms).

``` javascript
export default class Home extends Component {
  constructor(props) { //... }

  setupImpagination() { //... }

  componentWillMount() { //... }

  renderItem() { //... }

  setCurrentReadOffset = (event) => {
    let itemHeight = 402;
    let currentOffset = Math.floor(event.nativeEvent.contentOffset.y);
    let currentItemIndex = Math.ceil(currentOffset / itemHeight);

    this.state.dataset.setReadOffset(currentItemIndex);
  }

  render() {
    return (
      <Container>
        <Header>
          <Title>Robot Impagination</Title>
        </Header>
        <Content scrollEventThrottle={300} onScroll={this.setCurrentReadOffset}>
          {this.renderItem()}
        </Content>
      </Container>
    );
  }
}
```

Go ahead, refresh your simulator and scroll through that list! The API
only has 100 records seeded to the DB so don't expect it to be
_truly_ infinite. Here's a GIF of what we've built together:

<img
  src="/img/2016/12/15/building-infinite-scroll-in-react-native/finished-robotImpagination-app.gif"
  alt="GIF demo of the app we just built together"
/>

[It's so beautiful.](http://3.bp.blogspot.com/-ZjTOxpVwQfY/VapQ75EsTAI/AAAAAAAABd4/7KWaSGgYWtQ/s1600/image002.gif)

### One last optimization

Using a `ScrollView` for something that is truly infinate might not be
the best idea but you can add one property to the `ScrollView`
significantly cut the memory usage: `removeClippedSubviews`. Since
NativeBase's `Content` component is backed by a `ScrollView` we can
use this same property. `removeClippedSubviews` will take the off
screen cards and remove them from the native backing superview.

``` javascript
export default class Home extends Component {
  constructor(props) { //... }

  setupImpagination() { //... }

  componentWillMount() { //... }

  renderItem() { //... }

  setCurrentReadOffset = (event) => { //... }

  render() {
    return (
      <Container>
        <Header>
          <Title>Robot Impagination</Title>
        </Header>
        <Content scrollEventThrottle={300} onScroll={this.setCurrentReadOffset} removeClippedSubviews={true}>
          {this.renderItem()}
        </Content>
      </Container>
    );
  }
}
```


### Conclusion

First off, great job! You have just built infinite scroll in React
Native from scratch, which isn't an easy task. In about an hour we were
able to take a library that was originally written to solve a problem
in Ember.js and apply it to a React Native Project.

I think this speaks volumes about the power of writing libraries in
plain old JavaScript. Not only can this library be used in any type
JavaScript project, it will have access to a broader community. This is because
any JavaScript developer can jump in and contribute back to the
project.

For me, this means I can finally realize my childhood dream of building
an iOS app. I don't have to relearn an entire development
ecosystem. Sure you'll have to learn new things about native
development but the barrier to entry is tremendously lower.

Here's my hot take on where React Native fits into the JS ecosystem.
React Native has hit the sweet spot that Cordova and PhoneGap has been
trying to hit for years: you can write native apps in JavaScript with
no performance implications. As we’ve seen, it’s easy to share the
same JavaScript libraries from the web and node (if that’s your
thing), to your native app. Now that’s amazing.

Web developers have been trying to recreate "that native experience" in
the browser for years. But here's the thing: native is a moving
target. So if you can't keep up, why not join them? But join them with
your existing JavaScript knowledge. Sounds like the best of both
worlds to me!

Once again if you would like to take a look at the completed app [here's
the GitHub repo.](https://github.com/Robdel12/robotImpagination) If
you have any questions, comments, or feedback I'm always available on
[Twitter @robdel12](https://twitter.com/robdel12)

[Image credit](http://www.hutui6.com/atom-wallpapers/67525236.html)
