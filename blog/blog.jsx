import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { Suspense, lazy } from "react";

import { Link } from "@nyan-helsing/link";
import { useLocator } from "@nyan-helsing/locator";

import { posts } from "virtual:posts";

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

            {posts.map(({ slug, title, summary, cover, Component }) => {
                if (locator.pathname === "/blog") {
                    return (
                        <article
                            key={slug}
                            style={{
                                background: "rgba(250,250,250,0.4)",
                                borderRadius: "0.5rem",
                                paddingTop: "0em",
                                display: "flex",
                                flexDirection: "column",
                                boxShadow: "0 5px 7px -7px #000",
                                gap: "0.7rem"
                            }}
                        >
                            <>
                                <h2
                                    style={{
                                        background: `rgba(250,250,250,0.7) url('/images/${cover}')`,
                                        backgroundBlendMode: "overlay",
                                        display: "flex",
                                        padding: "3rem 0.5rem 0.5rem 0.5rem",
                                        margin: "0",
                                        borderRadius: "0.5rem",
                                        backgroundPosition: "center center",
                                        backgroundSize: "cover",
                                        flexDirection: "column",
                                        gap: "1rem"
                                    }}
                                >
                                    {title}
                                </h2>
                                <p
                                    style={{
                                        padding: "0 0.5rem"
                                    }}
                                >
                                    {summary}
                                </p>
                                <footer style={{}}>
                                    <Link to={`/blog/${slug}`}>
                                        Read More{" "}
                                        <FontAwesomeIcon
                                            icon={"chevron-right"}
                                        />
                                    </Link>
                                </footer>
                            </>
                        </article>
                    );
                }
                if (locator.pathname.startsWith(`/blog/${slug}`)) {
                    return (
                        <Suspense fallback={<p>Loading...</p>}>
                            <img
                                src={`/images/${cover}`}
                                alt={title}
                                style={{ width: "100%" }}
                            />
                            <Component />
                        </Suspense>
                    );
                }
            })}
        </>
    );
};
