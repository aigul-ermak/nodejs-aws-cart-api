import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as lambdaNodejs from "aws-cdk-lib/aws-lambda-nodejs";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as apigateway from "aws-cdk-lib/aws-apigateway";
import * as path from "path";

export class CdkCartApiStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const cartLambda = new lambdaNodejs.NodejsFunction(this, "CartLambdaHandler", {
      entry: path.join(__dirname, "../../src/lambda.ts"),
      handler: "handler",
      runtime: lambda.Runtime.NODEJS_18_X,
      bundling: {
        externalModules: [
          "@nestjs/microservices",
          "@nestjs/websockets",
          "@nestjs/platform-socket.io",
          "@grpc/grpc-js",
          "@grpc/proto-loader",
          "class-transformer",
          "class-validator",
          "kafkajs",
          "nats"
        ]
      },
      environment: {
        DB_HOST: "postgres",
        DB_PORT: "5432",
        DB_USER: "postgres",
        DB_PASSWORD: "postres",
        DB_NAME: "postgres"
      }
    });

    const api = new apigateway.LambdaRestApi(this, 'CartApiGateway', {
      handler: cartLambda,
      proxy: true,
    });

    new cdk.CfnOutput(this, 'ApiUrl', {
      value: api.url,
    });
  }
}
