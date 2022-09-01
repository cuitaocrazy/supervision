# DEMO的使用过程
- 下载代码
    ```shell
    git clone --depth 1 git@github.com:cuitaocrazy/supervision.git
    ```
- (可选)打包代码
    ```shell
    tar cvzf supervision.tar.gz ./supervision
    ```
- 上传代码
    ```shell
    scp supervision.tar.gz root@123.57.204.124:~/
    ```
- 解压代码
    ```shell
    tar xvzf supervision.tar.gz
    ```
- 进入demo目录
    ```shell
    cd ~/supervision/web-site
    ```
- 启动demo
    ```shell
    ./demo.sh start
    ```
- 等待控制台提示如下成功信息
    ```shell
    xxx 启动成功: http://xxxxxx:8080
    ```
    如果提示其他, 则程序可能未启动完成或启动失败.
- (可选)停止demo
    ```shell
    ./demo.sh stop
    ```