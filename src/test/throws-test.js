// Testing Framework
import * as Lab from "lab";
import getHelper from "../lib/index";
import assert from "assert";

const lab = exports.lab = Lab.script();
const testing = getHelper(lab);

const method = testing.createExperiment("LabTesting", "throws");

class TestClass {

  constructor(one, two) {

    assert(one, "one is a required argument");
    assert(two, "two is a required argument");

    this.one = one;
    this.two = two;
  }

  method(one, two) {

    assert(one, "one is a required argument");
    assert(two, "two is a required argument");

    return;
  }

  destructuredMethod({one, two}) {

    assert(one, "one is a required argument");
    assert(two, "two is a required argument");

    return;
  }
}

method("methodParameterTest", () => {

  const obj = new TestClass("one", "two");

  testing.throws.methodParameterTest(obj, obj.method, ["one", "two"], "one", "two");

  lab.test("does not error when called correctly", done => {

    const obj1 = new TestClass("one", "two");

    obj1.method("one", "two");
    return done();

  });

});

method("methodDestructuredParameterTest", () => {

  const obj = new TestClass("one", "two");
  const validArgs = {
    "one": "one",
    "two": "two"
  };

  testing.throws.methodDestructuredParameterTest(obj, obj.destructuredMethod, validArgs);

  lab.test("does not error when called correctly", done => {

    const obj1 = new TestClass("one", "two");

    obj1.destructuredMethod(validArgs);
    return done();

  });

});

method("functionParameterTest", () => {

  const fnc = function (one, two) {

    assert(one, "one is a required argument");
    assert(two, "two is a required argument");

    return;
  };

  testing.throws.functionParameterTest(fnc, ["one", "two"], "one", "two");

  lab.test("does not error when called correctly", done => {

    fnc("one", "two");
    return done();

  });

});

method("functionDestructuredParameterTest", () => {

  const fnc = function ({one, two}) {

    assert(one, "one is a required argument");
    assert(two, "two is a required argument");

    return;
  };

  const validArgs = {
    "one": "one",
    "two": "two"
  };

  testing.throws.functionDestructuredParameterTest(fnc, validArgs);

  lab.test("does not error when called correctly", done => {

    fnc(validArgs);
    return done();

  });

});
