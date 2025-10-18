import React, { useMemo } from "react";
import { Line } from "react-chartjs-2";

export default function LineChart({ labels, values, label }) {
  const randomColor = useMemo(() => {
    const r = Math.floor(Math.random() * 255);
    const g = Math.floor(Math.random() * 255);
    const b = Math.floor(Math.random() * 255);
    return {
      border: `rgba(${r}, ${g}, ${b}, 1)`,
      background: `rgba(${r}, ${g}, ${b}, 0.2)`,
    };
  }, [values]);

  const data = {
    labels,
    datasets: [
      {
        label,
        data: values,
        borderColor: randomColor.border,
        backgroundColor: randomColor.background,
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
