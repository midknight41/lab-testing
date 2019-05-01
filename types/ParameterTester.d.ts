import { Script } from "@hapi/lab";
export interface ParameterSpecification {
    labels: string[];
    params: any[];
}
export default class ParameterTester {
    private lab;
    private testContainer;
    private isClass;
    constructor(lab: Script, testContainer: Function, isClass: boolean);
    functionParameterTest(fnc: Function, labels: string[], ...params: any[]): void;
    functionDestructuredParameterTest(fnc: Function, inputArgs: Object): void;
    methodDestructuredParameterTest(self: Object, fnc: Function, inputArgs: Object): void;
    methodParameterTest(self: Object, fnc: Function, labels: string[], ...params: any[]): void;
    private createTests(obj, valueDescriptions, values, params, currentId, fieldName, fnc);
    private substituteEntry(index, params, value);
}
