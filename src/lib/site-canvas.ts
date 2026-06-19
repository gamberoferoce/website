/** Design reference width; layout is fluid up to this max. */
export const SITE_CANVAS_WIDTH = 640;

export const SITE_CANVAS_INNER_SELECTOR = "[data-site-canvas-inner]";

export function getSiteCanvasInner(element: HTMLElement | null): HTMLElement | null {
  return element?.closest(SITE_CANVAS_INNER_SELECTOR) ?? null;
}

export function getSiteCanvasScale(inner: HTMLElement): number {
  return inner.getBoundingClientRect().width / SITE_CANVAS_WIDTH;
}

export function getCanvasPoint(clientX: number, clientY: number, inner: HTMLElement) {
  const rect = inner.getBoundingClientRect();
  const scale = getSiteCanvasScale(inner);

  return {
    x: (clientX - rect.left) / scale,
    y: (clientY - rect.top) / scale,
  };
}

export function getElementCanvasX(element: HTMLElement, inner: HTMLElement): number {
  const elementRect = element.getBoundingClientRect();
  const innerRect = inner.getBoundingClientRect();
  const scale = getSiteCanvasScale(inner);

  return (elementRect.left + elementRect.width / 2 - innerRect.left) / scale;
}
