"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import {
  getThemeSnapshot,
  persistTheme,
  subscribeTheme,
  type Theme,
} from "@/lib/theme";

type RopePoint = {
  x: number;
  y: number;
  px: number;
  py: number;
};

const CORD_LENGTH = 72;
const PULL_THRESHOLD = 22;
const SEGMENTS = 12;
const GRAVITY = 0.15;
const FRICTION = 0.991;
const AIR_DRAG = 0.0012;
const CONSTRAINT_ITERATIONS = 4;
const CONSTRAINT_STIFFNESS = 0.55;
const SUBSTEPS = 2;
const MOUSE_RADIUS = 90;
const MOUSE_FORCE = 0.0055;
const DRAG_FOLLOW = 0.32;

function createRope(length: number): RopePoint[] {
  const segmentLength = length / SEGMENTS;
  return Array.from({ length: SEGMENTS + 1 }, (_, index) => ({
    x: 0,
    y: index * segmentLength,
    px: 0,
    py: index * segmentLength,
  }));
}

function satisfyConstraint(
  a: RopePoint,
  b: RopePoint,
  restLength: number,
  pinA: boolean,
  pinB: boolean,
  stiffness: number,
) {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const distance = Math.hypot(dx, dy) || 0.0001;
  const difference = (distance - restLength) / distance;
  const offsetX = dx * difference * stiffness;
  const offsetY = dy * difference * stiffness;

  if (!pinA) {
    a.x += offsetX * 0.5;
    a.y += offsetY * 0.5;
  }

  if (!pinB) {
    b.x -= offsetX * 0.5;
    b.y -= offsetY * 0.5;
  }
}

function buildPath(points: readonly RopePoint[]) {
  if (points.length < 2) return "";

  let path = `M ${points[0].x.toFixed(2)} ${points[0].y.toFixed(2)}`;

  for (let index = 1; index < points.length - 1; index += 1) {
    const control = points[index];
    const next = points[index + 1];
    const midX = (control.x + next.x) / 2;
    const midY = (control.y + next.y) / 2;
    path += ` Q ${control.x.toFixed(2)} ${control.y.toFixed(2)} ${midX.toFixed(2)} ${midY.toFixed(2)}`;
  }

  const last = points[points.length - 1];
  const beforeLast = points[points.length - 2];
  path += ` Q ${beforeLast.x.toFixed(2)} ${beforeLast.y.toFixed(2)} ${last.x.toFixed(2)} ${last.y.toFixed(2)}`;

  return path;
}

export function LightPullCord() {
  const theme = useSyncExternalStore(subscribeTheme, getThemeSnapshot, () => "light");
  const mounted = useSyncExternalStore(() => () => {}, () => true, () => false);
  const reducedMotion = useSyncExternalStore(
    (onChange) => {
      const media = window.matchMedia("(prefers-reduced-motion: reduce)");
      media.addEventListener("change", onChange);
      return () => media.removeEventListener("change", onChange);
    },
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false,
  );

  const rootRef = useRef<HTMLDivElement>(null);
  const mountRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const handleRef = useRef<HTMLButtonElement>(null);
  const handleWrapRef = useRef<HTMLDivElement>(null);
  const pointsRef = useRef<RopePoint[]>(createRope(CORD_LENGTH));

  const [cordLeft, setCordLeft] = useState(0);

  const draggingRef = useRef(false);
  const pointerRef = useRef({ x: 0, y: 0, active: false });
  const anchorRef = useRef({ x: 0, y: 0 });
  const pullRef = useRef(0);
  const rafRef = useRef(0);

  const toggleTheme = useCallback(() => {
    const next: Theme = getThemeSnapshot() === "light" ? "dark" : "light";
    persistTheme(next);

    const points = pointsRef.current;
    for (let index = Math.max(1, points.length - 4); index < points.length; index += 1) {
      points[index].py -= 1.2 + (index - points.length + 4) * 0.6;
    }
  }, []);

  const applyVisuals = useCallback((points: readonly RopePoint[]) => {
    const tip = points[points.length - 1];

    if (pathRef.current) {
      pathRef.current.setAttribute("d", buildPath(points));
    }

    if (handleWrapRef.current) {
      handleWrapRef.current.style.left = `${tip.x}px`;
      handleWrapRef.current.style.top = `${tip.y}px`;
    }
  }, []);

  const resetRope = useCallback(() => {
    pointsRef.current = createRope(CORD_LENGTH);
    pullRef.current = 0;
    applyVisuals(pointsRef.current);
  }, [applyVisuals]);

  const updateAnchor = useCallback(() => {
    if (!mountRef.current) return;
    const rect = mountRef.current.getBoundingClientRect();
    const anchorX = rect.left + rect.width / 2;
    setCordLeft(anchorX);
    anchorRef.current = {
      x: anchorX,
      y: 2,
    };
  }, []);

  const integratePoints = useCallback((points: RopePoint[]) => {
    for (let index = 1; index < points.length; index += 1) {
      const point = points[index];
      const velocityX = point.x - point.px;
      const velocityY = point.y - point.py;
      const speed = Math.hypot(velocityX, velocityY);
      const drag = 1 - Math.min(1, speed * AIR_DRAG);

      point.px = point.x;
      point.py = point.y;
      point.x += velocityX * FRICTION * drag;
      point.y += (velocityY * FRICTION * drag) + GRAVITY;
    }
  }, []);

  const simulateRope = useCallback(
    (dragTarget: { x: number; y: number } | null) => {
      const points = pointsRef.current;
      const segmentLength = (CORD_LENGTH + pullRef.current * 0.85) / SEGMENTS;

      for (let step = 0; step < SUBSTEPS; step += 1) {
        integratePoints(points);

        if (!draggingRef.current && pointerRef.current.active) {
          const tip = points[points.length - 1];
          const dx = pointerRef.current.x - anchorRef.current.x - tip.x;
          const dy = pointerRef.current.y - anchorRef.current.y - tip.y;
          const distance = Math.hypot(dx, dy);

          if (distance > 0 && distance < MOUSE_RADIUS) {
            const influence = ((1 - distance / MOUSE_RADIUS) ** 2) * MOUSE_FORCE;

            for (let index = Math.max(2, points.length - 4); index < points.length; index += 1) {
              const falloff = (index - (points.length - 4)) / 3;
              const weight = influence * (0.25 + falloff * 0.75);
              points[index].x += dx * weight;
              points[index].y += dy * weight;
            }
          }
        }

        if (dragTarget) {
          const distance = Math.hypot(dragTarget.x, dragTarget.y);
          pullRef.current = Math.max(0, distance - CORD_LENGTH);

          for (let index = Math.max(1, points.length - 4); index < points.length; index += 1) {
            const point = points[index];
            const falloff = (index - (points.length - 4)) / 3;
            const follow = DRAG_FOLLOW * (0.35 + falloff * 0.65);
            point.x += (dragTarget.x - point.x) * follow;
            point.y += (dragTarget.y - point.y) * follow;
          }
        }

        points[0].x = 0;
        points[0].y = 0;
        points[0].px = 0;
        points[0].py = 0;

        for (let iteration = 0; iteration < CONSTRAINT_ITERATIONS; iteration += 1) {
          for (let index = 0; index < points.length - 1; index += 1) {
            satisfyConstraint(
              points[index],
              points[index + 1],
              segmentLength,
              index === 0,
              false,
              CONSTRAINT_STIFFNESS,
            );
          }
        }
      }

      applyVisuals(points);
    },
    [applyVisuals, integratePoints],
  );
  useEffect(() => {
    window.addEventListener("resize", updateAnchor);
    window.addEventListener("scroll", updateAnchor, { passive: true });

    return () => {
      window.removeEventListener("resize", updateAnchor);
      window.removeEventListener("scroll", updateAnchor);
    };
  }, [updateAnchor]);

  useEffect(() => {
    if (!mounted) return;

    updateAnchor();
    resetRope();
  }, [mounted, resetRope, updateAnchor]);

  useEffect(() => {
    if (!mounted || reducedMotion) return;

    const step = () => {
      if (!draggingRef.current) {
        simulateRope(null);

        if (pullRef.current > 0) {
          pullRef.current *= 0.9;
          if (pullRef.current < 0.3) pullRef.current = 0;
        }
      }

      rafRef.current = requestAnimationFrame(step);
    };

    rafRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafRef.current);
  }, [mounted, reducedMotion, simulateRope]);

  useEffect(() => {
    if (!mounted || reducedMotion) return;

    const onPointerMove = (event: PointerEvent) => {
      pointerRef.current = { x: event.clientX, y: event.clientY, active: true };
      updateAnchor();

      if (!draggingRef.current) return;

      simulateRope({
        x: event.clientX - anchorRef.current.x,
        y: event.clientY - anchorRef.current.y,
      });
    };

    const onPointerUp = () => {
      if (!draggingRef.current) return;

      draggingRef.current = false;
      const shouldToggle = pullRef.current >= PULL_THRESHOLD;
      pullRef.current = 0;

      if (shouldToggle) {
        toggleTheme();
      }

      simulateRope(null);
    };

    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
    window.addEventListener("pointercancel", onPointerUp);

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("pointercancel", onPointerUp);
    };
  }, [mounted, reducedMotion, simulateRope, toggleTheme, updateAnchor]);

  const onHandlePointerDown = (event: React.PointerEvent<HTMLButtonElement>) => {
    if (reducedMotion) return;
    event.preventDefault();
    draggingRef.current = true;
    pointerRef.current = { x: event.clientX, y: event.clientY, active: true };
    updateAnchor();
    handleRef.current?.setPointerCapture(event.pointerId);
  };

  const onHandleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (reducedMotion) {
      toggleTheme();
      return;
    }

    event.preventDefault();
  };

  return (
    <>
      <div ref={mountRef} className="h-0 w-0 shrink-0 self-center" aria-hidden />
      {mounted ? (
      <div
        ref={rootRef}
        className="light-pull-cord fixed top-0 z-[60] -translate-x-1/2"
        style={{ left: cordLeft }}
      >
        <div className="light-pull-cord__stage">
          <div className="light-pull-cord__anchor" />
          <svg className="light-pull-cord__svg" viewBox="-56 0 112 120" aria-hidden>
            <path ref={pathRef} className="light-pull-cord__path" d={`M 0 0 L 0 ${CORD_LENGTH}`} />
          </svg>
          <div ref={handleWrapRef} className="light-pull-cord__handle-wrap">
            <button
              ref={handleRef}
              type="button"
              className="light-pull-cord__handle"
              title={theme === "light" ? "Pull for dark mode" : "Pull for light mode"}
              aria-label={theme === "light" ? "Pull to switch to dark mode" : "Pull to switch to light mode"}
              onPointerDown={onHandlePointerDown}
              onClick={onHandleClick}
            />
            <span className="light-pull-cord__label" aria-hidden>
              {theme === "light" ? "Pull for dark mode" : "Pull for light mode"}
            </span>
          </div>
        </div>
      </div>
      ) : null}
    </>
  );
}
