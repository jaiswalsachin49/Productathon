'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import {
    Phone,
    Mail,
    MapPin,
    Calendar,
    PenSquare,
    Plus,
    TrendingUp,
    AlertTriangle,
    Target,
    Briefcase,
    CreditCard,
    ArrowLeft
} from '../../../../components/Icons';
import { COLORS } from '../../../../styles/theme';
import Link from 'next/link';

export default function LeadDossierPage() {
    const params = useParams();
    const [lead, setLead] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLead = async () => {
            try {
                const response = await fetch(`http://localhost:8000/leads/${params.id}`);
                if (response.ok) {
                    const data = await response.json();
                    setLead(data);
                }
            } catch (error) {
                console.error("Failed to fetch lead:", error);
            } finally {
                setLoading(false);
            }
        };

        if (params.id) {
            fetchLead();
        }
    }, [params.id]);

    if (loading) {
        return <div style={{ padding: '40px', textAlign: 'center' }}>Loading dossier...</div>;
    }

    if (!lead) {
        return <div style={{ padding: '40px', textAlign: 'center' }}>Lead not found.</div>;
    }

    return (
        <div>
            {/* Breadcrumb / Back */}
            <div style={{ marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px', color: '#666', fontSize: '14px' }}>
                <Link href="/sales-officer/leads" style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#666', textDecoration: 'none' }}>
                    <ArrowLeft size={16} /> My Leads
                </Link>
                <span>/</span>
                <span>{lead.company_name}</span>
            </div>

            <div style={{ marginBottom: '24px' }}>
                <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#1A1A1A' }}>Lead Dossier</h1>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
                {/* Left Column: Lead Info */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

                    {/* Header Card */}
                    <div style={{ background: 'white', padding: '24px', borderRadius: '16px', border: '1px solid #E0E0E0' }}>
                        <div style={{ display: 'flex', gap: '24px' }}>
                            <div style={{
                                width: '80px',
                                height: '80px',
                                background: '#F5F7FA',
                                borderRadius: '12px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '24px',
                                fontWeight: 'bold',
                                color: COLORS.hpclBlue
                            }}>
                                {lead.company_name?.substring(0, 2).toUpperCase()}
                            </div>
                            <div style={{ flex: 1 }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                                    <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#1A1A1A', margin: 0 }}>
                                        {lead.company_name}
                                    </h2>
                                    {lead.lead_quality === 'HIGH' && (
                                        <span style={{ background: '#E8F5E9', color: '#2E7D32', fontSize: '12px', fontWeight: '700', padding: '4px 8px', borderRadius: '4px' }}>
                                            HIGH INTENT
                                        </span>
                                    )}
                                </div>
                                <div style={{ color: '#666', marginBottom: '16px' }}>
                                    Manufacturing & Heavy Logistics | {lead.company?.city}, {lead.company?.state}
                                </div>
                                <div style={{ display: 'flex', gap: '32px', borderTop: '1px solid #F0F0F0', paddingTop: '16px' }}>
                                    <div>
                                        <div style={{ fontSize: '11px', color: '#888', textTransform: 'uppercase', fontWeight: '700', marginBottom: '4px' }}>LEAD SCORE</div>
                                        <div style={{ fontSize: '20px', fontWeight: 'bold', color: COLORS.hpclBlue }}>92/100</div>
                                    </div>
                                    <div>
                                        <div style={{ fontSize: '11px', color: '#888', textTransform: 'uppercase', fontWeight: '700', marginBottom: '4px' }}>POTENTIAL VALUE</div>
                                        <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#1A1A1A' }}>₹4.2 Cr/yr</div>
                                    </div>
                                    <div>
                                        <div style={{ fontSize: '11px', color: '#888', textTransform: 'uppercase', fontWeight: '700', marginBottom: '4px' }}>DECISION MAKER</div>
                                        <div style={{ fontSize: '16px', fontWeight: '600', color: '#1A1A1A' }}>Amit Khurana (VP Ops)</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* AI Reasoning / Why This Lead */}
                    <div style={{ background: 'white', padding: '24px', borderRadius: '16px', border: '1px solid #E0E0E0' }}>
                        <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#1A1A1A', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <TrendingUp size={20} color={COLORS.hpclBlue} /> Why This Lead?
                        </h3>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            {/* Detailed Signal 1 */}
                            <div style={{ display: 'flex', gap: '16px' }}>
                                <div style={{ minWidth: '40px', height: '40px', borderRadius: '50%', background: '#E3F2FD', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <TrendingUp size={20} color={COLORS.hpclBlue} />
                                </div>
                                <div>
                                    <div style={{ fontWeight: '600', marginBottom: '4px' }}>Fleet Expansion Signal</div>
                                    <div style={{ fontSize: '14px', color: '#555', lineHeight: '1.5' }}>
                                        Purchased 15 new heavy-duty trailers last month. Estimated fuel demand increase: 12,000L/month.
                                    </div>
                                </div>
                            </div>

                            {/* Detailed Signal 2 */}
                            <div style={{ display: 'flex', gap: '16px' }}>
                                <div style={{ minWidth: '40px', height: '40px', borderRadius: '50%', background: '#FFF3E0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <AlertTriangle size={20} color="#F57C00" />
                                </div>
                                <div>
                                    <div style={{ fontWeight: '600', marginBottom: '4px' }}>Competitor Vulnerability</div>
                                    <div style={{ fontSize: '14px', color: '#555', lineHeight: '1.5' }}>
                                        Current contract with private competitor expiring in 45 days. Reported supply chain delays at Jamshedpur hub.
                                    </div>
                                </div>
                            </div>

                            {/* Detailed Signal 3 */}
                            <div style={{ display: 'flex', gap: '16px' }}>
                                <div style={{ minWidth: '40px', height: '40px', borderRadius: '50%', background: '#F3E5F5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <MapPin size={20} color="#7B1FA2" />
                                </div>
                                <div>
                                    <div style={{ fontWeight: '600', marginBottom: '4px' }}>Supply Chain Proximity</div>
                                    <div style={{ fontSize: '14px', color: '#555', lineHeight: '1.5' }}>
                                        Main dispatch yard located within 4km of HPCL Retail Outlet. Ideal for Fleet Card integration.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Recommended Products */}
                    <div style={{ background: 'white', padding: '24px', borderRadius: '16px', border: '1px solid #E0E0E0' }}>
                        <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#1A1A1A', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <Briefcase size={20} color={COLORS.hpclBlue} /> Recommended HPCL Products
                        </h3>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                            <div style={{ background: '#F9FAFB', padding: '16px', borderRadius: '12px', border: '1px solid #F0F0F0' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                                    <Briefcase size={20} color="#333" />
                                    <span style={{ background: '#E8F5E9', color: '#2E7D32', fontSize: '11px', fontWeight: '700', padding: '2px 6px', borderRadius: '4px' }}>High Fit</span>
                                </div>
                                <div style={{ fontWeight: '600', fontSize: '14px', marginBottom: '8px' }}>Industrial Lubricants (HPRL 40)</div>
                                <div style={{ fontSize: '12px', color: '#666', lineHeight: '1.4' }}>
                                    Perfect for heavy trailer maintenance. Reduces wear by 15% vs standard grades.
                                </div>
                            </div>

                            <div style={{ background: '#F9FAFB', padding: '16px', borderRadius: '12px', border: '1px solid #F0F0F0' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                                    <CreditCard size={20} color="#333" />
                                    <span style={{ background: '#E3F2FD', color: '#1976D2', fontSize: '11px', fontWeight: '700', padding: '2px 6px', borderRadius: '4px' }}>Upsell</span>
                                </div>
                                <div style={{ fontWeight: '600', fontSize: '14px', marginBottom: '8px' }}>HP Pay - DriveTrack Plus</div>
                                <div style={{ fontSize: '12px', color: '#666', lineHeight: '1.4' }}>
                                    Fleet management solution with real-time tracking and fuel spend control.
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                {/* Right Column: Actions */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

                    {/* Action Card */}
                    <div style={{ background: 'white', padding: '20px', borderRadius: '16px', border: '1px solid #E0E0E0', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        <button
                            onClick={() => window.open('tel:+919876543210')}
                            style={{
                                width: '100%',
                                padding: '12px',
                                background: '#0B3D7B',
                                color: 'white',
                                border: 'none',
                                borderRadius: '8px',
                                fontWeight: '600',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '8px'
                            }}>
                            <Phone size={18} /> Call Lead
                        </button>
                        <button
                            onClick={() => alert("Status update feature coming soon!")}
                            style={{
                                width: '100%',
                                padding: '12px',
                                background: '#F5F5F5',
                                color: '#333',
                                border: 'none',
                                borderRadius: '8px',
                                fontWeight: '600',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '8px'
                            }}>
                            <PenSquare size={18} /> Update Status
                        </button>
                        <button
                            onClick={() => {
                                const note = prompt("Enter internal note:");
                                if (note) alert("Note added: " + note);
                            }}
                            style={{
                                width: '100%',
                                padding: '12px',
                                background: '#F5F5F5',
                                color: '#333',
                                border: 'none',
                                borderRadius: '8px',
                                fontWeight: '600',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '8px'
                            }}>
                            <Plus size={18} /> Add Internal Notes
                        </button>
                    </div>

                    {/* Suggested Next Action */}
                    <div style={{ background: '#0B3D7B', borderRadius: '16px', padding: '24px', color: 'white', position: 'relative', overflow: 'hidden' }}>
                        <div style={{ position: 'relative', zIndex: 1 }}>
                            <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: '700', marginBottom: '12px', opacity: 0.9 }}>
                                SUGGESTED NEXT ACTION
                            </div>
                            <h3 style={{ fontSize: '18px', fontWeight: '600', lineHeight: '1.4', marginBottom: '20px' }}>
                                Schedule a site visit at {lead.company?.city || 'Jamshedpur'} yard to demonstrate Fleet Card dashboard & savings.
                            </h3>
                            <button
                                onClick={() => alert("Meeting request sent to " + lead.company_name)}
                                style={{
                                    width: '100%',
                                    padding: '12px',
                                    background: 'white',
                                    color: '#0B3D7B',
                                    border: 'none',
                                    borderRadius: '8px',
                                    fontWeight: '700',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '8px'
                                }}>
                                <Calendar size={18} /> Schedule Meeting
                            </button>
                        </div>
                    </div>

                    {/* Map / Operational Base */}
                    <div style={{ background: 'white', padding: '16px', borderRadius: '16px', border: '1px solid #E0E0E0' }}>
                        <h4 style={{ fontSize: '12px', fontWeight: '700', color: '#666', textTransform: 'uppercase', marginBottom: '12px' }}>Operational Base</h4>
                        <div style={{
                            height: '160px',
                            background: '#F0F0F0',
                            borderRadius: '12px',
                            marginBottom: '12px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#999',
                            fontSize: '12px'
                        }}>
                            {/* In a real app, this would be a Google Map component */}
                            Map View Placeholder ({lead.company?.city})
                        </div>
                        <div style={{ display: 'flex', gap: '8px', fontSize: '12px', color: '#555', lineHeight: '1.4' }}>
                            <MapPin size={16} color="#666" style={{ flexShrink: 0, marginTop: '2px' }} />
                            <span>Plot No 42, Adityapur Industrial Area, Phase II, {lead.company?.city} 831013</span>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
