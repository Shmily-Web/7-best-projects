
const socket = new WebSocket('ws://localhost:8080');
socket.onmessage = function (event) {
    if (event.data instanceof Blob) {
        // If the data is a Blob, convert it to text
        event.data.text().then(text => {
            const chatBox = document.getElementById('chat-box');
            const message = document.createElement('p');
            message.textContent = text;
            chatBox.appendChild(message);
            
            chatBox.scrollTop = chatBox.scrollHeight; // Scroll to the latest message
        });
    } else {
        // If the data is already a string, just append it
        const chatBox = document.getElementById('chat-box');
        const message = document.createElement('p');
        message.textContent = event.data;
        chatBox.appendChild(message);

        chatBox.scrollTop = chatBox.scrollHeight; // Scroll to the latest message
    }
};

function sendMessage() {
    const messageInput = document.getElementById('message');
    const message = messageInput.value.trim();

    if (message !== '') {
        socket.send(message); // Send the message to the WebSocket server
        messageInput.value = ''; // Clear input field
    }
}
