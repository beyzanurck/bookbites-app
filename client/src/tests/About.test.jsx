import { render, screen } from '@testing-library/react';
import About from "../pages/About";


describe('About', () => {
  it('renders a p element', () => {
    render(<About />);
    const text = screen.getByText(/About/i);
    expect(text).toBeInTheDocument();
  });
});