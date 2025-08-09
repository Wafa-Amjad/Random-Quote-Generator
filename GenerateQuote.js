import React, { useState } from 'react';
import axios from 'axios';
import './GenerateQuote.css';

const GenerateQuote = ({ user, setPage }) => {
  const [selectedType, setSelectedType] = useState('');
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');

  const handleGenerate = () => {
    if (!selectedType) {
      alert('Please select a quote type!');
      return;
    }

    
    axios
      .get(`http://localhost:5000/api/quotes/random/${selectedType}`)
      .then((res) => {
        setQuote(res.data.quote);
        setAuthor(res.data.by); 
      })
      .catch((err) => {
        console.error('Error fetching quote:', err);
      });
  };

  const handleFavourite = () => {
    if (!quote) return;

    axios
      .post('http://localhost:5000/api/favourites', {
        name: user.name || 'Anonymous',
        email: user.email,
        quote: quote,
        type: selectedType,
      })
      .then(() => {
        alert('Added to favourites!');
      })
      .catch((err) => {
        console.error('Error adding to favourites:', err);
      });
  };

  return (
    <div className="generate-quote-container">
      <h2>✨ Generate a Quote ✨</h2>

      <select value={selectedType} onChange={(e) => setSelectedType(e.target.value)}>
        <option value="">-- Select Quote Type --</option>
        <option value="inspirational">Inspirational</option>
        <option value="funny">Funny</option>
        <option value="love">Love</option>
      </select>

      <button className="generate-btn" onClick={handleGenerate}>
        Generate Quote
      </button>

      {quote && (
        <div className="quote-box">
          <p>💬 "{quote}"</p>
          {author && <p className="quote-author">— {author}</p>}
          <button className="favourite-btn" onClick={handleFavourite}>
            ❤️ Add to Favourites
          </button>
        </div>
      )}

      <button className="back-btn" onClick={() => setPage('menu')}>
        ⬅ Back to Menu
      </button>
    </div>
  );
};

export default GenerateQuote;
