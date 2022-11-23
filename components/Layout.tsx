import cn from 'classnames';
import Head from 'next/head';
import React from 'react';

import { ACS, useDimensions } from '../lib';
import { AppContext } from './context';
import { Link } from './Link';
import { TableOfContents } from './Tasks';

type SidebarProps = { isOpen: boolean; setOpen: (open: boolean) => void };
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
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
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
        <Sidebar isOpen={sidebarOpen} setOpen={setSidebarOpen} />

        {!home && <TopBar />}
        <div className="w-full flex overflow-hidden">
          {!home && (
            <div className="w-96 flex-shrink-0 py-4 pl-2 overflow-auto hidden md:block max-w-[33%]">
              <TableOfContents />
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
      {/* Show GH logo only when sidebar is fixed */}
      <div className="absolute left-3 hidden md:block">
        <GitHubLink />
      </div>

      {/* ml-16 provides space for the GH logo/hamburger */}
      <div className="font-fancy text-2xl hover:text-glow-gold ml-16 md:ml-0">
        <Link color={null} href="/">
          The Instrument ACS
        </Link>
      </div>
    </div>
  );
}

const sidebarTransitionClasses = 'transition-all duration-500';

function Sidebar(props: SidebarProps) {
  // Do not render the sidebar at all if size is medium or greater
  const { isXS, isSmall } = useDimensions().breakpoints;
  if (!isXS && !isSmall) return null;

  const { isOpen } = props;
  return (
    <div
      className={cn(
        'fixed left-0 w-[500px] max-w-[100%] z-20 bg-slate-900 shadow-black',
        sidebarTransitionClasses,
        { '-translate-x-[100%] shadow-0': !isOpen, 'translate-x-0 shadow-2xl': isOpen }
      )}
    >
      <div className="flex flex-col pl-2 h-screen">
        <SidebarButton {...props} />
        <div className="h-top-bar flex items-center shrink-0">
          <GitHubLink />
        </div>
        <div className="pl-2 overflow-auto flex-grow">
          <TableOfContents />
        </div>
      </div>
    </div>
  );
}

/**
 * The `SidebarButton` component renders a hamburger menu when the sidebar is closed, transitioning
 * to an "X" when it's opened. It renders absolutely, but relative to the (right side of the)
 * sidebar container.
 */
function SidebarButton({ isOpen, setOpen }: SidebarProps) {
  const barClasses = cn('h-[3px] w-[30px] bg-white', sidebarTransitionClasses);
  return (
    <div
      className={cn(
        'absolute h-top-bar flex flex-col justify-center z-30',
        sidebarTransitionClasses,
        // 12px to the left of the sidebar's right side when open, 12px to its right when closed
        { 'right-[-42px]': !isOpen, 'right-[12px]': isOpen }
      )}
    >
      {/* py-2 is not necessary for rendering, but the extra padding makes it easier to click */}
      <div className="cursor-pointer py-2" onClick={toggleSidebar}>
        <div className={cn(barClasses, { 'rotate-45 translate-y-[7px]': isOpen })} />
        <div className={cn(barClasses, { 'scale-0': isOpen }, 'my-1')} />
        <div className={cn(barClasses, { '-rotate-45 translate-y-[-7px]': isOpen })} />
      </div>
    </div>
  );

  function toggleSidebar() {
    setOpen(!isOpen);
  }
}

function GitHubLink() {
  return (
    <Link href={references.github_repo}>
      <img alt="GitHub" src="/img/github.png" />
    </Link>
  );
}

const references = {
  github_repo: 'https://github.com/milotoor/instrument-acs',
};
