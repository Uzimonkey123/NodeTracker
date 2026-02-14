import express from 'express'
import cors from 'cors'
import nodesData from './nodes.json'
import {Node, Status} from './types'

const app = express();
app.use(cors());
app.use(express.json());

let nodes: Node[] = nodesData.map(n => ({
  ...n,
  status: n.status as Status,
  timestamp: new Date().toISOString(),
}));

const STATUSES: Status[] = ['online', 'offline', 'maintenance'];

function randomBetween(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

function randomStatus(current: Status): Status {
  return Math.random() < 0.04
    ? STATUSES[Math.floor(Math.random() * STATUSES.length)]
    : current;
}

function randomCpu(current: number): number {
  return Math.min(100, Math.max(0,
    current + Math.floor(randomBetween(-12, 12))
  ));
}

function randomMemory(current: number): number {
  const delta = parseFloat(randomBetween(-1, 1).toFixed(1));

  return parseFloat(Math.min(16, Math.max(0.1, current + delta)).toFixed(1));
}

function updateNode(node: Node): Node {
  return {
    ...node,
    status: randomStatus(node.status),
    cpuUsage: randomCpu(node.cpuUsage),
    memoryUsage: randomMemory(node.memoryUsage),
    timestamp: new Date().toISOString(),
  };
}

setInterval(() => {
  nodes = nodes.map(updateNode);
}, 3000);


app.get('/api/nodes', (_req, res) => {
  res.json(nodes);
})

const PORT = 3001;
app.listen(PORT, () => console.log(`Backend running on http://localhost:${PORT}`))