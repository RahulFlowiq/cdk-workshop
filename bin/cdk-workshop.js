#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cdk = require("aws-cdk-lib");
const cdk_workshop_stack_1 = require("../lib/cdk-workshop-stack");
const app = new cdk.App();
new cdk_workshop_stack_1.CdkWorkshopStack(app, "CdkWorkshopStack", {
    env: {
        account: "458410402209",
        region: "us-east-1",
    },
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2RrLXdvcmtzaG9wLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY2RrLXdvcmtzaG9wLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUNBLG1DQUFtQztBQUNuQyxrRUFBNkQ7QUFFN0QsTUFBTSxHQUFHLEdBQUcsSUFBSSxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUM7QUFDMUIsSUFBSSxxQ0FBZ0IsQ0FBQyxHQUFHLEVBQUUsa0JBQWtCLEVBQUU7SUFDNUMsR0FBRyxFQUFFO1FBQ0gsT0FBTyxFQUFFLGNBQWM7UUFDdkIsTUFBTSxFQUFFLFdBQVc7S0FDcEI7Q0FDRixDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIjIS91c3IvYmluL2VudiBub2RlXG5pbXBvcnQgKiBhcyBjZGsgZnJvbSBcImF3cy1jZGstbGliXCI7XG5pbXBvcnQgeyBDZGtXb3Jrc2hvcFN0YWNrIH0gZnJvbSBcIi4uL2xpYi9jZGstd29ya3Nob3Atc3RhY2tcIjtcblxuY29uc3QgYXBwID0gbmV3IGNkay5BcHAoKTtcbm5ldyBDZGtXb3Jrc2hvcFN0YWNrKGFwcCwgXCJDZGtXb3Jrc2hvcFN0YWNrXCIsIHtcbiAgZW52OiB7XG4gICAgYWNjb3VudDogXCI0NTg0MTA0MDIyMDlcIixcbiAgICByZWdpb246IFwidXMtZWFzdC0xXCIsXG4gIH0sXG59KTtcbiJdfQ==