package com.sds.lifeguard_server.domain;

import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name="ad")
@Getter
@ToString
@NoArgsConstructor
public class AD {
    @Id
    @Column(name = "ad_id",length = 50)
    private Integer ad_id;

    @Column(name = "ad_name",nullable = false,length = 50)
    private String ad_name;

    @Column(name="ad_url",nullable = false)
    private String ad_url;

    @Column(name="created_at")
    private LocalDateTime created_at;

    @Column(name="updated_at")
    private LocalDateTime updated_at;

    @Builder
    public AD(Integer id, String name, String url, LocalDateTime created_at, LocalDateTime updated_at){
        this.ad_id=id;
        this.ad_name=name;
        this.ad_url=url;
        this.created_at=created_at;
        this.updated_at=updated_at;
    }
}

