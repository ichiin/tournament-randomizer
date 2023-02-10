import { render, screen } from 'utils/testUtils'

describe('GroupRandomizer', () => {
    test('Render the GroupRandomizer page', async () => {
        render({ route: '/randomize' })
        const title = await screen.findByText('Brandoro')
        expect(title).toBeInTheDocument()
    })
})
