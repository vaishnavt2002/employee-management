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
    createEmployee: async (employee: Employee): Promise<Employee> => {
        const response = await api.post<Employee>(API_ENDPOINTS.EMPLOYEES, employee);
        return response.data;
    }
}

export default employeeService