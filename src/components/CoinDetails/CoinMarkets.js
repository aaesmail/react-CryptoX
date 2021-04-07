import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import { getCoinMarkets } from "../../network/coin";

import CoinMarket from "./CoinMarket";
import Spinner from "../Spinner/Spinner";

/*
 * hosted in coinDetails
 * This part display the top markets of the coin
 */
const CoinMarkets = (props) => {
  // local state of markets of coin and loading state
  const [markets, setMarkets] = useState([
    { name: "", base: "", quote: "", price: "", volume: "" },
  ]);
  const [loading, setLoading] = useState(true);

  // load the top 5 coin markets
  useEffect(() => {
    (async function () {
      const data = await getCoinMarkets(props.id, 5);

      setLoading(false);
      setMarkets(data);
    })();
  }, [props.id]);

  // first load as spinner
  let marketsList = <Spinner />;
  // then load the markets when loading is done
  if (!loading) {
    marketsList = markets.map((market, index) => (
      <CoinMarket key={index} market={market} />
    ));
  }

  return (
    <div className="d-flex flex-column mt-3 justify-content-center text-center">
      <h2 className="d-none d-md-block display-4">Top 5 Markets</h2>
      <h2 className="d-block d-md-none display-5">Top 5 Markets</h2>
      <div>{marketsList}</div>
    </div>
  );
};

CoinMarkets.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default React.memo(CoinMarkets);
