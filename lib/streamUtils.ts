// Store active connections
const connections = new Set<ReadableStreamDefaultController>();

// Function to broadcast to all connected clients
export function broadcastToClients(data: any) {
  const message = JSON.stringify(data);
  
  connections.forEach(controller => {
    try {
      controller.enqueue(`data: ${message}\n\n`);
    } catch (error) {
      // Remove dead connections
      connections.delete(controller);
    }
  });
}

export function addConnection(controller: ReadableStreamDefaultController) {
  connections.add(controller);
}

export function removeConnection(controller: ReadableStreamDefaultController) {
  connections.delete(controller);
}

