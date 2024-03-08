import React, { useContext } from "react";
import { Link } from "./link.jsx";

import "./top-nav.css";

export const TopNav = () => (
    <nav className="top">
        <ol>
            <li>
                <Link to="/index.html">Home</Link>
            </li>
            <li>
                <Link to="/blog.html">Blog</Link>
            </li>
            <li>
                <Link to="/workflow.html">Workflow</Link>
            </li>
            <li>
                <Link to="/tools.html">Tools</Link>
            </li>
        </ol>
    </nav>
);
