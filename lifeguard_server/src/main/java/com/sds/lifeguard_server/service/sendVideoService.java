package com.sds.lifeguard_server.service;

import java.io.BufferedReader;
import java.io.InputStreamReader;

public class sendVideoService {
    public static void video(String message) throws Exception{
        ProcessBuilder builder;
        BufferedReader br;

        if(message.equals("safety_rulse.mp4")){
            builder=new ProcessBuilder("python3","send_video.py","safety");
        } else if (message.equals("advertise.mp4")) {
            builder=new ProcessBuilder("python3","send_video.py","advertise");
        } else if (message.equals("caution_level.mp4")) {
            builder=new ProcessBuilder("python3","send_video.py","low");
        } else if (message.equals("alert_level.mp4")) {
            builder=new ProcessBuilder("python3","send_video.py","middle");
        } else if (message.equals("serious_level.mp4")) {
            builder=new ProcessBuilder("python3","send_video.py","high");
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
