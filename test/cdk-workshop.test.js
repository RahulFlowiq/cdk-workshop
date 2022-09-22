"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assertions_1 = require("aws-cdk-lib/assertions");
const cdk = require("aws-cdk-lib");
const lambda = require("aws-cdk-lib/aws-lambda");
const hitcounter_1 = require("../lib/hitcounter");
test("DynamoDB Table Created", () => {
    const stack = new cdk.Stack();
    // When
    new hitcounter_1.HitCounter(stack, "MyTestConstruct", {
        downstream: new lambda.Function(stack, "TestFunction", {
            runtime: lambda.Runtime.NODEJS_14_X,
            handler: "hello.handler",
            code: lambda.Code.fromAsset("lambda"),
        }),
    });
    // THEN
    const template = assertions_1.Template.fromStack(stack);
    template.resourceCountIs("AWS::DynamoDB::Table", 1);
});
test("Lambda Has Environment Variables", () => {
    const stack = new cdk.Stack();
    // WHEN
    new hitcounter_1.HitCounter(stack, "MyTestConstruct", {
        downstream: new lambda.Function(stack, "TestFunction", {
            runtime: lambda.Runtime.NODEJS_14_X,
            handler: "hello.handler",
            code: lambda.Code.fromAsset("lambda"),
        }),
    });
    // THEN
    const template = assertions_1.Template.fromStack(stack);
    const envCapture = new assertions_1.Capture();
    template.hasResourceProperties("AWS::Lambda::Function", {
        Environment: envCapture,
    });
    expect(envCapture.asObject()).toEqual({
        Variables: {
            DOWNSTREAM_FUNCTION_NAME: {
                Ref: "TestFunction22AD90FC",
            },
            HITS_TABLE_NAME: {
                Ref: "MyTestConstructHits24A357F0",
            },
        },
    });
});
/* // validate test case
test("read capacity can be configured", () => {
  const stack = new cdk.Stack();

  expect(() => {
    new HitCounter(stack, "MyTestConstruct", {
      downstream: new lambda.Function(stack, "TestFunction", {
        runtime: lambda.Runtime.NODEJS_14_X,
        handler: "hello.handler",
        code: lambda.Code.fromAsset("lambda"),
      }),
      readCapacity: 5,
    });
  }).toThrowError(/readCapacity must be greater than 5 and less than 20/);
});
 */
// import * as CdkWorkshop from "../lib/cdk-workshop-stack";
/* test('SQS Queue and SNS Topic Created', () => {
  const app = new cdk.App();
  // WHEN
  const stack = new CdkWorkshop.CdkWorkshopStack(app, 'MyTestStack');
  // THEN

  const template = Template.fromStack(stack);

  template.hasResourceProperties('AWS::SQS::Queue', {
    VisibilityTimeout: 300
  });
  template.resourceCountIs('AWS::SNS::Topic', 1);
});
 */
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2RrLXdvcmtzaG9wLnRlc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjZGstd29ya3Nob3AudGVzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHVEQUEyRDtBQUMzRCxtQ0FBbUM7QUFDbkMsaURBQWlEO0FBQ2pELGtEQUErQztBQUUvQyxJQUFJLENBQUMsd0JBQXdCLEVBQUUsR0FBRyxFQUFFO0lBQ2xDLE1BQU0sS0FBSyxHQUFHLElBQUksR0FBRyxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQzlCLE9BQU87SUFDUCxJQUFJLHVCQUFVLENBQUMsS0FBSyxFQUFFLGlCQUFpQixFQUFFO1FBQ3ZDLFVBQVUsRUFBRSxJQUFJLE1BQU0sQ0FBQyxRQUFRLENBQUMsS0FBSyxFQUFFLGNBQWMsRUFBRTtZQUNyRCxPQUFPLEVBQUUsTUFBTSxDQUFDLE9BQU8sQ0FBQyxXQUFXO1lBQ25DLE9BQU8sRUFBRSxlQUFlO1lBQ3hCLElBQUksRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUM7U0FDdEMsQ0FBQztLQUNILENBQUMsQ0FBQztJQUNILE9BQU87SUFDUCxNQUFNLFFBQVEsR0FBRyxxQkFBUSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUMzQyxRQUFRLENBQUMsZUFBZSxDQUFDLHNCQUFzQixFQUFFLENBQUMsQ0FBQyxDQUFDO0FBQ3RELENBQUMsQ0FBQyxDQUFDO0FBRUgsSUFBSSxDQUFDLGtDQUFrQyxFQUFFLEdBQUcsRUFBRTtJQUM1QyxNQUFNLEtBQUssR0FBRyxJQUFJLEdBQUcsQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUM5QixPQUFPO0lBQ1AsSUFBSSx1QkFBVSxDQUFDLEtBQUssRUFBRSxpQkFBaUIsRUFBRTtRQUN2QyxVQUFVLEVBQUUsSUFBSSxNQUFNLENBQUMsUUFBUSxDQUFDLEtBQUssRUFBRSxjQUFjLEVBQUU7WUFDckQsT0FBTyxFQUFFLE1BQU0sQ0FBQyxPQUFPLENBQUMsV0FBVztZQUNuQyxPQUFPLEVBQUUsZUFBZTtZQUN4QixJQUFJLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDO1NBQ3RDLENBQUM7S0FDSCxDQUFDLENBQUM7SUFDSCxPQUFPO0lBQ1AsTUFBTSxRQUFRLEdBQUcscUJBQVEsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDM0MsTUFBTSxVQUFVLEdBQUcsSUFBSSxvQkFBTyxFQUFFLENBQUM7SUFDakMsUUFBUSxDQUFDLHFCQUFxQixDQUFDLHVCQUF1QixFQUFFO1FBQ3RELFdBQVcsRUFBRSxVQUFVO0tBQ3hCLENBQUMsQ0FBQztJQUVILE1BQU0sQ0FBQyxVQUFVLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUM7UUFDcEMsU0FBUyxFQUFFO1lBQ1Qsd0JBQXdCLEVBQUU7Z0JBQ3hCLEdBQUcsRUFBRSxzQkFBc0I7YUFDNUI7WUFDRCxlQUFlLEVBQUU7Z0JBQ2YsR0FBRyxFQUFFLDZCQUE2QjthQUNuQztTQUNGO0tBQ0YsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDLENBQUM7QUFFSDs7Ozs7Ozs7Ozs7Ozs7O0dBZUc7QUFDSCw0REFBNEQ7QUFFNUQ7Ozs7Ozs7Ozs7Ozs7R0FhRyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFRlbXBsYXRlLCBDYXB0dXJlIH0gZnJvbSBcImF3cy1jZGstbGliL2Fzc2VydGlvbnNcIjtcbmltcG9ydCAqIGFzIGNkayBmcm9tIFwiYXdzLWNkay1saWJcIjtcbmltcG9ydCAqIGFzIGxhbWJkYSBmcm9tIFwiYXdzLWNkay1saWIvYXdzLWxhbWJkYVwiO1xuaW1wb3J0IHsgSGl0Q291bnRlciB9IGZyb20gXCIuLi9saWIvaGl0Y291bnRlclwiO1xuXG50ZXN0KFwiRHluYW1vREIgVGFibGUgQ3JlYXRlZFwiLCAoKSA9PiB7XG4gIGNvbnN0IHN0YWNrID0gbmV3IGNkay5TdGFjaygpO1xuICAvLyBXaGVuXG4gIG5ldyBIaXRDb3VudGVyKHN0YWNrLCBcIk15VGVzdENvbnN0cnVjdFwiLCB7XG4gICAgZG93bnN0cmVhbTogbmV3IGxhbWJkYS5GdW5jdGlvbihzdGFjaywgXCJUZXN0RnVuY3Rpb25cIiwge1xuICAgICAgcnVudGltZTogbGFtYmRhLlJ1bnRpbWUuTk9ERUpTXzE0X1gsXG4gICAgICBoYW5kbGVyOiBcImhlbGxvLmhhbmRsZXJcIixcbiAgICAgIGNvZGU6IGxhbWJkYS5Db2RlLmZyb21Bc3NldChcImxhbWJkYVwiKSxcbiAgICB9KSxcbiAgfSk7XG4gIC8vIFRIRU5cbiAgY29uc3QgdGVtcGxhdGUgPSBUZW1wbGF0ZS5mcm9tU3RhY2soc3RhY2spO1xuICB0ZW1wbGF0ZS5yZXNvdXJjZUNvdW50SXMoXCJBV1M6OkR5bmFtb0RCOjpUYWJsZVwiLCAxKTtcbn0pO1xuXG50ZXN0KFwiTGFtYmRhIEhhcyBFbnZpcm9ubWVudCBWYXJpYWJsZXNcIiwgKCkgPT4ge1xuICBjb25zdCBzdGFjayA9IG5ldyBjZGsuU3RhY2soKTtcbiAgLy8gV0hFTlxuICBuZXcgSGl0Q291bnRlcihzdGFjaywgXCJNeVRlc3RDb25zdHJ1Y3RcIiwge1xuICAgIGRvd25zdHJlYW06IG5ldyBsYW1iZGEuRnVuY3Rpb24oc3RhY2ssIFwiVGVzdEZ1bmN0aW9uXCIsIHtcbiAgICAgIHJ1bnRpbWU6IGxhbWJkYS5SdW50aW1lLk5PREVKU18xNF9YLFxuICAgICAgaGFuZGxlcjogXCJoZWxsby5oYW5kbGVyXCIsXG4gICAgICBjb2RlOiBsYW1iZGEuQ29kZS5mcm9tQXNzZXQoXCJsYW1iZGFcIiksXG4gICAgfSksXG4gIH0pO1xuICAvLyBUSEVOXG4gIGNvbnN0IHRlbXBsYXRlID0gVGVtcGxhdGUuZnJvbVN0YWNrKHN0YWNrKTtcbiAgY29uc3QgZW52Q2FwdHVyZSA9IG5ldyBDYXB0dXJlKCk7XG4gIHRlbXBsYXRlLmhhc1Jlc291cmNlUHJvcGVydGllcyhcIkFXUzo6TGFtYmRhOjpGdW5jdGlvblwiLCB7XG4gICAgRW52aXJvbm1lbnQ6IGVudkNhcHR1cmUsXG4gIH0pO1xuXG4gIGV4cGVjdChlbnZDYXB0dXJlLmFzT2JqZWN0KCkpLnRvRXF1YWwoe1xuICAgIFZhcmlhYmxlczoge1xuICAgICAgRE9XTlNUUkVBTV9GVU5DVElPTl9OQU1FOiB7XG4gICAgICAgIFJlZjogXCJUZXN0RnVuY3Rpb24yMkFEOTBGQ1wiLFxuICAgICAgfSxcbiAgICAgIEhJVFNfVEFCTEVfTkFNRToge1xuICAgICAgICBSZWY6IFwiTXlUZXN0Q29uc3RydWN0SGl0czI0QTM1N0YwXCIsXG4gICAgICB9LFxuICAgIH0sXG4gIH0pO1xufSk7XG5cbi8qIC8vIHZhbGlkYXRlIHRlc3QgY2FzZVxudGVzdChcInJlYWQgY2FwYWNpdHkgY2FuIGJlIGNvbmZpZ3VyZWRcIiwgKCkgPT4ge1xuICBjb25zdCBzdGFjayA9IG5ldyBjZGsuU3RhY2soKTtcblxuICBleHBlY3QoKCkgPT4ge1xuICAgIG5ldyBIaXRDb3VudGVyKHN0YWNrLCBcIk15VGVzdENvbnN0cnVjdFwiLCB7XG4gICAgICBkb3duc3RyZWFtOiBuZXcgbGFtYmRhLkZ1bmN0aW9uKHN0YWNrLCBcIlRlc3RGdW5jdGlvblwiLCB7XG4gICAgICAgIHJ1bnRpbWU6IGxhbWJkYS5SdW50aW1lLk5PREVKU18xNF9YLFxuICAgICAgICBoYW5kbGVyOiBcImhlbGxvLmhhbmRsZXJcIixcbiAgICAgICAgY29kZTogbGFtYmRhLkNvZGUuZnJvbUFzc2V0KFwibGFtYmRhXCIpLFxuICAgICAgfSksXG4gICAgICByZWFkQ2FwYWNpdHk6IDUsXG4gICAgfSk7XG4gIH0pLnRvVGhyb3dFcnJvcigvcmVhZENhcGFjaXR5IG11c3QgYmUgZ3JlYXRlciB0aGFuIDUgYW5kIGxlc3MgdGhhbiAyMC8pO1xufSk7XG4gKi9cbi8vIGltcG9ydCAqIGFzIENka1dvcmtzaG9wIGZyb20gXCIuLi9saWIvY2RrLXdvcmtzaG9wLXN0YWNrXCI7XG5cbi8qIHRlc3QoJ1NRUyBRdWV1ZSBhbmQgU05TIFRvcGljIENyZWF0ZWQnLCAoKSA9PiB7XG4gIGNvbnN0IGFwcCA9IG5ldyBjZGsuQXBwKCk7XG4gIC8vIFdIRU5cbiAgY29uc3Qgc3RhY2sgPSBuZXcgQ2RrV29ya3Nob3AuQ2RrV29ya3Nob3BTdGFjayhhcHAsICdNeVRlc3RTdGFjaycpO1xuICAvLyBUSEVOXG5cbiAgY29uc3QgdGVtcGxhdGUgPSBUZW1wbGF0ZS5mcm9tU3RhY2soc3RhY2spO1xuXG4gIHRlbXBsYXRlLmhhc1Jlc291cmNlUHJvcGVydGllcygnQVdTOjpTUVM6OlF1ZXVlJywge1xuICAgIFZpc2liaWxpdHlUaW1lb3V0OiAzMDBcbiAgfSk7XG4gIHRlbXBsYXRlLnJlc291cmNlQ291bnRJcygnQVdTOjpTTlM6OlRvcGljJywgMSk7XG59KTtcbiAqL1xuIl19