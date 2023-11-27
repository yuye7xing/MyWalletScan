import axios from 'axios';
import {getEthPrice} from "@utils";
import {dbConfig, initDB, update} from "@utils/indexedDB/main.js";


export const getTransactionsList = async (address) => {
    let url = `https://www.oklink.com/api/v5/explorer/address/transaction-list?address=${address}&limit=100&chainShortName=SCROLL`;
    const transactions = [];
    const ethResponse = await getEthPrice();
    let page="1";
    while (true) {
        try {
            const response = await axios.get(url,{params: { page: page }, headers: { 'Ok-Access-Key': 'a265f83b-c7b5-47ab-b23e-a427ea0b9f3d'}});
            if (response.status === 200) {
                const data = response.data.data[0].transactionLists;
                data.forEach((transaction) => {
                    const {txId, to, from, data, isL1Originated, txFee, transactionTime, amount} = transaction;
                    transactions.push({
                        hash: txId,
                        to: to,
                        from: from,
                        data: data,
                        isL1Originated: isL1Originated,
                        fee: txFee,
                        receivedAt: transactionTime,
                        transfers: [],
                        ethValue: parseInt(ethResponse),
                        value: amount,
                    });
                });
                if(response.data.data[0].page==response.data.data[0].totalPage) break;
                page=response.data.data[0].page+1;
            } else {
                console.error('Error occurred while retrieving transactions.');
                break;
            }
        } catch (error) {
            console.error('Error occurred while making the request:', error);
            break;
        }
    }


    await initDB(dbConfig)
    await update("scollTransactions", {
        address: address,
        data: JSON.stringify(transactions)
    })

    return transactions;
};

