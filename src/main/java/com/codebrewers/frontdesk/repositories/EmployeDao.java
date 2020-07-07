package com.codebrewers.frontdesk.repositories;

import org.springframework.data.repository.CrudRepository;

import com.codebrewers.frontdesk.models.Employee;
import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.HashMap;
import java.util.Map;
import java.util.logging.Level;
import java.util.logging.Logger;

import org.bson.types.ObjectId;
import org.springframework.core.io.Resource;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.gridfs.GridFsTemplate;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import com.codebrewers.frontdesk.repositories.EmployeeRepository;
import com.codebrewers.frontdesk.util.UtilService;
import com.mongodb.BasicDBObject;
import com.mongodb.DBObject;
import com.mongodb.client.gridfs.model.GridFSFile;


public class EmployeDao  {


	//	@Autowired
	//	private JavaMailSender javaMailSender;

	Logger logger = UtilService.getLoggerObject(this.getClass().getName());

	public Iterable<Employee> loadAllContacts(EmployeeRepository employeeRepository) {

		//		SimpleMailMessage simpleMailMessage = new SimpleMailMessage();
		//		simpleMailMessage.setTo("amartyab@netwoven.com");
		//
		//		simpleMailMessage.setSubject("Testing from Spring Boot");
		//		simpleMailMessage.setText("Hello World \n Spring Boot Email");
		//
		//		javaMailSender.send(simpleMailMessage);
		System.out.println(employeeRepository);
		try {

			return employeeRepository.findAll();
		}
		catch(Exception e) {

			logger.log(Level.SEVERE, "Error while loading all employees - " + e.getMessage(), e);
		}

		return null;
	}



	public Employee addNewEmployee(EmployeeRepository employeeRepository,Employee employee) {

		try {

			logger.log(Level.INFO, "Saving Employee - ",employee);

			employeeRepository.save(employee);
		}
		catch(Exception e) {

			logger.log(Level.SEVERE, "Error While Saving Contact - "+e.getMessage(), e);
		}

		return employee;
	}


	public Map<String, Object> viewEmployee(EmployeeRepository employeeRepository,String id) {

		Map<String, Object> employeeMap = new HashMap<String, Object>();
		try {
			Employee employee = UtilService.getEmployeeObject(id, employeeRepository);

			employeeMap.put("id", employee.getId());
			employeeMap.put("employeeId", employee.getEmployeeId());
			employeeMap.put("firstName", employee.getFirstName());
			employeeMap.put("lastName", employee.getLastName());
			employeeMap.put("address", employee.getAddress());
			employeeMap.put("phone", employee.getPhone());
			employeeMap.put("email", employee.getEmail());
			employeeMap.put("role", employee.getRole());
			employeeMap.put("laptopId", employee.getLaptopId());
			employeeMap.put("department", employee.getDepartment());


		}
		catch(Exception e) {

			logger.log(Level.SEVERE, "Error While viewing Employee Details - "+e.getMessage(), e);
		}
		return employeeMap;
	}


	public Employee updateEmployee(EmployeeRepository employeeRepository,String id,Employee employee) {
		Employee c = null;
		try {

			c = UtilService.getEmployeeObject(id, employeeRepository);

			if(employee.getFirstName() != null)
				c.setFirstName(employee.getFirstName());
			if(employee.getLastName() != null)
				c.setLastName(employee.getLastName());
			if(employee.getAddress() != null)
				c.setAddress(employee.getAddress());

			if(employee.getPhone() != null)
				c.setPhone(employee.getPhone());
			if(employee.getEmail() != null)
				c.setEmail(employee.getEmail());
			if(employee.getLaptopId() != null)
				c.setLaptopId(employee.getLaptopId());
			if(employee.getDepartment() != null)
				c.setDepartment(employee.getDepartment());

			employeeRepository.save(c);

		} catch (Exception e) {
			logger.log(Level.SEVERE, "Error while updating employee - "+e.getMessage(), e);
		}

		return c;
	}

	/*public ResponseEntity<Resource> getContactImage(ContactRepository contactRepository,GridFsTemplate gridFsTemplate,String contactId) {

		try {
			Contact contact = UtilService.getContactObject(contactId, contactRepository);

			if (contact != null) {

				GridFSFile file = gridFsTemplate.findOne(Query.query(Criteria.where("_id").is(contact.getContactImage())));

				if (file != null) {

					return ResponseEntity.ok()
							.contentLength(file.getLength())
							.body(gridFsTemplate.getResource(file));
				}
				else {
					logger.log(Level.WARNING, "Contact image yet not uploaded");
					return null;
				}
			}
			else {
				logger.log(Level.WARNING, "Contact is not present in database");
				return null;
			}
		}

		catch(Exception e) {
			logger.log(Level.SEVERE, "Error while getting files - " + e.getMessage(), e);
		}

		return null;

	}

	public Contact updateContactImage(ContactRepository contactRepository,GridFsTemplate gridFsTemplate,String id, MultipartFile file) {

		Contact contact = UtilService.getContactObject(id, contactRepository);

		DBObject dbObject = new BasicDBObject();
		dbObject.put("contact", "Spring Boot");

		try {
			gridFsTemplate.delete(Query.query(Criteria.where("_id").is(contact.getContactImage())));

			InputStream iamgeStream = new ByteArrayInputStream(file.getBytes());
			dbObject.put("type", "image");
			ObjectId contactImage = gridFsTemplate.store(iamgeStream, file.getOriginalFilename(), file.getContentType(), dbObject);
			contact.setContactImage(contactImage);
		} catch (IOException e) {

			logger.log(Level.SEVERE, "Error while updating contact image - "+e.getMessage(), e);
		}

		contactRepository.save(contact);
		return contact;
	}


*/
	public String deleteEmployee(EmployeeRepository employeeRepository,GridFsTemplate gridFsTemplate,String id) {

		try {
			Employee employee = UtilService.getEmployeeObject(id, employeeRepository);

			logger.log(Level.INFO,"Deleting Contact image");
			gridFsTemplate.delete(Query.query(Criteria.where("_id").is(employee.getEmployeeImage())));

			logger.log(Level.INFO,"Deleting Contact ");
			employeeRepository.delete(employee);

			return "Contact Deleted Successfully";

		}
		catch(Exception e) {
			logger.log(Level.SEVERE, "Error while deleting employee - "+e.getMessage(), e);
		}

		return "Unable to Delete Contact";
	}
}
