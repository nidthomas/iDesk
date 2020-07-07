package com.codebrewers.frontdesk.dao;



import com.codebrewers.frontdesk.models.Security;
import com.codebrewers.frontdesk.repositories.SecurityRepository;
import com.codebrewers.frontdesk.util.UtilService;


import java.util.HashMap;
import java.util.Map;
import java.util.Objects;
import java.util.logging.Level;
import java.util.logging.Logger;

public class SecurityDao {

    Logger logger = UtilService.getLoggerObject(this.getClass().getName());
    public Iterable<Security> loadAllSecurities(SecurityRepository  securityRepository) {

        //		SimpleMailMessage simpleMailMessage = new SimpleMailMessage();
        //		simpleMailMessage.setTo("amartyab@netwoven.com");
        //
        //		simpleMailMessage.setSubject("Testing from Spring Boot");
        //		simpleMailMessage.setText("Hello World \n Spring Boot Email");
        //
        //		javaMailSender.send(simpleMailMessage);
        System.out.println(securityRepository);
        try {

            return securityRepository.findAll();
        }
        catch(Exception e) {

            logger.log(Level.SEVERE, "Error while loading all Security details  - " + e.getMessage(), e);
        }

        return null;
    }



    public Security addnewSecurity(SecurityRepository securityRepository,Security security) {

        if (UtilService.getSecurityObject(security.getId(), securityRepository) != null) {
            return null;
        } else {
            try {

                logger.log(Level.INFO, "Saving Security - ", security);

                securityRepository.save(security);
            } catch (Exception e) {

                logger.log(Level.SEVERE, "Error While Saving security - " + e.getMessage(), e);
            }

            return security;
        }
    }


    public Map<String, Object> viewSecurity(SecurityRepository securityRepository, String id) {

        Map<String, Object> securityMap = new HashMap<String, Object>();
        try {
            Security security = UtilService.getSecurityObject(id, securityRepository);

            securityMap.put("id", security.getId());
            securityMap.put("name", security.getName());
            securityMap.put("password", security.getPassword());
            securityMap.put("location", security.getLocation());
            securityMap.put("buildingNo", security.getbuildingNo());
            securityMap.put("phone", security.getPhone());
            securityMap.put("email", security.getEmail());


        }
        catch(Exception e) {

            logger.log(Level.SEVERE, "Error While viewing Security - "+e.getMessage(), e);
        }
        return securityMap;
    }

    public Security updateSecurity(SecurityRepository securityRepository,String id,Security security) {
        Security s = null;
        try {

            s = UtilService.getSecurityObject(id, securityRepository);

            if(security.getName() != null)
                s.setName(security.getName());
            if(security.getPassword() != null)
                s.setPassword(security.getPassword());
            if(security.getLocation() != null)
                s.setLocation(security.getLocation());
            if(security.getPhone() != null)
                s.setPhone(security.getPhone());
            if(security.getEmail() != null)
                s.setEmail(security.getEmail());
            if(security.getbuildingNo()!= null)
                s.setbuildingNo(security.getbuildingNo());
            securityRepository.save(s);

        } catch (Exception e) {
            logger.log(Level.SEVERE, "Error while updating security - "+e.getMessage(), e);
        }

        return s;
    }

    public String deleteSecurity(SecurityRepository securityRepository, String id) {

        try {
            Security security = UtilService.getSecurityObject(id, securityRepository);



            logger.log(Level.INFO,"Deleting security ");
            securityRepository.delete(security);

            return "Security Deleted Successfully";

        }
        catch(Exception e) {
            logger.log(Level.SEVERE, "Error while deleting security - "+e.getMessage(), e);
        }

        return "Unable to Delete security";
    }

    public boolean authSecurity(SecurityRepository securityRepository, String empId, String password) {
        Security security = UtilService.getSecurityObject(empId, securityRepository);
            return security != null && security.getPassword().equals(password);
    }
}
