'use client';

import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
    LayoutDashboard,
    Users,
    PieChart,
    Settings,
    LogOut,
    BarChart2,
    Target
} from '../../components/Icons';
import { useAuth } from '../../context/AuthContext';
import { COLORS } from '../../styles/theme';

export default function SalesManagerLayout({ children }) {
    const pathname = usePathname();
    const router = useRouter();
    const { logout, user } = useAuth();

    const menuItems = [
        { name: 'Dashboard', icon: LayoutDashboard, path: '/sales-manager/dashboard' },
        { name: 'Executive View', icon: PieChart, path: '/sales-manager/executive' },
        { name: 'Officers', icon: Users, path: '/sales-manager/officers' },
        { name: 'Team Leads', icon: Users, path: '/sales-manager/team-leads' },
        { name: 'Performance', icon: BarChart2, path: '/sales-manager/performance' },
        // { name: 'Analytics', icon: PieChart, path: '/sales-manager/analytics' },
        // { name: 'Settings', icon: Settings, path: '/sales-manager/settings' },
    ];

    return (
        <div style={{ display: 'flex', minHeight: '100vh', background: '#F5F7FA' }}>
            {/* Sidebar */}
            <div style={{
                width: '260px',
                background: '#0B3D7B', // Darker HPCL Blue
                color: 'white',
                display: 'flex',
                flexDirection: 'column',
                position: 'fixed',
                height: '100vh',
                zIndex: 50
            }}>
                <div style={{ padding: '24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{
                        width: '40px',
                        height: '40px',
                        background: 'white',
                        borderRadius: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#0B3D7B',
                        fontWeight: 'bold'
                    }}>HP</div>
                    <div>
                        <div style={{ fontWeight: 'bold', fontSize: '16px' }}>HPCL Sales</div>
                        <div style={{ fontSize: '12px', opacity: 0.7 }}>Manager Portal</div>
                    </div>
                </div>

                <nav style={{ flex: 1, padding: '24px 12px' }}>
                    {menuItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = pathname.startsWith(item.path);
                        return (
                            <Link
                                key={item.path}
                                href={item.path}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '12px',
                                    padding: '12px 16px',
                                    borderRadius: '8px',
                                    marginBottom: '8px',
                                    color: isActive ? 'white' : 'rgba(255,255,255,0.7)',
                                    background: isActive ? 'rgba(255,255,255,0.1)' : 'transparent',
                                    textDecoration: 'none',
                                    fontSize: '14px',
                                    fontWeight: isActive ? 600 : 400,
                                    transition: 'all 0.2s'
                                }}
                            >
                                <Icon size={20} />
                                {item.name}
                            </Link>
                        );
                    })}
                </nav>

                <div style={{ padding: '24px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                        <div style={{
                            width: '36px',
                            height: '36px',
                            borderRadius: '50%',
                            background: '#E31E24',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontWeight: 'bold',
                            fontSize: '14px'
                        }}>
                            {user?.name?.charAt(0) || 'M'}
                        </div>
                        <div style={{ flex: 1, overflow: 'hidden' }}>
                            <div style={{ fontSize: '14px', fontWeight: '600', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                                {user?.name || 'Manager'}
                            </div>
                            <div style={{ fontSize: '11px', opacity: 0.7 }}>Sales Manager</div>
                        </div>
                    </div>
                    <button
                        onClick={logout}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            color: 'rgba(255,255,255,0.7)',
                            background: 'transparent',
                            border: 'none',
                            fontSize: '13px',
                            cursor: 'pointer',
                            width: '100%',
                            padding: '8px 0'
                        }}
                    >
                        <LogOut size={16} />
                        Sign Out
                    </button>
                </div>
            </div>

            {/* Main Content Area */}
            <div style={{ flex: 1, marginLeft: '260px' }}>
                {/* Header */}
                <header style={{
                    height: '64px',
                    background: 'white',
                    borderBottom: '1px solid #E0E0E0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-end',

                    position: 'sticky',
                    top: 0,
                    zIndex: 40
                }}>
                </header>

                <main style={{ padding: '32px' }}>
                    {children}
                </main>
            </div>
        </div>
    );
}
