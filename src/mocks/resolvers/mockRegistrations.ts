import JSON from './registrations.json';

const mockRegistrations = (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(JSON));
};

export default mockRegistrations;