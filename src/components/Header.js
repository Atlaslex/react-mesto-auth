import React, { useState } from "react";
import { Link } from "react-router-dom";

function Header({ linkTitle, link, onSignOut, email }) {
  
  
  return (

    <header className="header">

      <div className="header__container">
        <div className="header__logo"></div>
        <div className="header__flex">
          <span className="header__email">{email}</span>
          <Link to={link} className="link header__link" onClick={onSignOut}>{linkTitle}</Link>
        </div>

      </div>
    </header>

  );
}

export default Header;