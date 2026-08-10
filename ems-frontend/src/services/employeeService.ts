import { API_ENDPOINTS } from "../constants/api";
import type { Employee } from "../constants/employee";
import api from "./api";

const employeeService = {
    getAllEmployees: async (): Promise<Employee[]>=>{
        const response = await api.get<Employee[]>(API_ENDPOINTS.EMPLOYEES);
        return response.data;
    },
    createEmployee: async (employee: Employee): Promise<Employee>=>{
        const response = await api.post<Employee>(API_ENDPOINTS.EMPLOYEES, employee); 
        return response.data; 
    }
}

export default employeeService