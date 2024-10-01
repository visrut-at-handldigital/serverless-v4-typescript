import type { Context, APIGatewayProxyStructuredResultV2, APIGatewayProxyEventV2, Handler } from "aws-lambda";
import subtract from "./util";

export const handler: Handler = async (
  _event: APIGatewayProxyEventV2,
  _context: Context
): Promise<APIGatewayProxyStructuredResultV2> => {
  console.log("Hello");

  const result = subtract(10, 5);

  console.log("process.env.CUSTOM_VAR", process.env.CUSTOM_VAR);
  console.log("process.env.MONTHLY_REPORT_DATE", process.env.MONTHLY_REPORT_DATE);

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
