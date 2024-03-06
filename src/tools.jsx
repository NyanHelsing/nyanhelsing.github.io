import React, { useRef, useState } from "react";

import { useLocator } from "./locator.jsx";

export const Tools = () => {
    const [locator] = useLocator();

    const emailRef = useRef();
    const subjectRef = useRef();
    const bodyRef = useRef();
    const [malito, setMailto] = useState("");

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
                        <pre>{malito}</pre>
                        <a href={malito}>mailto link</a>
                    </output>
                </form>
            </>
        )
    );
};
