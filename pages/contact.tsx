import GraphQLAPI, { GraphQLResult } from '@aws-amplify/api-graphql';
import cn from 'classnames';
import React from 'react';
import { FieldError, FieldValues, RegisterOptions, useForm, UseFormReturn } from 'react-hook-form';

import { Bold, Layout } from '../components';
import { ACS, ContactMessage, useACS } from '../lib';
import { createContactMessage } from '../lib/graphql/mutations';
import { getStaticPropsFn } from '../ssr';

type ErrorTextProps = { error: FieldError | undefined };
type RequestStatus = 'error' | 'submitted' | 'success' | 'unsubmitted';
type ResponseMessageProps = { status: RequestStatus };
type GraphQLResponse = GraphQLResult<{ createContactMessage: ContactMessage }>;

type FormInputProps = {
  field: keyof ContactMessage;
  form: UseFormReturn<ContactMessage>;
  fullWidth?: boolean;
  inputType?: 'input' | 'textarea';
  options?: RegisterOptions<ContactMessage>;
  placeholder: string;
};

export const getStaticProps = getStaticPropsFn;
const Contact: ACS.Page = ({ rawData }) => {
  const acsData = useACS(rawData);
  const [reqStatus, setReqStatus] = React.useState<RequestStatus>('unsubmitted');
  const disabled = ['submitted', 'success'].includes(reqStatus);
  const form = useForm<ContactMessage>({ reValidateMode: 'onSubmit' });

  return (
    <Layout acs={acsData} title="Contact">
      <h1 className="text-title text-glow-gold">Contact</h1>

      <div className="py-4">
        Found something wrong? Have a question or suggestion? Please get in touch! I'll do my best
        to respond soon.{' '}
        <Bold>
          If applicable, please include a reference to the FARs, AIM or other authoritative
          publication.
        </Bold>
      </div>

      <form onSubmit={form.handleSubmit(submitForm)}>
        <FormInput
          field="email"
          form={form}
          options={{
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: 'Entered value does not match email format',
            },
          }}
          placeholder="Email address"
        />

        <FormInput field="subject" form={form} placeholder="Subject" />
        <FormInput
          field="message"
          form={form}
          fullWidth
          inputType="textarea"
          placeholder="Message"
        />
        <div className="flex flex-wrap gap-2">
          <input
            className={cn('p-2 rounded-md transition-all duration-300', {
              'cursor-pointer hover:translate-y-1 hover:scale-110 bg-cyan-500 hover:bg-cyan-400':
                !disabled,
              'bg-cyan-500/50': disabled,
            })}
            type="submit"
            disabled={disabled}
          />
          <ResponseMessage status={reqStatus} />
        </div>
      </form>
    </Layout>
  );

  async function submitForm(data: FieldValues) {
    // First update the status to indicate a request is submitted. This will disable the submit button
    setReqStatus('submitted');

    // Send the request
    try {
      const response = (await GraphQLAPI.graphql({
        query: createContactMessage,
        variables: { input: data },
      })) as GraphQLResponse;

      if (response.data) {
        setReqStatus('success');
      } else {
        setReqStatus('error');
      }
    } catch (e) {
      setReqStatus('error');
    }
  }
};

export default Contact;

function ResponseMessage({ status }: ResponseMessageProps) {
  if (['submitted', 'unsubmitted'].includes(status)) return null;

  const responseClasses = 'p-2 w-fit rounded-md bg-gradient-to-br';
  if (status === 'success') {
    return (
      <div className={cn(responseClasses, 'from-green-500 to-lime-900')}>
        Thank you for contacting me! I'll respond as soon as I can.
      </div>
    );
  }

  return (
    <div className={cn(responseClasses, 'from-red-500 to-rose-900')}>
      Something went wrong. Maybe try again? Sorry...
    </div>
  );
}

function FormInput({
  field,
  form,
  fullWidth = false,
  inputType = 'input',
  options,
  placeholder,
}: FormInputProps) {
  const {
    register,
    formState: { errors },
  } = form;

  const error = errors[field];
  return (
    <div className="flex justify-start items-center my-2">
      {React.createElement(inputType, {
        placeholder,
        ...register(field, {
          ...options,
          required: { value: true, message: 'Field is required' },
        }),
        className: cn('block rounded-md p-2 text-black', {
          'w-full lg:max-w-[800px]': fullWidth,
          'w-1/2 lg:max-w-[400px] min-w-[300px]': !fullWidth,
          'border-red-500 border-2': !!error,
        }),
      })}
      <div className="ml-3">
        <ErrorText error={error} />
      </div>
    </div>
  );
}

function ErrorText({ error }: ErrorTextProps) {
  if (!error) return null;
  return <Bold className="text-sm text-red-500">{error.message}</Bold>;
}
