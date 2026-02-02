import { useEffect, useState } from "react";
import "./Help.css";

export default function Help() {
  const [faqs, setFaqs] = useState([]);
  const [openIndex, setOpenIndex] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5002/api/content/help")
      .then(res => res.json())
      .then(data => setFaqs(data));
  }, []);

  return (
    <div className="help-container">
      <h1 className="help-title">Help & Support</h1>
      <p className="help-subtitle">
        Frequently asked questions to help you use TradeFlow.
      </p>

      <div className="faq-list">
        {faqs.map((item, index) => (
          <div
            key={index}
            className="faq-item"
            onClick={() =>
              setOpenIndex(openIndex === index ? null : index)
            }
          >
            <div className="faq-question">
              {item.question}
              <span>{openIndex === index ? "−" : "+"}</span>
            </div>

            {openIndex === index && (
              <div className="faq-answer">{item.answer}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}