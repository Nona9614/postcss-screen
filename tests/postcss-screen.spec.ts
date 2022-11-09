import { describe, it } from "mocha";
import { expect } from "chai";

import plugin from "../src/postcss-screen";
import postcss from "postcss";
import { read, Fixture } from "./fixtures";
import {
  CSSUnits,
  PostcssScreenPluginOptions,
  RequiredPostcssScreenPluginOptions,
  Sizes,
  Width,
} from "../src/types";
import ensure, { defaultOptions } from "../src/default-options";
import { reduce, units } from "../src/helpers";

async function compare(
  fixture: Fixture,
  expected: string,
  options?: PostcssScreenPluginOptions<Width>
) {
  const _data = await read(fixture);
  const _fixture = await postcss([plugin(options)]).process(_data, {
    from: undefined,
  });
  expect(_fixture.css).to.eql(expected);
  expect(_fixture.warnings().length).to.eql(0);
  return _fixture;
}

describe("Default Values Testing", () => {
  const def = defaultOptions<number>();
  it("Should have the same default properties", () => {
    const EXPECTED: RequiredPostcssScreenPluginOptions<number> = {
      query: "max-width",
      params: "",
      sizes: {
        jumbo: 2200,
        wide: 2000,
        large: 1700,
        moderate: 1450,
        medium: 1200,
        small: 980,
        mini: 670,
        nano: 450,
      },
    };
    expect(def).to.eql(EXPECTED);
  });

  it("Should ensure default properties plus modifications", () => {
    const EXPECTED: RequiredPostcssScreenPluginOptions<number> = {
      query: "max-width",
      params: "screen and",
      sizes: {
        jumbo: 2200,
        wide: 2000,
        large: 1700,
        moderate: 1450,
        medium: 1200,
        small: 1000, // Modified
        mini: 670,
        nano: 450,
      },
    };
    expect(ensure({ sizes: { small: 1000 }, params: "screen and" })).to.eql(EXPECTED);
  });

  const EXPECTED_SIZE = (width: number) =>
    `
@media (max-width: ${width}px) {
    .lit {
        color: #fff;
        border: 1px solid #eee;
    }
}
`.trim();

  for (const [size, width] of Object.entries(def.sizes) as [Sizes, number][]) {
    it(`Should parse a valid @${size}-screen rule`, async () => {
      await compare(`${size}-screen`, EXPECTED_SIZE(width));
    });
  }
});

describe("Non Existing Size Literal Testing", () => {
  const EXPECTED = `
@bad-screen {
    .lit {
        color: #fff;
        border: 1px solid #eee;
    }
}
`.trim();

  it("Should fail parsing on non existing size literal", async () => {
    compare("bad-screen", EXPECTED);
  });
});

describe("Custom Options Testing", () => {
  const def = defaultOptions<number>();

  const EXPECTED_QUERY = `
@media (min-width: ${def.sizes.small}px) {
    .lit {
        color: #fff;
        border: 1px solid #eee;
    }
}
`.trim();

  it("Should use the passed query", () => {
    compare("small-screen", EXPECTED_QUERY, { query: "min-width" });
  });

  const EXPECTED_PARAMS = `
@media only screen and (${def.query}: ${def.sizes.small}px) {
    .lit {
        color: #fff;
        border: 1px solid #eee;
    }
}
  `.trim();
  
    it("Should use the custom rule parameters", () => {
      compare("small-screen", EXPECTED_PARAMS, { params: "only screen and" });
    });

  const EXPECTED_WIDTH = (unit: CSSUnits) =>
    `
@media (${def.query}: 900${unit}) {
    .lit {
        color: #fff;
        border: 1px solid #eee;
    }
}
`.trim();

  it(`Should use the passed width`, () => {
    for (const unit of units) {
      compare("small-screen", EXPECTED_WIDTH(unit), { sizes: { small: 900 } });
    }
  });
});

describe("Helpers Testing", () => {
  const { sizes } = defaultOptions<number>();

  it("Should tranform a number value to CSS unit 'px'", () => {
    const reduced = reduce(sizes);
    for (const [size, width] of Object.entries(sizes) as [Sizes, number][]) {
      expect(reduced[size]).to.equal(`${width}px`);
    }
  });
});
