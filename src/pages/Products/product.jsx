import React, { useState } from "react"
import CustomTable from "./customTable"
import useGet from "../../customHooks/useGet"
import useDelete from "../../customHooks/useDelete"
import useUpdate from "../../customHooks/useUpdate"
import usePost from "../../customHooks/usePost"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

export default function ProductPage() {
  const { data: products, loading } = useGet("/products")
  const { deleteData } = useDelete("/products")
  const { updateData } = useUpdate("/products")
  const { postData } = usePost("/products")

  const [search, setSearch] = useState("")
  const [showModal, setShowModal] = useState(false)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState({
    name: "",
    price: "",
    stock: "",
    category: "",
    brand: "",
  })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleAdd = async () => {
    if (!form.name || !form.price || !form.stock || !form.category || !form.brand) {
      toast.error("Please fill in all fields!")
      return
    }

    try {
      const newProduct = {
        name: form.name,
        price: Number(form.price),
        stock: Number(form.stock),
        category: form.category,
        brand: form.brand,
      }
      await postData(newProduct)
      toast.success("Product added successfully!")
      setForm({ name: "", price: "", stock: "", category: "", brand: "" })
      setShowModal(false)
      setTimeout(() => window.location.reload(), 1000)
    } catch {
      toast.error("Error adding product")
    }
  }

  const handleEdit = (record) => {
    setEditing(record)
    setForm(record)
    setShowModal(true)
  }

  const handleSave = async () => {
    try {
      await updateData(editing.id, form)
      toast.success("Product updated!")
      setShowModal(false)
      setTimeout(() => window.location.reload(), 1000)
    } catch {
      toast.error("Error updating product")
    }
  }

  const handleDelete = async (record) => {
    if (window.confirm(`Delete ${record.name}?`)) {
      try {
        await deleteData(record.id)
        toast.info("Product deleted")
        setTimeout(() => window.location.reload(), 1000)
      } catch {
        toast.error("Error deleting product")
      }
    }
  }

  const filtered = products?.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  )

  const columns = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Price", dataIndex: "price", key: "price" },
    { title: "Stock", dataIndex: "stock", key: "stock" },
    { title: "Category", dataIndex: "category", key: "category" },
    { title: "Brand", dataIndex: "brand", key: "brand" },
  ]

  if (loading) return <p className="text-center mt-10 text-white">Loading...</p>

  return (
    <div className="p-6">
      <div className="flex justify-between mb-4">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search product..."
          className="border border-gray-400 px-3 py-2 rounded-md w-1/3"
        />
        <button
          onClick={() => {
            setShowModal(true)
            setEditing(null)
            setForm({ name: "", price: "", stock: "", category: "", brand: "" })
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Add Product
        </button>
      </div>

      <CustomTable
        columns={columns}
        data={filtered}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-md w-[400px]">
            <h3 className="text-xl font-bold mb-4">
              {editing ? "Edit Product" : "Add Product"}
            </h3>
            <div className="flex flex-col gap-2">
              <input name="name" value={form.name} onChange={handleChange} placeholder="Name" className="border px-2 py-1 rounded" />
              <input name="price" value={form.price} onChange={handleChange} placeholder="Price" className="border px-2 py-1 rounded" />
              <input name="stock" value={form.stock} onChange={handleChange} placeholder="Stock" className="border px-2 py-1 rounded" />
              <input name="category" value={form.category} onChange={handleChange} placeholder="Category" className="border px-2 py-1 rounded" />
              <input name="brand" value={form.brand} onChange={handleChange} placeholder="Brand" className="border px-2 py-1 rounded" />
            </div>
            <div className="flex justify-end gap-3 mt-4">
              <button
                onClick={() => {
                  setShowModal(false)
                  setEditing(null)
                  setForm({ name: "", price: "", stock: "", category: "", brand: "" })
                }}
                className="bg-gray-400 text-white px-4 py-1 rounded hover:bg-gray-500"
              >
                Cancel
              </button>
              <button
                onClick={editing ? handleSave : handleAdd}
                className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  )
}
