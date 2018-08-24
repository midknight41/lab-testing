import * as Code from "code";
import assert from "assert";

const expect = Code.expect;

import * as _ from "lodash";

export default class ParameterTester {

  constructor(lab, testContainer, isClass) {

    assert(lab, "lab is a required argument");
    assert(testContainer, "testContainer is a required argument");
    // assert(isClass, "isClass is a required argument");


    this.isClass = isClass;
    this.lab = lab;
    this.testContainer = testContainer;
  }

  functionParameterTest(fnc, labels, ...params) {
    return this.methodParameterTest(null, fnc, labels, ...params);
  }

  functionDestructuredParameterTest(fnc, validParam) {
    return this.methodDestructuredParameterTest(null, fnc, validParam);
  }

  methodParameterTest(self, fnc, labels, ...params) {

    assert(fnc, "fnc is a required argument");
    assert(labels, "labels is a required argument");

    const lab = this.lab;
    const testType = self === null ? "function" : "method";

    if (this.isClass === false) {

      lab.test(`ran the ${testType} parameter test properly`, () => {
        expect(labels.length).to.equal(params.length);
      });

    }

    for (let i = 0; i < params.length; i++) {

      const label = labels[i];

      // Test null params

      this.createTests_(self, ["a null", "an undefined"], [null, undefined], params, i, label, fnc);

    }

  }

  methodDestructuredParameterTest(self, fnc, validParam) {

    assert(fnc, "fnc is a required argument");
    assert(validParam, "validParam is a required argument");

    const lab = this.lab;
    const testType = self === null ? "function" : "method";

    if (this.isClass === false) {

      lab.test(`ran the ${testType} destructured parameter test properly`, () => {
        expect(validParam).to.be.an.object();
      });

    }

    for (const key of _.keys(validParam)) {

      this.createTests_(self, ["a null", "an undefined"], [null, undefined], validParam, key, key, fnc);
    }
  }

  createTests_(obj, valueDescriptions, values, params, currentId, fieldName, fnc) {

    const lab = this.lab;

    for (let i = 0; i < values.length; i++) {

      const altered = this.substituteEntry_(currentId, params, values[i]);
      const description = valueDescriptions[i];

      this.testContainer(obj, fnc, lab, altered, description, fieldName, this.isClass);

    }

  }

  substituteEntry_(index, params, value) {

    const copy = _.clone(params);

    copy[index] = value;
    return copy;

  }

}
