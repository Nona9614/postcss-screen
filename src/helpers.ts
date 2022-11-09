import is from "guardex";
import { CSSUnits, MediaSizes, Sizes, StringWidth, Width } from "./types";

/**
 * Resolves numbers to pixel string units
 * 
 * @example
 * const small = 980; // Transformed to "980px"
 */
export function reduce<W extends Width>(sizes: Required<MediaSizes<W>>) {    
    const entries = Object.entries(sizes) as [Sizes, W][];
    const obj: any = {};

    for (const [size, width] of entries) {
        obj[size] = is.number(width) ? `${width}px` : width;
    }

    return obj as Required<MediaSizes<StringWidth>>;
}

/**
 * Sizes array
 */
export const sizes: Sizes[] = [
    'nano',
    'mini',
    'small',
    'medium',
    'large',
    'wide',
    'jumbo',
]

/**
 * CSS Units array
 */
 export const units: CSSUnits[] = [
    '%',
    'mm',
    'cm',
    'in',
    'ex',
    'ch',
    'em',
    'rem',
    'pc',
    'pt',
    'px',
    'vh',
    'vw',
    'vmax',
    'vmin',
]

/** Resolves the mixin object to listen */
export function mixins() {
    return new RegExp(`screen-(${sizes.join(" | ")})`);
}
