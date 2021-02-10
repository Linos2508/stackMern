import React, { useState } from "react";
import { BrowserRouter, Route } from "react-router-dom";
// import Login from "./pages/Login.jsx";
import logo from './logo.svg';

export default function App() {
  return (
    <BrowserRouter>
      <Route
        path="/"
        exact
        render={(props) => (
          <Login
            boot={boot}
            language={changeBoot}
            {...props}
            theme={switchTheme}
          />
        )}
      />
    </BrowserRouter>
  );
}

export default App;
