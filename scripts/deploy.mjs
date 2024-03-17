#!/usr/bin/node

import { execSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import readline from "node:readline";
import { fileURLToPath } from "node:url";



const __dirname = dirname(dirname(fileURLToPath(import.meta.url)));
const packageJsonPath = join(__dirname, "package.json");

const doOrDie =
    (name, f) =>
    (...args) => {
        try {
            return f(...args);
        } catch (error) {
            console.error(`Error: in fn ${name}`, error);
            process.exit(1);
        }
    };

const bump = (kind) => (currentVersion) => {
    const [major, minor, patch] = currentVersion.split(".");
    switch (kind) {
        case "major":
            return `${Number(major) + 1}.0.0`;

        case "minor":
            return `${major}.${Number(minor) + 1}.0`;

        case "patch":
            return `${major}.${minor}.${Number(patch) + 1}`;
    }
};

// Function to get the current version from package.json
const getCurrentVersion = doOrDie("getCurrentVersion", () => {
    const packageJson = readFileSync(packageJsonPath);
    const { version } = JSON.parse(packageJson);
    return version;
});

// Function to execute shell commands
const runCommand = doOrDie("runCommand", (command) =>
    execSync(command, { stdio: "inherit" })
);

// ask for the kind of bump (major, minor, patch) from stdin
let kind = process.argv[2];
while (kind !== "major" && kind !== "minor" && kind !== "patch") {
    if (kind) {
        console.log(
            `Invalid kind of change: ${kind} Please enter a valid kind of change.`
        );
    }
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    const result = await new Promise((resolve) => {
        rl.question(
            'What kind of change is this? ( enter "major"/"0", "minor"/"1", "patch"/"2")\n >>> ',
            (answer) => {
                rl.close();
                resolve(answer);
            }
        );
    });
    // TODO: Log the answer in a database
    console.log(`Entered: ${result}`);
    kind = {
        major: "major",
        minor: "minor",
        patch: "patch",
        0: "major",
        1: "minor",
        2: "patch",
        "major/0": "major",
        "minor/1": "minor",
        "patch/2": "patch"
    }[result];
}

const version = bump(kind)(getCurrentVersion());
const commitMessage = `Deploy: v${version}`;

console.log(`Starting deployment for version ${version}...`);

// Build the project
console.log("Building project...");
runCommand("pnpm build");

// Navigate to dist, commit, and push
console.log("Committing changes...");
process.chdir("dist");

runCommand("git add .");
runCommand(`git commit -m "${commitMessage}"`);
runCommand("git push");

// Navigate back to the root directory
// and update the package.json version using pnpm
// and commit the change
// and push

process.chdir("..");
runCommand(`pnpm version ${version} --no-git-tag-version`);
runCommand("git add package.json");
runCommand(`git commit -m "Bump version to ${version}"`);
runCommand("git push");

// Log the success message
console.log("Deployment successful!");
