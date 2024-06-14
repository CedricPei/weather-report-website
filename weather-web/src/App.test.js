import { render, screen } from '@testing-library/react';
import App from './App';

// try to learn some ui test automation
test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
