/**
 * Fixed 12×4 solid-color tile mosaic (sampled from reference artwork).
 *
 * Edit `colors` to change any tile. Row-major: `colors[row][col]`, 4 rows × 12 columns.
 * `columns` / `rows` must match the nested array shape.
 */
export const HERO_FIXED_TILE_MOSAIC = {
  columns: 12,
  rows: 4,
  colors: [
    [
      "#40768D",
      "#194B5B",
      "#40758C",
      "#174555",
      "#215060 ",
      "#2F5F71",
      "#3A6A7F",
      "#174655",
      "#3D7187",
      "#194A5B",
      "#356A7F",
      "#144654 ",
    ],
    [
      "#34687D",
      "#3A6C81",
      "#123C48",
      "#30586A",
      "#254A58",
      "#2A4E5E",
      "#234552",
      "#2B5060",
      "#103641",
      "#356275",
      "#225060",
      "#40748c",
    ],
    [
      "#134250",
      "#204E5E",
      "#295262",
      "#193C48",
      "#264756",
      "#0B232A",
      "#102D36",
      "#163540",
      "#254957",
      "#1D4553",
      "#3A6B80",
      "#144553",
    ],
    [
      "#194B5C",
      "#33677B",
      "#204E5E",
      "#2B5768",
      "#346174",
      "#285060",
      "#133945",
      "#2A5566",
      "#224F60",
      "#306071",
      "#3E7289",
      "#366B80",
    ],
  ],
} as const;

export type HeroFixedTileMosaicConfig = typeof HERO_FIXED_TILE_MOSAIC;
