package com.codebrewers.frontdesk.models;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;

public class Users {

	@Id
	public ObjectId _id;
	
	public String username;
	public String password;
	public String role;
	
	public Users() {
		
	}

	public Users(ObjectId _id, String username, String password, String roles) {
		super();
		this._id = _id;
		this.username = username;
		this.password = password;
	}

	public String get_id() {
		return this._id.toHexString();
	}

	public void set_id(ObjectId _id) {
		this._id = _id;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}
	
	public String getRole() {
		return role;
	}
	
	public void setRole(String role) {
		this.role = role;
	}
	
	@Override
	public String toString() {
		return "User Name - " + this.getUsername() + ", Password - " + this.getPassword();
	}
	

}
