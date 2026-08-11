import { API_ENDPOINTS } from "../constants/api";
import type { DashboardStats } from "../constants/dashboard";
import api from "./api";

const dashboardService = {
    getStats: async (): Promise<DashboardStats> => {
        const response = await api.get<DashboardStats>(`${API_ENDPOINTS.DASHBOARD}/stats`);
        return response.data;
    },
};

export default dashboardService;
