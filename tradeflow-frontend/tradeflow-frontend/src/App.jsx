import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import NotificationsPage from "./pages/notifications/NotificationsPage";

/* AUTH */
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

import Help from "./pages/help/Help";
/* DASHBOARD */
import Dashboard from "./pages/dashboard/Dashboard";

/* CUSTOMERS */
import CustomerList from "./pages/customers/CustomerList";
import CustomerAdd from "./pages/customers/CustomerAdd";
import CustomerEdit from "./pages/customers/CustomerEdit";

/* INVENTORY */
import InventoryHome from "./pages/inventory/InventoryHome";

/* MACHINES */
import MachineList from "./pages/machines/MachineList";
import MachineAdd from "./pages/machines/MachineAdd";
import MachineEdit from "./pages/machines/MachineEdit";

/* SPARE PARTS */
import SparePartHome from "./pages/spareparts/SparePartHome";
import SparePartList from "./pages/spareparts/SparePartList";
import SparePartAdd from "./pages/spareparts/SparePartAdd";
import SparePartEdit from "./pages/spareparts/SparePartEdit";
import SparePartRack from "./pages/spareparts/SparePartRack";

/* SERVICE REQUESTS */
import ServiceRequestList from "./pages/servicerequests/ServiceRequestList";
import ServiceRequestAdd from "./pages/servicerequests/ServiceRequestAdd";
import ServiceRequestEdit from "./pages/servicerequests/ServiceRequestEdit";

/* MECHANICS ✅ FIX */
import MechanicList from "./pages/mechanics/MechanicList";
import MechanicAdd from "./pages/mechanics/MechanicAdd";
import MechanicEdit from "./pages/mechanics/MechanicEdit";

/* SALES & TRENDS */
import SalesDashboard from "./pages/sales/SalesDashboard";
import TrendsDashboard from "./pages/trends/TrendsDashboard";

import GiveAuth from "./pages/admin/GiveAuth";

/* BILLING */
import BillingHome from "./pages/billing/BillingHome";
import InvoicesHome from "./pages/billing/InvoicesHome";
import InvoiceCreate from "./pages/billing/InvoiceCreate";
import InvoiceList from "./pages/billing/InvoiceList";
import PaymentsList from "./pages/billing/PaymentsList";
import About from "./pages/about/About";

export default function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/help" element={<Help />} />
        <Route path="/about" element={<About />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route path="/notifications" element={<NotificationsPage />} />

        <Route path="/customers" element={<CustomerList />} />
        <Route path="/customers/add" element={<CustomerAdd />} />
        <Route path="/customers/edit/:id" element={<CustomerEdit />} />

        <Route path="/inventory" element={<InventoryHome />} />

        <Route path="/machines" element={<MachineList />} />
        <Route path="/machines/add" element={<MachineAdd />} />
        <Route path="/machines/edit/:id" element={<MachineEdit />} />

        <Route path="/spare-parts" element={<SparePartHome />} />
        <Route path="/spare-parts/list" element={<SparePartList />} />
        <Route path="/spare-parts/add" element={<SparePartAdd />} />
        <Route path="/spare-parts/edit/:id" element={<SparePartEdit />} />
        <Route path="/spare-parts/rack" element={<SparePartRack />} />

        <Route path="/service-requests" element={<ServiceRequestList />} />
        <Route path="/service-requests/add" element={<ServiceRequestAdd />} />
        <Route
          path="/service-requests/edit/:id"
          element={<ServiceRequestEdit />}
        />

        {/* ✅ MECHANICS */}
        <Route path="/mechanics" element={<MechanicList />} />
        <Route path="/mechanics/add" element={<MechanicAdd />} />
        <Route path="/mechanics/edit/:id" element={<MechanicEdit />} />

        <Route path="/sales" element={<SalesDashboard />} />
        <Route path="/trends" element={<TrendsDashboard />} />

        <Route path="/give-auth" element={<ProtectedRoute adminOnly> <GiveAuth /> </ProtectedRoute>}/>

        <Route path="/billing" element={<BillingHome />} />
        <Route path="/billing/invoices" element={<InvoicesHome />} />
        <Route path="/billing/invoices/new" element={<InvoiceCreate />} />
        <Route path="/billing/invoices/list" element={<InvoiceList />} />
        <Route path="/billing/payments" element={<PaymentsList />} />
      </Routes>
    </>
  );
}
