import { openai } from '../openai.mjs';
import { MESSAGES, system, user } from '../messages.mjs';

export const identifyStories = async (repoSummary, feature) => {
    const completion = await openai.chat.completions.create({
        messages: [
            system([`You are the Product Manager Agent. You are looking at a summary of the repo. You want to identify a number of specific, concrete, user stories that can be used to organise engineering effort in relation to a specific epic:\n\n\`\`\`xml\n<epic><key>${epic.key}</key><title>${feature.title}</title><description>${feature.description}</description></epic>\n\`\`\`\n\nThe motivation of making the product more appealing to new users.\n\nThe user will enter the summary of the product in chat, then you will identify the stories that fit within this epic.\n\n Emit 3 stories, as a json formatted array where each element is an object with a "title" key, a "description" key, and an "epicKey" key. For example: {"stories": [{"title": "As a <user-role /> I want to <desire /> so that i can <outcome />", "description": "", "epicKey": "<epic-key />"}]}\n`]),
            user([repoSummary])
        ],
        model: "gpt-3.5-turbo",
        response_format: { type: "json_object" }
    });
    const { stories } = JSON.parse(completion.choices[0].message.content);
    return stories;
}
