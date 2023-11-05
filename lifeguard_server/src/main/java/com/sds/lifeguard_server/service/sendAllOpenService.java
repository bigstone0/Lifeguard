package com.sds.lifeguard_server.service;

import java.io.BufferedReader;
import java.io.InputStreamReader;

public class sendAllOpenService {
    public static void allopen(String video) throws Exception{
        ProcessBuilder builder;
        BufferedReader br;

        if(video.equals("open.mp4")){
            builder=new ProcessBuilder("python3","send_args.py","s");
        } else if (video.equals("caution_level.mp4")) {
            builder=new ProcessBuilder("python3","send_args.py","l");
        } else if (video.equals("alert_level.mp4")) {
            builder = new ProcessBuilder("python3", "send_args.py", "m");
        } else {
            System.out.println("fail");
            return;
        }

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
