'use client';

import SalesManagerSidebar from './SalesManagerSidebar';

export default function SalesManagerLayout({ children }) {
    return (
        <div style={{ display: 'flex', minHeight: '100vh', background: '#F5F7FA' }}>
            <SalesManagerSidebar />
            <div style={{
                flex: 1,
                width: 'calc(100% - 260px)',
            }}>
                {children}
            </div>
        </div>
    );
}
