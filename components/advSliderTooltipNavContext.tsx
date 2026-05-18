"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";

export const ADV_SLIDER_TOOLTIP_ENTER_LAST = -1;

export type AdvSliderTooltipNavigateOptions = {
  skipSceneIntro?: boolean;
};

export type AdvSliderTooltipSlideApi = {
  count: number;
  navigateTo: (
    index: number,
    options?: AdvSliderTooltipNavigateOptions,
  ) => void;
};

type AdvSliderTooltipNavContextValue = {
  activeTooltipIndex: number;
  setActiveTooltipIndex: Dispatch<SetStateAction<number>>;
  pendingEnterTooltipIndex: number | null;
  setPendingEnterTooltipIndex: Dispatch<SetStateAction<number | null>>;
  registerSlideApi: (
    slideId: string,
    api: AdvSliderTooltipSlideApi,
  ) => () => void;
  getSlideApi: (slideId: string) => AdvSliderTooltipSlideApi | undefined;
};

const AdvSliderTooltipNavContext =
  createContext<AdvSliderTooltipNavContextValue | null>(null);

export function AdvSliderTooltipNavProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [activeTooltipIndex, setActiveTooltipIndex] = useState(0);
  const [pendingEnterTooltipIndex, setPendingEnterTooltipIndex] = useState<
    number | null
  >(null);
  const [slideApis, setSlideApis] = useState<
    Record<string, AdvSliderTooltipSlideApi>
  >({});

  const registerSlideApi = useCallback(
    (slideId: string, api: AdvSliderTooltipSlideApi) => {
      setSlideApis((current) => ({ ...current, [slideId]: api }));

      return () => {
        setSlideApis((current) => {
          if (current[slideId] !== api) return current;
          const next = { ...current };
          delete next[slideId];
          return next;
        });
      };
    },
    [],
  );

  const getSlideApi = useCallback(
    (slideId: string) => slideApis[slideId],
    [slideApis],
  );

  const value = useMemo(
    () => ({
      activeTooltipIndex,
      setActiveTooltipIndex,
      pendingEnterTooltipIndex,
      setPendingEnterTooltipIndex,
      registerSlideApi,
      getSlideApi,
    }),
    [
      activeTooltipIndex,
      getSlideApi,
      pendingEnterTooltipIndex,
      registerSlideApi,
    ],
  );

  return (
    <AdvSliderTooltipNavContext.Provider value={value}>
      {children}
    </AdvSliderTooltipNavContext.Provider>
  );
}

export function useAdvSliderTooltipNav() {
  const context = useContext(AdvSliderTooltipNavContext);
  if (!context) {
    throw new Error(
      "useAdvSliderTooltipNav must be used within AdvSliderTooltipNavProvider",
    );
  }
  return context;
}
