package com.avh.service;

import com.avh.dto.DashboardStatsDTO;
import com.avh.repository.EmployeeRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@Service
public class DashboardServiceImpl implements DashboardService {

    private static final Logger logger = LoggerFactory.getLogger(DashboardServiceImpl.class);

    @Autowired
    private EmployeeRepository employeeRepository;

    @Override
    public DashboardStatsDTO getDashboardStats() {
        logger.info("Building dashboard statistics");

        long totalEmployees = employeeRepository.count();
        long departmentCount = employeeRepository.countDistinctDepartments();
        long designationCount = employeeRepository.countDistinctDesignations();
        double totalSalaryExpense = employeeRepository.sumSalary();
        double averageSalary = employeeRepository.averageSalary();

        Map<String, Long> employeeCountByDepartment = toLongMap(employeeRepository.countEmployeesGroupedByDepartment());
        Map<String, Long> employeeCountByDesignation = toLongMap(employeeRepository.countEmployeesGroupedByDesignation());
        Map<String, Double> salaryExpenseByDepartment = toDoubleMap(employeeRepository.sumSalaryGroupedByDepartment());

        return new DashboardStatsDTO(
                totalEmployees,
                departmentCount,
                designationCount,
                totalSalaryExpense,
                averageSalary,
                employeeCountByDepartment,
                employeeCountByDesignation,
                salaryExpenseByDepartment
        );
    }

    private Map<String, Long> toLongMap(List<Object[]> rows) {
        Map<String, Long> result = new LinkedHashMap<>();
        for (Object[] row : rows) {
            String key = (String) row[0];
            Long value = (Long) row[1];
            result.put(key, value);
        }
        return result;
    }

    private Map<String, Double> toDoubleMap(List<Object[]> rows) {
        Map<String, Double> result = new LinkedHashMap<>();
        for (Object[] row : rows) {
            String key = (String) row[0];
            Double value = (Double) row[1];
            result.put(key, value);
        }
        return result;
    }
}
