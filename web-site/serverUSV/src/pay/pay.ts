import * as crypto from 'crypto'
import * as fs from 'fs'
import * as pem from 'pem'

const pfxPath = ''  //prx
const cerPath = ''; //cer
const password = 'A123456'
// const payUrl = 'https://ebspay.boc.cn/PGWPortal/B2CRecvOrder.do'
const payUrl = 'https://101.231.206.170/PGWPortal/B2CRecvOrder.do'
const redictUrl = 'https://*****.boc.cn/****?abcOrderNo='
const orderUrl = '???'


const demo = ()=>{
    const orderNo = '11111'
    const orderDatetime = '20220712101010'
    const amount = '0.01'
    const merNo = '123123123'
    sign(orderNo,orderDatetime,amount)
}

//amount单位为元
const getPlainData = (orderNo:string,orderDatetime:string,amount:string) =>{
    return orderNo.concat('|').concat(orderDatetime).concat('|').concat('001').concat('|').concat(amount)
}

const sign = (orderNo:string,orderDatetime:string,amount:string) =>{

    const plainData = getPlainData(orderNo,orderDatetime,amount)
    const pfx = fs.readFileSync(__dirname + pfxPath);
    pem.readPkcs12(pfx, { p12Password: password }, (err, cert) => {
        console.log(cert);
        const sign = crypto.createSign('RSA-SHA1')
        sign.update(plainData);
        sign.end();
        const signature = sign.sign(cert);
        console.log(signature);
        return signature
    });
}

const getReturnData = (merchantNo:string,orderNo:string,orderSeq:string,payTime:string,orderStatus:string,amount:string) =>{
    return merchantNo.concat('|').concat(orderNo).concat('|').concat(orderSeq).concat('|').concat('EP').concat('|').concat(payTime).concat('|').concat(orderStatus).concat('|').concat(amount).concat('|')
}

const verify = (merchantNo:string,orderNo:string,orderSeq:string,payTime:string,orderStatus:string,amount:string,signData:string) =>{
    const plainData = getReturnData(merchantNo,orderNo,orderSeq,payTime,orderStatus,amount)
    const cerFile = fs.readFileSync(__dirname + cerPath);
    const verify = crypto.createVerify('RSA-SHA1');  
    verify.write(plainData);
    verify.end();       
    return verify.verify({ key: cerFile, format: 'der', type: 'spki' }, signData);
    // pem.readCertificateInfo(cerFile, (err, cert) => {
    //     console.log(cert);

    // });
}


const pay = (orderNo:string,orderTime:string,orderAmount:string,merchantNo:string,orderNote:string) =>{
    const signString = sign(orderNo,orderTime,orderAmount)
    const requestBody={
        merchantNo:merchantNo,
        payType:'1',
        orderNo:orderNo,
        curCode:'001',
        orderAmount:orderAmount,
        orderTime:orderTime,
        orderNote:orderNote,
        orderUrl:orderUrl,
        terminalChnl:'1',
        signData:'',
        tradeType:'APP_ABC',
        body:'测试-测试1'
    }
    fetch(payUrl, {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: {
          'Content-type': 'application/json;charset=UTF-8',
        },
      }).then(res => {
        console.log(res)
        return res.json()}
      )
      .then((json) => {
        const {orderSeq,tranStatus,abcTranType,abcTranCode,abcAmount,abcOrderNo,abcAcqCustName} = json
        return redictUrl+abcOrderNo;
      })

}

export {pay,verify}
