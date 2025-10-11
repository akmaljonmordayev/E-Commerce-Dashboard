import React from "react";
import { Line } from "react-chartjs-2";

export default function LineChart({ labels, values, label, borderColor, backgroundColor }) {
  const data = {
    labels: labels,
    datasets: [
      {
        label: label,
        data: values,
        borderColor: borderColor ,
        backgroundColor: backgroundColor,
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
