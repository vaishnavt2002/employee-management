package com.avh.service;

import com.avh.entity.Employee;
import com.avh.exception.DuplicateEmailException;
import com.avh.exception.ResourceNotFoundException;
import com.avh.repository.EmployeeRepository;
import com.avh.specification.EmployeeSpecification;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;

@Service
public class EmployeeServiceImpl implements EmployeeService {

    private static final Logger logger = LoggerFactory.getLogger(EmployeeServiceImpl.class);

    @Autowired
    private EmployeeRepository employeeRepository;

    @Override
    public Employee addEmployee(Employee employee) {
        logger.info("Adding new employee with email: {}", employee.getEmail());

        // Business Rule: Employee Email should be unique
        if (employeeRepository.existsByEmail(employee.getEmail())) {
            throw new DuplicateEmailException("An employee with this email already exists");
        }

        // Employee ID is generated automatically by the database (IDENTITY strategy)
        return employeeRepository.save(employee);
    }

    @Override
    public Page<Employee> getAllEmployees(Pageable pageable) {
        logger.info("Fetching all employees, page: {}, size: {}", pageable.getPageNumber(), pageable.getPageSize());
        return employeeRepository.findAll(pageable);
    }

    @Override
    public Employee getEmployeeById(Long id) {
        logger.info("Fetching employee with id: {}", id);
        return employeeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not found with id: " + id));
    }

    @Override
    public Employee updateEmployee(Long id, Employee updatedEmployee) {
        logger.info("Updating employee with id: {}", id);

        Employee existingEmployee = employeeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not found with id: " + id));

        // Business Rule: Employee Email should be unique (allow same email if unchanged)
        if (!existingEmployee.getEmail().equalsIgnoreCase(updatedEmployee.getEmail())
                && employeeRepository.existsByEmail(updatedEmployee.getEmail())) {
            throw new DuplicateEmailException("An employee with this email already exists");
        }

        existingEmployee.setEmployeeName(updatedEmployee.getEmployeeName());
        existingEmployee.setEmail(updatedEmployee.getEmail());
        existingEmployee.setMobile(updatedEmployee.getMobile());
        existingEmployee.setDepartment(updatedEmployee.getDepartment());
        existingEmployee.setDesignation(updatedEmployee.getDesignation());
        existingEmployee.setSalary(updatedEmployee.getSalary());
        existingEmployee.setAddress(updatedEmployee.getAddress());
        existingEmployee.setJoiningDate(updatedEmployee.getJoiningDate());

        return employeeRepository.save(existingEmployee);
    }

    @Override
    public void deleteEmployee(Long id) {
        logger.info("Deleting employee with id: {}", id);

        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not found with id: " + id));

        employeeRepository.delete(employee);
    }

    @Override
    public List<Employee> searchByName(String name) {
        logger.info("Searching employees by name: {}", name);
        return employeeRepository.findByEmployeeNameContainingIgnoreCase(name);
    }

    @Override
    public List<Employee> getByDepartment(String department) {
        logger.info("Fetching employees by department: {}", department);
        return employeeRepository.findByDepartmentIgnoreCase(department);
    }

    @Override
    public List<Employee> getByDesignation(String designation) {
        logger.info("Fetching employees by designation: {}", designation);
        return employeeRepository.findByDesignationIgnoreCase(designation);
    }

    @Override
    public List<Employee> sortBySalary() {
        logger.info("Sorting employees by salary");
        return employeeRepository.findAllByOrderBySalaryAsc();
    }

    @Override
    public List<Employee> sortByJoiningDate() {
        logger.info("Sorting employees by joining date");
        return employeeRepository.findAllByOrderByJoiningDateAsc();
    }
    
    @Override
    public long getEmployeeCount() {
        logger.info("Fetching total count of employees");
        return employeeRepository.count();
    }

    private static final Set<String> ALLOWED_SORT_FIELDS = Set.of(
            "name", "department", "designation", "salary", "joiningdate");

    @Override
    public Page<Employee> searchAndFilter(String name, String department, String designation,
            String sortBy, String sortDir, Pageable pageable) {
        logger.info("Searching employees with name={}, department={}, designation={}, sortBy={}, sortDir={}",
                name, department, designation, sortBy, sortDir);

        Specification<Employee> spec = EmployeeSpecification.combine(name, department, designation);

        Pageable finalPageable = pageable;
        if (sortBy != null && !sortBy.isBlank()) {
            String normalized = sortBy.trim().toLowerCase();
            if (!ALLOWED_SORT_FIELDS.contains(normalized)) {
                throw new IllegalArgumentException(
                        "Invalid sortBy value: " + sortBy + ". Allowed values: " + ALLOWED_SORT_FIELDS);
            }
            String entityField = mapSortFieldToEntityProperty(normalized);
            Sort.Direction direction = "desc".equalsIgnoreCase(sortDir) ? Sort.Direction.DESC : Sort.Direction.ASC;
            Sort sort = Sort.by(direction, entityField);
            finalPageable = PageRequest.of(pageable.getPageNumber(), pageable.getPageSize(), sort);
        }

        return employeeRepository.findAll(spec, finalPageable);
    }

    private String mapSortFieldToEntityProperty(String sortBy) {
        switch (sortBy) {
            case "name":
                return "employeeName";
            case "department":
                return "department";
            case "designation":
                return "designation";
            case "salary":
                return "salary";
            case "joiningdate":
                return "joiningDate";
            default:
                throw new IllegalArgumentException("Invalid sortBy value: " + sortBy);
        }
    }
}
