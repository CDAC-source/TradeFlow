import { useEffect, useState, useRef } from "react";
import { getSpareParts, assignRack } from "../../services/sparePartService";
import "./SparePart.css";

const SIZE = 50;

export default function SparePartRack() {
  const [parts, setParts] = useState([]);
  const [selectedPart, setSelectedPart] = useState("");
  const [row, setRow] = useState("");
  const [col, setCol] = useState("");
  const [foundLocation, setFoundLocation] = useState(null);

  const tableRef = useRef(null);

  useEffect(() => {
    loadParts();
  }, []);

  const loadParts = async () => {
    const data = await getSpareParts();
    setParts(data);
  };

  /* =========================
     ZONE HELPERS
  ========================= */
  const getZoneLetter = (row) => {
    if (row <= 10) return "A";
    if (row <= 20) return "B";
    if (row <= 30) return "C";
    if (row <= 40) return "D";
    return "E";
  };

  const getZoneLabel = (row, col) => {
    const zone = getZoneLetter(row);
    const section = Math.ceil(col / 10);
    return `${zone}${section}`;
  };

  /* =========================
     FIND PART AT CELL
  ========================= */
  const getPartAt = (r, c) =>
    parts.find((p) => p.rackRow === r && p.rackCol === c);

  /* =========================
     CELL CLICK
  ========================= */
  const handleCellClick = (r, c) => {
    setRow(r);
    setCol(c);
  };

  /* =========================
     ASSIGN / UPDATE RACK
  ========================= */
  const handleAssign = async (e) => {
    e.preventDefault();
    await assignRack(selectedPart, row, col);
    setSelectedPart("");
    setRow("");
    setCol("");
    setFoundLocation(null);
    loadParts();
  };

  /* =========================
     FIND LOCATION
  ========================= */
  const handleFindLocation = () => {
    const part = parts.find((p) => p.id === Number(selectedPart));

    if (!part || !part.rackRow || !part.rackCol) {
      setFoundLocation(null);
      alert("This spare part is not assigned to any rack.");
      return;
    }

    setFoundLocation({
      row: part.rackRow,
      col: part.rackCol,
    });

    tableRef.current?.scrollTo({
      top: part.rackRow * 16,
      left: part.rackCol * 16,
      behavior: "smooth",
    });
  };

  return (
    <div className="rack-page">
      <div className="rack-header">
        <h2>Spare Parts Rack</h2>
        <p>50 × 50 Rack Layout — assign or find spare parts</p>
      </div>

      {/* ================= ZONE LEGEND ================= */}
      <div className="zone-legend">
        <span className="zone-A">Zone A</span>
        <span className="zone-B">Zone B</span>
        <span className="zone-C">Zone C</span>
        <span className="zone-D">Zone D</span>
        <span className="zone-E">Zone E</span>
      </div>

      <div className="rack-layout">
        {/* ================= GRID ================= */}
        <div className="rack-grid" ref={tableRef}>
          <table className="rack-table">
            <tbody>
              {/* COLUMN NUMBERS */}
              <tr>
                <th className="rack-corner"></th>
                {Array.from({ length: SIZE }).map((_, c) => (
                  <th key={c} className="rack-col-header">
                    {c + 1}
                  </th>
                ))}
              </tr>

              {/* ROWS */}
              {Array.from({ length: SIZE }).map((_, r) => (
                <tr key={r}>
                  <th className="rack-row-header">{r + 1}</th>

                  {Array.from({ length: SIZE }).map((_, c) => {
                    const part = getPartAt(r + 1, c + 1);
                    const isFound =
                      foundLocation &&
                      foundLocation.row === r + 1 &&
                      foundLocation.col === c + 1;

                    return (
                      <td
                        key={c}
                        className={`rack-cell 
                          zone-${getZoneLetter(r + 1)}
                          ${part ? "occupied" : "empty"}
                          ${isFound ? "highlight" : ""}
                        `}
                        title={
                          part
                            ? `${part.name} | Zone ${getZoneLabel(
                                r + 1,
                                c + 1
                              )}`
                            : `Zone ${getZoneLabel(r + 1, c + 1)}`
                        }
                        onClick={() => handleCellClick(r + 1, c + 1)}
                      >
                        {part && (
                          <span className="rack-text">{part.name}</span>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ================= PANEL ================= */}
        <div className="rack-panel">
          <h5>Assign / Find Spare Part</h5>

          <label>Spare Part</label>
          <select
            className="form-control mb-2"
            value={selectedPart}
            onChange={(e) => setSelectedPart(e.target.value)}
          >
            <option value="">Select Part</option>
            {parts.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>

          <button
            type="button"
            className="btn btn-info w-100 mb-3"
            onClick={handleFindLocation}
            disabled={!selectedPart}
          >
            Find Location
          </button>

          {foundLocation && (
            <div className="alert alert-success p-2 text-center">
              📍 Located at <strong>Row {foundLocation.row}</strong>,{" "}
              <strong>Column {foundLocation.col}</strong>
            </div>
          )}

          <hr />

          <form onSubmit={handleAssign}>
            <label>Row</label>
            <input
              type="number"
              min="1"
              max={SIZE}
              className="form-control mb-2"
              value={row}
              onChange={(e) => setRow(e.target.value)}
              required
            />

            <label>Column</label>
            <input
              type="number"
              min="1"
              max={SIZE}
              className="form-control mb-3"
              value={col}
              onChange={(e) => setCol(e.target.value)}
              required
            />

            <button className="btn btn-success w-100">
              Assign / Update Rack
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
