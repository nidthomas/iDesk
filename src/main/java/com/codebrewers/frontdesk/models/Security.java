package com.codebrewers.frontdesk.models;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "security")
public class Security {

        @Id
        String id;
        String name;
        String password;
        String email;
        String phone;
        String location;
        String buildingNo;



        public Security() {
        }

        public Security(String name, String password, String email, String phone, String location, String buildingNo)
        {}

        public String getId() {
            return id;
        }

        public void setId(String id) {
            this.id = id;
        }

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }

        public String getPassword() {
            return password;
        }

        public void setPassword(String password) {
            this.password = password;
        }

        public String getLocation() {
            return location;
        }

        public void setLocation(String location) {
            this.location = location;
        }

        public String getPhone() {
            return phone;
        }

        public void setPhone(String phone) {
            this.phone = phone;
        }

        public String getbuildingNo() {
            return buildingNo;
        }

        public void setbuildingNo(String buildingNo) {
            this.buildingNo = buildingNo;
        }

        public String getEmail() {
        return email;
    }

        public void setEmail(String email) {
        this.email = email;
    }



        @Override
        public String toString() {
            return ("Security - " + this.getName() + this.getLocation() + this.buildingNo);
        }

    }
