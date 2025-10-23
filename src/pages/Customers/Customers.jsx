import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Customers.css";

function Customers() {
  const [customers, setCustomers] = useState([]);
  const [search, setSearch] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  const [editId, setEditId] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5;

  const fetchCustomers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/customers");
      setCustomers(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.phone || !form.address) {
      toast.warning("⚠️ Barcha maydonlarni to‘ldiring!");
      return;
    }

    try {
      if (editId) {
        await axios.put(`http://localhost:5000/customers/${editId}`, form);
        toast.success("✅ Mijoz ma'lumotlari yangilandi!");
        setEditId(null);
      } else {
        await axios.post("http://localhost:5000/customers", form);
        toast.success("✅ Yangi mijoz qo‘shildi!");
      }

      setForm({ name: "", email: "", phone: "", address: "" });
      fetchCustomers();
    } catch (err) {
      toast.error("❌ Saqlashda xatolik yuz berdi!");
      console.error(err);
    }
  };

  const handleEdit = (customer) => {
    setForm({
      name: customer.name,
      email: customer.email,
      phone: customer.phone,
      address: customer.address,
    });
    setEditId(customer.id);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Haqiqatan ham o‘chirmoqchimisiz?")) {
      try {
        const customerToDelete = customers.find((c) => c.id === id);
        if (!customerToDelete) return;

        await axios.post("http://localhost:5000/customersArchieve", {
          ...customerToDelete,
          deletedAt: new Date().toISOString(),
        });

        await axios.delete(`http://localhost:5000/customers/${id}`);

        toast.success("🗑️ Mijoz o‘chirildi va arxivga saqlandi!");
        fetchCustomers();
      } catch (err) {
        toast.error("❌ O‘chirish yoki arxivlashda xatolik!");
        console.error(err);
      }
    }
  };

  const filtered = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()) ||
      c.address.toLowerCase().includes(search.toLowerCase())
  );

  const offset = currentPage * itemsPerPage;
  const paginatedCustomers = filtered.slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil(filtered.length / itemsPerPage);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  return (
    <div className="customers-container">
      <h1 className="customers-title">Customers</h1>

      <div className="customers-header">
        <input
          type="text"
          className="search-input"
          placeholder="Search customers..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <form onSubmit={handleSubmit} className="customer-form">
        <input
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          type="text"
          placeholder="Phone"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
        />
        <input
          type="text"
          placeholder="Address"
          value={form.address}
          onChange={(e) => setForm({ ...form, address: e.target.value })}
        />
        <button type="submit" className="btn-primary">
          {editId ? "💾 Save Changes" : "➕ Add Customer"}
        </button>
      </form>

      <div className="table-container">
        <table className="customers-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Address</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedCustomers.length > 0 ? (
              paginatedCustomers.map((c, i) => (
                <tr key={c.id}>
                  <td>{offset + i + 1}</td>
                  <td>{c.name}</td>
                  <td>{c.email}</td>
                  <td>{c.phone}</td>
                  <td>{c.address}</td>
                  <td>
                    <button className="btn-edit" onClick={() => handleEdit(c)}>
                      ✏️
                    </button>
                    <button
                      className="btn-delete"
                      onClick={() => handleDelete(c.id)}
                    >
                      🗑️
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="no-data">
                  No customers found
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <ReactPaginate
          previousLabel={"<"}
          nextLabel={">"}
          breakLabel={"..."}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={3}
          onPageChange={handlePageClick}
          containerClassName={"pagination"}
          activeClassName={"active"}
          pageClassName={"page-item"}
          pageLinkClassName={"page-link"}
          previousClassName={"page-item"}
          nextClassName={"page-item"}
          breakClassName={"page-item"}
          disabledClassName={"disabled"}
        />
      </div>

      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
      />
    </div>
  );
}

export default Customers;
