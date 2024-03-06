import React from "react";
import { urlsAreEqual } from "./urls.js";
import { useLocator } from "./locator.jsx";

// Link component with all the accessibility features
export const Link = ({ to, children, ...props }) => {
    const toUrl = new URL(to, window.location.href);
    const [locator, setLocator] = useLocator();
    console.log(toUrl, locator);
    if (urlsAreEqual(toUrl, locator)) {
        return (
            <a
                onClick={(event) => {
                    event.preventDefault();
                    window.history.pushState({}, "", to);
                    setLocator(new URL(to, window.location.href));
                }}
                onKeyDown={(event) => {
                    if (event.key !== "Enter") return;
                    event.preventDefault();
                    window.history.pushState({}, "", to);
                    setLocator(new URL(to, window.location.href));
                }}
                aria-current={"page"}
                {...props}
            >
                {children}
            </a>
        );
    }

    return (
        <a
            onClick={(event) => {
                event.preventDefault();
                window.history.pushState({}, "", to);
                setLocator(new URL(to, window.location.href));
            }}
            onKeyPress={(event) => {
                if (event.key !== "Enter") return;
                event.preventDefault();
                window.history.pushState({}, "", to);
                setLocator(new URL(to, window.location.href));
            }}
            {...props}
        >
            {children}
        </a>
    );
};
