import React from "react";
import { BrowserRouter } from "react-router-dom";

import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Layout from "./containers/Layout/Layout";

/*
 * Setting up the main single page of the application
 * where the navbar is present throughout the entire app
 * and the layout to route several pages here
 * Add BrowserRouter to have routing functionalities in the entire app
 */
const App = () => {
  return (
    <div className="p-0 d-flex flex-column">
      <BrowserRouter>
        <Navbar />
        <Layout />
      </BrowserRouter>
    </div>
  );
};

export default App;
