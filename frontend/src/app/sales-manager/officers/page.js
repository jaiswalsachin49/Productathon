'use client';

import { useState, useEffect } from 'react';
import api from '../../../services/api';
import { COLORS } from '../../../styles/theme';

const StatCard = ({ label, value, sub, color, icon: Icon }) => (
    <div style={{
        background: '#FFFFFF',
        borderRadius: '12px',
        padding: '20px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
        border: '1px solid #F0F0F0',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px'
    }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div style={{
                fontSize: '11px',
                fontWeight: '700',
                textTransform: 'uppercase',
                color: '#999',
                letterSpacing: '0.5px'
            }}>{label}</div>
            {Icon && <Icon color={color} size={16} opacity={0.5} />}
        </div>
        <div style={{ fontSize: '24px', fontWeight: '700', color: '#1A1A1A' }}>{value}</div>
        {sub && <div style={{ fontSize: '11px', color: color, fontWeight: '600' }}>{sub}</div>}
    </div>
);

const UserAvatar = ({ name, size = 48 }) => {
    const initials = name ? name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() : 'U';
    const bgColors = ['#E3F2FD', '#E8F5E9', '#FFF3E0', '#F3E5F5', '#E0F2F1'];
    const textColors = ['#1565C0', '#2E7D32', '#EF6C00', '#7B1FA2', '#00695C'];
    const index = name ? name.charCodeAt(0) % bgColors.length : 0;

    return (
        <div style={{
            width: size,
            height: size,
            borderRadius: '50%',
            background: bgColors[index],
            color: textColors[index],
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: size * 0.4,
            fontWeight: '700',
            border: `1px solid ${textColors[index]}20`
        }}>
            {initials}
        </div>
    );
};

export default function OfficersPage() {
    const [loading, setLoading] = useState(true);
    const [officers, setOfficers] = useState([]);

    useEffect(() => {
        loadOfficers();
    }, []);

    const loadOfficers = async () => {
        try {
            setLoading(true);
            const data = await api.getOfficers();
            // Enhance with mock stats since backend doesn't return aggregated stats per officer yet
            const enhancedOfficers = data.map(officer => ({
                ...officer,
                leads: Math.floor(Math.random() * 50) + 10,
                conversionRate: Math.floor(Math.random() * 30) + 10,
                revenue: (Math.random() * 5 + 1).toFixed(1) + ' Cr'
            }));
            setOfficers(enhancedOfficers);
        } catch (error) {
            console.error('Failed to load officers:', error);
        } finally {
            setLoading(false);
        }
    };

    return (

        <div style={{ padding: '32px', maxWidth: '1400px', margin: '0 auto' }}>
            <div style={{ marginBottom: '32px' }}>
                <h1 style={{ fontSize: '28px', fontWeight: '700', color: '#1A1A1A', marginBottom: '8px' }}>Sales Officers</h1>
                <p style={{ color: '#666' }}>Manage and monitor your regional sales team performance.</p>
            </div>

            {loading ? (
                <div style={{ padding: '40px', textAlign: 'center', color: '#666' }}>Loading officers...</div>
            ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '24px' }}>
                    {officers.map(officer => (
                        <div key={officer.id || officer.email} style={{
                            background: '#FFFFFF',
                            borderRadius: '16px',
                            border: '1px solid #F0F0F0',
                            boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
                            overflow: 'hidden',
                            transition: 'transform 0.2s',
                        }}
                            onMouseOver={e => e.currentTarget.style.transform = 'translateY(-4px)'}
                            onMouseOut={e => e.currentTarget.style.transform = 'translateY(0)'}
                        >
                            <div style={{ padding: '24px', borderBottom: '1px solid #F5F5F5', display: 'flex', alignItems: 'center', gap: '16px' }}>
                                <UserAvatar name={officer.name} size={56} />
                                <div>
                                    <div style={{ fontSize: '18px', fontWeight: '700', color: '#1A1A1A' }}>{officer.name}</div>
                                    <div style={{ fontSize: '13px', color: '#666' }}>{officer.email}</div>
                                    <div style={{
                                        display: 'inline-block',
                                        marginTop: '6px',
                                        padding: '4px 10px',
                                        borderRadius: '20px',
                                        background: '#E3F2FD',
                                        color: '#1565C0',
                                        fontSize: '11px',
                                        fontWeight: '700'
                                    }}>
                                        {officer.role}
                                    </div>
                                </div>
                            </div>
                            <div style={{ padding: '24px', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
                                <div style={{ textAlign: 'center' }}>
                                    <div style={{ fontSize: '20px', fontWeight: '700', color: '#1A1A1A' }}>{officer.leads}</div>
                                    <div style={{ fontSize: '11px', color: '#999', fontWeight: '600' }}>ACTIVE LEADS</div>
                                </div>
                                <div style={{ textAlign: 'center', borderLeft: '1px solid #F0F0F0', borderRight: '1px solid #F0F0F0' }}>
                                    <div style={{ fontSize: '20px', fontWeight: '700', color: COLORS.hpclBlue }}>{officer.revenue}</div>
                                    <div style={{ fontSize: '11px', color: '#999', fontWeight: '600' }}>REVENUE</div>
                                </div>
                                <div style={{ textAlign: 'center' }}>
                                    <div style={{ fontSize: '20px', fontWeight: '700', color: '#28A745' }}>{officer.conversionRate}%</div>
                                    <div style={{ fontSize: '11px', color: '#999', fontWeight: '600' }}>CONVERSION</div>
                                </div>
                            </div>
                            <div style={{ padding: '16px 24px', background: '#FAFAFA', borderTop: '1px solid #F0F0F0', display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                                <button style={{
                                    padding: '8px 16px',
                                    borderRadius: '8px',
                                    border: '1px solid #E0E0E0',
                                    background: '#FFFFFF',
                                    color: '#666',
                                    fontSize: '13px',
                                    fontWeight: '600',
                                    cursor: 'pointer'
                                }}>Message</button>
                                <button style={{
                                    padding: '8px 16px',
                                    borderRadius: '8px',
                                    border: 'none',
                                    background: COLORS.hpclBlue,
                                    color: '#FFFFFF',
                                    fontSize: '13px',
                                    fontWeight: '600',
                                    cursor: 'pointer',
                                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                                }}>View ID</button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

