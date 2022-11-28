import aws from 'aws-sdk';
import type { NextApiRequest, NextApiResponse } from 'next';

import { ContactFormValues } from '../../lib';

// Set up the AWS SDK
aws.config.update({ region: 'us-west-1' });

const email = process.env.CONTACT_EMAIL_ADDRESS;
export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (!email) {
    // Bad server configuration
    res.status(500).json({ err: 'Bad server configuration' });
    return;
  }

  const formValues: ContactFormValues = req.body;
  const params = {
    Destination: {
      /* required */
      // CcAddresses: [
      //   'EMAIL_ADDRESS',
      //   /* more items */
      // ],
      ToAddresses: [email],
    },
    Message: {
      Body: {
        /* required */
        // Html: {
        //   Charset: 'UTF-8',
        //   Data: 'HTML_FORMAT_BODY',
        // },
        Text: { Charset: 'UTF-8', Data: formValues.body },
      },
      Subject: { Charset: 'UTF-8', Data: formValues.subject },
    },
    Source: email,
    ReplyToAddresses: [formValues.email],
  };

  // Send the request to SES
  try {
    await new aws.SES({ apiVersion: '2010-12-01' }).sendEmail(params).promise();
    res.status(200);
  } catch (e) {
    res.status(500).json({ err: `SES request failed: ${e}` });
  }
};
