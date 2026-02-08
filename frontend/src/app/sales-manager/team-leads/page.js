'use client';

import { useState } from 'react';
import Link from 'next/link';
import { COLORS } from '../../../styles/theme';
import SalesManagerLayout from '../../../components/SalesManagerLayout';

// KPI Icons
const LeadsIcon = ({ color, opacity = 1 }) => (
    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ opacity }}>
        <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" fill={color} />
    </svg>
);

const AlertIcon = ({ color, opacity = 1 }) => (
    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ opacity }}>
        <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z" fill={color} />
    </svg>
);

const TimeIcon = ({ color, opacity = 1 }) => (
    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ opacity }}>
        <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z" fill={color} />
    </svg>
);

const CheckIcon = ({ color, opacity = 1 }) => (
    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ opacity }}>
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" fill={color} />
    </svg>
);

export default function TeamLeads() {
    const [filters, setFilters] = useState({
        officer: 'All',
        product: 'All',
        status: 'Active',
    });


    // Mock data
    const leads = [
        {
            id: 'HP-88291',
            company: 'Reliance Logistics Ltd.',
            location: 'Mumbai, MH',
            product: 'Industrial Lubricants',
            priority: 'High',
            officer: { name: 'Rajesh Kumar', avatar: 'RK' },
            status: 'Negotiation',
            lastUpdated: '2 hours ago',
        },
        {
            id: 'HP-77402',
            company: 'Tata Motors Hub',
            location: 'Pune, MH',
            product: 'Bulk Diesel',
            priority: 'Medium',
            officer: { name: 'Priya Sharma', avatar: 'PS' },
            status: 'Active',
            lastUpdated: '5 hours ago',
        },
        {
            id: 'HP-11204',
            company: 'Adani Port Services',
            location: 'Mundra, GJ',
            product: 'Marine Fuel',
            priority: 'High',
            officer: { name: 'Amit Verma', avatar: 'AV' },
            status: 'Delayed',
            lastUpdated: '1 day ago',
        },
        {
            id: 'HP-55391',
            company: 'Indigo Aviation Fleet',
            location: 'Delhi, DL',
            product: 'ATF Fueling',
            priority: 'Low',
            officer: { name: 'Anjali Gupta', avatar: 'AG' },
            status: 'On Hold',
            lastUpdated: '3 days ago',
        },
    ];

    const metrics = [
        { label: 'Total Leads', value: '1,284', change: '+12%', sub: 'vs last month', color: COLORS.hpclBlue, Icon: LeadsIcon },
        { label: 'High Priority', value: '42', change: 'Action Required', sub: 'Immediate', color: COLORS.hpclRed, Icon: AlertIcon, isAlert: true },
        { label: 'Avg. Response', value: '4.2 hrs', change: '-18m', sub: 'Improvement', color: '#F59E0B', Icon: TimeIcon },
        { label: 'Closure Rate', value: '68%', change: 'Target: 75%', sub: 'On Track', color: '#28A745', Icon: CheckIcon },
    ];

    const getPriorityStyle = (priority) => {
        const styles = {
            High: { bg: '#FFE5E6', color: '#E31E24', text: 'HIGH' },
            Medium: { bg: '#FFF4E5', color: '#FF9800', text: 'MEDIUM' },
            Low: { bg: '#E8F5E9', color: '#4CAF50', text: 'LOW' },
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

    const handleExportCSV = () => {
        const headers = ['ID', 'Company', 'Location', 'Product', 'Priority', 'Officer', 'Status', 'Last Updated'];
        const csvContent = [
            headers.join(','),
            ...leads.map(lead => [
                lead.id,
                `"${lead.company}"`,
                `"${lead.location}"`,
                lead.product,
                lead.priority,
                lead.officer.name,
                lead.status,
                lead.lastUpdated
            ].join(','))
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        if (link.download !== undefined) {
            const url = URL.createObjectURL(blob);
            link.setAttribute('href', url);
            link.setAttribute('download', 'team_leads_export.csv');
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    };

    const [searchQuery, setSearchQuery] = useState('');
    const [viewDensity, setViewDensity] = useState('Comfortable');

    const filteredLeads = leads.filter(lead => {
        const matchOfficer = filters.officer === 'All' || lead.officer.name === filters.officer;
        const matchProduct = filters.product === 'All' || lead.product === filters.product;
        const matchStatus = filters.status === 'All' || lead.status === filters.status;
        const matchSearch = searchQuery === '' ||
            lead.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
            lead.location.toLowerCase().includes(searchQuery.toLowerCase());
        return matchOfficer && matchProduct && matchStatus && matchSearch;
    });

    return (
        <SalesManagerLayout>
            <div style={{ padding: '24px', maxWidth: '1600px', margin: '0 auto' }}>
                {/* Header */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'start',
                    marginBottom: '32px',
                }}>
                    <div>
                        <h1 style={{ fontSize: '28px', fontWeight: '700', color: '#1A1A1A', marginBottom: '8px' }}>
                            Team Leads Management
                        </h1>
                        <p style={{ fontSize: '14px', color: '#666666' }}>
                            Oversee regional lead distribution and team performance metrics across all zones.
                        </p>
                    </div>
                    <div style={{ display: 'flex', gap: '12px' }}>
                        <button onClick={handleExportCSV} style={{
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
                            color: '#666666',
                            transition: 'all 0.2s',
                        }}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M19 12v7H5v-7H3v7c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-7h-2zm-6 .67l2.59-2.58L17 11.5l-5 5-5-5 1.41-1.41L11 12.67V3h2v9.67z" fill="currentColor" />
                            </svg>
                            Export CSV
                        </button>
                        <Link href="/sales-manager/add-lead">
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
                                    <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" fill="currentColor" />
                                </svg>
                                Add New Lead
                            </button>
                        </Link>
                    </div>
                </div>

                {/* Filters and Search - Redesigned Container */}
                <div style={{
                    background: '#FFFFFF',
                    borderRadius: '12px',
                    padding: '16px 20px',
                    marginBottom: '24px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.03)',
                    border: '1px solid #F0F0F0',
                    gap: '24px'
                }}>

                    {/* Left Side: Filter Label & Dropdowns */}
                    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                        {/* Filter Label */}
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            fontSize: '12px',
                            color: '#333333',
                            fontWeight: '700',
                            paddingRight: '16px',
                            borderRight: '1px solid #E0E0E0',
                            height: '24px',
                            letterSpacing: '0.5px'
                        }}>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10 18h4v-2h-4v2zM3 6v2h18V6H3zm3 7h12v-2H6v2z" fill="#666666" />
                            </svg>
                            FILTERS
                        </div>

                        {/* Dropdowns */}
                        {[
                            { id: 'officer', label: 'Officer', options: ['Priya Sharma', 'Amit Verma', 'Anjali Gupta', 'Rajesh Kumar'] },
                            { id: 'product', label: 'Product', options: ['Industrial Lubricants', 'Marine Fuel', 'ATF Fueling', 'Bulk Diesel'] },
                            { id: 'status', label: 'Status', options: ['Active', 'Negotiation', 'Delayed', 'On Hold'] }
                        ].map((filter) => (
                            <div key={filter.id} style={{
                                position: 'relative',
                                border: '1px solid #E0E0E0',
                                borderRadius: '6px',
                                padding: '8px 12px',
                                background: '#FFF',
                                minWidth: '150px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                cursor: 'pointer',
                                transition: 'all 0.2s',
                            }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                    <span style={{ fontSize: '13px', color: '#666' }}>{filter.label}:</span>
                                    <span style={{ fontSize: '13px', fontWeight: '500', color: '#1A1A1A' }}>{filters[filter.id] || 'All'}</span>
                                </div>
                                <svg width="10" height="6" viewBox="0 0 10 6" fill="none" style={{ marginLeft: '8px' }}>
                                    <path d="M1 1L5 5L9 1" stroke="#666" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <select
                                    value={filters[filter.id] || 'All'}
                                    onChange={(e) => setFilters({ ...filters, [filter.id]: e.target.value })}
                                    style={{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        width: '100%',
                                        height: '100%',
                                        opacity: 0,
                                        cursor: 'pointer',
                                    }}
                                >
                                    <option value="All">All</option>
                                    {filter.options.map(opt => (
                                        <option key={opt} value={opt}>{opt}</option>
                                    ))}
                                </select>
                            </div>
                        ))}
                    </div>

                    {/* Right Side: Search & View Toggle */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                        {/* Search Bar */}
                        <div style={{ position: 'relative', width: '280px' }}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }}>
                                <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" fill="#999" />
                            </svg>
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                style={{
                                    width: '320px',
                                    padding: '10px 16px 10px 40px',
                                    borderRadius: '8px',
                                    border: '1px solid #E0E0E0',
                                    fontSize: '13px',
                                    outline: 'none',
                                    background: '#F8F9FA',
                                    transition: 'background 0.2s',
                                }}
                                onFocus={(e) => e.target.style.background = '#FFFFFF'}
                                onBlur={(e) => e.target.style.background = '#F8F9FA'}
                            />
                            <svg
                                width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
                                style={{
                                    position: 'absolute',
                                    left: '14px',
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    color: '#999999',
                                }}
                            >
                                <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" fill="currentColor" />
                            </svg>
                        </div>

                        <div style={{ height: '24px', width: '1px', background: '#E0E0E0' }}></div>

                        <div style={{ display: 'flex', gap: '4px', background: '#F5F7FA', padding: '4px', borderRadius: '6px' }}>
                            {['Comfortable', 'Compact'].map((density) => (
                                <button
                                    key={density}
                                    onClick={() => setViewDensity(density)}
                                    style={{
                                        padding: '6px 12px',
                                        background: viewDensity === density ? '#FFFFFF' : 'transparent',
                                        border: 'none',
                                        borderRadius: '4px',
                                        fontSize: '11px',
                                        fontWeight: '600',
                                        color: viewDensity === density ? '#1A1A1A' : '#666666',
                                        cursor: 'pointer',
                                        boxShadow: viewDensity === density ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
                                        transition: 'all 0.2s',
                                    }}
                                >
                                    {density}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Enterprise Leads Table */}
                <div style={{
                    background: '#FFFFFF',
                    borderRadius: '12px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                    overflow: 'hidden',
                    marginBottom: '32px',
                    border: '1px solid #F0F0F0',
                }}>
                    {/* Table Header */}
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: '2fr 1.5fr 1.2fr 1fr 1.2fr 1fr 1fr 0.8fr',
                        gap: '16px',
                        padding: '16px 24px',
                        background: '#FAFAFA',
                        borderBottom: '1px solid #E0E0E0',
                        fontSize: '11px',
                        fontWeight: '700',
                        color: '#666666',
                        textTransform: 'uppercase',
                        letterSpacing: '0.6px',
                    }}>
                        <div>Company & ID</div>
                        <div>Location</div>
                        <div>Product Category</div>
                        <div>Priority</div>
                        <div>Assigned Officer</div>
                        <div>Status</div>
                        <div>Last Action</div>
                        <div>Action</div>
                    </div>

                    {/* Table Rows */}
                    {filteredLeads.length === 0 ? (
                        <div style={{ padding: '48px', textAlign: 'center', color: '#666' }}>
                            <div style={{ fontSize: '14px', fontWeight: '500', marginBottom: '8px' }}>No leads found</div>
                            <div style={{ fontSize: '13px', color: '#999' }}>Try adjusting your search or filters</div>
                        </div>
                    ) : (
                        filteredLeads.map((lead, idx) => (
                            <div
                                key={lead.id}
                                style={{
                                    display: 'grid',
                                    gridTemplateColumns: '2fr 1.5fr 1.2fr 1fr 1.2fr 1fr 1fr 0.8fr',
                                    gap: '16px',
                                    padding: viewDensity === 'Compact' ? '12px 24px' : '20px 24px',
                                    borderBottom: idx < filteredLeads.length - 1 ? '1px solid #F5F5F5' : 'none',
                                    alignItems: 'center',
                                    borderLeft: getPriorityStyle(lead.priority).color === '#E31E24' ? `4px solid ${COLORS.hpclRed}` : '4px solid transparent',
                                    transition: 'all 0.2s',
                                    cursor: 'default',
                                    background: '#FFFFFF',
                                }}
                                onMouseOver={(e) => {
                                    e.currentTarget.style.background = '#FAFAFA';
                                    e.currentTarget.style.transform = 'translateX(4px)';
                                }}
                                onMouseOut={(e) => {
                                    e.currentTarget.style.background = '#FFFFFF';
                                    e.currentTarget.style.transform = 'translateX(0)';
                                }}
                            >
                                <div>
                                    <div style={{ fontSize: '14px', fontWeight: '700', color: '#1A1A1A', marginBottom: '4px' }}>
                                        {lead.company}
                                    </div>
                                    <div style={{ fontSize: '11px', color: '#999999', fontFamily: 'monospace' }}>ID: {lead.id}</div>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#666666' }}>
                                    <span style={{ fontSize: '14px', opacity: 0.7 }}>📍</span>
                                    {lead.location}
                                </div>
                                <div style={{ fontSize: '13px', color: '#333333', fontWeight: '500' }}>{lead.product}</div>
                                <div>
                                    <span style={{
                                        ...getPriorityStyle(lead.priority),
                                        background: getPriorityStyle(lead.priority).bg,
                                        color: getPriorityStyle(lead.priority).color,
                                        padding: '6px 12px',
                                        borderRadius: '20px',
                                        fontSize: '10px',
                                        fontWeight: '700',
                                        letterSpacing: '0.5px',
                                        border: `1px solid ${getPriorityStyle(lead.priority).color}20`,
                                    }}>
                                        {getPriorityStyle(lead.priority).text}
                                    </span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <div style={{
                                        width: '32px',
                                        height: '32px',
                                        borderRadius: '50%',
                                        background: '#F0F4F8',
                                        border: '1px solid #E0E0E0',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: '12px',
                                        fontWeight: '600',
                                        color: '#666666',
                                    }}>
                                        {lead.officer.avatar}
                                    </div>
                                    <span style={{ fontSize: '13px', color: '#333333', fontWeight: '500' }}>{lead.officer.name}</span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <div style={{
                                        width: '8px',
                                        height: '8px',
                                        borderRadius: '50%',
                                        background: getStatusStyle(lead.status).color,
                                        boxShadow: `0 0 0 2px ${getStatusStyle(lead.status).color}20`,
                                    }} />
                                    <span style={{ fontSize: '13px', color: '#333333', fontWeight: '500' }}>
                                        {getStatusStyle(lead.status).text}
                                    </span>
                                </div>
                                <div style={{ fontSize: '12px', color: '#999999' }}>{lead.lastUpdated}</div>
                                <div style={{ textAlign: 'right' }}>
                                    <Link href="/sales-manager/lead-detail">
                                        <button style={{
                                            background: COLORS.hpclRed,
                                            color: '#FFFFFF',
                                            border: 'none',
                                            borderRadius: '6px',
                                            padding: '6px 16px',
                                            fontSize: '12px',
                                            fontWeight: '700',
                                            cursor: 'pointer',
                                            boxShadow: '0 2px 4px rgba(227, 30, 36, 0.25)',
                                            letterSpacing: '0.5px',
                                            textTransform: 'uppercase',
                                            transition: 'all 0.2s',
                                        }}
                                            onMouseOver={(e) => {
                                                e.currentTarget.style.background = '#c41820';
                                                e.currentTarget.style.transform = 'translateY(-1px)';
                                                e.currentTarget.style.boxShadow = '0 4px 8px rgba(227, 30, 36, 0.3)';
                                            }}
                                            onMouseOut={(e) => {
                                                e.currentTarget.style.background = COLORS.hpclRed;
                                                e.currentTarget.style.transform = 'translateY(0)';
                                                e.currentTarget.style.boxShadow = '0 2px 4px rgba(227, 30, 36, 0.25)';
                                            }}
                                        >
                                            Dossier
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        )))}
                </div>

                {/* Bottom KPI Metrics - Premium Dashboard Style */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(4, 1fr)',
                    gap: '24px',
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
                                        fontWeight: '600',
                                        letterSpacing: '0.5px'
                                    }}>
                                        {metric.label}
                                    </div>
                                    <div style={{ fontSize: '32px', fontWeight: '700', color: metric.isAlert ? '#E31E24' : '#1A1A1A', marginBottom: '8px', lineHeight: '1.2' }}>
                                        {metric.value}
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
            </div>
        </SalesManagerLayout>
    );
}
