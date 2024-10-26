import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
export const Country = () => {
  return (
    <>
      <h1>This is German Country</h1>
    </>
  );
};

export const CountryId = () => {
  return (
    <>
      <h1>This is German Id</h1>
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

export const ToDoSideDrawer = ({ children }) => {
  return (
    <div className="SideDrawerHead">
      {children}
      <div className="outlet-component">
        <Outlet />
      </div>
    </div>
  );
};

const ToDoNavLinkSideContent = () => {
  return (
    <div className="side-bar-sub-head-link">
      <div className="div-Width">
        <NavLink to="/country" caseSensitive className={({ isActive }) => (isActive ? 'isActiveLink' : 'staticLink')}>
          Country
        </NavLink>
      </div>
      <div className="div-Width">
        <NavLink
          to="/country/ids"
          caseSensitive
          className={({ isActive }) => (isActive ? 'isActiveLink' : 'staticLink')}
        >
          Country Ids
        </NavLink>
      </div>
      <div className="div-Width">
        <NavLink
          to="/country/address"
          caseSensitive
          className={({ isActive }) => (isActive ? 'isActiveLink' : 'staticLink')}
        >
          Country address
        </NavLink>
      </div>
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
