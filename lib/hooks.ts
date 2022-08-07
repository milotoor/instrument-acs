import * as React from 'react';

import { tailwindBreakpoints } from './util';

type Breakpoints = 'Small' | 'Medium' | 'Large' | 'XL' | 'XXL';
type BreakpointStatus = Record<`is${Breakpoints}`, boolean>;
type Dimensions = {
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
      isSmall: notSmallerThan(tailwindBreakpoints.sm),
      isMedium: notSmallerThan(tailwindBreakpoints.md),
      isLarge: notSmallerThan(tailwindBreakpoints.lg),
      isXL: notSmallerThan(tailwindBreakpoints.xl),
      isXXL: notSmallerThan(tailwindBreakpoints.xxl),
    };

    function notSmallerThan(size: number) {
      return typeof width === 'number' && width >= size;
    }
  }
}
