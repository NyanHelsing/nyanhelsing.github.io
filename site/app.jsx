import React from "react";

import { LocatorProvider } from "@nyan-helsing/locator";
import { Header } from "@nyan-helsing/header";
import { TopNav } from "@nyan-helsing/top-nav";
import { Blog } from "@nyan-helsing/blog";

import { Vision } from "./vision.jsx";
import { Workflow } from "./workflow.jsx";
import { Tools } from "@nyan-helsing/tools";

import { Socials } from "@nyan-helsing/socials";
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
