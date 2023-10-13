package com.sds.lifeguard_server.DTO;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDateTime;

@NoArgsConstructor
@ToString
public class MemberDTO {
    private @Getter @Setter String member_id;
    private @Getter @Setter String member_pw;
    private @Getter @Setter String member_name;
    private @Getter @Setter String member_phone;
    private @Getter @Setter String member_email;
    private @Getter @Setter LocalDateTime created_at;
    private @Getter @Setter LocalDateTime updated_at;
}
