# Archived

Deprecated by https://github.com/fabricjs/fabric.js/pull/8135

---

# fabricjs-react-sandbox

This repository contains `create-react-app` templates: `cra-template-ts` and `cra-template-js`.\
It is a sandbox for developers to work on fabric with ease, a bootstrap fabric-react app ready to use with a single command.


For more information, please refer to:

- [Getting Started](https://create-react-app.dev/docs/getting-started) – How to create a new app.
- [User Guide](https://create-react-app.dev) – How to develop apps bootstrapped with Create React App.


### Create an app with a template
```sh
npm run start <path/to/app> -- [--typescript] [--start] [--fabric <path/to/fabric/local/repo>]
```

### Build

Generate the templates from `./common` using the build script `build.js`.

```sh
npm run build
```

### Dev

#### Working on the templates

1. install dependencies.
2. start the dev app `dev-sandbox`.
```sh
npm run dev
```
3. open `./common` and start working.

File changes from `./common` will get built to the app.
**Make sure you work on files in `./common`.**


#### Sandbox

The script file `sandbox.js` does 2 things:
1. Exposes commands for the cli:
    - build - building the app from the template (optional because the templates are standalone)
    - start the app - listens to changes in `fabric/src` and emits a build (and a diff file) to the app so it is very easy and comfortable to develop and test live stuff on the web and it is good for version control as well.
    - deploy the app to codesandbox
    - start the server for the app (see no.2)
    - build and start an app to develop the sandbox app
2. creates a server for the app exposing 3 endpoints:
     - `git` - fetches git data for version control awareness (I want to integrate this more deeply than just showing the data). I think this is useful for testing stuff across branches, regressions, a specific commit tag etc.
      - `codesandbox` - in charge of deploying the app to codesandbox
      - `open-ide` - opens the IDE on the machine pointing to `src/App`

