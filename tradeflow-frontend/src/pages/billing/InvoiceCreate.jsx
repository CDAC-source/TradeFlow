import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Invoice.css";


export default function InvoiceCreate() {
  const navigate = useNavigate();

  const [customers, setCustomers] = useState([]);
  const [machines, setMachines] = useState([]);
  const [spareParts, setSpareParts] = useState([]);

  const [customerId, setCustomerId] = useState("");
  const [items, setItems] = useState([]);

  const [discountPercent, setDiscountPercent] = useState(0);
  const [gstType, setGstType] = useState("CGST_SGST");
  const [gstPercent, setGstPercent] = useState(18);

  useEffect(() => {
  Promise.all([
    fetch("http://localhost:8080/api/customers").then(r => r.json()),
    fetch("http://localhost:8080/api/machines").then(r => r.json()),
    fetch("http://localhost:8080/api/spare-parts").then(r => r.json())
  ])
  .then(([c, m, s]) => {
    setCustomers(c);
    setMachines(m);
    setSpareParts(s);
  })
  .catch(err => {
    console.error("API not reachable", err);
  });
}, []);


  const addItem = () => {
    setItems([...items, { type: "", refId: null, rate: 0, qty: 1 }]);
  };

  const removeItem = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const updateItem = (index, data) => {
    const copy = [...items];
    copy[index] = { ...copy[index], ...data };
    setItems(copy);
  };

  const subtotal = items.reduce((s, i) => s + i.rate * i.qty, 0);
  const discountAmount = (subtotal * discountPercent) / 100;
  const gstAmount = ((subtotal - discountAmount) * gstPercent) / 100;
  const total = subtotal - discountAmount + gstAmount;

  const saveInvoice = async () => {
    if (!customerId) {
      alert("Please select a customer");
      return;
    }

    if (items.length === 0) {
      alert("Add at least one item");
      return;
    }

    if (items.some(i => !i.type || !i.refId)) {
      alert("Please select item for all rows");
      return;
    }

    const payload = {
      customer: { id: customerId },
      items: items.map(i => ({
        machine: i.type === "machine" ? { id: i.refId } : null,
        sparePart: i.type === "spare" ? { id: i.refId } : null,
        rate: i.rate,
        quantity: i.qty
      })),
      discountPercent,
      gstType,
      gstPercent
    };

    try {
      const res = await fetch("http://localhost:8080/api/invoices", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!res.ok) throw new Error("Save failed");

      navigate("/billing/invoices/list");
    } catch (err) {
      console.error(err);
      alert("Failed to save invoice");
    }
  };

  return (
    <div className="invoice-page">
      <div className="invoice-container">
        <h1>Create Invoice</h1>

        {/* CUSTOMER */}
        <div className="form-group">
          <label>Customer</label>
          <select
            value={customerId}
            onChange={e => setCustomerId(Number(e.target.value))}
          >
            <option value="">Select Customer</option>
            {customers.map(c => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>

        {/* ITEMS */}
        <div className="items-table">
          <div className="items-head">
            <div>Item</div>
            <div>Rate</div>
            <div>Qty</div>
            <div>Amount</div>
            <div></div>
          </div>

          {items.map((row, idx) => (
            <div className="items-row" key={idx}>
              <select
                onChange={e => {
                  const [type, id] = e.target.value.split("-");
                  const src = type === "machine" ? machines : spareParts;
                  const selected = src.find(x => x.id === Number(id));

                  updateItem(idx, {
                    type,
                    refId: Number(id),
                    rate: selected?.price || selected?.rate || 0
                  });
                }}
              >
                <option value="">Select Item</option>

                <optgroup label="Machines">
                  {machines.map(m => (
                    <option key={m.id} value={`machine-${m.id}`}>{m.name}</option>
                  ))}
                </optgroup>

                <optgroup label="Spare Parts">
                  {spareParts.map(s => (
                    <option key={s.id} value={`spare-${s.id}`}>{s.name}</option>
                  ))}
                </optgroup>
              </select>

              <div>₹{row.rate}</div>

              <input
                type="number"
                min="1"
                value={row.qty}
                onChange={e => updateItem(idx, { qty: +e.target.value })}
              />

              <div className="amount-cell">₹{(row.rate * row.qty).toFixed(2)}</div>

              <button className="btn danger" onClick={() => removeItem(idx)}>
                Remove
              </button>
            </div>
          ))}
        </div>

        <button className="link-btn" onClick={addItem}>+ Add Item</button>

        {/* SUMMARY */}
        <div className="summary">
          <div className="summary-left">
            <label>Discount (%)</label>
            <input
              value={discountPercent}
              onChange={e => setDiscountPercent(+e.target.value)}
            />

            <label>GST Type</label>
            <select value={gstType} onChange={e => setGstType(e.target.value)}>
              <option value="CGST_SGST">CGST + SGST</option>
              <option value="IGST">IGST</option>
            </select>

            <label>GST (%)</label>
            <input
              value={gstPercent}
              onChange={e => setGstPercent(+e.target.value)}
            />
          </div>

          <div className="summary-right">
            <p>Subtotal: ₹{subtotal.toFixed(2)}</p>
            <p>Discount: -₹{discountAmount.toFixed(2)}</p>
            <p>GST: ₹{gstAmount.toFixed(2)}</p>
            <h2>Total: ₹{total.toFixed(2)}</h2>
          </div>
        </div>

        <button className="btn primary save-btn" onClick={saveInvoice}>
          Save Invoice
        </button>
      </div>
    </div>
  );
}
