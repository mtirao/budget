import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';
import App from './App';

// Replaces __tests__/App.test.tsx, which smoke-rendered the native navigation
// tree. Unauthenticated is the default state, so the router should land on the
// login route.
test('renders the login page when no session exists', async () => {
  render(<App />);

  expect(
    await screen.findByRole('heading', { name: 'Welcome back' }),
  ).toBeInTheDocument();
});
