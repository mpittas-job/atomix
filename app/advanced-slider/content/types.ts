import type { ReactNode } from "react";

/**
 * Content layout (add more by copying this pattern):
 * - `nav-categories.ts` — category labels and which sections appear under each.
 * - `sections/<section-id>/section.ts` — `id`, `navLabel`, `title`, and ordered tabs.
 * - `sections/.../tabs/<tab-id>/tab.ts` or `tab.tsx` — tab `id`, `label`, `color`, and ordered `slides`.
 * - `sections/.../tabs/<tab-id>/steps/*` — one file per slide. Export a `Slide` object, or (borrower-style) a
 *   default function component whose JSX is referenced from `tab.tsx` as `{ id, content: <Step /> }`.
 *   Use `.tsx` for JSX. Plain strings are valid `ReactNode` in `.ts` slides.
 * Use numeric prefixes on step filenames (`01-…`, `02-…`) so folder order matches carousel order.
 */
export type Slide = {
  id: string;
  /** Rich slide body: strings, JSX, fragments, images, etc. */
  content: ReactNode;
};

export type Tab = {
  id: string;
  label: string;
  color: string;
  slides: Slide[];
};

export type Section = {
  id: string;
  navLabel: string;
  title: string;
  tabs: Tab[];
};

export type NavCategory = {
  id: string;
  label: string;
  sections: Section[];
};
