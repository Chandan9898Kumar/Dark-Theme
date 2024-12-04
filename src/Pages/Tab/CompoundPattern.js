import React, { useState, createContext, useContext } from 'react';

// Create a context to share the active tab state
const TabContext = createContext();

const Tabs = ({ children }) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <TabContext.Provider value={{ activeTab, setActiveTab }}>
      <div className="tabs">{children}</div>
    </TabContext.Provider>
  );
};

const Tab = ({ index, label }) => {
  const { activeTab, setActiveTab } = useContext(TabContext);

  const tabStyle = {
    height: '40px',
    width: '100px',
    margin: '10px 10px',
    fontSize: '20px',
    cursor: 'pointer',
  };
  return (
    <button
      className={`compTab ${activeTab === index ? 'tab-active' : ''}`}
      style={tabStyle}
      onClick={() => setActiveTab(index)}
    >
      {label}
    </button>
  );
};

const TabPanel = ({ index, children }) => {
  const { activeTab } = useContext(TabContext);

  return <div style={{ textAlign: 'center' }}>{activeTab === index && children}</div>;
};

//  From Above , all is a part of Compound pattern. Below is just the main component which return compound pattern.

const CompoundPattern = () => {
  return (
    <Tabs>
      <Tab index={0} label="Tab 1" />
      <Tab index={1} label="Tab 2" />
      <Tab index={2} label="Tab 3" />

      <TabPanel index={0}>
        <h1>Content for Tab 1</h1>
        <p>This is the content for the 1st tab.</p>
      </TabPanel>
      <TabPanel index={1}>
        <h1>Content for Tab 2</h1>
        <p>This is the content for the 2ns tab.</p>
      </TabPanel>
      <TabPanel index={2}>
        <h1>Content for Tab 3</h1>
        <p>This is the content for the 3rd tab.</p>
      </TabPanel>
    </Tabs>
  );
};

export default CompoundPattern;

/*                            Compound Pattern
1. The Compound Components pattern in React is a design pattern that allows you to create a set of components that work together as a single unit.
This pattern helps you manage the state and behavior of the components in a way that keeps them loosely coupled while still allowing them to share context and functionality
With the Compound Pattern, we can create multiple components that work together to perform one single task.


2. Compound components manage their own internal state, which they share among the several child components. 
When implementing a compound component, we don't have to worry about managing the state ourselves.


3. When importing a compound component, we don't have to explicitly import the child components that are available on that component.


                          Key Features of Compound Components:
1. Shared State: The parent component can manage the state and pass it down to the child components.
2. Explicit Relationships: The components are designed to work together, which makes it clear how they relate to each other.
3. Flexibility: You can add or remove components without affecting the overall functionality.
*/

/**
                         Overview of the Compound Component Pattern
In this pattern, a parent component encapsulates the state and behavior, while child components are responsible for rendering the UI based on that state.
This separation of concerns leads to more maintainable and testable code. The child components can be rearranged or reused in different contexts 
without being tightly coupled to the parent component's implementation.


The Compound Component Pattern is an effective way to build complex UIs in React by allowing multiple components to work together seamlessly.
By managing state at a higher level and providing context to child components, developers can create highly reusable and maintainable code structures.


This pattern is particularly useful for creating UI elements like tabs, modals, and forms, select, dropdown components, or menu items where multiple related components need to share state 
and behavior without tightly coupling their implementations.
 */

//                                              OTHER Example :

// Let's say for example that we have a Search input component. When a user clicks on the search input, we show a SearchPopup component that shows some popular locations.

/*
file  >  input.js



import React from 'react';

const FlyOutContext = React.createContext();

function FlyOut(props) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState('');
  const toggle = React.useCallback(() => setOpen((state) => !state), []);

  return (
    <FlyOutContext.Provider value={{ open, toggle, value, setValue }}>
      <div className="flyout">{props.children}</div>
    </FlyOutContext.Provider>
  );
}

function Input(props) {
  const { value, toggle,setValue } = React.useContext(FlyOutContext);

  return (
    <input
      onFocus={toggle}
      onBlur={toggle}
      className="flyout-input"
      value={value}
      onChange={(event)=> setValue(event.target.value)}
      {...props}
    />
  );
}

function List({ children }) {
  const { open } = React.useContext(FlyOutContext);

  return (
    open && (
      <div className="flyout-list">
        <ul>{children}</ul>
      </div>
    )
  );
}

function Item({ children, value }) {
  const { setValue } = React.useContext(FlyOutContext);

  return (
    <li
      onMouseDown={() => {
        setValue(value);
      }}
      className="flyout-list-item"
    >
      {children}
    </li>
  );
}

FlyOut.Input = Input;
FlyOut.List = List;
FlyOut.Item = Item;

export { FlyOut };

*/

/**

File : App.js

import * as React from 'react';
import './style.css';
import { FlyOut } from './Input/Input';

export default function App() {
  return (
    <div className="card">
      <FlyOut>
        <FlyOut.Input placeholder="Enter an address, city, or ZIP code" />
        <FlyOut.List>
          <FlyOut.Item value="San Francisco, CA">San Francisco, CA</FlyOut.Item>
          <FlyOut.Item value="Seattle, WA">Seattle, WA</FlyOut.Item>
          <FlyOut.Item value="Austin, TX">Austin, TX</FlyOut.Item>
          <FlyOut.Item value="Miami, FL">Miami, FL</FlyOut.Item>
          <FlyOut.Item value="Boulder, CO">Boulder, CO</FlyOut.Item>
        </FlyOut.List>
      </FlyOut>
    </div>
  );
}




> style.css

body {
  margin: 0;
  background-color: #0b0b0e;
  font-family: Inter;
  color: #fff;
}

h1,
p {
  font-family: Lato;
}

.card {
  background-color: #151519;
  padding: 1em;
  margin: 2em;
  border-radius: 7px;
  color: white;
  display: flex;
  justify-content: center;
}

.flyout {
  width: 400px;
}

.flyout-input {
  padding: 1em 2em;
  border-radius: 7px;
  border-bottom-left-radius: 0px;
  border-bottom-right-radius: 0px;
  color: #5e5e5e;
  font-size: 1em;
  font-weight: regular;
  width: calc(100% - 4em);
  font-family: Inter;
  border: none;
}

.flyout-list {
  background-color: #f0f3f3;
  width: 100%;
  border-bottom-left-radius: 7px;
  border-bottom-right-radius: 7px;
}

.flyout-list ul {
  margin: 0;
  list-style: none;
  padding: 0;
}

.flyout-list-item {
  padding: 1.3em 2em;
  font-family: Inter;
  color: #5e5e5e;
  font-size: 0.8em;
  border-bottom: 1px solid rgba(191, 208, 208, 0.26);
  cursor: pointer;
}

.flyout-list-item:hover {
  background-color: #d5d5d5;
}

*/
