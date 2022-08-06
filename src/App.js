import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Appbar from "./components/Appbar";
import Home from "./components/Home";
import User from "./components/User";
import Login from "./components/Login";
import ResourceDetail from "./components/ResourceDetail";
import "./App.css";

function App() {
  return (
    <div>
       <BrowserRouter>
      <Appbar />
      <Routes> 
          <Route exact path="/" element={<Home />}></Route> 
          <Route exact path="/resource_detail" element={<ResourceDetail />}></Route>
          <Route exact path="/user" element={<User />}></Route>
          <Route exact path="/login" element={<Login />}></Route>
        </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
