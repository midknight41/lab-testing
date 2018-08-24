// Testing Framework
import * as Code from "code";
import * as Lab from "lab";
import getHelper from "../lib/index";
import assert from "assert";

const lab = exports.lab = Lab.script();
const expect = Code.expect;
const testing = getHelper(lab);

const method = testing.createExperiment("Root", "Main");
const deepLevels = testing.createExperiment("Root", "One", "Two", "Three", "Pass");
const oneLevel = testing.createExperiment("Root");

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
}

class TestDestructClass {

  constructor({one, two}) {

    assert(one, "one is a required argument");
    assert(two, "two is a required argument");

    this.one = one;
    this.two = two;
  }
}

method("createExperiment", () => {

  lab.test("The function returned will execute tests  with structure of Root, Main", () => {

    return;

  });
});

deepLevels("createExperiment", () => {

  lab.test("The function returned will execute tests with structure of Root, One, Two, Three, Pass", () => {

    return;

  });
});

deepLevels.skip("createExperiment", () => {

  lab.test("The function returned will skip tests with structure of Root, One, Two, Three, Pass", () => {

    return;

  });
});

oneLevel("createExperiment", () => {

  lab.test("The function returned will execute tests with structure of Root", () => {

    return;

  });
});


lab.experiment("LabTesting", () => {
  lab.experiment("createExperiment", () => {

    lab.test("skip and only functions exist", () => {

      expect(method.skip).to.be.a.function();
      expect(method.only).to.be.a.function();
      expect(method).to.be.a.function();

    });

    lab.test("No levels throws an error", () => {

      try {
        testing.createExperiment();
      } catch (ex) {
        expect(ex).to.be.an.error(Error, "At least one level is required");
        return;
      }

      Code.fail("unexpected success");

    });

    lab.test("A null first level throws an error", () => {

      try {
        testing.createExperiment(null, "DeepReferences");
      } catch (ex) {
        expect(ex).to.be.an.error(Error, "All levels must be strings");
        return;
      }

      Code.fail("unexpected success");

    });
    lab.test("An undefined first level throws an error", () => {

      try {
        testing.createExperiment(undefined, "DeepReferences");
      } catch (ex) {
        expect(ex).to.be.an.error(Error, "All levels must be strings");
        return;
      }

      Code.fail("unexpected success");


    });

    lab.test("A null second level throws an error", () => {

      try {
        testing.createExperiment("CheckVerify", null);
      } catch (ex) {
        expect(ex).to.be.an.error(Error, "All levels must be strings");
        return;
      }

      Code.fail("unexpected success");

    });
    lab.test("An undefined second level throws an error", () => {

      try {
        testing.createExperiment("CheckVerify", undefined);
      } catch (ex) {
        expect(ex).to.be.an.error(Error, "All levels must be strings");
        return;
      }

      Code.fail("unexpected success");

    });

  });

  lab.experiment("standardConstructorTest", () => {
    testing.standardConstructorTest(TestClass, ["one", "two"], "one", "two");

  });

  lab.experiment("destructuredConstructorTest", () => {
    testing.destructuredConstructorTest(TestDestructClass, {"one": "one", "two": "two"});

  });

});
