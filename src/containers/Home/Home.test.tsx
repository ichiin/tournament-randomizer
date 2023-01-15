import { render, screen } from 'utils/testUtils';

describe('Home', () => {
  test('Render the Home page', () => {
    render({ route: '/' });
    const title = screen.getByText('Welcome to the generator');
    expect(title).toBeInTheDocument();
  });
});
