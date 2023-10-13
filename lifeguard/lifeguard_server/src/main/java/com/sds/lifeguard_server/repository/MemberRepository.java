package com.sds.lifeguard_server.repository;

import com.sds.lifeguard_server.domain.Member;
import org.springframework.data.repository.CrudRepository;

public interface MemberRepository extends CrudRepository<Member,String> {
}


