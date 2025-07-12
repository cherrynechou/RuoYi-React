#!/bin/bash

JAVA_OPTS="-Xms256m -Xmx1024m -XX:MetaspaceSize=128m -XX:MaxMetaspaceSize=512m"

java -jar $JAVA_OPTS ruoyi-admin.jar --spring.profiles.active=prod