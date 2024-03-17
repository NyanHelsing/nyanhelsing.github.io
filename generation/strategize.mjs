import {
    persistedInitiatives,
    persistedFeatures,
} from "./persistence.mjs";
import { context } from "./context.mjs";

import { identifyFeatures } from "./analysers/index.mjs";

const getFeature = async (initiative) => {
    if (typeof initiative.name !== "string") return [];
    try {
        const features = persistedFeatures.getMany(initiative.featureKeys);
        if (features.length > 0) return features;
        const repoOverview = context.get("\0:repoOverview")
        return await identifyFeatures(initiative).map((features) => {
            feature.initiativeKey = initiative.key;
            return feature;
        });
    } catch (error) {
        console.error(error);
    }
};

const saveFeature = (feature) => {
    if (typeof feature.name !== "string") return;
    if (typeof feature.description !== "string") return;
    return persistedFeatures.put(
        feature.name,
        feature.description
    );
};

export const strategize = async () => {
    const initiatives = await persistedInitiatives.iterator().all();
    const features = await Promise.all(
        initiatives.map(getFeatures)
    ).flat();
    await Promise.all(features.map(saveFeature));
    return features;
};

