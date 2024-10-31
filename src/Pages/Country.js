import React from 'react';
import { Outlet, NavLink, Link } from 'react-router-dom';
import './pages.css';

export const Country = () => {
  return (
    <>
      <h2>
        This is German Country 
      </h2>
      <p>This Where people wants to go and to get education.</p>
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
    <div className='s-layout'>
      <div className="SideDrawerHead">{children}</div>
      <div className="outlet-component">
        <Outlet />
      </div>
    </div>
  );
};

const ToDoNavLinkSideContent = () => {
  const styles = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'baseline',
    gap: '10px',
    padding: '10px 10px',
  };

  return (
    <div className="side-bar-sub-head-link">
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
      <Link to="7">Click To Go On Id Page</Link>
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
