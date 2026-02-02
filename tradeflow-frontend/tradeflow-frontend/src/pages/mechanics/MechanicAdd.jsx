import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addMechanic } from "../../services/mechanicService";

export default function MechanicAdd() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", phone: "" });

  const submit = async (e) => {
    e.preventDefault();
    await addMechanic(form);
    navigate("/mechanics");
  };

  return (
    <div className="sr-container">
      <div className="sr-card">
        <h2 className="sr-title">Add Mechanic</h2>

        <form onSubmit={submit}>
          <label>Name</label>
          <input
            className="form-control mb-3"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />

          <label>Phone</label>
          <input
            className="form-control mb-3"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            required
          />

          <button className="btn btn-danger">Save</button>
        </form>
      </div>
    </div>
  );
}
