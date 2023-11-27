import {getTransactionsList} from "@utils/getScollData/getTransactionList.js";
import {getFee} from "@utils/getScollData/getFee.js";
import {getVolume} from "@utils/getScollData/getVolume.js";
import {getActivities} from "@utils/getScollData/getActivity.js";
import {getScollAddress} from "@utils/getScollData/getScollAddress.js";


export const getAllScollData = async (address, isGetTrustalabsData) => {
    try {
        const transactions = await getTransactionsList(address);
        const fee = await getFee(transactions);
        const volume = getVolume(transactions);
        const activity = await getActivities(address, transactions);
        const scrollAddress = await getScollAddress(address);
        
        return {
            totalFee: fee,
            totalExchangeAmount: volume,
            activity,
            scrollAddress,
            result: "success"
        };
    } catch (e) {
        return {
            result: "error",
            reason: e.message
        }
    }
}
