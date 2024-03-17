import { openai } from '../openai.mjs';
import { MESSAGES, system, user } from '../messages.mjs';

export const identifyEpics = async (repoSummary, feature) => {
    const completion = await openai.chat.completions.create({
        messages: [
            system([`You are the Product Manager Agent. You are looking at a summary of the repo. You want to identify a number of specific, concrete, epics that can be used to organise user storie in relation to a specific feature:\n\n\`\`\`xml\n<feature><title>${feature.title}</title><description>${feature.description}</description></feature>\n\`\`\`\n\nThe motivation of making the product more appealing to new users.\n\nThe user will enter the summary of the product in chat, then you will identify the epics that fit within this feature.\n\n Emit 3 epics, as a json formatted array where each element is an object with a "title" key, a "description" key, and an "featureKey" key. For example: {"epics": [{"title": "Epic 1", "description": "This epic is about...", "featureKey": "feature1"}]}\n`]),
            user([repoSummary])
        ],
        model: "gpt-3.5-turbo",
        response_format: { type: "json_object" }
    });
    const { epics } = JSON.parse(completion.choices[0].message.content);
    return epics;
}
