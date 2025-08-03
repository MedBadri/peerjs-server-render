const express = require('express');
const { ExpressPeerServer } = require('peer');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 8080;

// Enable CORS for all routes
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Health check endpoint
app.get('/', (req, res) => {
  res.json({ 
    status: 'PeerJS Server is running!', 
    timestamp: new Date().toISOString(),
    port: PORT 
  });
});

// Create HTTP server
const server = app.listen(PORT, () => {
  console.log(`✅ PeerJS server running on port ${PORT}`);
});

// Create PeerJS server with Render.com optimized configuration
const peerServer = ExpressPeerServer(server, {
  debug: true,
  allow_discovery: true,
  path: '/peerjs',
  concurrent_limit: 1000,
  proxied: true,
  // Render.com specific settings
  ssl: false, // Let Render.com handle SSL
  config: {
    iceServers: [
      { urls: 'stun:stun.l.google.com:19302' },
      { urls: 'stun:global.stun.twilio.com:3478' },
      { urls: 'stun:stun.stunprotocol.org:3478' }
    ]
  }
});

// Mount PeerJS server
app.use('/peerjs', peerServer);

// Enhanced logging
peerServer.on('connection', (client) => {
  console.log(`🔗 Peer connected: ${client.getId()}`);
});

peerServer.on('disconnect', (client) => {
  console.log(`❌ Peer disconnected: ${client.getId()}`);
});

peerServer.on('error', (error) => {
  console.error('❌ PeerJS server error:', error);
});

console.log('🎯 PeerJS server mounted at /peerjs');
console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
console.log(`🚀 Server URL: https://peerjs-server-render.onrender.com/peerjs`);