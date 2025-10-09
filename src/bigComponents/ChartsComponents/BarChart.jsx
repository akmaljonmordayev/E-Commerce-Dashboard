import React from "react";
import { Bar } from "react-chartjs-2";

export default function BarChart({ labels, values, colors, label }) {
  const data = {
    labels: labels,
    datasets: [
      {
        label: label,
        data: values,
        backgroundColor: colors ,
      },
    ],
  };

  return (
    <div style={{ height: 300 }}>
      <Bar data={data} />
    </div>
  );
}
  