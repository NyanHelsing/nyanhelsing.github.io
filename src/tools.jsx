import React, { useEffect, useRef, useState } from "react";

import { useLocator } from "./locator.jsx";

const MOUNT_PATHS = new Set(["/tools.html", "/tools"]);
export const Tools = () => {
    const [locator] = useLocator();
    const openedMailto = useRef(false);

    const emailRef = useRef();
    const subjectRef = useRef();
    const bodyRef = useRef();
    const [mailto, setMailto] = useState("");

    const mailtoParam = new URLSearchParams(locator.search).get("mailto");

    useEffect(() => {
        if (mailtoParam && !openedMailto.current) {
            const mailto = atob(decodeURIComponent(mailtoParam));
            window.location.href = mailto;
            openedMailto.current = true;
            const mailtoUrl = new URL(mailto);
            emailRef.current.value = mailtoUrl.pathname;
            subjectRef.current.value = mailtoUrl.searchParams.get("subject");
            bodyRef.current.value = mailtoUrl.searchParams.get("body");
            setMailto(mailto);
        }
    }, [locator]);

    const portableMailto = encodeURIComponent(btoa(mailto));

    return (
        MOUNT_PATHS.has(locator.pathname) && (
            <>
                <h1>Tools</h1>

                {mailtoParam && (
                    <div>
                        <h2>You've Been sent a Portable Mailto Link</h2>
                        <p>
                            The link should have opened automatically. If it didn't, it might
                            because a popup blocker blocked it. click the button below to open it.
                        </p>
                        <button
                            onClick={() => {
                                const mailto = atob(decodeURIComponent(mailtoParam));
                                window.location.href = mailto;
                                openedMailto.current = true;
                            }}
                        >
                            Open mailto link
                        </button>
                    </div>
                )}

                <h2>mailto generator</h2>
                <form>
                    <label>
                        Email address:
                        <input type="email" ref={emailRef} />
                    </label>
                    <label>
                        Subject:
                        <input type="text" ref={subjectRef} />
                    </label>
                    <label>
                        Body:
                        <textarea ref={bodyRef} />
                    </label>
                    <button
                        type="submit"
                        onClick={(event) => {
                            event.preventDefault();
                            // need to encode the subject and body
                            const email = emailRef.current.value;
                            const subject = encodeURIComponent(subjectRef.current.value);
                            const body = encodeURIComponent(bodyRef.current.value);
                            setMailto(`mailto:${email}?subject=${subject}&body=${body}`);
                        }}
                    >
                        Generate mailto link
                    </button>
                    <output>
                        <h3>Mailto link</h3>
                        <pre>{mailto}</pre>
                        <h3>Mailto anchor tag (clicking this takes you to the mailto directly)</h3>
                        <a href={mailto}>mailto link</a>
                        <h3>Portable mailto link</h3>
                        <p>
                            This link enables the mailto to be used in apps like linktree that might
                            not directly support the <i>"mailto"</i> protocol.
                        </p>
                        <pre>https://nyanhelsing.github.io/tools.html?mailto={portableMailto}</pre>
                    </output>
                </form>
            </>
        )
    );
};
