package com.avh.specification;

import com.avh.entity.Employee;
import org.springframework.data.jpa.domain.Specification;

/**
 * Reusable, combinable filter predicates for Employee.
 * Each method returns a "no-op" (always-true) predicate when its
 * argument is null/blank, so any subset of filters can be combined
 * with Specification.where(...).and(...) without extra null checks
 * at the call site.
 */
public class EmployeeSpecification {

    public static Specification<Employee> hasNameLike(String name) {
        return (root, query, cb) -> {
            if (name == null || name.isBlank()) {
                return cb.conjunction();
            }
            return cb.like(cb.lower(root.get("employeeName")), "%" + name.toLowerCase() + "%");
        };
    }

    public static Specification<Employee> hasDepartment(String department) {
        return (root, query, cb) -> {
            if (department == null || department.isBlank()) {
                return cb.conjunction();
            }
            return cb.equal(cb.lower(root.get("department")), department.toLowerCase());
        };
    }

    public static Specification<Employee> hasDesignation(String designation) {
        return (root, query, cb) -> {
            if (designation == null || designation.isBlank()) {
                return cb.conjunction();
            }
            return cb.equal(cb.lower(root.get("designation")), designation.toLowerCase());
        };
    }

    public static Specification<Employee> combine(String name, String department, String designation) {
        return Specification.where(hasNameLike(name))
                .and(hasDepartment(department))
                .and(hasDesignation(designation));
    }
}
