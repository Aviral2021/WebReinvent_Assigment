import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // for extended matchers
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { MemoryRouter } from 'react-router-dom';
import SignUp from './SignUp'; // Adjust the import path as needed
import rootReducer from '../redux/rootReducer'; // Adjust the import path to your root reducer
import { register } from '../redux/slices/authSlice'; // Adjust the import path

// Create a mock store for testing
const store = createStore(rootReducer);

jest.mock('../redux/slices/authSlice', () => ({
  register: jest.fn().mockImplementation(() => ({
    fulfilled: { type: 'auth/register/fulfilled', payload: { token: 'mock-token' } },
    rejected: { type: 'auth/register/rejected', payload: 'Registration failed' },
  })),
}));

describe('SignUp Component', () => {
  test('renders form fields and submit button', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <SignUp />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/confirm password/i)).toBeInTheDocument();
    expect(screen.getByText(/sign up/i)).toBeInTheDocument();
  });

  test('shows error if passwords do not match', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <SignUp />
        </MemoryRouter>
      </Provider>
    );

    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password123' } });
    fireEvent.change(screen.getByLabelText(/confirm password/i), { target: { value: 'differentpassword' } });
    fireEvent.click(screen.getByText(/sign up/i));

    expect(screen.getByText(/passwords do not match/i)).toBeInTheDocument();
  });

  test('navigates to sign-in page on successful registration', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/signup']}>
          <SignUp />
        </MemoryRouter>
      </Provider>
    );

    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password123' } });
    fireEvent.change(screen.getByLabelText(/confirm password/i), { target: { value: 'password123' } });
    fireEvent.click(screen.getByText(/sign up/i));

    // Wait for navigation to occur
    await screen.findByText(/sign in/i);
    expect(screen.getByText(/sign in/i)).toBeInTheDocument();
  });
});
