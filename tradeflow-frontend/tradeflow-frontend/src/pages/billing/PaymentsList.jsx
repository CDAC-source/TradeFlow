// src/pages/billing/PaymentList.jsx
import { useEffect, useState } from "react";
import "./Billing.css";

export default function PaymentList() {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [payAmount, setPayAmount] = useState("");

  useEffect(() => {
    loadInvoices();
  }, []);

  const loadInvoices = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/invoices");
      const data = await res.json();
      setInvoices(data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const savePayment = async (invoice) => {
    const amount = Number(payAmount);
    if (amount < 0) return alert("Invalid amount");

    await fetch(
      `http://localhost:8080/api/invoices/${invoice.id}/payment`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          paidAmount: amount,
          deliveryStatus: invoice.deliveryStatus || "PENDING",
        }),
      }
    );

    setEditingId(null);
    setPayAmount("");
    loadInvoices();
  };

  const updateDelivery = async (invoice, status) => {
    await fetch(
      `http://localhost:8080/api/invoices/${invoice.id}/payment`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          paidAmount: invoice.paidAmount ?? 0,
          deliveryStatus: status,
        }),
      }
    );

    loadInvoices();
  };

  if (loading) return <p className="muted">Loading payments...</p>;

  return (
    <div className="billing-page">
      <h2 className="billing-title">Payments & Delivery Status</h2>

      <div className="table-wrapper">
        <table className="billing-table payment-table">
          <thead>
            <tr>
              <th>Invoice</th>
              <th>Customer</th>
              <th>Total</th>
              <th>Paid</th>
              <th>Balance</th>
              <th>Payment</th>
              <th>Delivery</th>
            </tr>
          </thead>

          <tbody>
            {invoices.map((inv) => {
              const paid = inv.paidAmount ?? 0;
              const total = inv.totalAmount;
              const balance = total - paid;
              const paymentStatus = inv.paymentStatus || "UNPAID";

              return (
                <tr key={inv.id} className="payment-row">
                  <td className="invoice-cell">
                    <strong>{inv.invoiceNumber}</strong>
                  </td>

                  <td className="customer-cell">
                    {inv.customer?.name || "-"}
                  </td>

                  <td>₹{total}</td>
                  <td>₹{paid}</td>

                  <td className={`balance-cell ${balance > 0 ? "due" : "clear"}`}>
                    ₹{balance}
                  </td>

                  <td className="payment-cell">
                    <span className={`badge ${paymentStatus.toLowerCase()}`}>
                      {paymentStatus}
                    </span>

                    {editingId === inv.id ? (
                      <div className="inline-payment">
                        <input
                          type="number"
                          value={payAmount}
                          onChange={(e) => setPayAmount(e.target.value)}
                          placeholder="Amount"
                        />

                        <button
                          className="btn primary"
                          onClick={() => savePayment(inv)}
                        >
                          Save
                        </button>

                        <button
                          className="btn danger"
                          onClick={() => {
                            setEditingId(null);
                            setPayAmount("");
                          }}
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      paymentStatus !== "PAID" && (
                        <button
                          className="btn-outline pay-btn"
                          onClick={() => {
                            setEditingId(inv.id);
                            setPayAmount(paid);
                          }}
                        >
                          Add Payment
                        </button>
                      )
                    )}
                  </td>

                  <td>
                    <select
                      className="delivery-select"
                      value={inv.deliveryStatus || "PENDING"}
                      onChange={(e) =>
                        updateDelivery(inv, e.target.value)
                      }
                    >
                      <option value="PENDING">Pending</option>
                      <option value="DELIVERED" disabled={balance > 0}>
                        Delivered
                      </option>
                    </select>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
