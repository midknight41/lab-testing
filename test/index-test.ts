// Testing Framework
import * as Code from "code";
import * as Lab from "lab";
import getHelper from "../lib/index";
import { thrower } from "check-verify";

const lab = exports.lab = Lab.script();
const expect = Code.expect;
const helper = getHelper(lab);

const method = helper.createExperiment("ServiceEntry", "ComponentEntry");

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
}

method("createExperiment", () => {

  lab.test("The function returned will execute tests", done => {

    return done();

  });
});

lab.experiment("TestHelper", () => {
  lab.experiment("createExperiment", () => {
    lab.test("A null service throws an error", done => {

      try {
        helper.createExperiment(null, "DeepReferences");
        Code.fail("unexpected success");
      }
      catch (ex) {
        return done();
      }

    });
    lab.test("An undefined service throws an error", done => {

      try {
        helper.createExperiment(undefined, "DeepReferences");
        Code.fail("unexpected success");
      }
      catch (ex) {
        return done();
      }

    });

    lab.test("A null component throws an error", done => {

      try {
        helper.createExperiment("CheckVerify", null);
        Code.fail("unexpected success");
      }
      catch (ex) {
        return done();
      }

    });
    lab.test("An undefined component throws an error", done => {

      try {
        helper.createExperiment("CheckVerify", undefined);
        Code.fail("unexpected success");
      }
      catch (ex) {
        return done();
      }

    });

  });

  lab.experiment("standardContructorTest", () => {
    helper.standardContructorTest(TestClass, ["one", "two"], "one", "two");

  });

});
