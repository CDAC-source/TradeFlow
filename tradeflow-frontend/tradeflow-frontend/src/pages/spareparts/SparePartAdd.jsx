import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { addSparePart } from "../../services/sparePartService";
import { getMachines } from "../../services/machineService";

export default function SparePartAdd() {
  const navigate = useNavigate();

  const [part, setPart] = useState({
    name: "",
    hsn: "",
    quantity: "",
    price: ""
  });

  const [machines, setMachines] = useState([]);
  const [selectedMachines, setSelectedMachines] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getMachines().then(setMachines);
  }, []);

  const handleChange = (e) => {
    setPart({ ...part, [e.target.name]: e.target.value });
  };

  const totalValue =
    Number(part.quantity || 0) * Number(part.price || 0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      setLoading(true);

      await addSparePart({
        name: part.name.trim(),
        hsn: part.hsn.trim(),
        quantity: Number(part.quantity),
        price: Number(part.price),
        machines: selectedMachines.map(id => ({ id }))
      });

      navigate("/spare-parts/list");
    } catch (err) {
      setError("Failed to save spare part");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      <h2>Add Spare Part</h2>

      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit}>
        <input
          name="name"
          className="form-control mb-2"
          placeholder="Spare Part Name"
          value={part.name}
          onChange={handleChange}
          required
        />

        <input
          name="hsn"
          className="form-control mb-2"
          placeholder="HSN Code"
          value={part.hsn}
          onChange={handleChange}
          required
        />

        <input
          name="price"
          type="number"
          className="form-control mb-2"
          placeholder="Price per unit (₹)"
          value={part.price}
          onChange={handleChange}
          required
        />

        <input
          name="quantity"
          type="number"
          className="form-control mb-2"
          placeholder="Quantity"
          value={part.quantity}
          onChange={handleChange}
          required
        />

        {/* ✅ LIVE TOTAL */}
        <input
          className="form-control mb-3"
          value={`Total Value: ₹${totalValue.toFixed(2)}`}
          readOnly
        />

        <label className="fw-bold">Compatible Machines</label>
        <select
          multiple
          className="form-control mb-3"
          value={selectedMachines}
          onChange={(e) =>
            setSelectedMachines(
              Array.from(e.target.selectedOptions, o => Number(o.value))
            )
          }
        >
          {machines.map(m => (
            <option key={m.id} value={m.id}>{m.name}</option>
          ))}
        </select>

        <button className="btn btn-success" disabled={loading}>
          Save
        </button>

        <button
          type="button"
          className="btn btn-secondary ms-2"
          onClick={() => navigate("/spare-parts/list")}
        >
          Cancel
        </button>
      </form>
    </div>
  );
}
