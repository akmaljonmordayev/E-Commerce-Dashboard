import React from "react";
import { Bar } from "react-chartjs-2";

export default function BarChart({ labels, values, colors, label }) {
  const data = {
    labels: labels,
    datasets: [
      {
        label: label || "Savdo",
        data: values,
        backgroundColor: colors || ["red", "blue", "green", "orange", "purple"],
      },
    ],
  };

  return (
    <div style={{ height: 300 }}>
      <Bar data={data} />
    </div>
  );
}
  