'use client';

import { useState, useEffect } from 'react';
import {
    Users,
    Flame,
    ClipboardList,
    TrendingUp,
    MapPin,
    Calendar,
    ArrowRight
} from '../../../components/Icons';
import { useAuth } from '../../../context/AuthContext';
import { COLORS } from '../../../styles/theme';
import Link from 'next/link';

export default function SalesOfficerDashboard() {
    const { user } = useAuth();
    const [stats, setStats] = useState({
        totalLeads: 0,
        hotLeads: 0,
        pendingActions: 0
    });
    const [recentLeads, setRecentLeads] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch leads assigned to this officer
                // For hackathon, we'll fetch all leads and filter client-side if needed, 
                // or use the new assigned_officer filter we added to API
                const officerName = user?.name || 'Amit Sharma';
                const response = await fetch(`http://localhost:8000/leads/?assigned_officer=${officerName}`);
                if (response.ok) {
                    const data = await response.json();

                    // Use mock data if API returns empty
                    if (data.length === 0) {
                        const mockLeads = [
                            {
                                id: 1,
                                company_name: "Reliance Retail",
                                city: "Mumbai",
                                state: "Maharashtra",
                                product_need: "Diesel - 5000L/month",
                                lead_quality: "HIGH",
                                confidence_score: 0.92,
                                status: "NEW",
                                created_at: new Date().toISOString()
                            },
                            {
                                id: 2,
                                company_name: "Tata Motors",
                                city: "Pune",
                                state: "Maharashtra",
                                product_need: "Lubricants - Premium",
                                lead_quality: "HIGH",
                                confidence_score: 0.88,
                                status: "CONTACTED",
                                created_at: new Date(Date.now() - 86400000).toISOString()
                            },
                            {
                                id: 3,
                                company_name: "Mahindra Logistics",
                                city: "Nagpur",
                                state: "Maharashtra",
                                product_need: "Diesel - 8000L/month",
                                lead_quality: "HIGH",
                                confidence_score: 0.85,
                                status: "NEW",
                                created_at: new Date(Date.now() - 172800000).toISOString()
                            },
                            {
                                id: 4,
                                company_name: "Blue Dart Express",
                                city: "Mumbai",
                                state: "Maharashtra",
                                product_need: "Diesel - 3000L/month",
                                lead_quality: "MEDIUM",
                                confidence_score: 0.72,
                                status: "CONTACTED",
                                created_at: new Date(Date.now() - 259200000).toISOString()
                            },
                            {
                                id: 5,
                                company_name: "Godrej Industries",
                                city: "Mumbai",
                                state: "Maharashtra",
                                product_need: "LPG - Industrial",
                                lead_quality: "MEDIUM",
                                confidence_score: 0.68,
                                status: "QUALIFIED",
                                created_at: new Date(Date.now() - 345600000).toISOString()
                            }
                        ];

                        setStats({
                            totalLeads: 12,
                            hotLeads: 5,
                            pendingActions: 7
                        });

                        setRecentLeads(mockLeads.slice(0, 5));
                        return;
                    }

                    // Cap data for demo if needed, or use real counts
                    setStats({
                        totalLeads: data.length,
                        hotLeads: data.filter(l => l.lead_quality === 'HIGH').length,
                        pendingActions: data.filter(l => l.status === 'NEW' || l.status === 'CONTACTED').length
                    });

                    setRecentLeads(data.slice(0, 5));
                }
            } catch (error) {
                console.error("Failed to fetch dashboard data:", error);
                // Use mock data on error
                const mockLeads = [
                    {
                        id: 1,
                        company_name: "Reliance Retail",
                        city: "Mumbai",
                        state: "Maharashtra",
                        product_need: "Diesel - 5000L/month",
                        lead_quality: "HIGH",
                        confidence_score: 0.92,
                        status: "NEW"
                    },
                    {
                        id: 2,
                        company_name: "Tata Motors",
                        city: "Pune",
                        state: "Maharashtra",
                        product_need: "Lubricants - Premium",
                        lead_quality: "HIGH",
                        confidence_score: 0.88,
                        status: "CONTACTED"
                    }
                ];
                setStats({
                    totalLeads: 12,
                    hotLeads: 5,
                    pendingActions: 7
                });
                setRecentLeads(mockLeads);
            } finally {
                setLoading(false);
            }
        };

        if (user) {
            fetchData();
        }
    }, [user]);

    const MetricCard = ({ title, value, icon: Icon, color, trend }) => (
        <div style={{
            background: 'white',
            borderRadius: '12px',
            padding: '24px',
            border: '1px solid #E0E0E0',
            display: 'flex',
            alignItems: 'center',
            gap: '20px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.02)'
        }}>
            <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                background: `${color}15`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: color
            }}>
                <Icon size={24} />
            </div>
            <div>
                <div style={{ fontSize: '13px', color: '#666', fontWeight: '500', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    {title}
                </div>
                <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#1A1A1A', lineHeight: '1.2', marginTop: '4px' }}>
                    {value}
                </div>
            </div>
        </div>
    );

    return (
        <div>
            <div style={{ marginBottom: '32px' }}>
                <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#1A1A1A', marginBottom: '8px' }}>
                    Welcome back, {user?.name?.split(' ')[0]} 👋
                </h1>
                <p style={{ color: '#666' }}>Here's what's happening in your territory today.</p>
            </div>

            {/* Metrics Grid */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                gap: '24px',
                marginBottom: '40px'
            }}>
                <MetricCard
                    title="Total Leads"
                    value={stats.totalLeads}
                    icon={Users}
                    color={COLORS.hpclBlue}
                />
                <MetricCard
                    title="Hot Leads"
                    value={stats.hotLeads}
                    icon={Flame}
                    color="#E31E24"
                />
                <MetricCard
                    title="Pending Actions"
                    value={stats.pendingActions}
                    icon={ClipboardList}
                    color="#F57C00"
                />
            </div>

            {/* Recent Activity / Leads */}
            <div style={{
                background: 'white',
                borderRadius: '16px',
                border: '1px solid #E0E0E0',
                overflow: 'hidden'
            }}>
                <div style={{
                    padding: '24px',
                    borderBottom: '1px solid #E0E0E0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                }}>
                    <h2 style={{ fontSize: '18px', fontWeight: 'bold', color: '#1A1A1A' }}>Recent Leads</h2>
                    <Link href="/sales-officer/leads" style={{
                        color: COLORS.hpclBlue,
                        fontWeight: '600',
                        fontSize: '14px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        textDecoration: 'none'
                    }}>
                        View All <ArrowRight size={16} />
                    </Link>
                </div>

                <div>
                    {loading ? (
                        <div style={{ padding: '40px', textAlign: 'center', color: '#666' }}>Loading leads...</div>
                    ) : recentLeads.length > 0 ? (
                        recentLeads.map((lead, index) => (
                            <div key={lead.id} style={{
                                padding: '20px 24px',
                                borderBottom: index < recentLeads.length - 1 ? '1px solid #F0F0F0' : 'none',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                transition: 'background 0.2s',
                                cursor: 'pointer',
                            }}
                                className="hover:bg-gray-50"
                            >
                                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                                    <div style={{
                                        width: '40px',
                                        height: '40px',
                                        borderRadius: '8px',
                                        background: '#F5F7FA',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontWeight: 'bold',
                                        color: COLORS.hpclBlue
                                    }}>
                                        {lead.company_name?.substring(0, 2).toUpperCase() || 'CO'}
                                    </div>
                                    <div>
                                        <div style={{ fontWeight: '600', color: '#1A1A1A', marginBottom: '2px' }}>
                                            {lead.company_name}
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '12px', color: '#666' }}>
                                            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                                <MapPin size={12} /> {lead.company?.city || 'Mumbai'}
                                            </span>
                                            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                                <Calendar size={12} /> {new Date(lead.created_at).toLocaleDateString()}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                                    {lead.lead_quality === 'HIGH' && (
                                        <span style={{
                                            background: '#FFEBEE',
                                            color: '#C62828',
                                            fontSize: '11px',
                                            fontWeight: '600',
                                            padding: '4px 8px',
                                            borderRadius: '4px'
                                        }}>
                                            HIGH INTENT
                                        </span>
                                    )}
                                    <Link
                                        href={`/sales-officer/leads/${lead.id}`}
                                        style={{
                                            padding: '8px 16px',
                                            borderRadius: '6px',
                                            border: '1px solid #E0E0E0',
                                            background: 'white',
                                            color: '#333',
                                            fontSize: '13px',
                                            fontWeight: '500',
                                            textDecoration: 'none'
                                        }}
                                    >
                                        View Details
                                    </Link>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div style={{ padding: '40px', textAlign: 'center', color: '#666' }}>
                            No active leads found.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
