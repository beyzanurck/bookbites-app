import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Profile from "../pages/Profile";

// Mock the useAuth0 hook
vi.mock('@auth0/auth0-react', () => ({
  useAuth0: vi.fn(() => ({ user: { name: 'Beyza Ck' } })),
}));

describe('Profile', () => {
  it('renders the user name', () => {
    render(<Profile />);
    expect(screen.getByText("Beyza Ck's Page")).toBeInTheDocument();
  });
});
