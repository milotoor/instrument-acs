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
      const source = 'contact@milo.aero';
      const toAddress = 'milo.toor@gmail.com';
      console.log(`Sending email from ${source} to ${toAddress} on behalf of ${email.S}`);

      await ses
        .sendEmail({
          Destination: { ToAddresses: [toAddress] },
          Source: source,
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
