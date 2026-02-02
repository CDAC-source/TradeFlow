import { notificationStore } from "../context/NotificationStore";

const API_URL = "http://localhost:8080/api/mechanics";

// ✅ GET ALL
export const getMechanics = async () => {
  const res = await fetch(API_URL);

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || "Failed to load mechanics");
  }

  return res.json();
};

// ✅ GET BY ID
export const getMechanicById = async (id) => {
  const res = await fetch(`${API_URL}/${id}`);

  if (!res.ok) {
    throw new Error("Mechanic not found");
  }

  return res.json();
};

// ✅ ADD
export const addMechanic = async (mechanic) => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(mechanic),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(err || "Failed to add mechanic");
  }

  const data = await res.json();

  notificationStore.add({
    message: `Mechanic "${mechanic.name}" added`,
    type: "add",
  });

  return data;
};

// ✅ UPDATE
export const updateMechanic = async (id, mechanic) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(mechanic),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(err || "Failed to update mechanic");
  }

  const data = await res.json();

  notificationStore.add({
    message: `Mechanic "${mechanic.name}" updated`,
    type: "update",
  });

  return data;
};

// ✅ DELETE
export const deleteMechanic = async (id) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error("Failed to delete mechanic");
  }

  notificationStore.add({
    message: "Mechanic deleted",
    type: "delete",
  });
};
