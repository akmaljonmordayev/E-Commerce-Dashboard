import React, { useState, useEffect } from "react";
import useGet from "../../customHooks/useGet";
import useDelete from "../../customHooks/useDelete";
import usePost from "../../customHooks/usePost";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CustomTableArchieve from "./CustomTableArchieve";

function ProductsArchieve() {
  const { data } = useGet("/productsArchieve");
  const { deleteData } = useDelete("/productsArchieve");
  const { postData } = usePost("/products");

  const [list, setList] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (data) setList(data);
  }, [data]);

  const filtered = list?.filter(
    (i) =>
      (i.title || "").toLowerCase().includes(search.toLowerCase()) ||
      (i.category || "").toLowerCase().includes(search.toLowerCase()) ||
      (i.brand || "").toLowerCase().includes(search.toLowerCase())
  );

  const handleRestore = async (item) => {
    try {
      await postData({
        name: item.title,
        price: item.price || 0,
        stock: item.stock || 0,
        category: item.category || "restored",
        brand: item.brand || "unknown",
      });

      await deleteData(item.id);
      setList((prev) => prev.filter((i) => i.id !== item.id)); 

      toast.success("Product restored!", {
        style: { background: "#22c55e", color: "#fff" },
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (item) => {
    try {
      await deleteData(item.id);
      setList((prev) => prev.filter((i) => i.id !== item.id)); 
      toast.error("Deleted!", {
        style: { background: "#dc2626", color: "#fff" },
      });
    } catch (err) {
      console.error(err);
    }
  };

  const cols = [
    { title: "ID", dataIndex: "id" },
    { title: "Title", dataIndex: "title" },
    { title: "Price", dataIndex: "price" },
    { title: "Stock", dataIndex: "stock" },
    { title: "Category", dataIndex: "category" },
    { title: "Brand", dataIndex: "brand" },
  ];

  return (
    <div className="p-5 bg-[#1f2a40] min-h-screen text-white">
      <div className="flex justify-between mb-5 items-center">
        <h2 className="text-xl font-bold">Products Archive</h2>
        <input
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-2 bg-[#25314d] rounded border border-gray-600"
        />
      </div>
      <CustomTableArchieve
        columns={cols}
        data={filtered}
        onRestore={handleRestore}
        onDelete={handleDelete}
      />
      <ToastContainer />
    </div>
  );
}

export default ProductsArchieve;
