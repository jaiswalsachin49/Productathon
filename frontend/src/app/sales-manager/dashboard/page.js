'use client';

import { useState, useEffect } from 'react';
import { COLORS } from '../../../styles/theme';
import SalesManagerLayout from '../../../components/SalesManagerLayout';
import api from '../../../services/api';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// --- Premium Icon Components ---
const TrendingIcon = ({ color = "currentColor", size = 20 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M23 6L13.5 15.5L8.5 10.5L1 18" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M17 6H23V12" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const UsersIcon = ({ color = "currentColor", size = 20 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M17 21V19C17 16.7909 15.2091 15 13 15H5C2.79086 15 1 16.7909 1 19V21" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M16 3.13C16.8604 3.35031 17.623 3.85071 18.1676 4.55163C18.7122 5.25255 19.0078 6.11368 19.0078 7.00005C19.0078 7.88642 18.7122 8.74755 18.1676 9.44847C17.623 10.1494 16.8604 10.6498 16 10.87" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const ActivityIcon = ({ color = "currentColor", size = 20 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M22 12H18L15 21L9 3L6 12H2" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const TargetIcon = ({ color = "currentColor", size = 20 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="12" cy="12" r="6" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="12" cy="12" r="2" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

// --- Component Definitions ---

const KPICard = ({ title, value, change, changeLabel, icon: Icon, color, isAlert }) => (
    <div style={{
        background: '#FFFFFF',
        borderRadius: '16px',
        padding: '24px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
        border: '1px solid #F0F0F0',
        position: 'relative',
        overflow: 'hidden',
        transition: 'all 0.3s ease',
        cursor: 'default',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '160px'
    }}
        onMouseOver={e => {
            e.currentTarget.style.transform = 'translateY(-4px)';
            e.currentTarget.style.boxShadow = '0 12px 24px rgba(0,0,0,0.08)';
        }}
        onMouseOut={e => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.03)';
        }}
    >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', zIndex: 1 }}>
            <div>
                <div style={{
                    fontSize: '12px',
                    fontWeight: '700',
                    color: '#999',
                    letterSpacing: '0.5px',
                    textTransform: 'uppercase',
                    marginBottom: '8px'
                }}>{title}</div>
                <div style={{
                    fontSize: '36px',
                    fontWeight: '700',
                    color: isAlert ? '#E31E24' : '#1A1A1A',
                    letterSpacing: '-1px',
                    lineHeight: '1'
                }}>{value}</div>
            </div>
            <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '12px',
                background: `${color}15`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <Icon color={color} size={24} />
            </div>
        </div>

        <div style={{ zIndex: 1 }}>
            <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '4px 10px',
                borderRadius: '20px',
                background: isAlert ? '#FFF0F0' : `${color}10`,
                fontSize: '12px',
                fontWeight: '600',
                color: isAlert ? '#E31E24' : color
            }}>
                {change && <span>{change}</span>}
                <span style={{ opacity: 0.7, fontWeight: '500' }}>{changeLabel}</span>
            </div>
        </div>

        {/* Decorative Background Element */}
        <div style={{
            position: 'absolute',
            right: '-20px',
            bottom: '-20px',
            opacity: 0.05
        }}>
            <Icon color={color} size={120} />
        </div>
    </div>
);

const ActivityItem = ({ user, action, target, time, type, onView }) => (
    <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        padding: '16px',
        borderBottom: '1px solid #F5F5F5',
        transition: 'background 0.2s'
    }}>
        <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            background: type === 'warning' ? '#FFF3E0' : '#E3F2FD',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: type === 'warning' ? '#EF6C00' : '#1565C0',
            fontWeight: '700',
            fontSize: '14px'
        }}>
            {user.charAt(0)}
        </div>
        <div style={{ flex: 1 }}>
            <div style={{ fontSize: '14px', color: '#333' }}>
                <span style={{ fontWeight: '600' }}>{user}</span> {action} <span style={{ fontWeight: '600' }}>{target}</span>
            </div>
            <div style={{ fontSize: '11px', color: '#999', marginTop: '2px' }}>{time}</div>
        </div>
        <button
            onClick={onView}
            style={{
                padding: '6px 12px',
                border: '1px solid #E0E0E0',
                borderRadius: '6px',
                background: 'transparent',
                fontSize: '11px',
                fontWeight: '600',
                color: '#666',
                cursor: 'pointer'
            }}
        >View</button>
    </div>
);

export default function SalesManagerDashboard() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState(null);
    const [topProducts, setTopProducts] = useState([]);
    const [showDateFilter, setShowDateFilter] = useState(false);
    const [dateRange, setDateRange] = useState({ start: '', end: '' });

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
            setTopProducts(productsData.products || []);
        } catch (error) {
            console.error('Failed to load dashboard data:', error);
        } finally {
            setLoading(false);
        }
    };

    // Schedule meeting in Outlook
    const handleScheduleMeeting = () => {
        const meetingDetails = {
            subject: 'Weekly Team Meeting - Q3 Targets Review',
            body: 'Meeting to review Q3 targets with all regional sales officers.\n\nAgenda:\n1. Performance Review\n2. Target Assessment\n3. Action Items',
            startTime: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // Tomorrow
            endTime: new Date(Date.now() + 24 * 60 * 60 * 1000 + 60 * 60 * 1000).toISOString(), // 1 hour later
        };

        // Create Outlook calendar URL
        const subject = "Weekly Team Review";
        const body = "Let's review the Q3 targets and discuss regional performance.";
        const mailtoLink = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        window.location.href = mailtoLink;
    };

    // Toast notification state
    const [showToast, setShowToast] = useState(false);

    // Download report as CSV
    const handleDownloadReport = () => {
        const csvContent = [
            ['Metric', 'Value'],
            ['Total Leads', stats?.total || 0],
            ['High Priority', stats?.highPriority || 0],
            ['Conversion Rate', `${stats?.conversionRate || 0}%`],
            ['Active Officers', 8],
            [''],
            ['Top Products'],
            ...topProducts.map(p => [p.name, `${p.count} leads`])
        ].map(row => row.join(',')).join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `dashboard-report-${new Date().toISOString().split('T')[0]}.csv`;
        link.click();

        // Show toast
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
    };

    // Filter by date
    const handleApplyDateFilter = () => {
        setShowDateFilter(false);
        // Reload data with date filter (would need API support)
        alert(`Filter applied: ${dateRange.start} to ${dateRange.end}`);
        loadData();
    };

    // View lead/activity detail
    const handleViewActivity = () => {
        // Navigate to detail page
        router.push('/sales-manager/team-leads');
    };

    // View all activity
    const handleViewAllActivity = () => {
        router.push('/sales-manager/team-leads');
    };

    if (loading) return (
        <div style={{ padding: '60px', textAlign: 'center', color: '#666', fontSize: '18px' }}>
            Loading Dashboard...
        </div>
    );

    if (!stats) return null;

    return (
        <div style={{ maxWidth: '1600px', margin: '0 auto' }}>
            {/* Toast Notification */}
            {showToast && (
                <div style={{
                    position: 'fixed',
                    top: '80px', // Below header
                    right: '24px',
                    background: '#28A745',
                    color: '#FFF',
                    padding: '16px 24px',
                    borderRadius: '12px',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    zIndex: 1000,
                    animation: 'slideIn 0.3s ease-out'
                }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                        <polyline points="22 4 12 14.01 9 11.01" />
                    </svg>
                    <span style={{ fontWeight: '600' }}>Report Downloaded Successfully!</span>
                </div>
            )}

            {/* Header Section */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px' }}>
                <div>
                    <div style={{ fontSize: '12px', fontWeight: '700', color: '#666', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '8px' }}>
                        WEST ZONE • GUJARAT
                    </div>
                    <h1 style={{ fontSize: '32px', fontWeight: '800', color: '#1A1A1A', letterSpacing: '-1px', margin: 0 }}>
                        Dashboard Overview
                    </h1>
                </div>

                <div style={{ display: 'flex', gap: '12px' }}>
                    <div style={{ position: 'relative' }}>
                        <button
                            onClick={() => setShowDateFilter(!showDateFilter)}
                            style={{
                                padding: '12px 20px',
                                background: '#FFFFFF',
                                border: '1px solid #E0E0E0',
                                borderRadius: '12px',
                                fontSize: '14px',
                                fontWeight: '600',
                                color: '#1A1A1A',
                                cursor: 'pointer',
                                boxShadow: '0 2px 4px rgba(0,0,0,0.02)',
                                transition: 'all 0.2s'
                            }}>
                            Filter Date
                        </button>

                        {/* Date Filter Dropdown */}
                        {showDateFilter && (
                            <div style={{
                                position: 'absolute',
                                top: '100%',
                                right: 0,
                                marginTop: '8px',
                                background: 'white',
                                padding: '16px',
                                borderRadius: '12px',
                                boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                                border: '1px solid #E0E0E0',
                                width: '300px',
                                zIndex: 10
                            }}>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                    <div>
                                        <label style={{ display: 'block', fontSize: '12px', marginBottom: '4px', color: '#666' }}>Start Date</label>
                                        <input
                                            type="date"
                                            value={dateRange.start}
                                            onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
                                            style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #ddd' }}
                                        />
                                    </div>
                                    <div>
                                        <label style={{ display: 'block', fontSize: '12px', marginBottom: '4px', color: '#666' }}>End Date</label>
                                        <input
                                            type="date"
                                            value={dateRange.end}
                                            onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
                                            style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #ddd' }}
                                        />
                                    </div>
                                    <button
                                        onClick={handleApplyDateFilter}
                                        style={{
                                            background: '#1A1A1A',
                                            color: 'white',
                                            padding: '8px',
                                            borderRadius: '6px',
                                            border: 'none',
                                            cursor: 'pointer',
                                            fontSize: '13px',
                                            fontWeight: '600'
                                        }}>
                                        Apply Filter
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    <button
                        onClick={handleDownloadReport}
                        style={{
                            padding: '12px 24px',
                            background: '#1A1A1A',
                            border: 'none',
                            borderRadius: '12px',
                            fontSize: '14px',
                            fontWeight: '600',
                            color: '#FFFFFF',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                            transition: 'all 0.2s'
                        }}>
                        Download Report
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M7 10L12 15L17 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M12 15V3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* KPI Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px', marginBottom: '32px' }}>
                <KPICard
                    title="Total Leads"
                    value={stats.total.toLocaleString()}
                    change="+12.5%"
                    changeLabel="vs last month"
                    icon={TrendingIcon}
                    color={COLORS.hpclBlue}
                />
                <KPICard
                    title="High Priority"
                    value={stats.highPriority}
                    change="Requires Action"
                    changeLabel="Immediate Attention"
                    icon={ActivityIcon}
                    color={COLORS.hpclRed}
                    isAlert={true}
                />
                <KPICard
                    title="Conversion Rate"
                    value={`${stats.conversionRate}%`}
                    change="+2.4%"
                    changeLabel="Target: 65%"
                    icon={TargetIcon}
                    color="#28A745"
                />
                <KPICard
                    title="Active Officers"
                    value="8"
                    change="12 Regions"
                    changeLabel="Full Coverage"
                    icon={UsersIcon}
                    color="#EF6C00"
                />
            </div>

            {/* Content Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '32px' }}>
                {/* Main Content Area */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>

                    {/* Top Products Section */}
                    <div style={{
                        background: '#FFFFFF',
                        borderRadius: '16px',
                        padding: '24px',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
                        border: '1px solid #F0F0F0'
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                            <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#1A1A1A' }}>Top Performing Products</h3>
                            <Link href="/sales-manager/performance" style={{ fontSize: '13px', color: COLORS.hpclBlue, fontWeight: '600', textDecoration: 'none' }}>View Detailed Analytics →</Link>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            {topProducts.map((product, idx) => (
                                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                                    <div style={{
                                        width: '48px',
                                        height: '48px',
                                        borderRadius: '12px',
                                        background: '#F5F7FA',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: '18px',
                                        fontWeight: '700',
                                        color: '#666'
                                    }}>
                                        {idx + 1}
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                                            <span style={{ fontSize: '15px', fontWeight: '600', color: '#1A1A1A' }}>{product.name}</span>
                                            <span style={{ fontSize: '14px', fontWeight: '700', color: '#1A1A1A' }}>{product.count} Leads</span>
                                        </div>
                                        <div style={{ width: '100%', height: '6px', background: '#F0F0F0', borderRadius: '3px', overflow: 'hidden' }}>
                                            <div style={{
                                                width: `${Math.min((product.count / (stats.total || 1)) * 100, 100)}%`,
                                                height: '100%',
                                                background: idx === 0 ? COLORS.hpclBlue : idx === 1 ? '#4A90E2' : '#90CAF9',
                                                borderRadius: '3px'
                                            }} />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Sidebar / Recent Activity */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                    <div style={{
                        background: '#FFFFFF',
                        borderRadius: '16px',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
                        border: '1px solid #F0F0F0',
                        overflow: 'hidden'
                    }}>
                        <div style={{ padding: '20px 24px', borderBottom: '1px solid #F0F0F0' }}>
                            <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#1A1A1A' }}>Recent Activity</h3>
                        </div>
                        <div>
                            <ActivityItem user="System" action="ingested" target="New Market Signal" time="2 mins ago" onView={() => handleViewActivity('signal')} />
                            <ActivityItem user="Amit Verma" action="closed" target="TechSolutions Ltd" time="25 mins ago" onView={() => handleViewActivity('lead')} />
                            <ActivityItem user="System" action="flagged" target="High Priority Lead" time="1 hour ago" type="warning" onView={() => handleViewActivity('priority')} />
                            <ActivityItem user="Priya Sharma" action="updated" target="Global Logistics" time="2 hours ago" onView={() => handleViewActivity('lead')} />
                        </div>
                        <div style={{ padding: '16px', textAlign: 'center', borderTop: '1px solid #F0F0F0' }}>
                            <Link href="/sales-manager/team-leads" style={{ background: 'none', border: 'none', color: COLORS.hpclBlue, fontSize: '13px', fontWeight: '600', cursor: 'pointer', textDecoration: 'none' }}>View All Activity</Link>
                        </div>
                    </div>

                    <div style={{
                        background: `linear-gradient(135deg, ${COLORS.hpclBlue} 0%, #1565C0 100%)`,
                        borderRadius: '16px',
                        padding: '24px',
                        color: '#FFFFFF',
                        boxShadow: '0 8px 24px rgba(0, 91, 172, 0.2)'
                    }}>
                        <div style={{ fontSize: '18px', fontWeight: '700', marginBottom: '8px' }}>Weekly Team Meeting</div>
                        <div style={{ fontSize: '13px', opacity: 0.9, marginBottom: '20px' }}>Schedule time to review Q3 targets with all regional officers.</div>
                        <button
                            onClick={handleScheduleMeeting}
                            style={{
                                width: '100%',
                                padding: '12px',
                                background: 'rgba(255,255,255,0.1)',
                                border: '1px solid rgba(255,255,255,0.2)',
                                borderRadius: '8px',
                                color: '#FFFFFF',
                                fontWeight: '600',
                                fontSize: '13px',
                                cursor: 'pointer'
                            }}
                        >Schedule Now</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

