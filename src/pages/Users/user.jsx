import React, { useState } from "react";
import CustomTable from "../Products/customTable";
import useGet from "../../customHooks/useGet";
import usePost from "../../customHooks/usePost";
import useUpdate from "../../customHooks/useUpdate";
import useDelete from "../../customHooks/useDelete";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function UserPage() {
  const { data, refetch } = useGet("/users");
  const { postData } = usePost("/users");
  const { updateData } = useUpdate("/users");
  const { deleteData } = useDelete("/users");

  const { postData: archiveUser } = usePost("/usersArchieve");

  const [show, setShow] = useState(false);
  const [editId, setEditId] = useState(null);
  const [search, setSearch] = useState("");
  const [form, setForm] = useState({
    username: "",
    email: "",
    role: "",
    age: "",
    name: "",
    surname: "",
    password: "",
  });
  const [delItem, setDelItem] = useState(null);

  const handleChange = (e) =>
    setForm({
      ...form,
      [e.target.name]:
        e.target.name === "age" ? Number(e.target.value) : e.target.value,
    });

  const resetForm = () =>
    setForm({
      username: "",
      email: "",
      role: "",
      age: "",
      name: "",
      surname: "",
      password: "",
    });

  const submit = async (e) => {
    e.preventDefault();
    if (
      !form.username ||
      !form.email ||
      !form.role ||
      !form.age ||
      !form.name ||
      !form.surname ||
      !form.password
    ) {
      toast.error("Fill all fields!");
      return;
    }

    try {
      if (editId) {
        await updateData(editId, form);
        toast.info("User updated!", {
          style: { background: "#2563eb", color: "#fff" },
        });
      } else {
        await postData(form);
        toast.success("User added!", {
          style: { background: "#22c55e", color: "#fff" },
        });
      }
      resetForm();
      setShow(false);
      refetch();
    } catch (err) {
      console.error(err);
      toast.error("Error occurred!");
    }
  };

  const editItem = (record) => {
    setEditId(record.id);
    setForm(record);
    setShow(true);
  };

  const delConfirm = async () => {
    if (!delItem) return;
    try {
      await archiveUser({
        ...delItem,
        deletedAt: new Date().toISOString(),
      });

      await deleteData(delItem.id);

      toast.error("User deleted!", {
        style: { background: "#dc2626", color: "#fff" },
      });

      setDelItem(null);
      refetch();
    } catch (err) {
      console.error(err);
      toast.error("Error deleting or archiving user!");
    }
  };

  const filtered = data?.filter(
    (u) =>
      u.username?.toLowerCase().includes(search.toLowerCase()) ||
      u.email?.toLowerCase().includes(search.toLowerCase()) ||
      u.name?.toLowerCase().includes(search.toLowerCase()) ||
      u.surname?.toLowerCase().includes(search.toLowerCase())
  );

  const cols = [
    { title: "ID", dataIndex: "id" },
    { title: "Username", dataIndex: "username" },
    { title: "Email", dataIndex: "email" },
    { title: "Role", dataIndex: "role" },
    { title: "Age", dataIndex: "age" },
    { title: "Name", dataIndex: "name" },
    { title: "Surname", dataIndex: "surname" },
  ];

  return (
    <div className="p-5 bg-[#1f2a40] min-h-screen text-white">
      <div className="flex justify-between mb-5 items-center">
        <h2 className="text-xl font-bold">Users</h2>
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
            name="username"
            value={form.username}
            onChange={handleChange}
            placeholder="Username"
            className="p-2 bg-[#1f2a40] border border-gray-600 rounded"
          />
          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            type="email"
            className="p-2 bg-[#1f2a40] border border-gray-600 rounded"
          />
          <input
            name="role"
            value={form.role}
            onChange={handleChange}
            placeholder="Role"
            className="p-2 bg-[#1f2a40] border border-gray-600 rounded"
          />
          <input
            name="age"
            value={form.age}
            onChange={handleChange}
            placeholder="Age"
            type="number"
            className="p-2 bg-[#1f2a40] border border-gray-600 rounded"
          />
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Name"
            className="p-2 bg-[#1f2a40] border border-gray-600 rounded"
          />
          <input
            name="surname"
            value={form.surname}
            onChange={handleChange}
            placeholder="Surname"
            className="p-2 bg-[#1f2a40] border border-gray-600 rounded"
          />
          <input
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Password"
            type="password"
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
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center">
          <div className="bg-[#25314d] p-5 rounded text-center">
            <p>Delete user "{delItem.username}"?</p>
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