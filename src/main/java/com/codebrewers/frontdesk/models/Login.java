package com.codebrewers.frontdesk.models;

public class Login {

	public String empId;
	public String password;

	public Login() {

	}

	public Login(String empId, String password) {
		super();
		this.empId = empId;
		this.password = password;
	}

	public String getEmpId() {
		return empId;
	}

	public void setEmpId(String empId) {
		this.empId = empId;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	@Override
	public String toString() {
		return "User Name - " + this.getEmpId() + ", Password - " + this.getPassword();
	}
	

}
