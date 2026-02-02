import { notificationStore } from "../context/NotificationStore";

const API_URL = "http://localhost:8080/api/spare-parts";

export const getSpareParts = async () => {
  const res = await fetch(API_URL);
  return res.json();
};

export const getSparePartById = async (id) => {
  const res = await fetch(`${API_URL}/${id}`);
  return res.json();
};

export const addSparePart = async (data) => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(err);
  }

  notificationStore.add({
    message: `Spare Part "${data.name}" added`,
    type: "add"
  });

  // backend returns NO CONTENT
  return;
};

export const updateSparePart = async (id, data) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Update failed");

  const result = await res.json();

  notificationStore.add({
    message: `Spare Part "${data.name}" updated`,
    type: "update"
  });

  return result;
};

export const deleteSparePart = async (id) => {
  await fetch(`${API_URL}/${id}`, { method: "DELETE" });

  notificationStore.add({
    message: `Spare Part deleted`,
    type: "delete"
  });
};

export const assignRack = async (id, rackRow, rackCol) => {
  const res = await fetch(`${API_URL}/${id}/rack`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ rackRow, rackCol }),
  });

  if (!res.ok) throw new Error("Rack update failed");

  const data = await res.json();

  notificationStore.add({
    message: `Spare Part rack updated`,
    type: "update"
  });

  return data;
};
