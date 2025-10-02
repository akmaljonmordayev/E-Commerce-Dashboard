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


      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              {" "}
              <HomePage />
            </Layout>
          }
        />
        <Route
          path="/products"
          element={
            <Layout>
              {" "}
              <ProductPage />
            </Layout>
          }
        />
        <Route
          path="/users"
          element={
            <Layout>
              {" "}
              <UsersPage />
            </Layout>
          }
        />
        <Route path="*" element={<NotFound />} />
        <Route path="/profile" element={<Profile />} />
        <Route
          path="/archieve"
          element={
            <Layout>
              <Archieve />
            </Layout>
          }
        />
        <Route
          path="/categories"
          element={
            <Layout>
              <Categories />
            </Layout>
          }
        />
        <Route
          path="/analytics"
          element={
            <Layout>
              <Analytics />
            </Layout>
          }
        />
      </Routes>

    </>
  );
}

export default App;
