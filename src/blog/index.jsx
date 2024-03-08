import React, { Suspense, lazy } from "react";

import { Link } from "../link.jsx";
import { useLocator } from "../locator.jsx";

const posts = [
    {
        slug: "commit-your-dist.mdx",
        title: "Commit Your Dist",
        summary:
            "Make the dist directory a submodule of the main repository, enabling easy deploys to GitHub Pages.",
        Component: lazy(() => import("./commit-your-dist.mdx"))
    }
];

export const Blog = () => {
    const [locator] = useLocator();
    if (!locator.pathname.startsWith("/blog")) return;
    return (
        <>
            {posts.map(({ slug, title, summary, Component }) => (
                <article key={slug}>
                    {locator.pathname.startsWith(`/blog/${slug}.html`) ? (
                        <Suspense fallback={<p>Loading...</p>}>
                            <Component />
                        </Suspense>
                    ) : (
                        <>
                            <h2>{title}</h2>
                            <p>{summary}</p>
                            <Link to={`/blog/${slug}.html`}>Read More</Link>
                        </>
                    )}
                </article>
            ))}
        </>
    );
};
