import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { addServiceRequest } from "../../services/serviceRequestService";
import { getMechanics } from "../../services/mechanicService";
import { getMachines } from "../../services/machineService"; // 👈 ADD THIS
import { useData } from "../../context/DataContext";
import "./ServiceRequest.css";

export default function ServiceRequestAdd() {
  const navigate = useNavigate();
  const { customers, loading } = useData();

  const [allMachines, setAllMachines] = useState([]); // ✅ MASTER
  const [customerId, setCustomerId] = useState("");
  const [machineId, setMachineId] = useState("");
  const [mechanicId, setMechanicId] = useState("");
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [mechanics, setMechanics] = useState([]);

  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    const [machineData, mechanicData] = await Promise.all([
      getMachines(),
      getMechanics(),
    ]);

    setAllMachines(machineData || []);
    setMechanics(mechanicData || []);
  };

  // ✅ SAFE FILTER (always correct)
  const filteredMachines = customerId
    ? allMachines.filter(
        (m) => String(m.customer?.id) === String(customerId)
      )
    : [];

  const submit = async (e) => {
    e.preventDefault();

    if (!customerId) {
      alert("Please select a customer");
      return;
    }

    const payload = {
      type,
      description,
      customer: { id: Number(customerId) },
    };

    if (machineId) payload.machine = { id: Number(machineId) };
    if (mechanicId) payload.mechanic = { id: Number(mechanicId) };

    await addServiceRequest(payload);
    navigate("/service-requests");
  };

  if (loading) {
    return (
      <div className="sr-container">
        <div className="sr-card text-center">
          <p>Loading data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="sr-container">
      <div className="sr-card">
        <h2 className="sr-title">Log New Service Request / Complaint</h2>

        <form onSubmit={submit}>
          <label>Customer</label>
          <select
            className="form-control mb-3"
            value={customerId}
            onChange={(e) => {
              setCustomerId(e.target.value);
              setMachineId("");
            }}
            required
          >
            <option value="">Select Customer</option>
            {customers.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>

          <label>Machine (optional)</label>
          <select
            className="form-control mb-3"
            value={machineId}
            onChange={(e) => setMachineId(e.target.value)}
            disabled={!customerId || filteredMachines.length === 0}
          >
            <option value="">-- None --</option>
            {filteredMachines.map((m) => (
              <option key={m.id} value={m.id}>
                {m.name}
              </option>
            ))}
          </select>

          <label>Request Type</label>
          <input
            className="form-control mb-3"
            value={type}
            onChange={(e) => setType(e.target.value)}
            required
          />

          <label>Description</label>
          <textarea
            className="form-control mb-3"
            rows="4"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />

          <label>Assign Mechanic (optional)</label>
          <select
            className="form-control mb-4"
            value={mechanicId}
            onChange={(e) => setMechanicId(e.target.value)}
          >
            <option value="">-- None --</option>
            {mechanics.map((m) => (
              <option key={m.id} value={m.id}>
                {m.name}
              </option>
            ))}
          </select>

          <button className="btn btn-danger me-2">Submit</button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => navigate("/service-requests")}
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
}
