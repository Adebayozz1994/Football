// index.js
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const jwt = require('jsonwebtoken');

const userRoutes = require('./routes/user.routes');
const adminRoutes = require('./routes/admin.routes'); 
// const adminRoutes = require('./routes/admin.routes');
// const matchRoutes = require('./routes/match.routes'); 
// const newsRoutes = require('./routes/news.routes'); 


const app = express();

// Connect to MongoDB (preferably centralize your connection here)
const URI = process.env.MONGO_URI;
mongoose
  .connect(URI)
  .then(() => console.log("Connected to database successfully"))
  .catch((err) => console.error("Database connection error:", err));


  app.use(cors({
    origin: ['http://localhost:3000','http://localhost:3001'],
    credentials: true,
  }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Welcome to Nigerian Football API!',
    version: '1.0.0',
    endpoints: {
      users: '/api/user',
      admin: '/api/admin',
      matches: '/api/matches',
      news: '/api/news'
    }
  });
});

app.use('/api/user', userRoutes); 
app.use('/api/admin', adminRoutes); 
// app.use('/api/admin', adminRoutes); 
// app.use('/api/matches', matchRoutes); 
// app.use('/api/news', newsRoutes);



// A sample route to verify the token and fetch user details
app.get('/api/user', (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.json({
      firstName: decoded.firstName,
      lastName: decoded.lastName,
      email: decoded.email,
    });
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on PORT: ${PORT}`);
});



