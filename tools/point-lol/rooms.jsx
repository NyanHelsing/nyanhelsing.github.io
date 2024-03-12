import React, { useEffect } from "react";

const PAGE_SIZE = 10;

export const Rooms = ({ socket, rooms, roomIndex, canLoadMore = true }) => {
    const [page, setPage] = React.useState(1);
    const currentPageRooms = roomIndex.slice(
        (page - 1) * PAGE_SIZE,
        page * PAGE_SIZE
    );
    useEffect(() => {
        if (canLoadMore && currentPageRooms.length === 0) {
            socket.emit("list-rooms");
        } else if (canLoadMore && roomIndex.length - 1 < page * PAGE_SIZE) {
            socket.emit("list-rooms");
        }
    }, [currentPageRooms, canLoadMore, socket, page]);

    return (
        <>
            <ol
                style={{
                    listStyleType: "none"
                }}
            >
                {currentPageRooms
                    .map((roomId) => rooms.current.get(roomId))
                    .map((room) => (
                        <li key={room.roomId}>
                            <h3>{room.id}</h3>
                            {room.players.length} players in room {room.roomId}
                            <button
                                onClick={() => {
                                    socket.emit("join", room.id);
                                }}
                            >
                                Join
                            </button>
                        </li>
                    ))}
            </ol>
            <button
                onClick={() => {
                    socket.emit("list-rooms");
                }}
            >
                Load {roomIndex.length ? "More " : ""}Rooms
            </button>
            <br />
            {page > 1 && (
                <button
                    onClick={() => {
                        setPage(page - 1);
                    }}
                >
                    Previous
                </button>
            )}
            {roomIndex.length > page * PAGE_SIZE && (
                <button
                    onClick={() => {
                        setPage(page + 1);
                    }}
                >
                    Next
                </button>
            )}
        </>
    );
};
