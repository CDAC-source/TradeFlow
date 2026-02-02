import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCustomers } from "../../services/customerService";
import { addMachine } from "../../services/machineService";


export default function MachineAdd() {
  const navigate = useNavigate();

  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

const [machine, setMachine] = useState({
  name: "",
  model: "",
  serial: "",
  purchaseDate: "",
  price: "",
  customerId: "",
});

  /* LOAD CUSTOMERS */
  useEffect(() => {
    loadCustomers();
  }, []);

  const loadCustomers = async () => {
    try {
      const data = await getCustomers();
      setCustomers(data);
    } catch (err) {
      console.error(err);
      setError("Failed to load customers");
    }
  };

  const handleChange = (e) => {
    setMachine({ ...machine, [e.target.name]: e.target.value });
  };

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
      id: Number(machine.customerId),
      },
    };

    try {
      setLoading(true);
      await addMachine(payload);
      navigate("/machines");
    } catch (err) {
      console.error(err);
      setError("Failed to save machine. Please check all fields.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      <h2>Add Machine</h2>

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

        <button className="btn btn-success" disabled={loading}>
          {loading ? "Saving..." : "Save"}
        </button>

        <button
          type="button"
          className="btn btn-secondary ms-2"
          onClick={() => navigate("/machines")}
          disabled={loading}
        >
          Cancel
        </button>
      </form>
    </div>
  );
}
