import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Root from "../pages/Root";
import { BrowserRouter } from 'react-router-dom'; // needed this to wrap the component in a router if it uses routing functionalities

// mock the NavBar if it includes functionality that is not relevant for the Root component's test or if it makes external calls
vi.mock('../components/NavBar', () => ({
  __esModule: true,
  default: () => <div>Mocked NavBar</div>,
}));

describe('Root', () => {
  it('renders the NavBar component', () => {
    render(
      <BrowserRouter>
        <Root />
      </BrowserRouter>
    );
    expect(screen.getByText('Mocked NavBar')).toBeInTheDocument();
  });

  it('renders the Outlet for child routes', () => {
    render(
      <BrowserRouter>
        <Root />
      </BrowserRouter>
    );
    // Since Outlet is just a placeholder and doesn't render anything by itself without a route, this test checks for its container
    const container = screen.getByTestId('container');
    expect(container).toBeInTheDocument();
  });

});
