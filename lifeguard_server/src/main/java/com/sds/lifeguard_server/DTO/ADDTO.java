package com.sds.lifeguard_server.DTO;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDateTime;

@NoArgsConstructor
@ToString
public class ADDTO {
    private @Getter @Setter Integer ad_id;
    private @Getter @Setter String ad_name;
    private @Getter @Setter String ad_url;
    private @Getter @Setter LocalDateTime created_at;
    private @Getter @Setter LocalDateTime updated_at;
}