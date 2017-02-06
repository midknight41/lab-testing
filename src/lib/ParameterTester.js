import * as Code from "code";
import { Lab } from "lab";
import * as Q from "q";
// import { thrower } from "check-verify";
import assert from "assert";

const expect = Code.expect;

import * as _ from "lodash";

export default class ParameterTester {

  constructor(lab, testContainer, isClass) {

    assert(lab, "lab is a required argument");
    assert(testContainer, "testContainer is a required argument");
    // assert(isClass, "isClass is a required argument");

    // thrower({ lab, testContainer, isClass })
    //   .check("lab").is.an.object()
    //   .check("testContainer").is.a.function()
    //   .check("isClass").is.a.boolean();

    this.isClass = isClass;
    this.lab = lab;
    this.testContainer = testContainer;
  }

  functionParameterTest(fnc, labels, ...params) {
    return this.methodParameterTest(null, fnc, labels, ...params);
  }

  methodParameterTest(self, fnc, labels, ...params) {

    assert(fnc, "self is a required argument");
    assert(labels, "self is a required argument");
    
    // thrower({ self, fnc, labels, params })
    //   .check("fnc").is.a.function()
    //   .check("labels").is.an.array()
    //   .optional("self").is.an.object()
    //   .optional("params").is.an.array();

    const lab = this.lab;
    const testType = self === null ? "function" : "method";

    if (this.isClass === false) {

      lab.test(`ran the ${testType} parameter test properly`, done => {
        expect(labels.length).to.equal(params.length);
        done();
      });

    }

    for (let i = 0; i < params.length; i++) {

      const label = labels[i];

      // Test null params

      this.createTests_(self, ["a null", "an undefined"], [null, undefined], params, i, label, fnc);

    }

  }

  createTests_(obj, valueDescriptions, values, params, currentId, fieldName, fnc) {

    const lab = this.lab;

    for (let i = 0; i < values.length; i++) {

      const altered = this.substituteEntry_(currentId, params, values[i]);
      const description = valueDescriptions[i];
      const behaviour = "throw";

      this.testContainer(obj, fnc, lab, altered, description, fieldName, this.isClass);

    }

  }

  substituteEntry_(index, params, value) {

    let copy = _.slice(params, 0, params.length);

    copy[index] = value;
    return copy;

  }

}
