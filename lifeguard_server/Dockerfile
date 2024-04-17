FROM openjdk:11-jdk
WORKDIR /home/signizi_server
COPY build/libs/*.jar /home/signizi_server/server.jar
EXPOSE 8080
CMD ["java","-jar","/home/signizi_server/server.jar"]
