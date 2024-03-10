import React, { useEffect } from "react";

import { useLocator } from "@nyan-helsing/locator";

const MOUNT_PATHS = new Set(["/workflow.html", "/workflow"]);
export const Workflow = () => {
    const [locator] = useLocator();
    console.log(locator.pathname);
    useEffect(() => {
        if (MOUNT_PATHS.has(locator.pathname)) {
            let retry = 15;
            try {
                window.mermaid.run();
            } catch (error) {
                console.log("Mermaid not ready. Retrying...");
                const mermaidInterval = setInterval(() => {
                    try {
                        window.mermaid.run();
                        clearInterval(mermaidInterval);
                    } catch (error) {
                        if (retry-- <= 0) {
                            clearInterval(mermaidInterval);
                            console.error("Mermaid failed to load");
                        }
                        console.log("Mermaid not ready, retrying again ...");
                    }
                }, 200);
            }
        }
    }, [locator.pathname]);
    return (
        MOUNT_PATHS.has(locator.pathname) && (
            <>
                <h1>Workflow</h1>

                <p>
                    This state diagram represents the workflow for a feature
                    request. The workflow is a series of states that a ticket
                    can be in. The ticket will move from one state to another
                    based on the actions taken by the team. The workflow is a
                    visual representation of the process that a ticket goes
                    through from the time it is created until it is completed.
                </p>

                <pre className="mermaid">{`
                stateDiagram-v2
                    [*] --> Triage: New
                    Triage --> Refined: Fully Detailed and Prioritized
                    Refined --> Implementation: Begin Implementation
                    Implementation --> Triage: Needs Elaboration
                    Implementation --> Test: PR Open & All Bugs Resolved
                    Test --> Implementation: Bug Ticket Created
                    Test --> Deployment: QA Pass
                    Deployment --> Rollout: Code Changes Merged
                    Rollout --> Implementation: Revert Changes
                    Rollout --> Productization: Rolled Out to Guests
                    Productization --> Rollout: Rollback
                    Productization --> [*]: Done
            `}</pre>

                <h2>Submit an Intake</h2>
                <p>
                    An intake is a request for a new feature or a change to an
                    existing feature. It is the first step in the workflow. When
                    an intake is submitted it will create a ticket and the
                    workflow will begin.
                </p>
                <form>
                    <textarea id="workflow" rows="10" cols="50" />
                    <button type="submit">Submit</button>
                </form>
            </>
        )
    );
};
