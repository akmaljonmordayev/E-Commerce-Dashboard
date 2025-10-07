import React, { useEffect, useState } from "react";
import axios from "axios";
import './Customers.css'

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [search, setSearch] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  const [editId, setEditId] = useState(null);

  const fetchCustomers = async () => {
    try {
      const res = await axios.get("http://localhost:3000/customers");
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
      alert("Iltimos, barcha maydonlarni to‘ldiring!");
      return;
    }

    try {
      if (editId) {
        
        await axios.put(`http://localhost:3000/customers/${editId}`, form);
        setEditId(null);
      } else {
        
        await axios.post("http://localhost:3000/customers", form);
      }
      setForm({ name: "", email: "", phone: "", address: "" });
      fetchCustomers();
    } catch (err) {
      console.error(err);
    }
  };

  
  const handleDelete = async (id) => {
    if (window.confirm("Haqiqatan ham o‘chirmoqchimisiz?")) {
      await axios.delete(`http://localhost:3000/customers/${id}`);
      fetchCustomers();
    }
  };


  const handleEdit = (customer) => {
    setForm(customer);
    setEditId(customer.id);
  };

  
  const filtered = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()) ||
      c.address.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="customers-container">
      <div className="customers-header">
        <h1 className="customers-title">Customers</h1>
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
          {editId ? "Save Changes" : "Add Customer"}
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
            {filtered.length > 0 ? (
              filtered.map((c, i) => (
                <tr key={c.id}>
                  <td>{i + 1}</td>
                  <td>{c.name}</td>
                  <td>{c.email}</td>
                  <td>{c.phone}</td>
                  <td>{c.address}</td>
                  <td>
                    <button
                      className="btn-edit"
                      onClick={() => handleEdit(c)}
                    >
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
      </div>
    </div>
  );
};

export default Customers;

