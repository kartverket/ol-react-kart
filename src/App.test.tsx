import React from 'react';

import { render, screen } from '@testing-library/react';

import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const heading1 = screen.getByText(/Norgeskart/i);
  expect(heading1).toBeInTheDocument();
});
