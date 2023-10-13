package com.sds.lifeguard_server.service;

import javax.validation.constraints.NotNull;
import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;

public class socketService {
    public static void main(String args[]) throws Exception{

        ProcessBuilder builder;
        BufferedReader br;

        builder=new ProcessBuilder("python3","arduino_serial.py");

        builder.redirectErrorStream(true);

        Process process= builder.start();

        int exitval= process.waitFor();

        br=new BufferedReader(new InputStreamReader(process.getInputStream(),"UTF-8"));

        String line;
        while((line=br.readLine())!=null){
            System.out.println(">>> "+line);
        }

        if(exitval!=0){
            System.out.println("종료");
        }

    }
}
