import postcss, { AtRule, PluginCreator } from "postcss";

// Types
import type { PostcssScreenPluginOptions, Sizes, Width } from "./types";

// Helpers
import ensure from "./default-options";
import { reduce } from "./helpers";

/**
 * Plugin to have sugar syntax when adjusting the `min-width` or `max-width`
 * media queries with `7` standard sizes for the entire application
 */
const plugin: PluginCreator<PostcssScreenPluginOptions<Width>> = function (options?) {

    const { query, sizes, params } = ensure(options);
    const _sizes = reduce(sizes);

    // Joins the media query params into a single string
    let _params = params.trim();
    if (params) _params = ` ${_params} `; // Attaches a space if the params is not an empty string
    const join = (width: string ) => `${_params}(${query}: ${width})`;

    // Mixins to resolve
    const entries = Object.entries(sizes) as [Sizes, Width][];
    const rules = {} as any;
    for (const [size, _] of entries) {
      rules[`${size}-screen`] = function (rule: AtRule) {
        const media = postcss.atRule({ name: 'media', params: join(_sizes[size]) })
        media.append(rule.nodes)
        rule.replaceWith(media);
      }
    }

    return {
      postcssPlugin: 'postcss-screen',
      AtRule: rules,
    }
}

plugin.postcss = true

export default plugin;
