export const createChatListItem = (user) => {
  const chatItem = document.createElement('li');
  chatItem.classList.add('chat-item');
  chatItem.id = user.id;
  chatItem.innerHTML = ` <div class="avatar">
              <img src="${user.avatar}" height="60px" />
            </div>
            <div class="userInfo">
              <div class="userName">${user.name}</div>
            </div>`;

  return chatItem;
};
