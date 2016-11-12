import * as Code from "code";
import { Lab } from "lab";
import * as Q from "q";
import { thrower } from "check-verify";
import ParameterTester from "./ParameterTester";

const expect = Code.expect;

import * as _ from "lodash";

export class TestHelper {

  private lab: Lab;
  public rejects: ParameterTester;
  public throws: ParameterTester;

  constructor(lab: Lab, throwsTester: ParameterTester, rejectTester: ParameterTester) {

    thrower({ lab, throwsTester, rejectTester })
      .check("lab").is.an.object()
      .check("throwsTester").is.an.object()
      .check("rejectTester").is.an.object();

    this.lab = lab;
    this.throws = throwsTester;
    this.rejects = rejectTester;
  }

  createExperiment(service: string, component: string): Function {

    thrower({ service, component })
      .check("service").is.a.string()
      .check("component").is.a.string();

    const me = this;

    const fnc = function (methodName: string, callback: () => void) {

      me.lab.experiment(service, () => {
        me.lab.experiment(component, () => {
          me.lab.experiment(methodName, callback);
        });
      });
    };

    return fnc;
  }

  createExperimentNew(...levels: string[]): Function {

    thrower({ levels })
      .check("levels").is.an.array();

    const me = this;

    function buildLevel(methodName, levels, position, callback) {

      if (levels.length <= position) {

        const label = levels[position];

        me.lab.experiment(label, () => {

          buildLevel(methodName, levels, position++, callback);

        });

      } else {
        me.lab.experiment(methodName, callback);
      }

    }

    const fnc = function (methodName: string, callback: () => void) {

      buildLevel(methodName, levels, 0, callback);
    };

    return fnc;
  }

  standardContructorTest(Class, labels: string[], ...params) {

    thrower({ Class, labels, params })
      .check("Class").is.a.function()
      .check("labels").is.an.array();
    // .optional("params").is.an.array()


    const lab = this.lab;

    lab.test("ran the standard contructor test properly", done => {
      expect(labels.length).to.equal(params.length);
      done();
    });

    lab.test("returns an object when constructed properly", done => {

      const me = {};
      Class.apply(me, params);

      expect(me).to.be.an.object();
      done();

    });

    this.throws.methodParameterTest({}, Class, labels, ...params);

  }

  public functionParameterTest(fnc: Function, labels: string[], ...params) {
    return this.throws.methodParameterTest(null, fnc, labels, ...params);
  }

  public methodParameterTest(self: Object, fnc: Function, labels: string[], ...params) {
    return this.throws.methodParameterTest(self, fnc, labels, ...params);

  }

  private substituteEntry(index: number, params: any[], value: any) {

    let copy = _.slice(params, 0, params.length);

    copy[index] = value;
    return copy;

  }

}

export default function getHelper(lab: Lab) {

  const throwTester = new ParameterTester(lab, throwTest);
  const rejectTester = new ParameterTester(lab, rejectTest);

  return new TestHelper(lab, throwTester, rejectTester);

}

function throwTest(obj: Object, fnc: Function, lab: Lab, values: any[], description: string, fieldName: string) {

  lab.test(`throws on ${description} ${fieldName}`, done => {

    const throws = function () {
      fnc.apply(obj, values);
    };

    expect(throws).to.throw();

    done();

  });
}

function rejectTest(obj: Object, fnc: Function, lab: Lab, values: any[], description: string, fieldName: string) {

  lab.test(`throws on ${description} ${fieldName}`, done => {

    const throws = function () {
      fnc.apply(obj, values);
    };

    expect(throws).to.throw();

    done();

  });
}
