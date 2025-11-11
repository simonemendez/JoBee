import { render, screen } from '@testing-library/react';
import App from './App';

test('renders JoBee link', () => {
  render(<App />);
  const linkElement = screen.getByText(/JoBee/i);
  expect(linkElement).toBeInTheDocument();
});
