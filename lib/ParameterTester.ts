import * as Code from "code";
import { Lab } from "lab";
import * as Q from "q";
import { thrower } from "check-verify";

const expect = Code.expect;

import * as _ from "lodash";

export enum Behaviour {
  rejects,
  throws,
  satisfies
}

export interface ParameterSpecification {
  labels: string[];
  params: any[];
}

export default class ParameterTester {

  private lab: Lab;
  private testContainer: Function;

  constructor(lab: Lab, testContainer: Function) {

    thrower({ lab, testContainer })
      .check("lab").is.an.object()
      .check("testContainer").is.a.function();

    this.lab = lab;
    this.testContainer = testContainer;
  }

  public functionParameterTest(fnc: Function, labels: string[], ...params) {
    return this.methodParameterTest(null, fnc, labels, ...params);
  }

  public methodParameterTest(self: Object, fnc: Function, labels: string[], ...params) {

    thrower({ self, fnc, labels, params })
      .check("fnc").is.a.function()
      .check("labels").is.an.array();
    // .optional("self").is.an.object()
    // .optional("params").is.an.array()

    const lab = this.lab;

    lab.test("ran the function parameter test properly", done => {
      expect(labels.length).to.equal(params.length);
      done();
    });

    for (let i = 0; i < params.length; i++) {

      const label = labels[i];

      // Test null params

      this.createThrowTests(self, ["a null", "an undefined"], [null, undefined], params, i, label, fnc);

    }

  }

  private createThrowTests(obj: Object, valueDescriptions: string[], values: any[], params: any[], currentId: number, fieldName: string, fnc: Function) {

    const lab = this.lab;

    for (let i = 0; i < values.length; i++) {

      const altered = this.substituteEntry(currentId, params, values[i]);
      const description = valueDescriptions[i];
      const behaviour = "throw";

      this.testContainer(obj, fnc, lab, altered, description, fieldName);

      /*
            lab.test(`${behaviour} on ${description} ${fieldName}`, done => {
      
              const throws = function () {
                fnc.apply(obj, altered);
              };
      
              expect(throws).to.throw();
      
              done();
      
            });
      */
    }

  }

  private substituteEntry(index: number, params: any[], value: any) {

    let copy = _.slice(params, 0, params.length);

    copy[index] = value;
    return copy;

  }

}
