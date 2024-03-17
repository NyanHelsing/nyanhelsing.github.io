import { openai } from '../openai.mjs';
import { MESSAGES, system, user } from '../messages.mjs';

export const analyseAndSummarizeRepoState = async (context) => {
    const fileSummaries = [...context.entries()].map(([file, { summary }]) => [file, summary])
    const completion = await openai.chat.completions.create({
        messages: [
            //system`You are a codeowner for a software project. You've been asked to provides a terse summary and explanation of the code contained in a repository to the "Product" agent. The Product agent is responsible for making decisions about features and how they should be prioritized. This summary is intended to be consumed by a large language model such as gpt4. The summary's purpose is to provide context about a codebase to the LLM _without_ requiring the entire contents of the codebase be provided to the model. Remember that it's important to stick to the basics since if we need more context we can always read the summary of a specific file, or even the whole file as needed. We really want to minimize the tokenization cost where possible. The user will enter a list of tuples where the first element is the filename and the second element is a summary of each file in chat:`,
            system`As a code owner for a software project, you are tasked with creating a high-level overview similar to a readme for the "Product" agent. This overview should succinctly yet comprehensively detail the repository's purpose, major features, architecture, technology stack, and any special instructions or dependencies. Remember, the goal is to provide the Product agent, who is responsible for feature prioritization decisions, with a clear and accessible summary. This includes outlining the project's scope, its strategic value, and potential impact, with examples or use cases to illustrate its utility. Please organize the information with headings or bullet points to enhance readability and ensure it remains concise. If relevant, include a note on the repository's maintenance status or upcoming features. This summary will enable the Product agent to make informed decisions without delving into the full codebase, thus optimizing tokenization cost and efficiency. Your contribution should be an executive summary of about 500 words that captures the essence of the repository in chat:`,
            user([JSON.stringify(fileSummaries)])
        ],
        model: "gpt-3.5-turbo",
    });
    const summary = completion.choices[0].message.content;
    return summary;
};
