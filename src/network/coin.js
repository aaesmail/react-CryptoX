import axios from "axios";

/*
 * Request a certain number of coins from {start} => {start + limit}
 * Max number that is returned is 100
 */
async function requestCoins(start, limit) {
  return axios.get("https://api.coinlore.net/api/tickers/", {
    params: { start: start, limit: limit },
  });
}

/*
 * Request a single coin's general data
 */
async function requestCoinData(id) {
  return axios.get("https://api.coinlore.net/api/ticker/", {
    params: { id: id },
  });
}

/*
 * Request the social status of a single coin
 */
async function requestCoinSocialStatus(id) {
  return axios.get("https://api.coinlore.net/api/coin/social_stats/", {
    params: { id: id },
  });
}

/*
 * Request first 50 markets of a certain coin
 */
async function requestCoinMarkets(id) {
  return axios.get("https://api.coinlore.net/api/coin/markets/", {
    params: { id: id },
  });
}

/*
 * Get 10 coins for a certain page and transform them into an easy format
 */
export async function getCoins(page) {
  const response = await requestCoins((page - 1) * 10, 10);

  return [
    response["data"]["data"].map((item) => {
      return {
        id: item["id"],
        rank: item["rank"],
        symbol: item["symbol"],
        name: item["name"],
        price: (+item["price_usd"]).toFixed(2),
      };
    }),
    +response["data"]["info"]["coins_num"],
  ];
}

/*
 * get general data for a single coin and transform it to an accessible object
 */
export async function getCoinData(id) {
  const coinDataResponse = await requestCoinData(id);

  return {
    name: coinDataResponse["data"][0]["name"],
    symbol: coinDataResponse["data"][0]["symbol"],
    rank: coinDataResponse["data"][0]["rank"],
    price: (+coinDataResponse["data"][0]["price_usd"]).toFixed(2),
    volume: (+coinDataResponse["data"][0]["volume24"]).toFixed(2),
    bitcoins: (+coinDataResponse["data"][0]["price_btc"]).toFixed(10),
  };
}

/*
 * Get social status of a single coin
 */
export async function getCoinSocialStatus(id) {
  const socialStatusResponse = await requestCoinSocialStatus(id);

  return {
    redditActiveUsers: Math.round(
      +socialStatusResponse["data"]["reddit"]["avg_active_users"]
    ).toString(),
    redditSubscribers: socialStatusResponse["data"]["reddit"]["subscribers"],
    twitterFollowers:
      socialStatusResponse["data"]["twitter"]["followers_count"],
    twitterStatusCount: socialStatusResponse["data"]["twitter"]["status_count"],
  };
}

/*
 * Get top {length} markets for a single coin
 */
export async function getCoinMarkets(id, length) {
  const marketsResponse = await requestCoinMarkets(id);

  return marketsResponse["data"].slice(0, length).map((element) => {
    return {
      name: element["name"],
      base: element["base"],
      quote: element["quote"],
      price: (+element["price"]).toFixed(2),
      volume: (+element["volume"]).toFixed(2),
    };
  });
}
