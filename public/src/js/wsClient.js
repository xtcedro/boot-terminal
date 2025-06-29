import { showNotification } from './notifications.js';

let socket = null;

export function initializeWebSocket(url = "wss://domingueztechsolutions.com/api/ws") {
  socket = new WebSocket(url);

  socket.onopen = () => {
    console.log("✅ WebSocket connected!");
    socket.send("Hello from client!");
  };

  socket.onmessage = (event) => {
    console.log("📩 Message from server:", event.data);
    showNotification(event.data, "info"); // Show notification globally
  };

  socket.onclose = () => {
    console.log("❌ WebSocket disconnected.");
  };

  socket.onerror = (error) => {
    console.error("⚠️ WebSocket error:", error);
  };
}

export function sendWebSocketMessage(message) {
  if (socket && socket.readyState === WebSocket.OPEN) {
    socket.send(message);
    console.log(`🚀 Sent WebSocket message: ${message}`);
  } else {
    console.warn("⚠️ WebSocket is not connected. Message not sent.");
  }
}