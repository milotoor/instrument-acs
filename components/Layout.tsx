import cn from 'classnames';
import Head from 'next/head';
import React from 'react';

import { ACS } from '../lib';
import { AppContext } from './context';
import { Link } from './Link';
import { TableOfContents } from './Tasks';

type LayoutProps = {
  acs: ACS;
  centered?: boolean;
  children: React.ReactNode;
  home?: boolean;
  section?: ACS.Section.Number;
  task?: ACS.Task.Letter;
  title: string;
};

export function Layout({
  acs,
  centered = false,
  children,
  home = false,
  section,
  task,
  title,
}: LayoutProps) {
  return (
    <AppContext.Provider value={{ acs, section, task }}>
      <Head>
        <title>{title}</title>
      </Head>

      {
        // -webkit-fill-available is a weird hack to fix the "iOS viewport scroll bug"
        // See https://css-tricks.com/css-fix-for-100vh-in-mobile-webkit/
        //     https://allthingssmitty.com/2020/05/11/css-fix-for-100vh-in-mobile-webkit/
      }
      <div className="h-screen max-h-screen h-[-webkit-fill-available] flex flex-col items-center justify-start">
        {!home && <TopBar />}
        <div className="w-full flex overflow-hidden">
          {!home && (
            <div className="w-96 flex-shrink-0 py-4 pl-2 overflow-auto hidden md:block max-w-[33%]">
              <TableOfContents acs={acs} small />
            </div>
          )}
          <main
            className={cn('p-4 flex flex-col flex-grow overflow-auto', {
              'items-center': centered,
            })}
          >
            {children}
          </main>
        </div>
      </div>
    </AppContext.Provider>
  );
}

function TopBar() {
  return (
    <div className="w-full h-top-bar z-10 flex-shrink-0 shadow-xl shadow-slate-800 flex flex-row md:justify-center items-center relative bg-gradient-to-r from-cyan-500 to-blue-500">
      <Link className="hidden sm:block absolute left-3" href={references.github_repo}>
        <img alt="GitHub" src="/img/github.png" />
      </Link>

      {/* sm:pl-16 provides space for the GH logo */}
      <div className="font-fancy text-2xl hover:text-glow-gold pl-4 sm:pl-16 md:pl-0">
        <Link color={null} href="/">
          The Instrument ACS
        </Link>
      </div>
    </div>
  );
}

const references = {
  github_repo: 'https://github.com/milotoor/instrument-acs',
};
