import { users } from '../settings/users.js';
import { createChatListItem } from './components/ChatListItem.js';
import { renderChat } from './scripts/chatArea.js';
import { fillInitialSelectForm } from './scripts/getIdentity.js';

const chatList = document.querySelector('#chat-list');
const searchInput = document.querySelector('#search-input');
const main = document.querySelector('#main');

let loggedUserId;

const setSelectedChat = (user) => {
  Array.from(chatList.children).forEach((child) => {
    child.style.backgroundColor = +child.id === user.id ? '#ddd' : 'white';
  });
  renderChat(user, loggedUserId);
};

const loadInterfaceForChosenUser = (userId) => {
  loggedUserId = userId;
  const displayedUsers = users.filter((user) => user.id !== +userId);
  displayedUsers.forEach((user) => {
    const item = createChatListItem(user);
    item.addEventListener('click', () => {
      setSelectedChat(user);
    });
    chatList.appendChild(item);
  });
  searchInput.addEventListener('input', (event) => {
    const value = event.target.value;
    const filteredUsers = displayedUsers.filter((user) =>
      user.name.toLowerCase().includes(value)
    );
    Array.from(chatList.children).forEach((child) => {
      child.style.display = filteredUsers.some((user) => user.id === +child.id)
        ? 'grid'
        : 'none';
    });
  });
  main.style.display = 'flex';
};

const initApp = () => {
  fillInitialSelectForm(users, loadInterfaceForChosenUser);
};

initApp();
