import React, { useRef, useState } from "react";

import { useLocator } from "./locator.jsx";

export const Tools = () => {
    const [locator] = useLocator();

    const emailRef = useRef();
    const subjectRef = useRef();
    const bodyRef = useRef();
    const [mailto, setMailto] = useState("");

    const mailtoParam = new URLSearchParams(locator.search).get("mailto");
    const portableMailto = mailto ? encodeURIComponent(btoa(mailto)) : "";

    if (mailtoParam) {
        console.log("DECODING", mailtoParam);
        const mailto = atob(decodeURIComponent(mailtoParam));
        const url = new URL(mailto);
        window.location.href = url.href;
    }

    return (
        new Set(["/tools.html", "/tools"]).has(locator.pathname) && (
            <>
                <h1>Tools</h1>

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
                        <pre>{mailto}</pre>
                        <a href={mailto}>mailto link</a>
                        <pre>https://nyanhelsing.github.io/tools.html?mailto={portableMailto}</pre>
                    </output>
                </form>
            </>
        )
    );
};
