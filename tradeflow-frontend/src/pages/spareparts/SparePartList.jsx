import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  getSpareParts,
  deleteSparePart,
} from "../../services/sparePartService";
import "./SparePart.css";

export default function SparePartList() {
  const [parts, setParts] = useState([]);
  const [search, setSearch] = useState("");
  const [sortType, setSortType] = useState("");

  useEffect(() => {
    loadParts();
  }, []);

  const loadParts = async () => {
    const data = await getSpareParts();
    setParts(data);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this spare part?")) return;
    await deleteSparePart(id);
    loadParts();
  };

  const filtered = parts
    .filter((p) =>
      `${p.name} ${p.hsn} ${p.quantity}`
        .toLowerCase()
        .includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (sortType === "name-az") return a.name.localeCompare(b.name);
      if (sortType === "name-za") return b.name.localeCompare(a.name);
      if (sortType === "hsn") return a.hsn.localeCompare(b.hsn);
      if (sortType === "qty-high") return b.quantity - a.quantity;
      if (sortType === "qty-low") return a.quantity - b.quantity;
      return 0;
    });

  return (
    <div className="spare-page">
      <div className="spare-card featured">
        {/* HEADER */}
        <div className="spare-list-header">
          <h2>Spare Parts</h2>
          <Link to="/spare-parts/add" className="btn btn-success">
            + Add Spare Part
          </Link>
        </div>

        {/* SEARCH + SORT */}
        <div className="spare-toolbar modern">
          <input
            placeholder="Search by name, HSN or quantity..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select onChange={(e) => setSortType(e.target.value)}>
            <option value="">Sort / Filter</option>
            <option value="name-az">Name A → Z</option>
            <option value="name-za">Name Z → A</option>
            <option value="hsn">HSN</option>
            <option value="qty-high">Qty High → Low</option>
            <option value="qty-low">Qty Low → High</option>
          </select>
        </div>

        {/* TABLE */}
        <div className="table-responsive">
          <table className="table spare-table modern">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>HSN</th>
                <th>Quantity</th>
                <th>Compatible Machines</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((p) => (
                <tr key={p.id}>
                  <td>{p.id}</td>
                  <td className="fw-semibold">{p.name}</td>
                  <td>{p.hsn}</td>
                  <td>
                    <span
                      className={`qty-badge ${
                        p.quantity < 50 ? "low" : "normal"
                      }`}
                    >
                      {p.quantity}
                    </span>
                  </td>
                  <td>
                    {p.machines?.length
                      ? p.machines.map((m) => m.name).join(", ")
                      : "-"}
                  </td>
                  <td className="text-center">
                    <Link
                      to={`/spare-parts/edit/${p.id}`}
                      className="btn btn-outline-primary btn-sm me-2"
                    >
                      Edit
                    </Link>
                    <button
                      className="btn btn-outline-danger btn-sm"
                      onClick={() => handleDelete(p.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}

              {filtered.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center text-muted py-4">
                    No spare parts found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
