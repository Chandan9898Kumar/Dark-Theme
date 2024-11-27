// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';



/**
 While testing any component which has intersectionsObserver  it throw an Error : IntersectionObserver is not defined while testing react.

 Thats why mocked IntersectionObserver here.


 The error ReferenceError: IntersectionObserver is not defined usually occurs when you're running tests in a Node.js environment, which doesn't have the IntersectionObserver API available by default. This is common in React applications that use libraries or components relying on IntersectionObserver, especially for lazy loading or observing elements in the viewport.

To resolve this issue, you can mock the IntersectionObserver in your test setup
 */
class IntersectionObserver {
    constructor(callback) {
      this.callback = callback;
    }
    observe() {
      // You can implement your own logic here if needed
    }
    unobserve() {}
    disconnect() {}
  }
  
  global.IntersectionObserver = IntersectionObserver;