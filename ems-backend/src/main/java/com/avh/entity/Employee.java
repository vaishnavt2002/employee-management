package com.avh.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Table(name = "employees")
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

	public Employee(Long id, @NotBlank(message = "Employee Name is mandatory") String employeeName,
			@NotBlank(message = "Email is mandatory") @Email(message = "Email must be valid") String email,
			@NotBlank(message = "Mobile number is mandatory") @Pattern(regexp = "^[0-9]{10}$", message = "Mobile number must contain exactly 10 digits") String mobile,
			@NotBlank(message = "Department is mandatory") String department,
			@NotBlank(message = "Designation is mandatory") String designation,
			@NotNull(message = "Salary is mandatory") @Positive(message = "Salary must be greater than zero") Double salary,
			@NotBlank(message = "Address is mandatory") String address,
			@NotNull(message = "Joining Date is mandatory") @PastOrPresent(message = "Joining Date cannot be a future date") LocalDate joiningDate) {
		super();
		this.id = id;
		this.employeeName = employeeName;
		this.email = email;
		this.mobile = mobile;
		this.department = department;
		this.designation = designation;
		this.salary = salary;
		this.address = address;
		this.joiningDate = joiningDate;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getEmployeeName() {
		return employeeName;
	}

	public void setEmployeeName(String employeeName) {
		this.employeeName = employeeName;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getMobile() {
		return mobile;
	}

	public void setMobile(String mobile) {
		this.mobile = mobile;
	}

	public String getDepartment() {
		return department;
	}

	public void setDepartment(String department) {
		this.department = department;
	}

	public String getDesignation() {
		return designation;
	}

	public void setDesignation(String designation) {
		this.designation = designation;
	}

	public Double getSalary() {
		return salary;
	}

	public void setSalary(Double salary) {
		this.salary = salary;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public LocalDate getJoiningDate() {
		return joiningDate;
	}

	public void setJoiningDate(LocalDate joiningDate) {
		this.joiningDate = joiningDate;
	}
    
    
}