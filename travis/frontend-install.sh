#!/usr/bin/env bash

cd frontend

# Install global tools
npm install -g bower

# Install npm dependencies from package.json
npm install

# Install bower dependencies from bower.json
bower install
