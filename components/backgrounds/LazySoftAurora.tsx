"use client";

import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
  type ComponentPropsWithoutRef,
} from "react";
import SoftAurora, { type SoftAuroraHandle } from "./SoftAurora";

export type { SoftAuroraHandle };

type SoftAuroraProps = ComponentPropsWithoutRef<typeof SoftAurora>;

/** Delay between mounting each aurora so WebGL contexts don't spin up in one frame */
const MOUNT_STAGGER_MS = 120;

let mountQueue: Array<() => void> = [];
let mountTimer: ReturnType<typeof setTimeout> | null = null;

function enqueueAuroraMount(mount: () => void) {
  mountQueue.push(mount);
  if (mountTimer !== null) return;

  const drain = () => {
    const next = mountQueue.shift();
    if (!next) {
      mountTimer = null;
      return;
    }
    next();
    mountTimer =
      mountQueue.length > 0
        ? setTimeout(drain, MOUNT_STAGGER_MS)
        : null;
  };

  drain();
}

export type LazySoftAuroraLoadStrategy = "immediate" | "viewport" | "deferred";

interface LazySoftAuroraProps extends SoftAuroraProps {
  className?: string;
  /** How/when the WebGL aurora is mounted. Default: viewport */
  loadStrategy?: LazySoftAuroraLoadStrategy;
  /** Preload zone for viewport strategy */
  rootMargin?: string;
}

const LazySoftAurora = forwardRef<SoftAuroraHandle, LazySoftAuroraProps>(
  function LazySoftAurora(
    {
      className = "absolute inset-0 h-full w-full min-h-full min-w-full",
      loadStrategy = "viewport",
      rootMargin = "280px 0px",
      startActive = true,
      ...auroraProps
    },
    ref,
  ) {
    const containerRef = useRef<HTMLDivElement>(null);
    const innerRef = useRef<SoftAuroraHandle>(null);
    const pendingActiveRef = useRef<boolean | null>(startActive);
    const mountedRef = useRef(loadStrategy === "immediate");
    const [shouldMount, setShouldMount] = useState(loadStrategy === "immediate");

    const requestMount = useCallback(() => {
      if (mountedRef.current) return;
      mountedRef.current = true;

      if (loadStrategy === "immediate") {
        setShouldMount(true);
        return;
      }

      enqueueAuroraMount(() => setShouldMount(true));
    }, [loadStrategy]);

    useImperativeHandle(
      ref,
      () => ({
        setActive: (active: boolean) => {
          pendingActiveRef.current = active;
          if (!shouldMount) {
            if (loadStrategy === "deferred" && active) {
              requestMount();
            }
            return;
          }
          innerRef.current?.setActive(active);
        },
      }),
      [loadStrategy, requestMount, shouldMount],
    );

    useEffect(() => {
      if (loadStrategy === "immediate") return;

      if (loadStrategy === "viewport") {
        const el = containerRef.current;
        if (!el || shouldMount) return;

        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry?.isIntersecting) {
              requestMount();
              observer.disconnect();
            }
          },
          { rootMargin, threshold: 0 },
        );
        observer.observe(el);
        return () => observer.disconnect();
      }
    }, [loadStrategy, requestMount, rootMargin, shouldMount]);

    useEffect(() => {
      if (!shouldMount) return;
      const id = requestAnimationFrame(() => {
        if (pendingActiveRef.current !== null) {
          innerRef.current?.setActive(pendingActiveRef.current);
        }
      });
      return () => cancelAnimationFrame(id);
    }, [shouldMount]);

    return (
      <div ref={containerRef} className={className}>
        {shouldMount ? (
          <SoftAurora ref={innerRef} startActive={startActive} {...auroraProps} />
        ) : null}
      </div>
    );
  },
);

export default LazySoftAurora;
