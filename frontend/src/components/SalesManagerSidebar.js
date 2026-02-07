'use client';

import { usePathname, useRouter } from 'next/navigation';
import { COLORS } from '../styles/theme';

export default function SalesManagerSidebar() {
    const pathname = usePathname();
    const router = useRouter();

    const menuItems = [
        {
            id: 'dashboard',
            label: 'Dashboard',
            icon: '📊',
            path: '/sales-manager/dashboard'
        },
        {
            id: 'team-leads',
            label: 'Team - Leads',
            icon: '👥',
            path: '/sales-manager/team-leads'
        },
        {
            id: 'performance',
            label: 'Performance',
            icon: '📈',
            path: '/sales-manager/performance'
        },
    ];

    const isActive = (path) => {
        return pathname === path || pathname.startsWith(path + '/');
    };

    return (
        <div style={{
            width: '260px',
            height: '100vh',
            background: '#FFFFFF',
            borderRight: '1px solid #E0E0E0',
            display: 'flex',
            flexDirection: 'column',
            position: 'fixed',
            left: 0,
            top: 0,
            zIndex: 100,
        }}>
            {/* Logo Section */}
            <div style={{
                padding: '24px 20px',
                borderBottom: '1px solid #F0F0F0',
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{
                        width: '44px',
                        height: '44px',
                        background: COLORS.hpclRed,
                        borderRadius: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#FFFFFF',
                        fontSize: '22px',
                        fontWeight: '800',
                    }}>
                        H
                    </div>
                    <div>
                        <div style={{
                            fontSize: '16px',
                            fontWeight: '700',
                            color: '#1A1A1A',
                            lineHeight: '1.2',
                        }}>
                            HPCL
                        </div>
                        <div style={{
                            fontSize: '11px',
                            color: COLORS.hpclBlue,
                            fontWeight: '600',
                            textTransform: 'uppercase',
                        }}>
                            Sales Manager
                        </div>
                    </div>
                </div>
            </div>

            {/* Navigation Menu */}
            <nav style={{
                flex: 1,
                padding: '16px 0',
                overflowY: 'auto',
            }}>
                {menuItems.map((item) => {
                    const active = isActive(item.path);
                    return (
                        <div
                            key={item.id}
                            onClick={() => router.push(item.path)}
                            style={{
                                padding: '12px 20px',
                                margin: '4px 12px',
                                borderRadius: '8px',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '12px',
                                background: active ? '#FFF5F5' : 'transparent',
                                borderLeft: active ? `3px solid ${COLORS.hpclRed}` : '3px solid transparent',
                                transition: 'all 0.2s',
                            }}
                            onMouseOver={(e) => {
                                if (!active) {
                                    e.currentTarget.style.background = '#F8F9FA';
                                }
                            }}
                            onMouseOut={(e) => {
                                if (!active) {
                                    e.currentTarget.style.background = 'transparent';
                                }
                            }}
                        >
                            <span style={{ fontSize: '20px' }}>{item.icon}</span>
                            <span style={{
                                fontSize: '14px',
                                fontWeight: active ? '600' : '500',
                                color: active ? COLORS.hpclRed : '#666666',
                            }}>
                                {item.label}
                            </span>
                        </div>
                    );
                })}
            </nav>

            {/* User Section */}
            <div style={{
                padding: '16px 20px',
                borderTop: '1px solid #F0F0F0',
            }}>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '8px',
                    borderRadius: '8px',
                    cursor: 'pointer',
                }}>
                    <div style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '50%',
                        background: '#E3F2FD',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '14px',
                        fontWeight: '700',
                        color: COLORS.hpclBlue,
                    }}>
                        RK
                    </div>
                    <div style={{ flex: 1 }}>
                        <div style={{
                            fontSize: '13px',
                            fontWeight: '600',
                            color: '#1A1A1A',
                        }}>
                            Rajesh Kumar
                        </div>
                        <div style={{
                            fontSize: '11px',
                            color: '#999999',
                        }}>
                            Regional Manager
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
