"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CdkWorkshopStack = void 0;
/* import { Duration, Stack, StackProps } from 'aws-cdk-lib';
import * as sns from 'aws-cdk-lib/aws-sns';
import * as subs from 'aws-cdk-lib/aws-sns-subscriptions';
import * as sqs from 'aws-cdk-lib/aws-sqs';
import { Construct } from 'constructs'; */
const cdk = require("aws-cdk-lib");
const lambda = require("aws-cdk-lib/aws-lambda");
const apigw = require("aws-cdk-lib/aws-apigateway");
const hitcounter_1 = require("./hitcounter");
const cdk_dynamo_table_viewer_1 = require("cdk-dynamo-table-viewer");
const pipelines_1 = require("aws-cdk-lib/pipelines");
class CdkWorkshopStack extends cdk.Stack {
    constructor(scope, id, props) {
        super(scope, id, props);
        // define an AWS Lambda resource
        this.hello = new lambda.Function(this, "HelloHandler", {
            runtime: lambda.Runtime.NODEJS_14_X,
            code: lambda.Code.fromAsset("lambda"),
            handler: "hello.handler",
        });
        this.hellowithCounter = new hitcounter_1.HitCounter(this, "HelloHitCounter", {
            downstream: hello,
        });
        new pipelines_1.CodePipeline(this, "Pipelines", {
            pipelineName: "TestPipeline",
            synth: new pipelines_1.ShellStep("Synth", {
                input: pipelines_1.CodePipelineSource.gitHub(
                // https://github.com/RahulFlowiq/CI-CD-AWS-PIPELINE-DEMO.git
                "RahulFlowiq/CDK-Demo.git", "main"),
                commands: ["npm ci", "npm run build", "npx cdk synth"],
            }),
        });
    }
}
exports.CdkWorkshopStack = CdkWorkshopStack;
// define an API Gateway REST API resource backend by our "hello" function
new apigw.LambdaRestApi(this, "Endpoint", {
    handler: hellowithCounter.handler,
});
new cdk_dynamo_table_viewer_1.TableViewer(this, "ViewHitCounter", {
    title: "Hello Hits",
    table: hellowithCounter.table,
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2RrLXdvcmtzaG9wLXN0YWNrLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY2RrLXdvcmtzaG9wLXN0YWNrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBOzs7OzBDQUkwQztBQUMxQyxtQ0FBbUM7QUFDbkMsaURBQWlEO0FBQ2pELG9EQUFvRDtBQUNwRCw2Q0FBMEM7QUFDMUMscUVBQXNEO0FBQ3RELHFEQUFvRjtBQUNwRixNQUFhLGdCQUFpQixTQUFRLEdBQUcsQ0FBQyxLQUFLO0lBQzdDLFlBQVksS0FBYyxFQUFFLEVBQVUsRUFBRSxLQUFzQjtRQUM1RCxLQUFLLENBQUMsS0FBSyxFQUFFLEVBQUUsRUFBRSxLQUFLLENBQUMsQ0FBQztRQWN4QixnQ0FBZ0M7UUFDMUIsVUFBSyxHQUFHLElBQUksTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsY0FBYyxFQUFFO1lBQ3RELE9BQU8sRUFBRSxNQUFNLENBQUMsT0FBTyxDQUFDLFdBQVc7WUFDbkMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQztZQUNyQyxPQUFPLEVBQUUsZUFBZTtTQUN6QixDQUFDLENBQUM7UUFFRyxxQkFBZ0IsR0FBRyxJQUFJLHVCQUFVLENBQUMsSUFBSSxFQUFFLGlCQUFpQixFQUFFO1lBQy9ELFVBQVUsRUFBRSxLQUFLO1NBQ2xCLENBQUMsQ0FBQztRQXJCRixJQUFJLHdCQUFZLENBQUMsSUFBSSxFQUFFLFdBQVcsRUFBRTtZQUNuQyxZQUFZLEVBQUUsY0FBYztZQUM1QixLQUFLLEVBQUUsSUFBSSxxQkFBUyxDQUFDLE9BQU8sRUFBRTtnQkFDNUIsS0FBSyxFQUFFLDhCQUFrQixDQUFDLE1BQU07Z0JBQzlCLDZEQUE2RDtnQkFDN0QsMEJBQTBCLEVBQzFCLE1BQU0sQ0FDUDtnQkFDRCxRQUFRLEVBQUUsQ0FBQyxRQUFRLEVBQUUsZUFBZSxFQUFFLGVBQWUsQ0FBQzthQUN2RCxDQUFDO1NBQ0gsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztDQVVJO0FBekJQLDRDQXlCTztBQUNILDBFQUEwRTtBQUMxRSxJQUFJLEtBQUssQ0FBQyxhQUFhLENBQUMsSUFBSSxFQUFFLFVBQVUsRUFBRTtJQUN4QyxPQUFPLEVBQUUsZ0JBQWdCLENBQUMsT0FBTztDQUNsQyxDQUFDLENBQUM7QUFFSCxJQUFJLHFDQUFXLENBQUMsSUFBSSxFQUFFLGdCQUFnQixFQUFFO0lBQ3RDLEtBQUssRUFBRSxZQUFZO0lBQ25CLEtBQUssRUFBRSxnQkFBZ0IsQ0FBQyxLQUFLO0NBQzlCLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qIGltcG9ydCB7IER1cmF0aW9uLCBTdGFjaywgU3RhY2tQcm9wcyB9IGZyb20gJ2F3cy1jZGstbGliJztcbmltcG9ydCAqIGFzIHNucyBmcm9tICdhd3MtY2RrLWxpYi9hd3Mtc25zJztcbmltcG9ydCAqIGFzIHN1YnMgZnJvbSAnYXdzLWNkay1saWIvYXdzLXNucy1zdWJzY3JpcHRpb25zJztcbmltcG9ydCAqIGFzIHNxcyBmcm9tICdhd3MtY2RrLWxpYi9hd3Mtc3FzJztcbmltcG9ydCB7IENvbnN0cnVjdCB9IGZyb20gJ2NvbnN0cnVjdHMnOyAqL1xuaW1wb3J0ICogYXMgY2RrIGZyb20gXCJhd3MtY2RrLWxpYlwiO1xuaW1wb3J0ICogYXMgbGFtYmRhIGZyb20gXCJhd3MtY2RrLWxpYi9hd3MtbGFtYmRhXCI7XG5pbXBvcnQgKiBhcyBhcGlndyBmcm9tIFwiYXdzLWNkay1saWIvYXdzLWFwaWdhdGV3YXlcIjtcbmltcG9ydCB7IEhpdENvdW50ZXIgfSBmcm9tIFwiLi9oaXRjb3VudGVyXCI7XG5pbXBvcnQgeyBUYWJsZVZpZXdlciB9IGZyb20gXCJjZGstZHluYW1vLXRhYmxlLXZpZXdlclwiO1xuaW1wb3J0IHsgQ29kZVBpcGVsaW5lLCBDb2RlUGlwZWxpbmVTb3VyY2UsIFNoZWxsU3RlcCB9IGZyb20gXCJhd3MtY2RrLWxpYi9waXBlbGluZXNcIjtcbmV4cG9ydCBjbGFzcyBDZGtXb3Jrc2hvcFN0YWNrIGV4dGVuZHMgY2RrLlN0YWNrIHtcbiAgY29uc3RydWN0b3Ioc2NvcGU6IGNkay5BcHAsIGlkOiBzdHJpbmcsIHByb3BzPzogY2RrLlN0YWNrUHJvcHMpIHtcbiAgICBzdXBlcihzY29wZSwgaWQsIHByb3BzKTtcblxuICAgICBuZXcgQ29kZVBpcGVsaW5lKHRoaXMsIFwiUGlwZWxpbmVzXCIsIHtcbiAgICAgIHBpcGVsaW5lTmFtZTogXCJUZXN0UGlwZWxpbmVcIixcbiAgICAgIHN5bnRoOiBuZXcgU2hlbGxTdGVwKFwiU3ludGhcIiwge1xuICAgICAgICBpbnB1dDogQ29kZVBpcGVsaW5lU291cmNlLmdpdEh1YihcbiAgICAgICAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vUmFodWxGbG93aXEvQ0ktQ0QtQVdTLVBJUEVMSU5FLURFTU8uZ2l0XG4gICAgICAgICAgXCJSYWh1bEZsb3dpcS9DREstRGVtby5naXRcIixcbiAgICAgICAgICBcIm1haW5cIlxuICAgICAgICApLFxuICAgICAgICBjb21tYW5kczogW1wibnBtIGNpXCIsIFwibnBtIHJ1biBidWlsZFwiLCBcIm5weCBjZGsgc3ludGhcIl0sXG4gICAgICB9KSxcbiAgICB9KTtcbiAgfVxuICAgIC8vIGRlZmluZSBhbiBBV1MgTGFtYmRhIHJlc291cmNlXG4gICAgY29uc3QgaGVsbG8gPSBuZXcgbGFtYmRhLkZ1bmN0aW9uKHRoaXMsIFwiSGVsbG9IYW5kbGVyXCIsIHtcbiAgICAgIHJ1bnRpbWU6IGxhbWJkYS5SdW50aW1lLk5PREVKU18xNF9YLCAvL2V4ZWN1dGlvbiBlbnZpcm9ubWVudFxuICAgICAgY29kZTogbGFtYmRhLkNvZGUuZnJvbUFzc2V0KFwibGFtYmRhXCIpLCAvL2NvZGUgbG9hZGVkIGZyb20gXCJsYW1iZGFcIiBkaXJlY3RvcnlcbiAgICAgIGhhbmRsZXI6IFwiaGVsbG8uaGFuZGxlclwiLCAvL2ZpbGUgaXMgXCJoZWxsb1wiLGZ1bmN0aW9uIGlzIFwiaGFuZGxlclwiXG4gICAgfSk7XG5cbiAgICBjb25zdCBoZWxsb3dpdGhDb3VudGVyID0gbmV3IEhpdENvdW50ZXIodGhpcywgXCJIZWxsb0hpdENvdW50ZXJcIiwge1xuICAgICAgZG93bnN0cmVhbTogaGVsbG8sXG4gICAgfSk7XG4gICAgLy8gZGVmaW5lIGFuIEFQSSBHYXRld2F5IFJFU1QgQVBJIHJlc291cmNlIGJhY2tlbmQgYnkgb3VyIFwiaGVsbG9cIiBmdW5jdGlvblxuICAgIG5ldyBhcGlndy5MYW1iZGFSZXN0QXBpKHRoaXMsIFwiRW5kcG9pbnRcIiwge1xuICAgICAgaGFuZGxlcjogaGVsbG93aXRoQ291bnRlci5oYW5kbGVyLFxuICAgIH0pO1xuXG4gICAgbmV3IFRhYmxlVmlld2VyKHRoaXMsIFwiVmlld0hpdENvdW50ZXJcIiwge1xuICAgICAgdGl0bGU6IFwiSGVsbG8gSGl0c1wiLFxuICAgICAgdGFibGU6IGhlbGxvd2l0aENvdW50ZXIudGFibGUsXG4gICAgfSk7XG4gICAgLyogICAgY29uc3QgcXVldWUgPSBuZXcgc3FzLlF1ZXVlKHRoaXMsICdDZGtXb3Jrc2hvcFF1ZXVlJywge1xuICAgICAgdmlzaWJpbGl0eVRpbWVvdXQ6IER1cmF0aW9uLnNlY29uZHMoMzAwKVxuICAgIH0pO1xuXG4gICAgY29uc3QgdG9waWMgPSBuZXcgc25zLlRvcGljKHRoaXMsICdDZGtXb3Jrc2hvcFRvcGljJyk7XG5cbiAgICB0b3BpYy5hZGRTdWJzY3JpcHRpb24obmV3IHN1YnMuU3FzU3Vic2NyaXB0aW9uKHF1ZXVlKSk7ICovXG4gIH1cbn1cbiJdfQ==