#### 待完成的任务
1. 预下单整合到区块链里
2. 字段命名符合js规则
3. 订购合约创建时，返回结果是string，扩展性不太好，后续修改为json
4. 单元测试
5. 文档补充
6. 划拨合约的开发
7. 机构由BankMSP调整到Bank1MSP
8. 脚本重构以完成快速打包部署

#### 事件类型规则
```
[EventType]-[SubscribeID]
```
- `EventType` : 事件类型，值有 `create` 、`cancel`、`complete` 。
- `SubscribeID` : 订购合约的ID。
#### 事件类型监听匹配
监听事件时使用的事件名称支持正则表达式。使用时也可以简写。
例如，事件名称为：`create-Edu1MSP-BankMSP-EdbMSP-orderid001` ，当前打算监听该事件的机构是 `BankMSP`，可采用的正则表达式是：
```
^create.+BankMSP.+$
```
