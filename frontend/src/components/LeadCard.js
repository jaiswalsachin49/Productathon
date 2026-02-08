/**
 * HPCL Lead Card Component
 * Displays lead with AI reasoning, contact info, and actions
 */
'use client';

import { COLORS } from '../styles/theme';

export default function LeadCard({ lead, onViewDetails, onUpdateStatus }) {
    const getStatusColor = (status) => {
        const colors = {
            new: '#28A745',
            contacted: '#FFC107',
            qualified: '#2196F3',
            won: '#4CAF50',
            lost: '#F44336',
        };
        return colors[status?.toLowerCase()] || '#9E9E9E';
    };

    const getQualityColor = (quality) => {
        const colors = {
            HIGH: '#28A745',
            MEDIUM: '#FF9800',
            LOW: '#9E9E9E',
        };
        return colors[quality] || '#9E9E9E';
    };

    const confidencePercent = Math.round((lead.confidence_score || 0) * 100);
    const statusColor = getStatusColor(lead.status);
    const qualityColor = getQualityColor(lead.lead_quality);

    return (
        <div style={{
            background: '#FFFFFF',
            borderRadius: '12px',
            padding: '20px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
            border: '1px solid #E0E0E0',
            transition: 'all 0.2s',
            cursor: 'pointer',
        }}
            onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.12)';
                e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.08)';
                e.currentTarget.style.transform = 'translateY(0)';
            }}>
            {/* Header: Company + Status */}
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'start',
                marginBottom: '12px',
            }}>
                <div style={{ flex: 1 }}>
                    <h3 style={{
                        fontSize: '18px',
                        fontWeight: '700',
                        color: '#1A1A1A',
                        marginBottom: '4px',
                    }}>
                        {lead.company_name || 'Unknown Company'}
                    </h3>
                    <div style={{ fontSize: '13px', color: '#666' }}>
                        {(lead.signal_title || lead.signal_context?.title || 'No title').substring(0, 80)}...
                    </div>
                </div>

                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <span style={{
                        fontSize: '11px',
                        fontWeight: '700',
                        color: statusColor,
                        background: `${statusColor}15`,
                        padding: '4px 10px',
                        borderRadius: '12px',
                        textTransform: 'uppercase',
                    }}>
                        {lead.status || 'NEW'}
                    </span>

                    {lead.lead_quality && (
                        <span style={{
                            fontSize: '11px',
                            fontWeight: '700',
                            color: qualityColor,
                            background: `${qualityColor}15`,
                            padding: '4px 10px',
                            borderRadius: '12px',
                        }}>
                            {lead.lead_quality}
                        </span>
                    )}
                </div>
            </div>

            {/* Product Recommendation */}
            {lead.product_name && (
                <div style={{
                    background: '#F0F8FF',
                    padding: '10px 12px',
                    borderRadius: '8px',
                    marginBottom: '12px',
                    borderLeft: '3px solid #2196F3',
                }}>
                    <div style={{ fontSize: '12px', color: '#666', marginBottom: '4px' }}>
                        📦 Recommended Product
                    </div>
                    <div style={{ fontSize: '14px', fontWeight: '600', color: '#1A1A1A' }}>
                        {lead.product_name}
                    </div>
                </div>
            )}

            {/* Confidence Score */}
            <div style={{ marginBottom: '12px' }}>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: '4px',
                }}>
                    <span style={{ fontSize: '12px', color: '#666' }}>Confidence Score</span>
                    <span style={{
                        fontSize: '13px',
                        fontWeight: '700',
                        color: confidencePercent >= 75 ? '#28A745' : confidencePercent >= 50 ? '#FF9800' : '#9E9E9E',
                    }}>
                        {confidencePercent}%
                    </span>
                </div>
                <div style={{
                    height: '6px',
                    background: '#E0E0E0',
                    borderRadius: '3px',
                    overflow: 'hidden',
                }}>
                    <div style={{
                        width: `${confidencePercent}%`,
                        height: '100%',
                        background: confidencePercent >= 75 ? '#28A745' : confidencePercent >= 50 ? '#FF9800' : '#9E9E9E',
                        borderRadius: '3px',
                        transition: 'width 0.3s',
                    }} />
                </div>
            </div>

            {/* AI Reasoning */}
            {lead.ai_reasoning && (
                <div style={{
                    background: '#FFF9E6',
                    padding: '10px 12px',
                    borderRadius: '8px',
                    marginBottom: '12px',
                    borderLeft: '3px solid #FFB800',
                }}>
                    <div style={{ fontSize: '12px', color: '#666', marginBottom: '4px' }}>
                        🤖 AI Analysis
                    </div>
                    <div style={{
                        fontSize: '13px',
                        color: '#333',
                        lineHeight: '1.5',
                        maxHeight: '60px',
                        overflow: 'hidden',
                    }}>
                        {lead.ai_reasoning.split('\n')[0]}...
                    </div>
                </div>
            )}

            {/* Actions */}
            <div style={{
                display: 'flex',
                gap: '8px',
                paddingTop: '12px',
                borderTop: '1px solid #E0E0E0',
            }}>
                <button
                    onClick={() => onViewDetails(lead)}
                    style={{
                        flex: 1,
                        padding: '8px 16px',
                        background: COLORS.hpclBlue,
                        color: '#FFFFFF',
                        border: 'none',
                        borderRadius: '6px',
                        fontSize: '13px',
                        fontWeight: '600',
                        cursor: 'pointer',
                    }}>
                    View Details
                </button>

                <button
                    onClick={() => onUpdateStatus(lead)}
                    style={{
                        padding: '8px 16px',
                        background: '#FFFFFF',
                        color: COLORS.hpclBlue,
                        border: `1px solid ${COLORS.hpclBlue}`,
                        borderRadius: '6px',
                        fontSize: '13px',
                        fontWeight: '600',
                        cursor: 'pointer',
                    }}>
                    Update Status
                </button>
            </div>
        </div>
    );
}
