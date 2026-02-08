'use client';

import { COLORS } from '../styles/theme';

export default function BaseLayout({ children, showNavbar = true, showFooter = true }) {
    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            {showNavbar && (
                <nav style={{
                    height: '64px',
                    background: COLORS.hpclBlue,
                    color: '#FFFFFF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0 32px',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                    position: 'sticky',
                    top: 0,
                    zIndex: 1000,
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                        <div style={{
                            width: '48px',
                            height: '48px',
                            background: '#FFFFFF',
                            borderRadius: '4px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontWeight: 'bold',
                            color: COLORS.hpclBlue,
                            fontSize: '20px',
                        }}>
                            HP
                        </div>
                        <div>
                            <div style={{ fontWeight: '600', fontSize: '16px' }}>HPCL Sales Portal</div>
                            <div style={{ fontSize: '10px', opacity: 0.9 }}>ENTERPRISE EDITION</div>
                        </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                        {/* <div style={{ textAlign: 'right' }}>
                            <div style={{ fontSize: '14px', fontWeight: '500' }}>Amit Kumar</div>
                            <div style={{ fontSize: '11px', opacity: 0.8 }}>Employee ID: 49201</div>
                        </div> */}
                        {/* <div style={{
                            width: '40px',
                            height: '40px',
                            borderRadius: '50%',
                            background: '#CCCCCC',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '16px',
                            fontWeight: '600',
                            color: COLORS.textPrimary,
                        }}>
                            AK
                        </div> */}
                    </div>
                </nav>
            )}

            <main style={{ flex: 1, background: COLORS.cardBg }}>
                {children}
            </main>

            {showFooter && (
                <footer style={{
                    background: '#FFFFFF',
                    borderTop: `1px solid ${COLORS.border}`,
                    padding: '16px 32px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    fontSize: '13px',
                    color: COLORS.textSecondary,
                }}>
                    <div>© 2024 Hindustan Petroleum Corporation Limited. All rights reserved.</div>
                    <div style={{ display: 'flex', gap: '24px' }}>
                        <a href="#" style={{ color: COLORS.hpclBlue, textDecoration: 'none' }}>Privacy Policy</a>
                        <a href="#" style={{ color: COLORS.hpclBlue, textDecoration: 'none' }}>Terms of Service</a>
                        <a href="#" style={{ color: COLORS.hpclBlue, textDecoration: 'none' }}>Security Guidelines</a>
                    </div>
                </footer>
            )}
        </div>
    );
}
