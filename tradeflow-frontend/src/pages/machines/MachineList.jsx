import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getMachines, deleteMachine } from "../../services/machineService";
import "./Machine.css";

export default function MachineList() {
  const [machines, setMachines] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMachines();
  }, []);

  const loadMachines = async () => {
    try {
      const data = await getMachines();
      setMachines(data);
    } catch (err) {
      console.error(err);
      alert("Failed to load machines");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this machine?")) return;
    await deleteMachine(id);
    loadMachines();
  };

  const filtered = machines.filter((m) =>
    `${m.name} ${m.model} ${m.serial} ${m.customer?.name || ""}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  if (loading) return <div className="machine-page">Loading...</div>;

  return (
    <div className="machine-page">
      <div className="machine-card">
        <div className="machine-header">
          <h2>Machines</h2>
          <Link to="/machines/add" className="btn btn-success">
            Add Machine
          </Link>
        </div>

        <input
          className="form-control mb-3"
          placeholder="Search machines or customer..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <table className="table machine-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Model</th>
              <th>Serial</th>
              <th>Purchase Date</th>
              <th>Customer</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((m) => (
              <tr key={m.id}>
                <td>{m.id}</td>
                <td>{m.name}</td>
                <td>{m.model}</td>
                <td>{m.serial}</td>
                <td>{m.purchaseDate}</td>
                <td>{m.customer?.name || "-"}</td>
                <td>
                  <Link
                      to={`/machines/edit/${m.id}`}
                       className="btn btn-warning btn-sm me-2"
                  >
                   Edit
                  </Link>

                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(m.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {filtered.length === 0 && (
              <tr>
                <td colSpan="7" className="text-center">
                  No machines found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
