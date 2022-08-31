#!/bin/bash
MODE=$1

function start() {
    echo "start all demo"
    docker-compose -f ./docker/docker-compose-demo.yaml up -d --remove-orphans
    echo "消费者端: http://localhost:8080/consumer"
    echo "教育机构端: http://localhost:8080/edu"
    echo "监管端: http://localhost:8080/edb"
}

function cleanWebModule() {
    local path=$1
    rm -rf ./$path/.next
}

function stop() {
    echo "stop all demo"
    docker-compose -f ./docker/docker-compose-demo.yaml down -v
    rm -rf ./serverUSV/dist
    cleanWebModule regulator-mag-ionic
    cleanWebModule consumerdemo
    cleanWebModule eduMag
}

if [ "${MODE}" == "start" ]; then
    start
elif [ "${MODE}" == "stop" ]; then
    stop
else
    echo "you need parameter, [ start | stop ]"
fi
