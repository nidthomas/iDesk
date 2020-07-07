package com.codebrewers.frontdesk.service;

import java.util.Map;

import org.springframework.core.io.Resource;
import org.springframework.data.mongodb.gridfs.GridFsTemplate;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import com.codebrewers.frontdesk.dao.ContactDao;
import com.codebrewers.frontdesk.models.Contact;
import com.codebrewers.frontdesk.repositories.ContactRepository;

public class ContactService {

	public Iterable<Contact> loadAllContacts(ContactRepository contactRepository) {

		return new ContactDao().loadAllContacts(contactRepository);
	}

	public Contact addnewContact(ContactRepository contactRepository,Contact contact) {

		return new ContactDao().addnewContact(contactRepository, contact);
	}


	public Map<String, Object> viewContact(ContactRepository contactRepository,String id) {

		return new ContactDao().viewContact(contactRepository, id);
	}


	public Contact updateContact(ContactRepository contactRepository,String id,Contact contact) {

		return new ContactDao().updateContact(contactRepository, id, contact);
	}

	public ResponseEntity<Resource> getContactImage(ContactRepository contactRepository,GridFsTemplate gridFsTemplate,String contactId) {

		return new ContactDao().getContactImage(contactRepository, gridFsTemplate, contactId);

	}
	
	public Contact updateContactImage(ContactRepository contactRepository, GridFsTemplate gridFsTemplate,String id, MultipartFile file) {
		
		return new ContactDao().updateContactImage(contactRepository, gridFsTemplate, id, file);
	
	}

	public String deleteContact(ContactRepository contactRepository,GridFsTemplate gridFsTemplate,String id) {
		
		return new ContactDao().deleteContact(contactRepository, gridFsTemplate, id);
	
	}
	
}
