'use client'

import { useState, useEffect } from 'react'
import type { Node } from '../types/types'

const getApiUrl = () => {
    if (typeof window !== 'undefined') {
        const hostname = window.location.hostname
        return `http://${hostname}:3001/api/nodes`
    }

    return 'http://localhost:3001/api/nodes'
}

export default function useNodes() {
    const [nodes, setNodes] = useState<Node[]>([])
    const [error, setError] = useState<string | null>(null)

    const API_URL = getApiUrl()

    useEffect(() => {
        async function fetchData() {
            try {
                const res = await fetch(API_URL)
                if (!res.ok) {
                    throw new Error(`HTTP error: ${res.status}`)
                }

                const data: Node[] = await res.json()
                setNodes(data)
                setError(null)
            } catch (e) {
                setError(e instanceof Error ? e.message : "Fetching data error")
            }
        }

        fetchData()

        const interval = setInterval(fetchData, 3000)
        return () => clearInterval(interval)
    }, [])

    return {nodes, error}
}