import type { Context, APIGatewayProxyEventV2, Handler, APIGatewayProxyStructuredResultV2 } from "aws-lambda";

interface APIGatewayProxyHelloEventV2 extends Omit<APIGatewayProxyEventV2, "body"> {
  unique_number: number;
}

export const handler: Handler = async (
  _event: APIGatewayProxyHelloEventV2,
  _context: Context
): Promise<APIGatewayProxyStructuredResultV2> => {
  console.log("I am having fun....");

  const unique_number = _event.unique_number;

  console.log(`Btw got your number: ${unique_number}`);

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: `Number: ${unique_number}`,
      environmentalVariables: {
        CUSTOM_VAR: process.env.CUSTOM_VAR,
        MONTHLY_REPORT_DATE: process.env.MONTHLY_REPORT_DATE,
      },
    }),
  };
};
