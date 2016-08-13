# Angular 2 RC5 Seed Project - WebPack2.1.0-beta.20 - LazyLoading

> A simple angular tutorial from their own documentation of LazyLoading with System.config, instead used prefer bundler WebPack2


## Let's get started with Development Enviroment
- Install Node.JS version 5.10>
Use your system package manager (brew,port,apt-get,yum etc)

- Install global Grunt and Bower commands, once you install the following commands globally, you can run 'npm install' to run the components in the package.json file

```bash
	npm install -g grunt-cli bower
	npm install //load all your additional package.json components
```


Then we will 

- compile our TypeScript code and
- host the app on local development server 

by running the command:

```
npm start
//or
grunt serve
```

Then visit [http://localhost:8080](http://localhost:8080) in your browser. You should see an application with the header `Angular 2 Simple Reddit`. 

## Getting Help

In the case where it doesn't work, the first thing to try is looking at the developer console in your browser.

If that doesn't work, [come chat with us](https://gitter.im/ng-book/ng-book  )!

## Other Files (advanced)

> What are all the other files in this repo?

- `tsconfig.json` - this is instructions for our TypeScript compiler
- `tslint.json` - `tslint` is a program and helps enforce rules about code style. The `tslint.json` is the config file that specifies conventions for this project.
- `vendor` - for this project we're using [Semantic-UI](http://semantic-ui.com/) for the CSS. We've included the CSS files from Semantic here.
- `resources` - this is where we store a few images
