import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getSparePartById,
  updateSparePart,
} from "../../services/sparePartService";
import { getMachines } from "../../services/machineService";


export default function SparePartEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

 const [part, setPart] = useState({
  name: "",
  hsn: "",
  quantity: "",
  price: ""
});

  const [machines, setMachines] = useState([]);
  const [selectedMachines, setSelectedMachines] = useState([]);
  const [initialMachines, setInitialMachines] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  /* =========================
     LOAD DATA
  ========================= */
  useEffect(() => {
    loadData();
    // eslint-disable-next-line
  }, []);

  const loadData = async () => {
    try {
      const [partData, machineData] = await Promise.all([
        getSparePartById(id),
        getMachines(),
      ]);

      setPart({
        name: partData.name || "",
        hsn: partData.hsn || "",
        quantity: partData.quantity ?? "",
      });

      setMachines(machineData || []);

      const machineIds = partData.machines
        ? partData.machines.map((m) => m.id)
        : [];

      setSelectedMachines(machineIds);
      setInitialMachines(machineIds);
    } catch (err) {
      console.error(err);
      setError("Failed to load spare part");
    }
  };

  /* =========================
     INPUT CHANGE
  ========================= */
  const handleChange = (e) => {
    setPart({ ...part, [e.target.name]: e.target.value });
  };

  /* =========================
     CHECKBOX TOGGLE
  ========================= */
  const toggleMachine = (machineId) => {
    setSelectedMachines((prev) =>
      prev.includes(machineId)
        ? prev.filter((id) => id !== machineId)
        : [...prev, machineId]
    );
  };

  /* =========================
     SUBMIT
  ========================= */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      setLoading(true);

      const payload = {
          name: part.name.trim(),
          hsn: part.hsn.trim(),
          quantity: Number(part.quantity),
          price: Number(part.price)
          };

      const sortedSelected = [...selectedMachines].sort();
      const sortedInitial = [...initialMachines].sort();

      // Send machines ONLY if changed
      if (JSON.stringify(sortedSelected) !== JSON.stringify(sortedInitial)) {
        payload.machines = sortedSelected.map((id) => ({ id }));
      }

      await updateSparePart(id, payload);
      navigate("/spare-parts/list");
    } catch (err) {
      console.error(err);
      setError("Failed to update spare part");
    } finally {
      setLoading(false);
    }
  };

  /* =========================
     UI
  ========================= */
  return (
    <div className="page-container">
      <h2>Edit Spare Part</h2>

      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit}>
        {/* NAME */}
        <input
          name="name"
          className="form-control mb-2"
          value={part.name}
          onChange={handleChange}
          placeholder="Spare part name"
          required
        />

        {/* HSN */}
        <input
          name="hsn"
          className="form-control mb-2"
          value={part.hsn}
          onChange={handleChange}
          placeholder="HSN code"
          required
        />

        {/* QUANTITY */}
        <input
          name="quantity"
          type="number"
          className="form-control mb-3"
          value={part.quantity}
          onChange={handleChange}
          placeholder="Quantity"
          min="0"
          required
        />

        <input
          name="price"
          type="number"
          className="form-control mb-2"
          value={part.price}
          onChange={handleChange}
          placeholder="Price"
          required
        />


        {/* =========================
           CHECKBOX MACHINE LIST
        ========================= */}
        <label className="fw-bold mb-2 d-block">
          Compatible Machines
        </label>

        <div
          className="border rounded p-3 mb-3"
          style={{ maxHeight: "220px", overflowY: "auto" }}
        >
          {machines.map((m) => (
            <div key={m.id} className="form-check mb-2">
              <input
                className="form-check-input"
                type="checkbox"
                id={`machine-${m.id}`}
                checked={selectedMachines.includes(m.id)}
                onChange={() => toggleMachine(m.id)}
              />
              <label
                className="form-check-label"
                htmlFor={`machine-${m.id}`}
              >
                {m.name}
              </label>
            </div>
          ))}

          {machines.length === 0 && (
            <div className="text-muted">No machines available</div>
          )}
        </div>

        {/* ACTIONS */}
        <button
          type="submit"
          className="btn btn-warning"
          disabled={loading}
        >
          {loading ? "Saving..." : "Save"}
        </button>

        <button
          type="button"
          className="btn btn-secondary ms-2"
          onClick={() => navigate("/spare-parts/list")}
          disabled={loading}
        >
          Cancel
        </button>
      </form>
    </div>
  );
}
