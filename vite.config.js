// vite.config.js
import { resolve } from "path";
import mdx from "@mdx-js/rollup";
import { defineConfig } from "vite";

export default defineConfig({
    plugins: [mdx()],
    build: {
        rollupOptions: {
            input: {
                index: resolve(__dirname, "index.html"),
                tools: resolve(__dirname, "tools.html"),
                workflow: resolve(__dirname, "workflow.html"),
                privacy: resolve(__dirname, "privacy.html"),
                terms: resolve(__dirname, "terms.html"),
                404: resolve(__dirname, "404.html")
            }
        }
    }
});
