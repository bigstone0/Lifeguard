package com.sds.lifeguard_server.controller;

import com.sds.lifeguard_server.repository.LifeguardRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

@RestController
public class QRController {

    @GetMapping("/qr")
    public ModelAndView qr(){

        return new ModelAndView("index");
    }
}
