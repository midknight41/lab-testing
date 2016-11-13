// Testing Framework
import * as Code from "code";
import * as Lab from "lab";
import getHelper from "../lib/index";
import { thrower } from "check-verify";

const lab = exports.lab = Lab.script();
const expect = Code.expect;
const testing = getHelper(lab);

const method = testing.createExperiment("LabTesting", "throws");

class TestClass {

  private one: string;
  private two: string;

  constructor(one, two) {

    thrower({ one, two })
      .check("one").is.string()
      .check("two").is.string();

    this.one = one;
    this.two = two;
  }

  method(one, two) {

    thrower({ one, two })
      .check("one").is.string()
      .check("two").is.string();

    return;
  }
}

method("methodParameterTest", () => {

  const obj = new TestClass("one", "two");

  testing.throws.methodParameterTest(obj, obj.method, ["one", "two"], "one", "two");

  lab.test("does not error when called correctly", done => {

    const obj = new TestClass("one", "two");

    obj.method("one", "two");
    return done();

  });

});

method("functionParameterTest", () => {

  const fnc = function (one, two) {

    thrower({ one, two })
      .check("one").is.string()
      .check("two").is.string();

    return;
  };

  testing.throws.functionParameterTest(fnc, ["one", "two"], "one", "two");

  lab.test("does not error when called correctly", done => {

    const obj = new TestClass("one", "two");

    fnc("one", "two");
    return done();

  });

});
