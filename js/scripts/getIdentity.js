const identitySelectContainer = document.querySelector(
  '#identitySelectContainer'
);
const identitySelect = document.querySelector('#indentitySelect');
const identForm = document.querySelector('#identForm');

export const fillInitialSelectForm = (users, loadInterfaceForChosenUser) => {
  users.forEach((user) => {
    const option = document.createElement('option');
    option.innerHTML = user.name;
    option.value = user.id;
    identitySelect.appendChild(option);
  });
  identForm.addEventListener('submit', (e) => {
    e.preventDefault();
    setUserIndentity(identitySelect.value, loadInterfaceForChosenUser);
  });
};

const setUserIndentity = (value, loadInterfaceForChosenUser) => {
  loadInterfaceForChosenUser(value);
  identitySelectContainer.style.display = 'none';
};
