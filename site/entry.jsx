import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";

// This should come before app in order to set up
// the icon library before any icons are used.
import "./icons.jsx";

import { App } from "./app.jsx";
import "./style.css";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <App />
    </StrictMode>
);
