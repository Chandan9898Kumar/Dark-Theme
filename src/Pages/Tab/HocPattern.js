import React, { useState, useEffect } from 'react';

const withLoading = (WrappedComponent) => {
  return function WithLoadingComponent(props) {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(null);

    useEffect(() => {
      // Simulate data fetching
      setTimeout(() => {
        setData({ message: 'Data loaded!' });
        setLoading(false);
      }, 2000);
    }, []);

    if (loading) {
      return (
        <div>
          <h1>Loading...</h1>
        </div>
      );
    }

    return <WrappedComponent {...props} data={data} />;
  };
};

const MyComponent = ({ data, ...rest }) => {
  return (
    <div>
      <h1>{rest.title}</h1>
      <p style={{ textAlign: 'center' }}>{data.message}</p>
    </div>
  );
};

const EnhancedMyComponent = withLoading(MyComponent);
export default EnhancedMyComponent;

//                                   How It Works
// 1. HOC Definition: The withLoading function takes WrappedComponent as an argument and returns a new component.
// 2. State Management: Inside the returned component, we manage loading state and fetched data using React hooks.
// 3. Conditional Rendering: If the data is still loading, it displays "Loading...". Once the data is fetched, it renders WrappedComponent, passing down the fetched data as props.

/*                                 The HOC Pattern in React


1. Higher-Order Components (HOCs) are a powerful pattern in React that allows for the reuse of component logic.
An HOC is a function that takes a component as an argument and returns a new component with enhanced capabilities.
This approach promotes code reusability and helps maintain clean, modular code.


> :           Definition and Purpose of HOCs
A Higher-Order Component is defined as follows :  
const enhancedComponent = higherOrderComponent(WrappedComponent);

> NOTE In this line:
1. enhancedComponent: The new component with added functionality.
2. higherOrderComponent: The function that enhances the WrappedComponent.
3. WrappedComponent: The original component that needs enhancement.
*/

//                              Pros
//  Using the Higher Order Component pattern allows us to keep logic that we want to re-use all in one place.
//  This reduces the risk of accidentally spreading bugs throughout the application by duplicating code over and over, potentially introducing new bugs each time.
//  By keeping the logic all in one place, we can keep our code DRY and easily enforce separation of concerns.

//                        Best use-cases for a HOC:
// 1. The same, uncustomized behavior needs to be used by many components throughout the application.
// 2. The component can work standalone, without the added custom logic.

//                        Best use-cases for Hooks:
// 1. The behavior has to be customized for each component that uses it.
// 2. The behavior is not spread throughout the application, only one or a few components use the behavior.
// 3. The behavior adds many properties to the component
