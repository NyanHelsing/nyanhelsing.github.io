import React from "react";

import { Blog } from "@nyan-helsing/blog";
import { Header } from "@nyan-helsing/header";
import { LocatorProvider } from "@nyan-helsing/locator";
import { TopNav } from "@nyan-helsing/top-nav";

import { Tools } from "@nyan-helsing/tools";
import { Vision } from "@nyan-helsing/vision";
import { Workflow } from "@nyan-helsing/workflow";

import { Footer } from "@nyan-helsing/footer";
import { Socials } from "@nyan-helsing/socials";

import "./theme/main.css";

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
