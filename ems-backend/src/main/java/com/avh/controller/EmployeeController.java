package com.avh.controller;

import com.avh.entity.Employee;
import com.avh.service.EmployeeService;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/employees")
public class EmployeeController {

    private static final Logger logger = LoggerFactory.getLogger(EmployeeController.class);

    @Autowired
    private EmployeeService employeeService;

    // POST /employees -> Add Employee
    @PostMapping
    public ResponseEntity<Employee> addEmployee(@Valid @RequestBody Employee employee) {
        logger.info("Received request to add employee");
        Employee savedEmployee = employeeService.addEmployee(employee);
        return new ResponseEntity<>(savedEmployee, HttpStatus.CREATED);
    }

    // GET /employees -> View All Employees (supports optional pagination: ?page=0&size=10)
    @GetMapping
    public ResponseEntity<Page<Employee>> getAllEmployees(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        logger.info("Received request to fetch all employees");
        Pageable pageable = PageRequest.of(page, size);
        Page<Employee> employees = employeeService.getAllEmployees(pageable);
        return new ResponseEntity<>(employees, HttpStatus.OK);
    }

    // GET /employees/{id} -> View Employee Details
    @GetMapping("/{id}")
    public ResponseEntity<Employee> getEmployeeById(@PathVariable Long id) {
        logger.info("Received request to fetch employee with id: {}", id);
        Employee employee = employeeService.getEmployeeById(id);
        return new ResponseEntity<>(employee, HttpStatus.OK);
    }

    // PUT /employees/{id} -> Update Employee Information
    @PutMapping("/{id}")
    public ResponseEntity<Employee> updateEmployee(@PathVariable Long id, @Valid @RequestBody Employee employee) {
        logger.info("Received request to update employee with id: {}", id);
        Employee updatedEmployee = employeeService.updateEmployee(id, employee);
        return new ResponseEntity<>(updatedEmployee, HttpStatus.OK);
    }

    // DELETE /employees/{id} -> Delete Employee
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEmployee(@PathVariable Long id) {
        logger.info("Received request to delete employee with id: {}", id);
        employeeService.deleteEmployee(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    // GET /employees/search?name= -> Search Employee by Name
    @GetMapping("/search")
    public ResponseEntity<List<Employee>> searchByName(@RequestParam String name) {
        logger.info("Received request to search employees by name: {}", name);
        List<Employee> employees = employeeService.searchByName(name);
        return new ResponseEntity<>(employees, HttpStatus.OK);
    }

    // GET /employees/department/{department} -> Search Employee by Department
    @GetMapping("/department/{department}")
    public ResponseEntity<List<Employee>> getByDepartment(@PathVariable String department) {
        logger.info("Received request to fetch employees by department: {}", department);
        List<Employee> employees = employeeService.getByDepartment(department);
        return new ResponseEntity<>(employees, HttpStatus.OK);
    }

    // GET /employees/designation/{designation} -> Filter Employees by Designation
    @GetMapping("/designation/{designation}")
    public ResponseEntity<List<Employee>> getByDesignation(@PathVariable String designation) {
        logger.info("Received request to fetch employees by designation: {}", designation);
        List<Employee> employees = employeeService.getByDesignation(designation);
        return new ResponseEntity<>(employees, HttpStatus.OK);
    }

    // GET /employees/sort/salary -> Sort Employees by Salary
    @GetMapping("/sort/salary")
    public ResponseEntity<List<Employee>> sortBySalary() {
        logger.info("Received request to sort employees by salary");
        List<Employee> employees = employeeService.sortBySalary();
        return new ResponseEntity<>(employees, HttpStatus.OK);
    }

    // GET /employees/sort/joiningDate -> Sort Employees by Joining Date
    @GetMapping("/sort/joiningDate")
    public ResponseEntity<List<Employee>> sortByJoiningDate() {
        logger.info("Received request to sort employees by joining date");
        List<Employee> employees = employeeService.sortByJoiningDate();
        return new ResponseEntity<>(employees, HttpStatus.OK);
    }
}
