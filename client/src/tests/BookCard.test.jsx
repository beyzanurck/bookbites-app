import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import BookCard from "../components/BookCard";
import { MemoryRouter } from 'react-router-dom'; // If your component uses Link from 'react-router-dom'

// Mock the Auth0 hook 
vi.mock('@auth0/auth0-react', () => ({
  useAuth0: () => ({
    isAuthenticated: true,
    user: { sub: 'user_sub' },
  }),
}));

// Mock the global fetch function
global.fetch = vi.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ status: 'success' }),
  })
);

describe('BookCard', () => {
  beforeEach(() => {
    // Reset the mocked fetch before each test
    global.fetch.mockClear();
  });

  it('sends favorite status to the server when the favorite icon is clicked', async () => {
    // Render the BookCard component with required props
    render(
      <MemoryRouter>
        <BookCard
          title="Sample Book"
          author="Author Name"
          img="path/to/image"
          category="Fiction"
          id="1"
          faved={false}
          status="none"
        />
      </MemoryRouter>
    );

    // Simulate clicking on the favorite icon
    const favoriteIcon = screen.getByRole('button');
    fireEvent.click(favoriteIcon);

    // Assert that the fetch was called with correct arguments
    expect(global.fetch).toHaveBeenCalledWith('/api/feed', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        auth0_sub: 'user_sub',
        api_id: '1',
        isFav: true
      }),
    });

    // Since fetch is asynchronous, wait for it to complete
    await vi.waitFor(() => {
      expect(global.fetch).toHaveBeenCalledTimes(1);
    });
  });

});
