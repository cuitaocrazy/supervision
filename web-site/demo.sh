#!/bin/bash
MODE=$1

function start() {
    echo "start all demo"
    docker compose -f ./docker/docker-compose-demo.yaml up -d --remove-orphans

    waitStartComplete consumer
    waitStartComplete edu
    waitStartComplete edb
}

function cleanWebModule() {
    local path=$1
    rm -rf ./$path/.next
}

function stop() {
    echo "stop all demo"
    docker compose -f ./docker/docker-compose-demo.yaml down -v
    rm -rf ./serverUSV/dist
    cleanWebModule regulator-mag-ionic
    cleanWebModule consumerdemo
    cleanWebModule eduMag
}

function doCheck() {
    local parameter=$1
    local name
    local url
    if [ "${parameter}" == "consumer" ]; then
        name="消费者"
        url="http://localhost:8080/consumer"
    elif [ "${parameter}" == "edu" ]; then
        name="教育端"
        url="http://localhost:8080/edu"
    elif [ "${parameter}" == "edb" ]; then
        name="监管端"
        url="http://localhost:8080/edb"
    else
        echo "error parameter, [ consumer | edu | edb ]"
        exit 1
    fi

    while [ true ]; do
        local code=$(curl -o /dev/null -s -w "%{http_code}\n" $url)
        if [ "$code" == "200" ]; then
            echo "$name 启动成功: $url"
            break
        else
            echo "$name 启动未完成: $code , 5秒后重试"
            sleep 5
        fi
    done
}

function check() {
    doCheck "consumer"
    doCheck "edu"
    doCheck "edb"
}

if [ "${MODE}" == "start" ]; then
    start
    check
elif [ "${MODE}" == "stop" ]; then
    stop
elif [ "${MODE}" == "check" ]; then
    check
else
    echo "you need parameter, [ start | stop | check ]"
fi
