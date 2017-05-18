A minimal starter for an SPA (single page app) using the following technology:

* react - A popular view 'engine'.
* webpack - A Javascript (and other files) bundler for turning a bunch of loose (but organized) JS files into a single file, ready for the browser.
* typescript
* gulp - A task runner. Just a javascript alternative to a shell script, really.

## What does this contain?

* A solid webpack config, handling some common situations (static images, transpiling JS, an html template)
* A simple gulp file with common tasks (run webpack, run babel for server-side files, clean)
* A __very basic__ router (to be replaced or enhanced).
* CSS pre-processing (SCSS) and CSS Modules configured in webpack.
* Babel configured to run the latest version of JS on the browsers of your choosing
* ESLint configured for (latest) JavaScript and React.

## What this boilerplate is NOT:

I do not currently do:

* Hot Module Reloading
* Isomorphic

## Getting started as a developer

Fork and/or clone this repo, then:

```
# install the dependencies
npm install

# in one terminal, run:
gulp dev-server
```

### Commands

* `gulp dev-server` - build / watch / rebuild loop for the server (and client when in developmeent mode)
* `webpack --watch` - Webpack build/watch/rebuild loop


* `gulp build-server` - just build the server
* `gulp build-client` - build the client (was as just running webpack)


* `gulp clean-server` - clean up compiled output
* `gulp clean-client` - clean up compiled output
* `gulp clean-all` - clean up compiled output

I use the node.js convention of the NODE_ENV environment variable, so set that if you want to enable production optimizations (like minimizing)

`NODE_ENV=production webpack` - build a client w/ minimizing and compression
