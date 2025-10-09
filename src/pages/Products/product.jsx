import React, { useState } from "react";
import CustomTable from "../../pages/Products/customTable";
import useGet from "../../customHooks/useGet";
import useDelete from "../../customHooks/useDelete";
import useUpdate from "../../customHooks/useUpdate";
import usePost from "../../customHooks/usePost";

export default function ProductPage() {
  const { data: products, loading } = useGet("/products");
  const { deleteData } = useDelete("/products");
  const { updateData } = useUpdate("/products");
  const { postData } = usePost("/products");
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    name: "",
    price: "",
    stock: "",
    category: "",
    brand: "",
  });

  const handleDelete = async (item) => {
    if (window.confirm(`Delete ${item.name}?`)) {
      await deleteData(item.id);
      window.location.reload();
    }
  };

  const handleEdit = async (item) => {
    const newName = prompt("New name:", item.name);
    if (newName && newName !== item.name) {
      await updateData(item.id, { ...item, name: newName });
      window.location.reload();
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    await postData(form);
    setShowForm(false);
    window.location.reload();
  };

  const columns = [
    { title: "ID", dataIndex: "id" },
    { title: "Name", dataIndex: "name" },
    { title: "Price", dataIndex: "price" },
    { title: "Stock", dataIndex: "stock" },
    { title: "Category", dataIndex: "category" },
    { title: "Brand", dataIndex: "brand" },
  ];

  if (loading) return <p>Loading...</p>;

  return (
    <div className="p-6 bg-[#1f2a40] min-h-screen text-white rounded-[20px]">
      <div className="flex justify-between items-center mb-6 и ">
        <h2 className="text-2xl font-bold">Products</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-[#2a64f7] px-4 py-2 rounded-md"
        >
          {showForm ? "Close" : "Add Product"}
        </button>
      </div>

      {showForm && (
        <form
          onSubmit={handleAdd}
          className="mb-6 bg-[#25314d] p-4 rounded-lg grid grid-cols-2 gap-4"
        >
          <input
            type="text"
            placeholder="Name"
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="p-2 rounded bg-[#1f2a40]"
          />
          <input
            type="number"
            placeholder="Price"
            onChange={(e) => setForm({ ...form, price: e.target.value })}
            className="p-2 rounded bg-[#1f2a40]"
          />
          <input
            type="number"
            placeholder="Stock"
            onChange={(e) => setForm({ ...form, stock: e.target.value })}
            className="p-2 rounded bg-[#1f2a40]"
          />
          <input
            type="text"
            placeholder="Category"
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            className="p-2 rounded bg-[#1f2a40]"
          />
          <input
            type="text"
            placeholder="Brand"
            onChange={(e) => setForm({ ...form, brand: e.target.value })}
            className="p-2 rounded bg-[#1f2a40]"
          />
          <button
            type="submit"
            className="col-span-2 bg-[#2a64f7] px-4 py-2 rounded-md"
          >
            Save
          </button>
        </form>
      )}

      <CustomTable
        columns={columns}
        data={products}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}
