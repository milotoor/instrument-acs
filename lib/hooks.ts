import * as React from 'react';
import useResizeObserver from '@react-hook/resize-observer';

import { tailwindBreakpoints } from './util';

type Breakpoints = 'XS' | 'Small' | 'Medium' | 'Large' | 'XL' | 'XXL';
type BreakpointStatus = Record<`is${Breakpoints}`, boolean>;
type BreakpointKey = keyof typeof tailwindBreakpoints;
type Dimensions = {
  computed: boolean;
  width: number | undefined;
  height: number | undefined;
  breakpoints: BreakpointStatus;
};

/**
 * Calls a callback only after the component with the hook has been mounted, i.e. only on the client
 * side. The callback is only executed once during the component's lifecycle, and code within the
 * callback may assume that client-only types (such as `window`) are available.
 */
export function useClientRendering(callback: () => void) {
  React.useEffect(callback, []);
}

/**
 * Returns the client's current dimensions, and recalculates them whenever the window is resized.
 */
export function useDimensions() {
  // Initialize state with undefined width/height so server and client renders match
  // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
  const [windowSize, setWindowSize] = React.useState<Dimensions>({
    computed: false,
    width: undefined,
    height: undefined,
    breakpoints: getBreakpointStatuses(),
  });

  useClientRendering(() => {
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);

    // Handler to call on window resize
    function handleResize() {
      setWindowSize({
        computed: true,
        width: window.innerWidth,
        height: window.innerHeight,
        breakpoints: getBreakpointStatuses(window.innerWidth),
      });
    }
  });

  return windowSize;

  // Checks if the current width is greater than or equal to each tailwind breakpoint
  function getBreakpointStatuses(width?: number): BreakpointStatus {
    return {
      isXS: between(null, 'sm'),
      isSmall: between('sm', 'md'),
      isMedium: between('md', 'lg'),
      isLarge: between('lg', 'xl'),
      isXL: between('xl', 'xxl'),
      isXXL: between('xxl', null),
    };

    function between(key1: BreakpointKey | null, key2: BreakpointKey | null) {
      if (typeof width !== 'number') return false;
      if (key1 && width < tailwindBreakpoints[key1]) return false;
      return !key2 || width < tailwindBreakpoints[key2];
    }
  }
}

/** Returns the DOMRect of a targeted HTMLElement, observing resize */
export function useSize(target: React.RefObject<HTMLElement>) {
  const [size, setSize] = React.useState<DOMRect>();

  React.useEffect(() => {
    setSize(target.current?.getBoundingClientRect());
  }, [target]);

  // Where the magic happens
  useResizeObserver(target, (entry) => setSize(entry.contentRect));
  return size;
}
