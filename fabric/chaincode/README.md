
### 必须前提
- 开发工具`vscode`安装`IBM Blockchain Platform`插件。
- [目录规范引用](https://github.com/golang-standards/project-layout/blob/master/README_zh.md)

### 初始化 microfab 的开发环境
执行脚本如下：
```bash
MICROFAB_CONFIG='{"port":8080,  "endorsing_organizations": [{"name": "Bank"},{"name": "Edb"},{"name": "Edu1"},{"name": "Edu2"}],"channels": [{"name": "edb-supervision-channel","endorsing_organizations": ["Bank", "Edb", "Edu1", "Edu2"]}]}' docker run -e MICROFAB_CONFIG --label fabric-environment-name="edb Microfab" -d -p 8080:8080 ibmcom/ibp-microfab:0.0.11
```
创建四个机构 `Bank`、`Edb`、`Edu1`、`Edu2`。
使用的通道名称 `edb-supervision-channel`。
端口是`8080`。

### 数据结构
订购合约ID由四个字段组成，之间都由 `.` (英文句号)进行连接
- `USVOrgID`: 订购合约创建时提供
- `BankID`: 订购合约创建时提供
- `SVOrgID`: 订购合约创建时提供
- TxnID: 订购合约创建时的请求背书时，在链码上的TxnID。