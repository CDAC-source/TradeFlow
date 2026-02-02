import { Link } from "react-router-dom";
import "./Inventory.css";

export default function InventoryHome() {
  return (
    <div className="inventory-page">
      {/* Header */}
      <div className="inventory-header">
        <h1 className="inventory-title">Inventory Module</h1>
        <p className="inventory-subtitle">
          Manage machines, spare parts, and stock locations efficiently
        </p>
      </div>

      {/* Cards */}
      <div className="inventory-grid">
        {/* Machines */}
        <div className="inventory-tile machines">
          <div className="inventory-icon">
            <i className="fas fa-cogs"></i>
          </div>
          <h4>Machines</h4>
          <p>
            Add, edit and manage all machines in your organization.
          </p>
          <Link to="/machines" className="inventory-link">
            Manage Machines →
          </Link>
        </div>

        {/* Spare Parts */}
        <div className="inventory-tile spares">
          <div className="inventory-icon">
            <i className="fas fa-boxes"></i>
          </div>
          <h4>Spare Parts</h4>
          <p>
            Track spare parts, quantities and rack locations.
          </p>
          {/* IMPORTANT: Goes to SparePartHome */}
          <Link to="/spare-parts" className="inventory-link">
            Manage Spare Parts →
          </Link>
        </div>
      </div>
    </div>
  );
}
