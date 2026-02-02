import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getMachineById, updateMachine } from "../../services/machineService";
import { getCustomers } from "../../services/customerService";


export default function MachineEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [machine, setMachine] = useState({
    name: "",
    model: "",
    price: "",
    serial: "",
    purchaseDate: "",
    customerId: ""
  });

  // =========================
  // LOAD MACHINE + CUSTOMERS
  // =========================
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [machineData, customerData] = await Promise.all([
        getMachineById(id),
        getCustomers()
      ]);

      setMachine({
        name: machineData.name || "",
        model: machineData.model || "",
        price: machineData.price ?? "",
        serial: machineData.serial || "",
        purchaseDate: machineData.purchaseDate || "",
        customerId: machineData.customer?.id || ""
      });

      setCustomers(customerData);
    } catch (err) {
      console.error(err);
      setError("Failed to load machine details");
      navigate("/machines");
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // HANDLE CHANGE
  // =========================
  const handleChange = (e) => {
    setMachine({ ...machine, [e.target.name]: e.target.value });
  };

  // =========================
  // SUBMIT UPDATE
  // =========================
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!machine.customerId) {
      setError("Please select a customer");
      return;
    }

    const payload = {
      name: machine.name,
      model: machine.model,
      serial: machine.serial,
      purchaseDate: machine.purchaseDate,
      price: Number(machine.price),
      customer: {
        id: Number(machine.customerId)
      }
    };

    try {
      await updateMachine(id, payload);
      navigate("/machines");
    } catch (err) {
      console.error(err);
      setError("Failed to update machine");
    }
  };

  if (loading) {
    return <div className="page-container">Loading...</div>;
  }

  return (
    <div className="page-container">
      <h2>Edit Machine</h2>

      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit}>
        <input
          name="name"
          className="form-control mb-2"
          placeholder="Machine Name"
          value={machine.name}
          onChange={handleChange}
          required
        />

        <input
          name="model"
          className="form-control mb-2"
          placeholder="Model"
          value={machine.model}
          onChange={handleChange}
          required
        />

        <input
          name="price"
          type="number"
          className="form-control mb-2"
          placeholder="Price"
          value={machine.price}
          onChange={handleChange}
          required
        />

        <input
          name="serial"
          className="form-control mb-2"
          placeholder="Serial Number"
          value={machine.serial}
          onChange={handleChange}
          required
        />

        <input
          type="date"
          name="purchaseDate"
          className="form-control mb-2"
          value={machine.purchaseDate}
          onChange={handleChange}
          required
        />

        <select
          name="customerId"
          className="form-control mb-3"
          value={machine.customerId}
          onChange={handleChange}
          required
        >
          <option value="">Select Customer</option>
          {customers.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>

        <button className="btn btn-success">Update</button>

        <button
          type="button"
          className="btn btn-secondary ms-2"
          onClick={() => navigate("/machines")}
        >
          Cancel
        </button>
      </form>
    </div>
  );
}
