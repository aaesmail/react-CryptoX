import axios from "axios";

/*
 * Make the request for all exchanges from the API endpoint
 */
async function requestExchanges() {
  return axios.get("https://api.coinlore.net/api/exchanges/");
}

/*
 * Make the request for the top 100 pairs of a single exchange point
 */
async function requestExchangePairs(id) {
  return axios.get("https://api.coinlore.net/api/exchange/", {
    params: { id: id },
  });
}

/*
 * get the response of all exchanges and transform it into a
 * format that is used easily by the component
 * Get all pairs => transform them into easily accessible format
 *  => sort descendingly by volume
 */
export async function getExchanges() {
  const response = await requestExchanges();

  return Object.values(response["data"])
    .map((element) => {
      return {
        id: element["id"],
        name: element["name"],
        volume: (+element["volume_usd"]).toFixed(2),
        pairs: element["pairs"],
        url: element["url"],
        country: element["country"],
      };
    })
    .sort((a, b) => +b.volume - +a.volume);
}

/*
 * get top 100 pairs of an exchange and transform it into an easy format
 * to accesss and take only top {length} pairs requested by component
 */
export async function getExchangePairs(id, length) {
  const response = await requestExchangePairs(id);

  return {
    name: response["data"]["0"]["name"],
    date_live: response["data"]["0"]["date_live"],
    url: response["data"]["0"]["url"],
    pairs: response["data"]["pairs"].slice(0, length).map((element) => {
      return {
        base: element["base"],
        quote: element["quote"],
        price: (+element["price_usd"]).toFixed(2),
        volume: (+element["volume"]).toFixed(2),
      };
    }),
  };
}
