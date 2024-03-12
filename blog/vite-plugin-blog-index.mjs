import { promises as fs } from "node:fs";
import path from "node:path";
import { renderFile } from "ejs";
import { glob } from "glob";

// get the path to this package
const __dirname = path.dirname(new URL(import.meta.url).pathname);

export const createBlogIndexPlugin = async ({ entry, template, basePath }) => {
    const postsModsPaths = await glob(`${__dirname}/**/*.mdx`); // Adjust glob pattern as needed
    const postsMeta = await Promise.all(
        postsModsPaths
            .map(async (postModPath) => {
                return {
                    modPath: path.relative(__dirname, postModPath),
                    ...(await import(postModPath))
                };
            })
            .sort((a, b) => b.timestamp - a.timestamp)
    );

    return {
        // We return an array of pages because each blog post will need its
        // own page generated at build time in order to be statically served
        // by eg github pages; without this, the blog posts would only be
        // available at runtime, which is not ideal for SEO,
        pages: postsMeta.map((meta) => {
            return {
                name: meta.slug,
                filename: `${basePath}/${meta.slug}.html`,
                template,
                entry,
                module: `./${meta.modulePath}`
            };
        }),
        plugin: {
            name: "posts-metadata",
            resolveId(source) {
                if (source === "virtual:posts") {
                    return `\0${source}`;
                }
                return null;
            },
            async load(id) {
                if (id === "\0virtual:posts") {
                    const templatePath = path.resolve(
                        __dirname,
                        "posts/_index.ejs.t"
                    );
                    return {
                        code: await renderFile(templatePath, { postsMeta }),
                        map: null
                    };
                }
                return null;
            }
        }
    };
};
