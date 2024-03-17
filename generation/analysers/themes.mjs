import { openai } from '../openai.mjs';
import { MESSAGES, system, user } from '../messages.mjs';

// Product Agent: "what are the themes that product features are related to in the repository?"
export const identifyThemes = async (repoOverview) => {
    console.debug("\n\n*** IDENTIFYING THEMES ***\n");
    console.debug({repoOverview});
    const completion = await openai.chat.completions.create({
        messages: [
            //system`You are the Product Manager Agent. You are looking at a status report of the codebase. You want to identify the themes that the product features are related to in the repository so that it's possible to track and organize feature development. The user will enter the status report in chat:`,
            system`As the Senior Executive Director of Product, your task is to analyze a documentprovided by the user, detailing the current state of the repository containing the product’s code. Your goal is not just to identify individual issues within the codebase but to creatively synthesize these issues to uncover broader underlying themes. These themes should reflect a deep understanding of the user's perspective on the product. Using this insight, suggest areas where the engineering effort should concentrate its feature development. Focus on connecting the dots between issues to propose coherent and impactful development themes. You should generate 5 themes. Your response should be formatted as JSON and include a list of themes, each with a title and a brief description. For example:\n\`\`\`json\n{ "themes": [ { "key": "performance", "title": "Performance", "description": "adressing performance issues enables a more responsive syste which wil make our guests happier." }, { "key": "security", "title": "Security", "description": "Adressing security concerns gives our guests peace of mind." } ] }\n\`\`\`\n`,
            user([repoOverview])
        ],
        model: "gpt-3.5-turbo",
        response_format: { type: "json_object" }
    });
    console.debug({content: completion.choices[0].message.content});
    const { themes } = JSON.parse(completion.choices[0].message.content);
    console.debug("\n\n*** THEMES IDENTIFIED ***\n");
    return themes;
};

