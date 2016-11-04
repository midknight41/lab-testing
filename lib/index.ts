import * as Code from "code";
import { Lab } from "lab";
import * as Q from "q";
import { thrower } from "check-verify";

const expect = Code.expect;

import * as _ from "lodash";

export class TestHelper {

  private lab: Lab;

  constructor(lab: Lab) {

    thrower({ lab })
      .check("lab").is.an.object();

    this.lab = lab;
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

    for (let i = 0; i < params.length; i++) {

      const label = labels[i];

      // Test null params
      lab.test(`throws on a null ${label}`, done => {

        const altered = this.substituteEntry(i, params, null);

        const throws = function () {
          Class.apply({}, altered);
        }

        expect(throws).to.throw();

        done();

      });

      lab.test(`throws on a undefined ${label}`, done => {

        const altered = this.substituteEntry(i, params, undefined);

        const throws = function () {
          Class.apply({}, altered);
        }

        expect(throws).to.throw();

        done();

      });

    }

  }

  private substituteEntry(index: number, params: any[], value: any) {

    let copy = _.slice(params, 0, params.length);

    copy[index] = value;

    return copy;

  }

}

export default function getHelper(lab: Lab) {

  return new TestHelper(lab);

}