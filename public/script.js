const socket = io();

const messagesDiv = document.getElementById('messages');
const chatForm = document.getElementById('chat-form');
const usernameInput = document.getElementById('username');
const messageInput = document.getElementById('message');

function appendMessage(message, isSent) {
  const messageElement = document.createElement('div');
  messageElement.innerText = message;
  messageElement.classList.add('message', isSent ? 'sent' : 'received');
  messagesDiv.appendChild(messageElement);
}

const modeToggleBtn = document.getElementById('mode-toggle');
modeToggleBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
});

function animateMessageSent(message) {
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message', 'sent', 'animated-message');
    messagesDiv.appendChild(messageElement);
  

    setTimeout(() => {
      messageElement.remove();
    }, 3000); 
  }

chatForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const username = usernameInput.value.trim();
  const message = messageInput.value.trim();

  if (username && message) {
    socket.emit('setUsername', username);
    socket.emit('chatMessage', message);
    messageInput.value = '';
    animateMessageSent(`${username}: ${message}`);
  }
});

socket.on('chatMessage', (data) => {
  const { user, message } = data;
  const isSent = user === usernameInput.value.trim();
  appendMessage(`${user}: ${message}`, isSent);
});
