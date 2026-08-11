package com.avh.service;

import com.avh.entity.Employee;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface EmployeeService {

    Employee addEmployee(Employee employee);

    Page<Employee> getAllEmployees(Pageable pageable);

    Employee getEmployeeById(Long id);

    Employee updateEmployee(Long id, Employee employee);

    void deleteEmployee(Long id);

    List<Employee> searchByName(String name);

    List<Employee> getByDepartment(String department);

    List<Employee> getByDesignation(String designation);

    List<Employee> sortBySalary();

    List<Employee> sortByJoiningDate();

    long getEmployeeCount();

    /**
     * Combined search + filter + sort, all applied together as a single query.
     * Any parameter left null/blank is simply skipped as a filter condition,
     * so name search, department, and designation can be used alone or in
     * any combination, and the result set can also be sorted and paginated.
     *
     * @param name       partial, case-insensitive match on employee name (nullable)
     * @param department exact, case-insensitive match on department (nullable)
     * @param designation exact, case-insensitive match on designation (nullable)
     * @param sortBy     one of: name, department, designation, salary, joiningDate (nullable)
     * @param sortDir    "asc" or "desc" (defaults to asc)
     * @param pageable   page number/size
     */
    Page<Employee> searchAndFilter(String name, String department, String designation,
            String sortBy, String sortDir, Pageable pageable);
}
