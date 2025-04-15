import { Server } from 'socket.io';
import { createServer } from 'http';
import express from 'express';

let io;

export function createSocketServer(remixServer) {
  if (!io) {
    const app = express();
    const httpServer = createServer(app);
    
    // Attach Socket.IO to the HTTP server
    io = new Server(httpServer, {
      cors: {
        origin: "*",
        methods: ["GET", "POST"]
      }
    });

    // Handle Socket.IO connections
    io.on('connection', (socket) => {
      console.log('Client connected');

      socket.on('disconnect', () => {
        console.log('Client disconnected');
      });
    });

    // Start the server
    httpServer.listen(3001, () => {
      console.log('Socket.IO server running on port 3001');
    });
  }
  return io;
}

export function broadcastProgress(progress) {
  if (io) {
    io.emit('progress', { progress });
  }
} 