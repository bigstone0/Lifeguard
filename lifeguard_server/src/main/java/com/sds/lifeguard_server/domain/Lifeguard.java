package com.sds.lifeguard_server.domain;

import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name="lifeguard")
@Getter
@ToString
@NoArgsConstructor
public class Lifeguard {
    @Id
    @Column(name = "lifeguard_id",length = 50)
    private Integer lifeguard_id;

    @Column(name = "lifeguard_name",nullable = false,length = 50)
    private String lifeguard_name;

    @Column(name="lifeguard_address",nullable = false)
    private String lifeguard_address;

    @Column(name="door_status")
    private String door_status;

    @Column(name="inner_status")
    private String inner_status;

    @Column(name="video")
    private String video;

    @Column(name="created_at")
    private LocalDateTime created_at;

    @Column(name="updated_at")
    private LocalDateTime updated_at;

    @Builder
    public Lifeguard(Integer id, String name, String address, String door_status, String inner_status, LocalDateTime created_at, LocalDateTime updated_at){
        this.lifeguard_id=id;
        this.lifeguard_name=name;
        this.lifeguard_address=address;
        this.door_status=door_status;
        this.inner_status=inner_status;
        this.created_at=created_at;
        this.updated_at=updated_at;
    }
}

