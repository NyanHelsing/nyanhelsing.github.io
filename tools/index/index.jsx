import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";

import { Link } from "@nyan-helsing/link";
import { useLocator } from "@nyan-helsing/locator";
import { MailtoGenerator } from "@nyan-helsing/mailto";
import { PointLol } from "@nyan-helsing/point-lol";

const MOUNT_PATHS = new Set(["/tools.html", "/tools"]);

export const Tools = () => {
    const [locator, setLocator] = useLocator();
    const [toolList, setToolList] = useState([
        {
            Component: MailtoGenerator,
            expanded: false
        },
        {
            Component: PointLol,
            expanded: false
        }
    ]);
    if (!locator.pathname.startsWith("/tools")) return;
    return (
        <>
            {locator.pathname === "/tools" ? (
                <h1>Tools</h1>
            ) : (
                <Link to="/tools">
                    <FontAwesomeIcon icon={"chevron-left"} /> Back to Tools
                </Link>
            )}

            {toolList.map(({ Component, expanded }, toolIndex) => {
                if (locator.pathname === "/tools") {
                    return (
                        <>
                            <section
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "0.5rem"
                                }}
                                key={Component.id}
                            >
                                <header
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                        margin: "0 0",
                                        padding: "0 0",
                                        gap: "2rem"
                                    }}
                                >
                                    <h2
                                        style={{
                                            margin: "0"
                                        }}
                                    >
                                        {Component.title}
                                    </h2>

                                    <Link to={`/tools/${Component.id}`}>
                                        {Component.cta}
                                    </Link>
                                </header>
                                {Component.description}
                            </section>
                        </>
                    );
                }
                if (locator.pathname.startsWith(`/tools/${Component.id}`)) {
                    return <Component />;
                }
            })}
        </>
    );
};
