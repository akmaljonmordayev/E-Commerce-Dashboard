import { Outlet, Link } from "react-router-dom";
import React from "react";
<<<<<<< HEAD
import ProductCard from "../../bigComponents/productCard";
function Archieve() {
  return (
    <div>
      <div className="flex gap-[30px]">
        <Link to="productsarchieve">
          <ProductCard
            height={150}
            width={280}
            title={"Products Archieve"}
            count={0}
          />
        </Link>
        <Link to="usersarchieve">
          <ProductCard
            height={150}
            width={280}
            title={"Users Archieve"}
            count={0}
          />
        </Link>{" "}
        <Link to="customersarchieve">
          <ProductCard
            height={150}
            width={280}
            title={"Customers Archieve"}
            count={0}
          />
        </Link>{" "}
        <Link to="ordersarchieve">
          <ProductCard
            height={150}
            width={280}
            title={"Orders Archieve"}
            count={0}
          />
        </Link>{" "}
      </div>
=======
import { Outlet, Link } from "react-router-dom";
import ProductCard from "../../bigComponents/productCard";
import useGet from "../../customHooks/useGet";
import Loader from "../../smallComponents/loader";
import ErrorMessage from "../../bigComponents/errorMessage";

export default function Archieve() {
  const {
    data: archivedProducts,
    loading: loadingProducts,
    error: errorProducts,
  } = useGet("/productsArchieve");

  const {
    data: archivedCustomers,
    loading: loadingCustomers,
    error: errorCustomers,
  } = useGet("/customersArchieve");

  const {
    data: archivedOrders,
    loading: loadingOrders,
    error: errorOrders,
  } = useGet("/ordersArchieve");

  const {
    data: archivedUsers,
    loading: loadingUsers,
    error: errorUsers,
  } = useGet("/usersArchieve");

  if (loadingProducts || loadingCustomers || loadingOrders || loadingUsers)
    return <Loader />;

  if (errorProducts || errorCustomers || errorOrders || errorUsers)
    return <ErrorMessage message="Error" />;

  return (
    <div className="p-6 text-white">
      <div className="flex gap-[30px] justify-evenly flex-wrap">
        <Link to="/archieve/productsarchieve">
          <ProductCard
            title="Archived Products"
            count={archivedProducts ? archivedProducts.length : 0}
          />
        </Link>

        <Link to="/archieve/customersarchieve">
          <ProductCard
            title="Archived Customers"
            count={archivedCustomers ? archivedCustomers.length : 0}
          />
        </Link>

        <Link to="/archieve/ordersarchieve">
          <ProductCard
            title="Archived Orders"
            count={archivedOrders ? archivedOrders.length : 0}
          />
        </Link>

        <Link to="/archieve/usersarchieve">
          <ProductCard
            title="Archived Users"
            count={archivedUsers ? archivedUsers.length : 0}
          />
        </Link>
      </div>

>>>>>>> 26704205853013e37f71016b64dc87d809e9601b
      <Outlet />
    </div>
  );
}
