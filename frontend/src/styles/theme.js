// HPCL Brand Theme Constants
export const COLORS = {
    // Primary Colors
    hpclBlue: '#005BAC',
    hpclRed: '#E31E24',

    // Background & UI
    background: '#FFFFFF',
    cardBg: '#F5F7FA',
    textPrimary: '#333333',
    textSecondary: '#666666',

    // States
    border: '#E0E0E0',
    hover: '#004A8F',
    success: '#28A745',
    warning: '#FFC107',
};

export const STYLES = {
    navbar: {
        height: '64px',
        background: COLORS.hpclBlue,
    },

    button: {
        primary: {
            background: COLORS.hpclRed,
            color: '#FFFFFF',
            padding: '12px 24px',
            borderRadius: '4px',
            fontWeight: '600',
        },

        secondary: {
            background: '#FFFFFF',
            color: COLORS.hpclBlue,
            border: `2px solid ${COLORS.hpclBlue}`,
            padding: '12px 24px',
            borderRadius: '4px',
            fontWeight: '600',
        },
    },

    card: {
        background: '#FFFFFF',
        border: `1px solid ${COLORS.border}`,
        borderRadius: '8px',
        padding: '24px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    },
};
