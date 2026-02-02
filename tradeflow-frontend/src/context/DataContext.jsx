import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const DataContext = createContext();

const API_BASE = "http://localhost:8080/api";

export function DataProvider({ children }) {
  const [customers, setCustomers] = useState([]);
  const [machines, setMachines] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    try {
      const [customerRes, machineRes] = await Promise.all([
        axios.get(`${API_BASE}/customers`),
        axios.get(`${API_BASE}/machines`)
      ]);

      setCustomers(customerRes.data || []);
      setMachines(machineRes.data || []);
    } catch (err) {
      console.error("Failed to load master data", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <DataContext.Provider
      value={{
        customers,
        machines,
        loading
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  return useContext(DataContext);
}
