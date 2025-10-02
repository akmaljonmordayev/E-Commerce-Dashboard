import React from "react";
import { Line } from "react-chartjs-2";

export default function LineChart({ labels, values, label, borderColor, backgroundColor }) {
  const data = {
    labels: labels,
    datasets: [
      {
        label: label || "Foydalanuvchilar",
        data: values,
        borderColor: borderColor || "blue",
        backgroundColor: backgroundColor || "lightblue",
        tension: 0.4, 
        fill: true,  
      },
    ],
  };

  return (
    <div style={{ height: 300 }}>
      <Line data={data} />
    </div>
  );
}
