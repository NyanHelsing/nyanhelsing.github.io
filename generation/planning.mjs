import {
    persistedFeatures,
    persistedEpics,
    persistedStories
} from "./persistence.mjs";
import { context } from "./context.mjs";

import { identifyEpics, identifyStories } from "./analysers/index.mjs";

const getEpics = async (feature) => {
    if (typeof feature.name !== "string") return [];
    try {
        const epics = persistedEpics.getMany(feature.epicKeys);
        if (epics.length > 0) return epics;
        const repoOverview = context.get("\0:repoOverview")
        return await identifyEpics(feature).map((epic) => {
            epic.featureKey = feature.key;
            return epic;
        });
    } catch (error) {
        console.error(error);
    }
};

const getStories = async (epic) => {
    if (typeof epic.name !== "string") return [];
    try {
        const stories = await persistedStories.getMany(epic.storyKeys);
        if (stories.length > 0) return stories;
        return (await identifyStories(epic)).map((story) => {
            story.epic = epic.name;
            return story;
        });
    } catch (error) {
        console.error(error);
    }
}

const saveEpic = (epic) => {
    if (typeof epic.name !== "string") return;
    if (typeof epic.description !== "string") return;
    return persistedEpics.put(epic.name, epic.description);
};

const saveStory = (story) => {
    if (typeof story.name !== "string") return;
    if (typeof story.description !== "string") return;
    return persistedStories.put(
        story.name,
        story.description
    );
};

export const planning = async () => {
    const features = await persistedFeatures.iterator().all();
    const epics = await Promise.all(features.map(getEpics)).flat();
    await Promise.all(epics.map(saveEpic));
    const stories = await Promise.all(epics.map(getStories)).flat();
    await Promise.all(stories.map(saveStory));
    return stories;
};

