import { openai } from "./openai.mjs";
import { persistedPromptFeedback } from "./persistence.mjs";
import { system, assistant, user } from "./messages.mjs";

const promptFeedback = [
    {
        originalSystemMessage: `When you receive a JSON formatted prompt refinement request from the user, which includes both the original prompt and a specific issue they're encountering, your task is to carefully refine the prompt. Ensure your refinement addresses the mentioned issue while faithfully preserving all the original prompt's instructions and requirements. Your response should only contain the refined prompt, without any additional comments, labels, formatting, or contextual explanations.`,
        issue: "The prompt acually works well on gpt4, but I need to make sure it works with GPT-4 and GPT-3.5 and on gpt3.5 it's losing a bunch of the subtlety of the original prompt.",
        improvedSystemMessage: `When you receive a request to refine a prompt from the user, formatted in JSON, which consists of the original prompt alongside a specific problem they're facing, refine the prompt attentively. Make sure your refinement directly tackles the mentioned problem while also accurately maintaining the essence and directives of the original prompt. Your response should solely consist of the refined prompt, omitting any supplementary commentary, identifiers, formatting styles, or explanatory content. This refined prompt should be comprehensible and maintain the instructions and requirements of the original prompt across both GPT-4 and GPT-3.5 versions, ensuring consistent adherence to the original directives.`,
    },
    ...await persistedPromptFeedback.iterator().all()];
const generateRandomOrdering = (length) => {
    return Array.from({ length }, (_, i) => i).sort(() => Math.random() - 0.5);
};
    
export const improveSystemMessage = async (originalSystemMessage, issue) => {
    const completion = await openai.chat.completions.create({
        messages: [
            //system`As a prompt analysis AI, your task is to enhance a user-submitted prompt and provide a refined version. Ensure that the refined prompt itself is the only content in your response. Do not include any additional information, labels, formatting, or context.`,
            //system`The user will provide you with a JSON formatted prompt refinement request containing the original prompt and an issue that the user would like to solve with the prompt. Your task is to provide a refined prompt that addresses the issue. The refined prompt should be the only content in your response. Do not include any additional information, labels, formatting, or context.`,
            //system`When you receive a JSON formatted prompt refinement request from the user, which includes both the original prompt and a specific issue they're encountering, your task is to carefully refine the prompt. Ensure your refinement addresses the mentioned issue while faithfully preserving all the original prompt's instructions and requirements. Your response should only contain the refined prompt, without any additional comments, labels, formatting, or contextual explanations.`,
            system`When you receive a request to refine a gpt 'system message' from the user, formatted in JSON, which consists of the 'system message' alongside a specific problem they're facing when using the system message with gpt, refine the system message attentively. Make sure your refinement directly tackles the mentioned problem while also accurately maintaining the essence and directives of the original system message. Your response should solely consist of the refined system message, omitting any supplementary commentary, identifiers, formatting styles, or explanatory content. This refined system message should be comprehensible and maintain the instructions and requirements of the original system message across both GPT-4 and GPT-3.5 versions, ensuring consistent adherence to the original directives.`,
            ...generateRandomOrdering(promptFeedback.length)
                .slice(0, Math.min(promptFeedback.length, 3))
                .flatMap((index) => [
                    user([JSON.stringify({
                        originalSystemMessage: promptFeedback[index].originalSystemMessage,
                        issue: promptFeedback[index].issue
                    })]),
                    assistant([promptFeedback[index].improvedSystemMessage])
                ]),
            user([
                JSON.stringify({
                    originalSystemMessage,
                    issue
                })
            ]),
        ],
        model: "gpt-4-turbo-preview"
        //model: "gpt-3.5-turbo"
    });
    const improvedPrompt = completion.choices[0].message.content;
    return improvedPrompt;
};

const improved = await improveSystemMessage(
    "You are a product manager. You are trying to identify broad themes that the engineering effor should focus it's feature development in. The user will provide a list of the current state of the repo containing the code for the product.",
    "This prompt just identifies the issues exist in the codebase and makes up a theme for each of them, but i want it to be more creative and connect the dots between the issues to come up with underlying themes that really reflect the user's perspective of the product."
);
console.log(improved);
