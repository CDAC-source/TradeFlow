import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCustomers, deleteCustomer } from "../../services/customerService";
import "./Customer.css";

export default function CustomerList() {
  const [customers, setCustomers] = useState([]);
  const [search, setSearch] = useState("");
  const [sortType, setSortType] = useState("");

  useEffect(() => {
    loadCustomers();
  }, []);

  const loadCustomers = async () => {
    try {
      const data = await getCustomers();
      setCustomers(data);
    } catch (err) {
      console.error("Failed to load customers", err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this customer?")) return;
    await deleteCustomer(id);
    loadCustomers();
  };

  const filteredCustomers = customers
    .filter((c) =>
      `${c.name} ${c.email} ${c.phone || ""} ${c.address || ""} ${c.city || ""}`
        .toLowerCase()
        .includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (sortType === "az") return a.name.localeCompare(b.name);
      if (sortType === "za") return b.name.localeCompare(a.name);
      if (sortType === "city")
        return (a.city || "").localeCompare(b.city || "");
      return 0;
    });

  return (
    <div className="customer-page">
      <div className="customer-card">
        <div className="customer-header">
          <h2>Customer Management</h2>
          <Link to="/customers/add" className="btn btn-success">
            Add Customer
          </Link>
        </div>

        <div className="customer-toolbar">
          <input
            type="text"
            placeholder="Search by name, email, phone, address or city..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select onChange={(e) => setSortType(e.target.value)}>
            <option value="">Sort / Filter</option>
            <option value="az">Name A → Z</option>
            <option value="za">Name Z → A</option>
            <option value="city">City</option>
          </select>
        </div>

        <table className="table customer-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Address</th>
              <th>City</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredCustomers.map((c) => (
              <tr key={c.id}>
                <td>{c.id}</td>
                <td>{c.name}</td>
                <td>{c.email}</td>
                <td>{c.phone || "-"}</td>
                <td>{c.address || "-"}</td>
                <td>{c.city || "-"}</td>
                <td>
                  <Link
                    to={`/customers/edit/${c.id}`}
                    className="btn btn-warning btn-sm me-2"
                  >
                    Edit
                  </Link>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(c.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {filteredCustomers.length === 0 && (
              <tr>
                <td colSpan="7" className="text-center">
                  No customers found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
