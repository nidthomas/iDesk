package com.codebrewers.frontdesk.repositories;

import org.springframework.data.repository.CrudRepository;

import com.codebrewers.frontdesk.models.Employee;

public interface EmployeeRepository extends CrudRepository<Employee, String> {
	@Override
	void delete(Employee deleted);
}
