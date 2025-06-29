// load-components.js → v1.2 → Elite architecture

// 🧠 Load Boot Screen component
export function loadBootScreen() {
  return fetch('/pages/home/index.html')
    .then(res => res.text())
    .then(data => {
      const container = document.createElement('div');
      container.innerHTML = data;
      document.body.appendChild(container);
    });
}

// 🧠 Load WebSocket client and initialize connection
export function loadWebSocket(wsUrl = "wss://okdevs.xyz/api/ws") {
  initializeWebSocket(wsUrl);
}

// 🧠 Export globally
export { sendWebSocketMessage, showNotification };
