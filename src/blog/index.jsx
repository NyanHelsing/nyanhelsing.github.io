import React, { Suspense, lazy } from "react";

import { Link } from "../link.jsx";
import { useLocator } from "../locator.jsx";

const posts = [
    {
        slug: "no-facebook",
        title: "We Don't Need Facebook",
        summary:
            "Personal Websites offer a significantly better experiece for your friends and family than a facebook profile can due to the limitations of facebook and their penchant for disregarding your data's saftey as long as it's not \"against the law\".",
        Component: lazy(() => import("./no-facebook.mdx"))
    },
    {
        slug: "commit-your-dist",
        title: "Commit Your Dist Directory",
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
            {locator.pathname === "/blog" ? (
                <h1>Posts</h1>
            ) : (
                <Link to="/blog">
                    <FontAwesomeIcon icon={"chevron-left"} />
                    Back to Posts
                </Link>
            )}

            {posts.map(({ slug, title, summary, Component }) => {
                if (locator.pathname === "/blog") {
                    return (
                        <article key={slug}>
                            <>
                                <h2>{title}</h2>
                                <p>{summary}</p>
                                <Link to={`/blog/${slug}`}>Read More</Link>
                            </>
                        </article>
                    );
                }
                if (locator.pathname.startsWith(`/blog/${slug}`)) {
                    return (
                        <Suspense fallback={<p>Loading...</p>}>
                            <Component />
                        </Suspense>
                    );
                }
            })}
        </>
    );
};
