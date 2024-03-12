#!/usr/bin/env node

import { dirname, join } from "node:path";
import { spawn } from "node:child_process"
import { runner, Logger } from "hygen";

const __dirname = dirname(new URL(import.meta.url).pathname);

const defaultTemplates = join(__dirname, "templates");
runner(process.argv.slice(2), {
    templates: defaultTemplates,
    cwd: process.cwd(),
    logger: new Logger(console.log.bind(console)), // eslint-disable-line no-console
    debug: !!process.env.DEBUG,
    exec: (action, body) => {
        const opts = body && body.length > 0 ? { input: body } : {};
        new Promise((resolve, reject) => {
            const child = spawn(action, { ...opts, shell: true });
            child.stdout.on("data", (data) => {
                console.log(data.toString());
            });
            child.stderr.on("data", (data) => {
                console.error(data.toString());
            });

        return require("execa").command(action, { ...opts, shell: true }); // eslint-disable-line @typescript-eslint/no-var-requires
    },
    createPrompter: () => require("enquirer")
}).then(({ success }) => process.exit(success ? 0 : 1));
