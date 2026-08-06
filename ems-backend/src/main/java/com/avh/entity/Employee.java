package com.avh.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Table(name = "employees")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Employee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Employee Name is mandatory")
    @Column(name = "employee_name", nullable = false)
    private String employeeName;

    @NotBlank(message = "Email is mandatory")
    @Email(message = "Email must be valid")
    @Column(nullable = false, unique = true)
    private String email;

    @NotBlank(message = "Mobile number is mandatory")
    @Pattern(regexp = "^[0-9]{10}$", message = "Mobile number must contain exactly 10 digits")
    @Column(nullable = false)
    private String mobile;

    @NotBlank(message = "Department is mandatory")
    @Column(nullable = false)
    private String department;

    @NotBlank(message = "Designation is mandatory")
    @Column(nullable = false)
    private String designation;

    @NotNull(message = "Salary is mandatory")
    @Positive(message = "Salary must be greater than zero")
    @Column(nullable = false)
    private Double salary;

    @NotBlank(message = "Address is mandatory")
    @Column(nullable = false)
    private String address;

    @NotNull(message = "Joining Date is mandatory")
    @PastOrPresent(message = "Joining Date cannot be a future date")
    @Column(name = "joining_date", nullable = false)
    private LocalDate joiningDate;
    
    
}