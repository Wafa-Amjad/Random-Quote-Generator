const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Sample quotes with authors
const allQuotes = [
  // Inspirational
  { type: 'inspirational', text: 'Believe in yourself!', by: 'Unknown' },
  { type: 'inspirational', text: 'Every day is a second chance.', by: 'Unknown' },
  { type: 'inspirational', text: 'Failure is not fatal. It is the courage to continue that counts.', by: 'Winston Churchill' },
  { type: 'inspirational', text: 'There is no power on earth that can undo Pakistan.', by: 'Muhammad Ali Jinnah' },
  { type: 'inspirational', text: 'Stand up for what you believe in, even if it means standing alone.', by: 'Malala Yousafzai' },
  { type: 'inspirational', text: 'Success is not just what you accomplish in life, it’s what you inspire others to do.', by: 'Abdul Sattar Edhi' },
  { type: 'inspirational', text: 'You have to dream before your dreams can come true.', by: 'Abdul Kalam' },
  { type: 'inspirational', text: 'Be like a diamond: precious and rare, not like a stone found everywhere.', by: 'Allama Iqbal' },

  // Love
  { type: 'love', text: 'Love conquers all.', by: 'Virgil' },
  { type: 'love', text: 'You had me at hello.', by: 'Jerry Maguire (Movie)' },
  { type: 'love', text: 'The best thing to hold onto in life is each other.', by: 'Audrey Hepburn' },
  { type: 'love', text: 'Love is composed of a single soul inhabiting two bodies.', by: 'Aristotle' },
  { type: 'love', text: 'To love and be loved is to feel the sun from both sides.', by: 'David Viscott' },
  { type: 'love', text: 'Ishq woh aatish hai Ghalib, jo lagaye na lage aur bujhaye na bane.', by: 'Mirza Ghalib' },
  { type: 'love', text: 'Mohabbat karne walay kam na honge, teri mehfil mein lekin hum na honge.', by: 'Faiz Ahmed Faiz' },
  { type: 'love', text: 'Love is the bridge between you and everything.', by: 'Rumi' },

  // Funny
  { type: 'funny', text: 'I’m not lazy, I’m on energy-saving mode.', by: 'Unknown' },
  { type: 'funny', text: 'Why don’t scientists trust atoms? Because they make up everything!', by: 'Unknown' },
  { type: 'funny', text: 'Common sense is like deodorant. The people who need it most never use it.', by: 'Anonymous' },
  { type: 'funny', text: 'I used to think I was indecisive, but now I’m not too sure.', by: 'Unknown' },
  { type: 'funny', text: 'Behind every great man is a woman rolling her eyes.', by: 'Jim Carrey' },
  { type: 'funny', text: 'You can’t have everything… where would you put it?', by: 'Steven Wright' },
  { type: 'funny', text: 'I’m on a seafood diet. I see food and I eat it.', by: 'Unknown' },
  { type: 'funny', text: 'I told my wife she was drawing her eyebrows too high. She looked surprised.', by: 'Unknown' },
];

// In-memory storage for favourites
let favourites = [];

// 🧠 GET random quote by type
app.get('/api/quotes/random/:type', (req, res) => {
  const { type } = req.params;
  const filtered = allQuotes.filter(q => q.type === type);
  const random = filtered[Math.floor(Math.random() * filtered.length)];
  res.json({ quote: random.text, by: random.by });
});

// 📚 GET all quotes
app.get('/api/quotes/all', (req, res) => {
  res.json(allQuotes);
});

// ❤️ POST to save favourite
app.post('/api/favourites', (req, res) => {
  const { name, email, quote, type } = req.body;

  if (!name || !email || !quote || !type) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const alreadyExists = favourites.some(
    fav => fav.email === email && fav.quote === quote
  );

  if (!alreadyExists) {
    favourites.push({ name, email, quote, type });
  }

  res.json({ message: 'Quote added to favourites' });
});

// ❤️ GET favourites by user
app.get('/api/favourites/:email', (req, res) => {
  const userFavourites = favourites
    .filter(fav => fav.email === req.params.email)
    .map(fav => fav.quote); 
  res.json(userFavourites);
});

app.delete('/api/favourites/:email/:quote', (req, res) => {
  const email = req.params.email;
  const quote = decodeURIComponent(req.params.quote); // decode the quote text

  const originalLength = favourites.length;

  favourites = favourites.filter(
    fav => !(fav.email === email && fav.quote === quote)
  );

  const removed = originalLength !== favourites.length;

  res.status(removed ? 200 : 404).json({
    message: removed ? 'Quote removed' : 'Quote not found'
  });
});



// Start server
app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));
