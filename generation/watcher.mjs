import chokidar from "chokidar";

import { ingestFile } from "./ingestion.mjs";
import { persistedContext } from "./persistence.mjs";

import { updateRepoOverview } from "./review.mjs";
import { steering } from "./steering.mjs";
import { planning } from "./planning.mjs";
import { displayCurrentTask } from "./standup.mjs";

const resteer = true;
const restrategize = true;
const replan = false;

const applicationState = {
    actuallyReady: 0
};

const watchedExtentions = [".js", ".cjs", ".mjs", ".json"];
const watchEpressions = watchedExtentions.map(ext => `./**/*${ext}`);

const watcher = chokidar.watch(
    watchEpressions,
    { ignored: /node_modules/ }
)
    .on("actually-ready", async () => {
        applicationState.actuallyReady = Infinity;
        await updateRepoOverview();
        if (resteer) await steering();
        if (restrategize) await strategize();
        console.log("ending early"); // just because it's in development
        process.exit(0); // just because it's in development
        if (replan) await planning();
        await displayCurrentTask();
    })
    .on("add", async (path, stats) => {
        // If the application is actually ready, this will
        // just be a no-op because it subtracts 1 from Infinity.
        applicationState.actuallyReady--;
        await ingestFile(path, stats);
        
        // If the application is actually ready, this will
        // just be a no-op because it adds 1 to Infinity.
        applicationState.actuallyReady++; 

        // We don't use "ready" because we want a way
        // to signal that the files have been ingested
        // not just that the watcher has started watching
        // the files.
        // TODO: make a different emitter for the system being
        // ready and the watcher being ready
        if (applicationState.actuallyReady <= 0) {
            if (applicationState.actuallyReady < 0) return;
            return watcher._readyEmitted && watcher.emit("actually-ready"); 
        }
        await updateRepoOverview();
        await displayCurrentTask();
    })
    .on("change", async (path, stats) => {
        await ingestFile(path, stats);
        await updateRepoOverview();
        await displayCurrentTask();
    });

