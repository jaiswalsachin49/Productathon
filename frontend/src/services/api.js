/**
 * API Service for HPCL B2B Lead Intelligence
 * Connects frontend to FastAPI backend
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000';

class APIService {
    async request(endpoint, options = {}) {
        const url = `${API_BASE_URL}${endpoint}`;
        const config = {
            headers: {
                'Content-Type': 'application/json',
                ...options.headers,
            },
            ...options,
        };

        try {
            const response = await fetch(url, config);

            if (!response.ok) {
                const error = await response.json().catch(() => ({ detail: 'Request failed' }));
                throw new Error(error.detail || `HTTP ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error(`API Error [${endpoint}]:`, error);
            throw error;
        }
    }

    // ============ LEADS ============
    async getLeads(filters = {}) {
        const params = new URLSearchParams();
        if (filters.status) params.append('status', filters.status);
        if (filters.quality) params.append('quality', filters.quality);
        if (filters.min_confidence) params.append('min_confidence', filters.min_confidence);
        if (filters.limit) params.append('limit', filters.limit);

        const query = params.toString();
        return this.request(`/leads/${query ? '?' + query : ''}`);
    }

    async getLead(id) {
        return this.request(`/leads/${id}`);
    }

    async updateLead(id, data) {
        return this.request(`/leads/${id}`, {
            method: 'PATCH',
            body: JSON.stringify(data),
        });
    }

    async createLead(data) {
        return this.request('/leads', {
            method: 'POST',
            body: JSON.stringify(data),
        });
    }

    // ============ COMPANIES ============
    async getCompanies(limit = 100) {
        return this.request(`/companies/?limit=${limit}`);
    }

    async getCompany(id) {
        return this.request(`/companies/${id}`);
    }

    // ============ PRODUCTS ============
    async getProducts() {
        return this.request('/products');
    }

    // ============ SIGNALS ============
    async getSignals(limit = 50) {
        return this.request(`/signals?limit=${limit}`);
    }

    async ingestSignals() {
        return this.request('/ingestion/ingest', {
            method: 'POST',
        });
    }

    // ============ WHATSAPP ============
    async sendLeadNotification(leadId, recipient = null) {
        const params = recipient ? `?recipient=${encodeURIComponent(recipient)}` : '';
        return this.request(`/whatsapp/notify-lead/${leadId}${params}`, {
            method: 'POST',
        });
    }

    async sendDailySummary(recipient = null) {
        const params = recipient ? `?recipient=${encodeURIComponent(recipient)}` : '';
        return this.request(`/whatsapp/daily-summary${params}`, {
            method: 'POST',
        });
    }

    async getWhatsAppStatus() {
        return this.request('/whatsapp/status');
    }

    // ============ STATS ============
    // Analytics endpoints
    async getDashboardStats() {
        try {
            const response = await this.request('/analytics/dashboard-stats');
            return response;
        } catch (error) {
            console.error('Error fetching dashboard stats:', error);
            // Return zeroed structure on error
            return {
                total: 0, new: 0, contacted: 0, qualified: 0, won: 0, lost: 0,
                highPriority: 0, pending: 0, conversionRate: 0
            };
        }
    }

    async getTopProducts(limit = 5) {
        try {
            const response = await this.request(`/analytics/top-products?limit=${limit}`);
            return response;
        } catch (error) {
            console.error('Error fetching top products:', error);
            return { products: [] };
        }
    }

    async getGeographyBreakdown() {
        try {
            const response = await this.request('/analytics/geography-breakdown');
            return response;
        } catch (error) {
            console.error('Error fetching geography breakdown:', error);
            return { states: [] };
        }
    }

    async getConversionFunnel() {
        try {
            const response = await this.request('/analytics/conversion-funnel');
            return response;
        } catch (error) {
            console.error('Error fetching funnel:', error);
            return { stages: [] };
        }
    }

    async getTopIndustries(limit = 5) {
        try {
            const response = await this.request(`/analytics/top-industries?limit=${limit}`);
            return response;
        } catch (error) {
            console.error('Error fetching top industries:', error);
            return { industries: [] };
        }
    }

    // Lead Management
    async updateLeadStatus(id, status) {
        return this.updateLead(id, { status });
    }

    async submitLeadFeedback(id, feedbackStatus, notes) {
        return this.updateLead(id, {
            feedback_status: feedbackStatus,
            feedback_notes: notes,
            feedback_date: new Date().toISOString()
        });
    }

    async getOfficerLeads(region) {
        return this.getLeads({ limit: 100 });
    }

    async getOfficers() {
        return this.request('/auth/officers');
    }
}

// Singleton instance
const api = new APIService();
export default api;
