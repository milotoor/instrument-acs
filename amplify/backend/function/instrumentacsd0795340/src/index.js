const aws = require('aws-sdk');
const ses = new aws.SES();

// I tried very, very hard to keep this as an environment variable, but Amplify just doesn't seem to
// support that when using git-based CI/CD. It could work with manual deployments instead, except
// that it doesn't support manual deployments for apps requiring SSR! Amplify really doesn't seem to
// be production ready...
const contactEmail = 'milo.toor@gmail.com';

/**
 * Whenever a new ContactMessage object is added to the database, we will send an email (using SES)
 * to the email address configured in the CONTACT_EMAIL_ADDRESS environment variable
 */
exports.handler = async (event) => {
  for (const record of event.Records) {
    if (record.eventName === 'INSERT') {
      // Send the email with SES
      const { email, message, subject } = record.dynamodb.NewImage;
      await ses
        .sendEmail({
          Destination: { ToAddresses: [contactEmail] },
          Source: contactEmail,
          ReplyToAddresses: [email.S],
          Message: {
            Subject: { Data: `Instrument ACS contact: ${subject.S}` },
            Body: { Text: { Data: message.S } },
          },
        })
        .promise();
    }
  }

  return { status: 'done' };
};
