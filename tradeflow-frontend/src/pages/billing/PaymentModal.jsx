import { useState } from "react";

export default function PaymentModal({ invoice, onClose, onSaved }) {
  const [paid, setPaid] = useState(invoice.paidAmount);

  const save = async () => {
    const res = await fetch(
      `http://localhost:8080/api/invoices/${invoice.id}/payment`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          paidAmount: paid,
          deliveryStatus: invoice.deliveryStatus
        })
      }
    );

    const updated = await res.json();
    onSaved(prev => prev.map(i => i.id === updated.id ? updated : i));
    onClose();
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h3>Record Payment</h3>

        <p>Total: ₹{invoice.totalAmount}</p>
        <p>Paid: ₹{invoice.paidAmount}</p>

        <input
          type="number"
          value={paid}
          onChange={e => setPaid(Number(e.target.value))}
        />

        <button onClick={save}>Save</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
}
