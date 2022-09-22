"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HitCounter = void 0;
const lambda = require("aws-cdk-lib/aws-lambda");
const dynamodb = require("aws-cdk-lib/aws-dynamodb");
const constructs_1 = require("constructs");
class HitCounter extends constructs_1.Construct {
    constructor(scope, id, props) {
        var _a;
        super(scope, id);
        const table = new dynamodb.Table(this, "Hits", {
            partitionKey: { name: "path", type: dynamodb.AttributeType.STRING },
            readCapacity: (_a = props.readCapacity) !== null && _a !== void 0 ? _a : 5,
        });
        this.table = table;
        this.handler = new lambda.Function(this, "HitCounterHandler", {
            runtime: lambda.Runtime.NODEJS_14_X,
            handler: "hitcounter.handler",
            code: lambda.Code.fromAsset("lambda"),
            environment: {
                DOWNSTREAM_FUNCTION_NAME: props.downstream.functionName,
                HITS_TABLE_NAME: table.tableName,
            },
        });
        //   grant the lambda role read/write permission to our table
        table.grantReadWriteData(this.handler);
        //   grant the lambda role invoke permission to the downstream function
        props.downstream.grantInvoke(this.handler);
    }
}
exports.HitCounter = HitCounter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGl0Y291bnRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImhpdGNvdW50ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQ0EsaURBQWlEO0FBQ2pELHFEQUFxRDtBQUNyRCwyQ0FBdUM7QUFRdkMsTUFBYSxVQUFXLFNBQVEsc0JBQVM7SUFPdkMsWUFBWSxLQUFnQixFQUFFLEVBQVUsRUFBRSxLQUFzQjs7UUFDOUQsS0FBSyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQztRQUVqQixNQUFNLEtBQUssR0FBRyxJQUFJLFFBQVEsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLE1BQU0sRUFBRTtZQUM3QyxZQUFZLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxRQUFRLENBQUMsYUFBYSxDQUFDLE1BQU0sRUFBRTtZQUNuRSxZQUFZLFFBQUUsS0FBSyxDQUFDLFlBQVksbUNBQUksQ0FBQztTQUN0QyxDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUVuQixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsbUJBQW1CLEVBQUU7WUFDNUQsT0FBTyxFQUFFLE1BQU0sQ0FBQyxPQUFPLENBQUMsV0FBVztZQUNuQyxPQUFPLEVBQUUsb0JBQW9CO1lBQzdCLElBQUksRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUM7WUFDckMsV0FBVyxFQUFFO2dCQUNYLHdCQUF3QixFQUFFLEtBQUssQ0FBQyxVQUFVLENBQUMsWUFBWTtnQkFDdkQsZUFBZSxFQUFFLEtBQUssQ0FBQyxTQUFTO2FBQ2pDO1NBQ0YsQ0FBQyxDQUFDO1FBRUgsNkRBQTZEO1FBQzdELEtBQUssQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7UUFFdkMsdUVBQXVFO1FBQ3ZFLEtBQUssQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUM3QyxDQUFDO0NBQ0Y7QUFoQ0QsZ0NBZ0NDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgY2RrIGZyb20gXCJhd3MtY2RrLWxpYlwiO1xyXG5pbXBvcnQgKiBhcyBsYW1iZGEgZnJvbSBcImF3cy1jZGstbGliL2F3cy1sYW1iZGFcIjtcclxuaW1wb3J0ICogYXMgZHluYW1vZGIgZnJvbSBcImF3cy1jZGstbGliL2F3cy1keW5hbW9kYlwiO1xyXG5pbXBvcnQgeyBDb25zdHJ1Y3QgfSBmcm9tIFwiY29uc3RydWN0c1wiO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBIaXRDb3VudGVyUHJvcHMge1xyXG4gIC8qIHRoZSBmdW5jdGlvbiBmb3Igd2hpY2ggd2Ugd2FudCB0byBjb3VudCB1cmwgaGl0cyAqL1xyXG4gIGRvd25zdHJlYW06IGxhbWJkYS5JRnVuY3Rpb247XHJcbiAgcmVhZENhcGFjaXR5PzogbnVtYmVyO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgSGl0Q291bnRlciBleHRlbmRzIENvbnN0cnVjdCB7XHJcbiAgLy8gQWxsb3dzIGFjY2Vzc2luZyB0aGUgY291bnRlciBmdW5jdGlvblxyXG4gIHB1YmxpYyByZWFkb25seSBoYW5kbGVyOiBsYW1iZGEuRnVuY3Rpb247XHJcblxyXG4gIC8vIHRoZSBoaXQgY291bnRlciB0YWJsZVxyXG4gIHB1YmxpYyByZWFkb25seSB0YWJsZTogZHluYW1vZGIuVGFibGU7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHNjb3BlOiBDb25zdHJ1Y3QsIGlkOiBzdHJpbmcsIHByb3BzOiBIaXRDb3VudGVyUHJvcHMpIHtcclxuICAgIHN1cGVyKHNjb3BlLCBpZCk7XHJcblxyXG4gICAgY29uc3QgdGFibGUgPSBuZXcgZHluYW1vZGIuVGFibGUodGhpcywgXCJIaXRzXCIsIHtcclxuICAgICAgcGFydGl0aW9uS2V5OiB7IG5hbWU6IFwicGF0aFwiLCB0eXBlOiBkeW5hbW9kYi5BdHRyaWJ1dGVUeXBlLlNUUklORyB9LFxyXG4gICAgICByZWFkQ2FwYWNpdHk6IHByb3BzLnJlYWRDYXBhY2l0eSA/PyA1LFxyXG4gICAgfSk7XHJcbiAgICB0aGlzLnRhYmxlID0gdGFibGU7XHJcblxyXG4gICAgdGhpcy5oYW5kbGVyID0gbmV3IGxhbWJkYS5GdW5jdGlvbih0aGlzLCBcIkhpdENvdW50ZXJIYW5kbGVyXCIsIHtcclxuICAgICAgcnVudGltZTogbGFtYmRhLlJ1bnRpbWUuTk9ERUpTXzE0X1gsXHJcbiAgICAgIGhhbmRsZXI6IFwiaGl0Y291bnRlci5oYW5kbGVyXCIsXHJcbiAgICAgIGNvZGU6IGxhbWJkYS5Db2RlLmZyb21Bc3NldChcImxhbWJkYVwiKSxcclxuICAgICAgZW52aXJvbm1lbnQ6IHtcclxuICAgICAgICBET1dOU1RSRUFNX0ZVTkNUSU9OX05BTUU6IHByb3BzLmRvd25zdHJlYW0uZnVuY3Rpb25OYW1lLFxyXG4gICAgICAgIEhJVFNfVEFCTEVfTkFNRTogdGFibGUudGFibGVOYW1lLFxyXG4gICAgICB9LFxyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gICBncmFudCB0aGUgbGFtYmRhIHJvbGUgcmVhZC93cml0ZSBwZXJtaXNzaW9uIHRvIG91ciB0YWJsZVxyXG4gICAgdGFibGUuZ3JhbnRSZWFkV3JpdGVEYXRhKHRoaXMuaGFuZGxlcik7XHJcblxyXG4gICAgLy8gICBncmFudCB0aGUgbGFtYmRhIHJvbGUgaW52b2tlIHBlcm1pc3Npb24gdG8gdGhlIGRvd25zdHJlYW0gZnVuY3Rpb25cclxuICAgIHByb3BzLmRvd25zdHJlYW0uZ3JhbnRJbnZva2UodGhpcy5oYW5kbGVyKTtcclxuICB9XHJcbn1cclxuIl19