import { Lab } from "lab";
export interface ParameterSpecification {
    labels: string[];
    params: any[];
}
export default class ParameterTester {
    private lab;
    private testContainer;
    private isClass;
    constructor(lab: Lab, testContainer: Function, isClass: boolean);
    functionParameterTest(fnc: Function, labels: string[], ...params: any[]): void;
    methodParameterTest(self: Object, fnc: Function, labels: string[], ...params: any[]): void;
    private createTests(obj, valueDescriptions, values, params, currentId, fieldName, fnc);
    private substituteEntry(index, params, value);
}
