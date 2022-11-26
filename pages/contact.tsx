import cn from 'classnames';
import React from 'react';
import { FieldValues, useForm } from 'react-hook-form';

import { Layout } from '../components';
import { ACS, useACS } from '../lib';
import { getStaticPropsFn } from '../ssr';

export const getStaticProps = getStaticPropsFn;
const Contact: ACS.Page = ({ rawData }) => {
  const { register, handleSubmit } = useForm();
  const acsData = useACS(rawData);
  const inputClasses = 'block rounded-md p-2 my-2 text-black';
  const emailAndSubjectClasses = 'w-1/2 lg:max-w-[400px] min-w-[300px]';
  return (
    <Layout acs={acsData} title="Contact">
      <h1 className="text-title text-glow-gold">Contact</h1>

      <div className="py-4">
        Found something wrong? Have a question or suggestion? Please get in touch! I'll do my best
        to respond soon.
      </div>

      <form className="" onSubmit={handleSubmit(submitForm)}>
        <input
          {...register('email', { required: true })}
          placeholder="Email address"
          className={cn(inputClasses, emailAndSubjectClasses)}
        />
        <input
          {...register('subject', { required: true })}
          placeholder="Subject"
          className={cn(inputClasses, emailAndSubjectClasses)}
        />
        <textarea
          {...register('body')}
          placeholder="Message"
          className={cn(inputClasses, 'w-full lg:max-w-[800px]')}
        />
        <input
          className="cursor-pointer p-2 bg-cyan-500 rounded-md hover:bg-cyan-400 transition-all duration-300 hover:translate-y-1 hover:scale-110"
          type="submit"
        />
      </form>
    </Layout>
  );

  function submitForm(data: FieldValues) {
    alert(data);
  }
};

export default Contact;
