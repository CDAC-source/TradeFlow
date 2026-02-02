import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getMechanicById, updateMechanic } from "../../services/mechanicService";

export default function MechanicEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", phone: "" });

  useEffect(() => {
    getMechanicById(id).then(setForm);
  }, [id]);

  const submit = async (e) => {
    e.preventDefault();
    await updateMechanic(id, form);
    navigate("/mechanics");
  };

  return (
    <div className="sr-container">
      <div className="sr-card">
        <h2 className="sr-title">Edit Mechanic</h2>

        <form onSubmit={submit}>
          <label>Name</label>
          <input
            className="form-control mb-3"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          <label>Phone</label>
          <input
            className="form-control mb-3"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />

          <button className="btn btn-warning">Update</button>
        </form>
      </div>
    </div>
  );
}
