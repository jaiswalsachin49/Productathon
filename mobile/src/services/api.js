import axios from 'axios';

// Get API URL from environment variables (configured in .env)
const API_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:8000';

const api = axios.create({
    baseURL: API_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const apiService = {
    // Fetch all leads
    getLeads: async () => {
        try {
            const response = await api.get('/leads/');
            return response.data;
        } catch (error) {
            console.error('Error fetching leads:', error);
            throw error;
        }
    },

    // Fetch single lead details
    getLeadDetails: async (id) => {
        try {
            const response = await api.get(`/leads/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching lead ${id}:`, error);
            throw error;
        }
    },

    // Update lead status
    updateLeadStatus: async (id, status) => {
        try {
            // Assuming backend has an endpoint for status update. 
            // If not, we might need to adjust based on available endpoints.
            // Based on typical REST patterns: PATCH /leads/{id} or similar.
            // Since backend code analysis showed a `leads` router, we will try PATCH.
            const response = await api.patch(`/leads/${id}`, { status });
            return response.data;
        } catch (error) {
            console.error(`Error updating status for lead ${id}:`, error);
            throw error;
        }
    }
};

export default api;
