import React, { useEffect, useState } from "react";
import axios from "axios";
import ReactPaginate from "react-paginate";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./customerarchieve.css";

function CustomersArchive() {
  const [archived, setArchived] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5;

  const fetchArchived = async () => {
    try {
      const res = await axios.get("http://localhost:5000/customersArchieve");
      setArchived(res.data);
    } catch (err) {
      console.error("Arxivni olishda xatolik:", err);
    }
  };

  useEffect(() => {
    fetchArchived();
  }, []);

  const handleRestore = async (customer) => {
    if (window.confirm("Bu mijozni qayta tiklamoqchimisiz?")) {
      try {
        await axios.post("http://localhost:5000/customers", {
          name: customer.name,
          email: customer.email,
          phone: customer.phone,
          address: customer.address,
        });
  
        await axios.delete(
          `http://localhost:5000/customersArchieve/${customer.id}`
        );
        
  
        fetchArchived();
        toast.success("♻️ Mijoz qayta tiklandi!", { theme: "colored" });
      } catch (err) {
        console.error("Tiklashda xatolik:", err);
        toast.error(`❌ Tiklashda xatolik: ${err.message}`, { theme: "colored" });
      }
    }
  };

  const handleDeleteForever = async (id) => {
    if (window.confirm("Bu ma'lumotni butunlay o‘chirmoqchimisiz?")) {
      try {
        await axios.delete(`http://localhost:5000/customersArchieve/${id}`);
        fetchArchived();
        toast.success("🗑 Mijoz arxivdan o‘chirildi!", { theme: "colored" });
      } catch (err) {
        console.error("O‘chirishda xatolik:", err);
        toast.error("❌ O‘chirishda xatolik!", { theme: "colored" });
      }
    }
  };

  const filtered = archived.filter(
    (c) =>
      (c.name && c.name.toLowerCase().includes(search.toLowerCase())) ||
      (c.email && c.email.toLowerCase().includes(search.toLowerCase())) ||
      (c.address && c.address.toLowerCase().includes(search.toLowerCase()))
  );

  const offset = currentPage * itemsPerPage;
  const paginated = filtered.slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil(filtered.length / itemsPerPage);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  return (
    <div className="archive-container">
      <h1 className="archive-title">🗃 Archived Customers</h1>

      <div className="archive-header">
        <input
          type="text"
          className="archive-search"
          placeholder="Search archived customers..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="archive-table-wrapper">
        <table className="archive-table">
          <thead>
            <tr>
              <th>#</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>PHONE</th>
              <th>ADDRESS</th>
              <th>DELETED AT</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {paginated.length > 0 ? (
              paginated.map((c, i) => (
                <tr key={c.id}>
                  <td>{offset + i + 1}</td>
                  <td>{c.name}</td>
                  <td>{c.email}</td>
                  <td>{c.phone}</td>
                  <td>{c.address}</td>
                  <td>{new Date(c.deletedAt).toLocaleString()}</td>
                  <td>
                    <button
                      className="btn-restore"
                      onClick={() => handleRestore(c)}
                    >
                      ♻️ Restore
                    </button>
                    <button
                      className="btn-delete"
                      onClick={() => handleDeleteForever(c.id)}
                    >
                      ❌ Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="no-data">
                  No archived customers found
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
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
      />
    </div>
  );
}

export default CustomersArchive;
