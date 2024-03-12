import React, { useEffect, useRef, useState } from "react";

import { useLocator } from "@nyan-helsing/locator";

const MOUNT_PATHS = new Set(["/tools.html", "/tools"]);

const storedRemember = Boolean(localStorage.getItem("mailto-tool-remember"));
const storedEmail = localStorage.getItem("mailto-tool-email");
const storedSubject = localStorage.getItem("mailto-tool-subject");
const storedBody = localStorage.getItem("mailto-tool-body");

console.log(storedRemember);

let yetInitialized = false;
export const MailtoGenerator = () => {
    const [locator] = useLocator();
    const [mailto, setMailto] = useState("");
    const [rememberMailto, setRememberMailto] = useState(storedRemember);
    const emailRef = useRef();
    const subjectRef = useRef();
    const bodyRef = useRef();

    console.debug(rememberMailto);

    const openedMailto = useRef(false);
    //const mailtoParam = new URLSearchParams(locator.search).get("mailto");
    const mailtoFragment = new URL(locator.href).hash.slice(1);

    useEffect(() => {
        console.debug(rememberMailto, "useEffect");
        if (rememberMailto) {
            if (!yetInitialized) {
                emailRef.current.value = storedEmail ?? emailRef.current.value;
                subjectRef.current.value =
                    storedSubject ?? subjectRef.current.value;
                bodyRef.current.value = storedBody ?? bodyRef.current.value;
                yetInitialized = true;
            }
            localStorage.setItem("mailto-tool-email", emailRef.current.value);
            localStorage.setItem(
                "mailto-tool-subject",
                subjectRef.current.value
            );
            localStorage.setItem("mailto-tool-body", bodyRef.current.value);
            localStorage.setItem("mailto-tool-remember", "true");
        } else {
            localStorage.removeItem("mailto-tool-email");
            localStorage.removeItem("mailto-tool-subject");
            localStorage.removeItem("mailto-tool-body");
            localStorage.removeItem("mailto-tool-remember");
        }
    }, [rememberMailto, mailto]);

    useEffect(() => {
        if (mailtoFragment && !openedMailto.current) {
            const mailto = atob(decodeURIComponent(mailtoFragment));
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

    const receivedMailto = mailtoFragment && (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                gap: "1em",
                padding: "1em",
                background: "#f0f0f0",
                borderRadius: "0.5em"
            }}
        >
            <h2>You've Been sent a Portable Mailto Link</h2>
            <p>
                The link should have opened automatically. If it didn't, it
                might because a popup blocker blocked it. Click the button below
                to open it. Some browsers might not support this feature, if
                that's the case, you can copy the link and paste it into your
                normal browser's address bar.
            </p>
            <button
                style={{
                    cursor: "pointer",
                    alignSelf: "center",
                    fontSize: "1.5em",
                    padding: "0.5em 2em",
                    background: "#5b865b",
                    color: "white",
                    borderRadius: "0.5em",
                    border: "none"
                }}
                onClick={() => {
                    const mailto = atob(decodeURIComponent(mailtoFragment));
                    window.location.href = mailto;
                    openedMailto.current = true;
                }}
            >
                Open mailto link
            </button>
        </div>
    );
    const mailtQuickstart = (
        <>
            <h3>
                🚀 Quick Start Guide to Amplify Your Message with Portable
                Mailtos 💌
            </h3>
            <ol
                style={{
                    listStyle: "decimal",
                    paddingLeft: "20px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px"
                }}
            >
                <li>
                    <strong>Craft Your Message:</strong> Enter your desired
                    recipient's email, a catchy subject, and the message body
                    you want to share. This could be anything from a
                    personalized note to a ready-to-go email template. 📝
                </li>
                <li>
                    <strong>Generate Your Link:</strong> Hit the 'Create Link'
                    button to transform your email into a shareable, clickable
                    link. We use magic (okay, not really - just some clever
                    base64 and URL encoding) to make your mailto link portable.
                    ✨
                </li>
                <li>
                    <strong>Share Far and Wide:</strong> Copy your newly minted
                    link and share it across platforms, even where standard
                    mailto links dare not go. Perfect for amplifying your
                    message on social media, forums, or anywhere you can post a
                    link! 🔗
                </li>
            </ol>
        </>
    );
    return (
        <>
            {receivedMailto}
            {mailtQuickstart}

            <form>
                <div
                    style={{
                        borderRadius: "0.5em",
                        padding: "1em",
                        display: "flex",
                        flexDirection: "column",
                        gap: "0.5em",
                        alignItems: "stretch",
                        backgroundColor: "rgb(164, 150, 193)"
                    }}
                >
                    <label>
                        <strong>Email address:</strong> - To add multiple
                        recipients, separate each email with a comma.
                    </label>

                    <input
                        style={{
                            padding: "0.3em",
                            fontSize: "1.1em",
                            borderRadius: "0.3em",
                            border: "0px solid #fff"
                        }}
                        type="email"
                        ref={emailRef}
                    />
                    <label
                        style={{
                            fontWeight: "bold"
                        }}
                    >
                        Subject:
                    </label>
                    <input
                        style={{
                            padding: "0.3em",
                            fontSize: "1.1em",
                            borderRadius: "0.3em",
                            border: "0px solid #fff"
                        }}
                        type="text"
                        ref={subjectRef}
                    />
                    <label
                        style={{
                            fontWeight: "bold"
                        }}
                    >
                        Body:
                    </label>
                    <textarea
                        style={{
                            padding: "0.3em",
                            height: "14em",
                            fontSize: "1.1em",
                            fontFamily: "Source Sans 3",
                            resize: "vertical",
                            borderRadius: "0.3em",
                            border: "0px solid #fff"
                        }}
                        ref={bodyRef}
                    />
                    <label style={{}}>
                        <input
                            type="checkbox"
                            defaultChecked={rememberMailto}
                            value={rememberMailto}
                            onChange={(event) => {
                                console.log(event);
                                setRememberMailto(!rememberMailto);
                            }}
                        />
                        <strong>Remember this info for next time?</strong>
                        {" - "}
                        <i>
                            This will store the email, subject, and body in your
                            browser's local storage, so if you come back to this
                            page, the fields will be pre-filled with the last
                            values you used.
                        </i>
                    </label>
                    <button
                        style={{
                            padding: "0.5em",
                            borderRadius: "0.5em",
                            color: "rgb(229, 240, 233)",
                            backgroundColor: "rgb(88, 107, 88)",
                            border: "none",
                            alignSelf: "end",
                            cursor: "pointer"
                        }}
                        type="submit"
                        onClick={(event) => {
                            event.preventDefault();
                            // need to encode the subject and body
                            const email = emailRef.current.value;
                            const subject = encodeURIComponent(
                                subjectRef.current.value
                            );
                            const body = encodeURIComponent(
                                bodyRef.current.value
                            );
                            setMailto(
                                `mailto:${email}?subject=${subject}&body=${body}`
                            );
                        }}
                    >
                        Generate mailto link
                    </button>
                </div>
                <output
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "0.5em"
                    }}
                >
                    <h3>Mailto link (URI)</h3>
                    <p>
                        This is the "standard" mailto link, in the URI format.
                        Note this may not work in all contexts, such as social
                        media posts on platforms that don't support mailto
                        links, such as <code>linktree</code>.
                    </p>
                    {mailto ? (
                        <pre
                            style={{
                                overflow: "auto",
                                borderRadius: "1em",
                                padding: "1em",
                                color: "#ccc",
                                background: "#222"
                            }}
                        >
                            {mailto}
                        </pre>
                    ) : (
                        <article
                            style={{
                                backgroundColor: "rgb(206, 220, 253)",
                                padding: "1em",
                                borderRadius: "0.5em"
                            }}
                        >
                            <h4
                                style={{
                                    margin: "0 0 0.5em 0"
                                }}
                            >
                                INFO: A <code>mailto</code> link has not yet
                                been generated
                            </h4>
                            <p>
                                The form above can be used to provide the
                                necessary information to generate a mailto link.
                                After filling out the form, click the "Generate
                                mailto link" button to generate the mailto link.
                            </p>
                        </article>
                    )}
                    <button
                        disabled={!mailto}
                        style={{
                            padding: "0.5em",
                            borderRadius: "0.5em",
                            color: "rgb(229, 240, 233)",
                            backgroundColor: "rgb(88, 107, 88)",
                            border: "none",
                            alignSelf: "end",
                            cursor: "pointer"
                        }}
                        onClick={(event) => {
                            event.preventDefault();
                            navigator.clipboard.writeText(mailto);
                        }}
                    >
                        Copy link (URI) to clipboard
                    </button>

                    <h3>Portable mailto link</h3>
                    <p>
                        This link enables the mailto to be used in apps like{" "}
                        <i>linktr.ee</i> that might not directly support links
                        that use the <code>mailto</code> protocol.
                    </p>
                    {portableMailto ? (
                        <pre
                            style={{
                                overflow: "auto",
                                borderRadius: "1em",
                                padding: "1em",
                                color: "#ccc",
                                background: "#222"
                            }}
                        >
                            https://nyanhelsing.github.io/tools/mailto-generator#
                            {portableMailto}
                        </pre>
                    ) : (
                        <article
                            style={{
                                backgroundColor: "rgb(206, 220, 253)",
                                padding: "1em",
                                borderRadius: "0.5em"
                            }}
                        >
                            <h4
                                style={{
                                    margin: "0 0 0.5em 0"
                                }}
                            >
                                INFO: A "portable" <code>mailto</code> link has
                                not yet been generated
                            </h4>
                            <p>
                                The form above can be used to provide the
                                necessary information to generate a mailto link.
                                After filling out the form, click the "Generate
                                mailto link" button to generate the mailto link.
                            </p>
                        </article>
                    )}
                    <button
                        disabled={!mailto}
                        style={{
                            padding: "0.5em",
                            borderRadius: "0.5em",
                            color: "rgb(229, 240, 233)",
                            backgroundColor: "rgb(88, 107, 88)",
                            border: "none",
                            alignSelf: "end",
                            cursor: "pointer"
                        }}
                        onClick={(event) => {
                            event.preventDefault();
                            navigator.clipboard.writeText(
                                `https://nyanhelsing.github.io/tools/mailto#${portableMailto}`
                            );
                        }}
                    >
                        Copy portable mailto link to clipboard
                    </button>

                    <h3>Embedding in a Web Page</h3>
                    <p>
                        Clicking this takes you to the mailto directly. Use this
                        to embed the "mailto" link into a website.
                    </p>
                    {mailto ? (
                        <>
                            <h4>Preview:</h4>
                            <article
                                style={{
                                    backgroundColor: "#ddd",
                                    padding: "1em"
                                }}
                            >
                                <a href={mailto}>mailto link</a>
                            </article>
                            <pre
                                style={{
                                    overflow: "auto",
                                    borderRadius: "1em",
                                    padding: "1em",
                                    color: "#ccc",
                                    background: "#222"
                                }}
                            >
                                &lt;a href="{mailto}"&gt;Email me&lt;/a&gt;
                            </pre>
                        </>
                    ) : (
                        <article
                            style={{
                                backgroundColor: "rgb(206, 220, 253)",
                                padding: "1em",
                                borderRadius: "0.5em"
                            }}
                        >
                            <h4
                                style={{
                                    margin: "0 0 0.5em 0"
                                }}
                            >
                                INFO: The code for embedding <code>mailto</code>{" "}
                                link has not yet been generated
                            </h4>
                            <p>
                                The form above can be used to provide the
                                necessary information to generate a mailto link.
                                After filling out the form, click the "Generate
                                mailto link" button to generate the mailto link.
                            </p>
                        </article>
                    )}
                    <button
                        disabled={!mailto}
                        style={{
                            padding: "0.5em",
                            borderRadius: "0.5em",
                            color: "rgb(229, 240, 233)",
                            backgroundColor: "rgb(88, 107, 88)",
                            border: "none",
                            alignSelf: "end",
                            cursor: "pointer"
                        }}
                        onClick={(event) => {
                            event.preventDefault();
                            navigator.clipboard.writeText(
                                `<a href="${mailto}">Email me</a>`
                            );
                        }}
                    >
                        Copy mailto anchor tag to clipboard
                    </button>
                </output>
            </form>
        </>
    );
};

MailtoGenerator.id = "mailto";
MailtoGenerator.title = "Mailto Generator";
MailtoGenerator.description = (
    <p
        style={{
            margin: "0"
        }}
    >
        Whether you're rallying support, sharing a must-see email template, or
        just making it easier for friends to reach out, our tool removes the
        barriers, making your call to action as simple as clicking a link. No
        more copying and pasting email addresses - just direct, effective
        communication. 🎯
    </p>
);
MailtoGenerator.cta = "Generate a mailto";
