package com.codebrewers.frontdesk.service;

import com.codebrewers.frontdesk.dao.SecurityDao;
import com.codebrewers.frontdesk.models.Security;
import com.codebrewers.frontdesk.repositories.SecurityRepository;

import java.util.Map;

public class SecurityService {

    public Iterable<Security> loadAllSecurities(SecurityRepository securityRepository) {

        return new SecurityDao().loadAllSecurities(securityRepository);
    }

    public Security addnewSecurity(SecurityRepository securityRepository,Security security) {

        return new SecurityDao().addnewSecurity(securityRepository,security);
    }


    public Map<String, Object> viewSecurity(SecurityRepository securityRepository, String id) {

        return new SecurityDao().viewSecurity(securityRepository, id);
    }

    public String deleteSecurity(SecurityRepository securityRepository,String id) {

        return new SecurityDao().deleteSecurity(securityRepository, id);

    }

    public Security updateSecurity(SecurityRepository securityRepository,String id,Security security) {

        return new SecurityDao().updateSecurity(securityRepository, id, security);
    }

    public boolean authSecurity(SecurityRepository securityRepository,String empId, String password) {
        return new SecurityDao().authSecurity(securityRepository, empId, password);
    }
}
