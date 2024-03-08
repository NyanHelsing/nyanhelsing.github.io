import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useLocator } from "./locator";

import "./socials.css";

const MOUNT_PATHS = new Set(["/index.html", "/index.htm", "/index", "/"]);
export const Socials = () => {
    const [locator] = useLocator();
    if (MOUNT_PATHS.has(locator.pathname)) {
        return (
            <>
                <h1>Socials</h1>
                <nav className="social">
                    <ol>
                        <li>
                            <a href="https://github.com/nyanhelsing">
                                <FontAwesomeIcon icon={["fab", "github"]} />
                                <span>Nyan Helsing's GitHub Profile</span>
                            </a>
                        </li>
                        <li>
                            <a href="https://discord.gg/M9Kp94ktKb">
                                <FontAwesomeIcon icon={["fab", "discord"]} />
                                <span>
                                    The Hunters - Nyan Helsing's Discord Server.
                                </span>
                            </a>
                        </li>
                    </ol>
                </nav>
            </>
        );
    }
};
