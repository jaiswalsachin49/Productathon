'use client';

import { usePathname, useRouter } from 'next/navigation';
import { COLORS } from '../styles/theme';

// Professional SVG Icon Components
const DashboardIcon = ({ color = 'currentColor', size = 20 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z" fill={color} />
    </svg>
);

const TeamIcon = ({ color = 'currentColor', size = 20 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" fill={color} />
    </svg>
);

const PerformanceIcon = ({ color = 'currentColor', size = 20 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z" fill={color} />
    </svg>
);

const ChartPieIcon = ({ color = 'currentColor', size = 20 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M21.21 15.89A10 10 0 1 1 8 2.83V11a3 3 0 0 0 3 3h8.21zM22 12A10 10 0 0 0 12 2v10h10z" fill={color} />
    </svg>
);

const UserIcon = ({ size = 24 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" fill={COLORS.hpclBlue} />
    </svg>
);

export default function SalesManagerSidebar() {
    const pathname = usePathname();
    const router = useRouter();

    const menuItems = [
        {
            id: 'dashboard',
            label: 'Dashboard',
            icon: DashboardIcon,
            path: '/sales-manager/dashboard'
        },
        {
            id: 'executive',
            label: 'Executive',
            icon: ChartPieIcon,
            path: '/executive/dashboard'
        },
        {
            id: 'team-leads',
            label: 'Team - Leads',
            icon: TeamIcon,
            path: '/sales-manager/team-leads'
        },
        {
            id: 'officers',
            label: 'Officers',
            icon: UserIcon,
            path: '/sales-manager/officers'
        },
        {
            id: 'performance',
            label: 'Performance',
            icon: PerformanceIcon,
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
            boxShadow: '4px 0 16px rgba(0,0,0,0.04)', // Added depth
        }}>
            {/* Logo Section */}
            <div style={{
                padding: '24px 20px',
                borderBottom: '1px solid #F0F0F0',
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    {/* Professional HPCL Logo */}
                    <div style={{
                        width: '44px',
                        height: '44px',
                        background: `linear-gradient(135deg, ${COLORS.hpclRed} 0%, #C41E24 100%)`,
                        borderRadius: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 2px 8px rgba(227, 30, 36, 0.2)',
                    }}>
                        <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6 8h6v16H6V8zm14 0v7h6v9h-6v-7H14V8h6z" fill="white" />
                        </svg>
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
                padding: '16px 12px', // Adjusted padding
                overflowY: 'auto',
            }}>
                {menuItems.map((item) => {
                    const active = isActive(item.path);
                    const IconComponent = item.icon;
                    return (
                        <div
                            key={item.id}
                            onClick={() => router.push(item.path)}
                            style={{
                                padding: '12px 16px',
                                marginBottom: '4px',
                                borderRadius: '8px',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '12px',
                                background: active ? '#FFF5F5' : 'transparent',
                                position: 'relative',
                                transition: 'all 0.2s ease',
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
                            {/* Active Indicator */}
                            {active && (
                                <div style={{
                                    position: 'absolute',
                                    left: '0',
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    width: '4px',
                                    height: '24px',
                                    background: COLORS.hpclRed,
                                    borderRadius: '0 4px 4px 0',
                                }} />
                            )}

                            <IconComponent color={active ? COLORS.hpclRed : '#666666'} size={20} />
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
                borderTop: '1px solid #E0E0E0', // Slightly stronger border
                background: '#FAFAFA', // Subtle contrast
            }}>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '4px',
                    borderRadius: '8px',
                    cursor: 'pointer',
                }}>
                    <div style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '50%',
                        background: '#FFFFFF',
                        border: '1px solid #E0E0E0',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                        <UserIcon size={20} />
                    </div>
                    <div style={{ flex: 1 }}>
                        <div style={{
                            fontSize: '14px',
                            fontWeight: '600',
                            color: '#1A1A1A',
                        }}>
                            Rajesh Kumar
                        </div>
                        <div style={{
                            fontSize: '11px',
                            color: '#666666',
                        }}>
                            Regional Manager
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
