import { render, screen } from "@testing-library/react"
import GroupRandomizer from "./GroupRandomizer"


describe('GroupRandomizer', () => {
    test('Render the GroupRandomizer page', () => {
        render(<GroupRandomizer/>)
        const title = screen.getByText('GroupRandomizer.title')
        expect(title).toBeInTheDocument();
    })
})