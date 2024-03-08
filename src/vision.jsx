import React from "react";
import { useLocator } from "./locator.jsx";

export const Vision = () => {
    const [locator] = useLocator();
    return (
        new Set(["/vision.html", "/vision", "/index.html", "/", ""]).has(
            locator.pathname
        ) && (
            <>
                <p>
                    Enabling individuals to shape their own destiny cultivates
                    empowerment and can be made possibile through software. The
                    provision of tools and platforms for personal expression and
                    interaction can foster a sense of agency and contribute to a
                    collective vision of progress.
                </p>
                <p>
                    By facilitating personal expression and connection, we are
                    empowered to articulate our preferences, desires, and
                    expectations with unparalleled clarity. The fostering of
                    connections between individuals and the digital world
                    enables the co-creation of rich, meaningful experiences that
                    reflect the diverse tapestry of human existence.
                </p>
                <p>
                    Software grants us the remarkable ability to shape their own
                    realities. We can create and share tools and platforms for
                    personal expression and interaction, we can define their
                    unique experiences in the digital realm, and we can create a
                    future reality we all deserve.
                </p>
            </>
        )
    );
};
