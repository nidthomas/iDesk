package com.codebrewers.frontdesk.dao;

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

import com.codebrewers.frontdesk.models.Contact;
import com.codebrewers.frontdesk.repositories.ContactRepository;
import com.codebrewers.frontdesk.util.UtilService;
import com.mongodb.BasicDBObject;
import com.mongodb.DBObject;
import com.mongodb.client.gridfs.model.GridFSFile;

public class ContactDao {


	//	@Autowired
	//	private JavaMailSender javaMailSender;
	
	Logger logger = UtilService.getLoggerObject(this.getClass().getName());

	public Iterable<Contact> loadAllContacts(ContactRepository contactRepository) {

		//		SimpleMailMessage simpleMailMessage = new SimpleMailMessage();
		//		simpleMailMessage.setTo("amartyab@netwoven.com");
		//
		//		simpleMailMessage.setSubject("Testing from Spring Boot");
		//		simpleMailMessage.setText("Hello World \n Spring Boot Email");
		//
		//		javaMailSender.send(simpleMailMessage);
		System.out.println(contactRepository);
		try {

			return contactRepository.findAll();
		}
		catch(Exception e) {

			logger.log(Level.SEVERE, "Error while loading all contacts - " + e.getMessage(), e);
		}

		return null;
	}



	public Contact addnewContact(ContactRepository contactRepository,Contact contact) {

		try {

			logger.log(Level.INFO, "Saving Contact - ",contact);

			contactRepository.save(contact);
		}
		catch(Exception e) {

			logger.log(Level.SEVERE, "Error While Saving Contact - "+e.getMessage(), e);
		}

		return contact;
	}


	public Map<String, Object> viewContact(ContactRepository contactRepository,String id) {

		Map<String, Object> contactMap = new HashMap<String, Object>();
		try {
			Contact contact = UtilService.getContactObject(id, contactRepository);

			contactMap.put("id", contact.getId());
			contactMap.put("name", contact.getName());
			contactMap.put("address", contact.getAddress());
			contactMap.put("city", contact.getCity());
			contactMap.put("phone", contact.getPhone());
			contactMap.put("email", contact.getEmail());


		}
		catch(Exception e) {

			logger.log(Level.SEVERE, "Error While viewing Contact - "+e.getMessage(), e);
		}
		return contactMap;
	}


	public Contact updateContact(ContactRepository contactRepository,String id,Contact contact) {
		Contact c = null;
		try {

			c = UtilService.getContactObject(id, contactRepository);

			if(contact.getName() != null)
				c.setName(contact.getName());
			if(contact.getAddress() != null)
				c.setAddress(contact.getAddress());
			if(contact.getCity() != null)
				c.setCity(contact.getCity());
			if(contact.getPhone() != null)
				c.setPhone(contact.getPhone());
			if(contact.getEmail() != null)
				c.setEmail(contact.getEmail());

			contactRepository.save(c);

		} catch (Exception e) {
			logger.log(Level.SEVERE, "Error while updating contact - "+e.getMessage(), e);
		}

		return c;
	}

	public ResponseEntity<Resource> getContactImage(ContactRepository contactRepository,GridFsTemplate gridFsTemplate,String contactId) {

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
	
	

	public String deleteContact(ContactRepository contactRepository,GridFsTemplate gridFsTemplate,String id) {
		
		try {
			Contact contact = UtilService.getContactObject(id, contactRepository);
			
			logger.log(Level.INFO,"Deleting Contact image");
			//gridFsTemplate.delete(Query.query(Criteria.where("_id").is(contact.getContactImage())));
			
			logger.log(Level.INFO,"Deleting Contact ");
			contactRepository.delete(contact);
			
			return "Contact Deleted Successfully";
			
		}
		catch(Exception e) {
			logger.log(Level.SEVERE, "Error while deleting contact - "+e.getMessage(), e);
		}

		return "Unable to Delete Contact";
	}
}
