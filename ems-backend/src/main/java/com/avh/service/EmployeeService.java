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
}
