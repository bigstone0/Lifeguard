package com.sds.lifeguard_server.repository;

import com.sds.lifeguard_server.domain.User;
import org.springframework.data.repository.CrudRepository;

public interface UserRepository extends CrudRepository<User,String> {
}
