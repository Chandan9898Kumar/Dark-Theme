import React from 'react';
import { NavLink } from 'react-router-dom';
import '../App.css';
import { useThemeContext } from '../ContextApi/ThemeManager';
const NavLinks = () => {
  const { isThemeDark, toggleTheme } = useThemeContext();

  return (
    <div className="Nav-Container">
      <div className="Nav-Links">
        <NavLink
          to="/"
          className={({ isActive, isPending }) => (isPending ? 'pending' : isActive ? 'active' : 'In-Active')}
          
        >
          Home Page
        </NavLink>
        <NavLink
          to="/account"
          className={({ isActive, isPending }) => (isPending ? 'pending' : isActive ? 'active' : 'In-Active')}
          
        >
          Account Page
        </NavLink>
        <NavLink
          to="/service"
          className={({ isActive, isPending }) => (isPending ? 'pending' : isActive ? 'active' : 'In-Active')}
          
        >
          Service Page
        </NavLink>

        <NavLink
          to="/country"
          className={({ isActive, isPending }) => (isPending ? 'pending' : isActive ? 'active' : 'In-Active')}
          
        >
          Country
        </NavLink>

        <NavLink
          to="/tab"
          className={({ isActive, isPending }) => (isPending ? 'pending' : isActive ? 'active' : 'In-Active')}
          
        >
          Tab
        </NavLink>
      </div>
      <div className="Input-Checkbox">
        <input type="checkbox" checked={isThemeDark} onChange={toggleTheme} />
      </div>
    </div>
  );
};

export default NavLinks;

/** We can use this  styling as well
const navigationActive = ({ isActive ,isPending}) => {
    return {
      color: isPending ? 'pending' : isActive ? 'active' : 'In-Active,
      textDecoration: "none",
    };
  }; 

<NavLink style={navigationActive} to="home">Home</NavLink>
<NavLink style={navigationActive} to="about">About</NavLink>
<NavLink style={navigationActive} to="contact">Contact</NavLink>

 */

/*
If you're using React Router, you can enhance link transitions by adding the unstable_viewTransition prop to <Link> or <NavLink> components:

<NavLink to="/new-route" unstable_viewTransition>
  Navigate
</NavLink>


This approach allows you to append a class during transitions and customize styles accordingly.
*/
