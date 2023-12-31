package com.sds.lifeguard_server.repository;

import com.sds.lifeguard_server.domain.Lifeguard;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import javax.transaction.Transactional;
import java.util.List;

public interface LifeguardRepository extends JpaRepository<Lifeguard,String> {
    @Query(value="SELECT door_status FROM lifeguard",nativeQuery = true)
    List<String> selectdoorstatus();

    @Query(value="SELECT inner_status FROM lifeguard",nativeQuery = true)
    List<String> selectinnerstatus();

    @Query(value="SELECT lifeguard_name FROM lifeguard",nativeQuery = true)
    List<String> lifeguardname();

    @Modifying
    @Transactional
    @Query(value="UPDATE lifeguard l SET l.door_status= :open",nativeQuery = true)
    void allopen(@Param("open") String open);

    @Modifying
    @Transactional
    @Query(value="UPDATE lifeguard l SET l.door_status = :door_status WHERE l.lifeguard_name = :name",nativeQuery = true)
    void doorclose(@Param("name") String name, @Param("door_status") String door_status);

    @Modifying
    @Transactional
    @Query(value="UPDATE lifeguard l SET l.inner_status = :inner_status WHERE l.lifeguard_name = :name",nativeQuery = true)
    void innerchange(@Param("name") String name, @Param("inner_status") String inner_status);

    @Modifying
    @Transactional
    @Query(value="UPDATE lifeguard l SET l.video=:video WHERE l.lifeguard_name=:name",nativeQuery = true)
    void currentvideo(@Param("video") String video,@Param("name") String name);

    @Query(value="SELECT door_status FROM lifeguard WHERE lifeguard_name=:name",nativeQuery = true)
    String namedoorState(@Param("name")String name);

    @Query(value="SELECT inner_status FROM lifeguard WHERE lifeguard_name=:name",nativeQuery = true)
    String nameinnerState(@Param("name")String name);
}
