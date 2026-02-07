import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, TextInput, Alert, ActivityIndicator } from 'react-native';
import * as Linking from 'expo-linking';
import { COLORS, SPACING, FONTS } from '../constants/theme';
import { storageService } from '../services/storage';

const ActionButton = ({ title, icon, color, onPress }) => (
    <TouchableOpacity
        style={[styles.actionButton, { backgroundColor: color || COLORS.primary }]}
        onPress={onPress}
    >
        <Text style={styles.actionButtonText}>{title}</Text>
    </TouchableOpacity>
);

const LeadDetailsScreen = ({ route, navigation }) => {
    const { leadId } = route.params;
    const [lead, setLead] = useState(null);
    const [note, setNote] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadLead();
    }, [leadId]);

    const loadLead = async () => {
        const leads = await storageService.getLeads();
        const found = leads.find(l => l.id === leadId);
        setLead(found);
        setLoading(false);
    };

    const handleStatusChange = async (newStatus) => {
        await storageService.updateLeadStatus(leadId, newStatus);
        loadLead();
        Alert.alert('Success', `Lead marked as ${newStatus}`);
    };

    const handleAddNote = async () => {
        if (!note.trim()) return;
        await storageService.addNote(leadId, note);
        setNote('');
        loadLead();
    };

    const openMap = () => {
        const query = encodeURIComponent(lead.location);
        Linking.openURL(`https://www.google.com/maps/search/?api=1&query=${query}`);
    };

    if (loading || !lead) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={COLORS.primary} />
            </View>
        );
    }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.companyName}>{lead.companyName}</Text>
                <Text style={styles.industry}>{lead.industry} • {lead.location}</Text>
                <View style={[styles.statusBadge, {
                    backgroundColor: lead.status === 'Converted' ? COLORS.success :
                        lead.status === 'Rejected' ? COLORS.danger : COLORS.warning
                }]}>
                    <Text style={styles.statusText}>{lead.status}</Text>
                </View>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Why this Lead?</Text>
                {lead.explainability ? (
                    lead.explainability.map((item, index) => (
                        <View key={index} style={styles.bulletItem}>
                            <Text style={styles.bulletPoint}>•</Text>
                            <Text style={styles.bulletText}>{item}</Text>
                        </View>
                    ))
                ) : (
                    <Text style={styles.placeholderText}>AI analysis pending...</Text>
                )}
            </View>

            {lead.requirements && (
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Requirements</Text>
                    <View style={styles.reqRow}>
                        <Text style={styles.reqLabel}>Volume:</Text>
                        <Text style={styles.reqValue}>{lead.requirements.volume}</Text>
                    </View>
                    <View style={styles.reqRow}>
                        <Text style={styles.reqLabel}>Frequency:</Text>
                        <Text style={styles.reqValue}>{lead.requirements.frequency}</Text>
                    </View>
                    <View style={styles.reqRow}>
                        <Text style={styles.reqLabel}>Tankage:</Text>
                        <Text style={styles.reqValue}>{lead.requirements.tankage}</Text>
                    </View>
                </View>
            )}

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Lead Dossier</Text>
                <Text style={styles.summary}>{lead.summary}</Text>

                <Text style={styles.subTitle}>Inferred Products</Text>
                <View style={styles.tags}>
                    {lead.products.map((p, i) => (
                        <View key={i} style={styles.tag}><Text style={styles.tagText}>{p}</Text></View>
                    ))}
                </View>

                <Text style={styles.subTitle}>Signals</Text>
                {lead.signals.map((s, i) => (
                    <View key={i} style={styles.signal}>
                        <Text style={styles.signalType}>{s.type}</Text>
                        <Text style={styles.signalText}>{s.text}</Text>
                    </View>
                ))}
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Contact & Actions</Text>
                <Text style={styles.contactName}>{lead.contact.name}</Text>
                <Text style={styles.contactRole}>{lead.contact.role}</Text>

                <View style={styles.actionsRow}>
                    <ActionButton title="Call" onPress={() => Linking.openURL(`tel:${lead.contact.phone}`)} />
                    <ActionButton title="Email" onPress={() => Linking.openURL(`mailto:${lead.contact.email}`)} />
                    <ActionButton title="Map" color={COLORS.secondary} onPress={openMap} />
                </View>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Feedback Loop</Text>
                <View style={styles.statusActions}>
                    {lead.status === 'New' && (
                        <TouchableOpacity style={styles.statusBtn} onPress={() => handleStatusChange('Accepted')}>
                            <Text style={styles.statusBtnText}>Accept Lead</Text>
                        </TouchableOpacity>
                    )}
                    {lead.status === 'Accepted' && (
                        <>
                            <TouchableOpacity style={[styles.statusBtn, { backgroundColor: COLORS.success }]} onPress={() => handleStatusChange('Converted')}>
                                <Text style={styles.statusBtnText}>Mark Converted</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.statusBtn, { backgroundColor: COLORS.danger }]} onPress={() => handleStatusChange('Rejected')}>
                                <Text style={styles.statusBtnText}>Reject</Text>
                            </TouchableOpacity>
                        </>
                    )}
                </View>

                <Text style={styles.subTitle}>Notes</Text>
                {lead.notes && lead.notes.map((n, i) => (
                    <View key={i} style={styles.noteItem}>
                        <Text style={styles.noteText}>{n.text}</Text>
                        <Text style={styles.noteDate}>{new Date(n.date).toLocaleDateString()}</Text>
                    </View>
                ))}

                <View style={styles.addNote}>
                    <TextInput
                        style={styles.input}
                        placeholder="Add a note..."
                        value={note}
                        onChangeText={setNote}
                    />
                    <TouchableOpacity style={styles.addBtn} onPress={handleAddNote}>
                        <Text style={styles.addBtnText}>Add</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        backgroundColor: COLORS.surface,
        padding: SPACING.l,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.border,
    },
    companyName: {
        fontSize: FONTS.h1,
        fontWeight: 'bold',
        color: COLORS.primary,
    },
    industry: {
        fontSize: FONTS.body,
        color: COLORS.textSecondary,
        marginBottom: SPACING.s,
    },
    statusBadge: {
        alignSelf: 'flex-start',
        paddingHorizontal: SPACING.m,
        paddingVertical: 4,
        borderRadius: 16,
    },
    statusText: {
        color: COLORS.surface,
        fontWeight: 'bold',
        fontSize: FONTS.small,
    },
    section: {
        backgroundColor: COLORS.surface,
        marginTop: SPACING.m,
        padding: SPACING.l,
    },
    sectionTitle: {
        fontSize: FONTS.h3,
        fontWeight: 'bold',
        color: COLORS.text,
        marginBottom: SPACING.m,
    },
    subTitle: {
        fontSize: FONTS.body,
        fontWeight: '600',
        marginTop: SPACING.m,
        marginBottom: SPACING.s,
        color: COLORS.textSecondary,
    },
    summary: {
        fontSize: FONTS.body,
        lineHeight: 22,
        color: COLORS.text,
    },
    tags: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    tag: {
        backgroundColor: '#e3f2fd',
        padding: SPACING.s,
        borderRadius: 8,
        marginRight: SPACING.s,
        marginBottom: SPACING.s,
    },
    tagText: {
        color: COLORS.primary,
        fontWeight: '500',
    },
    signal: {
        backgroundColor: COLORS.background,
        padding: SPACING.m,
        borderRadius: 8,
        marginBottom: SPACING.s,
    },
    signalType: {
        fontSize: FONTS.small,
        fontWeight: 'bold',
        color: COLORS.primary,
        marginBottom: 4,
    },
    signalText: {
        fontSize: FONTS.body,
        color: COLORS.text,
    },
    contactName: {
        fontSize: FONTS.h3,
        fontWeight: 'bold',
    },
    contactRole: {
        fontSize: FONTS.body,
        color: COLORS.textSecondary,
        marginBottom: SPACING.m,
    },
    actionsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    actionButton: {
        flex: 1,
        padding: SPACING.m,
        borderRadius: 8,
        alignItems: 'center',
        marginHorizontal: 4,
    },
    actionButtonText: {
        color: COLORS.surface,
        fontWeight: 'bold',
    },
    statusActions: {
        flexDirection: 'row',
        marginBottom: SPACING.l,
    },
    statusBtn: {
        backgroundColor: COLORS.primary,
        padding: SPACING.m,
        borderRadius: 8,
        flex: 1,
        alignItems: 'center',
        marginHorizontal: 4,
    },
    statusBtnText: {
        color: COLORS.surface,
        fontWeight: 'bold',
    },
    noteItem: {
        borderLeftWidth: 3,
        borderLeftColor: COLORS.border,
        paddingLeft: SPACING.s,
        marginBottom: SPACING.m,
    },
    noteText: {
        fontSize: FONTS.body,
        color: COLORS.text,
    },
    noteDate: {
        fontSize: FONTS.small,
        color: COLORS.textSecondary,
        marginTop: 4,
    },
    addNote: {
        flexDirection: 'row',
        marginTop: SPACING.s,
    },
    input: {
        flex: 1,
        backgroundColor: COLORS.background,
        padding: SPACING.s,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: COLORS.border,
        marginRight: SPACING.s,
    },
    bulletItem: {
        flexDirection: 'row',
        marginBottom: 4,
    },
    bulletPoint: {
        fontSize: FONTS.body,
        color: COLORS.primary,
        marginRight: 8,
        fontWeight: 'bold',
    },
    bulletText: {
        fontSize: FONTS.body,
        color: COLORS.text,
        flex: 1,
    },
    reqRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: SPACING.s,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.background,
    },
    reqLabel: {
        fontSize: FONTS.body,
        color: COLORS.textSecondary,
    },
    reqValue: {
        fontSize: FONTS.body,
        color: COLORS.text,
        fontWeight: 'bold',
    },
    placeholderText: {
        fontStyle: 'italic',
        color: COLORS.textSecondary,
    },
    addBtn: {
        backgroundColor: COLORS.secondary,
        padding: SPACING.s,
        borderRadius: 8,
        justifyContent: 'center',
        paddingHorizontal: SPACING.m,
    },
    addBtnText: {
        color: COLORS.surface,
        fontWeight: 'bold',
    },
});

export default LeadDetailsScreen;
