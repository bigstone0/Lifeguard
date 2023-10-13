package com.sds.lifeguard_server.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
@RequiredArgsConstructor
public class QRController {
    @GetMapping("/qr")
    public String qr(@RequestParam("qrCheck") String qrCheck){
        return qrCheck;
    }
}
