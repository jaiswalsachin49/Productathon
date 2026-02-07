'use client';

import { COLORS } from '../../../styles/theme';

export default function LeadDossier() {
    const lead = {
        company: 'ABC Logistics Pvt Ltd',
        industry: 'Transport & Logistics',
        region: 'West Region-Mumbai Hub',
        priority: 'High',
        lastUpdated: 'Oct 24, 2023',
        conversionConfidence: 82,
        assignedOfficer: 'Amit Shahane',
        estimatedValue: '₹1.2 Cr - ₹1.5 Cr',
        industryRank: 'Top 5% (Mumbai)',
        signalStrength: 'Very High',
    };

    const signal = {
        title: 'Major Fleet Expansion Detected',
        description: 'The company recently registered 52 new heavy commercial vehicles (Bharat Benz 5528TT) in the Mumbai RTO. This represents a 35% increase in their total fleet size. This signal suggests a sudden and significant spike in upcoming fuel and high-performance lubricant demand.',
        image: '🚛',
        source: 'RTO Public Registry',
        category: 'Asset Purchase',
    };

    const products = [
        {
            name: 'HP Turbo Diesel',
            description: 'High-performance fuel for heavy-duty engines.',
            quote: 'Strategic fit for the new fleet expansion to ensure maximum engine life and fuel efficiency during the initial break-in period.',
            icon: '⛽',
        },
        {
            name: 'Milcy Turbo',
            description: 'Premium engine oil for BS-VI commercial vehicles.',
            quote: 'Bundled maintenance package recommended. High potential for long-term contract given the vehicle volume.',
            icon: '🛢️',
        },
    ];

    const notes = [
        {
            date: 'Oct 22, 2023',
            officer: 'Amit Shahane',
            note: 'Met with the Procurement Head. They are currently evaluating competitors but our pricing for high-volume diesel is very attractive to them.',
            badge: 'VISIT',
        },
        {
            date: 'Oct 18, 2023',
            officer: 'Amit Shahane',
            note: 'Initial contact established. Confirmed the 50+ vehicle purchase. Scheduled in-person demo for lubricants.',
            badge: 'CALL',
        },
    ];

    return (
        <div style={{ minHeight: '100vh', background: '#F5F7FA' }}>
            {/* Navbar */}
            <nav style={{
                background: '#FFFFFF',
                borderBottom: '1px solid #E0E0E0',
                padding: '0 24px',
                height: '56px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{
                            width: '32px',
                            height: '32px',
                            background: COLORS.hpclBlue,
                            borderRadius: '6px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#FFFFFF',
                            fontSize: '16px',
                            fontWeight: '800',
                        }}>
                            H
                        </div>
                        <span style={{ fontSize: '15px', fontWeight: '700', color: '#1A1A1A' }}>
                            HPCL Manager Portal
                        </span>
                    </div>

                    <div style={{ display: 'flex', gap: '24px' }}>
                        <a href="/sales-manager/dashboard" style={{
                            fontSize: '14px',
                            color: '#666666',
                            textDecoration: 'none',
                            fontWeight: '500',
                        }}>Dashboard</a>
                        <a href="/sales-manager/team-leads" style={{
                            fontSize: '14px',
                            color: '#1A1A1A',
                            textDecoration: 'none',
                            fontWeight: '600',
                            borderBottom: '2px solid #4A90E2',
                            paddingBottom: '4px',
                        }}>Leads</a>
                        <a href="#" style={{
                            fontSize: '14px',
                            color: '#666666',
                            textDecoration: 'none',
                            fontWeight: '500',
                        }}>Analytics</a>
                        <a href="#" style={{
                            fontSize: '14px',
                            color: '#666666',
                            textDecoration: 'none',
                            fontWeight: '500',
                        }}>Regional Reports</a>
                    </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{ position: 'relative' }}>
                        <input
                            type="text"
                            placeholder="Search accounts or officers..."
                            style={{
                                width: '240px',
                                padding: '8px 12px 8px 36px',
                                borderRadius: '6px',
                                border: '1px solid #E0E0E0',
                                fontSize: '13px',
                                outline: 'none',
                            }}
                        />
                        <span style={{
                            position: 'absolute',
                            left: '12px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            fontSize: '14px',
                            color: '#999999',
                        }}>🔍</span>
                    </div>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        fontSize: '13px',
                    }}>
                        <span style={{ fontWeight: '600', color: '#1A1A1A' }}>Rajesh Kumar</span>
                        <span style={{ color: '#999999' }}>Regional Manager, West</span>
                        <div style={{
                            width: '32px',
                            height: '32px',
                            borderRadius: '50%',
                            background: '#4A90E2',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#FFFFFF',
                            fontSize: '13px',
                            fontWeight: '700',
                            marginLeft: '8px',
                        }}>RK</div>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <div style={{ padding: '24px' }}>
                {/* Breadcrumb */}
                <div style={{
                    fontSize: '13px',
                    color: '#666666',
                    marginBottom: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                }}>
                    <a href="/sales-manager/team-leads" style={{ color: COLORS.hpclBlue, textDecoration: 'none' }}>
                        Regional Leads
                    </a>
                    <span>›</span>
                    <span>Mumbai District</span>
                </div>

                {/* Header */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'start',
                    marginBottom: '24px',
                }}>
                    <div>
                        <h1 style={{
                            fontSize: '36px',
                            fontWeight: '700',
                            color: '#1A1A1A',
                            marginBottom: '8px',
                        }}>
                            {lead.company}
                        </h1>
                        <p style={{ fontSize: '15px', color: '#666666', marginBottom: '12px' }}>
                            {lead.industry} · {lead.region}
                        </p>
                    </div>
                    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                        <div style={{
                            background: '#FFE5E6',
                            color: '#E31E24',
                            padding: '8px 16px',
                            borderRadius: '6px',
                            fontSize: '13px',
                            fontWeight: '700',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                        }}>
                            ● High Priority Lead
                        </div>
                        <div style={{ fontSize: '13px', color: '#999999' }}>
                            Last updated: {lead.lastUpdated}
                        </div>
                    </div>
                </div>

                {/* Main Grid */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1.5fr 1fr',
                    gap: '20px',
                }}>
                    {/* Left Column */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        {/* Detected Signal */}
                        <div style={{
                            background: '#FFFFFF',
                            borderRadius: '12px',
                            overflow: 'hidden',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                        }}>
                            <div style={{
                                background: COLORS.hpclBlue,
                                color: '#FFFFFF',
                                padding: '14px 20px',
                                fontSize: '14px',
                                fontWeight: '700',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                            }}>
                                📡 Detected Signal
                            </div>
                            <div style={{ padding: '24px' }}>
                                <div style={{ display: 'flex', gap: '20px' }}>
                                    <div style={{
                                        width: '180px',
                                        height: '140px',
                                        background: '#F0F0F0',
                                        borderRadius: '8px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: '64px',
                                        flexShrink: 0,
                                    }}>
                                        {signal.image}
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <h3 style={{
                                            fontSize: '20px',
                                            fontWeight: '700',
                                            color: '#1A1A1A',
                                            marginBottom: '12px',
                                        }}>
                                            {signal.title}
                                        </h3>
                                        <p style={{
                                            fontSize: '14px',
                                            color: '#666666',
                                            lineHeight: '1.6',
                                            marginBottom: '16px',
                                        }}>
                                            {signal.description}
                                        </p>
                                        <div style={{ display: 'flex', gap: '16px', fontSize: '12px' }}>
                                            <div>
                                                <span style={{ color: '#999999', textTransform: 'uppercase', fontWeight: '600' }}>SOURCE</span>
                                                <div style={{ color: COLORS.hpclBlue, fontWeight: '600', marginTop: '4px' }}>
                                                    {signal.source}
                                                </div>
                                            </div>
                                            <div>
                                                <span style={{ color: '#999999', textTransform: 'uppercase', fontWeight: '600' }}>CATEGORY</span>
                                                <div style={{ color: COLORS.hpclBlue, fontWeight: '600', marginTop: '4px' }}>
                                                    {signal.category}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Recommended Products */}
                        <div style={{
                            background: '#FFFFFF',
                            borderRadius: '12px',
                            overflow: 'hidden',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                        }}>
                            <div style={{
                                background: COLORS.hpclBlue,
                                color: '#FFFFFF',
                                padding: '14px 20px',
                                fontSize: '14px',
                                fontWeight: '700',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                            }}>
                                📦 Recommended HPCL Products
                            </div>
                            <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                {products.map((product, idx) => (
                                    <div key={idx} style={{
                                        border: '1px solid #E0E0E0',
                                        borderRadius: '8px',
                                        padding: '16px',
                                    }}>
                                        <div style={{ display: 'flex', alignItems: 'start', gap: '12px', marginBottom: '12px' }}>
                                            <div style={{
                                                width: '40px',
                                                height: '40px',
                                                background: '#F0F8FF',
                                                borderRadius: '8px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                fontSize: '20px',
                                                flexShrink: 0,
                                            }}>
                                                {product.icon}
                                            </div>
                                            <div style={{ flex: 1 }}>
                                                <h4 style={{ fontSize: '16px', fontWeight: '700', color: '#1A1A1A', marginBottom: '4px' }}>
                                                    {product.name}
                                                </h4>
                                                <p style={{ fontSize: '13px', color: '#666666' }}>
                                                    {product.description}
                                                </p>
                                            </div>
                                        </div>
                                        <div style={{
                                            background: '#F8F9FA',
                                            borderLeft: '3px solid #4A90E2',
                                            padding: '12px',
                                            borderRadius: '4px',
                                            fontSize: '13px',
                                            color: '#333333',
                                            fontStyle: 'italic',
                                        }}>
                                            "{product.quote}"
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Sales Officer Notes */}
                        <div style={{
                            background: '#FFFFFF',
                            borderRadius: '12px',
                            overflow: 'hidden',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                        }}>
                            <div style={{
                                background: COLORS.hpclBlue,
                                color: '#FFFFFF',
                                padding: '14px 20px',
                                fontSize: '14px',
                                fontWeight: '700',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                            }}>
                                📝 Sales Officer Notes
                            </div>
                            <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                {notes.map((note, idx) => (
                                    <div key={idx} style={{
                                        display: 'flex',
                                        gap: '12px',
                                        paddingBottom: idx < notes.length - 1 ? '16px' : '0',
                                        borderBottom: idx < notes.length - 1 ? '1px solid #F0F0F0' : 'none',
                                    }}>
                                        <div style={{
                                            width: '40px',
                                            height: '40px',
                                            borderRadius: '50%',
                                            background: note.badge === 'VISIT' ? '#E8F5E9' : '#E3F2FD',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            color: note.badge === 'VISIT' ? '#28A745' : '#4A90E2',
                                            fontSize: '18px',
                                            flexShrink: 0,
                                        }}>
                                            ●
                                        </div>
                                        <div style={{ flex: 1 }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                                <div>
                                                    <div style={{ fontSize: '13px', color: '#999999' }}>{note.date}</div>
                                                    <div style={{ fontSize: '14px', fontWeight: '600', color: '#1A1A1A' }}>
                                                        {note.officer}
                                                    </div>
                                                </div>
                                                <div style={{
                                                    background: note.badge === 'VISIT' ? '#E8F5E9' : '#E3F2FD',
                                                    color: note.badge === 'VISIT' ? '#28A745' : '#4A90E2',
                                                    padding: '4px 10px',
                                                    borderRadius: '4px',
                                                    fontSize: '11px',
                                                    fontWeight: '700',
                                                    height: 'fit-content',
                                                }}>
                                                    {note.badge}
                                                </div>
                                            </div>
                                            <p style={{ fontSize: '14px', color: '#333333', lineHeight: '1.6' }}>
                                                {note.note}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Column */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        {/* Lead Metadata */}
                        <div style={{
                            background: '#FFFFFF',
                            borderRadius: '12px',
                            overflow: 'hidden',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                        }}>
                            <div style={{
                                background: COLORS.hpclBlue,
                                color: '#FFFFFF',
                                padding: '14px 20px',
                                fontSize: '14px',
                                fontWeight: '700',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                            }}>
                                ℹ️ Lead Metadata
                            </div>
                            <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                {/* Conversion Confidence */}
                                <div>
                                    <div style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        marginBottom: '8px',
                                    }}>
                                        <span style={{ fontSize: '13px', color: '#666666', fontWeight: '600' }}>
                                            Conversion Confidence
                                        </span>
                                        <span style={{ fontSize: '16px', fontWeight: '700', color: COLORS.hpclBlue }}>
                                            {lead.conversionConfidence}%
                                        </span>
                                    </div>
                                    <div style={{
                                        width: '100%',
                                        height: '8px',
                                        background: '#F0F0F0',
                                        borderRadius: '4px',
                                        overflow: 'hidden',
                                    }}>
                                        <div style={{
                                            width: `${lead.conversionConfidence}%`,
                                            height: '100%',
                                            background: COLORS.hpclBlue,
                                            borderRadius: '4px',
                                        }} />
                                    </div>
                                </div>

                                {/* Other Metadata */}
                                <div style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '16px',
                                }}>
                                    <div>
                                        <div style={{ fontSize: '13px', color: '#999999', marginBottom: '4px' }}>
                                            Assigned Officer
                                        </div>
                                        <div style={{ fontSize: '15px', fontWeight: '600', color: '#1A1A1A' }}>
                                            {lead.assignedOfficer}
                                        </div>
                                    </div>

                                    <div>
                                        <div style={{ fontSize: '13px', color: '#999999', marginBottom: '4px' }}>
                                            Est. Annual Value
                                        </div>
                                        <div style={{ fontSize: '15px', fontWeight: '600', color: '#1A1A1A' }}>
                                            {lead.estimatedValue}
                                        </div>
                                    </div>

                                    <div>
                                        <div style={{ fontSize: '13px', color: '#999999', marginBottom: '4px' }}>
                                            Industry Rank
                                        </div>
                                        <div style={{ fontSize: '15px', fontWeight: '600', color: '#28A745' }}>
                                            {lead.industryRank}
                                        </div>
                                    </div>

                                    <div>
                                        <div style={{ fontSize: '13px', color: '#999999', marginBottom: '4px' }}>
                                            Signal Strength
                                        </div>
                                        <div style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '6px',
                                            fontSize: '15px',
                                            fontWeight: '600',
                                            color: COLORS.hpclBlue,
                                        }}>
                                            <span style={{ fontSize: '12px' }}>📊</span>
                                            {lead.signalStrength}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Location Map */}
                        <div style={{
                            background: '#FFFFFF',
                            borderRadius: '12px',
                            overflow: 'hidden',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                        }}>
                            <div style={{
                                height: '300px',
                                background: 'linear-gradient(135deg, #E8F0FE 0%, #F0F8FF 100%)',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                position: 'relative',
                            }}>
                                <div style={{
                                    fontSize: '64px',
                                    marginBottom: '16px',
                                }}>
                                    📍
                                </div>
                                <div style={{
                                    background: '#FFFFFF',
                                    padding: '10px 20px',
                                    borderRadius: '8px',
                                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                }}>
                                    <span style={{ fontSize: '12px' }}>📍</span>
                                    <span style={{ fontSize: '14px', fontWeight: '600', color: '#1A1A1A' }}>
                                        Navi Mumbai Industrial Zone
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div style={{
                padding: '16px 24px',
                borderTop: '1px solid #E0E0E0',
                background: '#FFFFFF',
                marginTop: '24px',
                fontSize: '11px',
                color: '#999999',
                textAlign: 'center',
            }}>
                HPCL LEAD INTEL ENGINE · V2.4.0 · CONFIDENTIAL MANAGER VIEW
            </div>
        </div>
    );
}
