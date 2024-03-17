import enquirer from "enquirer";
import {
    persistedThemes,
    persistedInitiatives,
    persistedFeatures,
    persistedEpics,
    persistedStories,
    persistedTasks
} from './persistence.mjs';

const { prompt } = enquirer;

const recordTypes = new Map([
    ["theme", persistedThemes],
    ["initiative", persistedInitiatives],
    ["feature", persistedFeatures],
    ["epic", persistedEpics],
    ["story", persistedStories],
    ["task", persistedTasks],
]);

const { recordKind } = await prompt({
    type: "select",
    name: "recordKind",
    message: "Which record type?",
    choices: [
        ...[...recordTypes.keys()].map((recordType) => ({
            name: recordType.toLowerCase(),
            message: recordType.charAt(0).toUpperCase() + recordType.slice(1),
            value: recordType
        })),
        { name: "exit", message: "Exit" }
    ]
});

console.log(`You chose: ${recordKind}`);

const { actionKind } = await prompt({
    type: "select",
    name: "actionKind",
    message: "What would you like to do?",
    choices: [
        { name: "list", message: "List", value: "list" },
        { name: "drop", message: "Drop", value: "drop" },
        { name: "exit", message: "Exit" }
    ]
});

if (actionKind === "exit") process.exit(0);

console.log(`You chose: ${actionKind}`);

// Immediately invoked async function dispatch expression (IIAFDE)
await ({
    list: Object.fromEntries(
        [...recordTypes.entries()].map(([recordType, sublevel]) => (
            [
                recordType,
                async () => {
                    console.log(await sublevel.values().all());
                }
            ]
        ))
    ),
    drop: Object.fromEntries(
        [...recordTypes.entries()].map(([recordType, sublevel]) => (
            [
                recordType,
                async () => {
                    const { confirmed } = await prompt({
                        type: "select",
                        name: "confirmed",
                        message: "Are you sure?",
                        choices: [
                            { name: "exit", message: "Oops no don't drop this", value: false },
                            { name: "yes", message: "Yes drop it", value: true }
                        ]
                    });
                    if (confirmed) {
                        await sublevel.clear()
                        console.log("Dropped");
                    }
                }
            ]
        ))
    )
}[actionKind][recordKind])();

