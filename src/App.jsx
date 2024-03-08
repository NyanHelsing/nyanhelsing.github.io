import React from "react";

import { LocatorProvider } from "./locator.jsx";
import { Header } from "./header.jsx";
import { TopNav } from "./top-nav.jsx";

import { Vision } from "./vision.jsx";
import { Blog } from "./blog/index.jsx";
import { Workflow } from "./workflow.jsx";
import { Tools } from "./tools/index.jsx";

import { Socials } from "./socials.jsx";
import { Footer } from "./footer.jsx";

import "./main.css";

export const App = () => (
    <LocatorProvider>
        <Header />
        <TopNav />
        <main>
            <Vision />
            <Tools />
            <Workflow />
            <Blog />
            <Socials />
        </main>
        <Footer />
    </LocatorProvider>
);
