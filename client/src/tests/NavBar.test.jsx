import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import NavBar from "../components/NavBar";
import { MemoryRouter } from 'react-router-dom'; // To mock the router context


// Mock useAuth0 hook
const mockLoginWithRedirect = vi.fn();
const mockLogout = vi.fn();
const user = {
  email: 'test@example.com',
  given_name: 'Test',
  family_name: 'User',
  sub: 'auth0|1234567890'
};


describe('NavBar', () => {

  it('displays user email and logout button when authenticated', async () => {
    // Mock the entire module '@auth0/auth0-react'
    vi.mock('@auth0/auth0-react', () => ({
      useAuth0: () => ({
        isAuthenticated: true,
        user: user,
        loginWithRedirect: mockLoginWithRedirect,
        logout: mockLogout
      }),
    }));

    render(
      <MemoryRouter>
        <NavBar />
      </MemoryRouter>
    );

    expect(screen.getByText(user.email)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /log out/i })).toBeInTheDocument();
  });

});
