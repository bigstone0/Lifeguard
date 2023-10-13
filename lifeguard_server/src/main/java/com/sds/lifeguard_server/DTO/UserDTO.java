package com.sds.lifeguard_server.DTO;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDateTime;

@NoArgsConstructor
@ToString
public class UserDTO {
    private @Getter @Setter String user_id;
    private @Getter @Setter String user_pw;
    private @Getter @Setter String user_name;
    private @Getter @Setter String user_phone;
    private @Getter @Setter String user_email;
    private @Getter @Setter LocalDateTime created_at;
    private @Getter @Setter LocalDateTime updated_at;
}