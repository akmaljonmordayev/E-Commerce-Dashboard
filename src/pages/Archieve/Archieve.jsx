import { Outlet, Link } from "react-router-dom";
import React from "react";
import ProductCard from "../../bigComponents/productCard";
function Archieve() {
  return (
    <div>
      <div className="flex gap-[30px]">
        <Link to="productsarchieve">
          <ProductCard height={150} width={280} title={"Products Archieve"} count={0} />
        </Link>
        <Link to="usersarchieve">
          <ProductCard height={150} width={280} title={"Users Archieve"} count={0} />
        </Link>{" "}
        <Link to="customersarchieve">
          <ProductCard height={150} width={280} title={"Customers Archieve"} count={0} />
        </Link>{" "}
        <Link to="ordersarchieve">
          <ProductCard height={150} width={280} title={"Orders Archieve"} count={0} />
        </Link>{" "}
      </div>
      <Outlet />
    </div>
  );
}

export default Archieve;
