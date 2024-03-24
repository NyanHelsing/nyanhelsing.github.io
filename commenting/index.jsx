import React, { useState, useEffect, Suspense } from "react"

import { fetchStatusById, fetchContextForStatusById } from "./fetch-statuses.mjs";

export const Comment = ({
    comment: { id, account, content, replies }
}) => {
    return (
        <li
        style={{
            backgroundColor: "rgba(250,250,250,0.2",
            borderRadius: "0.5rem",
            padding: "1rem"
        }}
        >
            <h6>{account.display_name}</h6>
        <p
            dangerouslySetInnerHTML={{__html: content}}
        >
            </p>
        <Comments for={id} root={false} />
        </li>
    );
}

export const Comments = ({ for: id, root: root = true}) => {
    const [comments, setComments] = useState(null);
    useEffect(() => {
        (async () => {
            if (comments === null) {
                const { descendants } = await fetchContextForStatusById(id);
                if (Array.isArray(descendants) && Array.length > 0) {
                    setComments(descendants)
                }
            }
        })();
    }, [comments])

    if (comments === null) {
        return "Loading replies...";
    }

    return (
        <ol
        style={{
            listStyleType: "none",
            flexDirection: "column",
            display: "flex",
            gap: "0.5rem",
            paddingLeft: root ? "0" : "1rem",
            marginTop: root ? "0" : "1rem"
        }}
        >
        {comments
            .filter(({ in_reply_to_id }) => in_reply_to_id === id)
            .map((comment) => <Comment {...{ comment }} />)}
        </ol>
    );
};
