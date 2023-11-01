package com.sds.lifeguard_server.DTO;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDateTime;

@NoArgsConstructor
@ToString
public class LifeguardDTO {
    private @Getter @Setter Integer lifeguard_id;
    private @Getter @Setter String lifeguard_name;
    private @Getter @Setter String lifeguard_address;
    private @Getter @Setter String door_status;
    private @Getter @Setter String inner_status;
    private @Getter @Setter String video;
    private @Getter @Setter LocalDateTime created_at;
    private @Getter @Setter LocalDateTime updated_at;
}
