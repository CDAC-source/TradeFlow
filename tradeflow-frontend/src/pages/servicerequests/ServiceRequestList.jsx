import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  getServiceRequests,
  deleteServiceRequest
} from "../../services/serviceRequestService";
import "./ServiceRequest.css";

export default function ServiceRequestList() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const data = await getServiceRequests();
    setRequests(Array.isArray(data) ? data : []);
  };

  const handleDelete = async (id, status) => {
    if (status === "Closed") {
      alert("Closed requests cannot be deleted");
      return;
    }

    if (window.confirm("Are you sure?")) {
      await deleteServiceRequest(id);
      load();
    }
  };

  /* ============================
     STATUS HELPERS (SAFE)
  ============================ */

  const normalizeStatus = (status) => {
    if (!status) return "Pending";
    return status; // KEEP ENUM VALUE AS-IS
  };

  const getStatusLabel = (status) => {
    return normalizeStatus(status).replace("_", " ");
  };

  const getStatusClass = (status) => {
  const s = normalizeStatus(status);
  switch (s) {
    case "Pending":
      return "sr-badge sr-badge-pending";
    case "In_Progress":
      return "sr-badge sr-badge-progress";
    case "Closed":
      return "sr-badge sr-badge-closed";
    default:
      return "sr-badge sr-badge-pending";
  }
};

  return (
    <div className="sr-container">
      <div className="sr-card">
        <div className="sr-header">
          <h2 className="sr-title">Service Requests</h2>
          <Link to="/service-requests/add" className="btn btn-danger">
            Log New Request
          </Link>
        </div>

        <table className="table mt-3">
          <thead>
            <tr>
              <th>ID</th>
              <th>Customer</th>
              <th>Machine</th>
              <th>Type</th>
              <th>Status</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {requests.map((r) => (
              <tr key={r.id}>
                <td>{r.id}</td>
                <td>{r.customer?.name || "-"}</td>
                <td>{r.machine?.name || "-"}</td>
                <td>{r.type || "-"}</td>

                <td>
                  <span className={getStatusClass(r.status)}>
                    {getStatusLabel(r.status)}
                  </span>
                </td>

                <td>{r.createdDate || "-"}</td>

                <td>
                  <Link
                    to={`/service-requests/edit/${r.id}`}
                    className="btn btn-warning btn-sm me-2"
                  >
                    Edit
                  </Link>

                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() =>
                      handleDelete(r.id, normalizeStatus(r.status))
                    }
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {requests.length === 0 && (
              <tr>
                <td colSpan="7" className="text-center text-muted">
                  No service requests found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
