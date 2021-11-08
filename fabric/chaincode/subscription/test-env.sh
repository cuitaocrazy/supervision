#!/bin/bash

function start() {
    MICROFAB_CONFIG='{"port":8080,  "endorsing_organizations": [{"name": "Bank"},{"name": "Edb"},{"name": "Edu1"},{"name": "Edu2"}],"channels": [{"name": "edb-supervision-channel","endorsing_organizations": ["Bank", "Edb", "Edu1", "Edu2"]}]}' docker run -e MICROFAB_CONFIG --label fabric-environment-name="edb Microfab" -d -p 8080:8080 --name edutest ibmcom/ibp-microfab:0.0.11
    echo "docker name 是 [edutest] 的 microfab 启动"
}

function stop() {
    docker stop edutest
    docker rm edutest
    echo "docker name 是 [edutest] 的 microfab 停止"
}

function printHelp() {
    echo "参数 start 或者 stop"
}

#解析命令参数
if [[ $# -lt 1 ]]; then
    printHelp
    exit 0
else
    MODE=$1
fi

if [ "${MODE}" == "start" ]; then
    start
elif [ "${MODE}"=="stop" ]; then
    stop
else
    printHelp
    exit 1
fi
