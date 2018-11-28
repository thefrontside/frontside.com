---
templateKey: blog-post
title: Build a Family Tree maker using React Hooks and Microstates
date: '2018-11-06 00:07 UTC'
description: >-
  If you use React, you probably know about the React Hooks RFC that was
  introduced at ReactConf. It’s an exciting proposal because it promises to
  bring the power of class components to function components. It also a
  convention for creating React extensions that feel like first-class APIs in
  the React ecosystem. React Hooks API and Microstates bring expressiveness of
  React function components to a whole new level. 
tags:
  - javascript
  - microstates
  - react
---
![Demo of Family Builder Component](/img/2018-11-06-build-a-family-tree-maker-using-react-hooks-and-microstates_family-builder.gif)

In this tutorial, we will create a Family Tree marker component using React Hooks and Microstates. The Family Tree maker will allow the user to enter their name, then their parent’s names, their parent’s parent’s names and their parent’s parent’s parent’s names, as far back as they can remember.

![test](/img/2018-11-06-build-a-family-tree-maker-using-react-hooks-and-microstates_family-builder.gif)

To do this, we’ll follow the following steps:

1. Create a new project using React Alpha and Create React App
2. Create a useType hook with Microstates and React Hooks
3. Build recursive Family Tree maker component
4. Persist component state in LocalStorage
5. Optimize re-rendering of our component

Let’s get started.

## Create a new React app with React Alpha

To use React Hooks we need to install React Alpha. The React team asked that writers make it clear that React Alpha is experimental version of React. It should not be used for serious projects. It was created to allow people to play around with experimental features of React. That’s what we’re going to do :)

Let’s create a new app using **create-react-app**. If you don’t have **create-react-app** installed, you can install it by following instructions on [create-react-app website](https://facebook.github.io/create-react-app/).

```bash
create-react-app family-tree-app
cd family-tree-app # go into created directory
```

Now we need to change **package.json** to use the alpha release of React. To do this, modify the package.json file and dependencies for `react` and `react-dom` to reference **16.7.0-alpha.0** version. Then run **npm install** to get the new versions.

```json
  "dependencies": {
    "react": "16.7.0-alpha.0",
    "react-dom": "16.7.0-alpha.0",
    "react-scripts": "2.1.1"
  },
```

You should be able to start the server using `npm start` and see the React logo when you go to `http://localhost:3000/`. If you see the React logo, then React **Alpha** release is **probably** installed. We’ll know for sure when we try to use the hooks. Let’s do that next.

## Create a useType hook with Microstates and React Hooks

We're going to take a more scenic route to creating `useType` hook because I'm going to assume that most readers are not familiar with using Microstates in React. To make sure that we make as few leaps as possible, I'll start with a brief introduction to Microstates, then show you how to integrate Microstates into a React class component, followed by implementing the actual `useType` hook.  

`useType` will provide the state for our family tree. `useType` will use a Microstates to create an object that will have on it our state and all of the transitions for our state.

If you’re familiar with Redux, then you could think about Microstates as immutable stores that are created from type information. Unlike Redux, you don’t need to write reducers, Microstates automatically creates reducers for the given type. If you’ve never heard of [microstates.js](http://github.com/microstates/microstates.js), now would be a good time to take a break and [read the README](http://github.com/microstates/microstates.js). ⏱ I’ll assume you finished reading the README and ready to continue.

To connect Microstates to a React component, we need to do three things:

1. Install microstates
2. Create a microstate
3. Observe the microstate

### Install microstates

You can install microstates with `npm install —save microstates` or `yarn add microstates`.

### Create a Microstate

To create a microstate, we can use the `create` function. It takes a type and a value and returns a microstate.

```js
import { create } from "microstates";

let meaningOfLife = create(Number, 42);

meaningOfLife.state;
// 42
```

The created microstate allows us to invoke a transition on the microstate and get a new microstate with the result of the transition.

```js
let next = meaningOfLife.increment();

next.state;
//> 43
```

Calling transitions on a microstate will always return the result of the transition at the call-site - at the place where the transition was called. If you call the transition in an event handler, you’ll get the next state in the event handler. This is not what we need in React. In React, we need to capture the next state and set it onto state of the component. We can do this with the Store.

### Observe the microstate

The `Store` is a function that takes a microstate and a callback and returns a store instance. When you invoke transitions on the store instance, the store calls the callback with the result of the transition.

```js
import { Store, create } from "microstates";

let store = Store(create(Number, 42), next => console.log(next.state))

store.increment();
//> 43
```

We can use the `Store` to create a React component that will update the state whenever transition is invoked. Let's first implement a component with React class components, then refactor it to use React hooks. Here is what it looks like with a React class component. We create a microstate store and set it onto state. The store callback will call
`setState` to update the component state on transition. 

```jsx
import React, { Component } from "react";
import { Store, create } from "microstates";

class App extends Component {
  
  // set the next store onto the state of the component
  update = counter => this.setState({ counter });

  state = {
    // create the store when the component is instantiated
    // the update function will be called with next state
    counter: Store(create(Number, 42), this.update)
  };

  render() {
    let { counter } = this.state;

    return (
      <button onClick={() => counter.increment()}>
        Increment {counter.state}
      </button>
    );
  }
}
```

Checkout this example in a [CodeSandbox](https://codesandbox.io/s/myr4jy546p).

Now, let’s implement the same functionality using the `useState` hook. `useState` takes a reference to initial state and returns an array that can be destructured to `let [state, setState] = useState(initialState)`. It’s important that `initialState` is consistent because it’s used as the key to that particular state.

If the reference of `initialState` changes between re-renders then it’ll create a new state for you. This will break your component. For this reason, it’s important that the `initialState` does not change between re-renders of that component. 

In our case, our `initialState` is a microstate that is created with a type and value. At first glance, we could assume that we can create a microstate and pass it to `useState`.  This won’t work because this would create a new microstate with a new reference on every re-render. Calling `useState` with a new reference would create a new state object.

```jsx
import React, { useState } from "react";
import { create } from "microstates";

function App() {
  // this is wrong, do not copy and paste this
  let counter = useState(create(Number, 42));

  return (
    <button onClick={() => counter.increment()}>
      Increment {counter.state}
    </button>
  );
}
```

We need a stable reference that does not change between re-renders. This is where `useMemo` comes in. `useMemo` allows us to memoize execution of a function based on specific values. To memoize a function means that the function is invoked and its return value is saved. As long as the values that the function uses to perform the calculation did not change, the function does not need to be re-executed and previously saved value can be used.

With `useMemo` we can memoize the result of the `create` function with type and value as dependent values. This will allow us to receive the same microstate whenever this component re-renders. Try it out in [CodeSandbox](https://codesandbox.io/s/n44qrjo72l).

```jsx
import React, { useState, useMemo } from "react";
import { create } from "microstates";

function App() {
  let initialState = useMemo(() => create(Number, 42), [Number, 42]);

  let [counter, setState] = useState(initialState);

  return (
    <button onClick={() => setState(counter.increment())}>
      Increment {counter.state}
    </button>
  );
}
```

We’re getting closer to our goal, but this solution requires calling `setState` on every transition. That’s pretty inconvenient. Let’s wrap the microstate in a `Store` to allow us to invoke transitions without explicitly calling `setState`. This part is a little tricky and hopefully it gets easier before this RFC becomes part of React.

The tricky part is that our Store needs the `setState` function that’s returned by `useState` but we need to use it when creating the `initialState`. To do this, we’ll define a variable before calling `useMemo` and reference it when creating the Store. The actual `setState` callback will become available when `useState` is invoked. Try it in [CodeSandbox](https://codesandbox.io/s/8lv0jv9o62)

```jsx
import React, { useState, useMemo } from "react";
import { Store, create } from "microstates";

function App() {
  let state;

  let initialState = useMemo(
    () =>
      Store(create(Number, 42), next => {
        // at index 1 is setState function
        // effectively calling setState(s)
        state[1](next);
      }),
    [Number, 42]
  );

  // assign state to make it available to the store callback
  state = useState(initialState);

  let counter = state[0]; // at index 0 is state

  return (
    <button onClick={() => counter.increment()}>
      Increment {counter.state}
    </button>
  );
}
```

I told you it’s going to get tricky. Lets 🤞 that there’ll be a way to do this without these kinds of roundabout tricks. Ok, now the moment we’ve all been waiting for. Let’s create the `useType` function by generalizing our code. `useType` will accept type and value and will return the state object with transitions that we can call to trigger a re-render.

```jsx
import React, { useState, useMemo } from "react";
import { Store, create } from "microstates";

function useType(type, value) {
  let state;

  let initialState = useMemo(
    () =>
      Store(create(type, value), next => {
        // at index 1 is setState function
        // effectively calling setState(s)
        state[1](next);
      }),
    [type, value]
  );

  // assign state to make it available to the store callback
  state = useState(initialState);

  return state[0]; // at index 0 is state
}

function App() {
  let counter = useType(Number, 42);
  return (
    <button onClick={() => counter.increment()}>
      Increment {counter.state}
    </button>
  );
}
```

We created `useType` hook using `useState`, `useMemo` and Microstates. In the future, `useType` will be part of `@microtates/react` package but it's pretty tiny. With this hook, we can use any Microstate type in our function components. In next part of the tutorial, we’ll use our new `useType` to provide state for our Family Tree maker. 

## Build recursive Family Tree builder component

![Demo of Family Builder Component](/img/2018-11-06-build-a-family-tree-maker-using-react-hooks-and-microstates_family-builder.gif)

Our component will allow the user to enter their name. When the name is entered, they’ll see an input field to enter names of their mother and father. When a parent’s name is entered, we’ll show input fields for parent’s parents. This will work recursively as deeply as the user has patience to enter.

State management is usually the most difficult part of building this kind of component. Luckily, Microstates and our `useType` helper will make this very easy. All we need to do is create a type that will allow us to store a name for a person, a mother and a father with their names. It needs to be recursive, just like our component. Microstates makes it very easy.

```js
class Person {
  name = String; // name of the person 
  mother = Person; // mother is of type Person
  father = Person; // father is of type Person
}
```

Our type is complete. This is everything that we need to create a recursive data structure. Microstates will take care of proving us with transitions and handle the immutability of this recursive data structure. Now, we just need to write the component that will use our `Person` type and `useType` hook. Let’s begin by creating the state and passing it to our future `FamilyTree` component.

```jsx
function App() {
  let person = useType(Person);
  return <FamilyTree person={person} />;
}
```

We need to actually write our `FamilyTree` component. The component is going to show an input field for the name. When the name is not empty the component will render a `FamilyTree` component for the mother and the father.

```jsx
function FamilyTree({ person )} {
	return (
		<>
        <input
          value={person.name.state}
          onChange={e => person.name.set(e.target.value)}
        />
        {person.name.state !== "" && (
			<>
				Father: <FamilyTree person={person.father} />
				<br>
				Mother: <FamilyTree person={person.mother} />
			</>
        )}
      </>
	)
}
```

That should do it. Look at the onChange handler of the input. Notice the `person.name.set` transition. It’s similar to a reducer that changes the name of the node, but Microstates handles immutably updating the value and causing our component to update via our `useType` hook. Let’s use another hook to persist our input in LocalStorage.

## Persist component state in localStorage

Every transition creates a new value that we can serialize and later use to restore the state. We can use this to persist the state in LocalStorage. When the user refreshes their page, the family tree will be restored from LocalStorage. To do this, we’ll need to change a few things.

1. Restore state from localStorage
2. Create the microstate with restored state
3. Persist the state in localStorage

### Restore state from localStorage

When the component is being rendered, we need to grab a key from localStorage and parse it with `JSON.parse`. This part is not unique to React Hooks or Microstates.

```js
const initial = JSON.parse(localStorage.getItem("family-tree") || "{}");
```

Notice the string wrapping an object `”{}"` That’s an empty object that was serialized. I’m using this to ensure that there will be a value even when localStorage doesn’t have anything. This will happen on first rendering the component.

### Create the microstate with restored state

Once we have the initial state from localStorage, we can pass it to our `App` component and create the microstate with the passed in value.

```jsx
const initial = JSON.parse(localStorage.getItem("family-tree") || "{}");

function App({ initial }) {
  let person = useType(Person, initial);

  return <FamilyTree person={person} />;
}

ReactDOM.render(<App initial={initial} />, document.getElementById("root"));
```

This will allow us to deserialize the value, but what about saving the value into localStorage? We’ll do that next, it’ll require that we use another hook.

### Persist the state in localStorage

We want the state of the family tree to be saved in localStorage. To do this, we need to extract serializable state from the microstate. We can use `valueOf` function to get a value that we can store in localStorage.

```jsx
import { valueOf } from "microstates";

function App({ initial }) {
  let person = useType(Person, initial);

  let value = valueOf(person);

  return <FamilyTree person={person} />;
}
```

Once we have the value from the microstate, we can use `useEffect` hook to queue up the `localStorage.setItem` operation. `useEffect` hook is executed after the render is complete, which allows you to perform potentially slow operation without slowing down rendering. It also allows you to prevent unnecessary invocations of this effect by declaring the value as a dependant value. Here is what that looks like,

```jsx
import React, { useEffect } from "react";
import { valueOf } from "microstates";

function App({ initial }) {
  let person = useType(Person, initial);

  let value = valueOf(person);

  useEffect(
    () => {
      let serialized = JSON.stringify(value);
      localStorage.setItem("family-tree", serialized);
    },
    [value]
  );

  return <FamilyTree person={person} />;
}
```

In this section, we added the ability to store user’s input in localStorage to allow us to restore their input when the user returns to the page. We used `valueOf` to extract value from the microstate and `useEffect` hook to ensure that calling our persist operation does not block rendering. In the last part of this tutorial, we’ll optimize the component to ensure that it doesn’t re-renders parts of the tree where state did not change.

## Optimize re-rendering of our component

It’s not unusual for performance improvements to be left until the end of the project, but unusual for performance tweaking to be easy. Fortunately, Microstates was designed in a way that makes optimizing performance with React easy. In this section, I’ll show you how to optimize the component to ensure that only parts that changed actually re-render.

The key to optimizing React rendering is to ensure that only components that changed get re-rendered. React Devtools has a feature called “Highlight Updates” that makes it easy to see which components get re-rendered when you interact with the application.

![Demo of Family Builder Component before optimization](/img/2018-11-06-build-a-family-tree-maker-using-react-hooks-and-microstates_family-builder-unoptimized.gif)

When “Highlight Updates” is turned on, the DevTools will highlight areas of the component tree that are being updated. If you look at the example above, you can see that every keystroke causes every component to re-render. This is a lot of unnecessary re-renders.

What we need to do is to only re-render children when the state of children has changed. We can use the fact that Microstates are immutable as a guarantee that microstates will only change their references when their value has changed. If they value did not change, then the same microstate will be reused.

We can combine this reference guarantee with the `useMemo` hook to memoize components based on the microstate that they consume. This will ensure that memoization will be invalidated when the dependant microstate changes. Let’s modify our component to memoize parent’s components based on their microstates.

```jsx
function FamilyTree({ person }) {
  const father = useMemo(() => <FamilyTree person={person.father} />, [
    person.father
  ]);

  const mother = useMemo(() => <FamilyTree person={person.mother} />, [
    person.mother
  ]);

  return (
    <>
      <input
        value={person.name.state}
        onChange={e => person.name.set(e.target.value)}
      />
      {person.name.state && (
        <ul>
          <li>Father: {father}</li>
          <li>Mother: {mother}</li>
        </ul>
      )}
    </>
  );
}
```

After we make this change, we can check the result and see if we made an improvement. Now when you edit an input field, it’s only changing components above the component that you edited because their microstates were changed.

![Demo of Family Builder Components after optimizations](/img/2018-11-06-build-a-family-tree-maker-using-react-hooks-and-microstates_family-builder-optimized.gif)

It’s worth noting that we only change the input in one component but all of the parent components are marked as changing. This is because when a nested microstate changes, the parents of that microstate have to be re-created as per rules of immutability.

## Conclusion

In this tutorial, we implemented `useType` hook, learned a little about Microstates, built a recursive component using Microstates, stored our state in localStorage and optimize re-rendering of our components. 

If you thought that this was easy, then consider how much we were able to do with Microsates and React in 80 lines of code. You can see the final result in [GitHub Repo](https://github.com/taras/microstates-use-state) and [CodeSandbox](http://codesandbox.io/s/github/taras/microstates-use-state). 

If you thought this was difficult, please [file an issue](https://github.com/taras/microstates-use-state) and describe what you found difficult. 

Regardless, tweet me [@tarasm](http://twitter.com/tarasm) and let me know what you think about Microstates and `useType` hook. If you’re looking for help building large applications, consider hiring Frontside to help you build your app.
