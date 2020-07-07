package com.codebrewers.frontdesk.repositories;

import com.codebrewers.frontdesk.models.Security;
import org.springframework.data.repository.CrudRepository;

public interface  SecurityRepository extends CrudRepository<Security, String> {

    @Override
    void delete(Security deleted);
}
