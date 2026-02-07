'use client';

import { useState, useEffect } from 'react';

export default function LeadsDashboard() {
    const [leads, setLeads] = useState([]);
    const [loading, setLoading] = useState(true);
    const [ingesting, setIngesting] = useState(false);
    const [error, setError] = useState(null);

    const fetchLeads = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/leads/');
            if (!res.ok) throw new Error('Failed to fetch leads');
            const data = await res.json();
            setLeads(data);
            setError(null);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const triggerIngestion = async () => {
        setIngesting(true);
        try {
            // Using default keywords for now, or you could add an input field
            const res = await fetch('/api/ingestion/trigger', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(["new manufacturing plant India", "boiler commissioning India"]),
            });
            if (!res.ok) throw new Error('Failed to start ingestion');
            alert('Ingestion started successfully! Data will appear shortly.');
            // Optionally refresh data after a delay
            setTimeout(fetchLeads, 5000);
        } catch (err) {
            alert('Error starting ingestion: ' + err.message);
        } finally {
            setIngesting(false);
        }
    };

    useEffect(() => {
        fetchLeads();
    }, []);

    return (
        <div className="w-full max-w-6xl mx-auto p-4">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold dark:text-white">Leads Dashboard</h2>
                <div className="space-x-4">
                    <button
                        onClick={fetchLeads}
                        className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded text-black transition-colors"
                    >
                        Refresh Data
                    </button>
                    <button
                        onClick={triggerIngestion}
                        disabled={ingesting}
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded disabled:bg-blue-400 transition-colors"
                    >
                        {ingesting ? 'Processing...' : 'Run Ingestion'}
                    </button>
                </div>
            </div>

            {error && (
                <div className="p-4 mb-4 text-red-700 bg-red-100 rounded dark:bg-red-900 dark:text-red-100">
                    Error: {error}
                </div>
            )}

            {loading ? (
                <div className="text-center py-10 dark:text-white">Loading data...</div>
            ) : leads.length === 0 ? (
                <div className="text-center py-10 bg-gray-50 dark:bg-zinc-800 rounded-lg dark:text-gray-300">
                    No leads found. Click "Run Ingestion" to fetch data.
                </div>
            ) : (
                <div className="overflow-x-auto shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">ID</th>
                                <th scope="col" className="px-6 py-3">Company</th>
                                <th scope="col" className="px-6 py-3">Product</th>
                                <th scope="col" className="px-6 py-3">Status</th>
                                <th scope="col" className="px-6 py-3">Source Signal</th>
                            </tr>
                        </thead>
                        <tbody>
                            {leads.map((lead) => (
                                <tr key={lead.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                    <td className="px-6 py-4">{lead.id}</td>
                                    <td className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                                        {lead.company_name || 'Unknown'}
                                    </td>
                                    <td className="px-6 py-4">{lead.product_name || 'N/A'}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 rounded-full text-xs ${lead.status === 'New' ? 'bg-green-100 text-green-800' :
                                                lead.status === 'InProgress' ? 'bg-yellow-100 text-yellow-800' :
                                                    'bg-gray-100 text-gray-800'
                                            }`}>
                                            {lead.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 truncate max-w-xs" title={lead.signal_title}>
                                        <a href={lead.signal?.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                                            {lead.signal_title || 'Link'}
                                        </a>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
