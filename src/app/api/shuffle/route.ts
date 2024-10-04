// app/api/shuffle/route.ts
import { WebSocketServer } from 'ws';
import { NextRequest } from 'next/server';

let wss: WebSocketServer | null = null;

export async function GET(req: NextRequest) {
  if (!wss) {
    wss = new WebSocketServer({ noServer: true });

    wss.on('connection', (ws) => {
      console.log('Client connected');

      ws.on('message', (message) => {
        const data = JSON.parse(message.toString());

        if (data.type === 'shuffle') {
          const shuffled = shuffleArray(data.participants, data.count);
          const response = { type: 'shuffle-result', shuffled };

          // Broadcast the shuffled result to all clients
          wss?.clients.forEach((client) => {
            if (client.readyState === ws.OPEN) {
              client.send(JSON.stringify(response));
            }
          });
        }
      });

      ws.on('close', () => {
        console.log('Client disconnected');
      });
    });
  }

  return new Response(null, { status: 200 });
}

// Helper function to shuffle participants
function shuffleArray(arr: any[], count: number): any[] {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

