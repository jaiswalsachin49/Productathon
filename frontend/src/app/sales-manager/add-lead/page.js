'use client';

import { useState } from 'react';
import SalesManagerLayout from '../../../components/SalesManagerLayout';
import Link from 'next/link';
import { COLORS } from '../../../styles/theme';

export default function AddLead() {
    const [formData, setFormData] = useState({
        companyName: '',
        industry: '',
        region: '',
        contactName: '',
        designation: '',
        email: '',
        phone: '',
        productCategory: '',
        estimatedVolume: '',
        priority: 'Medium',
        assignedOfficer: '',
        notes: ''
    });

    const officers = [
        { id: '1', name: 'Rajesh Kumar', region: 'Gujarat Hub' },
        { id: '2', name: 'Priya Sharma', region: 'Mumbai Central' },
        { id: '3', name: 'Amit Verma', region: 'Western Region' },
        { id: '4', name: 'Anjali Gupta', region: 'Delhi North' },
    ];

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const [showSuccessModal, setShowSuccessModal] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setShowSuccessModal(true);
    };

    return (
        <SalesManagerLayout>
            <div style={{ padding: '32px 40px', maxWidth: '1000px', margin: '0 auto', position: 'relative' }}>

                {/* Breadcrumbs */}
                <div style={{ marginBottom: '24px', fontSize: '13px', color: '#666' }}>
                    <Link href="/sales-manager/team-leads" style={{ color: '#666', textDecoration: 'none' }}>Team - Leads</Link>
                    <span style={{ margin: '0 8px' }}>/</span>
                    <span style={{ color: COLORS.hpclBlue, fontWeight: '600' }}>Add New Lead</span>
                </div>

                {/* Header */}
                <div style={{ marginBottom: '40px', borderBottom: '1px solid #E0E0E0', paddingBottom: '24px' }}>
                    <h1 style={{ fontSize: '28px', fontWeight: '700', color: '#1A1A1A', marginBottom: '8px', letterSpacing: '-0.5px' }}>
                        Add New Lead
                    </h1>
                    <p style={{ fontSize: '14px', color: '#666' }}>
                        Enter details for a new potential commercial partner.
                    </p>
                </div>

                <form onSubmit={handleSubmit}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>

                        {/* Section 1: Company Information */}
                        <div style={{ background: '#FFFFFF', padding: '32px', borderRadius: '12px', border: '1px solid #E0E0E0', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
                            <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#1A1A1A', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <span style={{ width: '4px', height: '16px', background: COLORS.hpclBlue, borderRadius: '2px' }}></span>
                                Company Information
                            </h3>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                                <div>
                                    <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#444', marginBottom: '8px' }}>Company Name *</label>
                                    <input
                                        type="text"
                                        name="companyName"
                                        required
                                        placeholder="e.g. Acme Logistics Pvt Ltd"
                                        style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid #DDD', fontSize: '14px', outline: 'none' }}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div>
                                    <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#444', marginBottom: '8px' }}>Industry Sector *</label>
                                    <select
                                        name="industry"
                                        required
                                        style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid #DDD', fontSize: '14px', outline: 'none', background: '#FFF' }}
                                        onChange={handleChange}
                                    >
                                        <option value="">Select Industry...</option>
                                        <option value="Transport">Transport & Logistics</option>
                                        <option value="Manufacturing">Manufacturing</option>
                                        <option value="Construction">Construction & Mining</option>
                                        <option value="Marine">Marine</option>
                                    </select>
                                </div>
                                <div style={{ gridColumn: '1 / -1' }}>
                                    <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#444', marginBottom: '8px' }}>Regional Hub *</label>
                                    <select
                                        name="region"
                                        required
                                        style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid #DDD', fontSize: '14px', outline: 'none', background: '#FFF' }}
                                        onChange={handleChange}
                                    >
                                        <option value="">Select Region...</option>
                                        <option value="Mumbai">Mumbai Central Hub</option>
                                        <option value="Pune">Pune Industrial Zone</option>
                                        <option value="Gujarat">Gujarat Western Hub</option>
                                        <option value="Delhi">Delhi North Zone</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Section 2: Point of Contact */}
                        <div style={{ background: '#FFFFFF', padding: '32px', borderRadius: '12px', border: '1px solid #E0E0E0', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
                            <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#1A1A1A', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <span style={{ width: '4px', height: '16px', background: COLORS.hpclBlue, borderRadius: '2px' }}></span>
                                Point of Contact
                            </h3>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                                <div>
                                    <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#444', marginBottom: '8px' }}>Contact Person *</label>
                                    <input
                                        type="text"
                                        name="contactName"
                                        required
                                        placeholder="Full Name"
                                        style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid #DDD', fontSize: '14px', outline: 'none' }}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div>
                                    <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#444', marginBottom: '8px' }}>Designation</label>
                                    <input
                                        type="text"
                                        name="designation"
                                        placeholder="e.g. Procurement Manager"
                                        style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid #DDD', fontSize: '14px', outline: 'none' }}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div>
                                    <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#444', marginBottom: '8px' }}>Email Address *</label>
                                    <input
                                        type="email"
                                        name="email"
                                        required
                                        placeholder="email@company.com"
                                        style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid #DDD', fontSize: '14px', outline: 'none' }}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div>
                                    <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#444', marginBottom: '8px' }}>Phone Number *</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        required
                                        placeholder="+91 XXXXX XXXXX"
                                        style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid #DDD', fontSize: '14px', outline: 'none' }}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Section 3: Lead Intelligence */}
                        <div style={{ background: '#FFFFFF', padding: '32px', borderRadius: '12px', border: '1px solid #E0E0E0', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
                            <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#1A1A1A', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <span style={{ width: '4px', height: '16px', background: COLORS.hpclBlue, borderRadius: '2px' }}></span>
                                Lead Intelligence
                            </h3>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                                <div>
                                    <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#444', marginBottom: '8px' }}>Product Category Interest *</label>
                                    <select
                                        name="productCategory"
                                        required
                                        style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid #DDD', fontSize: '14px', outline: 'none', background: '#FFF' }}
                                        onChange={handleChange}
                                    >
                                        <option value="">Select Category...</option>
                                        <option value="Diesel">Bulk Diesel / HSD</option>
                                        <option value="Lubricants">Industrial Lubricants</option>
                                        <option value="Bitumen">Bitumen</option>
                                        <option value="LPG">Commercial LPG</option>
                                    </select>
                                </div>
                                <div>
                                    <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#444', marginBottom: '8px' }}>Est. Monthly Volume (KL)</label>
                                    <input
                                        type="number"
                                        name="estimatedVolume"
                                        placeholder="e.g. 500"
                                        style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid #DDD', fontSize: '14px', outline: 'none' }}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div style={{ gridColumn: '1 / -1' }}>
                                    <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#444', marginBottom: '12px' }}>Initial Priority Assessment</label>
                                    <div style={{ display: 'flex', gap: '16px' }}>
                                        {['Low', 'Medium', 'High'].map((p) => (
                                            <label key={p} style={{
                                                display: 'flex', alignItems: 'center', gap: '8px',
                                                cursor: 'pointer', background: formData.priority === p ? '#F5F9FF' : '#FFF',
                                                padding: '10px 16px', borderRadius: '6px', border: formData.priority === p ? `1px solid ${COLORS.hpclBlue}` : '1px solid #DDD',
                                                transition: 'all 0.2s'
                                            }}>
                                                <input
                                                    type="radio"
                                                    name="priority"
                                                    value={p}
                                                    checked={formData.priority === p}
                                                    onChange={handleChange}
                                                    style={{ accentColor: COLORS.hpclBlue }}
                                                />
                                                <span style={{ fontSize: '14px', fontWeight: formData.priority === p ? '600' : '400', color: '#333' }}>{p} Priority</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                                <div style={{ gridColumn: '1 / -1' }}>
                                    <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#444', marginBottom: '8px' }}>Initial Notes</label>
                                    <textarea
                                        name="notes"
                                        rows="4"
                                        placeholder="Add any context, source of lead, or key requirements..."
                                        style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #DDD', fontSize: '14px', outline: 'none', resize: 'vertical', fontFamily: 'inherit' }}
                                        onChange={handleChange}
                                    ></textarea>
                                </div>
                            </div>
                        </div>

                        {/* Section 4: Lead Assignment */}
                        <div style={{ background: '#FFFFFF', padding: '32px', borderRadius: '12px', border: '1px solid #E0E0E0', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
                            <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#1A1A1A', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <span style={{ width: '4px', height: '16px', background: COLORS.hpclBlue, borderRadius: '2px' }}></span>
                                Lead Assignment
                            </h3>
                            <div>
                                <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#444', marginBottom: '8px' }}>Assign Sales Officer *</label>
                                <select
                                    name="assignedOfficer"
                                    required
                                    style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid #DDD', fontSize: '14px', outline: 'none', background: '#FFF' }}
                                    onChange={handleChange}
                                >
                                    <option value="">Select Officer...</option>
                                    {officers.map(officer => (
                                        <option key={officer.id} value={officer.name}>
                                            {officer.name} - {officer.region}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Actions */}
                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '16px', marginTop: '16px' }}>
                            <Link href="/sales-manager/team-leads">
                                <button type="button" style={{
                                    padding: '12px 24px',
                                    background: '#FFF',
                                    border: '1px solid #DDD',
                                    borderRadius: '8px',
                                    color: '#666',
                                    fontSize: '14px',
                                    fontWeight: '600',
                                    cursor: 'pointer',
                                }}>
                                    Cancel
                                </button>
                            </Link>
                            <button type="submit" style={{
                                padding: '12px 32px',
                                background: COLORS.hpclRed,
                                border: 'none',
                                borderRadius: '8px',
                                color: '#FFF',
                                fontSize: '14px',
                                fontWeight: '700',
                                cursor: 'pointer',
                                boxShadow: '0 4px 12px rgba(227, 30, 36, 0.25)',
                            }}>
                                Create Lead
                            </button>
                        </div>

                    </div>
                </form>

                {/* Success Modal */}
                {showSuccessModal && (
                    <div style={{
                        position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                        background: 'rgba(0,0,0,0.5)', zIndex: 1000,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        backdropFilter: 'blur(4px)',
                        animation: 'fadeIn 0.2s ease-out'
                    }}>
                        <div style={{
                            background: '#FFF',
                            borderRadius: '16px',
                            padding: '40px',
                            width: '400px',
                            textAlign: 'center',
                            boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
                            transform: 'translateY(0)',
                            animation: 'slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
                        }}>
                            <div style={{
                                width: '64px', height: '64px', background: '#E8F5E9', borderRadius: '50%',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                margin: '0 auto 24px auto'
                            }}>
                                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#28A745" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="20 6 9 17 4 12"></polyline>
                                </svg>
                            </div>
                            <h2 style={{ fontSize: '20px', fontWeight: '700', color: '#1A1A1A', marginBottom: '12px' }}>Lead Created Successfully!</h2>
                            <p style={{ fontSize: '14px', color: '#666', marginBottom: '32px', lineHeight: '1.5' }}>
                                The new lead <strong>{formData.companyName}</strong> has been created and assigned to {formData.assignedOfficer}.
                            </p>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                <Link href="/sales-manager/team-leads">
                                    <button style={{
                                        width: '100%', padding: '12px', background: COLORS.hpclBlue, color: '#FFF',
                                        border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: '600', cursor: 'pointer'
                                    }}>
                                        Back to Team Leads
                                    </button>
                                </Link>
                                <button
                                    onClick={() => {
                                        setShowSuccessModal(false);
                                        setFormData({ ...formData, companyName: '', notes: '' }); // Simple reset
                                    }}
                                    style={{
                                        width: '100%', padding: '12px', background: '#FFF', color: '#666',
                                        border: '1px solid #E0E0E0', borderRadius: '8px', fontSize: '14px', fontWeight: '600', cursor: 'pointer'
                                    }}>
                                    Add Another Lead
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                <style jsx>{`
                    @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
                    @keyframes slideUp { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
                `}</style>
            </div>
        </SalesManagerLayout>
    );
}
