import React from "react";
import { Table } from "antd";
import "antd/dist/reset.css";

export default function CustomTable({ columns = [], data = [], onEdit, onDelete }) {
  const actionColumn = {
    title: "ACTIONS",
    key: "actions",
    render: (_, record) => (
      <div className="flex gap-3">
        <button
          type="button"
          onClick={() => onEdit?.(record)}
          className="text-white bg-[#4c6ef5] hover:bg-[#5c7cfa] transition-all duration-200 px-4 py-1 rounded-md font-semibold"
        >
          Edit
        </button>
        <button
          type="button"
          onClick={() => onDelete?.(record)}
          className="text-white bg-[#ff6b6b] hover:bg-[#fa5252] transition-all duration-200 px-4 py-1 rounded-md font-semibold"
        >
          Delete
        </button>
      </div>
    ),
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
      <Table
        columns={[...columns, actionColumn]}
        dataSource={data}
        rowKey="id"
        pagination={false}
        className="custom-table"
      />
    </div>
  );
}
