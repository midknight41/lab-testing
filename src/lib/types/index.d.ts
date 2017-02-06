import { Lab } from "lab";
import ParameterTester from "./ParameterTester";
export declare class LabTesting {
    private lab;
    rejects: ParameterTester;
    throws: ParameterTester;
    private constructs;
    constructor(lab: Lab, throwsTester: ParameterTester, rejectTester: ParameterTester, constructorTester: ParameterTester);
    createExperimentOld(service: string, component: string): Function;
    createExperiment(...levels: string[]): Function;
    standardContructorTest(Class: any, labels: string[], ...params: any[]): void;
    functionParameterTest(fnc: Function, labels: string[], ...params: any[]): void;
    methodParameterTest(self: Object, fnc: Function, labels: string[], ...params: any[]): void;
    private substituteEntry(index, params, value);
}
export default function getHelper(lab: Lab): LabTesting;
