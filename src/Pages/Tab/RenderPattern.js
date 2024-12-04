import React, { useState } from 'react';

//  With the Render Props pattern, we pass components as props to other components. The components that are passed as props can in turn receive props from that component.
function Input(props) {
  const [value, setValue] = useState('');

  return (
    <>
      <input
        className="input-field-pattern"
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Temp in °C"
      />
      {props.render(value)}
    </>
  );
}

export default function RenderPattern() {
  return (
    <div className="render">
      <h1>☃️ Temperature Converter 🌞</h1>
      <Input
        render={(value) => (
          <>
            <Kelvin value={value} />
            <Fahrenheit value={value} />
          </>
        )}
      />
    </div>
  );
}

function Kelvin({ value }) {
  return <div className="temp">{parseInt(value || 0) + 273.15}K</div>;
}

function Fahrenheit({ value }) {
  return <div className="temp">{(parseInt(value || 0) * 9) / 5 + 32}°F</div>;
}

/*  Explanation of above render patter why did we use the render pattern above 

> See below Example : 

In this case, we have a stateful Input component. However, the sibling components Fahrenheit and Kelvin also need access to this data.
Instead of having a stateful Input component, we can lift the state up to the first common ancestor component that has a connection to Input,
Fahrenheit and Kelvin: the App component in this case!


function Input({ value, handleChange }) {
  return <input value={value} onChange={(e) => handleChange(e.target.value)} />;
}

export default function App() {
  const [value, setValue] = useState("");

  return (
    <div className="App">
      <h1>☃️ Temperature Converter 🌞</h1>
      <Input value={value} handleChange={setValue} />
      <Kelvin value={value} />
      <Fahrenheit value={value} />
    </div>
  );
}


> 

Although above example is a valid solution, it can be tricky to lift state in larger applications with components that handle many children.
Each state change could cause a re-render of all the children, even the ones that don’t handle the data, which could negatively affect the performance of your app.

So Thats the reason we used above render pattern.
*/

//  OTHER Example :

/** 
Step 1: Create the Mouse Component
This component will track the mouse position and provide it to its children via a render prop.



import React, { Component } from 'react';
class MouseTracker extends Component {
    state = {
        x: 0,
        y: 0,
    };

    handleMouseMove = (event) => {
        this.setState({
            x: event.clientX,
            y: event.clientY,
        });
    };

    componentDidMount() {
        window.addEventListener('mousemove', this.handleMouseMove);
    }

    componentWillUnmount() {
        window.removeEventListener('mousemove', this.handleMouseMove);
    }

    render() {
        return this.props.render(this.state);
    }
}



Step 2: Use the Mouse Component with Render Props
Now, we can use the MouseTracker component in another component and provide a function to render the mouse position.


const App = () => {
    return (
        <div>
            <h1>Move your mouse around!</h1>
            <MouseTracker render={({ x, y }) => (
                <p>
                    The mouse position is ({x}, {y}).
                </p>
            )} />
        </div>
    );
};

export default App;


 */

/**

The Render Props pattern is a technique for sharing code between React components using a prop whose value is a function. 
This function, often referred to as a "render prop," allows a component to control what is rendered by providing its own rendering logic
while still utilizing the shared logic of the component that provides the render prop.


> Key Characteristics

    1. Function as a Child: Instead of passing a component as a child, you pass a function that returns a React element.

    2. Dynamic Rendering: The component can dynamically render content based on the state or props it receives.

    3. Reusability: This pattern promotes code reuse by allowing different components to share the same logic while rendering different UI.
 */

//  NOTE :

// Cons  >

// The issues that we tried to solve with render props, have largely been replaced by React Hooks.
// As Hooks changed the way we can add reusability and data sharing to components, they can replace the render props pattern in many cases.

// Since we can’t add lifecycle methods to a render prop, we can only use it on components that don’t need to alter the data they receive.

//  The common way to share code among several components, is by using the Higher Order Component or Render Props pattern.
