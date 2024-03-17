import config from "config";
import OpenAI from "openai";


import { RateLimitedTaskExecutor } from "./execution/index.mjs";

// Create an Executor that will invoke max 10 tasks per second.
export const completionsApiRateLimiter = new RateLimitedTaskExecutor(3);

const apiKey = config.get("openai.api-key");
const _openai = new OpenAI({ apiKey });

// Wrap the OpenAI API operations we want to use with the rate limiter.
// We export the same basic API as the OpenAI library, but with rate limiting.
export const openai = {
    chat: {
        completions: {
            create: async (...params) => {
                return completionsApiRateLimiter.exec(
                    () => _openai.chat.completions.create(...params)
                );
            }    
        }
    }
};
