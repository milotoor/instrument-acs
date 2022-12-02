const sendEmail = require('../../../../../lib/send_email');

/** The Lambda function entrypoint */
exports.handler = async (event) => {
  for (const record of event.Records) await sendEmail(record);
  return { status: 'done' };
};
