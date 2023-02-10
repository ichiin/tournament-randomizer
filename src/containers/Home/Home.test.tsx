import { render, screen } from 'utils/testUtils'

describe('Home', () => {
    test('Render the Home page', async () => {
        render({ route: '/' })
        const title = await screen.findByText('Welcome to the generator')
        expect(title).toBeInTheDocument()
    })
})
