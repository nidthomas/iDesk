package com.codebrewers.frontdesk.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.codebrewers.frontdesk.models.Users;

public interface UsersRepository extends MongoRepository<Users, String> {
	
	Users findByUsername(String username);

}
