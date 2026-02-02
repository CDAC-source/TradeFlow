import { useEffect, useMemo, useState } from "react";
import "./Sales.css";

export default function SalesDashboard() {
  const [stats, setStats] = useState({
    totalRevenue: 0,
    totalOrders: 0,
    topProduct: "-"
  });

  const [customers, setCustomers] = useState([]);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("customer-asc");

  /* =========================
     LOAD SALES DATA
  ========================= */
  useEffect(() => {
    fetch("http://localhost:8080/api/sales/overview")
      .then(res => res.json())
      .then(data => {
        setStats({
          totalRevenue: data.totalRevenue ?? 0,
          totalOrders: data.totalOrders ?? 0,
          topProduct: data.topProduct || "-"
        });
      })
      .catch(console.error);

    fetch("http://localhost:8080/api/sales/customers")
      .then(res => res.json())
      .then(setCustomers)
      .catch(console.error);
  }, []);

  /* =========================
     SEARCH + SORT LOGIC
  ========================= */
  const filteredCustomers = useMemo(() => {
    let data = [...customers];

    // 🔍 SEARCH (Customer + Machine + Spare)
    if (search.trim()) {
      const q = search.toLowerCase();

      data = data.filter(c => {
        const customerMatch =
          (c.customer || c.name || "")
            .toLowerCase()
            .includes(q);

        const machineMatch = Array.isArray(c.machines)
          ? c.machines.some(m =>
              m.toLowerCase().includes(q)
            )
          : false;

        const spareMatch = Array.isArray(c.spareParts)
          ? c.spareParts.some(s =>
              s.toLowerCase().includes(q)
            )
          : false;

        return customerMatch || machineMatch || spareMatch;
      });
    }

    // 🔽 SORT
    switch (sortBy) {
      case "customer-asc":
        data.sort((a, b) =>
          (a.customer || a.name || "")
            .localeCompare(b.customer || b.name || "")
        );
        break;

      case "customer-desc":
        data.sort((a, b) =>
          (b.customer || b.name || "")
            .localeCompare(a.customer || a.name || "")
        );
        break;

      case "machine-asc":
        data.sort((a, b) =>
          (a.machines?.[0] || "")
            .localeCompare(b.machines?.[0] || "")
        );
        break;

      case "machine-desc":
        data.sort((a, b) =>
          (b.machines?.[0] || "")
            .localeCompare(a.machines?.[0] || "")
        );
        break;

      default:
        break;
    }

    return data;
  }, [customers, search, sortBy]);

  return (
    <div className="sales-page">
      <h1 className="sales-title">Sales Analytics</h1>

      {/* =========================
          KPI CARDS
      ========================= */}
      <div className="sales-grid">
        <div className="sales-card">
          <h5>Total Revenue</h5>
          <p className="sales-value">
            ₹{stats.totalRevenue.toLocaleString()}
          </p>
        </div>

        <div className="sales-card">
          <h5>Total Orders</h5>
          <p className="sales-value">
            {stats.totalOrders}
          </p>
        </div>

        <div className="sales-card">
          <h5>Top Product</h5>
          <p className="sales-value">
            {stats.topProduct}
          </p>
        </div>
      </div>

      {/* =========================
          CUSTOMER SALES TABLE
      ========================= */}
      <div className="sales-table-card">
        <h3 className="sales-section-title">
          Customer Sales Overview
        </h3>

        {/* SEARCH + FILTER */}
        <div className="sales-toolbar">
          <input
            type="text"
            className="sales-search"
            placeholder="Search customer, machine or spare..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />

          <select
            className="sales-filter"
            value={sortBy}
            onChange={e => setSortBy(e.target.value)}
          >
            <option value="customer-asc">Customer A–Z</option>
            <option value="customer-desc">Customer Z–A</option>
            <option value="machine-asc">Machine A–Z</option>
            <option value="machine-desc">Machine Z–A</option>
          </select>
        </div>

        <table className="table sales-table">
          <thead>
            <tr>
              <th>Customer</th>
              <th>Machines Owned</th>
              <th>Spare Parts Used</th>
              <th>Total Spent</th>
            </tr>
          </thead>

          <tbody>
            {filteredCustomers.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center">
                  No matching records found
                </td>
              </tr>
            )}

            {filteredCustomers.map((c, i) => (
              <tr key={i}>
                <td>{c.customer || c.name || "-"}</td>

                <td>
                  {Array.isArray(c.machines) && c.machines.length > 0
                    ? c.machines.map((m, j) => (
                        <span key={j} className="tag machine">
                          {m}
                        </span>
                      ))
                    : "-"}
                </td>

                <td>
                  {Array.isArray(c.spareParts) && c.spareParts.length > 0
                    ? c.spareParts.map((s, j) => (
                        <span key={j} className="tag spare">
                          {s}
                        </span>
                      ))
                    : "-"}
                </td>

                <td className="amount">
                  ₹{(c.totalSpent ?? 0).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
