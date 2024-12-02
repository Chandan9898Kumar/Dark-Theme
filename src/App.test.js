import React from 'react';
import { render, screen, waitFor, prettyDOM } from '@testing-library/react';
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
  });

  test('Test Home Page', () => {
    const items = [
      'This is Home Page',
      'Scroller On Element',
      'Infinite Scroller',
      'Loading ...',
      'scroll To Top',
      'Scroller Using Button',
      'Search',
      'Scroller Using Intersection',
      'Data to be displayed Here',
      'Scroller with Limit',
    ];
    render(
      <ThemeManager>
        <App />
      </ThemeManager>
    );

    items.forEach((item) => {
      console.log(item, 'item');
      expect(screen.getByText(item)).toBeInTheDocument();
    });

    console.log(prettyDOM());
  });
});

/**
1. Used waitFor: This allows you to wait for the asynchronous operations to complete and ensures that the assertions are made after the component has finished rendering.

2. render(): This function mounts your component and returns a set of utilities to interact with it.

3. screen.debug(): This function outputs the current state of the DOM to the console, which allows you to inspect the entire component tree.
 You can also pass a specific container if you want to debug a specific part of the tree, like screen.debug(container).


NOTE :

Console Output: The output of screen.debug() can be quite verbose, especially for complex components. You might want to use it selectively or 
limit it to specific parts of your component tree.

Using prettyDOM: If you want a more formatted output, you can use prettyDOM from React Testing Library:

 */
