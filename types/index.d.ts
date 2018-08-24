import { Lab } from "lab";
import ParameterTester from "./ParameterTester";
export declare class LabTesting {
    private lab;
    rejects: ParameterTester;
    throws: ParameterTester;
    private constructs;
    constructor(lab: Lab, throwsTester: ParameterTester, rejectTester: ParameterTester, constructorTester: ParameterTester);
    createExperiment(...levels: string[]): Function;
    destructuredConstructorTest(Class: any, validParam: Object): void;
    standardConstructorTest(Class: any, labels: string[], ...params: any[]): void;
    private substituteEntry(index, params, value);
}
export default function getHelper(lab: Lab): LabTesting;
