import * as aws from 'aws-sdk';
import { ContactMessage } from './types';
const ses = new aws.SES();

// I tried very, very hard to keep this as an environment variable, but Amplify just doesn't seem to
// support that when using git-based CI/CD. It could work with manual deployments instead, except
// that it doesn't support manual deployments for apps requiring SSR! Amplify really doesn't seem to
// be production ready...
const contactEmail = 'milo.toor@gmail.com';

/**
 * Whenever a new ContactMessage object is added to the database, we will send an email (using SES)
 * to the above email address
 */
export default async function sendEmail(record: aws.DynamoDBStreams.Record) {
  if (record.eventName === 'INSERT') {
    const contactMessage = getContactValues(record.dynamodb!.NewImage!);
    const { email, message, subject } = contactMessage;
    await ses
      .sendEmail({
        Destination: { ToAddresses: [contactEmail] },
        Source: contactEmail,
        ReplyToAddresses: [email],
        Message: {
          Subject: { Data: `Instrument ACS contact: ${subject}` },
          Body: { Text: { Data: `${email} wrote:\n\n${message}` } },
        },
      })
      .promise();
  }
}

function getContactValues(attributes: aws.DynamoDBStreams.AttributeMap): ContactMessage {
  const { email, message, subject } = attributes;
  return { email: email.S!, message: message.S!, subject: subject.S! };
}
