export type Status = 'online' | 'offline' | 'maintenance';

export interface Node {
  id: string
  name: string
  status: Status
  cpuUsage: number
  memoryUsage: number
  timestamp: string
}