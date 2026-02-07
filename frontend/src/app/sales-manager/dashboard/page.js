'use client';

import { COLORS } from '../../../styles/theme';
import SalesManagerLayout from '../../../components/SalesManagerLayout';

export default function SalesManagerDashboard() {
    // Mock data - in production, fetch from backend
    const metrics = {
        totalLeads: { value: 1284, change: '+12%', label: 'vs last month' },
        highPriority: { value: 42, label: 'REQUIRES ACTION', isAlert: true },
        converted: { value: 856, change: '+5%', rate: '66.7%' },
        pending: { value: 386, change: '-2%', avgAge: '4.2 days' },
    };

    const leadsBreakdown = [
        { status: 'New', count: 385, color: '#005BAC' },
        { status: 'Qualified', count: 385, color: '#4A90E2' },
        { status: 'Contacted', count: 257, color: '#FFB800' },
        { status: 'Lost', count: 128, color: '#E31E24' },
    ];

    const topProducts = [
        { name: 'High Speed Diesel (HSD)', icon: '⛽', units: '4,520 KL', target: 85, status: 'ON TRACK', statusColor: '#28A745' },
        { name: 'Lubricants & Grease', icon: '🛢️', units: '1,240 MT', target: 62, status: 'GROWING', statusColor: '#4A90E2' },
        { name: 'Industrial LPG', icon: '🔥', units: '890 KL', target: 42, status: 'DELAYED', statusColor: '#E31E24' },
        { name: 'Bitumen', icon: '🏗️', units: '3,110 MT', target: 91, status: 'ON TRACK', statusColor: '#28A745' },
    ];

    const recentActivity = [
        { user: 'Rahul Verma', action: 'converted a lead for', entity: 'Adani Ports', category: '(HSD Category)', time: '2 hours ago', location: 'Ahmedabad District', type: 'success' },
        { user: 'Suresh Mehta', action: 'flagged a', highlight: 'High Priority', entity: 'Kandla Refinery Maintenance', time: '5 hours ago', location: 'Gandhidham Branch', type: 'warning' },
    ];

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
                    <div style={{ display: 'flex', gap: '12px' }}>
                        <button style={{
                            padding: '10px 16px',
                            background: '#FFFFFF',
                            border: '1px solid #D0D0D0',
                            borderRadius: '6px',
                            fontSize: '13px',
                            fontWeight: '600',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                        }}>
                            📅 This Month
                        </button>
                        <button style={{
                            padding: '10px 16px',
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
                            📥 Export Report
                        </button>
                    </div>
                </div>

                {/* Metrics Cards */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(4, 1fr)',
                    gap: '20px',
                    marginBottom: '24px',
                }}>
                    {/* Total Leads */}
                    <div style={{
                        background: '#FFFFFF',
                        borderRadius: '12px',
                        padding: '20px',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                    }}>
                        <div style={{ fontSize: '13px', color: '#666666', marginBottom: '8px' }}>Total Leads</div>
                        <div style={{ fontSize: '32px', fontWeight: '700', color: '#1A1A1A', marginBottom: '4px' }}>
                            {metrics.totalLeads.value.toLocaleString()}
                        </div>
                        <div style={{ fontSize: '12px', color: '#28A745', fontWeight: '600' }}>
                            ↗{metrics.totalLeads.change} {metrics.totalLeads.label}
                        </div>
                    </div>

                    {/* High Priority */}
                    <div style={{
                        background: '#FFFFFF',
                        borderRadius: '12px',
                        padding: '20px',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                        borderLeft: '4px solid #E31E24',
                    }}>
                        <div style={{ fontSize: '13px', color: '#666666', marginBottom: '8px' }}>High Priority</div>
                        <div style={{ fontSize: '32px', fontWeight: '700', color: '#E31E24', marginBottom: '4px' }}>
                            {metrics.highPriority.value}
                        </div>
                        <div style={{
                            fontSize: '11px',
                            color: '#E31E24',
                            fontWeight: '700',
                            background: '#FFE5E6',
                            padding: '4px 8px',
                            borderRadius: '4px',
                            display: 'inline-block',
                        }}>
                            {metrics.highPriority.label}
                        </div>
                    </div>

                    {/* Converted */}
                    <div style={{
                        background: '#FFFFFF',
                        borderRadius: '12px',
                        padding: '20px',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                    }}>
                        <div style={{ fontSize: '13px', color: '#666666', marginBottom: '8px' }}>Converted</div>
                        <div style={{ fontSize: '32px', fontWeight: '700', color: '#1A1A1A', marginBottom: '4px' }}>
                            {metrics.converted.value}
                        </div>
                        <div style={{ fontSize: '12px', color: '#28A745', fontWeight: '600' }}>
                            ↗{metrics.converted.change} Rate: {metrics.converted.rate}
                        </div>
                    </div>

                    {/* Pending */}
                    <div style={{
                        background: '#FFFFFF',
                        borderRadius: '12px',
                        padding: '20px',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                    }}>
                        <div style={{ fontSize: '13px', color: '#666666', marginBottom: '8px' }}>Pending</div>
                        <div style={{ fontSize: '32px', fontWeight: '700', color: '#1A1A1A', marginBottom: '4px' }}>
                            {metrics.pending.value}
                        </div>
                        <div style={{ fontSize: '12px', color: '#FF9800', fontWeight: '600' }}>
                            ●{metrics.pending.change} Avg: {metrics.pending.avgAge}
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
                            marginBottom: '24px',
                        }}>
                            <div style={{
                                width: '180px',
                                height: '180px',
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
                                    width: '120px',
                                    height: '120px',
                                    borderRadius: '50%',
                                    background: '#FFFFFF',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}>
                                    <div style={{ fontSize: '28px', fontWeight: '700', color: '#1A1A1A' }}>
                                        {metrics.totalLeads.value.toLocaleString()}
                                    </div>
                                    <div style={{ fontSize: '11px', color: '#666666' }}>TOTAL</div>
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
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginBottom: '20px',
                        }}>
                            <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#1A1A1A' }}>Top Products Performance</h3>
                            <span style={{ fontSize: '12px', color: '#666666' }}>SORT BY: VOLUME ▼</span>
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
                                        <span style={{ fontSize: '20px' }}>{product.icon}</span>
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
                                            overflow: 'hidden',
                                        }}>
                                            <div style={{
                                                width: `${product.target}%`,
                                                height: '100%',
                                                background: product.target >= 80 ? '#28A745' : product.target >= 50 ? '#4A90E2' : '#E31E24',
                                                borderRadius: '3px',
                                            }} />
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
                    padding: '24px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                }}>
                    <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#1A1A1A', marginBottom: '20px' }}>
                        Recent Team Activity
                    </h3>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        {recentActivity.map((activity, idx) => (
                            <div key={idx} style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                padding: '16px',
                                background: activity.type === 'warning' ? '#FFF9E6' : '#F0F8FF',
                                borderRadius: '8px',
                                borderLeft: `4px solid ${activity.type === 'warning' ? '#FFB800' : '#4A90E2'}`,
                            }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    <div style={{
                                        width: '40px',
                                        height: '40px',
                                        borderRadius: '50%',
                                        background: activity.type === 'warning' ? '#FFB800' : '#4A90E2',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: '#FFFFFF',
                                        fontSize: '16px',
                                    }}>
                                        {activity.type === 'warning' ? '!' : '✓'}
                                    </div>
                                    <div>
                                        <div style={{ fontSize: '14px', color: '#333333', marginBottom: '4px' }}>
                                            <strong>{activity.user}</strong> {activity.action} {activity.highlight && <span style={{ color: '#E31E24', fontWeight: '700' }}>{activity.highlight}</span>} lead: <strong>{activity.entity}</strong> {activity.category}
                                        </div>
                                        <div style={{ fontSize: '12px', color: '#666666' }}>
                                            {activity.time} · {activity.location}
                                        </div>
                                    </div>
                                </div>
                                <button style={{
                                    padding: '6px 16px',
                                    background: activity.type === 'warning' ? '#FFB800' : '#4A90E2',
                                    color: '#FFFFFF',
                                    border: 'none',
                                    borderRadius: '6px',
                                    fontSize: '12px',
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
