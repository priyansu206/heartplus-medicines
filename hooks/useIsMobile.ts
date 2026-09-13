"use client";

import { useCallback, useSyncExternalStore } from "react";

const mqlCache = new Map<string, MediaQueryList>();

function getMediaQuery(query: string): MediaQueryList {
  let mql = mqlCache.get(query);
  if (!mql) {
    mql = window.matchMedia(query);
    mqlCache.set(query, mql);
  }
  return mql;
}

export function useMediaQuery(query: string): boolean {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const mql = getMediaQuery(query);
      mql.addEventListener("change", onChange);
      return () => mql.removeEventListener("change", onChange);
    },
    [query]
  );

  return useSyncExternalStore(
    subscribe,
    useCallback(() => getMediaQuery(query).matches, [query]),
    () => false
  );
}

export function useIsMobile(): boolean {
  return useMediaQuery(
    "(max-width: 767px), (pointer: coarse), (hover: none)"
  );
}

export function useLowPower(): boolean {
  return useMediaQuery(
    "(max-width: 767px), (pointer: coarse), (hover: none), (prefers-reduced-motion: reduce)"
  );
}