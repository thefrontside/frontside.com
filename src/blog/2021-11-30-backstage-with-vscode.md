---
templateKey: blog-post
title: >-
  Backstage Tutorial: Getting Started in VSCode DevContainers
date: 2021-11-30T05:00:00.000Z
author: Min Kim
description: >-
  WIP
tags:
  - backstage
img: /img/2021-intro-effection.png # placeholder
---

## Introduction (taras)

One often underrated aspect of developer onboarding is how quickly a new contributor can go from cloning the source code to running the project on their machine. If your team is not thinking about this then the answer is probably “I don’t know” or “more than a day”. This is especially true for Backstage because it is a full stack application. It requires having a recent version of Node.js, Yarn and PostgreSQL running on the developer’s machine. These are fairly easy to install on MacOS and Linux but can be challenging on Windows, especially for someone who’s new to the Node.js ecosystem. A poor early onboarding experience can be very discouraging and leave a poor impression, especially with the new contributor is visiting from another team. One thing that we learned from experience is that a good onboarding experience for new contributors also improves the developer experience for seasons contributors.

One way that Frontside found to improve onboarding is by using [DevContainers](https://code.visualstudio.com/docs/remote/containers). DevContainers are containerized development environments. They make it easy to run the project by creating a container that has all of the system requirements to run the project. DevContainer uses a combination of several popular tools which include Docker with Docker Compose. It has a CLI called [devcontainer-cli](https://code.visualstudio.com/docs/remote/devcontainer-cli) that you can use to open the container from the command line. It will open in VSCode which uses [Remote Containers Extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers) to create a smooth integration with VSCode. For the most part, running devcontainers inside of VSCode feels like the application is running on your machine. Once you added DevContainers to your project, it provides a clear path to adopting GitHub Codespaces which [make onboarding even easier](https://github.blog/2021-08-11-githubs-engineering-team-moved-codespaces/). 

This blog post will explain how to setup DevContainers for your Backstage project. It’s important to point out that even though DevContainers are a convenient way to run the project, the DX of developing in DevContainer is still inferior in some ways to running the project locally because it introduces overhead of running Docker containers. It is really meant to lower the barrier for those who can not run the project locally. With that said, we still believe that it’s a very useful tool and will drive the DX of your project in the right direction. The changes that you make in this tutorial will work with or without DevContainers which makes it an easy improvement to make for those who need it without compromising the DX for those who don’t.

## Requirements

Before we get started, you should have the following:

  - [Visual Studio Code](https://code.visualstudio.com/Download)
  - [Remote Containers Extension for VSCode](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers)
  - [Docker Desktop](https://www.docker.com/products/docker-desktop)
    - Also [Docker Compose](https://docs.docker.com/compose/install/) if you're running Linux

## Create Backstage App

In order to spin up a devcontainer, we first need a project to work from so let's instantiate a Backstage app using `@backstage/create-app`:

```
npx @backstage/create-app
```

For this tutorial we'll be using PostgreSQL:

![backstage-create-app](/img/2021-12-03-backstage-devcontainer/backstage-create-app.png)

Once the app is finished installing, open the new app's workspace in visual studio code and we can proceed on to setting up a devcontainer.

## Opening a Project inside a DevContainer

If you have the [`Remote Containers`](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers) extension installed, you should be able to access its commands. Press `F1` and select `Remote-Containers: Open Folder in Container...`:

![open-folder-container](/img/2021-12-03-backstage-devcontainer/remote-containers-open.png)

VSCode will detect that you do not have devcontainer configurations yet so it will prompt you to select a predefined container. You can go ahead and select any of them as we'll be replacing all of those configurations later.

Once you make your selection, VSCode will create configuration files in the `.devcontainer` directory, build the container according to those files, and launch your workspace in said container. You can also go to your Docker Desktop dashboard to confirm that the new container is running.

If you make any changes to your devcontainer configuration, you can run `Remote-Containers: Rebuild Container`. Or if you would like to exit out of your devcontainer, run `Remote-Containers: Reopen Folder Locally`.

Now that we know how to launch and exit out of devcontainers, we need to add configurations to run Backstage.

## Docker Compose - Postgres

If you try to start up Backstage now you'll get an error in the terminal about there being no database to connect to. This is because we're not running an instance of postgres yet so let's start there. At the root of your project workspace, create a `docker-compose.yaml` file:

```yaml
version: "3.8"

services:
  my_postgres_db:
    image: postgres
    environment:
      POSTGRES_USER: postgres_username
      POSTGRES_PASSWORD: postgres_password
```

We're creating a `my_postgres_db` service with the official [postgres docker image](https://hub.docker.com/_/postgres) and providing it a username and password to bootstrap a postgres account for local development.

## Docker Compose - DevContainer 

Next, let's create a service for our devcontainer - this will be to replace the one that was automatically generated by VSCode earlier.

```yaml
services:
  my_postgres_db:
    ...
  my_devcontainer:
    image: mcr.microsoft.com/vscode/devcontainers/typescript-node:14
    command: /bin/sh -c "while sleep 1000; do:; done"
    volumes:
      - .:/workspace
    environment:
      POSTGRES_HOST: my_postgres_db
      POSTGRES_USER: postgres_username
      POSTGRES_PASSWORD: postgres_password
```

For our devcontainer image, we are using one of the docker images [created by Microsoft](https://hub.docker.com/_/microsoft-vscode-devcontainers) and running a shell command to prevent the container from exiting on its own as suggested in the [devcontainer docs](https://code.visualstudio.com/docs/remote/create-dev-container#_use-docker-compose).

For your container to have all of the files of your backstage app, you need to add `volumes: .:/workspace` as shown above. This will take the current directory (relative to the docker compose file) and copies its contents to the `/workspace` directory of your container.

We're also passing in environment variables to gain access to our local instance of postgres - these should correspond to the values you specified when creating the `my_postgres_db` service. Alternatively, you could provide these values by modifying the start script of your backstage backend but we'll just add them as environment variables.

## Rebuild DevContainer

Now, we just need to update our devcontainer configurations to use the docker-compose file we created:

```json
// .devcontainers/devcontainer.json
{
  "dockerComposeFile": "../docker-compose.yaml",
  "service": "my_devcontainer",
  "workspaceFolder": "/workspace"
}
```

In order for these changes to be applied, you will need to rebuild your devcontainer by running either `Remote-Containers: Rebuild Container` or `Rebuild and Reopen in Container` depending on if you returned to your local environment or if you're still in the first devcontainer you launched. And you can go ahead and delete the other files that were created inside `.devcontainer/`.

## Using Persistent Volumes

At this point if you try to add a dependency or run `yarn install` you may notice that it takes much longer than it usually does in your local environment. The reason for this is that when you create files in a docker container, it writes to the container's writable layer which is not very fast. The standard practice, as suggested by [docker docs](https://docs.docker.com/storage/volumes/) is to use volumes.

In your docker compose file, let's add the three node_modules directories of your backstage app:

```yaml
services:
  my_postgres_db:
    ...
  my_devcontainer:
    ...
    volumes:
      - .:/workspace
      - /workspace/node_modules
      - /workspace/packages/app/node_modules
      - /workspace/packages/backend/node_modules
```

This syntax can be a little confusing at first, and you may be wondering if and why `.:/workspace` doesn't include `node_modules`. Although they are nested under the same `volumes` property, what they achieve is different. When you specify both a source and target path, docker compose will treat that as a bind mount. But when you pass in only a target path, docker compose will create an anonymous volume.

So what's happening here is docker compose first copies your backstage app to the `/workspace` directory of your devcontainer, and then it maps out the contents of node_modules to persistent volumes. You can read more about the differences between a bind mount and a volume [here](https://docs.docker.com/storage/).

Now when you rebuild and reopen your devcontainer, you should see a significant improvement when you run `yarn install`.

## Summary

- conclusion
  - upcoming: deploying backstage to google cloud and configure CI
    - upcoming upcoming: adding plugins
