'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import BaseLayout from '../../components/BaseLayout';
import { COLORS } from '../../styles/theme';

export default function RoleSelection() {
    const router = useRouter();
    const [selectedRole, setSelectedRole] = useState('sales-officer');
    const [hoveredRole, setHoveredRole] = useState(null);

    const roles = [
        {
            id: 'sales-officer',
            title: 'Sales Officer',
            icon: '📋',
            description: 'Manage individual leads, perform site visits, and track your daily performance targets.',
            features: ['Lead Tracking', 'Field Reporting'],
        },
        {
            id: 'sales-manager',
            title: 'Sales Manager',
            icon: '📊',
            description: 'Review regional team performance, approve critical leads, and monitor KPI dashboards.',
            features: ['Team Approvals', 'Regional Insights'],
        },
    ];

    const handleContinue = () => {
        router.push(`/login?role=${selectedRole}`);
    };

    return (
        <BaseLayout>
            <div style={{
                background: 'linear-gradient(180deg, #FFFFFF 0%, #FFF8F8 100%)',
                minHeight: 'calc(100vh - 128px)',
            }}>
                <div style={{
                    maxWidth: '1400px',
                    margin: '0 auto',
                    padding: '60px 40px',
                }}>
                    {/* Header */}
                    <div style={{ textAlign: 'center', marginBottom: '56px' }}>
                        <h1 style={{
                            fontSize: '42px',
                            fontWeight: '700',
                            background: 'linear-gradient(135deg, rgb(0, 91, 172) 0%, rgb(0, 91, 172) 100%)',
                            // WebkitBackgroundClip: 'text',
                            // WebkitTextFillColor: 'transparent',
                            marginBottom: '16px',
                            letterSpacing: '-0.5px',
                        }}>
                            Select Your Role
                        </h1>
                        <p style={{
                            fontSize: '17px',
                            color: '#666666',
                            maxWidth: '640px',
                            margin: '0 auto',
                            lineHeight: '1.6',
                        }}>
                            Welcome back. Choose your workspace to access specialized tools for lead management and execution.
                        </p>
                    </div>

                    {/* Role Cards */}
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        gap: '32px',
                        marginBottom: '56px',
                        flexWrap: 'wrap',
                        maxWidth: '900px',
                        margin: '0 auto 56px',
                    }}>
                        {roles.map((role) => {
                            const isSelected = selectedRole === role.id;
                            const isHovered = hoveredRole === role.id;

                            return (
                                <div
                                    key={role.id}
                                    onClick={() => setSelectedRole(role.id)}
                                    onMouseEnter={() => setHoveredRole(role.id)}
                                    onMouseLeave={() => setHoveredRole(null)}
                                    style={{
                                        background: '#FFFFFF',
                                        border: isSelected ? '3px solid rgb(0, 91, 172)' : '2px solid #F0F0F0',
                                        borderRadius: '16px',
                                        padding: '36px 28px',
                                        cursor: 'pointer',
                                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                        position: 'relative',
                                        overflow: 'hidden',
                                        flex: '1',
                                        minWidth: '340px',
                                        maxWidth: '420px',
                                        boxShadow: isSelected
                                            ? '0 12px 40px rgba(30, 37, 227, 0.25)'
                                            : isHovered
                                                ? '0 8px 24px rgba(0, 0, 0, 0.12)'
                                                : '0 4px 12px rgba(0, 0, 0, 0.06)',
                                        transform: isSelected ? 'translateY(-4px) scale(1.02)' : isHovered ? 'translateY(-2px)' : 'translateY(0)',
                                    }}
                                >
                                    {/* Background Glow */}
                                    {isSelected && (
                                        <div style={{
                                            position: 'absolute',
                                            top: -100,
                                            right: -100,
                                            width: 200,
                                            height: 200,
                                            background: 'radial-gradient(circle, rgba(227, 30, 36, 0.08) 0%, transparent 70%)',
                                            borderRadius: '50%',
                                        }} />
                                    )}

                                    {/* Checkmark */}
                                    {isSelected && (
                                        <div style={{
                                            position: 'absolute',
                                            top: '20px',
                                            right: '20px',
                                            width: '32px',
                                            height: '32px',
                                            borderRadius: '50%',
                                            background: 'rgb(0, 91, 172)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            color: '#FFFFFF',
                                            fontSize: '16px',
                                            fontWeight: 'bold',
                                            boxShadow: '0 4px 12px rgba(0, 92, 172, 0.38)',
                                        }}>
                                            ✓
                                        </div>
                                    )}

                                    {/* Icon */}
                                    <div style={{
                                        width: '72px',
                                        height: '72px',
                                        borderRadius: '16px',
                                        background: isSelected
                                            ? 'linear-gradient(135deg, rgb(0, 91, 172) 0%, rgb(0, 91, 172) 100%)'
                                            : '#FFF5F5',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: '36px',
                                        marginBottom: '24px',
                                        transition: 'all 0.3s',
                                        boxShadow: isSelected ? '0 8px 20px rgba(0, 92, 172, 0.33)' : 'none',
                                    }}>
                                        <span style={{ filter: isSelected ? 'brightness(0) invert(1)' : 'none' }}>
                                            {role.icon}
                                        </span>
                                    </div>

                                    {/* Title */}
                                    <h3 style={{
                                        fontSize: '22px',
                                        fontWeight: '700',
                                        color: isSelected ? 'rgb(0, 91, 172)' : 'rgba(70, 71, 72, 1)',
                                        marginBottom: '12px',
                                        transition: 'color 0.3s',
                                    }}>
                                        {role.title}
                                    </h3>

                                    {/* Description */}
                                    <p style={{
                                        fontSize: '15px',
                                        color: '#666666',
                                        lineHeight: '1.7',
                                        marginBottom: '24px',
                                        minHeight: '68px',
                                    }}>
                                        {role.description}
                                    </p>

                                    {/* Features */}
                                    <div style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: '10px',
                                        paddingTop: '20px',
                                        borderTop: '1px solid #F5F5F5',
                                    }}>
                                        {role.features.map((feature, idx) => (
                                            <div key={idx} style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '10px',
                                                fontSize: '14px',
                                                color: '#555555',
                                                fontWeight: '500',
                                            }}>
                                                <div style={{
                                                    width: '6px',
                                                    height: '6px',
                                                    borderRadius: '50%',
                                                    background: isSelected ? 'rgb(0, 91, 172)' : '#CCCCCC',
                                                    transition: 'background 0.3s',
                                                }} />
                                                {feature}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Continue Button */}
                    <div style={{ textAlign: 'center' }}>
                        <button
                            onClick={handleContinue}
                            style={{
                                background: 'linear-gradient(135deg, rgb(0, 91, 172) 0%, rgb(0, 91, 172) 100%)',
                                color: '#FFFFFF',
                                border: 'none',
                                padding: '16px 48px',
                                fontSize: '17px',
                                fontWeight: '700',
                                borderRadius: '12px',
                                cursor: 'pointer',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '10px',
                                transition: 'all 0.3s',
                                boxShadow: '0 8px 24px rgba(30, 46, 227, 0.3)',
                                letterSpacing: '0.3px',
                            }}
                            onMouseOver={(e) => {
                                e.target.style.transform = 'translateY(-2px)';
                                e.target.style.boxShadow = '0 12px 32px rgba(60, 30, 227, 0.4)';
                            }}
                            onMouseOut={(e) => {
                                e.target.style.transform = 'translateY(0)';
                                e.target.style.boxShadow = '0 8px 24px rgba(43, 30, 227, 0.3)';
                            }}
                        >
                            Continue to Dashboard
                            <span style={{ fontSize: '18px' }}>→</span>
                        </button>

                        <div style={{ marginTop: '28px', fontSize: '14px', color: '#888888' }}>
                            Need help? <a href="#" style={{
                                color: 'rgb(0, 91, 172)',
                                textDecoration: 'none',
                                fontWeight: '600',
                            }}>Contact System Support</a>
                        </div>
                    </div>
                </div>
            </div>
        </BaseLayout>
    );
}
