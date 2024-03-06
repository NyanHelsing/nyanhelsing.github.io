import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { Footer } from "./footer.jsx";
import { Header } from "./header.jsx";
import { LocatorProvider } from "./locator.jsx";
import { SocialMediaLinks } from "./social-media-links.jsx";
import { TopNav } from "./top-nav.jsx";
import { Vision } from "./vision.jsx";
import { Tools } from "./tools.jsx";

const App = () => (
    <LocatorProvider>
        <Header />
        <TopNav />
        <main>
            <Vision />
            <Tools />
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
