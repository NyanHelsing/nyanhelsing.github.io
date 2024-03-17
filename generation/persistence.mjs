import { Level } from "level";

const level = new Level("data", { valueEncoding: "json" });

export const persistedContext =
    level.sublevel("context", { valueEncoding: "json" });

export const persistedThemes =
    level.sublevel("themes", { valueEncoding: "json" });

export const persistedInitiatives =
    level.sublevel("initiatives", { valueEncoding: "json" });

export const persistedFeatures =
    level.sublevel("features", { valueEncoding: "json" });

export const persistedEpics =
    level.sublevel("epics", { valueEncoding: "json" });

export const persistedStories =
    level.sublevel("stories", { valueEncoding: "json" });

export const persistedTasks =
    level.sublevel("tasks", { valueEncoding: "json" });

export const persistedPrompts =
    level.sublevel("prompts", { valueEncoding: "json" });

export const persistedPromptFeedback =
    level.sublevel("prompt-feedback", { valueEncoding: "json" });
