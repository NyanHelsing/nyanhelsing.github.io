import React from "react";

import { useLocator } from "./locator";

const MOUNT_PATHS = new Set(["/index.html", "/index.htm", "/index", "/"]);
export const SocialMediaLinks = () => {
    const [locator] = useLocator();
    if (MOUNT_PATHS.has(locator.pathname)) {
        return (
            <>
                <h2>Links</h2>
                <nav className="social">
                    <ol>
                        <li>
                            <a href="https://github.com/nyanhelsing">
                                <i className="fa-brands fa-github" />
                                Nyan Helsing's GitHub Profile
                            </a>
                        </li>
                        <li>
                            <a href="https://discord.gg/M9Kp94ktKb">
                                <i className="fa-brands fa-discord" />
                                The Hunters - Nyan Helsing's Discord Server.
                            </a>
                        </li>
                    </ol>
                </nav>
            </>
        );
    }
};
