import * as cdk from "aws-cdk-lib";
import { HitCounter } from "./hitcounter";
export declare class CdkWorkshopStack extends cdk.Stack {
    constructor(scope: cdk.App, id: string, props?: cdk.StackProps);
    const hello: cdk.aws_lambda.Function;
    const hellowithCounter: HitCounter;
}
