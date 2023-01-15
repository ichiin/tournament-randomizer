import { render, screen } from 'utils/testUtils';

describe('GroupRandomizer', () => {
  test('Render the GroupRandomizer page', () => {
    render({ route: '/groups' });
    const title = screen.getByText('Generate your groups');
    expect(title).toBeInTheDocument();
  });
});
