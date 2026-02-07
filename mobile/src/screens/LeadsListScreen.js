import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, RefreshControl } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { COLORS, SPACING, FONTS } from '../constants/theme';
import { storageService } from '../services/storage';

const LeadCard = ({ lead, onPress }) => (
    <TouchableOpacity
        style={[
            styles.card,
            lead.status === 'Rejected' && styles.rejectedCard
        ]}
        onPress={onPress}
    >
        <View style={styles.cardHeader}>
            <Text style={styles.companyName}>{lead.companyName}</Text>
            <View style={[
                styles.badge,
                {
                    backgroundColor: lead.status === 'New' ? COLORS.warning :
                        lead.status === 'Rejected' ? COLORS.danger : COLORS.success
                }
            ]}>
                <Text style={styles.badgeText}>{lead.status}</Text>
            </View>
        </View>

        <Text style={styles.industry}>{lead.industry} • {lead.location}</Text>

        <View style={styles.scoreContainer}>
            <Text style={styles.scoreLabel}>Confidence Score</Text>
            <Text style={[styles.scoreValue, { color: lead.matchScore > 80 ? COLORS.success : COLORS.warning }]}>
                {lead.matchScore}%
            </Text>
        </View>

        <Text style={styles.summary} numberOfLines={2}>{lead.summary}</Text>

        <View style={styles.productsContainer}>
            {lead.products.map((prod, idx) => (
                <View key={idx} style={styles.productTag}>
                    <Text style={styles.productText}>{prod}</Text>
                </View>
            ))}
        </View>
    </TouchableOpacity>
);

const LeadsListScreen = ({ navigation }) => {
    const [leads, setLeads] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    const loadLeads = async () => {
        await storageService.init();
        const data = await storageService.getLeads();
        const sorted = data.sort((a, b) => {
            // Sort logic: New first, then by score
            if (a.status === 'New' && b.status !== 'New') return -1;
            if (a.status !== 'New' && b.status === 'New') return 1;
            return b.matchScore - a.matchScore;
        });
        setLeads(sorted);
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

    // Filter out Rejected leads to move them to bottom or keep them? 
    // User asked to show them in red, implying they should be visible.

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>HPCL Sales Connect</Text>
                <Text style={styles.headerSubtitle}>Sales Officer Dashboard</Text>
            </View>

            <FlatList
                data={leads}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <LeadCard
                        lead={item}
                        onPress={() => navigation.navigate('LeadDetails', { leadId: item.id })}
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
