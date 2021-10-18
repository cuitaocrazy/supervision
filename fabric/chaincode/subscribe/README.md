#### 基础信息
[结构验证使用的框架文档](https://github.com/go-playground/validator)
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
