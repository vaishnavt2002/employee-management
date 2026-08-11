package com.avh.controller;

import com.avh.dto.DashboardStatsDTO;
import com.avh.service.DashboardService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/dashboard")
public class DashboardController {

    private static final Logger logger = LoggerFactory.getLogger(DashboardController.class);

    @Autowired
    private DashboardService dashboardService;

    // GET /dashboard/stats -> All dashboard metrics in one call:
    // totalEmployees, departmentCount, designationCount, totalSalaryExpense,
    // averageSalary, employeeCountByDepartment, employeeCountByDesignation,
    // salaryExpenseByDepartment
    @GetMapping("/stats")
    public ResponseEntity<DashboardStatsDTO> getDashboardStats() {
        logger.info("Received request to fetch dashboard statistics");
        DashboardStatsDTO stats = dashboardService.getDashboardStats();
        return new ResponseEntity<>(stats, HttpStatus.OK);
    }
}
