'use client';

import { useState, useEffect } from 'react';
import { COLORS } from '../../../styles/theme';
import api from '../../../services/api';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
    LineChart, Line, AreaChart, Area, PieChart, Pie, Cell
} from 'recharts';

// --- Icons ---
const RevenueIcon = ({ color, opacity = 1 }) => (
    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ opacity }}>
        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
);

const PipelineIcon = ({ color, opacity = 1 }) => (
    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ opacity }}>
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
    </svg>
);

const TrendIcon = ({ color }) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
        <polyline points="17 6 23 6 23 12" />
    </svg>
);

export default function ExecutiveDashboard() {
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState(null);
    const [topProducts, setTopProducts] = useState([]);
    const [geoData, setGeoData] = useState([]);
    const [funnelData, setFunnelData] = useState([]);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            setLoading(true);
            const [dashboardStats, products, geography, funnel] = await Promise.all([
                api.getDashboardStats(),
                api.getTopProducts(5),
                api.getGeographyBreakdown(),
                api.getConversionFunnel()
            ]);

            setStats(dashboardStats);
            setTopProducts(products.products || []);
            setGeoData(geography.states || []);

            // Format Funnel for Chart
            const funnelStages = funnel.stages || [
                { name: 'New', count: dashboardStats.new },
                { name: 'Contacted', count: dashboardStats.contacted },
                { name: 'Qualified', count: dashboardStats.qualified },
                { name: 'Won', count: dashboardStats.won }
            ];
            setFunnelData(funnelStages);

        } catch (error) {
            console.error('Failed to load executive data:', error);
        } finally {
            setLoading(false);
        }
    };

    // Derived Metrics
    const metrics = stats ? {
        revenue: { value: `₹${(stats.revenue / 100000).toFixed(1)}L`, label: 'Total Revenue', change: '+12.5%', isPositive: true },
        pipeline: { value: `₹${(stats.pipeline_value / 100000).toFixed(1)}L`, label: 'Pipeline Value', change: '+5.2%', isPositive: true },
        conversion: { value: `${stats.conversionRate}%`, label: 'Conversion Rate', change: '-1.2%', isPositive: false },
        deals: { value: stats.won, label: 'Deals Won', change: '+8%', isPositive: true }
    } : null;

    // Mock Monthly Trend Data (Since we don't have historicals yet)
    const trendData = [
        { name: 'Jan', revenue: 4200000, pipeline: 6500000 },
        { name: 'Feb', revenue: 3800000, pipeline: 5800000 },
        { name: 'Mar', revenue: 5100000, pipeline: 7200000 },
        { name: 'Apr', revenue: 4800000, pipeline: 6900000 },
        { name: 'May', revenue: 6200000, pipeline: 8500000 },
        { name: 'Jun', revenue: stats?.revenue || 6800000, pipeline: stats?.pipeline_value || 9000000 },
    ];

    if (loading) {
        return (
            <div style={{ padding: '60px', textAlign: 'center', color: '#666', fontSize: '18px' }}>
                Loading Executive Insights...
            </div>
        );
    }

    if (!stats) return null;

    return (
        <div style={{ padding: '32px', maxWidth: '1600px', margin: '0 auto' }}>
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '32px' }}>
                <div>
                    <h1 style={{ fontSize: '32px', fontWeight: '800', color: 'rgb(0, 0, 0)', marginBottom: '8px', letterSpacing: '-0.5px' }}>
                        Executive Overview
                    </h1>
                    <p style={{ fontSize: '15px', color: '#666', fontWeight: '500' }}>
                        National Sales Performance & Financial Insights
                    </p>
                </div>
                <div style={{ display: 'flex', gap: '12px' }}>
                    <button style={{ padding: '10px 20px', background: '#FFF', border: '1px solid #E0E0E0', borderRadius: '8px', fontWeight: '600', color: '#444', cursor: 'pointer' }}>
                        Download Report
                    </button>
                    <button style={{ padding: '10px 20px', background: 'rgb(0, 91, 172)', border: 'none', borderRadius: '8px', fontWeight: '600', color: '#FFF', cursor: 'pointer' }}>
                        Live View
                    </button>
                </div>
            </div>

            {/* KPI Cards Row */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px', marginBottom: '32px' }}>
                {/* Revenue */}
                <div style={{ background: '#FFF', padding: '24px', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.04)', position: 'relative', overflow: 'hidden' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                        <div>
                            <div style={{ fontSize: '13px', fontWeight: '700', color: '#888', textTransform: 'uppercase', marginBottom: '8px' }}>{metrics.revenue.label}</div>
                            <div style={{ fontSize: '36px', fontWeight: '800', color: 'rgb(0, 0, 0)', letterSpacing: '-1px' }}>{metrics.revenue.value}</div>
                            <div style={{ fontSize: '13px', fontWeight: '600', color: metrics.revenue.isPositive ? '#28A745' : '#E31E24', marginTop: '8px' }}>
                                {metrics.revenue.change} <span style={{ color: '#CCC', fontWeight: '400' }}>vs last month</span>
                            </div>
                        </div>
                        <RevenueIcon color="rgb(0, 91, 172)" opacity={0.1} />
                    </div>
                </div>

                {/* Pipeline */}
                <div style={{ background: '#FFF', padding: '24px', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.04)', position: 'relative', overflow: 'hidden' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                        <div>
                            <div style={{ fontSize: '13px', fontWeight: '700', color: '#888', textTransform: 'uppercase', marginBottom: '8px' }}>{metrics.pipeline.label}</div>
                            <div style={{ fontSize: '36px', fontWeight: '800', color: 'rgb(0, 0, 0)', letterSpacing: '-1px' }}>{metrics.pipeline.value}</div>
                            <div style={{ fontSize: '13px', fontWeight: '600', color: metrics.pipeline.isPositive ? '#28A745' : '#E31E24', marginTop: '8px' }}>
                                {metrics.pipeline.change} <span style={{ color: '#CCC', fontWeight: '400' }}>vs last month</span>
                            </div>
                        </div>
                        <PipelineIcon color="#005BAC" opacity={0.1} />
                    </div>
                </div>

                {/* Conversion */}
                <div style={{ background: '#FFF', padding: '24px', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.04)', position: 'relative', overflow: 'hidden' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                        <div>
                            <div style={{ fontSize: '13px', fontWeight: '700', color: '#888', textTransform: 'uppercase', marginBottom: '8px' }}>{metrics.conversion.label}</div>
                            <div style={{ fontSize: '36px', fontWeight: '800', color: 'rgb(0, 0, 0)', letterSpacing: '-1px' }}>{metrics.conversion.value}</div>
                            <div style={{ fontSize: '13px', fontWeight: '600', color: metrics.conversion.isPositive ? '#28A745' : '#E31E24', marginTop: '8px' }}>
                                {metrics.conversion.change} <span style={{ color: '#CCC', fontWeight: '400' }}>vs last month</span>
                            </div>
                        </div>
                        <div style={{ width: '60px', height: '60px', borderRadius: '50%', border: `4px solid ${metrics.conversion.isPositive ? '#28A745' : '#E31E24'}`, opacity: 0.2 }}></div>
                    </div>
                </div>

                {/* Deals */}
                <div style={{ background: '#FFF', padding: '24px', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.04)', position: 'relative', overflow: 'hidden' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                        <div>
                            <div style={{ fontSize: '13px', fontWeight: '700', color: '#888', textTransform: 'uppercase', marginBottom: '8px' }}>{metrics.deals.label}</div>
                            <div style={{ fontSize: '36px', fontWeight: '800', color: 'rgb(0, 0, 0)', letterSpacing: '-1px' }}>{metrics.deals.value}</div>
                            <div style={{ fontSize: '13px', fontWeight: '600', color: metrics.deals.isPositive ? '#28A745' : '#E31E24', marginTop: '8px' }}>
                                {metrics.deals.change} <span style={{ color: '#CCC', fontWeight: '400' }}>vs last month</span>
                            </div>
                        </div>
                        <div style={{ width: '64px', height: '64px', background: '#F5F5F5', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <span style={{ fontSize: '24px' }}>🤝</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Charts Section */}
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '32px', marginBottom: '32px' }}>
                {/* Revenue Trend */}
                <div style={{ background: '#FFF', padding: '32px', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.04)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
                        <h3 style={{ fontSize: '18px', fontWeight: '700', color: 'rgb(0, 91, 172)' }}>Revenue & Pipeline Trend</h3>
                        <div style={{ display: 'flex', gap: '16px', fontSize: '13px', fontWeight: '600' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><div style={{ width: 10, height: 10, background: 'rgb(0, 91, 172)', borderRadius: '2px' }}></div> Revenue</div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><div style={{ width: 10, height: 10, background: '#E3E3E3', borderRadius: '2px' }}></div> Pipeline</div>
                        </div>
                    </div>
                    <div style={{ height: '300px' }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={trendData}>
                                <defs>
                                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="rgb(0, 91, 172)" stopOpacity={0.1} />
                                        <stop offset="95%" stopColor="rgb(0, 91, 172)" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#EEE" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#999' }} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#999' }} tickFormatter={(val) => `₹${val / 100000}L`} />
                                <Tooltip
                                    contentStyle={{ background: 'rgb(0, 91, 172)', border: 'none', borderRadius: '8px', color: '#FFF' }}
                                    itemStyle={{ color: '#FFF' }}
                                    formatter={(val) => [`₹${(val / 100000).toFixed(1)}L`, '']}
                                />
                                <Area type="monotone" dataKey="revenue" stroke="rgb(0, 91, 172)" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
                                <Area type="monotone" dataKey="pipeline" stroke="#E3E3E3" strokeWidth={3} fill="transparent" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Regional Performance */}
                <div style={{ background: '#FFF', padding: '32px', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.04)' }}>
                    <h3 style={{ fontSize: '18px', fontWeight: '700', color: 'rgb(0, 91, 172)', marginBottom: '24px' }}>Top Performing Regions</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        {geoData.slice(0, 5).map((region, idx) => (
                            <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                                <div style={{ width: '24px', fontSize: '14px', fontWeight: '700', color: '#CCC' }}>0{idx + 1}</div>
                                <div style={{ flex: 1 }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                                        <span style={{ fontSize: '14px', fontWeight: '600', color: 'rgb(0, 91, 172)' }}>{region.state}</span>
                                        <span style={{ fontSize: '14px', fontWeight: '700', color: 'rgb(0, 91, 172)' }}>{region.count} Leads</span>
                                    </div>
                                    <div style={{ height: '6px', background: '#F5F5F5', borderRadius: '3px', overflow: 'hidden' }}>
                                        <div style={{
                                            width: `${(region.count / (geoData[0]?.count || 1)) * 100}%`,
                                            height: '100%',
                                            background: idx === 0 ? 'rgb(0, 91, 172)' : '#AAA',
                                            borderRadius: '3px'
                                        }}></div>
                                    </div>
                                </div>
                            </div>
                        ))}
                        {geoData.length === 0 && <div style={{ color: '#999' }}>No regional data available yet.</div>}
                    </div>
                </div>
            </div>

            {/* Bottom Row */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>

                {/* Top Products */}
                <div style={{ background: '#FFF', padding: '32px', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.04)' }}>
                    <h3 style={{ fontSize: '18px', fontWeight: '700', color: 'rgb(0, 91, 172)', marginBottom: '24px' }}>Product Category Distribution</h3>
                    <div style={{ height: '250px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={topProducts}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    paddingAngle={5}
                                    dataKey="count"
                                >
                                    {topProducts.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS.hpclBlue} opacity={1 - (index * 0.15)} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend layout="vertical" verticalAlign="middle" align="right" />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Conversion Funnel */}
                <div style={{ background: '#FFF', padding: '32px', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.04)' }}>
                    <h3 style={{ fontSize: '18px', fontWeight: '700', color: 'rgb(0, 91, 172)', marginBottom: '24px' }}>Conversion Funnel Efficiency</h3>
                    <div style={{ height: '250px' }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={funnelData} layout="vertical" margin={{ left: 20 }}>
                                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#EEE" />
                                <XAxis type="number" hide />
                                <YAxis dataKey="name" type="category" tick={{ fontSize: 13, fontWeight: 600, fill: '#444' }} width={80} />
                                <Tooltip />
                                <Bar dataKey="count" fill="rgb(0, 91, 172)" radius={[0, 4, 4, 0]} barSize={32}>
                                    {funnelData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.name === 'Won' ? '#28A745' : 'rgb(0, 91, 172)'} opacity={entry.name === 'Won' ? 1 : 0.2 + (index * 0.2)} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
}
