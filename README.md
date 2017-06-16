# lab-testing

[![Build Status](https://travis-ci.org/midknight41/lab-testing.svg?branch=master)](https://travis-ci.org/midknight41/lab-testing) [![Coverage Status](https://coveralls.io/repos/github/midknight41/lab-testing/badge.svg?branch=master)](https://coveralls.io/github/midknight41/lab-testing?branch=master)
[![Deps](https://david-dm.org/midknight41/lab-testing.svg)](https://david-dm.org/midknight41/lab-testing?info=dependencies) [![devDependency Status](https://david-dm.org/midknight41/lab-testing/dev-status.svg)](https://david-dm.org/midknight41/lab-testing?info=devDependencies)

[![NPM](https://nodei.co/npm/lab-testing.png?downloads=true)](https://www.npmjs.com/package/lab-testing/)

## Installation

```js
npm install lab-testing --save-dev
```

**lab-testing** contains two namespaces: ```throws``` and ```rejects```. The contain the same tests with ```throws``` used to test synchronous messages and ```rejects``` used to test promises. In addition, there are a few top levels tests too.

See [Change Log](./CHANGELOG.md) for changes from previous versions.

## Standard Constructor Test
Executes basic tests for nulls and undefined against all constructor parameters.

### Parameters:

- **class:** *Class* - The class to instantiate
- **labels:** *string[]* - description of the parameters for the constructor
- **parameters:** *...params* - The correct values for the constructor

```js
import * as Code from "code";
import * as Lab from "lab";
import getHelper from "lab-testing";

const lab = exports.lab = Lab.script();
const testing = getHelper(lab);

lab.experiment("standardContructorTest", () => {

  testing.standardContructorTest(TestClass, ["one", "two"], "one", "two");

});
```

## Create Experiment
Sometimes you want to represent hierarchy in your tests which, with lab, means a lot of indenting. This just reduces that indent and eliminates the boilerplate code.

### Parameters:

- **...levels:** *string[]* - Any number of levels as strings

```js

import * as Code from "code";
import * as Lab from "lab";
import getHelper from "lab-testing";

const lab = exports.lab = Lab.script();
const expect = Code.expect;
const testing = getHelper(lab);

const group = testing.createExperiment("Service", "Component");

group("methodOne", () => {

  lab.test(done => {
    return done();
  });

});
```

## Function Parameter Test
Executes basic tests for nulls and undefined against all function parameters.

### Parameters:

- **function:** *Function* - The function to test
- **labels:** *string[]* - description of the parameters for the constructor
- **parameters:** *...params* - The correct values for the constructor

### Testing for Thrown Exceptions

```js
import * as Lab from "lab";
import getHelper from "lab-testing";

const lab = exports.lab = Lab.script();
const testing = getHelper(lab);

lab.experiment("functionParameterTest", () => {

  const fnc = function (one, two) {

    // no parameter checks! This will fail some tests
    return;
  };

  testing.throws.functionParameterTest(fnc, ["one", "two"], "one", "two");

});
```

### Testing for Rejected Promises

```js
import * as Lab from "lab";
import getHelper from "lab-testing";

const lab = exports.lab = Lab.script();
const testing = getHelper(lab);

lab.experiment("functionParameterTest", () => {

  const fnc = function (one, two) {

    // no parameter checks! This will fail some tests
    return new Promise((resolve, reject) => {
      return resolve({one, two});
    });

  };

  testing.rejects.functionParameterTest(fnc, ["one", "two"], "one", "two");

});
```

## Method Parameter Test
Executes basic tests for nulls and undefined against all method parameters.

### Parameters:

- **object:** *Object* - The instance of a class
- **function:** *Function* - The method on that instance
- **labels:** *string[]* - description of the parameters for the constructor
- **parameters:** *...params* - The correct values for the constructor

### Testing for Thrown Exceptions

```js
import * as Lab from "lab";
import getHelper from "lab-testing";

const lab = exports.lab = Lab.script();
const testing = getHelper(lab);

class TestClass {

  method(one, two) {

    // no parameter checks! This will fail some tests
    return;      
  }
}

lab.experiment("methodParameterTest", () => {

  const obj = new TestClass();

  testing.throws.methodParameterTest(obj, obj.method, ["one", "two"], "one", "two");

});
```

### Testing for Rejected Promises

```js
import * as Lab from "lab";
import getHelper from "lab-testing";

const lab = exports.lab = Lab.script();
const testing = getHelper(lab);

class TestClass {

  method(one, two) {

    // no parameter checks! This will fail some tests
    return new Promise((resolve, reject) => {
      return resolve({one, two});
    });      
  }
}

lab.experiment("methodParameterTest", () => {

  const obj = new TestClass("one", "two");

  testing.rejects.methodParameterTest(obj, obj.method, ["one", "two"], "one", "two");

});
```

