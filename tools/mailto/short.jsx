import React, { useState } from "react";

export const Short = ({
    mailtoFragment
}) => {
    const [m2ShortKey, setM2ShortKey] = useState(false);
    return (
        <form>
            <h2>
                Create A Mailto Shortlink for this <code>mailto:</code> link
            </h2>
            {m2ShortKey ? (<pre>
                {`https://m2-short.nyanhelsing.io/${m2ShortKey}`}
            </pre>) : (
                <aside className="info">
                    No shortlink generated yet
                </aside>
            )}
            <button
                onClick={async (e) => {
                    e.preventDefault();
                    const res = await fetch("https://m2-short.nyanhelsing.io", {
                        method: "PUT",
                        headers: {
                            "Content-Type": "text/plain"
                        },
                        body: mailtoFragment
                    });
                    const key = await res.text();
                    setM2ShortKey(key);
                }}
            >
                Generate Mailto Shortlink
            </button>
        </form>
        
    );
};

