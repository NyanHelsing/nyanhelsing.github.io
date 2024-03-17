import { openai } from '../openai.mjs';
import { MESSAGES, system, user } from '../messages.mjs';

export const codeSummary = async (filename, fileContent) => {
    const completion = await openai.chat.completions.create({
        messages: [
            system`You are a code summarizer that provides a terse summary of the code contained in a file. This summary is intended to be consumed by a large language model such as gpt4. The summary's purpose is to provide context about a codebase to the LLM _without_ requiring the entire contents of the file be provided to the model. Remember that it's important to stick to the basics since if we need more context we can always read the whole file. We really want to minimize the tokenization cost where possible. The user will enter the name of the file and file contents in chat:`,
            user([`${filename}:\njavascript\`\`\`\n${fileContent}\n\`\`\``])
        ],
        //model: "gpt-4-turbo-preview",
        model: "gpt-3.5-turbo",
    });
    const summary = completion.choices[0].message.content;
    return summary;
};
