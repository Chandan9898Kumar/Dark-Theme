import React from "react";
import { NavLink } from "react-router-dom";
import "../App.css";
import { useThemeContext } from "../ContextApi/ThemeManager";
const NavLinks = () => {

  const { isThemeDark, toggleTheme } = useThemeContext();
  
  return (
    <div className="Nav-Container">
      <div className="Nav-Links">
        <NavLink
          to="/"
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "active" : "In-Active"
          }
        >
          Home Page
        </NavLink>
        <NavLink
          to="/account"
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "active" : "In-Active"
          }
        >
          Account Page
        </NavLink>
        <NavLink
          to="/service"
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "active" : "In-Active"
          }
        >
          Service Page
        </NavLink>
      </div>
      <div className="Input-Checkbox">
        <input type="checkbox" checked={isThemeDark} onChange={toggleTheme} />
      </div>
    </div>
  );
};

export default NavLinks;
