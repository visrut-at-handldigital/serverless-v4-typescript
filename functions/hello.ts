import subtract from "./util";
import { LambdaClient, InvokeCommand } from "@aws-sdk/client-lambda";
import type { Context, APIGatewayProxyStructuredResultV2, APIGatewayProxyEventV2, Handler } from "aws-lambda";

const lambdaClient = new LambdaClient({ region: process.env.AWS_DEFAULT_REGION });

export const handler: Handler = async (
  _event: APIGatewayProxyEventV2,
  _context: Context
): Promise<APIGatewayProxyStructuredResultV2> => {
  console.log("Hello");

  const result = subtract(10, 5);

  console.log("process.env.CUSTOM_VAR", process.env.CUSTOM_VAR);
  console.log("process.env.MONTHLY_REPORT_DATE", process.env.MONTHLY_REPORT_DATE);

  const unique_number_list = [4, 56, 89];

  await Promise.all(
    unique_number_list.map(async (unique_number) => {
      console.log("invoking lambda function with unique_number", unique_number);
      await lambdaClient.send(
        new InvokeCommand({
          FunctionName: "serverless-v4-typescript-dev-fun",
          Payload: Buffer.from(JSON.stringify({ unique_number })),
          InvocationType: "Event",
        })
      );
    })
  );

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "Hello",
      result: result,
      environmentalVariables: {
        CUSTOM_VAR: process.env.CUSTOM_VAR,
        MONTHLY_REPORT_DATE: process.env.MONTHLY_REPORT_DATE,
      },
    }),
  };
};
