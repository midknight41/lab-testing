
import * as Code from "code";
import ParameterTester from "./ParameterTester";
import assert from "assert";

const expect = Code.expect;

import * as _ from "lodash";


function construct(cls, params) {
  if (Array.isArray(params)) {
    return new cls(...params);
  }
  return new cls(params);
}

function throwTest(obj, fnc, lab, values, description, fieldName, isClass = false) {

  lab.test(`throws on ${description} ${fieldName}`, done => {

    const throws = function () {

      if (isClass) {
        construct(fnc, values);
      } else {
        fnc.apply(obj, values);
      }

    };

    expect(throws).to.throw(Error);

    done();

  });
}

function rejectTest(obj, fnc, lab, values, description, fieldName) {

  lab.test(`rejects on ${description} ${fieldName}`, () => {

    return fnc.call(obj, values)
      .then(() => {
        Code.fail("did not reject");
      })
      .catch(error => {
        expect(error).to.be.an.error();
      });

  });
}

export class LabTesting {

  constructor(lab, throwsTester, rejectTester, constructorTester) {

    assert(lab, "lab is a required argument");
    assert(throwsTester, "throwsTester is a required argument");
    assert(rejectTester, "rejectTester is a required argument");
    assert(constructorTester, "constructorTester is a required argument");

    this.lab = lab;
    this.throws = throwsTester;
    this.rejects = rejectTester;
    this.constructs = constructorTester;
  }

  createExperiment(...levels) {

    assert(levels, "levels is a required argument");


    const NORMAL_MODE = 0;
    const SKIP_MODE = 1;
    const ONLY_MODE = 2;

    if (levels.length === 0) {
      throw new Error("At least one level is required");
    }

    for (const value of levels) {
      if (typeof value !== "string") {
        throw new Error("All levels must be strings");

      }
    }

    const me = this;

    function buildLevel(methodName, innerLevels, position, callback, mode) {

      if (position < innerLevels.length) {

        const label = innerLevels[position];

        me.lab.experiment(label, () => {
          position++;

          buildLevel(methodName, innerLevels, position, callback, mode);

        });

      } else {

        if (mode === SKIP_MODE) {
          me.lab.experiment.skip(methodName, callback);
          return;
        }

        if (mode === ONLY_MODE) {
          me.lab.experiment.only(methodName, callback);
          return;
        }

        me.lab.experiment(methodName, callback);
      }

    }

    const fnc = function (methodName, callback) {
      buildLevel(methodName, levels, 0, callback, NORMAL_MODE);
    };

    const skip = function (methodName, callback) {
      buildLevel(methodName, levels, 0, callback, SKIP_MODE);
    };
    const only = function (methodName, callback) {
      buildLevel(methodName, levels, 0, callback, ONLY_MODE);
    };

    fnc.skip = skip;
    fnc.only = only;

    return fnc;
  }

  standardConstructorTest(Class, labels, ...params) {

    assert(Class, "Class is a required argument");
    assert(labels, "labels is a required argument");
    assert(params, "params is a required argument");

    const lab = this.lab;

    lab.test("ran the standard constructor test properly", done => {
      expect(labels.length).to.equal(params.length);
      done();
    });

    lab.test("returns an object when constructed properly", done => {

      const me = {};
      construct(Class, params);

      expect(me).to.be.an.object();
      done();

    });

    this.constructs.methodParameterTest({}, Class, labels, ...params);

  }

  standardContructorTest(Class, labels, ...params) {

    /* eslint-disable no-console */
    console.warn("LabTesting.standardContructorTest is deprecated (spelling error) and will be remove in future versions. Use LabTesting.standardConstructorTest instead.");

    assert(Class, "Class is a required argument");
    assert(labels, "labels is a required argument");
    assert(params, "params is a required argument");

    const lab = this.lab;

    lab.test("ran the standard constructor test properly", done => {
      expect(labels.length).to.equal(params.length);
      done();
    });

    lab.test("returns an object when constructed properly", done => {

      const me = {};
      construct(Class, params);

      expect(me).to.be.an.object();
      done();

    });

    this.constructs.methodParameterTest({}, Class, labels, ...params);

  }

  destructuredConstructorTest(Class, validParam) {

    assert(Class, "Class is a required argument");
    assert(validParam, "validParam is a required argument");

    const lab = this.lab;

    lab.test("ran the desctructured constructor test properly", done => {
      expect(validParam).to.be.an.object();
      done();
    });

    lab.test("returns an object when constructed properly", done => {

      const me = {};
      construct(Class, validParam);

      expect(me).to.be.an.object();
      done();

    });

    this.constructs.methodDestructuredParameterTest({}, Class, validParam);
  }

  functionParameterTest(fnc, labels, ...params) {

    /* eslint-disable no-console */
    console.warn("LabTesting.functionParameterTest is deprecated and will be remove in future versions. Use LabTesting.throws.functionParameterTest instead.");

    return this.throws.methodParameterTest(null, fnc, labels, ...params);
  }

  methodParameterTest(self, fnc, labels, ...params) {

    /* eslint-disable no-console */
    console.warn("LabTesting.methodParameterTest is deprecated and will be remove in future versions. Use LabTesting.throws.methodParameterTest instead.");

    return this.throws.methodParameterTest(self, fnc, labels, ...params);

  }

  substituteEntry_(index, params, value) {

    const copy = _.slice(params, 0, params.length);

    copy[index] = value;
    return copy;

  }

}

export default function getHelper(lab) {

  const throwTester = new ParameterTester(lab, throwTest, false);
  const rejectTester = new ParameterTester(lab, rejectTest, false);
  const constructorTester = new ParameterTester(lab, throwTest, true);

  return new LabTesting(lab, throwTester, rejectTester, constructorTester);

}