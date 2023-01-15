import { render, screen } from "@testing-library/react"
import Home from "./Home"


describe('Home', () => {
    test('Render the Home page', () => {
        render(<Home/>)
        const title = screen.getByText('Home.title')
        expect(title).toBeInTheDocument();
    })
})