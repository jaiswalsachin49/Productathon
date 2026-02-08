'use client';

import { COLORS } from '../../../styles/theme';
import SalesManagerLayout from '../../../components/SalesManagerLayout';

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

    // Top KPIs
    const metrics = [
        { label: 'TOTAL REVENUE', value: '₹45.2', unit: 'Cr', change: '+5.2%', sub: 'vs last Qtr', color: COLORS.hpclBlue, Icon: RevenueIcon },
        { label: 'TARGET ACHIEVEMENT', value: '92.0', unit: '%', change: '+1.8%', sub: 'On Track', color: COLORS.hpclRed, Icon: TargetIcon },
        { label: 'CONVERSION RATE', value: '14.5', unit: '%', change: '-0.4%', sub: 'Slight Dip', color: '#F59E0B', Icon: FunnelIcon },
        { label: 'ACTIVE LEADS', value: '1,280', unit: '', change: '+12.0%', sub: 'Pipeline Growth', color: '#28A745', Icon: GroupIcon },
    ];

    // Conversion Funnel Data
    const funnelStages = [
        { label: 'TOTAL LEADS', value: '1,280', width: 100, color: '#E3F2FD' },
        { label: 'QUALIFIED', value: '840', width: 65, color: '#BBDEFB' },
        { label: 'NEGOTIATION', value: '312', width: 40, color: '#64B5F6' },
        { label: 'CONVERTED', value: '186', width: 25, color: COLORS.hpclBlue, highlight: true },
    ];

    // Sales Officer Performance
    const salesOfficers = [
        { name: 'A. Deshmukh', leads: 245, percentage: 100 },
        { name: 'R. Verma', leads: 212, percentage: 87 },
        { name: 'M. Singhania', leads: 198, percentage: 81 },
        { name: 'P. Kulkarni', leads: 156, percentage: 64 },
        { name: 'S. Patil', leads: 142, percentage: 58 },
    ];

    // Sector Breakdown (Donut approximation via conic gradient)
    const sectors = [
        { name: 'B2B/Industrial', percentage: 42, color: '#005BAC' }, // HPCL Blue
        { name: 'Retail/B2C', percentage: 28, color: '#E31E24' },     // HPCL Red
        { name: 'Government', percentage: 18, color: '#F59E0B' },     // Amber
        { name: 'Aviation', percentage: 12, color: '#6c757d' },       // Gray
    ];

    // District Intensity
    const districts = [
        { name: 'Mumbai', intensity: 'HIGH' },
        { name: 'Pune', intensity: 'HIGH' },
        { name: 'Nagpur', intensity: 'MID' },
        { name: 'Nashik', intensity: 'LOW' },
        { name: 'Aurangabad', intensity: 'MID' },
        { name: 'Solapur', intensity: 'LOW' },
    ];

    // Top Products
    const topProducts = [
        { name: 'HP Power 95', category: 'Premium Petrol', value: '₹18.2 Cr', change: '+2.8%' },
        { name: 'HP Racer 4T', category: 'Engine Lubricant', value: '₹9.5 Cr', change: '+3.1%' },
        { name: 'HP Gas (Bulk)', category: 'Industrial LPG', value: '₹7.1 Cr', change: '+1.4%' },
        { name: 'Furnace Oil', category: 'Heavy Fuel', value: '₹5.4 Cr', change: '-0.8%' },
    ];

    const getIntensityStyle = (intensity) => {
        switch (intensity) {
            case 'HIGH': return { bg: COLORS.hpclRed, color: '#FFFFFF' };
            case 'MID': return { bg: '#FFB74D', color: '#1A1A1A' }; // Orange-ish
            case 'LOW': return { bg: '#E0E0E0', color: '#666666' };
            default: return { bg: '#F5F5F5', color: '#999999' };
        }
    };

    return (
        <SalesManagerLayout>
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
                            Comprehensive performance overview for Q3 2023.
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
                            <span>📅</span> Q3 2023
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
                            <div style={{ fontSize: '24px', fontWeight: '800', color: COLORS.hpclBlue }}>68%</div>
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
                                background: `conic-gradient(
                  ${sectors[0].color} 0deg 151deg,
                  ${sectors[1].color} 151deg 252deg,
                  ${sectors[2].color} 252deg 317deg,
                  ${sectors[3].color} 317deg 360deg
                )`,
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
                    {/* District Intensity Heatmap */}
                    <div style={{
                        background: '#FFFFFF',
                        borderRadius: '12px',
                        padding: '24px',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.03)',
                        border: '1px solid #F0F0F0',
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                            <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#1A1A1A', margin: 0 }}>
                                District Sales Intensity
                            </h3>
                            <div style={{ display: 'flex', gap: '12px', fontSize: '10px', fontWeight: '600' }}>
                                <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#666' }}>
                                    <span style={{ width: '8px', height: '8px', background: '#E0E0E0', borderRadius: '50%' }}></span> LOW
                                </span>
                                <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#666' }}>
                                    <span style={{ width: '8px', height: '8px', background: '#FFB74D', borderRadius: '50%' }}></span> MID
                                </span>
                                <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#666' }}>
                                    <span style={{ width: '8px', height: '8px', background: COLORS.hpclRed, borderRadius: '50%' }}></span> HIGH
                                </span>
                            </div>
                        </div>

                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(3, 1fr)',
                            gap: '12px',
                        }}>
                            {districts.map((district, idx) => {
                                const style = getIntensityStyle(district.intensity);
                                return (
                                    <div
                                        key={idx}
                                        style={{
                                            padding: '24px 12px',
                                            background: style.bg,
                                            borderRadius: '8px',
                                            textAlign: 'center',
                                            color: style.color,
                                            fontSize: '13px',
                                            fontWeight: '700',
                                            letterSpacing: '0.5px',
                                            cursor: 'default',
                                            transition: 'transform 0.2s',
                                        }}
                                        onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
                                        onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1.0)'}
                                    >
                                        {district.name}
                                    </div>
                                );
                            })}
                        </div>
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
        </SalesManagerLayout>
    );
}
