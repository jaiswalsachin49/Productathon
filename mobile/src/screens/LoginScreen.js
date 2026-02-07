import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, KeyboardAvoidingView, Platform, SafeAreaView } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import { COLORS, SPACING, FONTS } from '../constants/theme';
import { Square, CheckSquare } from 'lucide-react-native';

const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const { login, isLoading } = useContext(AuthContext);

    const toggleRememberMe = () => {
        setRememberMe(!rememberMe);
    };

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.content}
            >
                <View style={styles.logoContainer}>
                    {/* Placeholder for Logo */}
                    <View style={styles.logoPlaceholder}>
                        <Text style={styles.logoText}>HPCL</Text>
                    </View>
                    <Text style={styles.appName}>Welcome Sales Officer</Text>
                    <Text style={styles.tagline}>Empowering Sales with AI</Text>
                </View>

                <View style={styles.formContainer}>
                    <Text style={styles.label}>Email</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="officer@hpcl.in"
                        value={email}
                        onChangeText={setEmail}
                        autoCapitalize="none"
                        keyboardType="email-address"
                    />

                    <Text style={styles.label}>Password</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="••••••••"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                    />

                    <TouchableOpacity style={styles.rememberMeContainer} onPress={toggleRememberMe}>
                        {rememberMe ? (
                            <CheckSquare size={20} color={COLORS.primary} />
                        ) : (
                            <Square size={20} color={COLORS.textSecondary} />
                        )}
                        <Text style={styles.rememberMeText}>Remember Me</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.loginButton}
                        onPress={() => login(email, password)}
                        disabled={isLoading}
                    >
                        <Text style={styles.loginButtonText}>
                            {isLoading ? 'Logging in...' : 'Login'}
                        </Text>
                    </TouchableOpacity>
                </View>

                <Text style={styles.footerText}>Internal Use Only • Version 1.0.0</Text>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        padding: SPACING.l,
    },
    logoContainer: {
        alignItems: 'center',
        marginBottom: SPACING.xl,
    },
    logoPlaceholder: {
        width: 80,
        height: 80,
        backgroundColor: COLORS.secondary,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 12,
        marginBottom: SPACING.m,
    },
    logoText: {
        color: COLORS.surface,
        fontSize: FONTS.h1,
        fontWeight: 'bold',
    },
    appName: {
        fontSize: FONTS.h2,
        fontWeight: 'bold',
        color: COLORS.primary,
        textAlign: 'center',
    },
    tagline: {
        fontSize: FONTS.body,
        color: COLORS.textSecondary,
        marginTop: SPACING.xs,
    },
    formContainer: {
        backgroundColor: COLORS.surface,
        padding: SPACING.l,
        borderRadius: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
    },
    label: {
        fontSize: FONTS.small,
        color: COLORS.textSecondary,
        marginBottom: SPACING.xs,
        marginTop: SPACING.m,
    },
    input: {
        backgroundColor: COLORS.background,
        padding: SPACING.m,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: COLORS.border,
        fontSize: FONTS.body,
    },
    rememberMeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: SPACING.m,
    },
    rememberMeText: {
        marginLeft: SPACING.s,
        color: COLORS.text,
        fontSize: FONTS.body,
    },
    loginButton: {
        backgroundColor: COLORS.primary,
        padding: SPACING.m,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: SPACING.l,
        marginBottom: SPACING.s,
    },
    loginButtonText: {
        color: COLORS.surface,
        fontSize: FONTS.body,
        fontWeight: 'bold',
    },
    footerText: {
        textAlign: 'center',
        marginTop: SPACING.xl,
        color: COLORS.textSecondary,
        fontSize: FONTS.small,
    },
});

export default LoginScreen;
