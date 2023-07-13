# DEMO的使用过程
## 本地执行过程（ubuntu)
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
    scp supervision.tar.gz root@123.57.226.90:~/
    ```
## 服务器安装docker过程(debian)
- 更新apt包索引，并安装apt通过https安装包的基础包
    ```shell
    sudo apt-get update
    sudo apt-get install \
        ca-certificates \
        curl \
        gnupg \
        lsb-release
    ```
- 添加docker官方的GPG密钥
    ```shell
    sudo mkdir -p /etc/apt/keyrings
    curl -fsSL https://download.docker.com/linux/debian/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
    ```
- 装载仓库
    ```shell
    echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/debian \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
    ```
- 安装 docker
    ```shell
    sudo apt-get update
    sudo apt-get install docker-ce docker-ce-cli containerd.io docker-compose-plugin
    ```
## 服务器执行过程(debian)
- 解压代码
    ```shell
    tar xvzf supervision.tar.gz
    ```
- 进入demo目录
    ```shell
    cd ~/supervision/web-site
    ```
- （可选）修改服务器公网域名或IP
    ```shell
    # 注意该文件默认隐藏
    vi ./docker/.env
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

### 注意事项
#### 改域名和IP注意事项
要修改 index.html 和 .env

### 登陆用户信息
教育机构管理端登录用户信息
- 用户名：edutest
- 密码：edutest

监管机构管理端用户信息
- 用户名：suptest
- 密码：suptest
