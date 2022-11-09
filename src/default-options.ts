import is from "guardex";
import { MediaQueries, PostcssScreenPluginOptions, RequiredPostcssScreenPluginOptions, Width } from "./types";

export function defaultOptions<W extends Width>() {
    return {
        sizes: {
            jumbo: 2200,
            wide: 2000,
            large: 1700,
            moderate: 1450,
            medium: 1200,
            small: 980,
            mini: 670,
            nano: 450
        },
        query: 'max-width',
        params: ''
    } as RequiredPostcssScreenPluginOptions<W>
}

/**
 * Ensures there are options merging them with the default options
*/
export function ensure<W extends Width>(options?: PostcssScreenPluginOptions<W>): RequiredPostcssScreenPluginOptions<W> {

    const def = defaultOptions<W>();

    if (options) {
        const query: MediaQueries = options.query ? options.query : def.query;
        const sizes = options.sizes ? {...def.sizes, ...options.sizes} : def.sizes;
        const params = is.string(options.params) ? options.params :  def.params;

        return {
            query,
            sizes,
            params
        };
        
    } else return def;
}

export default ensure;
