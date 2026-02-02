import { Link } from "react-router-dom";
import "./Billing.css";

export default function InvoicesHome() {
  return (
    <div className="billing-page">
      <h1 className="billing-title">Invoices</h1>
      <p className="billing-subtitle">
        Create a new invoice or view existing ones
      </p>

      <div className="billing-grid">
        <div className="billing-card invoices">
          <h3>Create Invoice</h3>
          <p>Generate a new invoice for a customer.</p>
          <Link
            to="/billing/invoices/new"
            className="billing-link invoices"
          >
            New Invoice →
          </Link>
        </div>

        <div className="billing-card payments">
          <h3>Invoice History</h3>
          <p>View all previously created invoices.</p>
          <Link
            to="/billing/invoices/list"
            className="billing-link payments"
          >
            View Invoices →
          </Link>
        </div>
      </div>
    </div>
  );
}
