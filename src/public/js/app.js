const messageList = document.querySelector('ul');
const messageForm = document.querySelector('#message');
const nickForm = document.querySelector('#nick');
const socket = new WebSocket(`ws://${window.location.host}`);

function mackMessage(type, payload) {
  const msg = { type, payload };
  return JSON.stringify(msg);
}

function handleOpen() {
  console.log('Connected to Server ✅');
}

socket.addEventListener('open', handleOpen);

socket.addEventListener('message', (message) => {
  const li = document.createElement('li');
  li.innerText = message.data;
  messageList.append(li);
});

socket.addEventListener('close', () => {
  console.log('Disconnected from Server ❌');
});

function handleSubmit(event) {
  event.preventDefault();
  const input = messageForm.querySelector('input');
  socket.send(mackMessage('new_message', input.value));
  input.value = '';
}

function handleNickSubmit(event) {
  event.preventDefault();
  const input = nickForm.querySelector('input');
  socket.send(mackMessage('nickname', input.value));
  input.value = '';
}

messageForm.addEventListener('submit', handleSubmit);
nickForm.addEventListener('submit', handleNickSubmit);
