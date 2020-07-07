package com.codebrewers.frontdesk.controllers;

import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.codebrewers.frontdesk.models.Users;
import com.codebrewers.frontdesk.service.UserService;

@RestController
public class UserController {


	@RequestMapping(method=RequestMethod.POST, value="/users")
	public Users save(@RequestBody Users users) {
		
		UserService userService = new UserService();	

		return userService.save(users);
	}


	
}