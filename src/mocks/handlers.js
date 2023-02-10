import { mockRegistrations, mockTournaments } from './resolvers'

import { BACK_ENDPOINT } from 'utils/config'
import { rest } from 'msw'

export const handlers = [
    // Handles a GET /registrations request
    rest.get(`${BACK_ENDPOINT}/registrations`, mockRegistrations),
    // Handles a GET /tournaments request
    rest.get(`${BACK_ENDPOINT}/tournaments`, mockTournaments),
]
