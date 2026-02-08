'use client';

import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { COLORS } from '../../styles/theme';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        const result = await login(email, password);
        if (!result.success) {
            setError(result.error);
            setLoading(false);
        }
    };

    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#F5F7FA',
            fontFamily: "'Inter', sans-serif"
        }}>
            <div style={{
                background: '#FFFFFF',
                borderRadius: '16px',
                boxShadow: '0 8px 32px rgba(0,0,0,0.05)',
                width: '100%',
                maxWidth: '420px',
                padding: '40px',
                border: '1px solid #E0E0E0'
            }}>
                <div style={{ textAlign: 'center', marginBottom: '32px', color: '#1A1A1A' }}>
                    <div style={{
                        width: '56px',
                        height: '56px',
                        background: COLORS.hpclBlue,
                        borderRadius: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontWeight: '800',
                        fontSize: '24px',
                        margin: '0 auto 16px'
                    }}>
                        HP
                    </div>
                    <h1 style={{ fontSize: '24px', fontWeight: '800', color: '#1A1A1A', marginBottom: '8px' }}>
                        Welcome Back
                    </h1>
                    <p style={{ fontSize: '14px', color: '#666' }}>
                        Sign in to HPCL B2B Intelligence Platform
                    </p>
                </div>

                {error && (
                    <div style={{
                        padding: '12px',
                        borderRadius: '8px',
                        background: '#FFEAEA',
                        color: '#D32F2F',
                        fontSize: '13px',
                        marginBottom: '20px',
                        border: '1px solid #FFCDD2',
                        textAlign: 'center'
                    }}>
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '20px' }}>
                        <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#333', marginBottom: '8px' }}>
                            Email Address
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            style={{
                                width: '100%',
                                color: '#1A1A1A',
                                padding: '12px',
                                borderRadius: '8px',
                                border: '1px solid #E0E0E0',
                                fontSize: '14px',
                                outline: 'none',
                                transition: 'all 0.2s',
                            }}
                            placeholder="name@hpcl.in"
                            required
                        />
                    </div>

                    <div style={{ marginBottom: '32px' }}>
                        <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#333', marginBottom: '8px' }}>
                            Password
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={{
                                width: '100%',
                                color: '#1A1A1A',
                                padding: '12px',
                                borderRadius: '8px',
                                border: '1px solid #E0E0E0',
                                fontSize: '14px',
                                outline: 'none',
                                transition: 'all 0.2s',
                            }}
                            placeholder="••••••••"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        style={{
                            width: '100%',
                            padding: '14px',
                            background: COLORS.hpclBlue,
                            color: 'white',
                            border: 'none',
                            borderRadius: '8px',
                            fontSize: '14px',
                            fontWeight: '600',
                            cursor: loading ? 'not-allowed' : 'pointer',
                            opacity: loading ? 0.8 : 1,
                            transition: 'all 0.2s',
                            boxShadow: '0 4px 12px rgba(0, 91, 172, 0.2)'
                        }}
                    >
                        {loading ? 'Signing in...' : 'Sign In'}
                    </button>
                </form>

                <div style={{ marginTop: '24px', textAlign: 'center', fontSize: '12px', color: '#999' }}>
                    Authorized personnel only. Contact IT for access.
                </div>
            </div>
        </div>
    );
}
