//import * as Q from "q";
/// <reference path="../q/Q.d.ts" />

declare module "check-verify" {

  function thrower(source?: Object): CheckVerify<void>;
  function promiser(): CheckVerify<Q.Promise>;

  interface CheckVerify<T> {
    check(field: string): CheckVerify<T>;
    verify(source: Object): T;
    explain(): any[];
    array(): CheckVerify<T>;
    object(): CheckVerify<T>;
    function(): CheckVerify<T>;
    number(): CheckVerify<T>;
    boolean(): CheckVerify<T>;
    string(): CheckVerify<T>;
    url(): CheckVerify<T>;
    date(): CheckVerify<T>;

    readonly a: this;
    readonly an: this;
    readonly that: this;
    readonly is: this;

  }

}