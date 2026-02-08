'use client';

import {
    User,
    Mail,
    Phone,
    MapPin,
    Briefcase,
    Award,
    TrendingUp,
    Clock
} from '../../../components/Icons';
import { useAuth } from '../../../context/AuthContext';
import { COLORS } from '../../../styles/theme';

export default function OfficerProfilePage() {
    const { user } = useAuth();
    // In a real app, fetch detailed profile stats here

    return (
        <div>
            <div style={{ marginBottom: '32px' }}>
                <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#1A1A1A' }}>Officer Profile</h1>
                <p style={{ color: '#666', marginTop: '4px' }}>View and manage your professional details</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '350px 1fr', gap: '32px' }}>
                {/* Profile Card */}
                <div style={{
                    background: 'white',
                    borderRadius: '16px',
                    border: '1px solid #E0E0E0',
                    overflow: 'hidden',
                    height: 'fit-content'
                }}>
                    <div style={{
                        background: 'linear-gradient(135deg, #005BAC 0%, #0B3D7B 100%)',
                        height: '100px',
                        position: 'relative'
                    }}>
                        <div style={{
                            position: 'absolute',
                            bottom: '-40px',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            width: '80px',
                            height: '80px',
                            borderRadius: '50%',
                            background: 'white',
                            padding: '4px',
                            boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                        }}>
                            <div style={{
                                width: '100%',
                                height: '100%',
                                borderRadius: '50%',
                                background: '#E31E24',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'white',
                                fontSize: '32px',
                                fontWeight: 'bold'
                            }}>
                                {user?.name?.charAt(0) || 'U'}
                            </div>
                        </div>
                    </div>

                    <div style={{ padding: '50px 24px 24px', textAlign: 'center' }}>
                        <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#1A1A1A', marginBottom: '4px' }}>
                            {user?.name || 'Officer Name'}
                        </h2>
                        <p style={{ color: '#666', fontSize: '14px', marginBottom: '24px' }}>
                            Senior Sales Officer - B2B Solutions
                        </p>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', textAlign: 'left' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#444', fontSize: '14px' }}>
                                <Briefcase size={18} color="#666" />
                                <span>Employee ID: {user?.employee_id || 'HPCL88291'}</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#444', fontSize: '14px' }}>
                                <Mail size={18} color="#666" />
                                <span>{user?.email || 'officer@hpcl.in'}</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#444', fontSize: '14px' }}>
                                <Phone size={18} color="#666" />
                                <span>+91 98765-43210</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#444', fontSize: '14px' }}>
                                <MapPin size={18} color="#666" />
                                <span>Mumbai Regional Office, BKC</span>
                            </div>
                        </div>

                        <button style={{
                            marginTop: '24px',
                            width: '100%',
                            padding: '12px',
                            background: '#0B3D7B',
                            color: 'white',
                            border: 'none',
                            borderRadius: '8px',
                            fontWeight: '600',
                            cursor: 'pointer'
                        }}>
                            Edit Profile
                        </button>
                    </div>
                </div>

                {/* Performance Snapshot */}
                <div style={{
                    background: 'white',
                    borderRadius: '16px',
                    border: '1px solid #E0E0E0',
                    padding: '24px'
                }}>
                    <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#1A1A1A', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <TrendingUp size={20} color={COLORS.hpclBlue} />
                        Performance Snapshot (Q3)
                    </h3>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', marginBottom: '32px' }}>
                        <div style={{ background: '#F5F7FA', padding: '16px', borderRadius: '12px', textAlign: 'center' }}>
                            <div style={{ fontSize: '12px', color: '#666', textTransform: 'uppercase', marginBottom: '8px', fontWeight: 'bold' }}>Leads Handled</div>
                            <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#1A1A1A' }}>142</div>
                            <div style={{ fontSize: '12px', color: '#2E7D32', fontWeight: '600' }}>↑ 12% vs last qtr</div>
                        </div>
                        <div style={{ background: '#F5F7FA', padding: '16px', borderRadius: '12px', textAlign: 'center' }}>
                            <div style={{ fontSize: '12px', color: '#666', textTransform: 'uppercase', marginBottom: '8px', fontWeight: 'bold' }}>Conversion Rate</div>
                            <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#1A1A1A' }}>34.2%</div>
                            <div style={{ fontSize: '12px', color: '#2E7D32', fontWeight: '600' }}>↑ 4.5% vs last qtr</div>
                        </div>
                        <div style={{ background: '#F5F7FA', padding: '16px', borderRadius: '12px', textAlign: 'center' }}>
                            <div style={{ fontSize: '12px', color: '#666', textTransform: 'uppercase', marginBottom: '8px', fontWeight: 'bold' }}>Avg. Response</div>
                            <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#1A1A1A' }}>2.4h</div>
                            <div style={{ fontSize: '12px', color: '#0B3D7B', fontWeight: '600' }}>- 10% vs last qtr</div>
                        </div>
                    </div>

                    <div style={{ marginBottom: '32px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '14px', fontWeight: '600' }}>
                            <span>Target Achievement</span>
                            <span>₹4.2 Cr / ₹5.0 Cr (84%)</span>
                        </div>
                        <div style={{ height: '12px', background: '#E0E0E0', borderRadius: '6px', overflow: 'hidden' }}>
                            <div style={{ width: '84%', height: '100%', background: '#0B3D7B', borderRadius: '6px' }}></div>
                        </div>
                        <div style={{ fontSize: '12px', color: '#666', marginTop: '8px', textAlign: 'right' }}>
                            12 Days Left in Quarter
                        </div>
                    </div>

                    <h4 style={{ fontSize: '16px', fontWeight: 'bold', color: '#1A1A1A', marginBottom: '16px' }}>Recent Milestones</h4>

                    <div style={{ display: 'flex', gap: '16px', alignItems: 'center', padding: '16px', border: '1px solid #F0F0F0', borderRadius: '12px', marginBottom: '12px' }}>
                        <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#FFF8E1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Award size={20} color="#F57C00" />
                        </div>
                        <div>
                            <div style={{ fontWeight: '600', fontSize: '14px' }}>Closed Major Enterprise Deal</div>
                            <div style={{ fontSize: '12px', color: '#666' }}>Reliance Logistics - Annual Contract signed</div>
                        </div>
                        <div style={{ marginLeft: 'auto', fontSize: '12px', color: '#999' }}>Oct 14</div>
                    </div>

                    <div style={{ display: 'flex', gap: '16px', alignItems: 'center', padding: '16px', border: '1px solid #F0F0F0', borderRadius: '12px' }}>
                        <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#E3F2FD', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Clock size={20} color="#1976D2" />
                        </div>
                        <div>
                            <div style={{ fontWeight: '600', fontSize: '14px' }}>High Speed Responder</div>
                            <div style={{ fontSize: '12px', color: '#666' }}>Maintained &lt;3hr response time for 30 days</div>
                        </div>
                        <div style={{ marginLeft: 'auto', fontSize: '12px', color: '#999' }}>Sep 30</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
