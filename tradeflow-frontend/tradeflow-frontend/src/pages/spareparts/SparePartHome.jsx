import { Link } from "react-router-dom";
import "./SparePart.css";

export default function SparePartHome() {
  return (
    <div className="spare-page">
      <div className="spare-header">
        <h1>Spare Parts Management</h1>
        <p>Manage spare parts inventory and rack locations</p>
      </div>

      <div className="spare-actions">
        <div className="spare-card featured">
          <h4>Spare Parts List</h4>
          <p>View, add and update spare parts</p>
          <Link to="/spare-parts/list" className="btn btn-primary">
            Go to Spare Part List
          </Link>
        </div>

        <div className="spare-card highlight">
          <h4>Rack Location View</h4>
          <p>Visualize and assign spare parts to rack positions</p>
          <Link to="/spare-parts/rack" className="btn btn-info">
            Rack Location View
          </Link>
        </div>
      </div>
    </div>
  );
}
