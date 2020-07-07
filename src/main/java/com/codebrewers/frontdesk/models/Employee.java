package com.codebrewers.frontdesk.models;


import org.bson.types.ObjectId;
import org.hibernate.validator.constraints.UniqueElements;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "employee")
public class Employee {
    @Id
    String id;
    @UniqueElements
    String employeeId;
    String firstName;
    String lastName;
    String address;
    String phone;
    String email;
    String role;
    String laptopId;
    ObjectId employeeImage;
    String department;


    public Employee() {
    }


    public Employee(String id, String firstName, String lastName, String address, String phone, String email, String role, String laptopId, ObjectId employeeImage, String employeeId, String department) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.address = address;
        this.phone = phone;
        this.email = email;
        this.role = role;
        this.laptopId = laptopId;
        this.employeeImage = employeeImage;
        this.employeeId = employeeId;
        this.department = department;
    }


    public void setDepartment(String department) {
        this.department = department;
    }

    public String getDepartment() {
        return department;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getEmployeeId() {
        return employeeId;
    }

    public void setEmployeeId(String employeeId) {
        this.employeeId = employeeId;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public void setLaptopId(String laptopId) {
        this.laptopId = laptopId;
    }

    public String getId() {
        return id;
    }

    public void setEmployeeImage(ObjectId employeeImage) {
        this.employeeImage = employeeImage;
    }

    public String getFirstName() {
        return firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public ObjectId getEmployeeImage() {
        return employeeImage;
    }

    public String getAddress() {
        return address;
    }

    public String getPhone() {
        return phone;
    }

    public String getEmail() {
        return email;
    }

    public String getRole() {
        return role;
    }

    public String getLaptopId() {
        return laptopId;
    }

    @Override
    public String toString() {
        return ("Employee - " + this.getFirstName()+this.getLastName() + this.getAddress() + this.getEmail());
    }


}