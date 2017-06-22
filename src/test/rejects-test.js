// Testing Framework
import * as Lab from "lab";
import getHelper from "../lib/index";
import assert from "assert";
import * as Q from "q";
// import { promiser, thrower } from "check-verify";

const lab = exports.lab = Lab.script();
const testing = getHelper(lab);

const method = testing.createExperiment("LabTesting", "rejects");

class TestClass {

  constructor(one, two) {

    assert(one, "one is a required argument");
    assert(two, "one is a required argument");

    // thrower({ one, two })
    //   .check("one").is.string()
    //   .check("two").is.string();

    this.one = one;
    this.two = two;
  }

  method(one, two) {

    try {
      assert(one, "one is a required argument");
      assert(two, "one is a required argument");
      return Q.resolve(null);
    } catch (ex) {
      return Q.reject(ex);
    }

    // return promiser()
    //   .check("one").is.string()
    //   .check("two").is.number()
    //   .verify({ one, two });

  }

  destructuredMethod({one, two}) {

    try {
      assert(one, "one is a required argument");
      assert(two, "one is a required argument");
      return Q.resolve(null);
    } catch (ex) {
      return Q.reject(ex);
    }

    // return promiser()
    //   .check("one").is.string()
    //   .check("two").is.number()
    //   .verify({ one, two });

  }
}

method("methodParameterTest", () => {

  const obj = new TestClass("one", "two");

  testing.rejects.methodParameterTest(obj, obj.method, ["one", "two"], "one", 2);

  lab.test("does not error when called correctly", () => {

    const obj1 = new TestClass("one", "two");

    return obj1.method("one", 2);

  });

});

method("methodDestructuredParameterTest", () => {

  const obj = new TestClass("one", "two");

  const validArgs = {
    "one": "one",
    "two": "two"
  };

  testing.rejects.methodDestructuredParameterTest(obj, obj.destructuredMethod, validArgs);

  lab.test("does not error when called correctly", () => {

    const obj1 = new TestClass("one", "two");

    return obj1.destructuredMethod(validArgs);

  });

});

method("functionParameterTest", () => {

  const fnc = function (one, two) {

    try {
      assert(one, "one is a required argument");
      assert(two, "one is a required argument");
      return Q.resolve(null);
    } catch (ex) {
      return Q.reject(ex);
    }

    // return promiser()
    //   .check("one").is.string()
    //   .check("two").is.number()
    //   .verify({ one, two });

  };

  testing.rejects.functionParameterTest(fnc, ["one", "two"], "one", 2);

  lab.test("does not error when called correctly", () => {

    return fnc("one", 2);

  });

});

method("functionDestructuredParameterTest", () => {

  const fnc = function ({one, two}) {

    try {
      assert(one, "one is a required argument");
      assert(two, "one is a required argument");
      return Q.resolve(null);
    } catch (ex) {
      return Q.reject(ex);
    }

    // return promiser()
    //   .check("one").is.string()
    //   .check("two").is.number()
    //   .verify({ one, two });

  };

  const validArgs = {
    "one": "one",
    "two": "two"
  };

  testing.rejects.functionDestructuredParameterTest(fnc, validArgs);

  lab.test("does not error when called correctly", () => {

    return fnc(validArgs);

  });

});
