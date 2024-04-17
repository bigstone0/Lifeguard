import React, { useContext } from "react";
import "./Header.css";
import icon_ship_ from "./icon_ship_.svg";
import profile_img from "./profile_img.png";
import { GlobalStateContext } from "./GlobalState";

function Header() {
  const { firstName, lastName, isLoggedIn } = useContext(GlobalStateContext);

  return (
    <div className="Header">
      <div className="HeaderTitle">
        <img src={icon_ship_} alt="icon" />
        <p>Smart Lifeguard Management</p>
      </div>
      {isLoggedIn && (
        <div className="HeaderAccount">
          <div className="HeaderName">
            <p>
              {firstName}
              <br />
              {lastName}
            </p>
          </div>
          <img src={profile_img} alt="icon" />
        </div>
      )}
    </div>
  );
}

export default Header;
