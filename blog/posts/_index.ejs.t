import { lazy } from 'react';

export const posts = [
    <% postsMeta.forEach((post, index) => { %><%- index === 0 ? '' : ',' -%>
        {
            slug: "<%- post.slug -%>",
            title: "<%- post.title -%>",
            summary: "<%- post.summary -%>",
            cover: "<%- post.cover -%>" || "cover-fallback.png",
            tags: "<%= JSON.stringify(post?.tags ?? []) %>",
            path: "<%- post.path -%>",
            mastodonPostId: "<%- post.mastodonPostId -%>",
            Component: lazy(() => import("@nyan-helsing/blog/<%- post.modPath -%>")),
       }
    <% }) %>
];
