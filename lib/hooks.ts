import * as React from 'react';
import useResizeObserver from '@react-hook/resize-observer';

/**
 * Calls a callback only after the component with the hook has been mounted, i.e. only on the client
 * side. The callback is only executed once during the component's lifecycle, and code within the
 * callback may assume that client-only types (such as `window`) are available.
 */
export function useClientRendering(callback: () => void) {
  React.useEffect(callback, []);
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
