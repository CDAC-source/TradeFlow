import { notificationStore } from "../context/NotificationStore";

const API_URL = "http://localhost:8080/api/machines";

export const getMachines = async () => {
  const res = await fetch(API_URL);
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text);
  }
  return res.json();
};

export const getMachineById = async (id) => {
  const res = await fetch(`${API_URL}/${id}`);
  if (!res.ok) throw new Error("Machine not found");
  return res.json();
};

export const addMachine = async (machine) => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(machine),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(err);
  }

  const data = await res.json();

  notificationStore.add({
    message: `Machine "${machine.name}" added`,
    type: "add"
  });

  return data;
};

export const updateMachine = async (id, machine) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(machine),
  });

  if (!res.ok) throw new Error("Update failed");

  const data = await res.json();

  notificationStore.add({
    message: `Machine "${machine.name}" updated`,
    type: "update"
  });

  return data;
};

export const deleteMachine = async (id) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) throw new Error("Delete failed");

  notificationStore.add({
    message: `Machine deleted`,
    type: "delete"
  });
};
