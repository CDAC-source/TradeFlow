const API_URL = "http://localhost:8080/api/admin";

export const getAllUsers = async () => {
  const res = await fetch(`${API_URL}/users`);
  if (!res.ok) throw new Error("Failed to load users");
  return res.json();
};

export const updateUserRole = async (id, role) => {
  const res = await fetch(`${API_URL}/users/${id}/role`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ role }),
  });

  if (!res.ok) throw new Error("Failed to update role");
  return res.json();
};
