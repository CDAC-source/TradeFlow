// src/pages/billing/InvoiceList.jsx
import { useEffect, useState } from "react";
import "./Invoice.css";

export default function InvoiceList() {
  const [invoices, setInvoices] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");

  const loadInvoices = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/invoices");
      const data = await res.json();
      const list = Array.isArray(data) ? data : [];
      setInvoices(list);
      setFiltered(list);
    } catch (err) {
      console.error("Failed to load invoices", err);
      setInvoices([]);
      setFiltered([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadInvoices();
  }, []);

  // 🔍 SEARCH + FILTER LOGIC
  useEffect(() => {
    let data = [...invoices];

    // SEARCH
    if (search) {
      const q = search.toLowerCase();
      data = data.filter(inv =>
        inv.invoiceNumber?.toLowerCase().includes(q) ||
        inv.customer?.name?.toLowerCase().includes(q)
      );
    }

    // FILTER / SORT
    if (filter === "name-asc") {
      data.sort((a, b) =>
        (a.customer?.name || "").localeCompare(b.customer?.name || "")
      );
    }

    if (filter === "name-desc") {
      data.sort((a, b) =>
        (b.customer?.name || "").localeCompare(a.customer?.name || "")
      );
    }

    if (filter === "invoice-asc") {
      data.sort((a, b) =>
        (a.invoiceNumber || "").localeCompare(b.invoiceNumber || "")
      );
    }

    if (filter === "invoice-desc") {
      data.sort((a, b) =>
        (b.invoiceNumber || "").localeCompare(a.invoiceNumber || "")
      );
    }

    setFiltered(data);
  }, [search, filter, invoices]);

  const deleteInvoice = async (id) => {
    if (!window.confirm("Delete this invoice permanently?")) return;

    try {
      const res = await fetch(
        `http://localhost:8080/api/invoices/${id}`,
        { method: "DELETE" }
      );

      if (res.ok) {
        setInvoices(prev => prev.filter(inv => inv.id !== id));
      } else {
        alert("Delete failed on server");
      }
    } catch (err) {
      console.error(err);
      alert("Delete failed. Check console.");
    }
  };

  return (
    <div className="invoice-page">
      <div className="invoice-container">

        {/* HEADER */}
        <div className="list-header">
          <h2 className="billing-title">Invoice History</h2>

          <div className="search-filter">
            <input
              type="text"
              placeholder="Search by invoice no or customer..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="search-input"
            />

            <select
              value={filter}
              onChange={e => setFilter(e.target.value)}
              className="filter-select"
            >
              <option value="">Sort / Filter</option>
              <option value="name-asc">Customer Name (A–Z)</option>
              <option value="name-desc">Customer Name (Z–A)</option>
              <option value="invoice-asc">Invoice No (Ascending)</option>
              <option value="invoice-desc">Invoice No (Descending)</option>
            </select>
          </div>
        </div>

        {loading ? (
          <p className="muted">Loading invoices...</p>
        ) : filtered.length === 0 ? (
          <p className="muted">No invoices found.</p>
        ) : (
          <div className="table-wrapper">
            <table className="billing-table">
              <thead>
                <tr>
                  <th>Invoice No</th>
                  <th>Customer</th>
                  <th>Total</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {filtered.map(inv => (
                  <tr key={inv.id}>
                    <td>{inv.invoiceNumber}</td>
                    <td>{inv.customer?.name || "-"}</td>
                    <td>₹{(inv.totalAmount || 0).toFixed(2)}</td>
                    <td className="actions">
                      <button
                        className="btn-outline"
                        onClick={() =>
                          window.open(
                            `http://localhost:8080/api/invoices/${inv.id}/pdf`,
                            "_blank"
                          )
                        }
                      >
                        PDF
                      </button>

                      <button
                        className="btn-danger"
                        onClick={() => deleteInvoice(inv.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>

            </table>
          </div>
        )}
      </div>
    </div>
  );
}
