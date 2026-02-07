import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import { COLORS, SPACING, FONTS } from '../constants/theme';
import { User, Bell, CircleHelp, Bug, LogOut, ChevronRight } from 'lucide-react-native';

const ProfileMenuItem = ({ icon: Icon, title, onPress, isDestructive }) => (
    <TouchableOpacity style={styles.menuItem} onPress={onPress}>
        <View style={styles.menuIconContainer}>
            <Icon size={24} color={isDestructive ? COLORS.danger : COLORS.primary} />
        </View>
        <Text style={[styles.menuText, isDestructive && styles.destructiveText]}>{title}</Text>
        <ChevronRight size={20} color={COLORS.textSecondary} />
    </TouchableOpacity>
);

const ProfileScreen = () => {
    const { logout, user } = useContext(AuthContext);

    const handleEditProfile = () => {
        Alert.alert("Edit Profile", "This feature is coming soon!");
    };

    const handleHelp = () => {
        Alert.alert("Help & FAQs", "1. How to accept a lead?\nTap on a lead and select 'Accept'.\n\n2. How to convert?\nAccepted leads can be marked as converted.");
    };

    const handleReportBug = () => {
        Alert.alert("Report Bug", "Please describe the issue. Our team will look into it.");
    };

    const handleLogout = () => {
        Alert.alert(
            "Logout",
            "Are you sure you want to logout?",
            [
                { text: "Cancel", style: "cancel" },
                { text: "Logout", style: "destructive", onPress: logout }
            ]
        );
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <View style={styles.avatarContainer}>
                    <Text style={styles.avatarText}>SO</Text>
                </View>
                <Text style={styles.userName}>{user?.name || 'Sales Officer'}</Text>
                <Text style={styles.userRole}>West Zone • Mumbai Region</Text>
            </View>

            <View style={styles.statsContainer}>
                <View style={styles.statItem}>
                    <Text style={styles.statValue}>12</Text>
                    <Text style={styles.statLabel}>Pending</Text>
                </View>
                <View style={styles.statDivider} />
                <View style={styles.statItem}>
                    <Text style={styles.statValue}>5</Text>
                    <Text style={styles.statLabel}>Converted</Text>
                </View>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Account</Text>
                <ProfileMenuItem icon={User} title="Edit Profile" onPress={handleEditProfile} />
                <ProfileMenuItem icon={Bell} title="Notifications" onPress={() => { }} />
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Support</Text>
                <ProfileMenuItem icon={CircleHelp} title="Help & FAQs" onPress={handleHelp} />
                <ProfileMenuItem icon={Bug} title="Report a Bug" onPress={handleReportBug} />
            </View>

            <View style={styles.section}>
                <ProfileMenuItem
                    icon={LogOut}
                    title="Logout"
                    onPress={handleLogout}
                    isDestructive
                />
            </View>

            <Text style={styles.versionText}>HPCL Sales Connect v1.0.0</Text>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    header: {
        backgroundColor: COLORS.surface,
        padding: SPACING.xl,
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: COLORS.border,
    },
    avatarContainer: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: COLORS.primary,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: SPACING.m,
    },
    avatarText: {
        fontSize: FONTS.h1,
        color: COLORS.surface,
        fontWeight: 'bold',
    },
    userName: {
        fontSize: FONTS.h2,
        fontWeight: 'bold',
        color: COLORS.text,
    },
    userRole: {
        fontSize: FONTS.body,
        color: COLORS.textSecondary,
        marginTop: SPACING.xs,
    },
    statsContainer: {
        flexDirection: 'row',
        backgroundColor: COLORS.surface,
        marginTop: SPACING.m,
        padding: SPACING.m,
        marginHorizontal: SPACING.m,
        borderRadius: 12,
        justifyContent: 'space-around',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    statItem: {
        alignItems: 'center',
    },
    statValue: {
        fontSize: FONTS.h2,
        fontWeight: 'bold',
        color: COLORS.primary,
    },
    statLabel: {
        fontSize: FONTS.small,
        color: COLORS.textSecondary,
    },
    statDivider: {
        width: 1,
        backgroundColor: COLORS.border,
    },
    section: {
        marginTop: SPACING.l,
        backgroundColor: COLORS.surface,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: COLORS.border,
    },
    sectionTitle: {
        fontSize: FONTS.small,
        color: COLORS.textSecondary,
        fontWeight: 'bold',
        marginLeft: SPACING.l,
        marginTop: SPACING.m,
        marginBottom: SPACING.xs,
        textTransform: 'uppercase',
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: SPACING.m,
        paddingHorizontal: SPACING.l,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.background,
    },
    menuIconContainer: {
        marginRight: SPACING.m,
    },
    menuText: {
        flex: 1,
        fontSize: FONTS.body,
        color: COLORS.text,
    },
    destructiveText: {
        color: COLORS.danger,
    },
    versionText: {
        textAlign: 'center',
        margin: SPACING.xl,
        color: COLORS.textSecondary,
        fontSize: FONTS.small,
    },
});

export default ProfileScreen;
