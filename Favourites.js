import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './fav.css';

const Favourites = ({ user, setPage }) => {
  const [favourites, setFavourites] = useState([]);

  useEffect(() => {
    fetchFavourites();
  }, [user.email]);

  const fetchFavourites = () => {
    axios
      .get(`http://localhost:5000/api/favourites/${user.email}`)
      .then((res) => setFavourites(res.data))
      .catch((err) => console.error('Error fetching favourites:', err));
  };

  const handleRemove = (quoteText) => {
    axios
      .delete(`http://localhost:5000/api/favourites/${user.email}/${encodeURIComponent(quoteText)}`)
      .then(() => fetchFavourites())
      .catch((err) => console.error('Error removing favourite:', err));
  };

  return (
    <div className="favourite-list">
      <h3>❤️ Your Favourite Quotes</h3>
      {favourites.length === 0 ? (
        <p>No favourites yet.</p>
      ) : (
        favourites.map((q, i) => (
          <div key={i} className="quote-item">
            <p>💬 {q}</p>
            <button onClick={() => handleRemove(q)}>Remove Quote</button>
          </div>
        ))
      )}
      <div className="button-container">
  <button className="logout-button" onClick={() => setPage('menu')}>
    Back to Menu
  </button>
</div>

    </div>
  );
};

export default Favourites;
