import axios from "axios";

export async function getScollAddress(address) {
    try {
        let url = "https://www.oklink.com/api/v5/explorer/address/address-summary?chainShortName=SCROLL&address=" + address;
        const response = await axios.get(url,{headers: { 'Ok-Access-Key': 'a265f83b-c7b5-47ab-b23e-a427ea0b9f3d'}});
        let {balance,transactionCount,lastTransactionTime}=response.data.data[0];
        balance=Number(balance).toFixed(3);
        return {balance,transactionCount,lastTransactionTime};
    } catch (error) {
        console.log("获取用户信息异常");
        return {balance: "-",  transactionCount: "-",lastTransactionTime:""};
    }
}
