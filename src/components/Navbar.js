import React, { useState } from "react";
import NavbarContainer from "./NavbarContainer";
import { Link } from "./../util/router.js";
import { useAuth } from "./../util/auth.js";

function Navbar(props) {
  const auth = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <NavbarContainer spaced={props.spaced} color={props.color}>
      <div className="container">
        <div className="navbar-brand">
          <div className="navbar-item">
            <Link to="/">
              <img className="image" src={props.logo} alt="Logo" />
            </Link>
          </div>
          <div
            className={"navbar-burger burger" + (menuOpen ? " is-active" : "")}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span />
            <span />
            <span />
          </div>
        </div>
        <div className={"navbar-menu" + (menuOpen ? " is-active" : "")}>
          <div className="navbar-end">
            {(auth.user || true) && (
              <div className="navbar-item has-dropdown is-hoverable"  onClick={() => setMenuOpen(!menuOpen)}>
                <Link className="navbar-link" to="/">
                  Account
                </Link>
                <div className="navbar-dropdown is-boxed">
                  <Link className="navbar-item" to="/dashboard">
                    New Photo
                  </Link>
                  <Link className="navbar-item" to="/profile">
                    Patient
                  </Link>
                  <Link className="navbar-item" to="/profile">
                    Send data
                  </Link>
                  <Link
                    className="navbar-item"
                    to="/signout"
                    onClick={e => {
                      e.preventDefault();
                      auth.signout();
                    }}
                  >
                    Sign out
                  </Link>
                </div>
              </div>
            )}

            {/* // TODO: should be /signin */}
            {false && !auth.user && (
              <Link className="navbar-item" to="/signin" onClick={e => {
                setMenuOpen(!menuOpen)
              }}>
                Sign in
              </Link>
            )}
          </div>
        </div>
      </div>
    </NavbarContainer>
  );
}

export default Navbar;
