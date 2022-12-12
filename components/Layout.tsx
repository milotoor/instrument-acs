import cn from 'classnames';
import Head from 'next/head';
import React from 'react';

import { ACS, ChildProp, Data, tailwindBreakpoints, uri, useClientRendering } from '../lib';
import { AppContext, BreakpointContext } from './context';
import { Link } from './Link';

type BreakpointKey = keyof typeof tailwindBreakpoints;
type PageTitleProps = ChildProp & { className?: string };
type SidebarProps = { isOpen: boolean; setOpen: (open: boolean) => void };
type SidebarLinkProps = { icon?: React.ReactNode; link: string; title: string };
type TaskListProps = { activeTask?: ACS.Task.Letter; className?: string; tasks: ACS.Task[] };
type LayoutProps = ChildProp & {
  data: Data.Raw;
  section?: ACS.Section.Number;
  task?: ACS.Task.Letter;
  title: string;
};

function PageTitle({ children, className }: PageTitleProps) {
  return <h1 className={cn('text-title text-glow-gold', className)}>{children}</h1>;
}

export const Layout = Object.assign(
  function Layout(props: LayoutProps) {
    const { data, children, section, task, title } = props;
    const [dimensions, setDimensions] = React.useState<BreakpointContext>();

    // Calculates the window dimensions and recalculates them whenever the window is resized. This
    // will cause the Layout component to set state immediately after mounting, resulting in two
    // renders up front. This is not ideal; it would be preferable if the `dimensions` state could
    // simply be initialized to the window dimensions on page load. However, that would interfere with
    // SSR and re-hydration, as the server has no way of knowing the client's window size.
    useClientRendering(() => {
      window.addEventListener('resize', handleResize);
      handleResize();
      return () => window.removeEventListener('resize', handleResize);

      // Handler to call on window resize. Determines which breakpoint should apply to the client
      // window. Exactly one of the values in the object should be `true`; the rest should be `false`
      function handleResize() {
        setDimensions({
          isXS: between(null, 'sm'),
          isSmall: between('sm', 'md'),
          isMedium: between('md', 'lg'),
          isLarge: between('lg', 'xl'),
          isXL: between('xl', 'xxl'),
          isXXL: between('xxl', null),
        });
      }

      // Returns `true` if `window.innerWidth` is greater than or equal to the tailwind breakpoint
      // specified by `key1` *and* less than the breakpoint specified by `key2`.
      function between(key1: BreakpointKey | null, key2: BreakpointKey | null) {
        if (key1 && window.innerWidth < tailwindBreakpoints[key1]) return false;
        return !key2 || window.innerWidth < tailwindBreakpoints[key2];
      }
    });

    return (
      <AppContext.Provider value={{ data: { ...data, acs: new ACS(data.acs) }, section, task }}>
        <Head>
          <title>{title}</title>
        </Head>

        {
          // -webkit-fill-available is a weird hack to fix the "iOS viewport scroll bug"
          // See https://css-tricks.com/css-fix-for-100vh-in-mobile-webkit/
          //     https://allthingssmitty.com/2020/05/11/css-fix-for-100vh-in-mobile-webkit/
        }
        <div className="h-screen max-h-screen h-[-webkit-fill-available] flex justify-start">
          <BreakpointContext.Provider value={dimensions}>
            {
              // Skip the first render entirely, until we have determined the window dimensions. This
              // avoids an immediate repaint of size-sensitive content after the initial load
              dimensions && <ScreenSizeSensitiveLayout>{children}</ScreenSizeSensitiveLayout>
            }
          </BreakpointContext.Provider>
        </div>
      </AppContext.Provider>
    );
  },
  { Title: PageTitle }
);

/**
 * Basic hook function to indicate if the screen size is on the smaller end-- i.e. medium or smaller
 */
function useSmallScreen() {
  const { isXS, isSmall, isMedium } = React.useContext(BreakpointContext)!;
  return isXS || isSmall || isMedium;
}

/**
 * Renders the Sidebar as well as the main section. It is important that this is only rendered AFTER
 * the window dimensions/applicable tailwind breakpoint has been determined, so that the Sidebar
 * state defaults to the correct setting
 */
function ScreenSizeSensitiveLayout({ children }: ChildProp) {
  const largeScreen = !useSmallScreen();
  const [isOpen, setOpen] = React.useState(largeScreen);

  // The main section uses a left margin (to render adjacent to the sidebar) only when the sidebar
  // is open on larger screens. On smaller screens `largeScreen` is false, the main section will be
  // hidden by the sidebar when it's opened and a backdrop is rendered to catch/stop scroll events
  const useMargin = isOpen && largeScreen;
  return (
    <>
      <Sidebar isOpen={isOpen} setOpen={setOpen} />
      <div
        className={cn('flex-grow', sidebarTransitionClasses, {
          'ml-96': useMargin,
          'ml-0': !useMargin,
        })}
      >
        <TopBar />
        <main className="p-4 pl-8">{children}</main>
      </div>
    </>
  );
}

const barClasses = 'h-top-bar flex flex-row items-center w-full';
function TopBar() {
  return (
    <div
      className={cn(
        barClasses,
        'z-10 flex-shrink-0 shadow-xl shadow-slate-800 lg:justify-center bg-theme-gradient'
      )}
    >
      {/* ml-16 provides space for the hamburger menu */}
      <Link
        className="font-fancy text-2xl hover:text-glow-gold ml-16 lg:ml-0"
        color={null}
        href="/"
      >
        The Instrument ACS
      </Link>
    </div>
  );
}

const t = 'transition-all';
const sidebarTransitionClasses = Object.assign(`${t} duration-500`, { fast: `${t} duration-300` });

/**
 * Renders as a collapsible element if the screen size is small, otherwise as a fixed sidebar menu
 */
function Sidebar(props: SidebarProps) {
  const { isOpen, setOpen } = props;
  const defaultOpen = !useSmallScreen();

  // If the sidebar is closed when the viewport expands past the sidebar-always-open breakpoint, set
  // its state back to open. Conversely, if the sidebar is open when the viewport contracts past the
  // breakpoint, close it.
  //
  // This pattern is not ideal, as it means the Sidebar component will render twice following the
  // viewport resize: once in response to the screen resizing, and again due to the state change
  // brought on by the `useEffect` hook. I'm sure there are better ways to achieve this, but
  // considering that this is a relatively rare event anyway, this simple inefficiency will suffice.
  React.useEffect(() => {
    if (defaultOpen !== isOpen) setOpen(defaultOpen);
  }, [defaultOpen]);

  return (
    <div
      className={cn('fixed left-0 w-96 max-w-full z-20 bg-slate-900', sidebarTransitionClasses, {
        '-translate-x-[100%] shadow-0': !isOpen,
        'translate-x-0 shadow-[5px_0_20px_0_rgba(30,41,59,1)]': isOpen,
      })}
    >
      <div className="flex flex-col h-screen overflow-auto">
        <SidebarButton {...props} />
        <div className="mb-4">
          <SidebarLink title="Home" link="/" />
          <SidebarLink title="Regulation Quick Reference" link="/regulatory_quick_reference" />
          <SidebarLink
            icon={<img alt="GitHub" src="/img/github.png" height={32} width={32} />}
            title="Source Code"
            link={uri.github()}
          />
          <SidebarLink title="Contact" link="/contact" />
        </div>

        <div className="pl-4 pr-2 mb-[100px] border-y-2 border-y-slate-300">
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
  const buttonClasses = cn('h-[3px] w-[30px] bg-white', sidebarTransitionClasses);
  return (
    <div
      className={cn(
        'absolute h-[3rem] w-[3rem] flex flex-col justify-center items-center rounded-full scale-75',
        sidebarTransitionClasses,
        {
          'right-[-3rem] bg-cyan-500/75': !isOpen,
          'right-0 bg-slate-600 hover:bg-cyan-600': isOpen,
        }
      )}
    >
      {/* py-2 is not necessary for rendering, but the extra padding makes it easier to click */}
      <div className="cursor-pointer py-2" onClick={toggleSidebar}>
        <div className={cn(buttonClasses, { 'rotate-45 translate-y-[7px]': isOpen })} />
        <div className={cn(buttonClasses, { 'scale-0': isOpen }, 'my-1')} />
        <div className={cn(buttonClasses, { '-rotate-45 translate-y-[-7px]': isOpen })} />
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
      <div className={cn(barClasses, 'hover:bg-slate-600', sidebarTransitionClasses.fast)}>
        <div className="ml-3 w-10">{icon}</div>
        <div className="flex-grow ml-5">{title}</div>
      </div>
    </Link>
  );
}

const activeLinkColor = 'text-glow-gold';
export function TableOfContents() {
  const { data, section, task } = React.useContext(AppContext);
  const { acs } = data;
  return (
    <ol className="list-decimal leading-7 ml-8 mt-4">
      {acs.sections.map(({ name, number, tasks, uri }) => (
        <li key={name} className="my-4">
          <Link
            className={cn('text-subtitle-sm', { [activeLinkColor]: section === number && !task })}
            color={null}
            href={uri}
          >
            {name}
          </Link>
          <div className="text-sm">
            <TaskList
              activeTask={section === number ? task : undefined}
              tasks={tasks}
              className="ml-8"
            />
          </div>
        </li>
      ))}
    </ol>
  );
}

export function TaskList({ activeTask, className, tasks }: TaskListProps) {
  return (
    <ol className={cn('list-alpha', className)}>
      {tasks.map((task) => (
        <Link
          color={activeTask === task.meta.letter ? activeLinkColor : undefined}
          href={task.uri}
          key={task.name}
        >
          <li>{task.name}</li>
        </Link>
      ))}
    </ol>
  );
}
