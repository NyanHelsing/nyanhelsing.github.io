import React, { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";

import { CollaborativeEditor } from "@nyan-helsing/editor";

import { Rooms } from "./rooms.jsx";
import { estimateOptions } from "./estimate-options.mjs";

const prompts = {
    DISCONNECTED: ({ setPrompt }) => (
        <aside
            style={{
                backgroundColor: "rgb(81, 77, 108)",
                fontSize: "1.3rem",
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
                borderRadius: "0.5rem",
                fontWeight: "bold",
                color: "white",
                padding: "1rem",
                marginBottom: "1rem",
                boxShadow: "0 5px 7px -7px #000"
            }}
        >
            The server disconnected... trying to reconnect...
            <button
                onClick={(e) => {
                    e.preventDefault();
                    setPrompt("UNAUTHENTICATED");
                }}
            >
                Cancel and try to log in again
            </button>
        </aside>
    ),
    UNAUTHENTICATED: ({ socket, setName, setPasswordHash, failedAttempt }) => (
        <form
            style={{
                backgroundColor: "rgb(81, 77, 108)",
                fontSize: "1.3rem",
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
                borderRadius: "0.5rem",
                fontWeight: "bold",
                color: "white",
                padding: "1rem",
                marginBottom: "1rem",
                boxShadow: "0 5px 7px -7px #000"
            }}
        >
            {failedAttempt && (
                <aside
                    style={{
                        background: "rgb(161, 135, 86)",
                        fontWeight: "normal",
                        padding: "0.5rem",
                        borderRadius: "0.5rem",
                        fontSize: "1.1rem"
                    }}
                >
                    This usernames exists, and the supplied password is
                    incorrect. Check the password and try again, or choose a
                    different username.
                </aside>
            )}
            <aside
                style={{
                    background: "rgb(113, 105, 142)",
                    fontWeight: "normal",
                    padding: "0.5rem",
                    borderRadius: "0.5rem",
                    fontSize: "1.1rem"
                }}
            >
                Authenticate to join a room. If the username is not taken, an
                account will be created automatically.
            </aside>
            <fieldset
                style={{
                    margin: "0",
                    padding: "0",
                    border: "none",
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.3rem"
                }}
            >
                <label htmlFor="name">Name</label>
                <input
                    style={{
                        padding: "0.5rem",
                        fontSize: "1.5rem",
                        border: "none",
                        borderRadius: "0.5rem"
                    }}
                    type="text"
                    id="name"
                />
            </fieldset>
            <fieldset
                style={{
                    margin: "0",
                    border: "none",
                    padding: "0",
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.3rem"
                }}
            >
                <label htmlFor="password">Password</label>
                <input
                    style={{
                        padding: "0.5rem",
                        fontSize: "1.5rem",
                        border: "none",
                        borderRadius: "0.5rem"
                    }}
                    type="password"
                    id="password"
                />
            </fieldset>
            <button
                type="submit"
                style={{
                    width: "initial",
                    background: "rgb(66, 131, 43)",
                    borderRadius: "0.5rem",
                    color: "#fff",
                    padding: "0.5rem 1rem",
                    fontSize: "1.3rem",
                    fontWeight: "bold",
                    border: "none",
                    alignSelf: "flex-end"
                }}
                onClick={(ev) => {
                    ev.preventDefault();
                    const name = document.getElementById("name").value;
                    const password = document.getElementById("password").value;
                    setName(name);
                    setPasswordHash(btoa(password)); // TODO: use a real hash
                    console.log(password);
                    const passwordHash = btoa(password); // TODO: use a real hash
                    socket.emit(
                        "authenticate",
                        JSON.stringify({ name, passwordHash })
                    );
                }}
            >
                Authenticate
            </button>
        </form>
    )
};

export const PointLol = () => {
    const offset = useRef(0);
    const [authenticated, setAuthenticated] = useState(false);
    const [name, setName] = useState(null);
    const [passwordHash, setPasswordHash] = useState(null);
    const me = { name, passwordHash };
    const [prompt, setPrompt] = useState("");
    const [socket, setSocket] = useState(null);
    const [room, setRoom] = useState(null);
    const [roomIndex, setRoomIndex] = useState([]);
    const rooms = useRef(new Map());
    const [canLoadMore, setCanLoadMore] = useState(true);
    const rounds = [];
    const [estimate, setEstimate] = useState(0);
    const [currentRound, setCurrentRound] = useState({
        ticket: JSON.stringify(
            {
                summary: "Refactor the data layer",
                description: "It's a mess, and we need to get it cleaned up."
            },
            null,
            2
        ),
        players: new Set(["Alice", "Bob", "Charlie", "David"]),
        estimates: new Map()
    });
    const ticketRef = useRef(null);

    useEffect(() => {
        console.log("recalculating estimate");
        console.log(currentRound);

        // Check if any estimates are space invaders
        for (const value of currentRound.players.values()) {
            if (currentRound.estimates.has(value)) {
                if (currentRound.estimates.get(value) === "👾") {
                    console.log("space invader found");
                    console.log("space invader found");
                    console.log("space invader found");
                    console.log("space invader found");
                    console.log("space invader found");
                    setEstimate("👾");
                    return;
                }
            }
        }

        // Check if all estimates are in
        for (const value of currentRound.players.values()) {
            if (!currentRound.estimates.has(value)) {
                console.log("no estimate for", value);
                return;
            }
        }

        const numericEstimates = [...currentRound.estimates.values()].filter(
            ({ estimate }) => estimate === String(Number(estimate))
        );
        console.log(numericEstimates);

        // Calculate the average
        const estimate =
            numericEstimates.reduce((acc, { estimate }) => {
                console.log(acc, estimate);
                return acc + Number(estimate);
            }, 0) / numericEstimates.length;

        setEstimate(estimate);
    }, [rounds, currentRound]);

    useEffect(() => {
        const socket = io("http://localhost:3000", {
            path: "/point-lol/"
        });
        socket.on("connect", () => {
            if (!(name && passwordHash)) {
                setPrompt("UNAUTHENTICATED");
                return;
            }
            socket.emit("authenticate", JSON.stringify({ name, passwordHash }));
        });

        socket.on("room-joined", (message) => {
            console.log("room-joined", message);
            const { id, name, players } = JSON.parse(message);
            setRoom({ id, name, players });
        });

        socket.on("round-started", (message) => {
            console.log("round-started", message);
            const { ticket, players, estimates } = JSON.parse(message);
            setCurrentRound({
                ticket,
                players: new Set(players),
                estimates: new Map(estimates)
            });
        });

        socket.on("disconnect", () => {
            setPrompt("DISCONNECTED");
            setAuthenticated(false);
            setRoomIndex([]);
            rooms.current = new Map();
            setCurrentRound(null);
        });

        socket.on("authentication-failure", () => {
            setPrompt("UNAUTHENTICATED");
            setAuthenticated(false);
        });

        socket.on("authentication-success", (message) => {
            console.log(JSON.parse(message));
            setPrompt("");
            setAuthenticated(true);
        });

        socket.on("room-list", (message) => {
            const newRooms = JSON.parse(message);
            if (newRooms.length === 0) {
                setCanLoadMore(false);
                return;
            }
            const newRoomIds = newRooms.map(([id]) => id);
            newRooms.forEach(([id, room]) => {
                rooms.current.set(id, room);
            });
            setRoomIndex((currentIndex) => {
                return [...new Set([...currentIndex, ...newRoomIds])]; // dedupe
            });
        });

        socket.on("ticket-updated", (message) => {
            console.log("ticket-updated", message);
            setCurrentRound((current) => {
                return {
                    ...current,
                    ticket: message
                };
            });
        });

        setSocket(socket);
        return () => {
            socket.disconnect();
            setSocket(null);
        };
    }, []);

    const currentRoundEstimatesView = currentRound && (
        <ul
            className="estimates"
            style={{
                listStyle: "none",
                padding: "0",
                margin: "0",
                display: "flex",
                gap: "0.5rem",
                flexDirection: "row",
                marginBottom: "1rem"
            }}
        >
            {[...currentRound.estimates.values()]
                .filter(([name]) => name !== me.name)
                .map(([name, estimate]) => (
                    <li
                        key={name}
                        style={{
                            flex: "1 0 auto",
                            padding: "0.5rem",
                            margin: "0",
                            border: "none",
                            borderRadius: "0.5rem",
                            background: "rgba(250,250,250,0.6)"
                        }}
                    >
                        {name}: {estimate}
                    </li>
                ))}
        </ul>
    );

    return (
        <>
            <h1>Point Lol</h1>
            {prompt &&
                prompts[prompt]({
                    socket,
                    setName,
                    setPasswordHash,
                    failedAttempt:
                        name && passwordHash && authenticated !== null
                })}
            {authenticated &&
                (!room ? (
                    <Rooms
                        socket={socket}
                        rooms={rooms}
                        roomIndex={roomIndex}
                        canLoadMore={canLoadMore}
                    />
                ) : (
                    <>
                        <p>Let's point som tickets lol!</p>
                        <p>Here's a ticket:</p>

                        <CollaborativeEditor roomId={room.id} />

                        <p>How much effort do we think this will be?</p>

                        <h2>Current Estimate: {estimate}</h2>

                        <h2>Players</h2>
                        {currentRoundEstimatesView}
                        <h2>Me</h2>
                        <form
                            style={{
                                display: "flex",
                                gap: "0.5rem",
                                flexDirection: "row",
                                padding: "0.5rem",
                                background: "rgba(250,250,250,0.6)",
                                flexWrap: "wrap",
                                borderRadius: "0.5rem",
                                border: "none"
                            }}
                            onSubmit={(event) => {
                                event.preventDefault();
                                console.log(event);
                                const estimate =
                                    event.target.elements.estimate.value;
                                console.log(estimate);
                                setCurrentRound((prev) => {
                                    prev.estimates.set(me.name, estimate);
                                    return {
                                        ...prev
                                    };
                                });
                            }}
                        >
                            <fieldset
                                style={{
                                    display: "flex",
                                    flex: "9999 1 300px",
                                    gap: "0.5rem",
                                    flexDirection: "column",
                                    padding: "0.5rem",
                                    background: "rgba(250,250,250,0.6)",
                                    borderRadius: "0.5rem",
                                    margin: "0",
                                    border: "none"
                                }}
                            >
                                <label htmlFor="name">Your Name</label>
                                <input
                                    style={{
                                        padding: "0.5rem",
                                        margin: "0",
                                        borderRadius: "0.5rem",
                                        border: "none",
                                        background: "rgba(250,250,250,0.6)",
                                        fontSize: "1.4rem"
                                    }}
                                    type="text"
                                    id="name"
                                    value={me.name}
                                />
                            </fieldset>
                            <fieldset
                                style={{
                                    display: "flex",
                                    flex: "1 0 200px",
                                    gap: "0.5rem",
                                    flexDirection: "column",
                                    padding: "0.5rem",
                                    background: "rgba(250,250,250,0.6)",
                                    borderRadius: "0.5rem",
                                    margin: "0",
                                    border: "none"
                                }}
                            >
                                <label htmlFor="estimate">Your Estimate</label>
                                <select
                                    id="estimate"
                                    style={{
                                        padding: "0.5rem",
                                        margin: "0",
                                        alignSelf: "flex-end",
                                        borderRadius: "0.5rem",
                                        border: "none",
                                        background: "rgba(250,250,250,0.6)",
                                        fontSize: "2.4rem"
                                    }}
                                >
                                    {[...estimateOptions.entries()].map(
                                        ([key, value]) => (
                                            <option key={key} value={value}>
                                                {key}
                                            </option>
                                        )
                                    )}
                                </select>

                                <button
                                    style={{
                                        alignSelf: "flex-end",
                                        width: "initial"
                                    }}
                                    type="submit"
                                >
                                    Submit Estimate
                                </button>
                            </fieldset>
                        </form>
                    </>
                ))}
        </>
    );
};

PointLol.id = "pointless-poker";
PointLol.title = "Pointless Poker";
PointLol.cta = "Start Pointing";
PointLol.description =
    "A simple storypoint poker tool to help estimate the level of effort a task requires.";
