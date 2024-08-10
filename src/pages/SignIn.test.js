// src/__tests__/SignIn.test.js
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore } from '@reduxjs/toolkit';
import authReducer from '../redux/slices/authSlice';
import SignIn from '../pages/SignIn'; // Adjust the import path as necessary
import '@testing-library/jest-dom/extend-expect';

// Create a mock store
const store = createStore(authReducer);

test('renders Sign In page', () => {
  render(
    <Provider store={store}>
      <SignIn />
    </Provider>
  );

  // Check if the Sign In header is in the document
  expect(screen.getByText(/Sign In/i)).toBeInTheDocument();
  
  // Check if email and password input fields are present
  expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
  
  // Check if the Sign In button is present
  expect(screen.getByRole('button', { name: /Sign In/i })).toBeInTheDocument();
  
  // Check if the link to Sign Up page is present
  expect(screen.getByText(/Don't have an account?/i)).toBeInTheDocument();
});

test('input fields are updated correctly', () => {
  render(
    <Provider store={store}>
      <SignIn />
    </Provider>
  );

  // Simulate user typing in the email and password fields
  fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'test@example.com' } });
  fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'password123' } });

  // Assert that the input fields have the correct values
  expect(screen.getByLabelText(/Email/i).value).toBe('test@example.com');
  expect(screen.getByLabelText(/Password/i).value).toBe('password123');
});

test('displays error message on failed login', async () => {
  // Mock the dispatch function to simulate a failed login
  jest.mock('react-redux', () => ({
    useDispatch: () => jest.fn(() => Promise.resolve({ payload: 'Login failed' })),
  }));

  render(
    <Provider store={store}>
      <SignIn />
    </Provider>
  );

  // Simulate user input and form submission
  fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'test@example.com' } });
  fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'password123' } });
  fireEvent.click(screen.getByRole('button', { name: /Sign In/i }));

  // Assert that the error message is displayed
  await waitFor(() => {
    expect(screen.getByText(/Login failed/i)).toBeInTheDocument();
  });
});
