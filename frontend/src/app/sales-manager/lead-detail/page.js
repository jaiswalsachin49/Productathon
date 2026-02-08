'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { COLORS } from '../../../styles/theme';
import SalesManagerLayout from '../../../components/SalesManagerLayout';
import Link from 'next/link';
import api from '../../../services/api';

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
                <div style={{ fontSize: '24px', fontWeight: '700', color: COLORS.hpclBlue, lineHeight: 1 }}>{Math.round(score)}%</div>
                <div style={{ fontSize: '9px', color: '#999', marginTop: '2px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Confidence</div>
            </div>
        </div>
    );
};

function LeadContent() {
    const searchParams = useSearchParams();
    const id = searchParams.get('id');
    const [loading, setLoading] = useState(true);
    const [lead, setLead] = useState(null);
    const [company, setCompany] = useState(null);
    const [signalData, setSignalData] = useState(null);

    useEffect(() => {
        if (id) {
            loadLeadData(id);
        }
    }, [id]);

    const loadLeadData = async (leadId) => {
        try {
            setLoading(true);
            const leadData = await api.getLead(leadId);
            setLead(leadData);

            if (leadData.company_id) {
                const companyData = await api.getCompany(leadData.company_id);
                setCompany(companyData);
            }

            // In a real app we'd fetch signal details, for now we use lead.signal
            if (leadData.signal) {
                setSignalData(leadData.signal);
            }
        } catch (error) {
            console.error('Error loading lead details:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div>Loading lead details...</div>;
    if (!lead) return <div>Lead not found</div>;

    // Parse recommended products if string
    let recommendedProducts = [];
    try {
        recommendedProducts = typeof lead.recommended_products === 'string'
            ? JSON.parse(lead.recommended_products)
            : (lead.recommended_products || []);
    } catch (e) {
        console.warn('Failed to parse recommended products', e);
    }

    // Fallback to sample if parsing failed or empty
    if (!recommendedProducts.length) {
        recommendedProducts = [
            { name: 'Primary Product', reason: 'High intent detected from signal' }
        ];
    }

    const displayLead = {
        company: company?.name || 'Unknown Company',
        industry: company?.industry || 'General Industry',
        region: company?.state ? `${company.state} Region` : 'West Region',
        lastUpdated: new Date(lead.created_at).toLocaleDateString(),
        conversionConfidence: (lead.confidence_score || 0) * 100,
        assignedOfficer: lead.assigned_officer || 'Unassigned',
        estimatedValue: lead.estimated_volume || 'TBD',
        leadQuality: lead.lead_quality || 'MEDIUM',
    };

    const displaySignal = {
        title: signalData?.title || 'Signal detected from public source',
        bullets: [lead.ai_reasoning || 'AI analysis pending...'],
        source: 'Public Web Source', // Could be signalData.source
        category: 'Market Signal',
    };

    const notes = [
        {
            date: new Date(lead.created_at).toLocaleDateString(),
            officer: 'System',
            action: 'Lead Created',
            detail: 'Lead automatically generated from AI signal processing.',
        }
    ];

    return (
        <div style={{ paddingBottom: '40px' }}>
            {/* Header Section */}
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                marginBottom: '32px',
                borderBottom: '1px solid #E0E0E0',
                paddingBottom: '24px'
            }}>
                <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                        <h1 style={{ fontSize: '28px', fontWeight: '700', color: '#1A1A1A', margin: 0, letterSpacing: '-0.5px' }}>
                            {displayLead.company}
                        </h1>
                        {displayLead.leadQuality === 'HIGH' && (
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
                        )}
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <div style={{ fontSize: '13px', color: '#666', display: 'flex', gap: '8px', alignItems: 'center' }}>
                            <span>{displayLead.industry}</span>
                            <span style={{ color: '#DDD' }}>|</span>
                            <span>{displayLead.region}</span>
                        </div>

                        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#666' }}>
                                <MapPinIcon color="#666" />
                                {company?.city}, {company?.state}
                            </span>

                            {/* Contact Actions */}
                            {company?.phone && (
                                <a href={`tel:${company.phone}`} style={{ textDecoration: 'none' }}>
                                    <button style={{
                                        display: 'flex', alignItems: 'center', gap: '6px',
                                        padding: '4px 10px', background: '#E3F2FD', color: COLORS.hpclBlue,
                                        border: 'none', borderRadius: '16px', fontSize: '11px', fontWeight: '600', cursor: 'pointer'
                                    }}>
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
                                        </svg>
                                        Call
                                    </button>
                                </a>
                            )}
                            {company?.email && (
                                <a href={`mailto:${company.email}`} style={{ textDecoration: 'none' }}>
                                    <button style={{
                                        display: 'flex', alignItems: 'center', gap: '6px',
                                        padding: '4px 10px', background: '#E8F5E9', color: '#28A745',
                                        border: 'none', borderRadius: '16px', fontSize: '11px', fontWeight: '600', cursor: 'pointer'
                                    }}>
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                                            <polyline points="22,6 12,13 2,6" />
                                        </svg>
                                        Email
                                    </button>
                                </a>
                            )}
                        </div>
                    </div>
                </div>

                {/* Status & Actions Box */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '12px' }}>
                    <div style={{ display: 'flex', gap: '8px' }}>
                        {lead.status === 'NEW' && (
                            <button
                                onClick={() => api.updateLeadStatus(id, 'CONTACTED').then(() => loadLeadData(id))}
                                style={{
                                    padding: '8px 16px',
                                    background: COLORS.hpclBlue,
                                    border: 'none',
                                    borderRadius: '6px',
                                    color: '#FFF',
                                    fontSize: '13px',
                                    fontWeight: '600',
                                    cursor: 'pointer',
                                }}
                            >
                                Mark Contacted
                            </button>
                        )}

                        {['CONTACTED', 'QUALIFIED'].includes(lead.status) && (
                            <>
                                <button
                                    onClick={() => api.updateLeadStatus(id, 'WON').then(() => loadLeadData(id))}
                                    style={{
                                        padding: '8px 16px',
                                        background: '#28A745',
                                        border: 'none',
                                        borderRadius: '6px',
                                        color: '#FFF',
                                        fontSize: '13px',
                                        fontWeight: '600',
                                        cursor: 'pointer',
                                    }}
                                >
                                    Won
                                </button>
                                <button
                                    onClick={() => api.updateLeadStatus(id, 'LOST').then(() => loadLeadData(id))}
                                    style={{
                                        padding: '8px 16px',
                                        background: '#FFF',
                                        border: '1px solid #E31E24',
                                        borderRadius: '6px',
                                        color: '#E31E24',
                                        fontSize: '13px',
                                        fontWeight: '600',
                                        cursor: 'pointer',
                                    }}
                                >
                                    Lost
                                </button>
                            </>
                        )}

                        <Link href={`/sales-manager/reassign-lead?id=${id}`}>
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
                                Edit
                            </button>
                        </Link>

                        <button onClick={() => window.print()} style={{
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
                    <div style={{ fontSize: '12px', color: '#999' }}>
                        Status: <span style={{ fontWeight: 600, color: COLORS.hpclBlue }}>{lead.status}</span> • Updated: {displayLead.lastUpdated}
                    </div>
                </div>
            </div>

            {/* Main Content Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '40px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>

                    {/* Signal Logic */}
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
                                        {displaySignal.title}
                                    </h3>
                                    <div style={{ fontSize: '10px', fontWeight: '700', color: '#999', textTransform: 'uppercase', letterSpacing: '0.5px', marginTop: '4px' }}>
                                        Detected Signal
                                    </div>
                                </div>
                                <div style={{ fontSize: '14px', color: '#444', marginBottom: '16px', lineHeight: '1.5', whiteSpace: 'pre-line' }}>
                                    {lead.ai_reasoning || 'No analysis available.'}
                                </div>
                                <div style={{ fontSize: '12px', color: '#888', borderTop: '1px solid #F5F5F5', paddingTop: '12px' }}>
                                    Source: <span style={{ color: '#333', fontWeight: '500' }}>{displaySignal.source}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Products */}
                    <div>
                        <h4 style={{ fontSize: '12px', fontWeight: '700', color: '#888', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                            Recommended Decision
                        </h4>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                            {recommendedProducts.map((product, idx) => (
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
                                                <FuelIcon color="#555" />
                                            </div>
                                            <span style={{ fontSize: '15px', fontWeight: '700', color: '#1A1A1A' }}>{product.name || product.product}</span>
                                        </div>
                                    </div>
                                    <p style={{ fontSize: '13px', color: '#444', lineHeight: '1.5', margin: 0 }}>
                                        <span style={{ color: '#1A1A1A', fontWeight: '600' }}>Why: </span>
                                        {product.reason || product.fit}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Timeline */}
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

                {/* Right Sidebar */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
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
                        <ConfidenceRing score={displayLead.conversionConfidence} />
                        <div style={{ height: '1px', width: '100%', background: '#F5F5F5', margin: '24px 0' }}></div>

                        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            <div>
                                <div style={{ fontSize: '10px', color: '#999', fontWeight: '700', letterSpacing: '0.5px', marginBottom: '4px' }}>EST. VALUE</div>
                                <div style={{ fontSize: '16px', fontWeight: '700', color: '#1A1A1A' }}>{displayLead.estimatedValue}</div>
                            </div>
                            <div>
                                <div style={{ fontSize: '10px', color: '#999', fontWeight: '700', letterSpacing: '0.5px', marginBottom: '4px' }}>ASSIGNED TO</div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: '#E3F2FD', color: COLORS.hpclBlue, fontSize: '9px', fontWeight: '700', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>SO</div>
                                    <div style={{ fontSize: '13px', fontWeight: '600', color: '#333' }}>{displayLead.assignedOfficer}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function LeadDossier() {
    return (
        <SalesManagerLayout>
            <Suspense fallback={<div>Loading...</div>}>
                <style jsx global>{`
                    @media print {
                        nav, button { display: none !important; }
                        body { background: white; }
                    }
                `}</style>
                <div style={{ padding: '32px 40px', maxWidth: '1200px', margin: '0 auto' }}>
                    <LeadContent />
                </div>
            </Suspense>
        </SalesManagerLayout>
    );
}
