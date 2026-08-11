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

    searchByName: async (name: string): Promise<Employee[]> => {
        const response = await api.get<Employee[]>(`${API_ENDPOINTS.EMPLOYEES}/search`, {
            params: { name },
        });
        return response.data;
    },

    getByDepartment: async (department: string): Promise<Employee[]> => {
        const response = await api.get<Employee[]>(
            `${API_ENDPOINTS.EMPLOYEES}/department/${department}`
        );
        return response.data;
    },

    getByDesignation: async (designation: string): Promise<Employee[]> => {
        const response = await api.get<Employee[]>(
            `${API_ENDPOINTS.EMPLOYEES}/designation/${designation}`
        );
        return response.data;
    },

    sortBySalary: async (): Promise<Employee[]> => {
        const response = await api.get<Employee[]>(`${API_ENDPOINTS.EMPLOYEES}/sort/salary`);
        return response.data;
    },

    sortByJoiningDate: async (): Promise<Employee[]> => {
        const response = await api.get<Employee[]>(`${API_ENDPOINTS.EMPLOYEES}/sort/joiningDate`);
        return response.data;
    },
};

export default employeeService;