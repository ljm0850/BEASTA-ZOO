FROM openjdk:8-jdk-alpine

# jar 파일 경로는 직접 입력해주세요.
COPY build/libs/JAV-0.0.1-SNAPSHOT.jar app.jar

## 배포용 properties 실행 명령어
ENTRYPOINT ["java","-jar","app.jar"]