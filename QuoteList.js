import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './quote.css';

const QuoteList = ({ setPage }) => {
  const [quotes, setQuotes] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    axios.get('http://localhost:5000/api/quotes/all')
      .then(res => setQuotes(res.data))
      .catch(err => console.error('Error fetching quotes:', err));
  }, []);

  const filteredQuotes = filter === 'all'
    ? quotes
    : quotes.filter(q => q.type === filter);

  return (
    <div className="quote-list">
      <h3>📚 All Quotes</h3>

      <div className="quote-filters">
        <label>
          <input type="radio" value="all" checked={filter === 'all'} onChange={(e) => setFilter(e.target.value)} /> All
        </label>
        <label>
          <input type="radio" value="inspirational" checked={filter === 'inspirational'} onChange={(e) => setFilter(e.target.value)} /> Inspirational
        </label>
        <label>
          <input type="radio" value="funny" checked={filter === 'funny'} onChange={(e) => setFilter(e.target.value)} /> Funny
        </label>
        <label>
          <input type="radio" value="love" checked={filter === 'love'} onChange={(e) => setFilter(e.target.value)} /> Love
        </label>
      </div>

      <div className="quotes-wrapper">
        {filteredQuotes.length > 0 ? (
          filteredQuotes.map((q, i) => (
            <div key={i} className="quote-item">
              <p className="quote-text">💬 {q.text}</p>
              <span className="quote-type">{q.type}</span>
            </div>
          ))
        ) : (
          <p>No quotes found for this type.</p>
        )}
      </div>

      <button className="back-btn" onClick={() => setPage('menu')}>🏠 Back to Menu</button>
    </div>
  );
};

export default QuoteList;