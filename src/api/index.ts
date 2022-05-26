import axios from "axios";

export const getExchangeRates = async (url: string) => {
    const {data: rates} = await axios.get(url);
    return rates;
}