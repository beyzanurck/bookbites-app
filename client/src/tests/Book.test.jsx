import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Book from "../pages/Book";

// Mock the Auth0 hook
vi.mock('@auth0/auth0-react', () => ({
  useAuth0: () => ({
    isAuthenticated: true,
    user: { sub: 'user_sub' },
  }),
}));

// Mock useParams and useLocation hooks
vi.mock('react-router-dom', () => ({
  ...vi.importActual('react-router-dom'), // import and spread the actual router functions
  useParams: () => ({
    id: '1',
  }),
  useLocation: () => ({
    state: { faved: false, shelf_status: 'to-read' },
  }),
}));

// Mock the global fetch function
global.fetch = vi.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ status: 'success' }),
  })
);

describe('Book', () => {
  beforeEach(() => {
    // Reset the mocked fetch before each test
    global.fetch.mockClear();
  });

  it('updates the book status when a new status is selected from the dropdown menu', async () => {
    // Render the Book component
    render(<Book />);

    // Find the dropdown menu
    const dropdown = screen.getByRole('combobox');

    // Simulate selecting an option from the dropdown
    fireEvent.change(dropdown, { target: { value: 'currently-reading' } });

    // Assert that the component's state is updated
    expect(dropdown.value).toBe('currently-reading');

    // Optionally, assert that the fetch was called with correct arguments
    await vi.waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith('/api/feed', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          auth0_sub: 'user_sub',
          api_id: '1',
          isFav: false,
          shelf_status: 2 // assuming that 'currently-reading' is mapped to 2
        }),
      });
    });
  });

});