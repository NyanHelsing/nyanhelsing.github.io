import { persistedContext } from "./persistence.mjs";
import { context } from "./context.mjs";

import { analyseAndSummarizeRepoState } from "./analysers/repo-overview.mjs";
const getPreviousOverviews = async () => {
    try {

        return await persistedContext.get("\0:repoOverview");
    } catch (error) {
        console.error("Error getting previous repo overview", error);
        return [];
    }
};

export const updateRepoOverview = async () => {
    console.debug("Updating repo overview");
    const previousRepoOverviews = await getPreviousOverviews();
    const updatedRepoOverview = [
        await analyseAndSummarizeRepoState(context),
        ...previousRepoOverviews.slice(0, 4)
    ];
    console.debug("Updated repo overview", updatedRepoOverview);
    await persistedContext.put("\0:repoOverview", updatedRepoOverview);
    context.set("\0:repoOverview", updatedRepoOverview[0]);
    //console.log(repoSummary);
};

