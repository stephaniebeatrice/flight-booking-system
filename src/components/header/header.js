import React from "react";
import { Link, useNavigate } from "react-router-dom";

import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import "../../styles/style.css";

export const Header = () => {
  const user = useSelector(state => state.authReducer.user);
  const navigation = useNavigate();
  return (
    <header className="animate-search">
      <section id="bottom-section">
        <div>{/* TODO: ADD AN IMAGE HERE */}</div>
        {/* #1d94f7 */}
        {user ? (
          <div className="col right">
            <span id="ctl00_ctBody_Web_Content_Home_Web_Header_Web_Menu_Web_menu">
              <nav id="main_nav">
                <ul>
                  <li className="current-menu-item">
                    <Link style={{ textDecoration: "none" }} to={"/"}>
                      Home
                    </Link>
                  </li>
                  <li className="current-menu-item">
                    <Link style={{ textDecoration: "none" }} to={"/booking"}>
                      Bookings
                    </Link>
                  </li>
                  <li className="has-children">
                    <Link style={{ textDecoration: "none" }} to={"/Jobs"}>
                      Jobs
                    </Link>
                  </li>
                  <li className="has-children">
                    <Link style={{ textDecoration: "none" }} to={"/Admin"}>
                      admin
                    </Link>
                  </li>
                </ul>
              </nav>
            </span>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "row", justifyContent: "flex-end", padding: ".2rem 0rem" }}>
            <Button onClick={() => navigation("/Login")} style={{ margin: "0rem .8rem" }}>
              Login
            </Button>
            <Button onClick={() => navigation("/SignUp")} style={{ margin: "0rem .8rem" }}>
              Register
            </Button>
          </div>
        )}
      </section>
    </header>
  );
};
