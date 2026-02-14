'use client'

type NodeFilterProps = {
    filter: string
    setFilter: (value: string) => void
}

export default function NodeFilter({ filter, setFilter }: NodeFilterProps) {
    const statuses = ['online', 'offline', 'maintenance']

    return (
        <div className="max-w-screen-2xl mx-auto mb-6 flex flex-col sm:flex-row justify-center gap-3">
            <button
                onClick={() => setFilter('all')}
                className="px-4 py-2 rounded-lg border bg-gray-700 border-gray-600 hover:bg-gray-600"
            >
                All
            </button>

            {statuses.map(status => (
                <button
                    key={status}
                    onClick={() => setFilter(status)}
                    className={`px-4 py-2 rounded-lg border transition
                                ${filter === status
                                    ? 'bg-blue-600 border-blue-500'
                                    : 'bg-gray-800 border-gray-700 hover:bg-gray-700'}`}
                >
                    {status}
                </button>
            ))}
        </div>
    )
}
