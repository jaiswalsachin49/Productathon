import AsyncStorage from '@react-native-async-storage/async-storage';
import { MOCK_LEADS } from '../data/mockData';

const LEADS_KEY = '@leads_data';

export const storageService = {
    // Initialize data with mock data if empty
    init: async () => {
        try {
            const existing = await AsyncStorage.getItem(LEADS_KEY);
            if (!existing) {
                await AsyncStorage.setItem(LEADS_KEY, JSON.stringify(MOCK_LEADS));
            }
        } catch (e) {
            console.error('Failed to init storage', e);
        }
    },

    getLeads: async () => {
        try {
            const jsonValue = await AsyncStorage.getItem(LEADS_KEY);
            return jsonValue != null ? JSON.parse(jsonValue) : [];
        } catch (e) {
            console.error('Failed to get leads', e);
            return [];
        }
    },

    saveLeads: async (leads) => {
        try {
            await AsyncStorage.setItem(LEADS_KEY, JSON.stringify(leads));
        } catch (e) {
            console.error('Failed to save leads', e);
        }
    },

    updateLeadStatus: async (leadId, newStatus) => {
        try {
            const leads = await storageService.getLeads();
            const updatedLeads = leads.map(lead =>
                lead.id === leadId ? { ...lead, status: newStatus } : lead
            );
            await storageService.saveLeads(updatedLeads);
            return updatedLeads;
        } catch (e) {
            console.error('Failed to update status', e);
            return [];
        }
    },

    addNote: async (leadId, noteText) => {
        try {
            const leads = await storageService.getLeads();
            const timestamp = new Date().toISOString();
            const updatedLeads = leads.map(lead => {
                if (lead.id === leadId) {
                    const currentNotes = lead.notes || [];
                    return { ...lead, notes: [...currentNotes, { text: noteText, date: timestamp }] };
                }
                return lead;
            });
            await storageService.saveLeads(updatedLeads);
            return updatedLeads;
        } catch (e) {
            console.error('Failed to add note', e);
            return [];
        }
    }
};
