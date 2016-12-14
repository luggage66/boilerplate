A minimal started for an SPA (single page app) using the following technology:

* react - A popular view 'engine'.
* webpack - A Javascript (and other files) bundler for turning a bunch of loose (but organized) JS files into a single file, ready for the browser.
* gulp - A task runner. Just a javascript alternative to a shell script, really.

## What does this contain?

* A solid webpack config, handling some common situations (static images, transpiling JS, an html template)
* A simple gulp file with common tasks (run webpack, run babel for server-side files, clean)
* A __very basic__ router (to be replaced or enhanced).
* A css reset and demoing importing a css file with require() (thanks to webpack)

## What this boilerplate is NOT:

I do not currently do:

* Hot Module Reloading
* Isomorphic

## Getting started as a developer

Fork and/or clone this repo, then install the dependencies

```
npm install

# in one terminal, run:

gulp dev-server

# this will build the code, start the server, and
# watch for files changes (and re-build/restart when they change).

# in another run:
webpack --watch

# This will build and bundle the client files (and re-build when they change)
```

### Commands

* `gulp dev-server` - build / watch / rebuild loop for the server
* `gulp build-server` - just build the server
* `gulp build-client` - build the client
* `gulp clean-server` - clean up compiled output
* `gulp clean-client` - clean up compiled output
* `gulp clean-all` - clean up compiled output

## TODO:

* Make a single-terminal workflow, using webpack-dev-middleware
