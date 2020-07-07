package com.codebrewers.frontdesk.controllers;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.gridfs.GridFsOperations;
import org.springframework.data.mongodb.gridfs.GridFsTemplate;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.codebrewers.frontdesk.models.Employee;
import com.codebrewers.frontdesk.repositories.EmployeeRepository;
import com.codebrewers.frontdesk.service.EmployeeService;

@RestController
public class EmployeeController {

    @Autowired
    EmployeeRepository employeeRepository;

    @Autowired
    GridFsOperations gridOperations;

    @Autowired
    GridFsTemplate gridFsTemplate;

    @RequestMapping(method=RequestMethod.GET, value="/employee")
    public Iterable<Employee> loadAllContacts() {

        return new EmployeeService().loadAllContacts(employeeRepository);
    }

    @RequestMapping(method=RequestMethod.POST, value="/employee")
    public Employee addNewEmployee(@RequestBody Employee employee) {

        return new EmployeeService().addNewEmployee(employeeRepository, employee);
    }

    @RequestMapping(method=RequestMethod.GET, value="/employee/{id}")
    public Map<String, Object> viewEmployee(@PathVariable String id) {

        return new EmployeeService().viewEmployee(employeeRepository, id);
    }

    @RequestMapping(method=RequestMethod.PUT, value="/employee/{id}")
    public Employee updateEmployee(@PathVariable String id, @RequestBody Employee employee) {

        return new EmployeeService().updateEmployee(employeeRepository, id, employee);

    }
/*
    @RequestMapping(method=RequestMethod.GET, value="/file/{employee}")
    public ResponseEntity<Resource> getEmployeeImage(@PathVariable String employeeId) {

        return new EmployeeService().getEmployeeImage(employeeRepository, gridFsTemplate, employeeId);
    }

    @RequestMapping(method=RequestMethod.POST, value="/employee/upload/{id}")
    public Employee updateEmployeeImage(@PathVariable String id, @RequestParam("file") MultipartFile file) {

        return new EmployeeService().updateEmployeeImage(employeeRepository, gridFsTemplate, id, file);

    } */

     @RequestMapping(method=RequestMethod.DELETE, value="/employee/{id}")
    public String deleteEmployee(@PathVariable String id) {

        return new EmployeeService().deleteEmployee(employeeRepository, gridFsTemplate, id);

    }


}
