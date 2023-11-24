import axios from "axios";

export async function getZksEra(address) {
    try {
        let url = "https://block-explorer-api.mainnet.zksync.io/address/" + address;
        const response = await axios.get(url);
        let zks2_tx_amount, zks2_balance, zks2_usdcBalance,zks2_dlpm_balance,zks2_lp_balance;
        if ("0x000000000000000000000000000000000000800A" in response.data.balances) {
            zks2_balance = response.data.balances["0x000000000000000000000000000000000000800A"].balance;
            zks2_balance = (Number(zks2_balance) / 10 ** 18).toFixed(3);
        } else {
            zks2_balance = 0;
        }
        if ("0x3355df6D4c9C3035724Fd0e3914dE96A5a83aaf4" in response.data.balances) {
            zks2_usdcBalance = response.data.balances["0x3355df6D4c9C3035724Fd0e3914dE96A5a83aaf4"].balance;
            zks2_usdcBalance = (Number(zks2_usdcBalance) / 10 ** 6).toFixed(2);
        } else {
            zks2_usdcBalance = 0;
        }
        if ("0x142cF97Ac1a40dFEBCCa488607Ea99D0eABDfe8c" in response.data.balances) {
            zks2_dlpm_balance = response.data.balances["0x142cF97Ac1a40dFEBCCa488607Ea99D0eABDfe8c"].balance;
            zks2_dlpm_balance = (Number(zks2_dlpm_balance) / 10 ** 18).toFixed(3);
        } else {
            zks2_dlpm_balance = 0;
        }
        if ("0x80115c708E12eDd42E504c1cD52Aea96C547c05c" in response.data.balances) {
            zks2_lp_balance = response.data.balances["0x80115c708E12eDd42E504c1cD52Aea96C547c05c"].balance;
            zks2_lp_balance = (Number(zks2_lp_balance) / 10 ** 12).toFixed(3);
        } else {
            zks2_lp_balance = 0;
        }
        zks2_tx_amount = response.data.sealedNonce;
        return {zks2_balance, zks2_tx_amount, zks2_usdcBalance,zks2_dlpm_balance,zks2_lp_balance};
    } catch (error) {
        console.error(error);
        return {zks2_balance: "-", zks2_tx_amount: "-", zks2_usdcBalance: "-",zks2_dlpm_balance:"-",zks2_lp_balance:""};
    }
}
