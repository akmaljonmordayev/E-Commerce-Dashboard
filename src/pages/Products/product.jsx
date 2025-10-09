import React, { useState } from "react";
import CustomTable from "../Products/customTable";
import useGet from "../../customHooks/useGet";
import useDelete from "../../customHooks/useDelete";
import useUpdate from "../../customHooks/useUpdate";
import usePost from "../../customHooks/usePost";

export default function ProductPage() {
  const { data: products, loading } = useGet("/products");
  const { deleteData } = useDelete("/products");
  const { updateData } = useUpdate("/products");
  const { postData } = usePost("/products");

  const [search, setSearch] = useState("");
  const [form, setForm] = useState({
    name: "",
    price: "",
    stock: "",
    category: "",
    brand: "",
  });
  const [editId, setEditId] = useState(null);
  const [deleteItem, setDeleteItem] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.price || !form.stock || !form.category || !form.brand) {
      alert("Please fill in all fields!");
      return;
    }

    if (editId) {
      await updateData(editId, form);
      setEditId(null);
    } else {
      await postData(form);
    }

    setForm({ name: "", price: "", stock: "", category: "", brand: "" });
    setShowForm(false);
    window.location.reload();
  };

  const handleEdit = (item) => {
    setForm(item);
    setEditId(item.id);
    setShowForm(true);
  };

  const handleDeleteConfirm = async () => {
    if (deleteItem) {
      await deleteData(deleteItem.id);
      setDeleteItem(null);
      window.location.reload();
    }
  };

  const filtered = products?.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  const columns = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Price", dataIndex: "price", key: "price" },
    { title: "Stock", dataIndex: "stock", key: "stock" },
    { title: "Category", dataIndex: "category", key: "category" },
    { title: "Brand", dataIndex: "brand", key: "brand" },
  ];

  if (loading) return <p className="text-center mt-10 text-white">Loading...</p>;

  return (
    <div className="p-6 bg-[#1f2a40] min-h-screen text-white">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Products</h2>
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-2 rounded bg-[#25314d] border border-gray-600 focus:outline-none"
        />
        <button
          onClick={() => {
            setShowForm(!showForm);
            setEditId(null);
            setForm({ name: "", price: "", stock: "", category: "", brand: "" });
          }}
          className="bg-[#2a64f7] hover:bg-[#3b78ff] px-4 py-2 rounded-md font-semibold transition-all duration-200"
        >
          {showForm ? "Close" : "Add Product"}
        </button>
      </div>

      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="mb-6 bg-[#25314d] p-4 rounded-lg grid grid-cols-2 gap-4"
        >
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            type="text"
            placeholder="Name"
            required
            className="p-2 rounded bg-[#1f2a40] border border-gray-600 focus:outline-none"
          />
          <input
            name="price"
            value={form.price}
            onChange={handleChange}
            type="number"
            placeholder="Price"
            required
            className="p-2 rounded bg-[#1f2a40] border border-gray-600 focus:outline-none"
          />
          <input
            name="stock"
            value={form.stock}
            onChange={handleChange}
            type="number"
            placeholder="Stock"
            required
            className="p-2 rounded bg-[#1f2a40] border border-gray-600 focus:outline-none"
          />
          <input
            name="category"
            value={form.category}
            onChange={handleChange}
            type="text"
            placeholder="Category"
            required
            className="p-2 rounded bg-[#1f2a40] border border-gray-600 focus:outline-none"
          />
          <input
            name="brand"
            value={form.brand}
            onChange={handleChange}
            type="text"
            placeholder="Brand"
            required
            className="p-2 rounded bg-[#1f2a40] border border-gray-600 focus:outline-none"
          />
          <button
            type="submit"
            className="col-span-2 bg-[#2a64f7] hover:bg-[#3b78ff] text-white px-4 py-2 rounded-md font-semibold transition-all duration-200"
          >
            {editId ? "Save Changes" : "Save Product"}
          </button>
        </form>
      )}

      <CustomTable
        columns={columns}
        data={filtered}
        onEdit={handleEdit}
        onDelete={(item) => setDeleteItem(item)}
      />

      {deleteItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-[#25314d] p-6 rounded-lg w-[350px] text-center">
            <h3 className="text-lg font-semibold mb-4">
              Delete “{deleteItem.name}”?
            </h3>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleDeleteConfirm}
                className="bg-[#ff4d4f] px-4 py-2 rounded-md hover:bg-[#ff6b6b] transition-all"
              >
                Yes, Delete
              </button>
              <button
                onClick={() => setDeleteItem(null)}
                className="bg-gray-500 px-4 py-2 rounded-md hover:bg-gray-600 transition-all"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
