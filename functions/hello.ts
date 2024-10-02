import subtract from "./util";
import type { Context, APIGatewayProxyStructuredResultV2, APIGatewayProxyEventV2, Handler } from "aws-lambda";

import { SQSClient, SendMessageCommand } from "@aws-sdk/client-sqs";

const sqs = new SQSClient({ region: process.env.AWS_DEFAULT_REGION });

export const handler: Handler = async (
  _event: APIGatewayProxyEventV2,
  _context: Context
): Promise<APIGatewayProxyStructuredResultV2> => {
  console.log("Hello");

  const result = subtract(10, 5);

  console.log("process.env.CUSTOM_VAR", process.env.CUSTOM_VAR);
  console.log("process.env.MONTHLY_REPORT_DATE", process.env.MONTHLY_REPORT_DATE);

  const unique_number_list = [4, 56, 89, 74, 23, 10, 67, 10, 30, 302, 502, 6002, 395, 103, 50, 63];

  // https://stackoverflow.com/questions/75863737/limit-lambda-concurrency-to-1
  // An alternative solution to limiting your Lambda to only being able to run one instance is making your SQS FIFO (first in first out),
  // and giving every message in your SQS the same MessageGroupId.
  // If you have multiple messages in a FIFO queue with the same MessageGroupId, they will be processed sequentially by Lambda, one at a time.
  // Even if there are thousands of messages in the queue, as long as they share the same MessageGroupId, only one Lambda instance will process them
  // at any given time.

  for (const unique_number of unique_number_list) {
    const command = new SendMessageCommand({
      QueueUrl: process.env.FUN_QUEUE_URL,
      MessageBody: JSON.stringify({ unique_number }),
      MessageGroupId: "single-group",
      MessageDeduplicationId: `${Date.now()}-${unique_number}`,
    });

    await sqs.send(command);
  }

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
