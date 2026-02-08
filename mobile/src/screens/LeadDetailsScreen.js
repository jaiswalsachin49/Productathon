import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Linking, Alert, ActivityIndicator } from 'react-native';
import { COLORS, SPACING, FONTS } from '../constants/theme';
import { apiService } from '../services/api';

const LeadDetailsScreen = ({ route, navigation }) => {
    const { leadId, lead: initialLead } = route.params || {};
    const [lead, setLead] = useState(initialLead || null);
    const [loading, setLoading] = useState(!initialLead);

    useEffect(() => {
        const fetchLead = async () => {
            if (leadId) {
                try {
                    const data = await apiService.getLeadDetails(leadId);
                    setLead(data);
                } catch (error) {
                    Alert.alert("Error", "Failed to load lead details.");
                    navigation.goBack();
                } finally {
                    setLoading(false);
                }
            }
        };

        if (!lead && leadId) {
            fetchLead();
        }
    }, [leadId]);

    const handleStatusUpdate = async (newStatus) => {
        try {
            if (lead) {
                // Optimistic update
                const updatedLead = { ...lead, status: newStatus };
                setLead(updatedLead);
                await apiService.updateLeadStatus(lead.id, newStatus);
                Alert.alert("Success", `Lead marked as ${newStatus}`);
            }
        } catch (error) {
            Alert.alert("Error", "Failed to update status");
            // Revert optimism if needed
        }
    };

    if (loading) {
        return (
            <View style={[styles.container, styles.center]}>
                <ActivityIndicator size="large" color={COLORS.primary} />
            </View>
        );
    }

    if (!lead) return null;

    const handleCall = () => {
        Linking.openURL(`tel:${lead.contact?.phone || ''}`);
    };

    const handleEmail = () => {
        Linking.openURL(`mailto:${lead.contact?.email || ''}`);
    };

    const handleMap = () => {
        const query = lead.companyName || lead.company?.name || lead.location;
        Linking.openURL(`https://www.google.com/maps/search/?api=1&query=${query}`);
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.companyName}>{lead.companyName || lead.company?.name}</Text>
                <Text style={styles.industry}>{(lead.industry || 'General') + ' • ' + (lead.location || 'Unknown')}</Text>
                <View style={[styles.statusBadge, {
                    backgroundColor: lead.status === 'Converted' ? COLORS.success :
                        lead.status === 'Rejected' ? COLORS.danger : COLORS.warning
                }]}>
                    <Text style={styles.statusText}>{lead.status}</Text>
                </View>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Why this Lead?</Text>
                {lead.ai_reasoning || lead.explainability ? (
                    // Handle both array (mock) and string/text (real) formats roughly
                    Array.isArray(lead.explainability) ?
                        lead.explainability.map((item, index) => (
                            <View key={index} style={styles.bulletItem}>
                                <Text style={styles.bulletPoint}>•</Text>
                                <Text style={styles.bulletText}>{item}</Text>
                            </View>
                        )) :
                        <Text style={styles.bulletText}>{lead.ai_reasoning || "High confidence match based on signals."}</Text>
                ) : (
                    <Text style={styles.placeholderText}>AI analysis details unavailable.</Text>
                )}
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Lead Dossier</Text>
                <Text style={styles.summary}>{lead.summary || lead.notes || "No additional notes."}</Text>

                <Text style={styles.subTitle}>Inferred Products</Text>
                <View style={styles.tags}>
                    {(lead.products || [lead.product?.name]).map((p, i) => (
                        p && <View key={i} style={styles.tag}><Text style={styles.tagText}>{p}</Text></View>
                    ))}
                </View>

                <Text style={styles.subTitle}>Signals</Text>
                {lead.signals ? lead.signals.map((s, i) => (
                    <View key={i} style={styles.signal}>
                        <Text style={styles.signalType}>{s.type}</Text>
                        <Text style={styles.signalText}>{s.text}</Text>
                    </View>
                )) : (
                    <View style={styles.signal}>
                        <Text style={styles.signalType}>{lead.signal?.type || 'Signal'}</Text>
                        <Text style={styles.signalText}>{lead.signal?.title || 'Lead generated from signal.'}</Text>
                    </View>
                )}
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Contact & Actions</Text>
                <View style={styles.contactRow}>
                    <View>
                        <Text style={styles.contactName}>{lead.contact?.name || 'Contact Person'}</Text>
                        <Text style={styles.contactRole}>{lead.contact?.role || 'Designation'}</Text>
                    </View>
                </View>

                <View style={styles.actionButtons}>
                    <TouchableOpacity style={styles.actionBtn} onPress={handleCall}>
                        <Text style={styles.actionBtnText}>Call</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.actionBtn} onPress={handleEmail}>
                        <Text style={styles.actionBtnText}>Email</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.actionBtn} onPress={handleMap}>
                        <Text style={styles.actionBtnText}>Map</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Update Status</Text>
                <View style={styles.statusButtons}>
                    <TouchableOpacity style={[styles.statusBtn, { backgroundColor: COLORS.success }]} onPress={() => handleStatusUpdate('Converted')}>
                        <Text style={styles.statusBtnText}>Convert</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.statusBtn, { backgroundColor: COLORS.danger }]} onPress={() => handleStatusUpdate('Rejected')}>
                        <Text style={styles.statusBtnText}>Reject</Text>
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
    center: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
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
        marginTop: SPACING.xs,
    },
    statusBadge: {
        alignSelf: 'flex-start',
        paddingHorizontal: SPACING.m,
        paddingVertical: 4,
        borderRadius: 12,
        marginTop: SPACING.m,
    },
    statusText: {
        color: COLORS.text,
        fontWeight: 'bold',
        fontSize: FONTS.small,
    },
    section: {
        backgroundColor: COLORS.surface,
        marginTop: SPACING.m,
        padding: SPACING.l,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: COLORS.border,
    },
    sectionTitle: {
        fontSize: FONTS.h3,
        fontWeight: 'bold',
        color: COLORS.text,
        marginBottom: SPACING.m,
    },
    subTitle: {
        fontSize: FONTS.body,
        fontWeight: 'bold',
        color: COLORS.textSecondary,
        marginTop: SPACING.m,
        marginBottom: SPACING.s,
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
        lineHeight: 20,
    },
    summary: {
        fontSize: FONTS.body,
        color: COLORS.text,
        lineHeight: 22,
    },
    tags: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    tag: {
        backgroundColor: '#e3f2fd',
        paddingHorizontal: SPACING.m,
        paddingVertical: 6,
        borderRadius: 16,
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
        textTransform: 'uppercase',
    },
    signalText: {
        fontSize: FONTS.body,
        color: COLORS.text,
    },
    placeholderText: {
        fontStyle: 'italic',
        color: COLORS.textSecondary,
    },
    contactRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: SPACING.l,
    },
    contactName: {
        fontSize: FONTS.h3,
        fontWeight: 'bold',
        color: COLORS.text,
    },
    contactRole: {
        fontSize: FONTS.body,
        color: COLORS.textSecondary,
    },
    actionButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    actionBtn: {
        flex: 1,
        marginHorizontal: SPACING.xs,
        backgroundColor: COLORS.background, // Light gray for actions
        borderWidth: 1,
        borderColor: COLORS.primary,
        padding: SPACING.m,
        borderRadius: 8,
        alignItems: 'center',
    },
    actionBtnText: {
        color: COLORS.primary,
        fontWeight: 'bold',
    },
    statusButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    statusBtn: {
        flex: 1,
        marginHorizontal: SPACING.xs,
        padding: SPACING.m,
        borderRadius: 8,
        alignItems: 'center',
    },
    statusBtnText: {
        color: COLORS.surface,
        fontWeight: 'bold',
        fontSize: FONTS.body,
    },
});

export default LeadDetailsScreen;
