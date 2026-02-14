'use client'

import { useState } from 'react'
import useNodes from './hooks/useNodes'
import Card from './components/Card'
import NodeFilter from './components/NodeFilter'
import Header from './components/Header'

export default function Home() {
    const { nodes, error } = useNodes()

    const [filter, setFilter] = useState('all')

    const filteredNodes = filter === 'all'
                            ? nodes
                            : nodes.filter(node => node.status === filter)

    if (error) {
        return (
            <div className="min-h-screen bg-gray-900 text-white">
                <Header/>

                <div className="min-h-screen flex justify-center bg-gray-900 p-8 text-white">
                    Error: {error}
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-900 text-white">
            <Header/>
            <NodeFilter filter={filter} setFilter={setFilter} />

            <div className="max-w-screen-2xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
                {filteredNodes.map(node => (
                    <Card key={node.id} node={node} />
                ))}
            </div>
        </div>
    )
}
