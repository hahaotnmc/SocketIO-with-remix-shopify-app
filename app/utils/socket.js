export function broadcastProgress(io, progress) {
  io.emit('progress', { progress });
} 