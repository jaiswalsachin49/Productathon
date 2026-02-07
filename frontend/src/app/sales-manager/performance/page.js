'use client';

import { COLORS } from '../../../styles/theme';

export default function PerformanceDashboard() {
    const metrics = [
        { label: 'TOTAL REVENUE', value: '₹45.2', unit: 'Cr', change: '+5.2%', positive: true },
        { label: 'TARGET ACHIEVEMENT', value: '92.0', unit: '%', change: '+1.8%', positive: true },
        { label: 'CONVERSION RATE', value: '14.5', unit: '%', change: '-0.4%', positive: false },
        { label: 'ACTIVE LEADS', value: '1,280', unit: '', change: '+12.0%', positive: true },
    ];

    const funnelStages = [
        { label: 'TOTAL LEADS', value: '1,280', width: 100 },
        { label: 'QUALIFIED', value: '840', width: 75 },
        { label: 'NEGOTIATION', value: '312', width: 50 },
        { label: 'CONVERTED', value: '186', width: 35 },
    ];

    const salesOfficers = [
        { name: 'A. Deshmukh', leads: 245, percentage: 100 },
        { name: 'R. Verma', leads: 212, percentage: 87 },
        { name: 'M. Singhania', leads: 198, percentage: 81 },
        { name: 'P. Kulkarni', leads: 156, percentage: 64 },
        { name: 'S. Patil', leads: 142, percentage: 58 },
    ];

    const sectors = [
        { name: 'B2B/Industrial', percentage: 42, color: '#C62828' },
        { name: 'Retail/B2C', percentage: 28, color: '#E57373' },
        { name: 'Government', percentage: 18, color: '#FFCDD2' },
        { name: 'Aviation', percentage: 12, color: '#FFEBEE' },
    ];

    const districts = [
        { name: 'Mumbai', intensity: 'HIGH' },
        { name: 'Pune', intensity: 'HIGH' },
        { name: 'Nagpur', intensity: 'MID' },
        { name: 'Nashik', intensity: 'LOW' },
        { name: 'Aurangabad', intensity: 'MID' },
        { name: 'Solapur', intensity: 'LOW' },
    ];

    const topProducts = [
        { name: 'HP Power 95', category: 'Premium Petrol', value: '₹18.2 Cr', change: '+2.8%' },
        { name: 'HP Racer 4T', category: 'Engine Lubricant', value: '₹9.5 Cr', change: '+3.1%' },
        { name: 'HP Gas (Bulk)', category: 'Industrial LPG', value: '₹7.1 Cr', change: '+1.4%' },
        { name: 'Furnace Oil', category: 'Heavy Fuel', value: '₹5.4 Cr', change: '-0.8%' },
    ];

    const getIntensityColor = (intensity) => {
        switch (intensity) {
            case 'HIGH': return '#C62828';
            case 'MID': return '#E57373';
            case 'LOW': return '#FFCDD2';
            default: return '#F5F5F5';
        }
    };

    return (
        <div style={{ minHeight: '100vh', background: '#F5F7FA' }}>
            {/* Navbar */}
            <nav style={{
                background: '#FFFFFF',
                borderBottom: '1px solid #E0E0E0',
                padding: '0 24px',
                height: '60px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{
                        width: '40px',
                        height: '40px',
                        background: COLORS.hpclRed,
                        borderRadius: '6px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#FFFFFF',
                        fontSize: '20px',
                        fontWeight: '800',
                    }}>
                        H
                    </div>
                    <div>
                        <div style={{ fontSize: '16px', fontWeight: '700', color: '#1A1A1A' }}>
                            HPCL
                        </div>
                        <div style={{ fontSize: '11px', color: COLORS.hpclBlue, fontWeight: '600' }}>
                            SALES ANALYTICS
                        </div>
                    </div>
                </div>

                <div style={{ fontSize: '16px', fontWeight: '600', color: '#1A1A1A' }}>
                    Executive Performance Dashboard
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{ position: 'relative' }}>
                        <input
                            type="text"
                            placeholder="Search region or officer..."
                            style={{
                                width: '200px',
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
                        padding: '8px 12px',
                        background: '#FFFFFF',
                        border: '1px solid #E0E0E0',
                        borderRadius: '6px',
                        fontSize: '13px',
                        fontWeight: '600',
                        color: '#333333',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                    }}>
                        📅 Q3 2023
                    </div>
                    <div style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '50%',
                        background: '#4A90E2',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#FFFFFF',
                        fontSize: '14px',
                        fontWeight: '700',
                    }}>
                        A
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <div style={{ padding: '24px' }}>
                {/* Header */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '24px',
                }}>
                    <div>
                        <div style={{ fontSize: '11px', color: '#999999', fontWeight: '600', marginBottom: '4px' }}>
                            OVERVIEW
                        </div>
                        <h1 style={{ fontSize: '32px', fontWeight: '700', color: '#1A1A1A' }}>
                            Region: West Zone
                        </h1>
                    </div>
                    <div style={{ display: 'flex', gap: '12px' }}>
                        <button style={{
                            padding: '10px 18px',
                            background: COLORS.hpclRed,
                            border: 'none',
                            borderRadius: '6px',
                            color: '#FFFFFF',
                            fontSize: '13px',
                            fontWeight: '600',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                        }}>
                            📥 Export Report
                        </button>
                        <button style={{
                            width: '36px',
                            height: '36px',
                            background: '#FFFFFF',
                            border: '1px solid #E0E0E0',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            fontSize: '18px',
                        }}>
                            ⋯
                        </button>
                    </div>
                </div>

                {/* Metrics Cards */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(4, 1fr)',
                    gap: '16px',
                    marginBottom: '24px',
                }}>
                    {metrics.map((metric, idx) => (
                        <div
                            key={idx}
                            style={{
                                background: '#FFFFFF',
                                borderRadius: '12px',
                                padding: '20px',
                                boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                            }}
                        >
                            <div style={{
                                fontSize: '11px',
                                color: '#999999',
                                fontWeight: '700',
                                marginBottom: '12px',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                            }}>
                                <span>{metric.label}</span>
                                <span style={{ color: metric.positive ? '#28A745' : '#E31E24' }}>
                                    {metric.change}
                                </span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
                                <span style={{ fontSize: '36px', fontWeight: '700', color: '#1A1A1A' }}>
                                    {metric.value}
                                </span>
                                <span style={{ fontSize: '16px', color: '#666666' }}>
                                    {metric.unit}
                                </span>
                            </div>
                            <div style={{
                                width: '100%',
                                height: '4px',
                                background: COLORS.hpclRed,
                                borderRadius: '2px',
                                marginTop: '12px',
                            }} />
                        </div>
                    ))}
                </div>

                {/* Main Grid */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr 1fr',
                    gap: '20px',
                    marginBottom: '20px',
                }}>
                    {/* Conversion Funnel */}
                    <div style={{
                        background: '#FFFFFF',
                        borderRadius: '12px',
                        padding: '24px',
                        boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                    }}>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            marginBottom: '24px',
                        }}>
                            <span style={{ fontSize: '18px' }}>📊</span>
                            <span style={{ fontSize: '15px', fontWeight: '700', color: '#1A1A1A' }}>
                                Conversion Funnel
                            </span>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            {funnelStages.map((stage, idx) => (
                                <div key={idx}>
                                    <div style={{
                                        fontSize: '11px',
                                        color: '#999999',
                                        fontWeight: '600',
                                        marginBottom: '6px',
                                    }}>
                                        {stage.label}
                                    </div>
                                    <div style={{
                                        fontSize: '20px',
                                        fontWeight: '700',
                                        color: '#1A1A1A',
                                        marginBottom: '8px',
                                    }}>
                                        {stage.value}
                                    </div>
                                    <div style={{
                                        width: `${stage.width}%`,
                                        height: '24px',
                                        background: idx === 3 ? '#C62828' : idx === 2 ? '#E57373' : idx === 1 ? '#FFCDD2' : '#F5F5F5',
                                        borderRadius: '4px',
                                    }} />
                                </div>
                            ))}
                            <div style={{
                                marginTop: '8px',
                                paddingTop: '16px',
                                borderTop: '1px solid #F0F0F0',
                            }}>
                                <div style={{ fontSize: '12px', color: '#666666', marginBottom: '4px' }}>
                                    Overall Efficiency
                                </div>
                                <div style={{
                                    fontSize: '24px',
                                    fontWeight: '700',
                                    color: '#C62828',
                                }}>
                                    68%
                                </div>
                                <div style={{
                                    width: '100%',
                                    height: '6px',
                                    background: '#F5F5F5',
                                    borderRadius: '3px',
                                    marginTop: '8px',
                                    overflow: 'hidden',
                                }}>
                                    <div style={{
                                        width: '68%',
                                        height: '100%',
                                        background: '#C62828',
                                    }} />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Leads per Sales Officer */}
                    <div style={{
                        background: '#FFFFFF',
                        borderRadius: '12px',
                        padding: '24px',
                        boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                    }}>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            marginBottom: '24px',
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <span style={{ fontSize: '18px' }}>👥</span>
                                <span style={{ fontSize: '15px', fontWeight: '700', color: '#1A1A1A' }}>
                                    Leads per Sales Officer
                                </span>
                            </div>
                            <span style={{ fontSize: '11px', color: '#999999', fontWeight: '600' }}>
                                Top 5 Performers
                            </span>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            {salesOfficers.map((officer, idx) => (
                                <div key={idx}>
                                    <div style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        marginBottom: '6px',
                                    }}>
                                        <span style={{ fontSize: '13px', fontWeight: '600', color: '#1A1A1A' }}>
                                            {officer.name}
                                        </span>
                                        <span style={{ fontSize: '13px', fontWeight: '700', color: '#1A1A1A' }}>
                                            {officer.leads}
                                        </span>
                                    </div>
                                    <div style={{
                                        width: '100%',
                                        height: '12px',
                                        background: '#F5F5F5',
                                        borderRadius: '6px',
                                        overflow: 'hidden',
                                    }}>
                                        <div style={{
                                            width: `${officer.percentage}%`,
                                            height: '100%',
                                            background: idx === 0 ? '#C62828' : idx === 1 ? '#D32F2F' : `rgba(198, 40, 40, ${0.7 - idx * 0.1})`,
                                            transition: 'width 0.3s',
                                        }} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Sector Breakdown */}
                    <div style={{
                        background: '#FFFFFF',
                        borderRadius: '12px',
                        padding: '24px',
                        boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                    }}>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            marginBottom: '24px',
                        }}>
                            <span style={{ fontSize: '18px' }}>🏢</span>
                            <span style={{ fontSize: '15px', fontWeight: '700', color: '#1A1A1A' }}>
                                Sector Breakdown
                            </span>
                        </div>

                        <div style={{
                            display: 'flex',
                            justifyContent: 'center',
                            marginBottom: '24px',
                        }}>
                            <div style={{
                                width: '160px',
                                height: '160px',
                                borderRadius: '50%',
                                background: `conic-gradient(
                  ${sectors[0].color} 0deg ${sectors[0].percentage * 3.6}deg,
                  ${sectors[1].color} ${sectors[0].percentage * 3.6}deg ${(sectors[0].percentage + sectors[1].percentage) * 3.6}deg,
                  ${sectors[2].color} ${(sectors[0].percentage + sectors[1].percentage) * 3.6}deg ${(sectors[0].percentage + sectors[1].percentage + sectors[2].percentage) * 3.6}deg,
                  ${sectors[3].color} ${(sectors[0].percentage + sectors[1].percentage + sectors[2].percentage) * 3.6}deg 360deg
                )`,
                                position: 'relative',
                            }}>
                                <div style={{
                                    position: 'absolute',
                                    top: '50%',
                                    left: '50%',
                                    transform: 'translate(-50%, -50%)',
                                    width: '100px',
                                    height: '100px',
                                    borderRadius: '50%',
                                    background: '#FFFFFF',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}>
                                    <div style={{ fontSize: '28px', fontWeight: '700', color: '#1A1A1A' }}>
                                        100%
                                    </div>
                                    <div style={{ fontSize: '11px', color: '#999999', fontWeight: '600' }}>
                                        TOTAL SALES
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            {sectors.map((sector, idx) => (
                                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <div style={{
                                        width: '12px',
                                        height: '12px',
                                        borderRadius: '50%',
                                        background: sector.color,
                                    }} />
                                    <span style={{ fontSize: '13px', color: '#666666', flex: 1 }}>
                                        {sector.name}
                                    </span>
                                    <span style={{ fontSize: '13px', fontWeight: '700', color: '#1A1A1A' }}>
                                        {sector.percentage}%
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Bottom Grid */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1.5fr 1fr',
                    gap: '20px',
                }}>
                    {/* District Sales Intensity */}
                    <div style={{
                        background: '#FFFFFF',
                        borderRadius: '12px',
                        padding: '24px',
                        boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                    }}>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            marginBottom: '24px',
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <span style={{ fontSize: '18px' }}>📍</span>
                                <span style={{ fontSize: '15px', fontWeight: '700', color: '#1A1A1A' }}>
                                    District Sales Intensity
                                </span>
                            </div>
                            <div style={{ display: 'flex', gap: '12px', fontSize: '11px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                    <div style={{ width: '12px', height: '12px', background: '#FFCDD2', borderRadius: '2px' }} />
                                    <span style={{ color: '#999999' }}>LOW</span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                    <div style={{ width: '12px', height: '12px', background: '#E57373', borderRadius: '2px' }} />
                                    <span style={{ color: '#999999' }}>MID</span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                    <div style={{ width: '12px', height: '12px', background: '#C62828', borderRadius: '2px' }} />
                                    <span style={{ color: '#999999' }}>HIGH</span>
                                </div>
                            </div>
                        </div>

                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(3, 1fr)',
                            gap: '12px',
                        }}>
                            {districts.map((district, idx) => (
                                <div
                                    key={idx}
                                    style={{
                                        padding: '32px 20px',
                                        background: getIntensityColor(district.intensity),
                                        borderRadius: '8px',
                                        textAlign: 'center',
                                        color: district.intensity === 'HIGH' ? '#FFFFFF' : '#1A1A1A',
                                        fontSize: '14px',
                                        fontWeight: '600',
                                    }}
                                >
                                    {district.name}
                                </div>
                            ))}
                        </div>

                        <div style={{
                            marginTop: '20px',
                            padding: '16px',
                            background: '#F8F9FA',
                            borderRadius: '8px',
                        }}>
                            <div style={{ fontSize: '12px', fontWeight: '700', color: '#1A1A1A', marginBottom: '4px' }}>
                                TOP PERFORMING DISTRICT
                            </div>
                            <div style={{
                                fontSize: '20px', fontWeight: '700', color: COLORS.hpclRed
                            }}>
                                Pune Metro Zone
                            </div>
                            <div style={{ fontSize: '13px', color: '#666666' }}>
                                ₹12.3 Cr Volume
                            </div>
                        </div>
                    </div>

                    {/* Top Products */}
                    <div style={{
                        background: '#FFFFFF',
                        borderRadius: '12px',
                        padding: '24px',
                        boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                    }}>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            marginBottom: '24px',
                        }}>
                            <span style={{ fontSize: '18px' }}>📦</span>
                            <span style={{ fontSize: '15px', fontWeight: '700', color: '#1A1A1A' }}>
                                Top Products
                            </span>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '20px' }}>
                            {topProducts.map((product, idx) => (
                                <div
                                    key={idx}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '12px',
                                        paddingBottom: '16px',
                                        borderBottom: idx < topProducts.length - 1 ? '1px solid #F5F5F5' : 'none',
                                    }}
                                >
                                    <div style={{
                                        width: '40px',
                                        height: '40px',
                                        background: '#FFE5E6',
                                        borderRadius: '8px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: '18px',
                                    }}>
                                        ⛽
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <div style={{ fontSize: '14px', fontWeight: '700', color: '#1A1A1A' }}>
                                            {product.name}
                                        </div>
                                        <div style={{ fontSize: '12px', color: '#999999' }}>
                                            {product.category}
                                        </div>
                                    </div>
                                    <div style={{ textAlign: 'right' }}>
                                        <div style={{ fontSize: '14px', fontWeight: '700', color: '#1A1A1A' }}>
                                            {product.value}
                                        </div>
                                        <div style={{
                                            fontSize: '11px',
                                            color: product.change.startsWith('+') ? '#28A745' : '#E31E24',
                                            fontWeight: '600',
                                        }}>
                                            {product.change}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <button style={{
                            width: '100%',
                            padding: '10px',
                            background: 'transparent',
                            border: '1px solid #E0E0E0',
                            borderRadius: '6px',
                            fontSize: '13px',
                            fontWeight: '600',
                            color: COLORS.hpclBlue,
                            cursor: 'pointer',
                        }}>
                            VIEW FULL INVENTORY →
                        </button>
                    </div>
                </div>

                {/* Footer */}
                <div style={{
                    marginTop: '24px',
                    padding: '16px 0',
                    fontSize: '11px',
                    color: '#999999',
                    display: 'flex',
                    justifyContent: 'space-between',
                }}>
                    <span>Data last updated: 14 Oct 2023, 10:45 AM IST</span>
                    <div style={{ display: 'flex', gap: '20px' }}>
                        <span>SYSTEM STATUS: OPTIMAL</span>
                        <span>DATA GOVERNANCE</span>
                    </div>
                </div>
            </div>
        </div >
    );
}
