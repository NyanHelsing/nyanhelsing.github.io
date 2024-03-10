// vite.config.js
import { resolve } from "path";
import { defineConfig } from "vite";
import { createHtmlPlugin } from "vite-plugin-html";
import mdx from "@mdx-js/rollup";
import { sync } from "glob";

// This helper builds a list of paths to be used in the build
// from a data structure that is an array where each member is
// a string or a tuple where the first member is a string and
// the second member is an array of this same type.
const buildPaths = (siteStructure, prefix = "") => {
    return siteStructure.flatMap((page) => {
        if (Array.isArray(page)) {
            const [path, children] = page;
            return buildPaths(children, `${prefix}/${path}`);
        }
        return page;
    });
};

export default defineConfig({
    plugins: [
        mdx(),
        createHtmlPlugin({
            pages: buildPaths([
                "index",
                "workflow",
                ["blog", ["commit-dist", "no-facebook"]],
                ["tools", ["index", "mailto", "poker"]],
                "privacy",
                "terms"
            ]).map((path) => ({
                entry: "entry.jsx",
                filename: `${path}.html`,
                template: "templates/document.ejs"
            }))
        })
    ],
    root: "",
    build: {
        outDir: "../../dist"
    }
});
