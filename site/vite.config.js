// vite.config.js
import { dirname, relative, resolve } from "node:path";

import config from "config";
import { globSync } from "glob";

import mdx from "@mdx-js/rollup";
import { defineConfig } from "vite";
import { createMpaPlugin } from "vite-plugin-virtual-mpa";

import { createBlogIndexPlugin } from "@nyan-helsing/blog/vite-plugin-blog-index.mjs";

const __root = dirname(dirname(new URL(import.meta.url).pathname));

// This helper builds a list of paths to be used in the build
// from a data structure that is an array where each member is
// a string or a tuple where the first member is a string and
// the second member is an array of this same type.
const buildPaths = (siteStructure, prefix = "") => {
    return siteStructure.flatMap((page) => {
        if (Array.isArray(page)) {
            const [path, children] = page;
            return [
                [page, `${prefix && `${prefix}/`}${path}`],
                ...buildPaths(children, `${prefix && `${prefix}/`}${path}`)
            ];
        }
        return [[page, `${prefix && `${prefix}/`}${page}`]];
    });
};

const blogEntries = globSync(`${__root}blog/**/*.mdx`)
    .map((path) => {
        return relative(__root, path);
    })
    .map((modulePath) => {
        return {
            name: modulePath
        };
    });

const pages = buildPaths([
    "index",
    "workflow",
    "blog",
    ["tools", ["index", "mailto", "poker"]],
    "privacy",
    "terms",
    "404"
]).map(([name, path]) => ({
    name,
    entry: "/entry.jsx",
    filename: `${path}.html`,
    template: "templates/document.ejs"
}));

const { plugin: blogIndexPlugin, pages: blogPages } =
    await createBlogIndexPlugin({
        entry: "/entry.jsx",
        template: "templates/document.ejs",
        root: "../",
        basePath: "blog"
    });

const mpaPages = [...pages, ...blogPages];

console.log(process.env.NODE_ENV);
//console.log({ yurl: config.get("y.url") });

export default defineConfig({
    plugins: [
        mdx(),
        blogIndexPlugin,
        createMpaPlugin({
            pages: mpaPages,
            data: { config }
            //previewRewrites: [
            //    // If there's no index.html, you need to manually set rules for history fallback like:
            //      { from: /.*/, to: "/home.html" }
            //]
        })
    ],
    root: "",
    build: {
        outDir: "../dist"
    }
});
