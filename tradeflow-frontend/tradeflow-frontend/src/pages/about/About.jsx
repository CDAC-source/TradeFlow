import { useEffect, useState } from "react";
import "./About.css";

export default function About() {
  const [about, setAbout] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5002/api/content/about")
      .then(res => res.json())
      .then(data => setAbout(data));
  }, []);

  if (!about) return <div className="about-loading">Loading...</div>;

  return (
    <div className="about-container">
      <div className="about-card">
        <h1 className="about-title">About {about.projectName}</h1>
        <p className="about-desc">{about.description}</p>

        <div className="about-section">
          <h3>🚀 Features</h3>
          <ul>
            {about.features.map((f, i) => (
              <li key={i}>{f}</li>
            ))}
          </ul>
        </div>

        <div className="about-section">
          <h3>🛠 Technology Stack</h3>
          <div className="tech-badges">
            {about.technologyStack.map((t, i) => (
              <span key={i} className="tech-badge">{t}</span>
            ))}
          </div>
        </div>

        <p className="about-footer">
          <b>Developed by:</b> {about.developedBy}
        </p>
      </div>
    </div>
  );
}