
### 必须前提
- 开发工具`vscode`安装`IBM Blockchain Platform`插件。
- [目录规范引用](https://github.com/golang-standards/project-layout/blob/master/README_zh.md)

### 初始化 microfab 的开发环境
执行脚本如下：
```bash
MICROFAB_CONFIG='{"port":8080,  "endorsing_organizations": [{"name": "Bank"},{"name": "Edb"},{"name": "Edu1"},{"name": "Edu2"}],"channels": [{"name": "edb-supervision-channel","endorsing_organizations": ["Bank", "Edb", "Edu1", "Edu2"]}]}' docker run -e MICROFAB_CONFIG --label fabric-environment-name="edb Microfab" -d -p 8080:8080 ibmcom/ibp-microfab:0.0.11
```
创建四个机构 `Bank`、`Edb`、`Edu1`、`Edu2`。使用的通道名称 `edb-supervision-channel`。
端口是`8080`。

vscode中打开`IBM Blockchain Platform`中连接测试环境区块链环境的步骤：

1. 打开`IBM Blockchain Platform`插件界面
2. 点击`FABRIC ENVIRONMENTS`选项卡右侧`+`（加号）
3. 选择`Add a Microfab network`
4. URL不用输入，直接回车
5. 填写在插件中显示的环境名称

### 数据结构
订购合约ID由四个字段组成，之间都由 `.` (英文句号)进行连接
- `USVOrgID`: 订购合约创建时提供
- `BankID`: 订购合约创建时提供
- `SVOrgID`: 订购合约创建时提供
- `USVOrderNo`: 订购合约创建时提供

### 插件使用
#### ibm blockchain 监听链码事件
1. 快捷键 `ctrl+shift+P` 打开vscode的执行命令窗口
2. 搜索 `IBM Blockchain Platform: Subscribe to Events` 并选择
3. (可选) 选择连接的网关及使用的用户。
4. 选择目标链码。
5. 输入要监听的事件名称。