
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

## Coding conventions

The project structure has been generated with [generator-gulp-angular](https://github.com/Swiip/generator-gulp-angular). Refer to its [user guide](https://github.com/Swiip/generator-gulp-angular/blob/master/docs/user-guide.md) and the [Best Practice Recommendations for Angular App Structure](https://docs.google.com/document/d/1XXMvReO8-Awi1EZXAXS4PzDzdNvV6pGcuaF4Q9821Es/pub).
