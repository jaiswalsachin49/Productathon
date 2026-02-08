import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, RefreshControl, ActivityIndicator } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { COLORS, SPACING, FONTS } from '../constants/theme';
import { apiService } from '../services/api';

const LeadCard = ({ lead, onPress }) => {
    // Map backend status to display format
    const displayStatus = lead.status === 'NEW' ? 'New' :
        lead.status === 'CONVERTED' ? 'Converted' :
            lead.status === 'REJECTED' ? 'Rejected' : lead.status;

    return (
        <TouchableOpacity
            style={[
                styles.card,
                (lead.status === 'REJECTED' || lead.status === 'Rejected') && styles.rejectedCard
            ]}
            onPress={onPress}
        >
            <View style={styles.cardHeader}>
                <Text style={styles.companyName}>{lead.company_name || lead.company?.name || 'Unknown Company'}</Text>
                <View style={[
                    styles.badge,
                    {
                        backgroundColor: displayStatus === 'New' ? COLORS.warning :
                            (displayStatus === 'Rejected') ? COLORS.danger : COLORS.success
                    }
                ]}>
                    <Text style={styles.badgeText}>{displayStatus}</Text>
                </View>
            </View>

            {/* Show signal title as subtitle */}
            <Text style={styles.signalTitle} numberOfLines={1}>
                {lead.signal_context?.title || lead.signal_title || 'No signal data'}
            </Text>

            <Text style={styles.industry}>
                {(lead.company_industry || 'General')} • {(lead.company_city || lead.company_state || 'Unknown')}
            </Text>

            <View style={styles.scoreContainer}>
                <Text style={styles.scoreLabel}>Confidence Score</Text>
                <Text style={[styles.scoreValue, { color: (lead.confidence_score * 100) > 80 ? COLORS.success : COLORS.warning }]}>
                    {Math.round(lead.confidence_score * 100)}%
                </Text>
            </View>

            {/* Show AI reasoning as summary */}
            {lead.ai_reasoning && (
                <Text style={styles.summary} numberOfLines={2}>{lead.ai_reasoning}</Text>
            )}

            <View style={styles.productsContainer}>
                {lead.product_name && (
                    <View style={styles.productTag}>
                        <Text style={styles.productText}>{lead.product_name}</Text>
                    </View>
                )}
                {lead.notes && lead.notes.includes('Inferred Product') && (
                    <View style={styles.productTag}>
                        <Text style={styles.productText}>{lead.notes.split(': ')[1]}</Text>
                    </View>
                )}
            </View>
        </TouchableOpacity>
    );
};

const LeadsListScreen = ({ navigation }) => {
    const [leads, setLeads] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const [loading, setLoading] = useState(true);

    const loadLeads = async () => {
        try {
            const data = await apiService.getLeads();
            // Sort logic: New first, then by score
            const sorted = data.sort((a, b) => {
                if (a.status === 'New' && b.status !== 'New') return -1;
                if (a.status !== 'New' && b.status === 'New') return 1;
                const scoreA = a.matchScore || (a.confidence_score * 100);
                const scoreB = b.matchScore || (b.confidence_score * 100);
                return scoreB - scoreA;
            });
            setLeads(sorted);
        } catch (error) {
            console.error("Failed to load leads", error);
        } finally {
            setLoading(false);
        }
    };

    useFocusEffect(
        useCallback(() => {
            loadLeads();
        }, [])
    );

    const onRefresh = async () => {
        setRefreshing(true);
        await loadLeads();
        setRefreshing(false);
    };

    if (loading && !refreshing) {
        return (
            <View style={[styles.container, styles.center]}>
                <ActivityIndicator size="large" color={COLORS.primary} />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>HPCL Sales Connect</Text>
                <Text style={styles.headerSubtitle}>Sales Officer Dashboard</Text>
            </View>

            <FlatList
                data={leads}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => (
                    <LeadCard
                        lead={item}
                        onPress={() => navigation.navigate('LeadDetails', { leadId: item.id, lead: item })}
                    />
                )}
                contentContainerStyle={styles.listContent}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <Text style={styles.emptyText}>No leads assigned yet.</Text>
                    </View>
                }
            />
        </View>
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
        backgroundColor: COLORS.primary,
        padding: SPACING.l,
        paddingTop: SPACING.xl,
    },
    headerTitle: {
        fontSize: FONTS.h1,
        color: COLORS.surface,
        fontWeight: 'bold',
    },
    headerSubtitle: {
        fontSize: FONTS.body,
        color: '#rgba(255,255,255,0.8)',
        marginTop: SPACING.xs,
    },
    listContent: {
        padding: SPACING.m,
    },
    card: {
        backgroundColor: COLORS.surface,
        borderRadius: 12,
        padding: SPACING.m,
        marginBottom: SPACING.m,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    rejectedCard: {
        backgroundColor: '#ffebee', // Red tint
        borderColor: COLORS.danger,
        borderWidth: 1,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: SPACING.xs,
    },
    companyName: {
        fontSize: FONTS.h3,
        fontWeight: 'bold',
        color: COLORS.text,
        flex: 1,
    },
    signalTitle: {
        fontSize: FONTS.small,
        color: COLORS.textSecondary,
        marginTop: SPACING.xs,
        marginBottom: SPACING.xs,
    },
    badge: {
        paddingHorizontal: SPACING.s,
        paddingVertical: 2,
        borderRadius: 4,
    },
    badgeText: {
        fontSize: FONTS.small,
        fontWeight: 'bold',
        color: COLORS.text,
    },
    industry: {
        fontSize: FONTS.small,
        color: COLORS.textSecondary,
        marginBottom: SPACING.s,
    },
    scoreContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: SPACING.s,
    },
    scoreLabel: {
        fontSize: FONTS.small,
        color: COLORS.textSecondary,
        marginRight: SPACING.s,
    },
    scoreValue: {
        fontSize: FONTS.h3,
        fontWeight: 'bold',
    },
    summary: {
        fontSize: FONTS.body,
        color: COLORS.text,
        marginBottom: SPACING.m,
        lineHeight: 22,
    },
    productsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    productTag: {
        backgroundColor: '#e3f2fd',
        paddingHorizontal: SPACING.s,
        paddingVertical: 4,
        borderRadius: 16,
        marginRight: SPACING.s,
        marginTop: SPACING.xs,
    },
    productText: {
        color: COLORS.primary,
        fontSize: FONTS.small,
        fontWeight: '500',
    },
    emptyContainer: {
        padding: SPACING.xl,
        alignItems: 'center',
    },
    emptyText: {
        color: COLORS.textSecondary,
        fontSize: FONTS.body,
    },
});

export default LeadsListScreen;
