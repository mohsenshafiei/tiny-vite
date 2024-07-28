import chalk from 'chalk';
import { Server } from 'http';
import WebSocket from 'ws';
import { HMR_HEADER } from './path';

export function createWebSocketServer(server: Server) {
  const wss = new WebSocket.Server({
    noServer: true,
  });

  server.on('upgrade', (req, socket, head) => {
    if (req.headers['sec-websocket-protocol'] === HMR_HEADER) {
      // @ts-ignore
      wss.handleUpgrade(req, socket, head, (ws) => {
        wss.emit('connection', ws, req);
      });
    }
  });

  wss.on('connection', (socket) => {
    socket.send(JSON.stringify({ type: 'connected' }));
  });

  wss.on('error', (e: Error & { code: string }) => {
    if (e.code !== 'EADDRINUSE') {
      console.error(
        chalk.red(`WebSocket server error:\n${e.stack || e.message}`),
      );
    }
  });

  return {
    send(payload: Object) {
      const stringified = JSON.stringify(payload);
      wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(stringified);
        }
      });
    },

    close() {
      wss.close();
    },
  };
}
