# Server for Running Timeline Events Demo

This is a lightweight utility server to help you run the Timeline Events demo app for all platforms:

* Android - [https://github.com/mitterio/android-timeline-events-demo](https://github.com/mitterio/android-timeline-events-demo)

## How to setup?

Download a copy of this server by doing a git clone:

```
git clone https://github.com/mitterio/server-timeline-events-demo.git
```

Before you can run this server, you need to create an application at [Mitter.io Cloud](https://dashboard.mitter.io) or your local instance of Mitter.io (if you're running the Mitter.io Docker container).

Once you've created an application, obtain the following values:
* Application ID
* Access Key
* Access Secret

Now, edit the `config.json` and `credentials.json` files in the `config` folder with your application ID and access key/secret.

## How to run?

You can run this server simply by navigating to the project directory and running this command:

```
yarn run start
```

On start, you'll get a channel ID printed to the console. Copy this ID and paste it inside the timeline events demo app.