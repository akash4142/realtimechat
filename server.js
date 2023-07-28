const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);


app.use(express.static('public'));

io.on('connection', (socket) => {
    console.log('A user connected');
  
    // Handle user data
    let username = '';
  
    socket.on('setUsername', (user) => {
      username = user;
      console.log(`User "${username}" connected`);
    });
  
    socket.on('chatMessage', (message) => {
      io.emit('chatMessage', { user: username, message: message });
    });
  
    socket.on('disconnect', () => {
      console.log(`User "${username}" disconnected`);
    });
  });

// Start the server
const PORT = process.env.PORT || 3000;
http.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
