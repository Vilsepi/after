
Install dependencies

    npm install
    bower install

Develop

- `gulp serve` to start BrowserSync server on your source files with live reload

Test

- `gulp test` to run your unit tests with Karma
- `gulp test:auto` to run your unit tests with Karma in watch mode
- `gulp protractor` to launch your e2e tests with Protractor

Build dist version

- `gulp` to build an optimized version of your application in folder dist
- `gulp serve:dist` to start BrowserSync server on your optimized application without live reload
- `gulp protractor:dist` to launch your e2e tests with Protractor on the dist files
