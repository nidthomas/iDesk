package com.codebrewers.frontdesk.repositories;

import org.springframework.data.repository.CrudRepository;

import com.codebrewers.frontdesk.models.Contact;

public interface ContactRepository extends CrudRepository<Contact, String> {
	/*@Override
	void delete(Contact deleted);*/
}
