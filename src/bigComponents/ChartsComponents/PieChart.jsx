import React, { useMemo } from "react";
import { Pie } from "react-chartjs-2";

export default function PieChart({ labels, values, label }) {
  // useMemo -> har safar component qayta render bo'lganda ranglar yangilanadi
  const randomColors = useMemo(
    () =>
      values.map(() => {
        const r = Math.floor(Math.random() * 255);
        const g = Math.floor(Math.random() * 255);
        const b = Math.floor(Math.random() * 255);
        return `rgba(${r}, ${g}, ${b}, 0.7)`;
      }),
    [values] // values o‘zgarganda ranglar yangilanadi
  );

  const data = {
    labels,
    datasets: [
      {
        label,
        data: values,
        backgroundColor: randomColors,
        borderColor: "#ffffff",
        borderWidth: 2,
        hoverOffset: 10,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          color: "#2a64f7",
          font: { size: 12 },
        },
      },
    },
  };

  return (
    <div style={{ height: 300 }}>
      <Pie data={data} options={options} />
    </div>
  );
}
