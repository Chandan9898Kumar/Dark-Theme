import React from 'react';

class ErrorBoundary extends React.Component {
  constructor() {
    super();
    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1 style={{ color: 'red' }}>{this.props.fallback}</h1>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

/**


### Where to use Error Boundary : 

You will be tempted to wrap every component with error boundary. However, there is little cost of the performance you have to bear.
So, prefer to identify the components which could be "error sensitive". A few places where you should be using Error Boundary:

1. Components with 3rd party api and data

2. In most real-world applications, error boundaries are only placed around critical parts of the application (e.g., around major components or entire routes),
so the performance impact is minimal.

3. Prefer to wrap the parent component with Error boundary.



### A note on performance :

When an error is caught, React needs to re-render the components in the tree that are within the error boundary’s scope,
which can introduce a slight delay as it tries to render the fallback UI.

If you use too many error boundaries throughout the application (at a very granular level), this can lead to unnecessary re-renders and increased component complexity, slightly degrading performance.

But it is always about trade-off, stability of app vs performance. If the performance cost is not much always go for the stability of the app or try to balance both.
 */
