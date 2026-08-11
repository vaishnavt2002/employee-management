export interface DashboardStats {
    totalEmployees: number;
    departmentCount: number;
    designationCount: number;
    totalSalaryExpense: number;
    averageSalary: number;
    employeeCountByDepartment: Record<string, number>;
    employeeCountByDesignation: Record<string, number>;
    salaryExpenseByDepartment: Record<string, number>;
}
