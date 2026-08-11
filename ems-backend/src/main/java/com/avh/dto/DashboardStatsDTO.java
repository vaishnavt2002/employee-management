package com.avh.dto;

import java.util.Map;

public class DashboardStatsDTO {

    private long totalEmployees;
    private long departmentCount;
    private long designationCount;
    private double totalSalaryExpense;
    private double averageSalary;
    private Map<String, Long> employeeCountByDepartment;
    private Map<String, Long> employeeCountByDesignation;
    private Map<String, Double> salaryExpenseByDepartment;

    public DashboardStatsDTO() {
    }

    public DashboardStatsDTO(long totalEmployees, long departmentCount, long designationCount,
            double totalSalaryExpense, double averageSalary, Map<String, Long> employeeCountByDepartment,
            Map<String, Long> employeeCountByDesignation, Map<String, Double> salaryExpenseByDepartment) {
        this.totalEmployees = totalEmployees;
        this.departmentCount = departmentCount;
        this.designationCount = designationCount;
        this.totalSalaryExpense = totalSalaryExpense;
        this.averageSalary = averageSalary;
        this.employeeCountByDepartment = employeeCountByDepartment;
        this.employeeCountByDesignation = employeeCountByDesignation;
        this.salaryExpenseByDepartment = salaryExpenseByDepartment;
    }

    public long getTotalEmployees() {
        return totalEmployees;
    }

    public void setTotalEmployees(long totalEmployees) {
        this.totalEmployees = totalEmployees;
    }

    public long getDepartmentCount() {
        return departmentCount;
    }

    public void setDepartmentCount(long departmentCount) {
        this.departmentCount = departmentCount;
    }

    public long getDesignationCount() {
        return designationCount;
    }

    public void setDesignationCount(long designationCount) {
        this.designationCount = designationCount;
    }

    public double getTotalSalaryExpense() {
        return totalSalaryExpense;
    }

    public void setTotalSalaryExpense(double totalSalaryExpense) {
        this.totalSalaryExpense = totalSalaryExpense;
    }

    public double getAverageSalary() {
        return averageSalary;
    }

    public void setAverageSalary(double averageSalary) {
        this.averageSalary = averageSalary;
    }

    public Map<String, Long> getEmployeeCountByDepartment() {
        return employeeCountByDepartment;
    }

    public void setEmployeeCountByDepartment(Map<String, Long> employeeCountByDepartment) {
        this.employeeCountByDepartment = employeeCountByDepartment;
    }

    public Map<String, Long> getEmployeeCountByDesignation() {
        return employeeCountByDesignation;
    }

    public void setEmployeeCountByDesignation(Map<String, Long> employeeCountByDesignation) {
        this.employeeCountByDesignation = employeeCountByDesignation;
    }

    public Map<String, Double> getSalaryExpenseByDepartment() {
        return salaryExpenseByDepartment;
    }

    public void setSalaryExpenseByDepartment(Map<String, Double> salaryExpenseByDepartment) {
        this.salaryExpenseByDepartment = salaryExpenseByDepartment;
    }
}
