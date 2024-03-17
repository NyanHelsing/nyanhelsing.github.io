import { promises as fs } from "node:fs";
import { dirname } from "node:path";

import { diffLines } from "diff";
import chalk from "chalk";
import { glob } from "glob";

import {
    persistedContext,
    persistedThemes,
    persistedInitiatives
} from "./persistence.mjs";
import { context } from "./context.mjs";

import { 
    identifyThemes,
    identifyInitiatives,
    identifyFeatures,
    identifyPriorityTask,
    elaboratePriorityTask
} from "./analysers/index.mjs";
import { monitorSystemPerformance } from "./performance.mjs";

const taskRef = {
    current: null,
};

export const displayCurrentTask = async () => {
    if (taskRef.current) {
        console.log(taskRef.current);
    } else {
        console.log("No task currently set");
    }
};
