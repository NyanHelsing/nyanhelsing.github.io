import React, { useContext } from "react";
import { Link } from "@nyan-helsing/link";

import "./top-nav.css";

export const TopNav = () => (
    <nav className="top">
        <ol>
            <li>
                <Link to="/index">Home</Link>
            </li>
            <li>
                <Link to="/blog">Blog</Link>
            </li>
            <li>
                <Link to="/workflow">Workflow</Link>
            </li>
            <li>
                <Link to="/tools">Tools</Link>
            </li>
        </ol>
    </nav>
);
