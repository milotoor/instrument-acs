const aws = require('aws-sdk');
const ses = new aws.SES();

/**
 * Whenever a new ContactMessage object is added to the database, we will send an email (using SES)
 * to the above email address
 */
exports.handler = async (event) => {
  for (const record of event.Records) {
    if (record.eventName === 'INSERT') {
      const { email, message, subject } = record.dynamodb.NewImage;
      await ses
        .sendEmail({
          Destination: { ToAddresses: ['milo.toor@gmail.com'] },
          Source: 'contact@milo.aero',
          ReplyToAddresses: [email.S],
          Message: {
            Subject: { Data: `Instrument ACS contact: ${subject.S}` },
            Body: { Text: { Data: `${email.S} wrote:\n\n${message.S}` } },
          },
        })
        .promise();
    }
  }
  return { status: 'done' };
};
