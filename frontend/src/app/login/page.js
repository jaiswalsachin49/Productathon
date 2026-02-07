'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { COLORS } from '../../styles/theme';

export default function Login() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const role = searchParams.get('role') || 'sales-manager';

    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });
    const [showPassword, setShowPassword] = useState(false);

    const roleConfig = {
        'sales-officer': {
            title: 'Login',
            subtitle: 'Sign in to continue as Sales Officer',
            redirectTo: '/sales-officer/my-leads',
        },
        'sales-manager': {
            title: 'Login',
            subtitle: 'Sign in to continue as Sales Manager',
            redirectTo: '/sales-manager/dashboard',
        },
        'system-admin': {
            title: 'Login',
            subtitle: 'Sign in to continue as System Admin',
            redirectTo: '/admin/dashboard',
        },
    };

    const config = roleConfig[role] || roleConfig['sales-manager'];

    const handleLogin = (e) => {
        e.preventDefault();
        router.push(config.redirectTo);
    };

    const handleGoogleSignIn = () => {
        alert('Google Sign-In integration pending');
    };

    return (
        <div style={{
            minHeight: '100vh',
            background: 'linear-gradient(180deg, #F0F2F5 0%, #E4E6E9 100%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
        }}>
            {/* Login Card */}
            <div style={{
                background: '#FFFFFF',
                borderRadius: '12px',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
                padding: '40px 32px',
                width: '100%',
                maxWidth: '380px',
            }}>
                {/* Logo */}
                <div style={{
                    width: '56px',
                    height: '56px',
                    margin: '0 auto 20px',
                    background: COLORS.hpclBlue,
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#FFB800',
                    fontSize: '18px',
                    fontWeight: '800',
                }}>
                    HPCL
                </div>

                {/* Title */}
                <h1 style={{
                    fontSize: '24px',
                    fontWeight: '700',
                    color: '#1A1A1A',
                    textAlign: 'center',
                    marginBottom: '6px',
                }}>
                    {config.title}
                </h1>
                <p style={{
                    fontSize: '14px',
                    color: '#666666',
                    textAlign: 'center',
                    marginBottom: '28px',
                }}>
                    {config.subtitle}
                </p>

                {/* Login Form */}
                <form onSubmit={handleLogin}>
                    {/* Username Field */}
                    <div style={{ marginBottom: '16px' }}>
                        <label style={{
                            display: 'block',
                            fontSize: '13px',
                            fontWeight: '600',
                            color: '#333333',
                            marginBottom: '6px',
                        }}>
                            Username
                        </label>
                        <div style={{ position: 'relative' }}>
                            <span style={{
                                position: 'absolute',
                                left: '12px',
                                top: '50%',
                                transform: 'translateY(-50%)',
                                fontSize: '16px',
                                color: '#999999',
                            }}>
                                👤
                            </span>
                            <input
                                type="text"
                                value={formData.username}
                                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                                placeholder="Enter your username"
                                style={{
                                    width: '100%',
                                    padding: '11px 12px 11px 38px',
                                    border: '1px solid #D0D0D0',
                                    borderRadius: '6px',
                                    fontSize: '14px',
                                    outline: 'none',
                                    transition: 'border-color 0.2s',
                                    boxSizing: 'border-box',
                                }}
                                onFocus={(e) => e.target.style.borderColor = '#005BAC'}
                                onBlur={(e) => e.target.style.borderColor = '#D0D0D0'}
                            />
                        </div>
                    </div>

                    {/* Password Field */}
                    <div style={{ marginBottom: '10px' }}>
                        <label style={{
                            display: 'block',
                            fontSize: '13px',
                            fontWeight: '600',
                            color: '#333333',
                            marginBottom: '6px',
                        }}>
                            Password
                        </label>
                        <div style={{ position: 'relative' }}>
                            <span style={{
                                position: 'absolute',
                                left: '12px',
                                top: '50%',
                                transform: 'translateY(-50%)',
                                fontSize: '16px',
                                color: '#999999',
                            }}>
                                🔒
                            </span>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                placeholder="Enter your password"
                                style={{
                                    width: '100%',
                                    padding: '11px 38px 11px 38px',
                                    border: '1px solid #D0D0D0',
                                    borderRadius: '6px',
                                    fontSize: '14px',
                                    outline: 'none',
                                    transition: 'border-color 0.2s',
                                    boxSizing: 'border-box',
                                }}
                                onFocus={(e) => e.target.style.borderColor = '#005BAC'}
                                onBlur={(e) => e.target.style.borderColor = '#D0D0D0'}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                style={{
                                    position: 'absolute',
                                    right: '12px',
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    background: 'none',
                                    border: 'none',
                                    cursor: 'pointer',
                                    fontSize: '16px',
                                    color: '#999999',
                                    padding: 0,
                                }}
                            >
                                {showPassword ? '👁️' : '👁️‍🗨️'}
                            </button>
                        </div>
                    </div>

                    {/* Forgot Password */}
                    <div style={{ textAlign: 'right', marginBottom: '20px' }}>
                        <a href="#" style={{
                            fontSize: '13px',
                            color: '#005BAC',
                            textDecoration: 'none',
                            fontWeight: '600',
                        }}>
                            Forgot Password?
                        </a>
                    </div>

                    {/* Login Button */}
                    <button
                        type="submit"
                        style={{
                            width: '100%',
                            padding: '13px',
                            background: '#E31E24',
                            color: '#FFFFFF',
                            border: 'none',
                            borderRadius: '6px',
                            fontSize: '15px',
                            fontWeight: '700',
                            cursor: 'pointer',
                            transition: 'background 0.2s',
                        }}
                        onMouseOver={(e) => e.target.style.background = '#C71A1F'}
                        onMouseOut={(e) => e.target.style.background = '#E31E24'}
                    >
                        Login
                    </button>
                </form>

                {/* Divider */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    margin: '20px 0',
                }}>
                    <div style={{ flex: 1, height: '1px', background: '#E0E0E0' }} />
                    <span style={{
                        padding: '0 12px',
                        fontSize: '12px',
                        color: '#999999',
                        fontWeight: '600',
                    }}>
                        OR
                    </span>
                    <div style={{ flex: 1, height: '1px', background: '#E0E0E0' }} />
                </div>

                {/* Google Sign In */}
                <button
                    type="button"
                    onClick={handleGoogleSignIn}
                    style={{
                        width: '100%',
                        padding: '12px',
                        background: '#FFFFFF',
                        border: '1px solid #D0D0D0',
                        borderRadius: '6px',
                        fontSize: '14px',
                        fontWeight: '600',
                        color: '#333333',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        transition: 'border-color 0.2s',
                    }}
                    onMouseOver={(e) => e.target.style.borderColor = '#005BAC'}
                    onMouseOut={(e) => e.target.style.borderColor = '#D0D0D0'}
                >
                    <span style={{ fontSize: '18px', fontWeight: '700' }}>G</span>
                    Sign in with Google
                </button>

                {/* Security Notice */}
                <div style={{
                    marginTop: '24px',
                    padding: '10px',
                    background: '#F8F9FA',
                    borderRadius: '6px',
                    textAlign: 'center',
                }}>
                    <span style={{
                        fontSize: '12px',
                        color: '#666666',
                        fontWeight: '500',
                    }}>
                        🔒 AUTHORIZED HPCL PERSONNEL ONLY
                    </span>
                </div>
            </div>

            {/* Footer */}
            <div style={{
                marginTop: '20px',
                display: 'flex',
                gap: '16px',
                fontSize: '12px',
                color: '#888888',
                alignItems: 'center',
            }}>
                <a href="#" style={{ color: '#888888', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <span>🛡️</span> Security Policy
                </a>
                <span>•</span>
                <a href="#" style={{ color: '#888888', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <span>❓</span> IT Helpdesk
                </a>
                <span>•</span>
                <span style={{ color: '#28A745', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <span>●</span> System Online
                </span>
            </div>
        </div>
    );
}
