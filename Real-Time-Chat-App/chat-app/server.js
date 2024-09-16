const WebSocket = require('ws');
const readline = require('readline');

// Create WebSocket server
const server = new WebSocket.Server({ port: 8080 });

// Track connected clients
const clients = [];

server.on('connection', socket => {
    console.log('Client connected');
    clients.push(socket); // Add new client to clients array

    // Send a welcome message to the newly connected client
    socket.send('Welcome to the chat room!');

    // Listen for messages from clients
    socket.on('message', message => {
        console.log(`Received: ${message}`);
        // Broadcast the received message to all clients
        broadcastMessage(message);
    });

    socket.on('close', () => {
        console.log('Client disconnected');
        // Remove the client from the array on disconnect
        const index = clients.indexOf(socket);
        if (index !== -1) {
            clients.splice(index, 1);
        }
    });
});

// Function to broadcast a message to all clients
function broadcastMessage(message) {
    clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(message);
        }
    });
}

// Set up readline interface to read from terminal
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Listen for terminal input and broadcast the input to all clients
rl.on('line', (input) => {
    console.log(`Sending message from terminal: ${input}`);
    broadcastMessage(`Server: ${input}`);
});

console.log('WebSocket server is running on ws://localhost:8080');
