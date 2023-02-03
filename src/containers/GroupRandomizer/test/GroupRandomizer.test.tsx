import { render, screen } from 'utils/testUtils';

describe('GroupRandomizer', () => {
  test('Render the GroupRandomizer page', async () => {
    render({ route: '/randomize' });
    const title = screen.getByText('Generate your groups');
    expect(title).toBeInTheDocument();
  });
});
