package com.avh.repository;

import com.avh.entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {
																																						
    List<Employee> findByEmployeeNameContainingIgnoreCase(String name);

    List<Employee> findByDepartmentIgnoreCase(String department);

    List<Employee> findByDesignationIgnoreCase(String designation);

    List<Employee> findAllByOrderBySalaryAsc();

    List<Employee> findAllByOrderByJoiningDateAsc();

    boolean existsByEmail(String email);
}