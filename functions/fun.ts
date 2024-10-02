import type { Context, Handler, SQSEvent } from "aws-lambda";

export const handler: Handler = async (_event: SQSEvent, _context: Context) => {
  console.log("I am having fun....");

  console.log("_events.Records.length: ", _event.Records.length);

  for (const record of _event.Records) {
    const messageBody = JSON.parse(record.body);
    const unique_number = messageBody.unique_number;

    console.log(`Btw got your number: ${unique_number}`);

    await waitFor(5000);

    console.log(`your number is ${unique_number} | processed...`);
  }
};

const waitFor = (ms: number) => new Promise((r) => setTimeout(r, ms));
