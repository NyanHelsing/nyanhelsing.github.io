import { register } from "node:module";
import { URL, pathToFileURL } from "node:url";

/*export const resolve = (specifier, context, nextResolve) => {
    if (specifier.startsWith("virtual:posts")) {
        return "file:=/posts";
    }
    return nextResolve(specifier, context);
};*/

// The load hook can return the source for the module, or delegate to the default loader
export const load = async (url, context, nextLoad) => {
    if (url.startsWith("virtual:posts")) {
        // This is where you can customize the loading, for example, generating the source code dynamically
        // For URLs that represent your virtual modules, you'd provide the source here
        //const loaded = nextLoad(url, context);
        return {
            format: "module",
            source: "export const posts = []",
            shortCircuit: true
        };
    }
    // Fallback to Node.js's default loader for other URLs
    return nextLoad(url, context);
};
