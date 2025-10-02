import "./App.css";
import React from "react";
import Header from "./bigComponents/header/header";
import Layout from "./bigComponents/Lay_Out/LayOut";
import HomePage from "./pages/Home/home";
import { Route, Routes } from "react-router-dom";
import UsersPage from "./pages/Users/user";
import ProductPage from "./pages/Products/product";
import NotFound from "./bigComponents/notFound";
import Profile from "./pages/Profile/Profile";
import Archieve from "./pages/Archieve/Archieve";
import Categories from "./pages/Categories/Categories";
import Analytics from "./pages/Analytics/Analytics";
function App() {
  return (
    <>
      <h1 className="text-[red]">ADMIN PANEL</h1>
      <h2>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Facilis atque
        recusandae nisi porro in minus totam? Magni repudiandae at soluta.
      </h2>
    </>
  );
}

export default App;
