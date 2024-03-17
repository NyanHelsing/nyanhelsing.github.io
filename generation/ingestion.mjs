import { promises as fs } from "node:fs";

import { persistedContext } from "./persistence.mjs";
import { context } from "./context.mjs";
import { codeSummary } from "./analysers/index.mjs";

export const ingestFile = async (path, stats) => {
    // The `exec` method will add the task to the queue, it returns
    // promise that will be resolved with the result of the task
    // once it's executed.
    console.log(path);
    try {
        const storedFileContext = await persistedContext.get(path);
        if (storedFileContext.summary) {
            console.log(`Loaded persisted context for ${path}`);
            return context.set(path, storedFileContext);
        } else {

            throw new Error("Summary not found");
        }
    } catch (error) {
        console.log(`Error loading persisted context for ${path}`, error);
        console.log(`Ingesting about to read ${path}`);
        const content = await fs.readFile(path, "utf-8");
        console.log(`Read ${path}`, content.length, "bytes");
        const summary = await codeSummary(
            path, 
            content
        );
        console.log(path, summary);
        await persistedContext.put(path, { content, summary });  
        context.set(path, { content, summary });
    }
};
        
