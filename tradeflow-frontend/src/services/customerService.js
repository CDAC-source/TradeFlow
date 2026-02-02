import { notificationStore } from "../context/NotificationStore";

const API_URL = "http://localhost:8080/api/customers";

export const getCustomers = async () => {
  const res = await fetch(API_URL);

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text);
  }

  return res.json();
};

export const getCustomerById = async (id) => {
  const res = await fetch(`${API_URL}/${id}`);

  if (!res.ok) {
    throw new Error("Customer not found");
  }

  return res.json();
};

export const addCustomer = async (customer) => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(customer),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(err);
  }

  const data = await res.json();

  notificationStore.add({
    message: `Customer "${customer.name}" added`,
    type: "add",
  });

  return data;
};

export const updateCustomer = async (id, customer) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(customer),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(err);
  }

  const data = await res.json();

  notificationStore.add({
    message: `Customer "${customer.name}" updated`,
    type: "update",
  });

  return data;
};

export const deleteCustomer = async (id) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error("Delete failed");
  }

  notificationStore.add({
    message: `Customer deleted`,
    type: "delete",
  });
};
