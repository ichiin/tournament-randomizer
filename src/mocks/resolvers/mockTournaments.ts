import JSON from './tournaments.json'

const mockTournaments = (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(JSON));
};

export default mockTournaments;