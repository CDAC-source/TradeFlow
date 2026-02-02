import { Link } from "react-router-dom";
import "./Billing.css";

export default function BillingHome() {
  return (
    <div className="billing-page">
      <h1 className="billing-title">Invoice & Billing</h1>
      <p className="billing-subtitle">
        Create invoices, manage billing, and track payments efficiently
      </p>

      <div className="billing-grid">
        {/* INVOICES */}
        <div className="billing-card invoices">
          <div className="billing-icon invoices">
            <i className="fa-solid fa-file-invoice"></i>
          </div>

          <h3>Invoices</h3>
          <p>Create, view and manage customer invoices.</p>

          <Link
            to="/billing/invoices"
            className="billing-link invoices"
          >
            Manage Invoices →
          </Link>
        </div>

        {/* PAYMENTS */}
        <div className="billing-card payments">
          <div className="billing-icon payments">
            <i className="fa-solid fa-credit-card"></i>
          </div>

          <h3>Payments</h3>
          <p>Track payments, dues, and billing history.</p>

          {/* ✅ FIXED */}
          <Link
            to="/billing/payments"
            className="billing-link payments"
          >
            Manage Payments →
          </Link>
        </div>
      </div>
    </div>
  );
}
