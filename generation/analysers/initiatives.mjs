import { openai } from '../openai.mjs';
import { MESSAGES, system, user } from '../messages.mjs';

// Product Agent: "what are the themes that product features are related to in the repository?"
export const identifyInitiatives = async (theme, repoOverview) => {
    console.debug("\n\n*** IDENTIFYING INITIATIVES ***\n");
    const completion = await openai.chat.completions.create({
        messages: [
            //system`You are the Product Manager Agent. You are looking at a status report of the codebase. You want to identify the themes that the product features are related to in the repository so that it's possible to track and organize feature development. The user will enter the status report in chat:`,
            system([`As a Product Director for ${theme.title}, your task is to analyze a document provided by the user, detailing the current state of the repository containing the product’s code. Your goal is not just to identify individual issues within the codebase but to creatively synthesize broad initiatives that fall within the categorization of your assigned theme:\n\n\`\`\`xml\n<theme><key>${theme.key}</key><title>${theme.title}</title><description>\n${theme.description}\n</description></theme>\n\`\`\`\n\n. These initiatives should reflect a deep understanding of the user's perspective on the product. Using this insight, these initiatives represent areas where the product managers should concentrate its identification of features worth pursuing. Focus on connecting the dots between the initiatives to propose coherent and impactful development initiatives that directly relate to the theme. You should generate 3 initiatives. Your response should be formatted as json and include a list of initiatives, each with a key, title, themeKey, and a brief description. For example:\n\`\`\`json\n{"initiatives":[{"key": "<initiative-key />", "title":"<initiative-title />","description":"<initiative-description />", "themeKey": "<theme-key \>"}, ...]}\n\`\`\`\n`]),
            user([repoOverview])
        ],
        model: "gpt-3.5-turbo",
        response_format: { type: "json_object" }
    });
    console.debug("\n\n*** INITIATIVES IDENTIFIED ***\n");
    console.debug({content: completion.choices[0].message.content});
    const { initiatives } = JSON.parse(completion.choices[0].message.content);
    console.log({initiatives});
    return initiatives;
};


