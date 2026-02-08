/**
 * HPCL Header Component
 * Consistent navigation across all pages
 */
'use client';

import { useRouter } from 'next/navigation';
import { COLORS } from '../styles/theme';

export default function HPCLHeader({ user = null, onLogout }) {
    const router = useRouter();

    return (
        <header style={{
            background: COLORS.hpclBlue,
            height: '64px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 24px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        }}>
            {/* Logo & Title */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{
                    fontSize: '24px',
                    fontWeight: '700',
                    color: '#FFFFFF',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                }}>
                    <span style={{
                        background: COLORS.hpclRed,
                        padding: '4px 12px',
                        borderRadius: '6px',
                    }}>
                        HP
                    </span>
                    <span>CL</span>
                </div>

                <div style={{
                    height: '40px',
                    width: '1px',
                    background: 'rgba(255,255,255,0.2)',
                }} />

                <div>
                    <div style={{
                        fontSize: '16px',
                        fontWeight: '600',
                        color: '#FFFFFF',
                    }}>
                        B2B Lead Intelligence
                    </div>
                    <div style={{
                        fontSize: '11px',
                        color: 'rgba(255,255,255,0.7)',
                    }}>
                        Powered by AI
                    </div>
                </div>
            </div>

            {/* User Info & Actions */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                {user && (
                    <>
                        <div style={{ textAlign: 'right' }}>
                            <div style={{
                                fontSize: '14px',
                                fontWeight: '600',
                                color: '#FFFFFF',
                            }}>
                                {user.name || 'User'}
                            </div>
                            <div style={{
                                fontSize: '12px',
                                color: 'rgba(255,255,255,0.7)',
                            }}>
                                {user.role || 'Sales Officer'} • {user.region || 'North'}
                            </div>
                        </div>

                        <div style={{
                            width: '40px',
                            height: '40px',
                            borderRadius: '50%',
                            background: COLORS.hpclRed,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#FFFFFF',
                            fontSize: '16px',
                            fontWeight: '700',
                        }}>
                            {(user.name || 'U').charAt(0)}
                        </div>
                    </>
                )}

                {onLogout && (
                    <button
                        onClick={onLogout}
                        style={{
                            padding: '8px 16px',
                            background: 'rgba(255,255,255,0.1)',
                            color: '#FFFFFF',
                            border: '1px solid rgba(255,255,255,0.3)',
                            borderRadius: '6px',
                            fontSize: '13px',
                            fontWeight: '600',
                            cursor: 'pointer',
                            transition: 'all 0.2s',
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.background = 'rgba(255,255,255,0.2)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
                        }}>
                        Logout
                    </button>
                )}
            </div>
        </header>
    );
}
