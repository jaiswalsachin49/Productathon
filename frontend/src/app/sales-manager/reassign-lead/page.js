'use client';

import { useState } from 'react';
import { COLORS } from '../../../styles/theme';

export default function ReassignLead() {
    const [selectedOfficer, setSelectedOfficer] = useState('');
    const [reason, setReason] = useState('');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const lead = {
        id: 'HP-992I-L',
        company: 'Bharat Logistics Solutions',
        priority: 'HIGH PRIORITY',
        productCategory: 'Industrial Lubricants',
        regionalHub: 'Mumbai Central',
        image: '🏭',
    };

    const currentOfficer = {
        name: 'Anand Deshmukh',
        region: 'Western Region Hub',
        avatar: '👤',
    };

    const availableOfficers = [
        { id: 1, name: 'Rajesh Kumar', region: 'Gujarat Hub' },
        { id: 2, name: 'Priya Sharma', region: 'Mumbai Central' },
        { id: 3, name: 'Amit Verma', region: 'Western Region Hub' },
        { id: 4, name: 'Anjali Gupta', region: 'Delhi North' },
    ];

    const handleReassign = () => {
        if (!selectedOfficer || reason.length < 20) {
            alert('Please select an officer and provide a reason (min. 20 characters)');
            return;
        }
        alert('Lead reassigned successfully!');
    };

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
                            background: COLORS.hpclRed,
                            borderRadius: '4px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#FFFFFF',
                            fontSize: '18px',
                            fontWeight: '800',
                        }}>
                            ⛽
                        </div>
                        <span style={{ fontSize: '15px', fontWeight: '700', color: '#1A1A1A' }}>
                            HPCL Sales Console
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
                            borderBottom: '2px solid #E31E24',
                            paddingBottom: '4px',
                        }}>Leads</a>
                        <a href="#" style={{
                            fontSize: '14px',
                            color: '#666666',
                            textDecoration: 'none',
                            fontWeight: '500',
                        }}>Teams</a>
                        <a href="#" style={{
                            fontSize: '14px',
                            color: '#666666',
                            textDecoration: 'none',
                            fontWeight: '500',
                        }}>Analytics</a>
                    </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '50%',
                        background: '#F5F5F5',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        fontSize: '18px',
                    }}>
                        🔔
                    </div>
                    <div style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '50%',
                        background: '#F5F5F5',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        fontSize: '18px',
                    }}>
                        ⚙️
                    </div>
                    <div style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '50%',
                        background: '#C5C5C5',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        fontSize: '18px',
                    }}>
                        👤
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <div style={{ maxWidth: '900px', margin: '0 auto', padding: '32px 24px' }}>
                {/* Breadcrumb */}
                <div style={{
                    fontSize: '14px',
                    color: '#666666',
                    marginBottom: '24px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                }}>
                    <a href="/sales-manager/team-leads" style={{
                        color: COLORS.hpclRed,
                        textDecoration: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                    }}>
                        ← Back to Leads
                    </a>
                    <span>/</span>
                    <span>Reassignment Workflow</span>
                </div>

                {/* Header */}
                <div style={{ marginBottom: '32px' }}>
                    <h1 style={{
                        fontSize: '32px',
                        fontWeight: '700',
                        color: '#1A1A1A',
                        marginBottom: '8px',
                    }}>
                        Reassign Sales Lead
                    </h1>
                    <p style={{ fontSize: '15px', color: '#666666' }}>
                        Transfer ownership of a high-priority lead to another sales officer.
                    </p>
                </div>

                {/* Lead Card */}
                <div style={{
                    background: '#FFFFFF',
                    borderRadius: '12px',
                    padding: '24px',
                    marginBottom: '24px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                }}>
                    <div style={{ display: 'flex', gap: '20px', alignItems: 'start' }}>
                        {/* Image */}
                        <div style={{
                            width: '160px',
                            height: '120px',
                            background: 'linear-gradient(135deg, #E8F0FE 0%, #F0F8FF 100%)',
                            borderRadius: '8px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '48px',
                            flexShrink: 0,
                        }}>
                            {lead.image}
                        </div>

                        {/* Details */}
                        <div style={{ flex: 1 }}>
                            <div style={{
                                background: '#FFE5E6',
                                color: '#E31E24',
                                padding: '4px 10px',
                                borderRadius: '4px',
                                fontSize: '11px',
                                fontWeight: '700',
                                display: 'inline-block',
                                marginBottom: '12px',
                            }}>
                                {lead.priority}
                            </div>
                            <h2 style={{
                                fontSize: '24px',
                                fontWeight: '700',
                                color: '#1A1A1A',
                                marginBottom: '16px',
                            }}>
                                {lead.company}
                            </h2>
                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: '1fr 1fr',
                                gap: '16px',
                            }}>
                                <div>
                                    <div style={{
                                        fontSize: '11px',
                                        color: '#999999',
                                        fontWeight: '600',
                                        textTransform: 'uppercase',
                                        marginBottom: '4px',
                                    }}>
                                        PRODUCT CATEGORY
                                    </div>
                                    <div style={{ fontSize: '14px', fontWeight: '600', color: '#1A1A1A' }}>
                                        {lead.productCategory}
                                    </div>
                                </div>
                                <div>
                                    <div style={{
                                        fontSize: '11px',
                                        color: '#999999',
                                        fontWeight: '600',
                                        textTransform: 'uppercase',
                                        marginBottom: '4px',
                                    }}>
                                        REGIONAL HUB
                                    </div>
                                    <div style={{ fontSize: '14px', fontWeight: '600', color: '#1A1A1A' }}>
                                        {lead.regionalHub}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Lead ID */}
                        <div style={{
                            fontSize: '13px',
                            color: '#999999',
                        }}>
                            Lead ID: {lead.id}
                        </div>
                    </div>
                </div>

                {/* Form Section */}
                <div style={{
                    background: '#FFFFFF',
                    borderRadius: '12px',
                    padding: '32px',
                    marginBottom: '24px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                }}>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr',
                        gap: '32px',
                        marginBottom: '32px',
                    }}>
                        {/* Current Officer */}
                        <div>
                            <label style={{
                                fontSize: '14px',
                                fontWeight: '600',
                                color: '#1A1A1A',
                                marginBottom: '12px',
                                display: 'block',
                            }}>
                                Current Sales Officer
                            </label>
                            <div style={{
                                background: '#F8F9FA',
                                border: '1px solid #E0E0E0',
                                borderRadius: '8px',
                                padding: '12px 16px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '12px',
                            }}>
                                <div style={{
                                    width: '40px',
                                    height: '40px',
                                    borderRadius: '50%',
                                    background: '#FFE5E6',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '20px',
                                }}>
                                    {currentOfficer.avatar}
                                </div>
                                <div>
                                    <div style={{ fontSize: '14px', fontWeight: '600', color: '#1A1A1A' }}>
                                        {currentOfficer.name}
                                    </div>
                                    <div style={{ fontSize: '13px', color: '#666666' }}>
                                        {currentOfficer.region}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Select New Officer */}
                        <div>
                            <label style={{
                                fontSize: '14px',
                                fontWeight: '600',
                                color: '#1A1A1A',
                                marginBottom: '12px',
                                display: 'block',
                            }}>
                                Select New Sales Officer
                            </label>
                            <div style={{ position: 'relative' }}>
                                <div
                                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                    style={{
                                        background: '#FFFFFF',
                                        border: '1px solid #E0E0E0',
                                        borderRadius: '8px',
                                        padding: '12px 16px',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                    }}
                                >
                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '8px',
                                        color: selectedOfficer ? '#1A1A1A' : '#999999',
                                        fontSize: '14px',
                                    }}>
                                        <span style={{ fontSize: '16px' }}>🔒</span>
                                        <span>{selectedOfficer || 'Search for an officer...'}</span>
                                    </div>
                                    <span style={{ fontSize: '12px', color: '#999999' }}>▼</span>
                                </div>

                                {isDropdownOpen && (
                                    <div style={{
                                        position: 'absolute',
                                        top: '100%',
                                        left: 0,
                                        right: 0,
                                        marginTop: '4px',
                                        background: '#FFFFFF',
                                        border: '1px solid #E0E0E0',
                                        borderRadius: '8px',
                                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                                        zIndex: 10,
                                        maxHeight: '200px',
                                        overflowY: 'auto',
                                    }}>
                                        {availableOfficers.map((officer) => (
                                            <div
                                                key={officer.id}
                                                onClick={() => {
                                                    setSelectedOfficer(officer.name);
                                                    setIsDropdownOpen(false);
                                                }}
                                                style={{
                                                    padding: '12px 16px',
                                                    cursor: 'pointer',
                                                    borderBottom: '1px solid #F5F5F5',
                                                    transition: 'background 0.2s',
                                                }}
                                                onMouseOver={(e) => e.currentTarget.style.background = '#F8F9FA'}
                                                onMouseOut={(e) => e.currentTarget.style.background = '#FFFFFF'}
                                            >
                                                <div style={{ fontSize: '14px', fontWeight: '600', color: '#1A1A1A' }}>
                                                    {officer.name}
                                                </div>
                                                <div style={{ fontSize: '13px', color: '#666666' }}>
                                                    {officer.region}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Reason */}
                    <div>
                        <label style={{
                            fontSize: '14px',
                            fontWeight: '600',
                            color: '#1A1A1A',
                            marginBottom: '12px',
                            display: 'block',
                        }}>
                            Reason for Reassignment
                        </label>
                        <textarea
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}
                            placeholder="Briefly explain why this lead is being moved (e.g. Officer on leave, Geographical optimization)..."
                            style={{
                                width: '100%',
                                minHeight: '120px',
                                padding: '12px 16px',
                                border: '1px solid #E0E0E0',
                                borderRadius: '8px',
                                fontSize: '14px',
                                fontFamily: 'inherit',
                                resize: 'vertical',
                                outline: 'none',
                            }}
                        />
                        <div style={{
                            fontSize: '12px',
                            color: reason.length < 20 ? '#E31E24' : '#999999',
                            marginTop: '8px',
                            textAlign: 'right',
                        }}>
                            Min. 20 characters required for audit trail.
                        </div>
                    </div>

                    {/* Buttons */}
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        marginTop: '32px',
                        paddingTop: '24px',
                        borderTop: '1px solid #F0F0F0',
                    }}>
                        <button
                            onClick={() => window.history.back()}
                            style={{
                                background: 'transparent',
                                border: 'none',
                                fontSize: '14px',
                                fontWeight: '600',
                                color: '#666666',
                                cursor: 'pointer',
                                padding: '10px 20px',
                            }}
                        >
                            Discard
                        </button>
                        <button
                            onClick={handleReassign}
                            style={{
                                background: COLORS.hpclRed,
                                border: 'none',
                                borderRadius: '8px',
                                padding: '12px 32px',
                                fontSize: '14px',
                                fontWeight: '700',
                                color: '#FFFFFF',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                            }}
                        >
                            <span>↻</span>
                            Reassign Lead
                        </button>
                    </div>
                </div>

                {/* Info Note */}
                <div style={{
                    background: '#FFF4E5',
                    border: '1px solid #FFE0B2',
                    borderRadius: '12px',
                    padding: '16px 20px',
                    display: 'flex',
                    gap: '12px',
                }}>
                    <div style={{
                        width: '24px',
                        height: '24px',
                        borderRadius: '50%',
                        background: '#E31E24',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#FFFFFF',
                        fontSize: '14px',
                        fontWeight: '700',
                        flexShrink: 0,
                    }}>
                        ℹ
                    </div>
                    <div>
                        <strong style={{ fontSize: '14px', color: '#1A1A1A' }}>Note:</strong>
                        <span style={{ fontSize: '14px', color: '#666666', marginLeft: '4px' }}>
                            Once reassigned, the new officer will receive a push notification. The previous owner will lose write access but will keep read access for 7 days for historical context.
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
