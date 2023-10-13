package com.sds.lifeguard_server.service;

import java.io.BufferedReader;
import java.io.InputStreamReader;

public class sendAllOpenService {
    public static void allopen() throws Exception{
        ProcessBuilder builder;
        BufferedReader br;

        builder=new ProcessBuilder("python3","send_args.py","ao");

        builder.redirectErrorStream(true);

        Process process= builder.start();

        int exitval= process.waitFor();

        br=new BufferedReader(new InputStreamReader(process.getInputStream(),"UTF-8"));

        String line,line1;
        while((line=br.readLine())!=null){
            System.out.println(">>> "+line);
        }

        if(exitval!=0){
            System.out.println("종료");
        }

    }
}
