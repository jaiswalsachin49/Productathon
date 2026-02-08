'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import HPCLHeader from '../../../components/HPCLHeader';
import LeadCard from '../../../components/LeadCard';
import api from '../../../services/api';
import { COLORS } from '../../../styles/theme';

export default function OfficerDashboard() {
    const router = useRouter();
    const [leads, setLeads] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all'); // all, new, high-priority

    useEffect(() => {
        loadLeads();
    }, []);

    const loadLeads = async () => {
        try {
            setLoading(true);
            // Fetch all leads for now. In real app, would filter by officer ID
            const data = await api.getLeads({ limit: 50 });
            setLeads(data);
        } catch (error) {
            console.error('Error loading leads:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleLeadClick = (leadId) => {
        // Navigate to detail view (could be modal or page)
        // For officer, maybe a simpler view or reusable lead detail
        // For now, let's keep it simple or expand in place
        // But per requirements, clicking should show details. 
        // Let's redirect to the sales manager detail page for now as a shared view, 
        // or we could build a specific officer detail view.
        // Given time, redirecting is safer.
        router.push(`/sales-manager/lead-detail?id=${leadId}`);
    };

    const filteredLeads = leads.filter(lead => {
        if (filter === 'high-priority') return lead.confidence_score >= 0.75;
        if (filter === 'new') return lead.status === 'NEW';
        return true;
    });

    const stats = {
        total: leads.length,
        new: leads.filter(l => l.status === 'NEW').length,
        highPriority: leads.filter(l => l.confidence_score >= 0.75).length,
        converted: leads.filter(l => l.status === 'WON').length
    };

    return (
        <div style={{ background: '#F5F7FA', minHeight: '100vh', fontFamily: "'Inter', sans-serif" }}>
            <HPCLHeader userRole="Officer" userName="Amit Shahane" />

            <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '24px' }}>
                {/* Stats Row */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '24px' }}>
                    <div style={{ background: 'white', padding: '16px', borderRadius: '8px', borderLeft: `4px solid ${COLORS.hpclBlue}`, boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
                        <div style={{ color: '#666', fontSize: '12px', fontWeight: '600', textTransform: 'uppercase' }}>Total Leads</div>
                        <div style={{ fontSize: '24px', fontWeight: '700', color: '#333' }}>{stats.total}</div>
                    </div>
                    <div style={{ background: 'white', padding: '16px', borderRadius: '8px', borderLeft: `4px solid ${COLORS.hpclRed}`, boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
                        <div style={{ color: '#666', fontSize: '12px', fontWeight: '600', textTransform: 'uppercase' }}>High Priority</div>
                        <div style={{ fontSize: '24px', fontWeight: '700', color: COLORS.hpclRed }}>{stats.highPriority}</div>
                    </div>
                    <div style={{ background: 'white', padding: '16px', borderRadius: '8px', borderLeft: '4px solid #28A745', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
                        <div style={{ color: '#666', fontSize: '12px', fontWeight: '600', textTransform: 'uppercase' }}>Converted</div>
                        <div style={{ fontSize: '24px', fontWeight: '700', color: '#28A745' }}>{stats.converted}</div>
                    </div>
                    <div style={{ background: 'white', padding: '16px', borderRadius: '8px', borderLeft: '4px solid #FFB800', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
                        <div style={{ color: '#666', fontSize: '12px', fontWeight: '600', textTransform: 'uppercase' }}>New Leads</div>
                        <div style={{ fontSize: '24px', fontWeight: '700', color: '#FFB800' }}>{stats.new}</div>
                    </div>
                </div>

                {/* Filters */}
                <div style={{ marginBottom: '24px', display: 'flex', gap: '12px' }}>
                    <button
                        onClick={() => setFilter('all')}
                        style={{
                            padding: '8px 16px',
                            borderRadius: '20px',
                            border: 'none',
                            background: filter === 'all' ? COLORS.hpclBlue : 'white',
                            color: filter === 'all' ? 'white' : '#666',
                            fontWeight: '600',
                            fontSize: '13px',
                            cursor: 'pointer',
                            boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                        }}
                    >
                        All Leads
                    </button>
                    <button
                        onClick={() => setFilter('high-priority')}
                        style={{
                            padding: '8px 16px',
                            borderRadius: '20px',
                            border: 'none',
                            background: filter === 'high-priority' ? COLORS.hpclRed : 'white',
                            color: filter === 'high-priority' ? 'white' : '#666',
                            fontWeight: '600',
                            fontSize: '13px',
                            cursor: 'pointer',
                            boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                        }}
                    >
                        High Priority
                    </button>
                    <button
                        onClick={() => setFilter('new')}
                        style={{
                            padding: '8px 16px',
                            borderRadius: '20px',
                            border: 'none',
                            background: filter === 'new' ? '#FFB800' : 'white',
                            color: filter === 'new' ? 'white' : '#666',
                            fontWeight: '600',
                            fontSize: '13px',
                            cursor: 'pointer',
                            boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                        }}
                    >
                        New Only
                    </button>
                </div>

                {/* Leads Grid */}
                {loading ? (
                    <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>Loading leads...</div>
                ) : filteredLeads.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '40px', color: '#666', background: 'white', borderRadius: '8px' }}>
                        No leads found match criteria.
                    </div>
                ) : (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '24px' }}>
                        {filteredLeads.map(lead => (
                            <div key={lead.id} onClick={() => handleLeadClick(lead.id)} style={{ cursor: 'pointer' }}>
                                <LeadCard lead={lead} />
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}
