'use client';

import { useState } from 'react';
import { COLORS } from '../../../styles/theme';

export default function TeamLeads() {
    const [filters, setFilters] = useState({
        officer: 'All',
        product: 'All',
        status: 'Active',
    });
    const [searchQuery, setSearchQuery] = useState('');
    const [viewDensity, setViewDensity] = useState('Comfortable');

    // Mock data
    const leads = [
        {
            id: 'HP-88291',
            company: 'Reliance Logistics Ltd.',
            location: 'Mumbai, MH',
            product: 'Industrial Lubricants',
            priority: 'High',
            officer: { name: 'Rajesh Kumar', avatar: '👨' },
            status: 'Negotiation',
            lastUpdated: '2 hours ago',
        },
        {
            id: 'HP-77402',
            company: 'Tata Motors Hub',
            location: 'Pune, MH',
            product: 'Bulk Diesel',
            priority: 'Medium',
            officer: { name: 'Priya Sharma', avatar: '👩' },
            status: 'Active',
            lastUpdated: '5 hours ago',
        },
        {
            id: 'HP-11204',
            company: 'Adani Port Services',
            location: 'Mundra, GJ',
            product: 'Marine Fuel',
            priority: 'High',
            officer: { name: 'Amit Verma', avatar: '👨' },
            status: 'Delayed',
            lastUpdated: '1 day ago',
        },
        {
            id: 'HP-55391',
            company: 'Indigo Aviation Fleet',
            location: 'Delhi, DL',
            product: 'ATF Fueling',
            priority: 'Low',
            officer: { name: 'Anjali Gupta', avatar: '👩' },
            status: 'On Hold',
            lastUpdated: '3 days ago',
        },
    ];

    const metrics = [
        { label: 'Total Leads', value: '1,284', change: '+12% from last month', icon: '👥' },
        { label: 'High Priority', value: '42', change: 'Requires Immediate Action', icon: '❗', isAlert: true },
        { label: 'Avg. Response Time', value: '4.2 hrs', change: '-18m Improvement', icon: '⏱️' },
        { label: 'Closure Rate', value: '68%', change: 'Target: 75%', icon: '✓' },
    ];

    const getPriorityStyle = (priority) => {
        const styles = {
            High: { bg: '#FFE5E6', color: '#E31E24', text: 'High' },
            Medium: { bg: '#FFF4E5', color: '#FF9800', text: 'Medium' },
            Low: { bg: '#E8F5E9', color: '#4CAF50', text: 'Low' },
        };
        return styles[priority] || styles.Low;
    };

    const getStatusStyle = (status) => {
        const styles = {
            Negotiation: { color: '#4A90E2', text: 'Negotiation' },
            Active: { color: '#28A745', text: 'Active' },
            Delayed: { color: '#FFB800', text: 'Delayed' },
            'On Hold': { color: '#999999', text: 'On Hold' },
        };
        return styles[status] || styles.Active;
    };

    return (
        <div style={{ minHeight: '100vh', background: '#F5F7FA' }}>
            {/* Navbar */}
            <nav style={{
                background: '#FFFFFF',
                borderBottom: '1px solid #E0E0E0',
                padding: '0 24px',
                height: '56px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{
                            width: '32px',
                            height: '32px',
                            background: COLORS.hpclRed,
                            borderRadius: '6px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#FFFFFF',
                            fontSize: '16px',
                            fontWeight: '800',
                        }}>
                            9
                        </div>
                        <span style={{ fontSize: '15px', fontWeight: '700', color: '#1A1A1A' }}>
                            HPCL Sales Governance
                        </span>
                    </div>

                    <div style={{ display: 'flex', gap: '24px' }}>
                        <a href="/sales-manager/dashboard" style={{
                            fontSize: '14px',
                            color: '#666666',
                            textDecoration: 'none',
                            fontWeight: '500',
                        }}>Dashboard</a>
                        <a href="/sales-manager/team-leads" style={{
                            fontSize: '14px',
                            color: '#1A1A1A',
                            textDecoration: 'none',
                            fontWeight: '600',
                            borderBottom: '2px solid #E31E24',
                            paddingBottom: '4px',
                        }}>Team Leads</a>
                        <a href="#" style={{
                            fontSize: '14px',
                            color: '#666666',
                            textDecoration: 'none',
                            fontWeight: '500',
                        }}>Reports</a>
                        <a href="#" style={{
                            fontSize: '14px',
                            color: '#666666',
                            textDecoration: 'none',
                            fontWeight: '500',
                        }}>Settings</a>
                    </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{ position: 'relative' }}>
                        <input
                            type="text"
                            placeholder="Quick Search Leads..."
                            style={{
                                width: '240px',
                                padding: '8px 12px 8px 36px',
                                borderRadius: '6px',
                                border: '1px solid #E0E0E0',
                                fontSize: '13px',
                                outline: 'none',
                            }}
                        />
                        <span style={{
                            position: 'absolute',
                            left: '12px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            fontSize: '14px',
                            color: '#999999',
                        }}>🔍</span>
                    </div>
                    <div style={{ position: 'relative', cursor: 'pointer' }}>
                        <span style={{ fontSize: '20px' }}>🔔</span>
                    </div>
                    <div style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        background: '#4A90E2',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#FFFFFF',
                        fontSize: '13px',
                        fontWeight: '700',
                        cursor: 'pointer',
                    }}>A</div>
                </div>
            </nav>

            {/* Main Content */}
            <div style={{ padding: '32px 24px' }}>
                {/* Header */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'start',
                    marginBottom: '24px',
                }}>
                    <div>
                        <h1 style={{ fontSize: '32px', fontWeight: '700', color: '#1A1A1A', marginBottom: '6px' }}>
                            Team Leads Management
                        </h1>
                        <p style={{ fontSize: '14px', color: '#666666' }}>
                            Oversee regional lead distribution and team performance metrics across all zones.
                        </p>
                    </div>
                    <div style={{ display: 'flex', gap: '12px' }}>
                        <button style={{
                            padding: '10px 18px',
                            background: '#FFFFFF',
                            border: '1px solid #D0D0D0',
                            borderRadius: '6px',
                            fontSize: '13px',
                            fontWeight: '600',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                            color: '#333333',
                        }}>
                            📥 Export CSV
                        </button>
                        <button style={{
                            padding: '10px 18px',
                            background: COLORS.hpclRed,
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
                            ＋ Add New Lead
                        </button>
                    </div>
                </div>

                {/* Filters and Search */}
                <div style={{
                    background: '#FFFFFF',
                    borderRadius: '12px',
                    padding: '16px 20px',
                    marginBottom: '20px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                }}>
                    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            fontSize: '13px',
                            color: '#666666',
                        }}>
                            <span style={{ fontSize: '14px' }}>🔽</span>
                            <span style={{ fontWeight: '600' }}>Filters</span>
                        </div>

                        <select
                            value={filters.officer}
                            onChange={(e) => setFilters({ ...filters, officer: e.target.value })}
                            style={{
                                padding: '8px 12px',
                                borderRadius: '6px',
                                border: '1px solid #E0E0E0',
                                fontSize: '13px',
                                cursor: 'pointer',
                                outline: 'none',
                            }}
                        >
                            <option>Officer: All</option>
                            <option>Rajesh Kumar</option>
                            <option>Priya Sharma</option>
                            <option>Amit Verma</option>
                        </select>

                        <select
                            value={filters.product}
                            onChange={(e) => setFilters({ ...filters, product: e.target.value })}
                            style={{
                                padding: '8px 12px',
                                borderRadius: '6px',
                                border: '1px solid #E0E0E0',
                                fontSize: '13px',
                                cursor: 'pointer',
                                outline: 'none',
                            }}
                        >
                            <option>Product: All</option>
                            <option>Industrial Lubricants</option>
                            <option>Bulk Diesel</option>
                            <option>Marine Fuel</option>
                        </select>

                        <select
                            value={filters.status}
                            onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                            style={{
                                padding: '8px 12px',
                                borderRadius: '6px',
                                border: '1px solid #E0E0E0',
                                fontSize: '13px',
                                cursor: 'pointer',
                                outline: 'none',
                            }}
                        >
                            <option>Status: Active</option>
                            <option>Status: All</option>
                            <option>Negotiation</option>
                            <option>Delayed</option>
                        </select>

                        <div style={{ position: 'relative' }}>
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search by company or location..."
                                style={{
                                    width: '280px',
                                    padding: '8px 12px 8px 36px',
                                    borderRadius: '6px',
                                    border: '1px solid #E0E0E0',
                                    fontSize: '13px',
                                    outline: 'none',
                                }}
                            />
                            <span style={{
                                position: 'absolute',
                                left: '12px',
                                top: '50%',
                                transform: 'translateY(-50%)',
                                fontSize: '14px',
                                color: '#999999',
                            }}>🔍</span>
                        </div>
                    </div>

                    <div style={{ display: 'flex', gap: '8px' }}>
                        {['Density', 'Comfortable', 'Compact'].map((density) => (
                            <button
                                key={density}
                                onClick={() => setViewDensity(density)}
                                style={{
                                    padding: '6px 12px',
                                    background: viewDensity === density ? '#F0F0F0' : 'transparent',
                                    border: 'none',
                                    borderRadius: '4px',
                                    fontSize: '12px',
                                    fontWeight: '600',
                                    color: viewDensity === density ? '#1A1A1A' : '#666666',
                                    cursor: 'pointer',
                                }}
                            >
                                {density}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Table */}
                <div style={{
                    background: '#FFFFFF',
                    borderRadius: '12px',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                    overflow: 'hidden',
                    marginBottom: '20px',
                }}>
                    {/* Table Header */}
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: '2fr 1.2fr 1.2fr 0.8fr 1.2fr 1fr 1fr 0.3fr',
                        gap: '16px',
                        padding: '16px 20px',
                        background: '#FAFAFA',
                        borderBottom: '1px solid #E0E0E0',
                        fontSize: '11px',
                        fontWeight: '700',
                        color: '#666666',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px',
                    }}>
                        <div>COMPANY</div>
                        <div>LOCATION</div>
                        <div>PRODUCT</div>
                        <div>PRIORITY</div>
                        <div>OFFICER</div>
                        <div>STATUS</div>
                        <div>LAST UPDATED</div>
                        <div></div>
                    </div>

                    {/* Table Rows */}
                    {leads.map((lead, idx) => (
                        <div
                            key={lead.id}
                            style={{
                                display: 'grid',
                                gridTemplateColumns: '2fr 1.2fr 1.2fr 0.8fr 1.2fr 1fr 1fr 0.3fr',
                                gap: '16px',
                                padding: '18px 20px',
                                borderBottom: idx < leads.length - 1 ? '1px solid #F5F5F5' : 'none',
                                alignItems: 'center',
                                borderLeft: getPriorityStyle(lead.priority).color === '#E31E24' ? `3px solid ${COLORS.hpclRed}` : '3px solid transparent',
                                transition: 'background 0.2s',
                                cursor: 'pointer',
                            }}
                            onMouseOver={(e) => e.currentTarget.style.background = '#FAFAFA'}
                            onMouseOut={(e) => e.currentTarget.style.background = '#FFFFFF'}
                        >
                            <div>
                                <div style={{ fontSize: '14px', fontWeight: '600', color: '#1A1A1A', marginBottom: '2px' }}>
                                    {lead.company}
                                </div>
                                <div style={{ fontSize: '12px', color: '#999999' }}>ID: {lead.id}</div>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#666666' }}>
                                <span style={{ fontSize: '12px' }}>📍</span>
                                {lead.location}
                            </div>
                            <div style={{ fontSize: '13px', color: '#333333' }}>{lead.product}</div>
                            <div>
                                <span style={{
                                    ...getPriorityStyle(lead.priority),
                                    background: getPriorityStyle(lead.priority).bg,
                                    color: getPriorityStyle(lead.priority).color,
                                    padding: '4px 10px',
                                    borderRadius: '4px',
                                    fontSize: '11px',
                                    fontWeight: '700',
                                }}>
                                    {lead.priority}
                                </span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <div style={{
                                    width: '28px',
                                    height: '28px',
                                    borderRadius: '50%',
                                    background: '#E8F0FE',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '14px',
                                }}>
                                    {lead.officer.avatar}
                                </div>
                                <span style={{ fontSize: '13px', color: '#333333' }}>{lead.officer.name}</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                <div style={{
                                    width: '8px',
                                    height: '8px',
                                    borderRadius: '50%',
                                    background: getStatusStyle(lead.status).color,
                                }} />
                                <span style={{ fontSize: '13px', color: '#333333', fontWeight: '500' }}>
                                    {getStatusStyle(lead.status).text}
                                </span>
                            </div>
                            <div style={{ fontSize: '13px', color: '#999999' }}>{lead.lastUpdated}</div>
                            <div>
                                <button style={{
                                    background: 'none',
                                    border: 'none',
                                    fontSize: '16px',
                                    cursor: 'pointer',
                                    color: '#999999',
                                }}>⋮</button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Pagination */}
                <div style={{
                    background: '#FFFFFF',
                    borderRadius: '12px',
                    padding: '16px 20px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '24px',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                }}>
                    <div style={{ fontSize: '13px', color: '#666666' }}>
                        Showing 1 to 4 of 24 leads
                    </div>
                    <div style={{ display: 'flex', gap: '6px' }}>
                        <button style={{
                            width: '32px',
                            height: '32px',
                            borderRadius: '6px',
                            border: '1px solid #E0E0E0',
                            background: COLORS.hpclRed,
                            color: '#FFFFFF',
                            fontSize: '13px',
                            fontWeight: '600',
                            cursor: 'pointer',
                        }}>1</button>
                        <button style={{
                            width: '32px',
                            height: '32px',
                            borderRadius: '6px',
                            border: '1px solid #E0E0E0',
                            background: '#FFFFFF',
                            color: '#333333',
                            fontSize: '13px',
                            fontWeight: '600',
                            cursor: 'pointer',
                        }}>2</button>
                        <button style={{
                            width: '32px',
                            height: '32px',
                            borderRadius: '6px',
                            border: '1px solid #E0E0E0',
                            background: '#FFFFFF',
                            color: '#333333',
                            fontSize: '13px',
                            fontWeight: '600',
                            cursor: 'pointer',
                        }}>3</button>
                        <span style={{ padding: '0 8px', color: '#999999' }}>...</span>
                        <button style={{
                            width: '32px',
                            height: '32px',
                            borderRadius: '6px',
                            border: '1px solid #E0E0E0',
                            background: '#FFFFFF',
                            color: '#333333',
                            fontSize: '13px',
                            fontWeight: '600',
                            cursor: 'pointer',
                        }}>6</button>
                        <button style={{
                            width: '32px',
                            height: '32px',
                            borderRadius: '6px',
                            border: '1px solid #E0E0E0',
                            background: '#FFFFFF',
                            color: '#333333',
                            fontSize: '13px',
                            fontWeight: '600',
                            cursor: 'pointer',
                        }}>›</button>
                    </div>
                </div>

                {/* Summary Metrics */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(4, 1fr)',
                    gap: '16px',
                }}>
                    {metrics.map((metric, idx) => (
                        <div
                            key={idx}
                            style={{
                                background: '#FFFFFF',
                                borderRadius: '12px',
                                padding: '20px',
                                boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                            }}
                        >
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                marginBottom: '12px',
                            }}>
                                <span style={{ fontSize: '20px' }}>{metric.icon}</span>
                                <span style={{ fontSize: '12px', color: '#666666', fontWeight: '600' }}>
                                    {metric.label}
                                </span>
                            </div>
                            <div style={{ fontSize: '28px', fontWeight: '700', color: '#1A1A1A', marginBottom: '4px' }}>
                                {metric.value}
                            </div>
                            <div style={{
                                fontSize: '12px',
                                color: metric.isAlert ? '#E31E24' : '#28A745',
                                fontWeight: '600',
                            }}>
                                {metric.change}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Footer */}
            <div style={{
                padding: '20px 24px',
                borderTop: '1px solid #E0E0E0',
                background: '#FFFFFF',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                fontSize: '11px',
                color: '#999999',
            }}>
                <div>© 2024 HPCL Sales Governance. Confidential Enterprise Data.</div>
                <div style={{ display: 'flex', gap: '20px' }}>
                    <a href="#" style={{ color: '#999999', textDecoration: 'none' }}>Data Policy</a>
                    <a href="#" style={{ color: '#999999', textDecoration: 'none' }}>Access Logs</a>
                    <a href="#" style={{ color: '#999999', textDecoration: 'none' }}>Support Desk</a>
                    <span>Last Data Sync: Today at 09:42 AM IST</span>
                </div>
            </div>
        </div>
    );
}
