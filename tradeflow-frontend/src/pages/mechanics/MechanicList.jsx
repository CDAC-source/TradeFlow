import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getMechanics, deleteMechanic } from "../../services/mechanicService";

export default function MechanicList() {
  const [mechanics, setMechanics] = useState([]);

  const load = async () => {
    setMechanics(await getMechanics());
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="sr-container">
      <div className="sr-card">
        <div className="sr-header">
          <h2 className="sr-title">Mechanics</h2>
          <Link to="/mechanics/add" className="btn btn-danger">
            Add Mechanic
          </Link>
        </div>

        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Phone</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {mechanics.map((m) => (
              <tr key={m.id}>
                <td>{m.id}</td>
                <td>{m.name}</td>
                <td>{m.phone}</td>
                <td>
                  <Link
                    to={`/mechanics/edit/${m.id}`}
                    className="btn btn-warning btn-sm me-2"
                  >
                    Edit
                  </Link>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={async () => {
                      if (window.confirm("Delete mechanic?")) {
                        await deleteMechanic(m.id);
                        load();
                      }
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
