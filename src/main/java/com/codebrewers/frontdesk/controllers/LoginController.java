package com.codebrewers.frontdesk.controllers;


import com.codebrewers.frontdesk.models.Login;
import com.codebrewers.frontdesk.repositories.SecurityRepository;
import com.codebrewers.frontdesk.service.SecurityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;


@RestController
public class LoginController {

	@Autowired
	SecurityRepository securityRepository;

	@RequestMapping(method = {RequestMethod.POST }, value="/login")
	public boolean auth(@RequestBody Login login) {
		return new SecurityService().authSecurity(securityRepository,login.getEmpId(),login.getPassword());
	}
}