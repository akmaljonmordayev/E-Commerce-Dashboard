import React from "react";
import { Table } from "antd";
import "antd/dist/reset.css";

export default function CustomTableArchieve({ columns = [], data = [], onRestore, onDelete }) {
  const actionColumn = {
    title: "Actions",
    key: "actions",
    render: (_, record) => (
      <div className="flex gap-3">
        <button
          onClick={() => onRestore(record)}
          className="text-white bg-[#22c55e] hover:bg-[#16a34a] px-3 py-1 rounded-md"
        >
          Restore
        </button>
        <button
          onClick={() => onDelete(record)}
          className="text-white bg-[#ef4444] hover:bg-[#dc2626] px-3 py-1 rounded-md"
        >
          Delete
        </button>
      </div>
    ),
  };

  const updatedColumns = [
    ...columns.map((col) => ({
      ...col,
      sorter: (a, b) => {
        if (typeof a[col.dataIndex] === "number") return a[col.dataIndex] - b[col.dataIndex];
        if (typeof a[col.dataIndex] === "string")
          return a[col.dataIndex].localeCompare(b[col.dataIndex]);
        return 0;
      },
      sortDirections: ["ascend", "descend"],
    })),
    actionColumn,
  ];

  return (
    <div className="bg-[#1f2a40] p-4 rounded-xl shadow-lg border border-gray-700 mt-[30px]">
      <Table
        columns={updatedColumns}
        dataSource={data}
        rowKey="id"
        pagination={{ pageSize: 5 }}
        bordered
      />
    </div>
  );
}