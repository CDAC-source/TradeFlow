export default function PageLayout({ title, subtitle, actions, children }) {
  return (
    <div className="page-bg">
      <div className="page-card">
        <div className="page-header">
          <div>
            <h2 className="page-title">{title}</h2>
            {subtitle && <p className="page-subtitle">{subtitle}</p>}
          </div>
          {actions && <div className="page-actions">{actions}</div>}
        </div>
        {children}
      </div>
    </div>
  );
}
