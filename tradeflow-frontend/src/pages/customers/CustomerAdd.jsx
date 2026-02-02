import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addCustomer } from "../../services/customerService";
import "./Customer.css";

export default function CustomerAdd() {
  const navigate = useNavigate();

  const [customer, setCustomer] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setCustomer({ ...customer, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await addCustomer(customer);
      navigate("/customers");
    } catch (err) {
      if (err.response && err.response.data) {
        const errors = Object.values(err.response.data).join(", ");
        setError(errors);
    } else {
    setError("Failed to save customer");
  }
  } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      <h2 className="page-title">Add Customer</h2>

      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit}>
        <input
          name="name"
          className="form-control mb-2"
          placeholder="Name"
          value={customer.name}
          onChange={handleChange}
          required
        />

        <input
          name="email"
          type="email"
          className="form-control mb-2"
          placeholder="Email"
          value={customer.email}
          onChange={handleChange}
          required
        />

        <input
          name="phone"
          className="form-control mb-2"
          placeholder="Phone"
          value={customer.phone}
          onChange={handleChange}
        />

        <input
          name="address"
          className="form-control mb-2"
          placeholder="Address"
          value={customer.address}
          onChange={handleChange}
        />

        <input
          name="city"
          className="form-control mb-3"
          placeholder="City"
          value={customer.city}
          onChange={handleChange}
        />

        <button
          type="submit"
          className="btn btn-success"
          disabled={loading}
        >
          {loading ? "Saving..." : "Save"}
        </button>

        <button
          type="button"
          className="btn btn-secondary ms-2"
          onClick={() => navigate("/customers")}
          disabled={loading}
        >
          Cancel
        </button>
      </form>
    </div>
  );
}
