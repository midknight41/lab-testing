// Testing Framework
import * as Code from "code";
import * as Lab from "lab";
import getHelper from "../lib/index";
import { thrower } from "check-verify";

const lab = exports.lab = Lab.script();
const expect = Code.expect;
const testing = getHelper(lab);

const method = testing.createExperiment("LabTesting", "Main");

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

method("createExperiment", () => {

  lab.test("The function returned will execute tests", done => {

    return done();

  });
});

lab.experiment("LabTesting", () => {
  lab.experiment("createExperiment", () => {
    lab.test("A null service throws an error", done => {

      try {
        testing.createExperiment(null, "DeepReferences");
        Code.fail("unexpected success");
      }
      catch (ex) {
        return done();
      }

    });
    lab.test("An undefined service throws an error", done => {

      try {
        testing.createExperiment(undefined, "DeepReferences");
        Code.fail("unexpected success");
      }
      catch (ex) {
        return done();
      }

    });

    lab.test("A null component throws an error", done => {

      try {
        testing.createExperiment("CheckVerify", null);
        Code.fail("unexpected success");
      }
      catch (ex) {
        return done();
      }

    });
    lab.test("An undefined component throws an error", done => {

      try {
        testing.createExperiment("CheckVerify", undefined);
        Code.fail("unexpected success");
      }
      catch (ex) {
        return done();
      }

    });

  });

  lab.experiment("standardContructorTest", () => {
    testing.standardContructorTest(TestClass, ["one", "two"], "one", "two");

  });

  lab.experiment("deprecated code works with warnings", () => {

    const obj = new TestClass("one", "two");

    testing.methodParameterTest(obj, obj.method, ["one", "two"], "one", "two");

    const fnc = function (one, two) {

      thrower({ one, two })
        .check("one").is.string()
        .check("two").is.string();

      return;
    };

    testing.functionParameterTest(fnc, ["one", "two"], "one", "two");

  });

});
