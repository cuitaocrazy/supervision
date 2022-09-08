#/bin/bash
export MODE=$1

function run() {
    npm install --registry=https://registry.npmmirror.com --force
    if [ "$MODE" == "server" ]; then
        npm run dev
    elif [ "$MODE" == "consumer" ]; then
        npx next build
        npx next start -p 3000
    elif [ "$MODE" == "edu" ]; then
        npx next build
        npx next start -p 3001
    elif [ "$MODE" == "edb" ]; then
        npx next build
        npx next start -p 3002
    else
        echo "parameter must be [ server | consumer | edu | edb ]"
        exit '1'
    fi
}

run
