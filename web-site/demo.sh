#!/bin/bash
MODE=$1

function replaceAddr() {
    export $(xargs <./docker/.env)
    sed -i "s/http:\/\/\([0-9]\+\.\)\+[0-9]\+/http:\/\/${host}/g" ./docker/html/index.html
    # sed -n "/http:\/\/\([0-9]\+\.\)\+[0-9]\+/p" ./docker/html/index.html
}

function chmodDir() {
    local user=$USER
    if [ "$USER" == "root" ]; then
        chmod 777 ./serverUSV
        chmod 777 ./consumerdemo
        chmod 777 ./eduMag
        chmod 777 ./regulator-mag-ionic
        chmod 777 ./consumer-pc
    else
        echo "non root user, skip chmod dir"
    fi
}

function start() {
    echo "start all demo"
    replaceAddr
    chmodDir
    docker compose -f ./docker/docker-compose-demo.yaml up -d --remove-orphans
}

function cleanWebModule() {
    local path=$1
    rm -rf ./$path/.next
    rm -rf ./$path/node_modules
}

function cleanServer() {
    rm -rf ./serverUSV/dist
    rm -rf ./serverUSV/node_modules
}

function stop() {
    echo "stop all demo"
    docker compose -f ./docker/docker-compose-demo.yaml down -v
    cleanServer
    cleanWebModule regulator-mag-ionic
    cleanWebModule consumerdemo
    cleanWebModule eduMag
    cleanWebModule consumer-pc
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
    elif [ "${parameter}" == "consumerpc" ]; then
        name="消费者pc"
        url="http://localhost:8080/consumerpc"
    else
        echo "error parameter, [ consumer | edu | edb | consumerpc]"
        exit 1
    fi

    while [ true ]; do
        local code=$(curl -o /dev/null -s -w "%{http_code}\n" $url)
        if [ "$code" == "200" ]; then
            echo "$name 启动成功: $url"
            break
        else
            echo "$name 启动未完成: $code , 10秒后再看"
            sleep 10
        fi
    done
}

function check() {
    doCheck "consumer"
    doCheck "edu"
    doCheck "edb"
    doCheck "consumerpc"
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
