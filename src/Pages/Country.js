import React from 'react';
import { Outlet, NavLink, Link } from 'react-router-dom';
import './pages.css';

export const Country = () => {
  return (
    <>
      <h1>This is German Country</h1>
    </>
  );
};

export const CountryPlace = () => {
  return (
    <>
      <h1>This is German Place</h1>
    </>
  );
};

export const CountryAddress = () => {
  return (
    <>
      <h1>This is German address</h1>
    </>
  );
};

export const CountryId = () => {
  return (
    <>
      <h1>This is German Id </h1>
    </>
  );
};

export const ToDoSideDrawer = ({ children }) => {
  return (
    <>
      <div className="sidebar">{children}</div>
      <div className="outlet">
        <Outlet />
      </div>
      <Link to="7">Click To Go On Id Page</Link>
    </>
  );
};

const ToDoNavLinkSideContent = () => {
  const styles = {
    display: 'flex',
    gap: '10px',
    padding: '10px',
  };

  return (
    <div style={styles}>
      <NavLink to="/country" caseSensitive className={({ isActive }) => (isActive ? 'isActiveLink' : 'staticLink')}>
        Country
      </NavLink>

      <NavLink
        to="/country/place"
        caseSensitive
        className={({ isActive }) => (isActive ? 'isActiveLink' : 'staticLink')}
      >
        Country place
      </NavLink>

      <NavLink
        to="/country/address"
        caseSensitive
        className={({ isActive }) => (isActive ? 'isActiveLink' : 'staticLink')}
      >
        Country address
      </NavLink>
    </div>
  );
};

const ToDoMenuDrawer = () => {
  return (
    <ToDoSideDrawer>
      <ToDoNavLinkSideContent />
    </ToDoSideDrawer>
  );
};

export default ToDoMenuDrawer;
