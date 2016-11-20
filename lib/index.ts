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

  //  createExperiment(service: string, component: string): Function {
  createExperiment(...levels: string[]): Function {

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

    for (let i = 0; i < params.length; i++) {

      const label = labels[i];

      // Test null params
      lab.test(`throws on a null ${label}`, done => {

        const altered = this.substituteEntry(i, params, null);

        const throws = function () {
          Class.apply({}, altered);
        };

        expect(throws).to.throw();

        done();

      });

      lab.test(`throws on a undefined ${label}`, done => {

        const altered = this.substituteEntry(i, params, undefined);

        const throws = function () {
          Class.apply({}, altered);
        };

        expect(throws).to.throw();

        done();

      });

    }

  }

  public functionParameterTest(fnc: Function, labels: string[], ...params) {
    return this.methodParameterTest(null, fnc, labels, ...params);
  }

  public methodParameterTest(self: Object, fnc: Function, labels: string[], ...params) {

    thrower({ self, fnc, labels, params })
      .check("fnc").is.a.function()
      .check("labels").is.an.array();
    //  .optional("self").is.an.object()
    // .optional("params").is.an.array()

    const lab = this.lab;

    lab.test("ran the function parameter test properly", done => {
      expect(labels.length).to.equal(params.length);
      done();
    });

    for (let i = 0; i < params.length; i++) {

      const label = labels[i];

      // Test null params
      lab.test(`throws on a null ${label}`, done => {

        const altered = this.substituteEntry(i, params, null);

        const throws = function () {
          fnc.apply(self, altered);
        };

        expect(throws).to.throw();

        done();

      });

      lab.test(`throws on a undefined ${label}`, done => {

        const altered = this.substituteEntry(i, params, undefined);

        const throws = function () {
          fnc.apply(self, altered);
        };

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
