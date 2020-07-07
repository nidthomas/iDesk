package com.codebrewers.frontdesk.controllers;


import com.codebrewers.frontdesk.models.Security;
import com.codebrewers.frontdesk.repositories.SecurityRepository;

import com.codebrewers.frontdesk.service.SecurityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.gridfs.GridFsOperations;
import org.springframework.data.mongodb.gridfs.GridFsTemplate;
import org.springframework.web.bind.annotation.*;


import java.util.Map;

@RestController
public class SecurityController {

    @Autowired
    SecurityRepository securityRepository;

    @Autowired
    GridFsOperations gridOperations;

    @Autowired
    GridFsTemplate gridFsTemplate;

    @RequestMapping(method= RequestMethod.GET, value="/securities")
    public Iterable<Security> loadAllSecurities() {

        return new SecurityService().loadAllSecurities(securityRepository);

    }

    @RequestMapping(method=RequestMethod.POST, value="/securities")
    public Security addnewSecurity(@RequestBody Security security) {

        return new SecurityService().addnewSecurity(securityRepository,security);
    }

    @RequestMapping(method=RequestMethod.GET, value="/securities/{id}")
    public Map<String, Object> viewContact(@PathVariable String id) {

        return new SecurityService().viewSecurity(securityRepository, id);
    }


    @RequestMapping(method=RequestMethod.DELETE, value="/securities/{id}")
    public String deleteSecurity(@PathVariable String id) {

        return new SecurityService().deleteSecurity(securityRepository, id);

    }

    @RequestMapping(method=RequestMethod.PUT, value="/securities/{id}")
    public Security updateContact(@PathVariable String id, @RequestBody Security security) {

        return new SecurityService().updateSecurity(securityRepository, id, security);

    }
}
