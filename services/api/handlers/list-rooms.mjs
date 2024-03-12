import { rooms, roomListingCursors } from "../state/rooms.mjs";
import { cursor } from "../utils/cursor.mjs";

export const uselistRooms = (socket) => {
    socket.on("list-rooms", () => {
        console.log("list-rooms");
        if (!roomListingCursors.has(socket)) {
            console.log("Creating a new cursor for this socket.");
            roomListingCursors.set(
                socket,
                cursor(function* () {
                    for (const [roomId, room] of rooms.entries()) {
                        yield [
                            roomId,
                            {
                                ...room,
                                id: roomId,
                                players: Array.from(room.players)
                            }
                        ];
                    }
                })
            );
        } else {
            console.log("Using existing cursor for this socket.");
        }

        const roomList = roomListingCursors.get(socket).take(10);

        socket.emit("room-list", JSON.stringify(roomList));
    });
};
