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
        // The code that defines your stack goes here
        new pipelines_1.CodePipeline(this, "Pipelines", {
            pipelineName: "TestPipeline",
            synth: new pipelines_1.ShellStep("Synth", {
                input: pipelines_1.CodePipelineSource.gitHub(
                // https://github.com/RahulFlowiq/cdk-workshop.git
                "RahulFlowiq/cdk-workshop.git", "master"),
                commands: ["npm ci", "npm run build", "npx cdk synth"],
            }),
        });
        // define an AWS Lambda resource
        const hello = new lambda.Function(this, "HelloHandler", {
            runtime: lambda.Runtime.NODEJS_14_X,
            code: lambda.Code.fromAsset("lambda"),
            handler: "hello.handler",
        });
        const hellowithCounter = new hitcounter_1.HitCounter(this, "HelloHitCounter", {
            downstream: hello,
        });
        // define an API Gateway REST API resource backend by our "hello" function
        new apigw.LambdaRestApi(this, "Endpoint", {
            handler: hellowithCounter.handler,
        });
        new cdk_dynamo_table_viewer_1.TableViewer(this, "ViewHitCounter", {
            title: "Hello Hits",
            table: hellowithCounter.table,
        });
        /*    const queue = new sqs.Queue(this, 'CdkWorkshopQueue', {
          visibilityTimeout: Duration.seconds(300)
        });
    
        const topic = new sns.Topic(this, 'CdkWorkshopTopic');
    
        topic.addSubscription(new subs.SqsSubscription(queue)); */
    }
}
exports.CdkWorkshopStack = CdkWorkshopStack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2RrLXdvcmtzaG9wLXN0YWNrLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY2RrLXdvcmtzaG9wLXN0YWNrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBOzs7OzBDQUkwQztBQUMxQyxtQ0FBbUM7QUFDbkMsaURBQWlEO0FBQ2pELG9EQUFvRDtBQUNwRCw2Q0FBMEM7QUFDMUMscUVBQXNEO0FBQ3RELHFEQUkrQjtBQUMvQixNQUFhLGdCQUFpQixTQUFRLEdBQUcsQ0FBQyxLQUFLO0lBQzdDLFlBQVksS0FBYyxFQUFFLEVBQVUsRUFBRSxLQUFzQjtRQUM1RCxLQUFLLENBQUMsS0FBSyxFQUFFLEVBQUUsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUV4Qiw2Q0FBNkM7UUFDN0MsSUFBSSx3QkFBWSxDQUFDLElBQUksRUFBRSxXQUFXLEVBQUU7WUFDbEMsWUFBWSxFQUFFLGNBQWM7WUFDNUIsS0FBSyxFQUFFLElBQUkscUJBQVMsQ0FBQyxPQUFPLEVBQUU7Z0JBQzVCLEtBQUssRUFBRSw4QkFBa0IsQ0FBQyxNQUFNO2dCQUM5QixrREFBa0Q7Z0JBQ2xELDhCQUE4QixFQUM5QixRQUFRLENBQ1Q7Z0JBQ0QsUUFBUSxFQUFFLENBQUMsUUFBUSxFQUFFLGVBQWUsRUFBRSxlQUFlLENBQUM7YUFDdkQsQ0FBQztTQUNILENBQUMsQ0FBQztRQUNILGdDQUFnQztRQUNoQyxNQUFNLEtBQUssR0FBRyxJQUFJLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLGNBQWMsRUFBRTtZQUN0RCxPQUFPLEVBQUUsTUFBTSxDQUFDLE9BQU8sQ0FBQyxXQUFXO1lBQ25DLElBQUksRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUM7WUFDckMsT0FBTyxFQUFFLGVBQWU7U0FDekIsQ0FBQyxDQUFDO1FBRUgsTUFBTSxnQkFBZ0IsR0FBRyxJQUFJLHVCQUFVLENBQUMsSUFBSSxFQUFFLGlCQUFpQixFQUFFO1lBQy9ELFVBQVUsRUFBRSxLQUFLO1NBQ2xCLENBQUMsQ0FBQztRQUNILDBFQUEwRTtRQUMxRSxJQUFJLEtBQUssQ0FBQyxhQUFhLENBQUMsSUFBSSxFQUFFLFVBQVUsRUFBRTtZQUN4QyxPQUFPLEVBQUUsZ0JBQWdCLENBQUMsT0FBTztTQUNsQyxDQUFDLENBQUM7UUFFSCxJQUFJLHFDQUFXLENBQUMsSUFBSSxFQUFFLGdCQUFnQixFQUFFO1lBQ3RDLEtBQUssRUFBRSxZQUFZO1lBQ25CLEtBQUssRUFBRSxnQkFBZ0IsQ0FBQyxLQUFLO1NBQzlCLENBQUMsQ0FBQztRQUNIOzs7Ozs7a0VBTTBEO0lBQzVELENBQUM7Q0FDRjtBQTNDRCw0Q0EyQ0MiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBpbXBvcnQgeyBEdXJhdGlvbiwgU3RhY2ssIFN0YWNrUHJvcHMgfSBmcm9tICdhd3MtY2RrLWxpYic7XG5pbXBvcnQgKiBhcyBzbnMgZnJvbSAnYXdzLWNkay1saWIvYXdzLXNucyc7XG5pbXBvcnQgKiBhcyBzdWJzIGZyb20gJ2F3cy1jZGstbGliL2F3cy1zbnMtc3Vic2NyaXB0aW9ucyc7XG5pbXBvcnQgKiBhcyBzcXMgZnJvbSAnYXdzLWNkay1saWIvYXdzLXNxcyc7XG5pbXBvcnQgeyBDb25zdHJ1Y3QgfSBmcm9tICdjb25zdHJ1Y3RzJzsgKi9cbmltcG9ydCAqIGFzIGNkayBmcm9tIFwiYXdzLWNkay1saWJcIjtcbmltcG9ydCAqIGFzIGxhbWJkYSBmcm9tIFwiYXdzLWNkay1saWIvYXdzLWxhbWJkYVwiO1xuaW1wb3J0ICogYXMgYXBpZ3cgZnJvbSBcImF3cy1jZGstbGliL2F3cy1hcGlnYXRld2F5XCI7XG5pbXBvcnQgeyBIaXRDb3VudGVyIH0gZnJvbSBcIi4vaGl0Y291bnRlclwiO1xuaW1wb3J0IHsgVGFibGVWaWV3ZXIgfSBmcm9tIFwiY2RrLWR5bmFtby10YWJsZS12aWV3ZXJcIjtcbmltcG9ydCB7XG4gIENvZGVQaXBlbGluZSxcbiAgQ29kZVBpcGVsaW5lU291cmNlLFxuICBTaGVsbFN0ZXAsXG59IGZyb20gXCJhd3MtY2RrLWxpYi9waXBlbGluZXNcIjtcbmV4cG9ydCBjbGFzcyBDZGtXb3Jrc2hvcFN0YWNrIGV4dGVuZHMgY2RrLlN0YWNrIHtcbiAgY29uc3RydWN0b3Ioc2NvcGU6IGNkay5BcHAsIGlkOiBzdHJpbmcsIHByb3BzPzogY2RrLlN0YWNrUHJvcHMpIHtcbiAgICBzdXBlcihzY29wZSwgaWQsIHByb3BzKTtcblxuICAgIC8vIFRoZSBjb2RlIHRoYXQgZGVmaW5lcyB5b3VyIHN0YWNrIGdvZXMgaGVyZVxuICAgIG5ldyBDb2RlUGlwZWxpbmUodGhpcywgXCJQaXBlbGluZXNcIiwge1xuICAgICAgcGlwZWxpbmVOYW1lOiBcIlRlc3RQaXBlbGluZVwiLFxuICAgICAgc3ludGg6IG5ldyBTaGVsbFN0ZXAoXCJTeW50aFwiLCB7XG4gICAgICAgIGlucHV0OiBDb2RlUGlwZWxpbmVTb3VyY2UuZ2l0SHViKFxuICAgICAgICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9SYWh1bEZsb3dpcS9jZGstd29ya3Nob3AuZ2l0XG4gICAgICAgICAgXCJSYWh1bEZsb3dpcS9jZGstd29ya3Nob3AuZ2l0XCIsXG4gICAgICAgICAgXCJtYXN0ZXJcIlxuICAgICAgICApLFxuICAgICAgICBjb21tYW5kczogW1wibnBtIGNpXCIsIFwibnBtIHJ1biBidWlsZFwiLCBcIm5weCBjZGsgc3ludGhcIl0sXG4gICAgICB9KSxcbiAgICB9KTtcbiAgICAvLyBkZWZpbmUgYW4gQVdTIExhbWJkYSByZXNvdXJjZVxuICAgIGNvbnN0IGhlbGxvID0gbmV3IGxhbWJkYS5GdW5jdGlvbih0aGlzLCBcIkhlbGxvSGFuZGxlclwiLCB7XG4gICAgICBydW50aW1lOiBsYW1iZGEuUnVudGltZS5OT0RFSlNfMTRfWCwgLy9leGVjdXRpb24gZW52aXJvbm1lbnRcbiAgICAgIGNvZGU6IGxhbWJkYS5Db2RlLmZyb21Bc3NldChcImxhbWJkYVwiKSwgLy9jb2RlIGxvYWRlZCBmcm9tIFwibGFtYmRhXCIgZGlyZWN0b3J5XG4gICAgICBoYW5kbGVyOiBcImhlbGxvLmhhbmRsZXJcIiwgLy9maWxlIGlzIFwiaGVsbG9cIixmdW5jdGlvbiBpcyBcImhhbmRsZXJcIlxuICAgIH0pO1xuXG4gICAgY29uc3QgaGVsbG93aXRoQ291bnRlciA9IG5ldyBIaXRDb3VudGVyKHRoaXMsIFwiSGVsbG9IaXRDb3VudGVyXCIsIHtcbiAgICAgIGRvd25zdHJlYW06IGhlbGxvLFxuICAgIH0pO1xuICAgIC8vIGRlZmluZSBhbiBBUEkgR2F0ZXdheSBSRVNUIEFQSSByZXNvdXJjZSBiYWNrZW5kIGJ5IG91ciBcImhlbGxvXCIgZnVuY3Rpb25cbiAgICBuZXcgYXBpZ3cuTGFtYmRhUmVzdEFwaSh0aGlzLCBcIkVuZHBvaW50XCIsIHtcbiAgICAgIGhhbmRsZXI6IGhlbGxvd2l0aENvdW50ZXIuaGFuZGxlcixcbiAgICB9KTtcblxuICAgIG5ldyBUYWJsZVZpZXdlcih0aGlzLCBcIlZpZXdIaXRDb3VudGVyXCIsIHtcbiAgICAgIHRpdGxlOiBcIkhlbGxvIEhpdHNcIixcbiAgICAgIHRhYmxlOiBoZWxsb3dpdGhDb3VudGVyLnRhYmxlLFxuICAgIH0pO1xuICAgIC8qICAgIGNvbnN0IHF1ZXVlID0gbmV3IHNxcy5RdWV1ZSh0aGlzLCAnQ2RrV29ya3Nob3BRdWV1ZScsIHtcbiAgICAgIHZpc2liaWxpdHlUaW1lb3V0OiBEdXJhdGlvbi5zZWNvbmRzKDMwMClcbiAgICB9KTtcblxuICAgIGNvbnN0IHRvcGljID0gbmV3IHNucy5Ub3BpYyh0aGlzLCAnQ2RrV29ya3Nob3BUb3BpYycpO1xuXG4gICAgdG9waWMuYWRkU3Vic2NyaXB0aW9uKG5ldyBzdWJzLlNxc1N1YnNjcmlwdGlvbihxdWV1ZSkpOyAqL1xuICB9XG59XG4iXX0=