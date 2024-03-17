// Multi-Agent System (MAS) Core Implementation

/**
 * This Multi-Agent System (MAS) is a self-improving system where the
 * assistant will improve the code that is used to improve the code using
 * the ai assistant. Each agent has a specialization and will contribute a 
 * specifc aspect or point of view to the process of implementation.
 */

import { promises as fs } from "node:fs";
import { dirname } from "node:path";

import { diffLines } from "diff";
import chalk from "chalk";
import { glob } from "glob";

import { persistedContext } from "./persistence.mjs";
import { context } from "./context.mjs";

import { 
    identifyArchitecturalImprovementsForFile,
    analyseAndSummarizeCodeFile,
    analyseAndSummarizeRepoState,
    identifyFeatureThemes,
    identifyFeatureEnhancements,
    identifyPriorityTask,
    elaboratePriorityTask
} from "./analysers/index.mjs";
import { monitorSystemPerformance } from "./performance.mjs";
import { testEnhancement } from "./testing.mjs";


import { enhanceCodeFile } from "./enhance-code-file.mjs";

const showDiff = (original, updated) => {
    diffLines(original, updated).forEach((part) => {
        if (part.added) {
            process.stdout.write(chalk.green(part.value));
            return;
        }
        if (part.removed) {
            process.stdout.write(chalk.red(part.value));
            return;
        }
        process.stdout.write(part.value);
    });
};

const currentDirectory = dirname(new URL(import.meta.url).pathname);

await Promise.all(
    (await glob("*.mjs", {
        cwd: currentDirectory,
        ignore: ["node_modules"] 
    })).map(async (file) => {
        try {
            const storedFileContext = await persistedContext.get(file);
            if (storedFileContext.summary) {
                console.log(`Loaded persisted context for ${file}`);
                return context.set(file, storedFileContext);
            } else {
                throw new Error("Summary not found");
            }
        } catch (error) {
            console.log(`Ingesting ${file}`);
            const content = await fs.readFile(file, "utf-8");
            const summary = await analyseAndSummarizeCodeFile(file, content);
            await persistedContext.put(file, { content, summary });  
            return context.set(file, { content, summary });
        }
    })
);

const fileSummaries = [...context.entries()].map(([file, { summary }]) => [file, summary])

const repoSummary = await analyseAndSummarizeRepoState(context);
persistedContext.put("\0:repoState", repoSummary);
context.set("\0:repoState", repoSummary);
console.log(repoSummary);

const themeAnalysis = await identifyFeatureThemes(repoSummary);

const featureEnhancements = await identifyFeatureEnhancements(repoSummary, themeAnalysis);

console.log(themeAnalysis, featureEnhancements);
process.exit(0);

const priorityTask = await identifyPriorityTask(featureEnhancements);
const elaboratedPriorityTask = await elaboratePriorityTask(priorityTask, fileSummaries);

console.log(priorityTask);

process.exit(0);

console.log("currentDirectory", currentDirectory);
// Recursive feedback loop to learn from past enhancement outcomes
const iterate = async (fileContent) => {

    const repoFiles = await glob("*", {
        cwd: currentDirectory,
        ignore: ["node_modules"] 
    });
    const updatedContext = Object.fromEntries(
        await Promise.all(
            repoFiles.map(async (file) => {
                const content = await fs.readFile(file, "utf-8");
                return [
                    file,
                    {
                        summary: await analyseAndSummarizeCodeFile(file, content),
                        content
                    }
                ];
            })
        )
    );
    const summary = await analyseAndSummarizeCodeFile("main.mjs", context["main.mjs"]);

    // Step 1: Analyze code using AI to generate recommendations
    // Identify architectural improvements for the file;
    // (Use AI to analyze code and generate recommendations)
    const architecturalImprovements = await identifyArchitecturalImprovementsForFile(fileContent);
    console.log(architecturalImprovements);

    // Step 2: Apply architectural improvements to the code:
    // Use the architectural improvements to enhance the file
    const enhancedFileContent = await enhanceCodeFile(fileContent, architecturalImprovements);

    // Step 3: Test the enhanced code to ensure it meets the requirements
    const testResults = await testEnhancement(enhancedFileContent);

    // If tests pass, update code and record successful enhancement
    if (testResults.pass) {
        return enhancedFileContent;

        // in the future, we will add a feedback loop to learn from the past
        // iterate(enhancedFileContent);
    } else {
        // Prompt user to provide feedback on failed enhancement
        throw new Error("Enhancement failed. Please provide feedback to improve the system.");
    }

    // Step 3: Monitor performance to guide future enhancements
    const metrics = monitorSystemPerformance();

};

console.log("Main file is running");
const filePath = new URL(import.meta.url).pathname;
const fileContent = await fs.readFile(filePath, "utf-8");
const enhancedFileContent = await iterate(fileContent);
//show the diff between the original and the completion
showDiff(fileContent, enhancedFileContent);
console.debug(enhancedFileContent);
console.log("Main file is finished");

/**
 * Key Points:
 * - Incorporates an advanced AI-driven analysis for code improvements.
 * - Utilizes a dynamic feedback loop to learn from past enhancement outcomes.
 * - Implements real-time monitoring to inform immediate and future enhancements.
 * - Employs a test-driven approach to ensure enhancements do not introduce regressions.
 */
