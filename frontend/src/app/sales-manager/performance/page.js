'use client';

import { useState, useEffect } from 'react';
import { COLORS } from '../../../styles/theme';
import IndiaHeatMap from '../../../components/IndiaHeatMap';

// --- Custom Icons ---

const RevenueIcon = ({ color, opacity = 1 }) => (
    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" style={{ opacity }}>
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.41 16.09V20h-2.67v-1.93c-1.71-.36-3.16-1.46-3.27-3.4h1.96c.1 1.05.82 1.87 2.65 1.87 1.96 0 2.4-.98 2.4-1.59 0-.83-.44-1.61-2.67-2.14-2.48-.6-4.18-1.62-4.18-3.67 0-1.72 1.39-2.84 3.11-3.21V4h2.67v1.95c1.86.45 2.79 1.86 2.85 3.25h-2.17c-.11-.9-.83-1.58-2.6-1.58-1.68 0-2.07.78-2.07 1.56 0 .86.97 1.43 2.59 2.1 2.36.96 4.35 1.97 4.35 4.1 0 1.95-1.55 3.23-3.61 3.64z" fill={color} />
    </svg>
);

const TargetIcon = ({ color, opacity = 1 }) => (
    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" style={{ opacity }}>
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-5.5-8c0-3.04 2.46-5.5 5.5-5.5s5.5 2.46 5.5 5.5-2.46 5.5-5.5 5.5-5.5-2.46-5.5-5.5z" fill={color} />
        <path d="M12 8.5c-1.93 0-3.5 1.57-3.5 3.5s1.57 3.5 3.5 3.5 3.5-1.57 3.5-3.5-1.57-3.5-3.5-3.5z" fill={color} />
    </svg>
);

const FunnelIcon = ({ color, opacity = 1 }) => (
    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" style={{ opacity }}>
        <path d="M10 18h4v-2h-4v2zM3 6v2h18V6H3zm3 7h12v-2H6v2z" fill={color} />
    </svg>
);

const GroupIcon = ({ color, opacity = 1 }) => (
    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" style={{ opacity }}>
        <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" fill={color} />
    </svg>
);

// --- Main Component ---

export default function PerformanceDashboard() {

    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState(null);
    const [funnelData, setFunnelData] = useState([]);
    const [topProductsData, setTopProductsData] = useState([]);
    const [officerStats, setOfficerStats] = useState([]);
    const [sectorStats, setSectorStats] = useState([]);
    const [geoData, setGeoData] = useState([]);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            setLoading(true);
            const [dashboardStats, funnel, products, leads, geography] = await Promise.all([
                import('../../../services/api').then(m => m.default.getDashboardStats()),
                import('../../../services/api').then(m => m.default.getConversionFunnel()),
                import('../../../services/api').then(m => m.default.getTopProducts(5)),
                import('../../../services/api').then(m => m.default.getLeads({ limit: 500 })), // Fetch enough for aggregation
                import('../../../services/api').then(m => m.default.getGeographyBreakdown())
            ]);

            setStats(dashboardStats);

            // Format Funnel  
            const phases = funnel.stages || [
                { name: 'New', count: dashboardStats.new },
                { name: 'Contacted', count: dashboardStats.contacted },
                { name: 'Qualified', count: dashboardStats.qualified },
                { name: 'Won', count: dashboardStats.won }
            ];

            const maxCount = Math.max(...phases.map(p => p.count));
            setFunnelData(phases.map(p => ({
                label: p.name.toUpperCase(),
                value: p.count.toString(),
                width: maxCount > 0 ? (p.count / maxCount) * 100 : 0,
                color: p.name === 'Won' ? COLORS.hpclBlue : '#E3F2FD',
                highlight: p.name === 'Won'
            })));

            // Top Products
            setTopProductsData(products.products || []);

            // Aggregate Officer Performance
            const officerCounts = {};
            leads.forEach(l => {
                const name = l.assigned_officer || 'Unassigned';
                officerCounts[name] = (officerCounts[name] || 0) + 1;
            });
            const officerList = Object.entries(officerCounts)
                .map(([name, count]) => ({ name, leads: count }))
                .sort((a, b) => b.leads - a.leads)
                .slice(0, 5);
            const maxOfficerLeads = Math.max(...officerList.map(o => o.leads), 1);
            setOfficerStats(officerList.map(o => ({
                ...o,
                percentage: (o.leads / maxOfficerLeads) * 100
            })));

            // Aggregate Industries (Sectors) from backend
            const industries = await import('../../../services/api').then(m => m.default.getTopIndustries(5));
            const totalIndustryCount = (industries.industries || []).reduce((sum, ind) => sum + ind.count, 0);
            const sectors = (industries.industries || []).map((ind, idx) => ({
                name: ind.name,
                percentage: totalIndustryCount > 0 ? Math.round((ind.count / totalIndustryCount) * 100) : 0,
                color: ['#005BAC', '#E31E24', '#F59E0B', '#6c757d', '#28A745'][idx % 5]
            }));
            setSectorStats(sectors.length > 0 ? sectors : [
                { name: 'No Data', percentage: 100, color: '#E0E0E0' }
            ]);

            // Set Geography Data
            setGeoData(geography.states || []);

        } catch (error) {
            console.error('Failed to load performance data:', error);
        } finally {
            setLoading(false);
        }
    };

    // Top KPIs
    const metrics = stats ? [
        { label: 'TOTAL LEADS', value: stats.total, unit: '', change: '+5.2%', sub: 'vs last month', color: COLORS.hpclBlue, Icon: GroupIcon },
        { label: 'CONVERSION RATE', value: stats.conversionRate, unit: '%', change: '+1.8%', sub: 'On Track', color: COLORS.hpclRed, Icon: TargetIcon },
        { label: 'HIGH PRIORITY', value: stats.highPriority, unit: '', change: '-0.4%', sub: 'Needs Action', color: '#F59E0B', Icon: FunnelIcon },
        { label: 'WON LEADS', value: stats.won, unit: '', change: '+12.0%', sub: 'Growth', color: '#28A745', Icon: RevenueIcon }, // Recycled icon
    ] : [];

    // Conversion Funnel Data (Use state)
    const funnelStages = funnelData;

    // Sales Officer Performance (Use state)
    const salesOfficers = officerStats;

    // Sector Breakdown (Use state or mock)
    const sectors = sectorStats;

    // District Intensity (Mocked for now as we don't have geo data easily aggregated yet)
    const districts = [
        { name: 'Mumbai', intensity: 'HIGH' },
        { name: 'Pune', intensity: 'HIGH' },
        { name: 'Nagpur', intensity: 'MID' },
        { name: 'Nashik', intensity: 'LOW' },
        { name: 'Aurangabad', intensity: 'MID' },
        { name: 'Solapur', intensity: 'LOW' },
    ];

    // Top Products
    const topProducts = topProductsData.map(p => ({
        name: p.name,
        category: 'Industrial', // Category not in simple agg
        value: `${p.count} Leads`,
        change: '+2.8%'
    }));

    if (loading) return (
        <div style={{ padding: '60px', textAlign: 'center', color: '#666' }}>
            Loading Performance Data...
        </div>
    );

    /* Helper function for styles */
    const getIntensityStyle = (intensity) => {
        switch (intensity) {
            case 'HIGH': return { bg: COLORS.hpclRed, color: '#FFFFFF' };
            case 'MID': return { bg: '#FFB74D', color: '#1A1A1A' }; // Orange-ish
            case 'LOW': return { bg: '#E0E0E0', color: '#666666' };
            default: return { bg: '#F5F5F5', color: '#999999' };
        }
    };

    return (
        <div style={{ padding: '24px', maxWidth: '1600px', margin: '0 auto' }}>

            {/* Header Section */}
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'start',
                marginBottom: '32px',
            }}>
                <div>
                    <div style={{
                        fontSize: '11px',
                        color: '#666666',
                        fontWeight: '700',
                        letterSpacing: '0.5px',
                        marginBottom: '4px',
                        textTransform: 'uppercase'
                    }}>
                        Sales Analytics
                    </div>
                    <h1 style={{ fontSize: '28px', fontWeight: '700', color: '#1A1A1A', marginBottom: '8px' }}>
                        Region: West Zone
                    </h1>
                    <p style={{ fontSize: '14px', color: '#666666' }}>
                        Comprehensive performance overview based on real-time data.
                    </p>
                </div>
                <div style={{ display: 'flex', gap: '12px' }}>
                    <button style={{
                        padding: '10px 18px',
                        background: '#FFFFFF',
                        border: '1px solid #E0E0E0',
                        borderRadius: '8px',
                        fontSize: '13px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        color: '#333333',
                        transition: 'all 0.2s',
                    }}>
                        <span>📅</span> Current Period
                    </button>
                    <button style={{
                        padding: '10px 20px',
                        background: COLORS.hpclRed,
                        border: 'none',
                        borderRadius: '8px',
                        color: '#FFFFFF',
                        fontSize: '13px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        boxShadow: '0 2px 8px rgba(227, 30, 36, 0.2)',
                        transition: 'all 0.2s',
                    }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z" fill="currentColor" />
                        </svg>
                        Export Report
                    </button>
                </div>
            </div>

            {/* Dashboard KPI Cards */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: '24px',
                marginBottom: '32px',
            }}>
                {metrics.map((metric, idx) => {
                    const Icon = metric.Icon;
                    return (
                        <div
                            key={idx}
                            style={{
                                background: '#FFFFFF',
                                borderRadius: '12px',
                                padding: '24px',
                                boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                                borderLeft: `4px solid ${metric.color}`,
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
                            }}
                        >
                            <div style={{ position: 'relative', zIndex: 1 }}>
                                <div style={{
                                    fontSize: '11px',
                                    color: '#666666',
                                    marginBottom: '8px',
                                    textTransform: 'uppercase',
                                    fontWeight: '700',
                                    letterSpacing: '0.5px'
                                }}>
                                    {metric.label}
                                </div>
                                <div style={{ fontSize: '30px', fontWeight: '700', color: '#1A1A1A', marginBottom: '8px', lineHeight: '1.2' }}>
                                    {metric.value} <span style={{ fontSize: '16px', color: '#999', fontWeight: '500' }}>{metric.unit}</span>
                                </div>
                                <div style={{ fontSize: '13px', color: metric.color, fontWeight: '600', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                    {metric.change}
                                    <span style={{ color: '#999999', fontWeight: 500 }}> {metric.sub}</span>
                                </div>
                            </div>
                            <div style={{ position: 'absolute', right: '-10px', top: '10px', zIndex: 0 }}>
                                <Icon color={metric.color} opacity={0.08} />
                            </div>
                        </div>
                    )
                })}
            </div>

            {/* Conversion Funnel & Charts Grid */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: '1.2fr 1fr 0.8fr',
                gap: '24px',
                marginBottom: '32px',
            }}>
                {/* 1. Conversion Funnel */}
                <div style={{
                    background: '#FFFFFF',
                    borderRadius: '12px',
                    padding: '24px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.03)',
                    border: '1px solid #F0F0F0',
                }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                        <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#1A1A1A', margin: 0 }}>
                            Conversion Funnel
                        </h3>
                        <span style={{ fontSize: '12px', color: '#666', background: '#F5F7FA', padding: '4px 8px', borderRadius: '4px' }}>
                            Quarterly
                        </span>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        {funnelStages.map((stage, idx) => (
                            <div key={idx} style={{ position: 'relative' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontSize: '12px' }}>
                                    <span style={{ fontWeight: '600', color: stage.highlight ? COLORS.hpclBlue : '#666' }}>
                                        {stage.label}
                                    </span>
                                    <span style={{ fontWeight: '700', color: '#333' }}>
                                        {stage.value}
                                    </span>
                                </div>
                                <div style={{
                                    width: '100%',
                                    height: '28px',
                                    background: '#F5F5F5',
                                    borderRadius: '4px',
                                    overflow: 'hidden',
                                }}>
                                    <div style={{
                                        width: `${stage.width}%`,
                                        height: '100%',
                                        background: stage.color,
                                        borderRadius: '4px',
                                    }} />
                                </div>
                            </div>
                        ))}
                    </div>

                    <div style={{ marginTop: '20px', padding: '16px', background: '#eef6fc', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                            <div style={{ fontSize: '11px', color: '#555', fontWeight: '600' }}>OVERALL EFFICIENCY</div>
                            <div style={{ fontSize: '13px', color: '#777' }}>Lead to Conversion</div>
                        </div>
                        <div style={{ fontSize: '24px', fontWeight: '800', color: COLORS.hpclBlue }}>{stats?.conversionRate || 0}%</div>
                    </div>
                </div>

                {/* 2. Leads by Officer */}
                <div style={{
                    background: '#FFFFFF',
                    borderRadius: '12px',
                    padding: '24px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.03)',
                    border: '1px solid #F0F0F0',
                }}>
                    <div style={{ marginBottom: '20px' }}>
                        <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#1A1A1A', margin: 0 }}>
                            Officer Performance
                        </h3>
                        <p style={{ fontSize: '12px', color: '#999', marginTop: '4px' }}>Top 5 by Active Leads</p>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        {salesOfficers.map((officer, idx) => (
                            <div key={idx}>
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    marginBottom: '6px',
                                    fontSize: '13px',
                                }}>
                                    <span style={{ fontWeight: '600', color: '#333' }}>
                                        {officer.name}
                                    </span>
                                    <span style={{ fontWeight: '700', color: '#333' }}>
                                        {officer.leads}
                                    </span>
                                </div>
                                <div style={{
                                    width: '100%',
                                    height: '10px',
                                    background: '#F0F0F0',
                                    borderRadius: '5px',
                                    overflow: 'hidden',
                                }}>
                                    <div style={{
                                        width: `${officer.percentage}%`,
                                        height: '100%',
                                        background: idx === 0 ? COLORS.hpclRed : '#E57373',
                                        opacity: 1 - (idx * 0.15),
                                        borderRadius: '5px',
                                    }} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 3. Sector Breakdown */}
                <div style={{
                    background: '#FFFFFF',
                    borderRadius: '12px',
                    padding: '24px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.03)',
                    border: '1px solid #F0F0F0',
                }}>
                    <div style={{ marginBottom: '20px' }}>
                        <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#1A1A1A', margin: 0 }}>
                            Sector Split
                        </h3>
                    </div>

                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        marginBottom: '24px',
                        position: 'relative'
                    }}>
                        {/* CSS Donut Chart */}
                        <div style={{
                            width: '140px',
                            height: '140px',
                            borderRadius: '50%',
                            background: sectors.length >= 4 ? `conic-gradient(
                  ${sectors[0]?.color || '#005BAC'} 0deg ${sectors[0]?.percentage * 3.6 || 151}deg,
                  ${sectors[1]?.color || '#E31E24'} ${sectors[0]?.percentage * 3.6 || 151}deg ${(sectors[0]?.percentage + sectors[1]?.percentage) * 3.6 || 252}deg,
                  ${sectors[2]?.color || '#F59E0B'} ${(sectors[0]?.percentage + sectors[1]?.percentage) * 3.6 || 252}deg ${(sectors[0]?.percentage + sectors[1]?.percentage + sectors[2]?.percentage) * 3.6 || 317}deg,
                  ${sectors[3]?.color || '#6c757d'} ${(sectors[0]?.percentage + sectors[1]?.percentage + sectors[2]?.percentage) * 3.6 || 317}deg 360deg
                )` : '#E0E0E0',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <div style={{
                                width: '100px',
                                height: '100px',
                                background: 'white',
                                borderRadius: '50%',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <span style={{ fontSize: '11px', color: '#999', fontWeight: '600' }}>Total</span>
                                <span style={{ fontSize: '16px', color: '#333', fontWeight: '800' }}>100%</span>
                            </div>
                        </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        {sectors.map((sector, idx) => (
                            <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '12px' }}>
                                <div style={{
                                    width: '10px',
                                    height: '10px',
                                    borderRadius: '2px',
                                    background: sector.color,
                                }} />
                                <span style={{ color: '#666', flex: 1 }}>
                                    {sector.name}
                                </span>
                                <span style={{ fontWeight: '700', color: '#333' }}>
                                    {sector.percentage}%
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Bottom Section: Heatmap & Products */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: '1.5fr 1fr',
                gap: '24px',
            }}>
                {/* India Heat Map */}
                <div style={{
                    background: '#FFFFFF',
                    borderRadius: '12px',
                    padding: '24px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.03)',
                    border: '1px solid #F0F0F0',
                }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                        <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#1A1A1A', margin: 0 }}>
                            Lead Distribution Heat Map
                        </h3>
                        <div style={{ display: 'flex', gap: '12px', fontSize: '10px', fontWeight: '600' }}>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#666' }}>
                                <span style={{ width: '8px', height: '8px', background: '#E3F2FD', borderRadius: '50%' }}></span> LOW
                            </span>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#666' }}>
                                <span style={{ width: '8px', height: '8px', background: '#FFB74D', borderRadius: '50%' }}></span> MID
                            </span>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#666' }}>
                                <span style={{ width: '8px', height: '8px', background: COLORS.hpclRed, borderRadius: '50%' }}></span> HIGH
                            </span>
                        </div>
                    </div>

                    <IndiaHeatMap
                        stateData={geoData}
                        colors={{
                            high: COLORS.hpclRed,
                            mid: '#FFB74D',
                            low: '#E3F2FD'
                        }}
                    />
                </div>

                {/* Top Products */}
                <div style={{
                    background: '#FFFFFF',
                    borderRadius: '12px',
                    padding: '24px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.03)',
                    border: '1px solid #F0F0F0',
                }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                        <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#1A1A1A', margin: 0 }}>
                            Top Products
                        </h3>
                        <button style={{
                            background: 'none',
                            border: 'none',
                            color: COLORS.hpclBlue,
                            fontSize: '12px',
                            fontWeight: '600',
                            cursor: 'pointer'
                        }}>View All</button>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
                        {topProducts.map((product, idx) => (
                            <div
                                key={idx}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '12px',
                                    padding: '12px 0',
                                    borderBottom: idx < topProducts.length - 1 ? '1px solid #F5F5F5' : 'none',
                                }}
                            >
                                <div style={{
                                    width: '32px',
                                    height: '32px',
                                    background: '#FAFAFA',
                                    borderRadius: '6px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '16px',
                                    border: '1px solid #F0F0F0'
                                }}>
                                    📦
                                </div>
                                <div style={{ flex: 1 }}>
                                    <div style={{ fontSize: '13px', fontWeight: '600', color: '#1A1A1A' }}>
                                        {product.name}
                                    </div>
                                    <div style={{ fontSize: '11px', color: '#999' }}>
                                        {product.category}
                                    </div>
                                </div>
                                <div style={{ textAlign: 'right' }}>
                                    <div style={{ fontSize: '13px', fontWeight: '700', color: '#1A1A1A' }}>
                                        {product.value}
                                    </div>
                                    <div style={{
                                        fontSize: '10px',
                                        color: product.change.startsWith('+') ? '#28A745' : '#E31E24',
                                        fontWeight: '600',
                                    }}>
                                        {product.change}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Footer Status */}
            <div style={{
                marginTop: '32px',
                paddingTop: '20px',
                borderTop: '1px solid #E0E0E0',
                fontSize: '11px',
                color: '#999999',
                display: 'flex',
                justifyContent: 'space-between',
                fontWeight: '500'
            }}>
                <span>Data last updated: 14 Oct 2023, 10:45 AM IST</span>
                <div style={{ display: 'flex', gap: '20px' }}>
                    <span>SYSTEM STATUS: <span style={{ color: '#28A745' }}>●</span> OPTIMAL</span>
                    <span>DATA GOVERNANCE ENABLED</span>
                </div>
            </div>

        </div>

    );
}
