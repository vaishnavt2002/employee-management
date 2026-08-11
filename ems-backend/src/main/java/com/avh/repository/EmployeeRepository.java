package com.avh.repository;

import com.avh.entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface EmployeeRepository extends JpaRepository<Employee, Long>, JpaSpecificationExecutor<Employee> {

    List<Employee> findByEmployeeNameContainingIgnoreCase(String name);

    List<Employee> findByDepartmentIgnoreCase(String department);

    List<Employee> findByDesignationIgnoreCase(String designation);

    List<Employee> findAllByOrderBySalaryAsc();

    List<Employee> findAllByOrderByJoiningDateAsc();

    boolean existsByEmail(String email);

    // ---- Dashboard aggregate queries ----

    @Query("SELECT COUNT(DISTINCT e.department) FROM Employee e")
    long countDistinctDepartments();

    @Query("SELECT COUNT(DISTINCT e.designation) FROM Employee e")
    long countDistinctDesignations();

    @Query("SELECT COALESCE(SUM(e.salary), 0) FROM Employee e")
    Double sumSalary();

    @Query("SELECT COALESCE(AVG(e.salary), 0) FROM Employee e")
    Double averageSalary();

    @Query("SELECT e.department, COUNT(e) FROM Employee e GROUP BY e.department")
    List<Object[]> countEmployeesGroupedByDepartment();

    @Query("SELECT e.designation, COUNT(e) FROM Employee e GROUP BY e.designation")
    List<Object[]> countEmployeesGroupedByDesignation();

    @Query("SELECT e.department, COALESCE(SUM(e.salary), 0) FROM Employee e GROUP BY e.department")
    List<Object[]> sumSalaryGroupedByDepartment();
}
