import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Home from "../pages/Home";


describe('Home', () => {
  it('updates search state when input changes', async () => {
    // Render the Home component
    render(<Home />);

    // Get the input element
    const searchInput = screen.getByPlaceholderText('search a book by title/author');

    // Simulate user typing into the input field
    fireEvent.change(searchInput, { target: { value: 'test search' } });

    // Assert that the input's value is updated
    expect(searchInput.value).toBe('test search');
  });
});

