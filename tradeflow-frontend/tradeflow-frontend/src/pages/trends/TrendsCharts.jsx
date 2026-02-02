import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid
} from "recharts";

export default function TrendsCharts() {
  const [machineTrend, setMachineTrend] = useState([]);
  const [topMachines, setTopMachines] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/analytics/machine-purchase-trend")
      .then(res => res.json())
      .then(data => setMachineTrend(data || []));

    fetch("http://localhost:8080/api/analytics/top-machines")
      .then(res => res.json())
      .then(data => setTopMachines(data || []));
  }, []);

  return (
    <div className="chart-grid">

      {/* MACHINE PURCHASE TREND */}
      <div className="chart-card">
        <h3>Machine Purchase Trend (Monthly)</h3>
        <ResponsiveContainer width="100%" height={260}>
          <LineChart data={machineTrend}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="count"
              stroke="#4f46e5"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* TOP SELLING MACHINES (REVENUE) */}
      <div className="chart-card">
        <h3>Top Selling Machines (Revenue)</h3>
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={topMachines}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip formatter={(v) => `₹${v.toLocaleString()}`} />
            <Bar
              dataKey="revenue"
              fill="#22c55e"
              radius={[6, 6, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
}
