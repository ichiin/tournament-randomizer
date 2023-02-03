import '@testing-library/jest-dom'
import 'jest-canvas-mock'

import { server } from 'mocks/server.js'

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())