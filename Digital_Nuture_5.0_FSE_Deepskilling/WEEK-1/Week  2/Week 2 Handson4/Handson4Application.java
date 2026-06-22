package com.Handson.handson4;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.List;

@SpringBootApplication
public class Handson4Application implements CommandLineRunner {

    @Autowired
    private EmployeeService employeeService;

    public static void main(String[] args) {
        SpringApplication.run(Handson4Application.class, args);
    }

    @Override
    public void run(String... args) throws Exception {
        // Add an employee
        Employee emp = new Employee();
        emp.setName("Hariharan");
        emp.setSalary(120000);
        employeeService.addEmployee(emp);

        // Fetch all employees
        List<Employee> employees = employeeService.getAllEmployees();
        employees.forEach(e -> System.out.println(e.getId() + " | " + e.getName() + " | " + e.getSalary()));
    }
}
