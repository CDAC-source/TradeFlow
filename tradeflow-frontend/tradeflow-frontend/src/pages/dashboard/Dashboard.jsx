import { Link } from "react-router-dom";
import "./Dashboard.css";

export default function Dashboard() {
  return (
    <div className="dashboard-page">
      <div className="dashboard-container">
        <h1 className="dashboard-title">Welcome to the Dashboard!</h1>
        <p className="dashboard-subtitle">
          Choose a module to start managing your business.
        </p>

        {/* =========================
            MAIN MODULE CARDS
        ========================= */}
        <div className="dashboard-grid">

          {/* Customers */}
          <div className="dashboard-card">
            <div className="icon-circle success">
              <i className="fa-solid fa-users"></i>
            </div>
            <h3>Customer Management</h3>
            <p>Manage customer records and info.</p>
            <Link to="/customers" className="dashboard-btn success">
              Go to Customers
            </Link>
          </div>

          {/* Inventory */}
          <div className="dashboard-card">
            <div className="icon-circle info">
              <i className="fa-solid fa-boxes-stacked"></i>
            </div>
            <h3>Inventory Module</h3>
            <p>Machines & spare parts tracker.</p>
            <Link to="/inventory" className="dashboard-btn info">
              Go to Inventory
            </Link>
          </div>

          {/* Service Requests */}
          <div className="dashboard-card">
            <div className="icon-circle danger">
              <i className="fa-solid fa-screwdriver-wrench"></i>
            </div>
            <h3>Service Requests</h3>
            <p>Log & resolve customer issues.</p>
            <Link to="/service-requests" className="dashboard-btn danger">
              Go to Service Requests
            </Link>
          </div>

          {/* Sales Analytics */}
          <div className="dashboard-card">
            <div className="icon-circle primary">
              <i className="fa-solid fa-chart-line"></i>
            </div>
            <h3>Sales Analytics</h3>
            <p>Track revenue and sales performance.</p>
            <Link to="/sales" className="dashboard-btn primary">
              View Sales Analytics
            </Link>
          </div>

          {/* Trends */}
          <div className="dashboard-card">
            <div className="icon-circle purple">
              <i className="fa-solid fa-lightbulb"></i>
            </div>
            <h3>Trends & Insights</h3>
            <p>Analyze demand and service trends.</p>
            <Link to="/trends" className="dashboard-btn purple">
              View Insights
            </Link>
          </div>

          {/* 🧾 Invoice & Billing (NEW) */}
          <div className="dashboard-card">
            <div className="icon-circle billing">
              <i className="fa-solid fa-file-invoice-dollar"></i>
            </div>
            <h3>Invoice & Billing</h3>
            <p>Create invoices and manage payments.</p>
            <Link to="/billing" className="dashboard-btn billing">
              Go to Billing
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}
