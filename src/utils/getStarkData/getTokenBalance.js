import axios from 'axios';

export async function getTokenBalance(address) {
    let res={
        ETH: '-',
        DAI: '-',
        USDC: '-',
        USDT: '-',
        WBTC: '-'
    };
    try {
        const response = await axios.get(`https://voyager.online/api/contract/${address}/balances`);
        let tokenBalance = {};
        let totalValue = 0;
        for (const token in response.data) {
            let usdValue = response.data[token].usdFormattedBalance; // 去掉美元符号
            if(usdValue){
                usdValue=usdValue.replace('$', '');
                tokenBalance[response.data[token].symbol] = parseFloat(response.data[token].balance/(10**response.data[token].decimals)).toFixed(3)
                totalValue += Number(usdValue).toFixed(3)
            }
        }
        res=Object.assign(res,{...tokenBalance});
    } catch (e) {
        console.error("getTokenBalance："+address);
    }
    return res;
}
