package com.codebrewers.frontdesk.util;

import java.util.Optional;
import java.util.logging.Logger;

import com.codebrewers.frontdesk.models.Security;
import com.codebrewers.frontdesk.repositories.SecurityRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import com.codebrewers.frontdesk.models.Contact;
import com.codebrewers.frontdesk.repositories.ContactRepository;


import com.codebrewers.frontdesk.models.Employee;
import com.codebrewers.frontdesk.repositories.EmployeeRepository;

public class UtilService {

	public static String getEncryptedPassword(String easyPassword) {

		BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

		return passwordEncoder.encode(easyPassword);
	}

	public static Logger getLoggerObject(String className) {

		return Logger.getLogger(className);

	}

	public static Contact getContactObject(String id, ContactRepository contactRepository) {

		Optional<Contact> optcontact = contactRepository.findById(id);
		if (optcontact.isPresent()) {
			return optcontact.get();
		}
		return null;

	}

	public static Employee getEmployeeObject(String id, EmployeeRepository employeeRepository) {

		Optional<Employee> optemployee = employeeRepository.findById(id);
		if (optemployee.isPresent()) {
			return optemployee.get();
		}
		return null;

	}

	public static Security getSecurityObject(String id, SecurityRepository securityRepository) {

		Optional<Security> optsecurity = securityRepository.findById(id);
		if (optsecurity.isPresent()) {
			return optsecurity.get();
		}
		return null;


	}
}
