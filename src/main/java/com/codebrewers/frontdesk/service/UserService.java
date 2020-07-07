package com.codebrewers.frontdesk.service;

import com.codebrewers.frontdesk.dao.UserDao;
import com.codebrewers.frontdesk.models.Users;

public class UserService {

	
	public Users save(Users users) {
		
		UserDao userDao = new UserDao();
		
		return userDao.save(users);
	}
	
}
