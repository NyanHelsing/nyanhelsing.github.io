import React, { useCallback, useEffect, useMemo, useState } from "react";
import { createEditor, Editor, Transforms, Text } from "slate";
import { Editable, Slate, withReact } from "slate-react";
import { withYjs, YjsEditor } from "@slate-yjs/core";
import * as Y from "yjs";
import { WebsocketProvider } from "y-websocket";
import Prism from "prismjs";
import "prismjs/components/prism-markdown";

const initialValue = [
    {
        type: "paragraph",
        children: [
            { text: "# New Ticket" },
            {
                text: "Enter some information about the problem that is being experienced."
            }
        ]
    }
];

export const CollaborativeEditor = ({ roomId }) => {
    const [connected, setConnected] = useState(false);
    const [sharedType, setSharedType] = useState();
    const [provider, setProvider] = useState();

    console.log("evaluate CollaborativeEditor");
    console.log({ roomId });

    // Connect to your Yjs provider and document
    useEffect(() => {
        const yDoc = new Y.Doc();
        const sharedDoc = yDoc.get("slate", Y.XmlText);

        // Set up your Yjs provider. This line of code is different for each provider.
        const yProvider = new WebsocketProvider(
            "ws://y.nyanhelsing.io",
            roomId,
            yDoc
        );

        yProvider.on("status", (event) => {
            console.log(event.status); // logs "connected" or "disconnected"
        });

        yProvider.on("sync", setConnected);
        setSharedType(sharedDoc);
        setProvider(yProvider);

        return () => {
            yDoc?.destroy();
            yProvider?.off("sync", setConnected);
            yProvider?.destroy();
        };
    }, [roomId]);

    if (!connected || !sharedType || !provider) {
        return <div>Loading…</div>;
    }

    return <SlateEditor sharedType={sharedType} provider={provider} />;
};

const SlateEditor = ({ sharedType, provider }) => {
    const editor = useMemo(() => {
        const e = withReact(withYjs(createEditor(), sharedType));

        // Ensure editor always has at least 1 valid child
        const { normalizeNode } = e;
        e.normalizeNode = (entry) => {
            const [node] = entry;

            if (!Editor.isEditor(node) || node.children.length > 0) {
                return normalizeNode(entry);
            }

            Transforms.insertNodes(editor, initialValue, { at: [0] });
        };

        return e;
    }, []);
    const renderLeaf = useCallback((props) => <Leaf {...props} />, []);
    const decorate = useCallback(([node, path]) => {
        const ranges = [];

        if (!Text.isText(node)) {
            return ranges;
        }

        const getLength = (token) => {
            if (typeof token === "string") {
                return token.length;
            } else if (typeof token.content === "string") {
                return token.content.length;
            } else {
                return token.content.reduce((l, t) => l + getLength(t), 0);
            }
        };

        const tokens = Prism.tokenize(node.text, Prism.languages.markdown);
        let start = 0;

        for (const token of tokens) {
            const length = getLength(token);
            const end = start + length;

            if (typeof token !== "string") {
                ranges.push({
                    [token.type]: true,
                    anchor: { path, offset: start },
                    focus: { path, offset: end }
                });
            }

            start = end;
        }

        return ranges;
    }, []);

    useEffect(() => {
        YjsEditor.connect(editor);
        return () => YjsEditor.disconnect(editor);
    }, [editor]);

    return (
        <Slate editor={editor} initialValue={initialValue}>
            <Editable
                style={{
                    fontFamily: "Source Code Pro",
                    backgroundColor: "#f4f4f4",
                    boxShadow: "inset 0 2px 10px -4px #000",
                    padding: "1rem",
                    border: "none",
                    borderRadius: "0.5rem"
                }}
                renderLeaf={renderLeaf}
                decorate={decorate}
            />
        </Slate>
    );
};

const Leaf = ({ attributes, children, leaf }) => {
    console.log("doing leaf", attributes, leaf);
    return (
        <span
            {...attributes}
            style={{
                fontWeight: leaf.bold && "bold",
                fontStyle: leaf.italic && "italic",
                textDecoration: leaf.underlined && "underline",
                ...(leaf.title && {
                    display: "inline-block",
                    fontWeight: "bold",
                    fontSize: `${
                        ["2.4", "2.0", "1.6", "1.4", "1.3", "1.1"][
                            leaf.text.split(" ")[0].length - 1
                        ]
                    }rem`,
                    margin: "20px 0 10px 0"
                }),
                ...(leaf.list && {
                    paddingLeft: "10px",
                    fontSize: "20px",
                    lineHeight: "10px"
                }),
                ...(leaf.hr && {
                    display: "block",
                    textAlign: "center",
                    borderBottom: "2px solid #ddd"
                }),
                ...(leaf.blockquote && {
                    display: "inline-block",
                    borderLeft: "2px solid #ddd",
                    paddingLeft: "10px",
                    color: "#aaa",
                    fontStyle: "italic"
                }),
                ...(leaf["code-snippet"] && {
                    fontFamily: "monospace",
                    backgroundColor: "#eee",
                    padding: "3px"
                })
            }}
        >
            {children}
        </span>
    );
};
