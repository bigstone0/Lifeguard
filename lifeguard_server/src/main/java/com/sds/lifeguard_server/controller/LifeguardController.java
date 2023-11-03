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

    boolean flag=false;
    @Autowired
    LifeguardRepository lifeguardRepository;

    @GetMapping("/lifeguard/namedoorState")
    public String namedoorState(@RequestParam String name){
        String doorState= lifeguardRepository.namedoorState(name);
        return doorState;
    }

    @GetMapping("/lifeguard/nameinnerState")
    public String nameinnerState(@RequestParam String name){
        String innerState= lifeguardRepository.nameinnerState(name);
        return innerState;
    }
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
    public void Close(@RequestParam String name,@RequestParam String doorState,@RequestParam String innerState) throws Exception {
        lifeguardRepository.doorclose(name,doorState);
        if(doorState.equals("open")){
            sendOpenService.open();
        }
        else if(doorState.equals("closed")){
            lifeguardRepository.innerchange(name,innerState);
            sendCloseService.close();
        }
        System.out.println("name="+name+"state"+doorState);
    }

    @GetMapping("/lifeguard/serverdoorclose")
    public void serverClose(@RequestParam String name,@RequestParam String doorState) throws Exception {
        lifeguardRepository.doorclose(name,doorState);
        if(doorState.equals("open")){
            sendOpenService.open();
        }
        else if(doorState.equals("closed")){
            sendCloseService.close();
        }
        System.out.println("name="+name+"state"+doorState);
    }

    @GetMapping("/lifeguard/video")
    public void Video(@RequestParam String name,@RequestParam String video) throws Exception{
        sendVideoService.video(video);
        lifeguardRepository.currentvideo(video,name);
        System.out.println(video);
    }

    @GetMapping("/lifeguard/alldooropen")
    public List<String> allOpen(@RequestParam String video) throws Exception{
        lifeguardRepository.allopen("open");
        flag=false;
        sendVideoService.video(video);
        sendAllOpenService.allopen(video);
        List<String> d_status=lifeguardRepository.selectdoorstatus();
        return d_status;
    }

    @GetMapping("/lifeguard/alldooropen1")
    public List<String> allOpen1(@RequestParam String video) throws Exception{
        lifeguardRepository.allopen("open");
        flag=true;
        sendVideoService.video(video);
        sendAllOpenService.allopen(video);
        List<String> d_status=lifeguardRepository.selectdoorstatus();
        return d_status;
    }

    @GetMapping("/lifeguard/alldoorclosed")
    public List<String> allClosed(@RequestParam String video) throws Exception{
        lifeguardRepository.allopen("closed");
        flag=true;
        sendVideoService.video(video);
        sendAllCloseService.allclose(video);
        List<String> d_status=lifeguardRepository.selectdoorstatus();
        return d_status;
    }

    @GetMapping("/lifeguard/checkWarning")
    public boolean checkwarning(){
        System.out.println(flag);
        return flag;
    }
}
