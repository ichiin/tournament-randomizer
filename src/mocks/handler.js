import { BACK_ENDPOINT } from 'utils/config'
// src/mocks/handlers.js
import { rest } from 'msw'

export const handlers = [
    // Handles a GET /registrations request
    rest.get(`${BACK_ENDPOINT}/registrations`, (req, res, ctx) => { res(ctx.status(200)) }),
];