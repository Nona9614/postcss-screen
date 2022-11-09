export type Sizes = 
  | 'nano'
  | 'mini'
  | 'small'
  | 'moderate'
  | 'medium'
  | 'large'
  | 'wide'
  | 'jumbo';

export type CSSUnits =
  | "cm"
  | "mm"
  | "in"
  | "em"
  | "ex"
  | "rem"
  | "px"
  | "pt"
  | "pc"
  | "ch"
  | "vh"
  | "vw"
  | "vmin"
  | "vmax"
  | "%";

export type StringWidth = `${number}${CSSUnits}`;
export type Width = StringWidth | number;

export type MediaQueries = 'min-width' | 'max-width';
export type MediaSizes<W extends Width> = { [key in Sizes]?: W }

export type PostcssScreenPluginOptions<W extends Width> = { 
  /** All the sizes names with their corresponding width */
  sizes?: MediaSizes<W>,
  /** The query to be applied to compare the width (`min-width` or `max-width`) */
  query?: MediaQueries;
  /** Extra parameters to fit between the media at rule and the query (i.e. `only screen`) */
  params?: string
}

export type RequiredPostcssScreenPluginOptions<W extends Width> = { 
  sizes: Required<MediaSizes<W>>,
  query: MediaQueries;
  params: string;
}
