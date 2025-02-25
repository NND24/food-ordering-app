"use client"
import React, { useState } from 'react';
import './FAQ.css';

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAnswer = (index) => {
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const faqs = [
    {
      question: "Cách nhận đơn hàng mới?",
      answer: "Thông báo đơn hàng mới sẽ được hiển thị ở mục 'Đơn hàng mới'.",
    },
    {
      question: "Làm sao để kiểm tra trạng thái đơn hàng?",
      answer: "Bạn có thể kiểm tra trạng thái trong phần 'Đơn hàng của tôi'.",
    },
    {
      question: "Cách hủy đơn hàng?",
      answer: "Bạn có thể hủy đơn hàng trong vòng 30 phút sau khi đặt.",
    },
  ];

  return (
    <div className='faq-section'>
      <h1 className="faq-title">Câu hỏi thường gặp</h1>
      <div className="faq-container">
        {faqs.map((faq, index) => (
          <div key={index} className="faq-item">
            <button
              className={`faq-question ${activeIndex === index ? "active" : ""}`}
              onClick={() => toggleAnswer(index)}
            >
              {faq.question}
              <span className="icon">{activeIndex === index ? "-" : "+"}</span>
            </button>
            {activeIndex === index && (
              <div className="faq-answer">
                <p>{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
