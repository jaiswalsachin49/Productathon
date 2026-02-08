'use client';

import { useState } from 'react';
import {
    Calendar,
    Clock,
    Phone,
    MapPin,
    MoreHorizontal,
    CheckCircle,
    AlertCircle,
    ArrowRight
} from '../../../components/Icons';
import { COLORS } from '../../../styles/theme';

export default function FollowUpsPage() {
    const [activeTab, setActiveTab] = useState('Today');

    // Mock data for hackathon demo
    const tasks = [
        {
            id: 1,
            company: 'Reliance Industries',
            contact: 'Arjun Sharma • Manager',
            time: '10:30 AM',
            type: 'CALL',
            priority: 'HIGH',
            status: 'PENDING',
            date: 'Today'
        },
        {
            id: 2,
            company: 'Tata Steel Ltd.',
            contact: 'Priya Singh • Procurement Head',
            time: '02:15 PM',
            type: 'VISIT',
            priority: 'MEDIUM',
            status: 'PENDING',
            date: 'Today'
        },
        {
            id: 3,
            company: 'L&T Construction',
            contact: 'Vikram Rao • Logistics Lead',
            time: 'Overdue • 1 Day',
            type: 'CALL',
            priority: 'CRITICAL',
            status: 'OVERDUE',
            date: 'Overdue'
        },
        {
            id: 4,
            company: 'Adani Port',
            contact: 'Deepak Verma • Operation Officer',
            time: '09:00 AM',
            type: 'VISIT',
            priority: 'LOW',
            status: 'UPCOMING',
            date: 'Upcoming' // Tomorrow
        }
    ];

    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'HIGH': return { bg: '#FFEBEE', text: '#C62828' };
            case 'CRITICAL': return { bg: '#FFEBEE', text: '#D32F2F' };
            case 'MEDIUM': return { bg: '#E3F2FD', text: '#1565C0' };
            case 'LOW': return { bg: '#F5F5F5', text: '#616161' };
            default: return { bg: '#F5F5F5', text: '#616161' };
        }
    };

    const getTypeIcon = (type) => {
        return type === 'CALL' ? Phone : MapPin;
    };

    const filteredTasks = tasks.filter(task => {
        if (activeTab === 'Today') return task.date === 'Today';
        if (activeTab === 'Upcoming') return task.date === 'Upcoming';
        if (activeTab === 'Overdue') return task.date === 'Overdue';
        return true;
    });

    return (
        <div>
            <div style={{ marginBottom: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#1A1A1A' }}>Follow-Up Management</h1>
                    <p style={{ color: '#666', marginTop: '4px' }}>Manage your client relationships and scheduled interactions</p>
                </div>
                <button
                    onClick={() => alert("New Task modal will open here")}
                    style={{
                        background: COLORS.hpclBlue,
                        color: 'white',
                        border: 'none',
                        padding: '12px 24px',
                        // ... (rest of style)
                        borderRadius: '8px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                    }}>
                    <Calendar size={18} /> New Follow-up
                </button>
            </div>

            {/* Tabs */}
            <div style={{ display: 'flex', gap: '32px', borderBottom: '1px solid #E0E0E0', marginBottom: '24px' }}>
                {['Today', 'Upcoming', 'Overdue'].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        style={{
                            padding: '12px 4px',
                            background: 'none',
                            border: 'none',
                            borderBottom: activeTab === tab ? `2px solid ${COLORS.hpclBlue}` : '2px solid transparent',
                            color: activeTab === tab ? COLORS.hpclBlue : '#666',
                            fontWeight: activeTab === tab ? '600' : '500',
                            fontSize: '14px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px'
                        }}
                    >
                        {tab}
                        <span style={{
                            background: activeTab === tab ? COLORS.hpclBlue : '#E0E0E0',
                            color: activeTab === tab ? 'white' : '#666',
                            fontSize: '11px',
                            padding: '2px 8px',
                            borderRadius: '12px',
                        }}>
                            {tasks.filter(t => t.date === tab).length}
                        </span>
                    </button>
                ))}
            </div>

            {/* Task List */}
            <div style={{
                background: 'white',
                borderRadius: '12px',
                border: '1px solid #E0E0E0',
                overflow: 'hidden'
            }}>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: '2fr 1.5fr 1fr 1fr 1fr',
                    padding: '16px 24px',
                    background: '#F9FAFB',
                    borderBottom: '1px solid #E0E0E0',
                    fontSize: '12px',
                    fontWeight: '600',
                    color: '#666',
                    textTransform: 'uppercase'
                }}>
                    <div>Company & Contact</div>
                    <div>Scheduled Time</div>
                    <div>Priority</div>
                    <div>Action Type</div>
                    <div>Quick Actions</div>
                </div>

                {filteredTasks.length > 0 ? (
                    filteredTasks.map((task) => {
                        const priorityStyle = getPriorityColor(task.priority);
                        const TypeIcon = getTypeIcon(task.type);

                        return (
                            <div key={task.id} style={{
                                display: 'grid',
                                gridTemplateColumns: '2fr 1.5fr 1fr 1fr 1fr',
                                padding: '20px 24px',
                                borderBottom: '1px solid #F0F0F0',
                                alignItems: 'center',
                                fontSize: '14px',
                                color: '#333',
                                background: task.status === 'OVERDUE' ? '#FFF8F8' : 'white'
                            }}>
                                <div>
                                    <div style={{ fontWeight: '600', color: '#1A1A1A' }}>{task.company}</div>
                                    <div style={{ fontSize: '12px', color: '#888', marginTop: '2px' }}>{task.contact}</div>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: task.status === 'OVERDUE' ? '#D32F2F' : '#555', fontWeight: task.status === 'OVERDUE' ? '600' : '400' }}>
                                    {task.status === 'OVERDUE' ? <AlertCircle size={16} /> : <Clock size={16} />}
                                    {task.time}
                                </div>
                                <div>
                                    <span style={{
                                        background: priorityStyle.bg,
                                        color: priorityStyle.text,
                                        padding: '4px 8px',
                                        borderRadius: '4px',
                                        fontSize: '11px',
                                        fontWeight: '700'
                                    }}>
                                        {task.priority}
                                    </span>
                                </div>
                                <div>
                                    <div style={{
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: '6px',
                                        background: '#F5F7FA',
                                        padding: '6px 12px',
                                        borderRadius: '6px',
                                        fontSize: '12px',
                                        fontWeight: '600',
                                        color: '#555'
                                    }}>
                                        <TypeIcon size={14} /> {task.type}
                                    </div>
                                </div>
                                <div style={{ display: 'flex', gap: '12px' }}>
                                    <button
                                        onClick={() => alert(`Marked ${task.company} task as complete`)}
                                        style={{
                                            border: '1px solid #E0E0E0',
                                            background: 'white',
                                            width: '32px',
                                            height: '32px',
                                            borderRadius: '6px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            color: '#666',
                                            cursor: 'pointer'
                                        }} title="Mark Complete">
                                        <CheckCircle size={16} />
                                    </button>
                                    <button
                                        onClick={() => alert(`Rescheduling task for ${task.company}`)}
                                        style={{
                                            border: '1px solid #E0E0E0',
                                            background: 'white',
                                            width: '32px',
                                            height: '32px',
                                            borderRadius: '6px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            color: '#666',
                                            cursor: 'pointer'
                                        }} title="Reschedule">
                                        <Calendar size={16} />
                                    </button>
                                    <button
                                        onClick={() => alert(`Viewing details for ${task.company}`)}
                                        style={{
                                            border: '1px solid #E0E0E0',
                                            background: 'white',
                                            width: '32px',
                                            height: '32px',
                                            borderRadius: '6px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            color: '#666',
                                            cursor: 'pointer'
                                        }} title="View Details">
                                        <ArrowRight size={16} />
                                    </button>
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <div style={{ padding: '60px', textAlign: 'center', color: '#666' }}>
                        No follow-ups scheduled for this period.
                    </div>
                )}
            </div>
        </div>
    );
}
