'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
    Search,
    Filter,
    MoreHorizontal,
    Phone,
    Mail,
    MapPin,
    Calendar,
    ArrowUpRight
} from '../../../components/Icons';
import { useAuth } from '../../../context/AuthContext';
import { COLORS } from '../../../styles/theme';

export default function MyLeadsPage() {
    const { user } = useAuth();
    const [leads, setLeads] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('ALL');

    useEffect(() => {
        const fetchLeads = async () => {
            try {
                const officerName = user?.name || 'Amit Sharma';
                let url = `http://localhost:8000/leads/?assigned_officer=${officerName}`;
                if (statusFilter !== 'ALL') {
                    url += `&status=${statusFilter}`;
                }

                const response = await fetch(url);
                if (response.ok) {
                    const data = await response.json();

                    // Use mock data if API returns empty
                    if (data.length === 0) {
                        const mockLeads = [
                            {
                                id: 1,
                                company_name: "Reliance Retail",
                                company: { city: "Mumbai", state: "Maharashtra" },
                                product_need: "Diesel - 5000L/month",
                                lead_quality: "HIGH",
                                confidence_score: 0.92,
                                status: "NEW",
                                created_at: new Date().toISOString(),
                                signal_title: "Fleet expansion announcement"
                            },
                            {
                                id: 2,
                                company_name: "Tata Motors",
                                company: { city: "Pune", state: "Maharashtra" },
                                product_need: "Lubricants - Premium Grade",
                                lead_quality: "HIGH",
                                confidence_score: 0.88,
                                status: "CONTACTED",
                                created_at: new Date(Date.now() - 86400000).toISOString(),
                                signal_title: "Manufacturing capacity increase"
                            },
                            {
                                id: 3,
                                company_name: "Mahindra Logistics",
                                company: { city: "Nagpur", state: "Maharashtra" },
                                product_need: "Diesel - 8000L/month",
                                lead_quality: "HIGH",
                                confidence_score: 0.85,
                                status: "NEW",
                                created_at: new Date(Date.now() - 172800000).toISOString(),
                                signal_title: "New distribution center opening"
                            },
                            {
                                id: 4,
                                company_name: "Blue Dart Express",
                                company: { city: "Mumbai", state: "Maharashtra" },
                                product_need: "Diesel - 3000L/month",
                                lead_quality: "MEDIUM",
                                confidence_score: 0.72,
                                status: "CONTACTED",
                                created_at: new Date(Date.now() - 259200000).toISOString(),
                                signal_title: "Partnership with major e-commerce"
                            },
                            {
                                id: 5,
                                company_name: "Godrej Industries",
                                company: { city: "Mumbai", state: "Maharashtra" },
                                product_need: "LPG - Industrial Grade",
                                lead_quality: "MEDIUM",
                                confidence_score: 0.68,
                                status: "QUALIFIED",
                                created_at: new Date(Date.now() - 345600000).toISOString(),
                                signal_title: "New facility construction"
                            },
                            {
                                id: 6,
                                company_name: "VRL Logistics",
                                company: { city: "Nagpur", state: "Maharashtra" },
                                product_need: "Diesel - 6000L/month",
                                lead_quality: "HIGH",
                                confidence_score: 0.81,
                                status: "NEW",
                                created_at: new Date(Date.now() - 432000000).toISOString(),
                                signal_title: "Fleet modernization program"
                            },
                            {
                                id: 7,
                                company_name: "Larsen & Toubro",
                                company: { city: "Mumbai", state: "Maharashtra" },
                                product_need: "Diesel & Lubricants",
                                lead_quality: "HIGH",
                                confidence_score: 0.79,
                                status: "QUALIFIED",
                                created_at: new Date(Date.now() - 518400000).toISOString(),
                                signal_title: "New infrastructure project"
                            },
                            {
                                id: 8,
                                company_name: "Aditya Birla Group",
                                company: { city: "Pune", state: "Maharashtra" },
                                product_need: "Industrial Fuels",
                                lead_quality: "MEDIUM",
                                confidence_score: 0.65,
                                status: "CONTACTED",
                                created_at: new Date(Date.now() - 604800000).toISOString(),
                                signal_title: "Plant capacity expansion"
                            }
                        ];
                        setLeads(mockLeads);
                        return;
                    }

                    setLeads(data);
                }
            } catch (error) {
                console.error("Failed to fetch leads:", error);
                // Use mock data on error
                const mockLeads = [
                    {
                        id: 1,
                        company_name: "Reliance Retail",
                        company: { city: "Mumbai", state: "Maharashtra" },
                        product_need: "Diesel - 5000L/month",
                        lead_quality: "HIGH",
                        confidence_score: 0.92,
                        status: "NEW"
                    },
                    {
                        id: 2,
                        company_name: "Tata Motors",
                        company: { city: "Pune", state: "Maharashtra" },
                        product_need: "Lubricants - Premium",
                        lead_quality: "HIGH",
                        confidence_score: 0.88,
                        status: "CONTACTED"
                    }
                ];
                setLeads(mockLeads);
            } finally {
                setLoading(false);
            }
        };

        if (user) {
            fetchLeads();
        }
    }, [user, statusFilter]);

    const filteredLeads = leads.filter(lead =>
        lead.company_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.company?.city?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const getStatusColor = (status) => {
        switch (status) {
            case 'NEW': return { bg: '#E3F2FD', text: '#1976D2' };
            case 'CONTACTED': return { bg: '#FFF3E0', text: '#F57C00' };
            case 'QUALIFIED': return { bg: '#E8F5E9', text: '#388E3C' };
            case 'WON': return { bg: '#F3E5F5', text: '#7B1FA2' };
            case 'LOST': return { bg: '#FFEBEE', text: '#D32F2F' };
            default: return { bg: '#F5F5F5', text: '#616161' };
        }
    };

    return (
        <div>
            <div style={{ marginBottom: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#1A1A1A' }}>My Leads</h1>
                    <p style={{ color: '#666', marginTop: '4px' }}>Manage and track your assigned opportunities</p>
                </div>
                <button
                    onClick={() => alert("Add Lead feature coming soon!")}
                    style={{
                        background: COLORS.hpclBlue,
                        color: 'white',
                        border: 'none',
                        padding: '12px 24px',
                        borderRadius: '8px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                    }}>
                    <ArrowUpRight size={18} /> Add New Lead
                </button>
            </div>

            {/* Filters & Search */}
            <div style={{
                background: 'white',
                padding: '16px',
                borderRadius: '12px',
                border: '1px solid #E0E0E0',
                marginBottom: '24px',
                display: 'flex',
                gap: '16px',
                alignItems: 'center'
            }}>
                <div style={{ position: 'relative', flex: 1 }}>
                    <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#999' }} />
                    <input
                        type="text"
                        placeholder="Search by company, location..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{
                            width: '100%',
                            padding: '10px 10px 10px 40px',
                            borderRadius: '8px',
                            border: '1px solid #E0E0E0',
                            outline: 'none',
                            fontSize: '14px'
                        }}
                    />
                </div>
                <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    style={{
                        padding: '10px 16px',
                        borderRadius: '8px',
                        border: '1px solid #E0E0E0',
                        outline: 'none',
                        fontSize: '14px',
                        background: 'white',
                        minWidth: '160px'
                    }}
                >
                    <option value="ALL">All Statuses</option>
                    <option value="NEW">New</option>
                    <option value="CONTACTED">Contacted</option>
                    <option value="QUALIFIED">Qualified</option>
                    <option value="WON">Won</option>
                    <option value="LOST">Lost</option>
                </select>
            </div>

            {/* Leads List */}
            <div style={{
                background: 'white',
                borderRadius: '12px',
                border: '1px solid #E0E0E0',
                overflow: 'hidden'
            }}>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: '2fr 1.5fr 1fr 1fr 1fr 0.5fr',
                    padding: '16px 24px',
                    background: '#F9FAFB',
                    borderBottom: '1px solid #E0E0E0',
                    fontSize: '12px',
                    fontWeight: '600',
                    color: '#666',
                    textTransform: 'uppercase'
                }}>
                    <div>Company Name</div>
                    <div>Location</div>
                    <div>Product Category</div>
                    <div>Priority</div>
                    <div>Status</div>
                    <div></div>
                </div>

                {loading ? (
                    <div style={{ padding: '40px', textAlign: 'center', color: '#666' }}>Loading leads...</div>
                ) : filteredLeads.length > 0 ? (
                    filteredLeads.map((lead) => {
                        const statusStyle = getStatusColor(lead.status);
                        return (
                            <div key={lead.id} style={{
                                display: 'grid',
                                gridTemplateColumns: '2fr 1.5fr 1fr 1fr 1fr 0.5fr',
                                padding: '20px 24px',
                                borderBottom: '1px solid #F0F0F0',
                                alignItems: 'center',
                                fontSize: '14px',
                                color: '#333'
                            }}>
                                <div>
                                    <div style={{ fontWeight: '600', color: '#1A1A1A' }}>{lead.company_name}</div>
                                    <div style={{ fontSize: '12px', color: '#888', marginTop: '2px' }}>ID: HP-{89420 + lead.id}</div>
                                </div>
                                <div style={{ color: '#555' }}>
                                    {lead.company?.city || 'Mumbai'}, {lead.company?.state || 'MH'}
                                </div>
                                <div>
                                    <span style={{
                                        background: '#F0F0F0',
                                        padding: '4px 8px',
                                        borderRadius: '4px',
                                        fontSize: '12px',
                                        color: '#555'
                                    }}>
                                        {lead.product_name || 'Industrial Lubricants'}
                                    </span>
                                </div>
                                <div>
                                    {lead.lead_quality === 'HIGH' && (
                                        <span style={{
                                            background: '#FFEBEE',
                                            color: '#C62828',
                                            padding: '4px 8px',
                                            borderRadius: '4px',
                                            fontSize: '11px',
                                            fontWeight: '700'
                                        }}>
                                            HIGH
                                        </span>
                                    )}
                                    {lead.lead_quality === 'MEDIUM' && (
                                        <span style={{
                                            background: '#FFF3E0',
                                            color: '#E65100',
                                            padding: '4px 8px',
                                            borderRadius: '4px',
                                            fontSize: '11px',
                                            fontWeight: '700'
                                        }}>
                                            MEDIUM
                                        </span>
                                    )}
                                </div>
                                <div>
                                    <span style={{
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: '6px',
                                        color: statusStyle.text,
                                        fontSize: '13px',
                                        fontWeight: '500'
                                    }}>
                                        <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: statusStyle.text }}></span>
                                        {lead.status}
                                    </span>
                                </div>
                                <div style={{ textAlign: 'right' }}>
                                    <Link href={`/sales-officer/leads/${lead.id}`} style={{
                                        color: COLORS.hpclBlue,
                                        fontWeight: '600',
                                        textDecoration: 'none',
                                        fontSize: '13px'
                                    }}>
                                        View
                                    </Link>
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <div style={{ padding: '40px', textAlign: 'center', color: '#666' }}>
                        No leads found matching your filters.
                    </div>
                )}
            </div>
        </div>
    );
}
