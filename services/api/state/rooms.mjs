import { createRound } from "./rounds.mjs";

export const rooms = new Map(
    Array.from({ length: 100 }, () => {
        const roomId = Math.random().toString(36).substring(2, 15);
        return [
            roomId,
            {
                id: roomId,
                players: new Set(),
                rounds: [
                    createRound({
                        players: new Set(),
                        finishAssertions: new Set(),
                        estimates: new Map()
                    })
                ]
            }
        ];
    })
);

// This is a WeakMap so that when the socket disconnects,
// the room listing cursor can be garbage collected.
export const roomListingCursors = new WeakMap();

export const ensureRoom = (roomIdToJoin) => {
    if (rooms.has(roomIdToJoin)) {
        return rooms.get(roomIdToJoin);
    }
    const newRoom = {
        id: roomIdToJoin,
        players: new Set(),
        rounds: [
            createRound({
                players: new Set(),
                finishAssertions: new Set(),
                estimates: new Map()
            })
        ]
    };
    rooms.set(roomIdToJoin, {
        players: new Set()
    });
    return newRoom;
};
