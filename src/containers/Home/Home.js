import React, { useEffect, useState } from "react";

import { getGlobalInfo } from "../../network/global";

import Spinner from "../../components/Spinner/Spinner";

/*
 * Home container that hosts landing page
 * Shows some general information about coins
 */
const Home = (props) => {
  // local state of number of coins, markets, volume,
  // dominance of bitcoin and loading state
  const [coins, setCoins] = useState(0);
  const [markets, setMarkets] = useState(0);
  const [volume, setVolume] = useState(0);
  const [BCDominance, setBCDominance] = useState(0);
  const [loading, setLoading] = useState(true);

  // fetch global data on component created
  useEffect(() => {
    (async function () {
      const data = await getGlobalInfo();

      setLoading(false);
      setCoins(data.coins);
      setMarkets(data.markets);
      setVolume(data.volume);
      setBCDominance(data.BCDominance);
    })();
  }, []);

  // first load a spinner
  let mainPart = <Spinner />;
  // when loading finished load actual data
  if (!loading) {
    mainPart = (
      <React.Fragment>
        <p className="lead mt-5">
          Coins on Market:{" "}
          <span className="font-italic font-weight-bold">{coins}</span>
        </p>
        <p className="lead">
          Active Markets:{" "}
          <span className="font-italic font-weight-bold">{markets}</span>
        </p>
        <p className="lead">
          24h Total Volume:{" "}
          <span className="font-italic font-weight-bold">${volume}</span>
        </p>
        <p className="lead">
          Bitcoin Dominance:{" "}
          <span className="font-italic font-weight-bold">{BCDominance}%</span>
        </p>
      </React.Fragment>
    );
  }

  return (
    <div className="col text-center">
      <h1 className="text-monospace font-weight-bold">CryptoX</h1>
      <hr className="bg-light mx-4" />

      <h6 className="display-4 p-3">
        All you need to know about <br /> Crypto Currencies
      </h6>

      {mainPart}
    </div>
  );
};

export default Home;
