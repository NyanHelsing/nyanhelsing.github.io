import { openai } from '../openai.mjs';

export const identifyArchitecturalImprovements = async (currentFileContent) => {
    const completion = await openai.chat.completions.create({
        messages: [
            system`You are a software architect. Focus on identifying a single aspect of the system that can be improved. Implementing this single improvement will have the greatest impact on the capabilities of the system, (not necessarily the change that will improve maintainability, readability, or other non-functional aspects of the system first; we can address those after the system is bootstrapped). We want to build a self-improving system where the assistant will improve the code that is used to improve the code using the ai assistant. Currently the code is as follows:`,
            user([JSON.stringify(currentFileContent)])
        ],
        model: "gpt-4-turbo-preview",
    });
    const architecturalImprovements = completion.choices[0].message.content;
    return architecturalImprovements;
};
