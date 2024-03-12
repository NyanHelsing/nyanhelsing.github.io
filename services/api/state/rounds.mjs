export const rounds = new Map();

export const createRound = ({ players, finishAssertions, estimates }) => {
    const round = {
        id: rounds.size,
        ticket: "",
        players,
        finishAssertions,
        estimates
    };
    rounds.set(round.id, round);
    return round;
};
