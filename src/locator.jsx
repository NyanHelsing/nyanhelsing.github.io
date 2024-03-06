import React, { createContext, useContext, useEffect, useState } from "react";

const createHistoryPopstateHandler = (setLocation) => (_event) => {
    console.log("popstate");
    setLocation(document.location);
};

export const LocatorContext = createContext();
export const LocatorProvider = (props) => {
    const [locator, setLocator] = useState(new URL(document.location));
    useEffect(() => {
        console.log("attaching a popstate listener");
        const historyPopStateHandler = createHistoryPopstateHandler(setLocator);
        const popStateListenerHandle = window.addEventListener("popstate", historyPopStateHandler);
        return () => window.removeEventListener("popstate", popStateListenerHandle);
    }, []);
    return <LocatorContext.Provider {...props} value={[locator, setLocator]} />;
};
export const useLocator = () => useContext(LocatorContext);
