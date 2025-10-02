import React from "react";
import { Pie } from "react-chartjs-2";

export default function PieChart({ labels, values, colors, label }) {
  const data = {
    labels: labels,
    datasets: [
      {
        label: label || "Ma'lumot",
        data: values,
        backgroundColor: colors || ["red", "yellow", "purple", "pink"],
      },
    ],
  };

  return (
    <div style={{ height: 300 }}>
      <Pie data={data} />
    </div>
  );
}
