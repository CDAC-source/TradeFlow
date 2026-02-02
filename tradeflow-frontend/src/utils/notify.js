import { notificationStore } from "../context/NotificationStore";

export const notify = (message, type = "info") => {
  notificationStore.add(message, type);
};
