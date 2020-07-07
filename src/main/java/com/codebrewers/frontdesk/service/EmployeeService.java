package com.codebrewers.frontdesk.service;

import java.util.Map;

import org.springframework.core.io.Resource;
import org.springframework.data.mongodb.gridfs.GridFsTemplate;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import com.codebrewers.frontdesk.repositories.EmployeDao;
import com.codebrewers.frontdesk.models.Employee;
import com.codebrewers.frontdesk.repositories.EmployeeRepository;

public class EmployeeService {

    public Iterable<Employee> loadAllContacts(EmployeeRepository employeeRespository) {

        return new EmployeDao().loadAllContacts(employeeRespository);
    }

    public Employee addNewEmployee(EmployeeRepository employeeRespository,Employee employee) {

        return new EmployeDao().addNewEmployee(employeeRespository, employee);
    }


    public Map<String, Object> viewEmployee(EmployeeRepository employeeRespository,String id) {

        return new EmployeDao().viewEmployee(employeeRespository, id);
    }


    public Employee updateEmployee(EmployeeRepository employeeRespository,String id,Employee employee) {

        return new EmployeDao().updateEmployee(employeeRespository, id, employee);
    }

    /*
    public ResponseEntity<Resource> getEmployeeImage(EmployeeRepository employeeRespository,GridFsTemplate gridFsTemplate,String employee) {

        return new EmployeDao().getEmployeeImage(employeeRespository, gridFsTemplate, contactId);

    }

    public Employee updateEmployeeImage(EmployeeRepository employeeRespository, GridFsTemplate gridFsTemplate,String id, MultipartFile file) {

        return new EmployeDao().updateEmployeeImage(employeeRespository, gridFsTemplate, id, file);

    }*/

    public String deleteEmployee(EmployeeRepository employeeRespository,GridFsTemplate gridFsTemplate,String id) {

        return new EmployeDao().deleteEmployee(employeeRespository, gridFsTemplate, id);

    }

}
