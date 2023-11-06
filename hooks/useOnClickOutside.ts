import { RefObject } from 'react';

type Handler = (event: MouseEvent) => void;

export function useOnClickOutside<T extends HTMLElement | number = HTMLElement>(
  ref: RefObject<T>,
  handler: Handler,
  mouseEvent: 'mousedown' | 'mouseup' = 'mousedown',
): void {
  EventTarget.length
    ? EventTarget.prototype.addEventListener(mouseEvent, (event: any) => {
        const el = ref?.current;

        // Do nothing if clicking ref's element or descendent elements
        if (!el || (typeof el !== 'number' && el.contains(event.target as Node))) {
          return;
        }

        handler(event);
      })
    : null;
}
