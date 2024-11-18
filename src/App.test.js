import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import App from './App';
import ThemeManager from './ContextApi/ThemeManager';

describe('Test Suite for App Page', () => {

  test('Testing NavLink Texts', async () => {
    const items = ['Home Page', 'Account Page', 'Account Page', 'Service Page', 'Country', 'Tab'];

    render(
      <ThemeManager>
        <App />
      </ThemeManager>
    );

    await waitFor(() => {
      items.forEach((item) => {
        const linkElement = screen.getByText(item);
        expect(linkElement).toBeInTheDocument();
      });
    });

    await waitFor(() => {
      const loadingElement = screen.getByText('Loading ...');
      expect(loadingElement).toBeInTheDocument();
    });


    screen.debug()
  });

});

/**
1. Used waitFor: This allows you to wait for the asynchronous operations to complete and ensures that the assertions are made after the component has finished rendering.
 */
