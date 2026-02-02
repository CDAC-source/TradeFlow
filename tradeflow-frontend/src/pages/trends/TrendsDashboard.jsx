import { useEffect, useState } from "react";
import "./Trends.css";
import TrendsCharts from "./TrendsCharts";

export default function TrendsDashboard() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8080/api/industry-news")
      .then(res => res.json())
      .then(data => setNews(data || []))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="trends-page">
      <h1 className="trends-title">Trends & Insights</h1>
      <p className="trends-subtitle">
        Analytics, usage patterns, and global printing industry updates
      </p>

      {/* ANALYTICS CHARTS */}
        <TrendsCharts />
      {/* INDUSTRY NEWS */}
      <h2 className="news-title">Industry News</h2>

      {loading ? (
        <p className="muted">Loading industry updates…</p>
      ) : (
        <div className="news-list">
          {news.slice(0, 6).map((item, i) => (
            <a
              key={i}
              href={item.link}
              target="_blank"
              rel="noreferrer"
              className="news-card"
            >
              <span className="news-source">{item.source}</span>
              <h4>{item.title}</h4>
              {item.publishedDate && (
                <small>{item.publishedDate}</small>
              )}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
