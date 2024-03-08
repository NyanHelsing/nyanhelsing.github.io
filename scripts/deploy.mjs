import { execSync } from "node:child_process";
import readline from "node:readline";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
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

const bump =
    (kind) =>
    ({ major, minor, patch }) => {
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
var kind = process.argv[2];
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

    const result = new Promise((resolve) => {
        rl.question(
            "What kind of change is this? (major/0, minor/1, patch/2)",
            (answer) => {
                // TODO: Log the answer in a database
                console.log(`Entered: ${answer}`);
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
                }[answer];
                rl.close();
                resolve(answer);
            }
        );
    });
}

const version = bump()(getCurrentVersion());
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

console.log("Deployment successful!");
