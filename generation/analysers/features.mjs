import { openai } from '../openai.mjs';
import { MESSAGES, system, user } from '../messages.mjs';

export const identifyFeatures = async (repoSummary, themeAnalysis) => {
    const completion = await openai.chat.completions.create({
        messages: [
            system([`You are the Product Manager Agent. You are looking at a summary of the repo. You want to identify a number of specific, concrete, implementable enhancements or new features that can be made to the product, with the motivation of making the product more appealing to new users.\n\n There are general themes with which we want to organise our features; there _themes_ are as follows: \n ${themeAnalysis}\n\n The user will enter the summary of the product in chat, then you will identify the feature enhancements.\n\n Emit 4-5 features for *each* theme as a json formatted array where each element is an object with a "feature" key, a "theme" key, and an "acceptanceCriteria" key. The acceptanceCriteria should be a list of strings that describe the conditions that must be met for the feature to be considered complete. For example:\n \`\`\`json\n[{"feature": "feature1", "theme": "theme1", "acceptanceCriteria": ["criterion1", "criterion2"]}]\n\`\`\``]),
            user([repoSummary])
        ],
        model: "gpt-3.5-turbo",
        response_format: { type: "json_object" }
    });
    const featureEnhancements = JSON.parse(completion.choices[0].message.content);
    return featureEnhancements;
}
