import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getCustomerById, updateCustomer } from "../../services/customerService";
import "./Customer.css";


export default function CustomerEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [customer, setCustomer] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
  });

  useEffect(() => {
    loadCustomer();
  }, []);

  const loadCustomer = async () => {
    try {
      const data = await getCustomerById(id);
      setCustomer(data);
    } catch (err) {
      alert("Customer not found");
      navigate("/customers");
    }
  };

  const handleChange = (e) => {
    setCustomer({ ...customer, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateCustomer(id, customer);
      navigate("/customers");
    } catch (err) {
      alert("Failed to update customer");
    }
  };

  return (
    <div className="page-container">
      <h2>Edit Customer</h2>

      <form onSubmit={handleSubmit}>
        <input
          name="name"
          value={customer.name}
          onChange={handleChange}
          className="form-control mb-2"
          placeholder="Name"
          required
        />

        <input
          name="email"
          value={customer.email}
          onChange={handleChange}
          className="form-control mb-2"
          placeholder="Email"
          required
        />

        <input
          name="phone"
          value={customer.phone || ""}
          onChange={handleChange}
          className="form-control mb-2"
          placeholder="Phone"
        />

        <input
          name="address"
          value={customer.address || ""}
          onChange={handleChange}
          className="form-control mb-2"
          placeholder="Address"
        />

        <input
          name="city"
          value={customer.city || ""}
          onChange={handleChange}
          className="form-control mb-2"
          placeholder="City"
        />

        <button className="btn btn-warning">Save</button>
        <button
          type="button"
          className="btn btn-secondary ms-2"
          onClick={() => navigate("/customers")}
        >
          Cancel
        </button>
      </form>
    </div>
  );
}
