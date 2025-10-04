import React from "react";
import ProductCard from "../../bigComponents/productCard";
import useGet from "../../customHooks/useGet";
import Loader from "../../smallComponents/loader";
import ErrorMessage from "../../bigComponents/errorMessage";
import { Users } from "lucide-react";
function HomePage() {
  const {
    data: customers,
    loading: loadingCustomers,
    error: errorCustomers,
  } = useGet("/customers");

  if (loadingCustomers) return <Loader />;
  if (errorCustomers) return <ErrorMessage message={error} />;
  console.log(customers);

  return (
    <div>
      <ProductCard
        title="Total Customers"
        count={customers ? customers.length : null}
      />
      <ProductCard title="Total Users" count={3400} />
    </div>
  );
}

export default HomePage;
