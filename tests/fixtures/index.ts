import fs from "fs";
import is from "guardex";
import path from "path";
import { Sizes } from "../../src/types";

export type Fixture = 
    | 'bad-screen'
    | `${Sizes}-screen`;

/** Resolves the fixture path */
const route = (fixture: Fixture) => path.resolve(__dirname, `${fixture}.pcss`);

/** Cache file */
let lastFixture: Fixture | null = null;
let cache = '';

/** Reads the fixture content */
export function read(fixture: Fixture) {
    if (lastFixture !== fixture) {
        return new Promise<string>((resolve, reject) => {
            fs.readFile(route(fixture), function (error, data) {
                if (error) {
                    lastFixture = null;
                    cache = '';
                    reject(error);
                }
                else {
                    lastFixture = fixture;
                    cache = data.toString().replace(/\r\n/ig, "\n").trim();
                    resolve(cache);
                }
            });
        })    
    } else {
        return Promise.resolve(cache);
    }
}
