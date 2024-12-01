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
