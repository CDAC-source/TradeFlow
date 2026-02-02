import axios from "axios";
import { notificationStore } from "../context/NotificationStore";

const API = "http://localhost:8080/api/service-requests";

/* =========================
   GET ALL SERVICE REQUESTS
========================= */
export const getServiceRequests = async () => {
  try {
    const res = await axios.get(API);
    return res.data;
  } catch (err) {
    throw new Error(
      err.response?.data || "Failed to fetch service requests"
    );
  }
};

/* =========================
   GET SERVICE REQUEST BY ID
========================= */
export const getServiceRequestById = async (id) => {
  try {
    const res = await axios.get(`${API}/${id}`);
    return res.data;
  } catch (err) {
    throw new Error("Service request not found");
  }
};

/* =========================
   ADD SERVICE REQUEST
========================= */
export const addServiceRequest = async (data) => {
  try {
    const res = await axios.post(API, data);

    notificationStore.add({
      message: "Service request created successfully",
      type: "add",
    });

    return res.data;
  } catch (err) {
    throw new Error(
      err.response?.data || "Failed to create service request"
    );
  }
};

/* =========================
   UPDATE SERVICE REQUEST
========================= */
export const updateServiceRequest = async (id, data) => {
  try {
    const res = await axios.put(`${API}/${id}`, data);

    notificationStore.add({
      message: "Service request updated successfully",
      type: "update",
    });

    return res.data;
  } catch (err) {
    throw new Error(
      err.response?.data || "Failed to update service request"
    );
  }
};

/* =========================
   DELETE SERVICE REQUEST
========================= */
export const deleteServiceRequest = async (id) => {
  try {
    await axios.delete(`${API}/${id}`);

    notificationStore.add({
      message: "Service request deleted",
      type: "delete",
    });
  } catch (err) {
    throw new Error(
      err.response?.data || "Failed to delete service request"
    );
  }
};
