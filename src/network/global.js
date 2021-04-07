import axios from "axios";

/*
 * This function just makes the request to the server to get global
 * information about crypto coins
 */
async function requestGlobalData() {
  return axios.get("https://api.coinlore.net/api/global/");
}

/*
 * Here we convert the response to an object which can
 * be used easily by the component to render the view
 * Only extract info we are interested in and put it in easy format
 */
export async function getGlobalInfo() {
  const response = await requestGlobalData();

  const coins = response["data"][0]["coins_count"];
  const markets = response["data"][0]["active_markets"];
  const volume = (+response["data"][0]["total_volume"]).toFixed(2);
  const bitCoinDominance = (+response["data"][0]["btc_d"]).toFixed(2);

  return {
    coins: coins,
    markets: markets,
    volume: volume,
    BCDominance: bitCoinDominance,
  };
}
