import React from "react";

export const Poker = () => {
    const myId = "Bob";
    const ticket = {
        summary: "Refactor the data layer",
        description: "It's a mess, and we need to get it cleaned up."
    };
    const players = [
        { name: "Alice", hand: "A♠ 7♠" },
        { name: "Bob", hand: "K♦ 9♦" },
        { name: "Charlie", hand: "Q♣ 10♣" },
        { name: "David", hand: "J♥ 8♥" }
    ];
    const options = [
        "0",
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "🔟",
        "🕳",
        "☕",
        "🍺",
        "🍷",
        "🍸",
        "🍹",
        "🥃",
        "🥤",
        "🧊",
        "🧋",
        "🧐",
        "🧘"
    ];

    return (
        <div>
            <h1>Poker</h1>
            <p>Let's play some poker!</p>
            <p>Here's a ticket:</p>
            <pre>{JSON.stringify(ticket, null, 2)}</pre>
            <p>How much effort are you willing to bet it's going to take?</p>

            <h2>Players</h2>
            <ul>
                {players.map((player) => (
                    <li key={player.name}>
                        {player.name}: {player.hand}
                        {player.name === myId && (
                            <>
                                <select>
                                    {options.map((option) => (
                                        <option key={option} value={option}>
                                            {option}
                                        </option>
                                    ))}
                                </select>
                                <button>Commit</button>
                            </>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

Poker.id = "pointless-poker";
Poker.title = "Pointless Poker";
Poker.cta = "Start Pointing";
Poker.description =
    "A simple storypoint poker tool to help estimate the level of effort a task requires.";
