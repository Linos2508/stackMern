import React from "react";
import { Link } from "react-router-dom";
import "../styles/Header.scss";

export default function Header(props) {
  return (
    <>
      <header className="pages">
        <ul>
          <li>
            <Link className={props.active === "users" ? "active" : ""} to="/">
              Users
            </Link>
          </li>
          <li>
            <Link
              className={props.active === "exercises" ? "active" : ""}
              to="/Exercises"
            >
              Exercises
            </Link>
          </li>
        </ul>
      </header>
    </>
  );
}
