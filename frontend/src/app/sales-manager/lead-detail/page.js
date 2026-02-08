'use client';

import { COLORS } from '../../../styles/theme';
import SalesManagerLayout from '../../../components/SalesManagerLayout';
import Link from 'next/link';

// --- Icons ---
const SignalIcon = ({ color = '#333' }) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" strokeOpacity="0.5" />
        <circle cx="12" cy="12" r="3" fill={color} fillOpacity="0.1" />
    </svg>
);

const FuelIcon = ({ color = '#333' }) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 22v-8a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v8"></path>
        <path d="M18 10h2a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2h-2"></path>
        <path d="M14 22v-6a2 2 0 0 0-2-2"></path>
        <path d="M11 5a3 3 0 0 0-6 0v7h6V5z"></path>
        <path d="M8 3v2"></path>
    </svg>
);

const OilIcon = ({ color = '#333' }) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2.69l5.74 5.74c1.88 1.88 2.26 4.79.84 7.15-1.42 2.37-4.12 3.42-6.58 3.42s-5.16-1.05-6.58-3.42c-1.42-2.36-1.04-5.27.84-7.15L12 2.69z"></path>
        <path d="M12 18.5a6.5 6.5 0 1 0 0-13 6.5 6.5 0 0 0 0 13z" opacity="0.3"></path>
    </svg>
);

const MapPinIcon = ({ color = '#333' }) => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
        <circle cx="12" cy="10" r="3"></circle>
    </svg>
);

const ConfidenceRing = ({ score, size = 100, stroke = 6 }) => {
    const radius = (size - stroke) / 2;
    const circumference = radius * 2 * Math.PI;
    const offset = circumference - (score / 100) * circumference;

    return (
        <div style={{ position: 'relative', width: size, height: size, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
                <circle cx={size / 2} cy={size / 2} r={radius} stroke="#F0F0F0" strokeWidth={stroke} fill="transparent" />
                <circle cx={size / 2} cy={size / 2} r={radius} stroke={COLORS.hpclBlue} strokeWidth={stroke} fill="transparent" strokeDasharray={circumference} strokeDashoffset={offset} strokeLinecap="round" />
            </svg>
            <div style={{ position: 'absolute', textAlign: 'center' }}>
                <div style={{ fontSize: '24px', fontWeight: '700', color: COLORS.hpclBlue, lineHeight: 1 }}>{score}%</div>
                <div style={{ fontSize: '9px', color: '#999', marginTop: '2px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Confidence</div>
            </div>
        </div>
    );
};

export default function LeadDossier() {
    const lead = {
        company: 'ABC Logistics Pvt Ltd',
        industry: 'Transport & Logistics',
        region: 'West Region - Mumbai Hub',
        lastUpdated: 'Oct 24, 2023',
        conversionConfidence: 82,
        assignedOfficer: 'Amit Shahane',
        estimatedValue: '₹1.2 Cr - ₹1.5 Cr',
        industryRank: 'Top 5%',
    };

    const signal = {
        title: 'Major Fleet Expansion Detected',
        bullets: [
            'Registered 52 new heavy commercial vehicles (Bharat Benz 5528TT).',
            'Represents 35% increase in total fleet size.',
            'Direct indicator of immediate fuel and lubricant demand spike.'
        ],
        source: 'RTO Public Registry',
        category: 'Asset Purchase',
    };

    const products = [
        {
            name: 'HP Turbo Diesel',
            fit: 'Strategic Fit',
            reason: 'Matches new Bharat Benz fleet specs strictly. Perfect entry point.',
            Icon: FuelIcon,
        },
        {
            name: 'Milcy Turbo',
            fit: 'Cross-Sell Opportunity',
            reason: 'High potential for long-term maintenance contract.',
            Icon: OilIcon,
        },
    ];

    const notes = [
        {
            date: 'Oct 22',
            officer: 'Amit Shahane',
            action: 'Site Visit',
            detail: 'Evaluated storage capacity. Competitor pricing is aggressive but they prefer our supply reliability.',
        },
        {
            date: 'Oct 18',
            officer: 'Amit Shahane',
            action: 'Initial Call',
            detail: 'Confirmed vehicle purchase news. Scheduled demo.',
        },
        {
            date: 'Oct 15',
            officer: 'System',
            action: 'Signal Detected',
            detail: 'Automated signal generated from RTO database integration.',
        },
    ];

    const handleExport = () => {
        window.print();
    };

    return (
        <SalesManagerLayout>
            <style jsx global>{`
                @keyframes pulse-dot {
                    0% { box-shadow: 0 0 0 0 rgba(227, 30, 36, 0.4); transform: scale(1); }
                    70% { box-shadow: 0 0 0 6px rgba(227, 30, 36, 0); transform: scale(1.1); }
                    100% { box-shadow: 0 0 0 0 rgba(227, 30, 36, 0); transform: scale(1); }
                }
                @media print {
                    nav, button { display: none !important; }
                    body { background: white; }
                }
            `}</style>

            <div style={{ padding: '32px 40px', maxWidth: '1200px', margin: '0 auto' }}>

                {/* --- 1. Header (Restructured & Lightened) --- */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'end', // Align bottom for cleaner metadata look
                    marginBottom: '40px',
                    borderBottom: '1px solid #E0E0E0',
                    paddingBottom: '24px'
                }}>
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                            <h1 style={{ fontSize: '28px', fontWeight: '700', color: '#1A1A1A', margin: 0, letterSpacing: '-0.5px' }}>
                                {lead.company}
                            </h1>
                            <div style={{
                                background: '#FFF1F1',
                                color: '#E31E24',
                                padding: '2px 8px',
                                borderRadius: '4px',
                                fontSize: '10px',
                                fontWeight: '600',
                                letterSpacing: '0.5px',
                                textTransform: 'uppercase'
                            }}>
                                High Priority
                            </div>
                        </div>
                        <div style={{ fontSize: '13px', color: '#666', display: 'flex', gap: '8px', alignItems: 'center' }}>
                            <span>{lead.industry}</span>
                            <span style={{ color: '#DDD' }}>|</span>
                            <span>{lead.region}</span>
                        </div>
                    </div>

                    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                        <div style={{ fontSize: '12px', color: '#999', marginRight: '16px' }}>
                            Last updated: {lead.lastUpdated}
                        </div>
                        <Link href="/sales-manager/reassign-lead">
                            <button style={{
                                padding: '8px 16px',
                                background: '#FFF',
                                border: '1px solid #DDD',
                                borderRadius: '6px',
                                color: '#333',
                                fontSize: '13px',
                                fontWeight: '500',
                                cursor: 'pointer',
                            }}>
                                Edit Lead
                            </button>
                        </Link>
                        <button onClick={handleExport} style={{
                            padding: '8px 16px',
                            background: '#F8F9FA',
                            border: '1px solid #F8F9FA',
                            borderRadius: '6px',
                            color: '#333',
                            fontSize: '13px',
                            fontWeight: '500',
                            cursor: 'pointer',
                        }}>
                            Export
                        </button>
                    </div>
                </div>

                {/* --- Main Content Grid --- */}
                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '40px' }}>

                    {/* Left Column */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>

                        {/* 2. Detected Signal (Clean, No Blue Header) */}
                        <div style={{
                            background: '#FFFFFF',
                            borderRadius: '8px',
                            border: '1px solid #E0E0E0',
                            padding: '24px',
                        }}>
                            <div style={{ display: 'flex', gap: '20px', alignItems: 'start' }}>
                                <div style={{
                                    width: '40px', height: '40px', background: '#F5F9FF', borderRadius: '8px',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
                                }}>
                                    <SignalIcon color={COLORS.hpclBlue} />
                                </div>
                                <div style={{ flex: 1 }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                        <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#1A1A1A', margin: 0 }}>
                                            {signal.title}
                                        </h3>
                                        <div style={{ fontSize: '10px', fontWeight: '700', color: '#999', textTransform: 'uppercase', letterSpacing: '0.5px', marginTop: '4px' }}>
                                            Detected Signal
                                        </div>
                                    </div>
                                    <ul style={{ paddingLeft: '16px', margin: '0 0 16px 0' }}>
                                        {signal.bullets.map((bullet, idx) => (
                                            <li key={idx} style={{ fontSize: '14px', color: '#444', marginBottom: '4px', lineHeight: '1.5' }}>
                                                {bullet}
                                            </li>
                                        ))}
                                    </ul>
                                    <div style={{ fontSize: '12px', color: '#888', borderTop: '1px solid #F5F5F5', paddingTop: '12px' }}>
                                        Source: <span style={{ color: '#333', fontWeight: '500' }}>{signal.source}</span>
                                        <span style={{ margin: '0 8px', color: '#EEE' }}>|</span>
                                        Category: <span style={{ color: '#333', fontWeight: '500' }}>{signal.category}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 3. Recommended Actions (Decision Cards) */}
                        <div>
                            <h4 style={{ fontSize: '12px', fontWeight: '700', color: '#888', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                                Recommended Decision
                            </h4>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                                {products.map((product, idx) => {
                                    const Icon = product.Icon;
                                    return (
                                        <div key={idx} style={{
                                            background: '#FFFFFF',
                                            borderRadius: '8px',
                                            border: '1px solid #E0E0E0',
                                            padding: '20px',
                                        }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '16px' }}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                                    <div style={{
                                                        width: '32px', height: '32px', background: '#F5F7FA', borderRadius: '6px',
                                                        display: 'flex', alignItems: 'center', justifyContent: 'center'
                                                    }}>
                                                        <Icon color="#555" />
                                                    </div>
                                                    <span style={{ fontSize: '15px', fontWeight: '700', color: '#1A1A1A' }}>{product.name}</span>
                                                </div>
                                                <div style={{
                                                    background: '#E8F5E9', color: '#2E7D32', padding: '2px 6px',
                                                    borderRadius: '4px', fontSize: '9px', fontWeight: '700', textTransform: 'uppercase'
                                                }}>
                                                    High Relevance
                                                </div>
                                            </div>
                                            <p style={{ fontSize: '13px', color: '#444', lineHeight: '1.5', margin: 0 }}>
                                                <span style={{ color: '#1A1A1A', fontWeight: '600' }}>Why: </span>
                                                {product.reason}
                                            </p>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* 5. Engagement History (Timeline) */}
                        <div>
                            <h4 style={{ fontSize: '12px', fontWeight: '700', color: '#888', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                                Progression
                            </h4>
                            <div style={{ background: '#FFFFFF', borderRadius: '8px', border: '1px solid #E0E0E0', padding: '24px 24px 8px 24px' }}>
                                {notes.map((note, idx) => (
                                    <div key={idx} style={{ display: 'flex', gap: '24px', position: 'relative', marginBottom: '24px' }}>
                                        {idx !== notes.length - 1 && (
                                            <div style={{ position: 'absolute', left: '7px', top: '20px', bottom: '-40px', width: '1px', background: '#E0E0E0' }}></div>
                                        )}
                                        <div style={{
                                            width: '15px', height: '15px', borderRadius: '50%',
                                            background: idx === 0 ? COLORS.hpclRed : '#F5F5F5',
                                            border: idx === 0 ? `3px solid ${COLORS.hpclRed}` : '3px solid white',
                                            boxShadow: idx === 0 ? 'none' : '0 0 0 1px #E0E0E0',
                                            marginTop: '4px', flexShrink: 0, zIndex: 1,
                                            animation: idx === 0 ? 'pulse-dot 2s infinite' : 'none',
                                        }}></div>
                                        <div style={{ flex: 1 }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                                                <span style={{ fontSize: '14px', fontWeight: '700', color: '#1A1A1A' }}>{note.action}</span>
                                                <span style={{ fontSize: '11px', color: '#999', fontWeight: '500' }}>{note.date}</span>
                                            </div>
                                            <div style={{ fontSize: '13px', color: '#555', lineHeight: '1.4' }}>{note.detail}</div>
                                            <div style={{ fontSize: '11px', color: '#BBB', marginTop: '4px' }}>by {note.officer}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Intelligence Sidebar */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

                        {/* 3. Lead Metadata (Rebalanced) */}
                        <div style={{
                            background: '#FFFFFF',
                            borderRadius: '12px',
                            boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
                            padding: '32px 24px',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            borderTop: `4px solid ${COLORS.hpclBlue}`
                        }}>
                            <ConfidenceRing score={lead.conversionConfidence} />
                            <div style={{ height: '1px', width: '100%', background: '#F5F5F5', margin: '24px 0' }}></div>

                            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                <div>
                                    <div style={{ fontSize: '10px', color: '#999', fontWeight: '700', letterSpacing: '0.5px', marginBottom: '4px' }}>EST. VALUE</div>
                                    <div style={{ fontSize: '16px', fontWeight: '700', color: '#1A1A1A' }}>{lead.estimatedValue}</div>
                                </div>
                                <div>
                                    <div style={{ fontSize: '10px', color: '#999', fontWeight: '700', letterSpacing: '0.5px', marginBottom: '4px' }}>ASSIGNED TO</div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: '#E3F2FD', color: COLORS.hpclBlue, fontSize: '9px', fontWeight: '700', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>AS</div>
                                        <div style={{ fontSize: '13px', fontWeight: '600', color: '#333' }}>{lead.assignedOfficer}</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 4. Map Section (Reduced Dominance) */}
                        <div style={{
                            background: '#FFFFFF',
                            borderRadius: '12px',
                            overflow: 'hidden',
                            border: '1px solid #E0E0E0',
                            height: '160px', // Reduced height
                            position: 'relative'
                        }}>
                            <div style={{
                                width: '100%', height: '100%',
                                background: '#F5F7FA',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                backgroundImage: 'radial-gradient(#E1E4E8 1px, transparent 1px)',
                                backgroundSize: '12px 12px'
                            }}>
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
                                    <MapPinIcon color={COLORS.hpclRed} />
                                    <span style={{ fontSize: '11px', fontWeight: '600', color: '#555' }}>Mumbai Hub</span>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </SalesManagerLayout>
    );
}
