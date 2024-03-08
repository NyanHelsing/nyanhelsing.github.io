import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { Footer } from "./footer.jsx";
import { Header } from "./header.jsx";
import { LocatorProvider } from "./locator.jsx";
import { SocialMediaLinks } from "./social-media-links.jsx";
import { TopNav } from "./top-nav.jsx";
import { Vision } from "./vision.jsx";
import { Tools } from "./tools/index.jsx";
import { Workflow } from "./workflow.jsx";

import { Blog } from "./blog/index.jsx";

const App = () => (
    <LocatorProvider>
        <Header />
        <TopNav />
        <main
            style={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
                paddingTop: "1rem"
            }}
        >
            <Vision />
            <Tools />
            <Workflow />
            <Blog />
            <SocialMediaLinks />
        </main>
        <Footer />
    </LocatorProvider>
);

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <App />
    </StrictMode>
);
