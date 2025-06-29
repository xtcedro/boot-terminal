// services/wsService.ts

// In-memory store of active WebSocket clients
const clients = new Set<WebSocket>();

/**
 * Register a WebSocket client
 * @param ws WebSocket connection
 */
export function registerClient(ws: WebSocket) {
  clients.add(ws);
  console.log(`➕ Client registered. Total clients: ${clients.size}`);

  // Optionally handle WS errors or closure here too
  ws.addEventListener("close", () => {
    unregisterClient(ws);
  });
  ws.addEventListener("error", (err) => {
    console.error(`⚠️ WS client error:`, err);
    unregisterClient(ws);
  });
}

/**
 * Unregister a WebSocket client
 * @param ws WebSocket connection
 */
export function unregisterClient(ws: WebSocket) {
  if (clients.has(ws)) {
    clients.delete(ws);
    console.log(`➖ Client unregistered. Total clients: ${clients.size}`);
  }
}

/**
 * Broadcast a message to all connected clients
 * @param message The message to broadcast
 */
export function broadcast(message: string) {
  console.log(`📢 Broadcasting to ${clients.size} clients: "${message}"`);

  for (const ws of clients) {
    try {
      ws.send(message);
    } catch (err) {
      console.error(`⚠️ Error sending message to client: ${err}`);
      unregisterClient(ws);
    }
  }
}

/**
 * Get the number of currently connected WebSocket clients
 * @returns number of clients
 */
export function getConnectedClientCount(): number {
  return clients.size;
}