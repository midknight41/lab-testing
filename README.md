# lab-testing

[![Build Status](https://travis-ci.org/midknight41/lab-testing.svg?branch=master)](https://travis-ci.org/midknight41/lab-testing) [![Coverage Status](https://coveralls.io/repos/github/midknight41/lab-testing/badge.svg?branch=master)](https://coveralls.io/github/midknight41/lab-testing?branch=master)
[![Deps](https://david-dm.org/midknight41/lab-testing.svg)](https://david-dm.org/midknight41/lab-testing#info=dependencies) [![devDependency Status](https://david-dm.org/midknight41/lab-testing/dev-status.svg)](https://david-dm.org/midknight41/lab-testing#info=devDependencies)

[![NPM](https://nodei.co/npm/lab-testing.png?downloads=true)](https://www.npmjs.com/package/lab-testing/)

## Installation

```js
npm install lab-testing --save-dev
```

## Standard Constructor Test
Executes basic tests for nulls and undefined against all constructor parameters.

### Parameters:

- **class: Class** - The class to instantiate
- **labels: string[]** - description of the parameters for the constructor
- **parameters: ...params** - The correct values for the constructor

```js

import * as Code from "code";
import * as Lab from "lab";
import getHelper from "lab-testing";

const lab = exports.lab = Lab.script();
const expect = Code.expect;
const helper = getHelper(lab);

lab.experiment("standardContructorTest", () => {

  helper.standardContructorTest(TestClass, ["one", "two"], "one", "two");

});



```


## TODO

- setup travis
- setup coveralls
- replace coveralls token
- setup dep checks
- update badges
