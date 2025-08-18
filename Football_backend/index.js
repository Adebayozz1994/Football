// index.js
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const { WebSocketServer, WebSocket } = require('ws');
require('dotenv').config();
const jwt = require('jsonwebtoken');


require('./models/User');
require('./models/Admin');
require('./models/Match');
require('./models/News');

const userRoutes = require('./routes/user.routes');
const adminRoutes = require('./routes/admin.routes'); 
const matchRoutes = require('./routes/match.routes'); 
const newsRoutes = require('./routes/news.routes'); 


const app = express();

// Connect to MongoDB (preferably centralize your connection here)
const URI = process.env.MONGO_URI;
mongoose
  .connect(URI)
  .then(() => console.log("Connected to database successfully"))
  .catch((err) => console.error("Database connection error:", err));


  app.use(cors({
    origin: ['http://localhost:3000','https://football-eight-theta.vercel.app/'],
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
app.use('/api/matches', matchRoutes); 
app.use('/api/news', newsRoutes);



const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`Server running on PORT: ${PORT}`);
});

// Create WebSocket server
const wss = new WebSocketServer({ server });

// Store connected clients
const clients = new Set();

wss.on('connection', (ws) => {
  console.log('New WebSocket connection');
  clients.add(ws);

  ws.on('close', () => {
    console.log('Client disconnected');
    clients.delete(ws);
  });
});

// Function to broadcast updates to all connected clients
function broadcastMatchUpdate(matchId, team, update) {
  const message = JSON.stringify({
    type: 'score_update',
    matchId,
    team,
    update
  });

  clients.forEach(client => {
    if (client.readyState === ws.OPEN) {
      client.send(message);
    }
  });
}

// Export for use in match controller
module.exports = { 
  broadcastMatchUpdate: (matchId, team, update) => {
    const message = JSON.stringify({
      type: 'score_update',
      matchId,
      team,
      update
    });

    clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  }
};