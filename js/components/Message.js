export const createMessageItem = (message, senderId) => {
  const messageItem = document.createElement('div');
  const isReceived = +message.userTo === +senderId;
  messageItem.className = isReceived
    ? 'messageItemReceived'
    : 'messageItemSent';
  messageItem.innerHTML = `
     <div class="${
       isReceived ? 'messageBodyReceived' : 'messageBodySent'
     }"><div>${message.body}</div><div class="msgTime">${message.time.substring(
    0,
    5
  )}</div></div>
    `;
  return messageItem;
};
