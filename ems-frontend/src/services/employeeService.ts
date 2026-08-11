import { API_ENDPOINTS } from "../constants/api";
import type { Employee } from "../constants/employee";
import api from "./api";

export interface PageResponse<T> {
    content: T[];
    totalElements: number;
    totalPages: number;
    number: number;
    size: number;
    first: boolean;
    last: boolean;
}

export interface EmployeeFilterParams {
    name?: string;
    department?: string;
    designation?: string;
    sortBy?: string;
    sortDir?: "asc" | "desc";
    page?: number;
    size?: number;
}

const employeeService = {
    getAllEmployees: async (
        page: number = 0,
        size: number = 20
    ): Promise<PageResponse<Employee>> => {
        const response = await api.get<PageResponse<Employee>>(
            API_ENDPOINTS.EMPLOYEES,
            { params: { page, size } }
        );
        return response.data;
    },

    getEmployeeById: async (id: number): Promise<Employee> => {
        const response = await api.get<Employee>(`${API_ENDPOINTS.EMPLOYEES}/${id}`);
        return response.data;
    },

    createEmployee: async (employee: Employee): Promise<Employee> => {
        const response = await api.post<Employee>(API_ENDPOINTS.EMPLOYEES, employee);
        return response.data;
    },

    updateEmployee: async (id: number, employee: Employee): Promise<Employee> => {
        const response = await api.put<Employee>(`${API_ENDPOINTS.EMPLOYEES}/${id}`, employee);
        return response.data;
    },

    deleteEmployee: async (id: number): Promise<void> => {
        await api.delete(`${API_ENDPOINTS.EMPLOYEES}/${id}`);
    },

    // Combined search + filter + sort + pagination in a single request.
    // Empty/undefined params are dropped so the backend treats them as "no filter".
    filterEmployees: async (
        filters: EmployeeFilterParams = {}
    ): Promise<PageResponse<Employee>> => {
        const params: Record<string, string | number> = {};

        if (filters.name?.trim()) params.name = filters.name.trim();
        if (filters.department) params.department = filters.department;
        if (filters.designation) params.designation = filters.designation;
        if (filters.sortBy) {
            params.sortBy = filters.sortBy;
            params.sortDir = filters.sortDir ?? "asc";
        }
        params.page = filters.page ?? 0;
        params.size = filters.size ?? 10;

        const response = await api.get<PageResponse<Employee>>(
            `${API_ENDPOINTS.EMPLOYEES}/filter`,
            { params }
        );
        return response.data;
    },
};

export default employeeService;