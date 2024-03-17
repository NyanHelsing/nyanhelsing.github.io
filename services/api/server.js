// sets up a web socket server to push updates to the client

//import { createSecureServer } from "node:http2";
import { createServer } from "http";
import { Server } from "socket.io";
//import { LevelMap } from "../../level-map/level-map.mjs";

import { users } from "./state/users.mjs";
import { rooms, ensureRoom } from "./state/rooms.mjs";
import { uselistRooms } from "./handlers/list-rooms.mjs";

//const secureServer = createSecureServer({
//    key: process.env.SSL_KEY,
//    cert: process.env.SSL_CERT
//});

//const io = new Server(secureServer);

const httpServer = createServer();
const io = new Server(httpServer, {
    path: "/point-lol/",
    cors: {
        origin: "https://nyanhelsing.io"
    }
});

const userForConnection = new Map();

console.log("server started!");

io.on("connection", async (socket) => {
    console.log("a user connected");
    await userForConnection.set(socket, null);

    socket.on("disconnect", async () => {
        console.log("user disconnected");
        const user = await userForConnection.get(socket);
        if (user !== null || typeof user !== "undefined") {
            user?.sessions.delete(socket);
        }
        await userForConnection.delete(socket);
    });

    socket.on("authenticate", async (loginPayload) => {
        const { name, passwordHash } = JSON.parse(loginPayload);
        console.log("login: " + name);
        if (!users.has(name)) {
            console.log("Creating user: " + name);
            users.set(name, {
                passwordHash,
                sessions: new Set(),
                currentRoom: null
            });
        }
        const user = users.get(name);
        if (user.passwordHash === passwordHash) {
            await userForConnection.set(socket, user);
            user.sessions.add(socket);
            socket.emit(
                "authentication-success",
                JSON.stringify({
                    name: user.name,
                    currentRoomId: user.currentRoomId
                })
            );
        } else {
            socket.emit("authentication-failure", name);
        }
    });

    socket.on("set-name", async (newName) => {
        console.log("name: " + newName);
        const user = await users.get(socket.id);
        const oldName = user.name;
        user.name = newName;
        const currentRoomId = user.currentRoomId;
        if (currentRoomId !== null && rooms.has(currentRoomId)) {
            const currentRoom = rooms.get(currentRoomId);
            socket.to(currentRoomId).emit(
                "name-changed",
                JSON.stringify({
                    oldName,
                    newName
                })
            );
        }
    });

    uselistRooms(socket);

    socket.on("join", (roomIdToJoin) => {
        console.log("join: " + roomIdToJoin);
        const user = userForConnection.get(socket);
        if (user === null) {
            // non existent user
            socket.emit("join-failed", roomIdToJoin);
            return;
        }
        const room = ensureRoom(roomIdToJoin);
        console.log("room: " + room);
        userForConnection.get(socket).currentRoom = room;
        socket.join(roomIdToJoin);
        room.players.add(user.name);
        const roomId = roomIdToJoin;
        socket.to(roomId).emit(
            "player-joined",
            JSON.stringify({
                name: user.name
            })
        );
        socket.emit(
            "room-joined",
            JSON.stringify({
                ...room,
                players: [...room.players.values()]
            })
        );
        const currentRound = room.rounds.at(-1);
        currentRound.players.add(user.name);
        socket.emit(
            "round-started",
            JSON.stringify({
                ...currentRound,
                players: [...currentRound.players.values()],
                finishAssertions: [...currentRound.finishAssertions.values()],
                estimates: [...currentRound.estimates.entries()]
            })
        );
    });

    socket.on("estimate", (msg) => {
        console.log("message: " + msg);
        const { name, estimate } = JSON.parse(msg);
        socket.emit(
            "estimate",
            JSON.stringify({
                name,
                estimate
            })
        );
    });

    socket.on("set-ticket", (msg) => {
        console.log("message: " + msg);
        const user = userForConnection.get(socket);
        console.log("user: " + user);
        console.log(user.currentRoom);

        const room = user.currentRoom;

        const currentRound = room.rounds.at(-1);
        currentRound.ticket = msg;
        io.to(user.currentRoom.id).emit("ticket-updated", msg);
    });

    socket.on("next-round", (msg) => {
        console.log("round: " + msg);
        const roomId = users.get(socket.id).currentRoom;
        const room = rooms.get(roomId);
        const roomRounds = rounds.get(room);
        const currentRound = roomRounds[roomRounds.length - 1];

        // check if all players have made an assertion to finish the round
        if (
            currentRound.finishAssertions.every(([player, assertion]) =>
                Boolean(assertion)
            )
        ) {
            // if so, emit the next-round to all players
            const newRound = {
                id: roomRounds.length,
                players: new Set(),
                finishAssertions: new Map(),
                estimates: new Map()
            };
            roomRounds.push(newRound);
            io.to(roomId).emit("next-round", JSON.stringify(newRound));
        }
    });
});

httpServer.listen(3000);
//secureServer.listen(3000);
