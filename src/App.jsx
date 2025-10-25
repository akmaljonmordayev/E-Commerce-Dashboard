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
import Analytics from "./pages/Analytics/Analytics";
import Settings from "./pages/Settings/Settings";
import WelcomePage from "./bigComponents/welcomePage/WelcomePage";
import Login from "./bigComponents/logIn";
import ProtectedRoute from "./bigComponents/ProtectedRoute";
import Customers from "./pages/Customers/Customers";
import Signup from "./bigComponents/signup/Signup";
import Orders from "./pages/Orders/Orders";
import UsersArchieve from "./pages/UserArchieve/UsersArchieve";
import ProductsArchieve from "./pages/ProductsArchieve/ProductsArchieve";
import CustomersArchieve from "./pages/CustomersArchieve/CustomersArchieve";
import OrdersArchieve from "./pages/OrderArchieve/OrdersArchieve";
import Chatbot from "./pages/Chatbot/chatbot";
import Message from "./pages/Message/Message";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Layout>
                {" "}
                <HomePage />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/products"
          element={
            <ProtectedRoute>
              <Layout>
                {" "}
                <ProductPage />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/users"
          element={
            <ProtectedRoute>
              <Layout>
                {" "}
                <UsersPage />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Layout>
                <Profile />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/archieve"
          element={
            <ProtectedRoute>
              <Layout>
                <Archieve />
              </Layout>
            </ProtectedRoute>
          }
        >
          <Route path="/archieve/usersarchieve" element={<UsersArchieve />} />
          <Route
            path="/archieve/customersarchieve"
            element={<CustomersArchieve />}
          />
          <Route path="/archieve/ordersarchieve" element={<OrdersArchieve />} />
          <Route
            path="/archieve/productsarchieve"
            element={<ProductsArchieve />}
          />
        </Route>
        <Route
          path="/orders"
          element={
            <ProtectedRoute>
              <Layout>
                <Orders />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/analytics"
          element={
            <ProtectedRoute>
              <Layout>
                <Analytics />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <Layout>
                <Settings />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/customers"
          element={
            <ProtectedRoute>
              <Layout>
                <Customers />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/chatbot"
          element={
            <ProtectedRoute>
              <Layout>
                <Chatbot />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/message"
          element={
            <ProtectedRoute>
              <Layout>
                <Message />
              </Layout>
            </ProtectedRoute>
          }
        />
      </Routes>

    </>
  );
}

export default App;
