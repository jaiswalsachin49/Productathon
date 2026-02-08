'use client';

import { useState, useEffect } from 'react';
import { COLORS } from '../../../styles/theme';
import SalesManagerLayout from '../../../components/SalesManagerLayout';
import api from '../../../services/api';

// Professional Product Category Icons
const FuelIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M19.77 7.23l.01-.01-3.72-3.72L15 4.56l2.11 2.11c-.94.36-1.61 1.26-1.61 2.33 0 1.38 1.12 2.5 2.5 2.5.36 0 .69-.08 1-.21v7.21c0 .55-.45 1-1 1s-1-.45-1-1V14c0-1.1-.9-2-2-2h-1V5c0-1.1-.9-2-2-2H6c-1.1 0-2 .9-2 2v16h10v-7.5h1.5v5c0 1.38 1.12 2.5 2.5 2.5s2.5-1.12 2.5-2.5V9c0-.69-.28-1.32-.73-1.77z" fill="#E31E24" />
    </svg>
);

const LubricantIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2zm0 15l-5-2.18L7 18V5h10v13z" fill="#005BAC" />
        <circle cx="12" cy="10" r="2.5" fill="#4A90E2" />
    </svg>
);

const LPGIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M13.5 .67s.74 2.65.74 4.8c0 2.06-1.35 3.73-3.41 3.73-2.07 0-3.63-1.67-3.63-3.73l.03-.36C5.21 7.51 4 10.62 4 14c0 4.42 3.58 8 8 8s8-3.58 8-8C20 8.61 17.41 3.8 13.5.67zM11.71 19c-1.78 0-3.22-1.4-3.22-3.14 0-1.62 1.05-2.76 2.81-3.12 1.77-.36 3.6-1.21 4.62-2.58.39 1.29.59 2.65.59 4.04 0 2.65-2.15 4.8-4.8 4.8z" fill="#FF6B00" />
    </svg>
);

const BitumenIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M19 2H9c-1.1 0-2 .9-2 2v5.5c0 .83.67 1.5 1.5 1.5.83 0 1.5-.67 1.5-1.5V4h9v16h-3v-2c0-1.1-.9-2-2-2h-4c-1.1 0-2 .9-2 2v2H5V8H3v11c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-5 18h-4v-2h4v2z" fill="#333333" />
    </svg>
);

// KPI Card Icons
const LeadsIcon = ({ color, opacity = 1 }) => (
    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ opacity }}>
        <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z" fill={color} />
    </svg>
);

const AlertIcon = ({ color, opacity = 1 }) => (
    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ opacity }}>
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" fill={color} />
    </svg>
);

const ConvertedIcon = ({ color, opacity = 1 }) => (
    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ opacity }}>
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" fill={color} />
    </svg>
);

const PendingIcon = ({ color, opacity = 1 }) => (
    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ opacity }}>
        <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z" fill={color} />
    </svg>
);

// Petrol Tanker Icon for Progress Bar (Moves with progress)
const PetrolTankerIcon = ({ color }) => (
    <svg width="24" height="14" viewBox="0 0 24 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M18 4h-1V2H4v2H1v6h2.23l.64 2.56C4.19 13.43 4.96 14 5.86 14h.28c.9 0 1.67-.57 1.99-1.44L8.77 10h6.46l.64 2.56c.32.87 1.09 1.44 1.99 1.44h.28c.9 0 1.67-.57 1.99-1.44L20.77 10H22V6h-2V4zM6 12.5c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm12 0c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z" fill={color} />
        <rect x="5" y="4" width="10" height="4" rx="1" fill="#FFFFFF" fillOpacity="0.3" />
    </svg>
);

export default function SalesManagerDashboard() {
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState(null);
    const [topProductsData, setTopProductsData] = useState([]);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            setLoading(true);
            const [statsData, productsData] = await Promise.all([
                api.getDashboardStats(),
                api.getTopProducts()
            ]);
            setStats(statsData);
            setTopProductsData(productsData.products || []);
        } catch (error) {
            console.error('Failed to load dashboard data:', error);
        } finally {
            setLoading(false);
        }
    };

    // Derived metrics from real data
    const metrics = stats ? {
        totalLeads: { value: stats.total, change: '+0%', label: 'vs last month' },
        highPriority: { value: stats.highPriority, label: 'REQUIRES ACTION', isAlert: true },
        converted: { value: stats.won, change: '+0%', rate: `${stats.conversionRate}%` },
        pending: { value: stats.pending, change: '-0%', avgAge: '0.0 days' },
    } : null;

    const leadsBreakdown = stats ? [
        { status: 'New', count: stats.new, color: '#005BAC' },
        { status: 'Qualified', count: stats.qualified, color: '#4A90E2' },
        { status: 'Contacted', count: stats.contacted, color: '#FFB800' },
        { status: 'Lost', count: stats.lost, color: '#E31E24' },
    ] : [];

    const topProducts = topProductsData.map(p => ({
        name: p.name,
        icon: FuelIcon, // Default icon
        units: `${p.count} Leads`,
        target: Math.min(Math.round((p.count / (stats?.total || 1)) * 100), 100),
        status: 'ACTIVE',
        statusColor: '#28A745'
    }));

    const recentActivity = [
        { user: 'System', action: 'ingested', highlight: 'New Signal', entity: 'Market Update', time: 'Just now', location: 'Auto-Ingestion', type: 'success' },
    ];

    if (loading) {
        return (
            <SalesManagerLayout>
                <div style={{ padding: '60px', textAlign: 'center', color: '#666' }}>
                    Loading HPCL Intelligence Dashboard...
                </div>
            </SalesManagerLayout>
        );
    }

    if (!stats) return null;

    return (
        <SalesManagerLayout>
            <div style={{ padding: '24px' }}>
                {/* Header */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'start',
                    marginBottom: '24px',
                }}>
                    <div>
                        <h1 style={{ fontSize: '28px', fontWeight: '700', color: '#1A1A1A', marginBottom: '4px' }}>
                            Regional Overview
                        </h1>
                        <p style={{ fontSize: '14px', color: '#666666' }}>
                            Real-time performance metrics for the West Zone (Gujarat)
                        </p>
                    </div>
                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                        <button style={{
                            padding: '8px 14px',
                            background: '#FFFFFF',
                            border: '1px solid #E0E0E0',
                            borderRadius: '6px',
                            fontSize: '12px',
                            fontWeight: '500',
                            color: '#666666',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                        }}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11z" fill="#666666" />
                            </svg>
                            This Month
                        </button>
                        <button style={{
                            padding: '8px 16px',
                            background: COLORS.hpclBlue,
                            border: 'none',
                            borderRadius: '6px',
                            color: '#FFFFFF',
                            fontSize: '13px',
                            fontWeight: '600',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                        }}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M19 12v7H5v-7H3v7c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-7h-2zm-6 .67l2.59-2.58L17 11.5l-5 5-5-5 1.41-1.41L11 12.67V3h2v9.67z" fill="white" />
                            </svg>
                            Export Report
                        </button>
                    </div>
                </div>

                {/* Premium Metrics Cards */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(4, 1fr)',
                    gap: '24px', // Increased gap
                    marginBottom: '32px', // Increased margin
                }}>
                    {/* Total Leads Card */}
                    <div style={{
                        background: '#FFFFFF',
                        borderRadius: '12px',
                        padding: '24px',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                        borderLeft: `4px solid ${COLORS.hpclBlue}`,
                        position: 'relative',
                        overflow: 'hidden',
                        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                        cursor: 'default',
                    }}
                        onMouseOver={(e) => {
                            e.currentTarget.style.transform = 'translateY(-2px)';
                            e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.08)';
                        }}
                        onMouseOut={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.05)';
                        }}>
                        <div style={{ position: 'relative', zIndex: 1 }}>
                            <div style={{ fontSize: '11px', color: '#666666', marginBottom: '8px', textTransform: 'uppercase', fontWeight: '600', letterSpacing: '0.5px' }}>Total Leads</div>
                            <div style={{ fontSize: '32px', fontWeight: '700', color: '#1A1A1A', marginBottom: '8px', lineHeight: '1.2' }}>
                                {metrics.totalLeads.value.toLocaleString()}
                            </div>
                            <div style={{ fontSize: '13px', color: COLORS.hpclBlue, fontWeight: '600', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M23 6l-9.5 9.5-5-5L1 18" /></svg>
                                {metrics.totalLeads.change} <span style={{ color: '#999999', fontWeight: 500 }}>{metrics.totalLeads.label}</span>
                            </div>
                        </div>
                        <div style={{ position: 'absolute', right: '-10px', top: '10px', zIndex: 0 }}>
                            <LeadsIcon color={COLORS.hpclBlue} opacity={0.08} />
                        </div>
                    </div>

                    {/* High Priority Card */}
                    <div style={{
                        background: '#FFFFFF',
                        borderRadius: '12px',
                        padding: '24px',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                        borderLeft: `4px solid ${COLORS.hpclRed}`,
                        position: 'relative',
                        overflow: 'hidden',
                        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                    }}
                        onMouseOver={(e) => {
                            e.currentTarget.style.transform = 'translateY(-2px)';
                            e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.08)';
                        }}
                        onMouseOut={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.05)';
                        }}>
                        <div style={{ position: 'relative', zIndex: 1 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                                <div style={{ fontSize: '11px', color: '#666666', textTransform: 'uppercase', fontWeight: '600', letterSpacing: '0.5px' }}>High Priority</div>
                                <div style={{
                                    fontSize: '10px',
                                    color: COLORS.hpclRed,
                                    fontWeight: '700',
                                    background: '#FFF0F0',
                                    padding: '4px 8px',
                                    borderRadius: '12px',
                                    border: `1px solid ${COLORS.hpclRed}20`,
                                }}>
                                    {metrics.highPriority.label}
                                </div>
                            </div>
                            <div style={{ fontSize: '32px', fontWeight: '700', color: COLORS.hpclRed, marginBottom: '8px', lineHeight: '1.2' }}>
                                {metrics.highPriority.value}
                            </div>
                        </div>
                        <div style={{ position: 'absolute', right: '-10px', top: '10px', zIndex: 0 }}>
                            <AlertIcon color={COLORS.hpclRed} opacity={0.08} />
                        </div>
                    </div>

                    {/* Converted Card */}
                    <div style={{
                        background: '#FFFFFF',
                        borderRadius: '12px',
                        padding: '24px',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                        borderLeft: '4px solid #28A745',
                        position: 'relative',
                        overflow: 'hidden',
                        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                    }}
                        onMouseOver={(e) => {
                            e.currentTarget.style.transform = 'translateY(-2px)';
                            e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.08)';
                        }}
                        onMouseOut={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.05)';
                        }}>
                        <div style={{ position: 'relative', zIndex: 1 }}>
                            <div style={{ fontSize: '11px', color: '#666666', marginBottom: '8px', textTransform: 'uppercase', fontWeight: '600', letterSpacing: '0.5px' }}>Converted</div>
                            <div style={{ fontSize: '32px', fontWeight: '700', color: '#1A1A1A', marginBottom: '8px', lineHeight: '1.2' }}>
                                {metrics.converted.value}
                            </div>
                            <div style={{ fontSize: '13px', color: '#28A745', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M23 6l-9.5 9.5-5-5L1 18" /></svg>
                                {metrics.converted.change} <span style={{ color: '#999999', fontWeight: 500 }}>Rate: {metrics.converted.rate}</span>
                            </div>
                        </div>
                        <div style={{ position: 'absolute', right: '-10px', top: '10px', zIndex: 0 }}>
                            <ConvertedIcon color="#28A745" opacity={0.1} />
                        </div>
                    </div>

                    {/* Pending Card */}
                    <div style={{
                        background: '#FFFFFF',
                        borderRadius: '12px',
                        padding: '24px',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                        borderLeft: '4px solid #F59E0B',
                        position: 'relative',
                        overflow: 'hidden',
                        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                    }}
                        onMouseOver={(e) => {
                            e.currentTarget.style.transform = 'translateY(-2px)';
                            e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.08)';
                        }}
                        onMouseOut={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.05)';
                        }}>
                        <div style={{ position: 'relative', zIndex: 1 }}>
                            <div style={{ fontSize: '11px', color: '#666666', marginBottom: '8px', textTransform: 'uppercase', fontWeight: '600', letterSpacing: '0.5px' }}>Pending</div>
                            <div style={{ fontSize: '32px', fontWeight: '700', color: '#1A1A1A', marginBottom: '8px', lineHeight: '1.2' }}>
                                {metrics.pending.value}
                            </div>
                            <div style={{ fontSize: '13px', color: '#F59E0B', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                <span style={{ color: '#F59E0B' }}>{metrics.pending.change}</span> <span style={{ color: '#999999', fontWeight: 500 }}>Avg: {metrics.pending.avgAge}</span>
                            </div>
                        </div>
                        <div style={{ position: 'absolute', right: '-10px', top: '10px', zIndex: 0 }}>
                            <PendingIcon color="#F59E0B" opacity={0.1} />
                        </div>
                    </div>
                </div>

                {/* Charts Row */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 2fr',
                    gap: '20px',
                    marginBottom: '24px',
                }}>
                    {/* Leads by Status */}
                    <div style={{
                        background: '#FFFFFF',
                        borderRadius: '12px',
                        padding: '24px',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                    }}>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginBottom: '20px',
                        }}>
                            <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#1A1A1A' }}>Leads by Status</h3>
                        </div>

                        {/* Simplified Donut Chart */}
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginBottom: '20px',
                        }}>
                            <div style={{
                                width: '160px',
                                height: '160px',
                                borderRadius: '50%',
                                background: `conic-gradient(
                  ${leadsBreakdown[0].color} 0deg 120deg,
                  ${leadsBreakdown[1].color} 120deg 240deg,
                  ${leadsBreakdown[2].color} 240deg 310deg,
                  ${leadsBreakdown[3].color} 310deg 360deg
                )`,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                position: 'relative',
                            }}>
                                <div style={{
                                    width: '110px',
                                    height: '110px',
                                    borderRadius: '50%',
                                    background: '#FFFFFF',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}>
                                    <div style={{ fontSize: '26px', fontWeight: '700', color: '#1A1A1A' }}>
                                        {metrics.totalLeads.value.toLocaleString()}
                                    </div>
                                    <div style={{ fontSize: '10px', color: '#999999', fontWeight: '600' }}>TOTAL</div>
                                </div>
                            </div>
                        </div>

                        {/* Legend */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            {leadsBreakdown.map((item, idx) => (
                                <div key={idx} style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <div style={{
                                            width: '12px',
                                            height: '12px',
                                            borderRadius: '50%',
                                            background: item.color,
                                        }} />
                                        <span style={{ fontSize: '13px', color: '#333333' }}>{item.status}</span>
                                    </div>
                                    <span style={{ fontSize: '14px', fontWeight: '700', color: '#1A1A1A' }}>{item.count}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Top Products Performance */}
                    <div style={{
                        background: '#FFFFFF',
                        borderRadius: '12px',
                        padding: '24px',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                    }}>
                        <div style={{
                            marginBottom: '16px',
                        }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                                <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#1A1A1A' }}>Top Products Performance</h3>
                            </div>
                            <div style={{ fontSize: '10px', color: '#999999', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' }}>SORT BY: VOLUME ▼</div>
                        </div>

                        {/* Table */}
                        <div>
                            {/* Header */}
                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: '2fr 1fr 1fr 1fr',
                                gap: '16px',
                                padding: '12px 0',
                                borderBottom: '1px solid #F0F0F0',
                                fontSize: '11px',
                                color: '#999999',
                                fontWeight: '600',
                                textTransform: 'uppercase',
                            }}>
                                <div>PRODUCT CATEGORY</div>
                                <div>UNITS SOLD</div>
                                <div>TARGET %</div>
                                <div>STATUS</div>
                            </div>

                            {/* Rows */}
                            {topProducts.map((product, idx) => (
                                <div key={idx} style={{
                                    display: 'grid',
                                    gridTemplateColumns: '2fr 1fr 1fr 1fr',
                                    gap: '16px',
                                    padding: '16px 0',
                                    borderBottom: idx < topProducts.length - 1 ? '1px solid #F5F5F5' : 'none',
                                    alignItems: 'center',
                                }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                        <product.icon />
                                        <span style={{ fontSize: '14px', color: '#333333' }}>{product.name}</span>
                                    </div>
                                    <div style={{ fontSize: '14px', fontWeight: '600', color: '#1A1A1A' }}>
                                        {product.units}
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <div style={{
                                            flex: 1,
                                            height: '6px',
                                            background: '#F0F0F0',
                                            borderRadius: '3px',
                                            position: 'relative', // Added for absolute positioning of icon
                                            marginTop: '6px', // Added space for the icon
                                            marginBottom: '6px'
                                        }}>
                                            <div style={{
                                                width: `${product.target}%`,
                                                height: '100%',
                                                background: product.target >= 80 ? '#28A745' : product.target >= 50 ? '#4A90E2' : '#E31E24',
                                                borderRadius: '3px',
                                                position: 'relative',
                                            }}>
                                                {/* Petrol Tanker Icon */}
                                                <div style={{
                                                    position: 'absolute',
                                                    right: '-12px', // Center the icon on the end of the bar
                                                    top: '50%',
                                                    transform: 'translateY(-50%)',
                                                    zIndex: 10,
                                                    transition: 'all 0.3s ease'
                                                }}>
                                                    <PetrolTankerIcon color={product.target >= 80 ? '#28A745' : product.target >= 50 ? '#4A90E2' : '#E31E24'} />
                                                </div>
                                            </div>
                                        </div>
                                        <span style={{ fontSize: '12px', fontWeight: '700', color: '#333333' }}>
                                            {product.target}%
                                        </span>
                                    </div>
                                    <div>
                                        <span style={{
                                            fontSize: '11px',
                                            fontWeight: '700',
                                            color: product.statusColor,
                                            background: `${product.statusColor}15`,
                                            padding: '4px 8px',
                                            borderRadius: '4px',
                                        }}>
                                            {product.status}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div style={{ marginTop: '16px', textAlign: 'center' }}>
                            <a href="#" style={{
                                fontSize: '13px',
                                color: COLORS.hpclBlue,
                                textDecoration: 'none',
                                fontWeight: '600',
                            }}>
                                View Full Product Analytics →
                            </a>
                        </div>
                    </div>
                </div>

                {/* Recent Team Activity */}
                <div style={{
                    background: '#FFFFFF',
                    borderRadius: '12px',
                    padding: '20px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                }}>
                    <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#1A1A1A', marginBottom: '16px' }}>
                        Recent Team Activity
                    </h3>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        {recentActivity.map((activity, idx) => (
                            <div key={idx} style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                padding: '12px 14px',
                                background: activity.type === 'warning' ? '#FFF9E6' : '#F0F8FF',
                                borderRadius: '8px',
                                borderLeft: `3px solid ${activity.type === 'warning' ? '#FFB800' : '#4A90E2'}`,
                            }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    <div style={{
                                        width: '36px',
                                        height: '36px',
                                        borderRadius: '50%',
                                        background: activity.type === 'warning' ? '#FFB800' : '#4A90E2',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: '#FFFFFF',
                                        fontSize: '14px',
                                        fontWeight: '600',
                                    }}>
                                        {activity.type === 'warning' ? '!' : '✓'}
                                    </div>
                                    <div>
                                        <div style={{ fontSize: '13px', color: '#333333', marginBottom: '3px' }}>
                                            <strong>{activity.user}</strong> {activity.action} {activity.highlight && <span style={{ color: '#E31E24', fontWeight: '700' }}>{activity.highlight}</span>} lead: <strong>{activity.entity}</strong> {activity.category}
                                        </div>
                                        <div style={{ fontSize: '11px', color: '#999999' }}>
                                            {activity.time} · {activity.location}
                                        </div>
                                    </div>
                                </div>
                                <button style={{
                                    padding: '6px 14px',
                                    background: activity.type === 'warning' ? '#FFB800' : '#4A90E2',
                                    color: '#FFFFFF',
                                    border: 'none',
                                    borderRadius: '5px',
                                    fontSize: '11px',
                                    fontWeight: '600',
                                    cursor: 'pointer',
                                }}>
                                    {activity.type === 'warning' ? 'Assign' : 'View'}
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </SalesManagerLayout>
    );
}
