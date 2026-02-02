import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getServiceRequestById,
  updateServiceRequest
} from "../../services/serviceRequestService";
import { getMechanics } from "../../services/mechanicService";
import "./ServiceRequest.css";

export default function ServiceRequestEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState(null);
  const [mechanics, setMechanics] = useState([]);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const sr = await getServiceRequestById(id);
    setForm(sr);
    setMechanics(await getMechanics());
  };

  if (!form) return null;

  const submit = async (e) => {
    e.preventDefault();

    try {
      // ✅ send full object so backend cannot ignore status
      await updateServiceRequest(id, {
        ...form,
        mechanic: form.mechanic
          ? { id: Number(form.mechanic.id) }
          : null
      });

      navigate("/service-requests");
    } catch (err) {
      alert(
        err.response?.data?.message ||
          "Failed to update service request"
      );
    }
  };

  return (
    <div className="sr-container">
      <div className="sr-card">
        <h2 className="sr-title">Edit Service Request</h2>

        <form onSubmit={submit}>
          {/* TYPE */}
          <label>Type</label>
          <input
            className="form-control mb-3"
            value={form.type || ""}
            onChange={(e) =>
              setForm({ ...form, type: e.target.value })
            }
          />

          {/* DESCRIPTION */}
          <label>Description</label>
          <textarea
            className="form-control mb-3"
            value={form.description || ""}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
          />

          {/* STATUS – ALL OPTIONS ALWAYS */}
          <label>Status</label>
          <select
            className="form-control mb-3"
            value={form.status || "Pending"}
            onChange={(e) =>
              setForm({ ...form, status: e.target.value })
            }
          >
            <option value="Pending">Pending</option>
            <option value="In_Progress">In Progress</option>
            <option value="Closed">Closed</option>
          </select>

          {/* MECHANIC */}
          <label>Assign Mechanic</label>
          <select
            className="form-control mb-4"
            value={form.mechanic?.id || ""}
            onChange={(e) =>
              setForm({
                ...form,
                mechanic: e.target.value
                  ? { id: Number(e.target.value) }
                  : null
              })
            }
          >
            <option value="">-- None --</option>
            {mechanics.map((m) => (
              <option key={m.id} value={m.id}>
                {m.name}
              </option>
            ))}
          </select>

          {/* UPDATE ALWAYS VISIBLE */}
          <button className="btn btn-warning">
            Update
          </button>
        </form>
      </div>
    </div>
  );
}
