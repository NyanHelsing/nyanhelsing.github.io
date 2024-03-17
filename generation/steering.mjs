import { persistedThemes, persistedInitiatives } from "./persistence.mjs";
import { context } from "./context.mjs";

import { identifyThemes, identifyInitiatives } from "./analysers/index.mjs";

const getExistingThemes = async () => {
    console.debug("Getting existing themes");
    try {
        const themes = await persistedThemes.values().all();
        if (themes.length > 0) {
            console.debug("Existing themes found");
            return themes;
        }
        console.debug("No existing themes found");
        console.log(context);
        console.log(context.get("\0:repoOverview"));
        const latestRepoOverview = context.get("\0:repoOverview");
        console.debug(latestRepoOverview);
        const newThemes = await identifyThemes(latestRepoOverview);
        console.debug("Persisting themes");
        await Promise.all(
            newThemes.map((theme) => {
                if (typeof theme !== "object") return;
                if (typeof theme.key !== "string") return;
                if (typeof theme.title !== "string") return;
                if (typeof theme.description !== "string") return;
                return persistedThemes.put(theme.key, theme);
            })
        );
        console.debug("Themes persisted");
        return newThemes;
    } catch (error) {
        console.error(error);
    }
};

const getExistingInitiatives = async (theme) => {
    console.debug("Getting existing initiatives");
    try {
        if (typeof theme.title !== "string") {
            console.error("Invalid theme: Theme title isn't a string");
            return [];
        }
        if (typeof theme.description !== "string") {
            console.error("Invalid theme: Theme description isn't a string");
            return [];
        }
        
        const initiatives = await persistedInitiatives.values().all();
        console.debug({initiatives});
        if (Array.isArray(initiatives) && initiatives.length > 0) return initiatives;
        console.debug("No existing initiatives found");
        const newInitiatives = await identifyInitiatives(theme, context.get("\0:repoOverview"));
        console.debug("Persisting initiatives");
        await Promise.all(
            newInitiatives.map((initiative) => {
                if (typeof initiative.key !== "string") {
                    console.error("Invalid initiative: Initiative key isn't a string");
                    return;
                }
                if (typeof initiative.title !== "string") {
                    console.error("Invalid initiative: Initiative name isn't a string");
                    return;
                }
                if (typeof initiative.description !== "string") {
                    console.error("Invalid initiative: Initiative description isn't a string");
                    return;
                }
                if (typeof initiative.themeKey !== "string") {
                    console.error("Invalid initiative: Initiative themeKey isn't a string");
                    return;
                }
                return persistedInitiatives.put(initiative.key, initiative);
            })
        );
        console.debug("Initiatives persisted");
        return newInitiatives;
    } catch (error) {
        console.error(error);
        return [];
    }
}

export const steering = async () => {
    console.log("\n\n*** BEGIN STEERING ***\n\n");
    const themes = await getExistingThemes();
    console.log({themes});
    const initiatives = (await Promise.all(
        themes.map((theme) => getExistingInitiatives(theme))
    )).flat()
    console.log({initiatives});
    console.log("\n\n*** END STEERING ***\n\n");
    return initiatives;
};

