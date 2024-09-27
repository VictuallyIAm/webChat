import { createMessageItem } from '../components/Message.js';

const currentChatHeader = document.querySelector('#chatHeader');
const messageInput = document.querySelector('#messageInput');
const messagesContentBox = document.querySelector('#messages');
const sendBtn = document.querySelector('.sendBtn');

let senderId;
let recieverId;

export const renderChat = (targetUser, loggedUserId) => {
  senderId = loggedUserId;
  recieverId = targetUser.id;

  updateHeader(targetUser);
  loadHistory();
};

const updateHeader = (user) => {
  currentChatHeader.querySelector('img').src = user.avatar;
  currentChatHeader.querySelector('span').innerText = user.name;
  currentChatHeader.style.backgroundColor = 'white';
  messageInput.parentElement.style.display = 'flex';
};

const displayNewMessage = (message) => {
  const messageElement = createMessageItem(message, senderId);
  messagesContentBox.appendChild(messageElement);
};

const loadHistory = () => {
  messagesContentBox.innerHTML = '';

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key.includes(senderId) && key.includes(recieverId)) {
      const messages = JSON.parse(localStorage.getItem(key));
      messages.forEach((msg) => {
        displayNewMessage(msg);
      });
    }
  }
};

const sendMessage = () => {
  const message = messageInput.value;
  if (message.trim()) {
    const newMessage = {
      userFrom: senderId.toString(),
      userTo: recieverId.toString(),
      body: message,
      time: new Date().toLocaleTimeString(),
    };
    displayNewMessage(newMessage);
    let userMessagesKey;
    if (senderId < recieverId) {
      userMessagesKey = `chat-${senderId}-${recieverId}`;
    } else {
      userMessagesKey = `chat-${recieverId}-${senderId}`;
    }
    let messages = JSON.parse(localStorage.getItem(userMessagesKey)) || [];

    messages.push(newMessage);

    localStorage.setItem(userMessagesKey, JSON.stringify(messages));

    localStorage.setItem('lastRefreshed', new Date().toISOString());

    messageInput.value = '';
  }
};

sendBtn.addEventListener('click', sendMessage);
messageInput.addEventListener('keyup', (event) => {
  if (event.key === 'Enter') {
    sendMessage();
  }
});

window.addEventListener('storage', (event) => {
  if (event.key === 'lastRefreshed') {
    loadHistory();
  }
});
