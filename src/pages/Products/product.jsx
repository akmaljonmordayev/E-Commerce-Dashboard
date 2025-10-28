import React, { useState, useEffect } from "react";
import CustomTable from "../Products/customTable";
import useGet from "../../customHooks/useGet";
import useDelete from "../../customHooks/useDelete";
import useUpdate from "../../customHooks/useUpdate";
import usePost from "../../customHooks/usePost";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ProductPage() {
  const { data, refetch } = useGet("/products");
  const { deleteData } = useDelete("/products");
  const { updateData } = useUpdate("/products");
  const { postData } = usePost("/products");
  const { postData: postArchive } = usePost("/productsArchieve");

  const [list, setList] = useState([]);
  const [show, setShow] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState({
    name: "",
    price: "",
    stock: "",
    category: "",
    brand: "",
  });
  const [delItem, setDelItem] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (data) setList(data);
  }, [data]);

  const handleChange = (e) =>
    setForm({
      ...form,
      [e.target.name]:
        e.target.name === "price" || e.target.name === "stock"
          ? Number(e.target.value)
          : e.target.value,
    });

  const resetForm = () => {
    setForm({ name: "", price: "", stock: "", category: "", brand: "" });
    setEditId(null);
  };

  const submit = async (e) => {
    e.preventDefault();
    if (
      !form.name ||
      !form.price ||
      !form.stock ||
      !form.category ||
      !form.brand
    ) {
      toast.error("Fill all fields");
      return;
    }

    try {
      if (editId) {
        await updateData(editId, form);
        setList((prev) =>
          prev.map((item) => (item.id === editId ? { ...item, ...form } : item))
        );
        toast.info("Edited!", {
          style: { background: "#2563eb", color: "#fff" },
        });
      } else {
        const res = await postData(form);
        setList((prev) => [...prev, res]);
        toast.success("Added!", {
          style: { background: "#22c55e", color: "#fff" },
        });
      }
      resetForm();
      setShow(false);
    } catch (err) {
      toast.error("Error");
      console.error(err);
    }
  };

  const editItem = (i) => {
    setForm(i);
    setEditId(i.id);
    setShow(true);
  };

  const delConfirm = async () => {
    if (!delItem) return;
    try {
      await postArchive({
        title: delItem.name,
        price: delItem.price,
        stock: delItem.stock,
        category: delItem.category,
        brand: delItem.brand,
      });

      await deleteData(delItem.id);
      setList((prev) => prev.filter((item) => item.id !== delItem.id)); 

      toast.error("Deleted!", {
        style: { background: "#dc2626", color: "#fff" },
      });
      setDelItem(null);
    } catch (err) {
      console.error(err);
    }
  };

  const filtered = list?.filter(
    (i) =>
      (i.name || "").toLowerCase().includes(search.toLowerCase()) ||
      (i.category || "").toLowerCase().includes(search.toLowerCase())
  );

  const cols = [
    { title: "ID", dataIndex: "id" },
    { title: "Name", dataIndex: "name" },
    { title: "Price", dataIndex: "price" },
    { title: "Stock", dataIndex: "stock" },
    { title: "Category", dataIndex: "category" },
    { title: "Brand", dataIndex: "brand" },
  ];

  return (
    <div className="p-5 bg-[#1f2a40] min-h-screen text-white">
      <div className="flex justify-between mb-5 items-center">
        <h2 className="text-xl font-bold">Products</h2>
        <input
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-2 bg-[#25314d] rounded border border-gray-600"
        />
        <button
          onClick={() => {
            setShow(!show);
            resetForm();
          }}
          className="bg-blue-600 px-4 py-2 rounded"
        >
          {show ? "Close" : "Add"}
        </button>
      </div>

      {show && (
        <form
          onSubmit={submit}
          className="grid grid-cols-2 gap-3 bg-[#25314d] p-4 mb-6 rounded"
        >
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Name"
            className="p-2 bg-[#1f2a40] border border-gray-600 rounded"
          />
          <input
            name="price"
            value={form.price}
            onChange={handleChange}
            placeholder="Price"
            type="number"
            className="p-2 bg-[#1f2a40] border border-gray-600 rounded"
          />
          <input
            name="stock"
            value={form.stock}
            onChange={handleChange}
            placeholder="Stock"
            type="number"
            className="p-2 bg-[#1f2a40] border border-gray-600 rounded"
          />
          <input
            name="category"
            value={form.category}
            onChange={handleChange}
            placeholder="Category"
            className="p-2 bg-[#1f2a40] border border-gray-600 rounded"
          />
          <input
            name="brand"
            value={form.brand}
            onChange={handleChange}
            placeholder="Brand"
            className="p-2 bg-[#1f2a40] border border-gray-600 rounded"
          />
          <button type="submit" className="col-span-2 bg-blue-600 rounded py-2">
            {editId ? "Edit" : "Save"}
          </button>
        </form>
      )}

      <CustomTable
        columns={cols}
        data={filtered}
        onEdit={editItem}
        onDelete={(i) => setDelItem(i)}
      />

      {delItem && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-3">
          <div className="bg-[#25314d] p-5 rounded text-center">
            <p>Delete "{delItem.name}"?</p>
            <div className="flex gap-3 justify-center mt-3">
              <button
                onClick={delConfirm}
                className="bg-red-500 px-4 py-2 rounded"
              >
                Yes
              </button>
              <button
                onClick={() => setDelItem(null)}
                className="bg-gray-500 px-4 py-2 rounded"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}

      <ToastContainer />
    </div>
  );
}
