import { CheckCircle2, XCircle, Wrench, Cpu, HardDrive, Clock, AlertTriangleIcon } from 'lucide-react'
import { Node } from '../types/types'

export default function Card({ node }: { node: Node }) {
    const getStatusColor = (status: string) => {
        if (status === 'online') return 'text-green-400'
        if (status === 'offline') return 'text-red-400'
        return 'text-yellow-400'
    }

    const getBorderColor = (status: string) => {
        if (status === 'offline') return 'border-red-700'
        return 'border-gray-600'
    }

    const getStatusIcon = (status: string) => {
        if (status === 'online') return <CheckCircle2 className="w-5 h-5" />
        if (status === 'offline') return <XCircle className="w-5 h-5" />
        return <Wrench className="w-5 h-5" />
    }

    const getCpuColor = (usage: number) => {
        if (usage >= 80) return 'bg-red-500'
        if (usage >= 60) return 'bg-yellow-500'
        return 'bg-green-500'
    }

    return (
        <div 
            key={node.id} 
            className={`border bg-gray-800 p-4 rounded-xl ${getBorderColor(node.status)}`}
        >
            <div className="flex items-start justify-between mb-3">
                <div>
                    <div className="text-[15px] text-gray-500 font-mono">{node.id}</div>
                    <h3 className="text-white font-semibold text-sm mt-1 leading-tight">{node.name}</h3>
                </div>
                <div className={`flex items-center gap-1 ${getStatusColor(node.status)}`}>
                    {getStatusIcon(node.status)}
                </div>
            </div>

            <div className="mb-2">
                <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-1 text-gray-400">
                        <Cpu className="w-3 h-3" />
                        <span className="text-[15px]">CPU</span>
                    </div>
                    {node.cpuUsage >= 80 && <AlertTriangleIcon className="w-6 h-6 text-red-500"/>}
                    <span className="text-white text-[15px] font-mono font-bold">{node.cpuUsage}%</span>
                </div>
                
                <div className="h-1 bg-gray-700 rounded-full overflow-hidden">
                    <div 
                        className={`h-full ${getCpuColor(node.cpuUsage)} transition-all`}
                        style={{ width: `${node.cpuUsage}%` }}
                    />
                </div>
            </div>

            <div className="mb-3">
                <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-1 text-gray-400">
                        <HardDrive className="w-3 h-3" />
                        <span className="text-[15px]">RAM</span>
                    </div>
                    <span className="text-[15px] font-mono font-bold">{node.memoryUsage}GB</span>
                </div>
            </div>

            <div className="flex items-center justify-center gap-1 pt-2 border-t border-gray-700">
                <Clock className="w-2 h-2 text-gray-500" />
                <span className="text-[9px] text-gray-500 font-mono">
                    {new Date(node.timestamp).toLocaleTimeString('en-GB', { hour12: false })}
                </span>
            </div>
        </div>
    );
}
