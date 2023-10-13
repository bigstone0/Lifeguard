package com.sds.lifeguard_server.controller;

import com.sds.lifeguard_server.repository.LifeguardRepository;
import com.sds.lifeguard_server.repository.MemberRepository;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import com.sds.lifeguard_server.service.*;

import java.util.List;

@RestController
@NoArgsConstructor
public class LifeguardController{

    @Autowired
    LifeguardRepository lifeguardRepository;
    @GetMapping("/lifeguard/doorState")
    public List<String> doorState(){
        List<String> doors=lifeguardRepository.selectdoorstatus();
        return doors;
    }

    @GetMapping("/lifeguard/innerState")
    public List<String> innerState(){
        List<String> inners=lifeguardRepository.selectinnerstatus();
        return inners;
    }

    @GetMapping("/lifeguard/name")
    public List<String> lifeguardName(){
        List<String> name=lifeguardRepository.lifeguardname();
        return name;
    }

    @GetMapping("/lifeguard/doorclose")
    public void Close(@RequestParam String name,@RequestParam String doorState) throws Exception {
        lifeguardRepository.doorclose(name,doorState);
        if(doorState.equals("open")){
            sendOpenService.open();
        }
        else if(doorState.equals("closed")){
            sendCloseService.close();
        }
        System.out.println("name="+name+"state"+doorState);
    }

    @GetMapping("/lifeguard/alldooropen")
    public List<String> allOpen() throws Exception{
        lifeguardRepository.allopen("open");
        sendAllOpenService.allopen();
        List<String> d_status=lifeguardRepository.selectdoorstatus();
        return d_status;
    }
}
