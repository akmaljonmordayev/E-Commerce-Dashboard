import React, { useMemo } from "react";
import { Bar } from "react-chartjs-2";

export default function BarChart({ labels, values, label }) {
  const randomColors = useMemo(
    () =>
      values.map(() => {
        const r = Math.floor(Math.random() * 255);
        const g = Math.floor(Math.random() * 255);
        const b = Math.floor(Math.random() * 255);
        return `rgba(${r}, ${g}, ${b}, 0.7)`;
      }),
    [values]
  );

  const data = {
    labels,
    datasets: [
      {
        label,
        data: values,
        backgroundColor: randomColors,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
    },
    scales: { y: { beginAtZero: true } },
  };

  return (
    <div style={{ height: 300 }}>
      <Bar data={data} options={options} />
    </div>
  );
}
