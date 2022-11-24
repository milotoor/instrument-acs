import cn from 'classnames';
import Head from 'next/head';
import React from 'react';

import { ACS, useDimensions } from '../lib';
import { AppContext } from './context';
import { Link } from './Link';
import { TableOfContents } from './Tasks';

type SidebarProps = { isCollapsible: boolean };
type SidebarButtonProps = { isOpen: boolean; setOpen: (open: boolean) => void };
type SidebarLinkProps = { icon?: React.ReactNode; link: string; title: string };
type LayoutProps = {
  acs: ACS;
  children: React.ReactNode;
  section?: ACS.Section.Number;
  task?: ACS.Task.Letter;
  title: string;
};

export function Layout({ acs, children, section, task, title }: LayoutProps) {
  const { breakpoints, computed: widthComputed } = useDimensions();

  // Skip the first render entirely, until we have determined the window size. This avoids an
  // immediate repaint after the initial load
  if (!widthComputed) return null;

  const { isXS, isSmall } = breakpoints;
  const sidebarCollapsible = isXS || isSmall;

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
      <div className="h-screen max-h-screen h-[-webkit-fill-available] flex justify-start">
        <Sidebar isCollapsible={sidebarCollapsible} />
        <div className={cn({ 'ml-96 flex-grow': !sidebarCollapsible })}>
          <TopBar />
          <main className="p-4">{children}</main>
        </div>
      </div>
    </AppContext.Provider>
  );
}

function TopBar() {
  return (
    <div className="w-full h-top-bar z-10 flex-shrink-0 shadow-xl shadow-slate-800 flex flex-row md:justify-center items-center relative bg-gradient-to-r from-cyan-500 to-blue-500">
      {/* ml-16 provides space for the hamburger menu */}
      <div className="font-fancy text-2xl hover:text-glow-gold ml-16 md:ml-0">
        <Link color={null} href="/">
          The Instrument ACS
        </Link>
      </div>
    </div>
  );
}

const t = 'transition-all';
const sidebarTransitionClasses = Object.assign(`${t} duration-500`, { fast: `${t} duration-300` });

/**
 * Renders as a collapsible element if the screen size is small, otherwise as a fixed sidebar menu
 */
function Sidebar({ isCollapsible }: SidebarProps) {
  const [isOpen, setIsOpen] = React.useState(!isCollapsible);

  // If the sidebar is closed when the viewport expands past the sidebar-always-open breakpoint, set
  // its state back to open. Conversely, if the sidebar is open when the viewport contracts past the
  // breakpoint, close it.
  //
  // This pattern is not ideal, as it means the Sidebar component will render twice following the
  // viewport resize: once in response to the screen resizing, and again due to the state change
  // brought on by the `useEffect` hook. I'm sure there are better ways to achieve this, but
  // considering that this is a relatively rare event anyway, this simple inefficiency will suffice.
  React.useEffect(() => {
    if (isCollapsible === isOpen) setIsOpen(!isCollapsible);
  }, [isCollapsible]);

  return (
    <div
      className={cn(
        'fixed left-0 w-96 max-w-[100%] z-20 bg-slate-900 shadow-black',
        sidebarTransitionClasses,
        { '-translate-x-[100%] shadow-0': !isOpen, 'translate-x-0 shadow-2xl': isOpen }
      )}
    >
      <div className="flex flex-col h-screen overflow-auto">
        {isCollapsible && <SidebarButton isOpen={isOpen} setOpen={setIsOpen} />}

        <div className="mb-4">
          <SidebarLink title="Home" link="/" />
          <SidebarLink title="FAR Quick Reference" link="/far_quick_reference" />
          <SidebarLink
            icon={<img alt="GitHub" src="/img/github.png" height={32} width={32} />}
            title="Source Code"
            link="https://github.com/milotoor/instrument-acs"
          />
        </div>

        <div className="pl-4 border-t-2 border-t-slate-300">
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
function SidebarButton({ isOpen, setOpen }: SidebarButtonProps) {
  const barClasses = cn('h-[3px] w-[30px] bg-white', sidebarTransitionClasses);
  return (
    <div
      className={cn(
        'absolute h-[3rem] w-[3rem] flex flex-col justify-center items-center rounded-full scale-75',
        sidebarTransitionClasses,
        {
          'right-[-3rem] bg-cyan-500/75': !isOpen,
          'right-0 bg-cyan-700 hover:bg-cyan-500': isOpen,
        }
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

function SidebarLink({ icon, link, title }: SidebarLinkProps) {
  return (
    <Link className="w-full" color={null} href={link} noUnderline>
      <div
        className={cn(
          'flex flex-row items-center h-top-bar hover:bg-slate-600',
          sidebarTransitionClasses.fast
        )}
      >
        <div className="ml-3 w-10">{icon}</div>
        <div className="flex-grow ml-5">{title}</div>
      </div>
    </Link>
  );
}
