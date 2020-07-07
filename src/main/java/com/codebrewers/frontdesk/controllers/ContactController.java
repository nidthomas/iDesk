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

import com.codebrewers.frontdesk.models.Contact;
import com.codebrewers.frontdesk.repositories.ContactRepository;
import com.codebrewers.frontdesk.service.ContactService;

@RestController
public class ContactController {

	@Autowired
	ContactRepository contactRepository;

	@Autowired
	GridFsOperations gridOperations;

	@Autowired
	GridFsTemplate gridFsTemplate;


	
	
	@RequestMapping(method=RequestMethod.GET, value="/contacts")
	public Iterable<Contact> loadAllContacts() {

		return new ContactService().loadAllContacts(contactRepository);
	}

	@RequestMapping(method=RequestMethod.POST, value="/contacts")
	public Contact addnewContact(@RequestBody Contact contact) {

		return new ContactService().addnewContact(contactRepository, contact);
	}

	@RequestMapping(method=RequestMethod.GET, value="/contacts/{id}")
	public Map<String, Object> viewContact(@PathVariable String id) {

		return new ContactService().viewContact(contactRepository, id);
	}

	@RequestMapping(method=RequestMethod.PUT, value="/contacts/{id}")
	public Contact updateContact(@PathVariable String id, @RequestBody Contact contact) {
		
		return new ContactService().updateContact(contactRepository, id, contact);
	
	}

	@RequestMapping(method=RequestMethod.GET, value="/file/{contactId}")
	public ResponseEntity<Resource> getContactImage(@PathVariable String contactId) {
		
		return new ContactService().getContactImage(contactRepository, gridFsTemplate, contactId);
	}

	@RequestMapping(method=RequestMethod.POST, value="/contact/upload/{id}")
	public Contact updateContactImage(@PathVariable String id, @RequestParam("file") MultipartFile file) {
		
		return new ContactService().updateContactImage(contactRepository, gridFsTemplate, id, file);
	
	}

	@RequestMapping(method=RequestMethod.DELETE, value="/contacts/{id}")
	public String deleteContact(@PathVariable String id) {
		
		return new ContactService().deleteContact(contactRepository, gridFsTemplate, id);

	}

	
}