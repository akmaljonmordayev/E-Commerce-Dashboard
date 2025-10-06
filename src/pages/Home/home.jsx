import React from "react";
import ProductCard from "../../bigComponents/productCard";
import useGet from "../../customHooks/useGet";
import Loader from "../../smallComponents/loader";
import ErrorMessage from "../../bigComponents/errorMessage";
function HomePage() {
  const {
    data: customers,
    loading: loadingCustomers,
    error: errorCustomers,
  } = useGet("/customers");

  const {
    data: products,
    loading: loadingProducts,
    error: errorProducts,
  } = useGet("/products");

  const {
    data: orders,
    loading: loadingOrders,
    error: errorOrders,
  } = useGet("/orders");

  const {
    data: users,
    loading: loadingUsers,
    error: errorUsers,
  } = useGet("/users");

  if ((loadingCustomers || loadingProducts, loadingOrders || loadingUsers))
    return <Loader />;

  if (errorCustomers || errorProducts || errorOrders || errorUsers)
    return <ErrorMessage message={error} />;

  return (
    <div className="flex gap-[30px] justify-evenly flex-wrap">
      <ProductCard
        title="Total Products"
        count={products ? products.length : 0}
      />
      <ProductCard
        title="Total Customers"
        count={customers ? customers.length : 0}
      />
      <ProductCard title="Total Orders" count={orders ? orders.length : 0} />
      <ProductCard title="Total Users" count={users ? users.length : 0} />
    </div>
  );
}

export default HomePage;
