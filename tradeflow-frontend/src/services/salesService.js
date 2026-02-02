import api from "../api/api";

export const getSalesStats = async () => {
  const res = await api.get("/sales/stats");
  return res.data;
};

export const getCustomerSales = async () => {
  const res = await api.get("/sales/customers");
  return res.data;
};
