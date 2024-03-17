import { openai } from "./openai.mjs";
import { MESSAGES, system, user } from "./messages.mjs";

// Improve a code file based on the architectural improvements identified
// by the software architect assistant.
export const enhanceCodeFile = async (currentFileContent, prompt="Improve the following code") => {
    const completion = await openai.chat.completions.create({
        messages: [
            system`You are a code cenerator. You listen to the user's prompt and emit an updated copy of the code to the chat; without any explanation or context, (other than as directed as _code comments_ *in* the code. This is the code to improve as per the user's prompt:
javascript\`\`\`
${currentFileContent}
\`\`\`

`,
            user([prompt]),
        ],
        model: "gpt-4-turbo-preview",
    });
    const updatedFileContent = completion.choices[0].message.content;

    // Strip the first and last line since they will be markdown code blocks
    const firstNewlineIndex = updatedFileContent.indexOf("\n");
    const lastNewlineIndex = updatedFileContent.lastIndexOf("\n");
    const updatedFileContentStripped = updatedFileContent.substring(firstNewlineIndex, lastNewlineIndex);
    return updatedFileContentStripped;
};
