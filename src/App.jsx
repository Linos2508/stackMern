import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Users from "./pages/Users.jsx";
import Exercises from "./pages/Exercises.jsx";
import logo from './logo.svg';

export default function App() {
  return (
    <BrowserRouter>
      <Route
        path="/"
        exact
        render={(props) => (
          <Users
            {...props}
          />
        )}
      />
      <Route
        path="/Exercises"
        exact
        render={(props) => (
          <Exercises
            {...props}
          />
        )}
      />
    </BrowserRouter>
  );
}
