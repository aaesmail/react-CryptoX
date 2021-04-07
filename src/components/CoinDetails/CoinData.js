import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import { getCoinData } from "../../network/coin";

import Spinner from "../Spinner/Spinner";

/*
 * hosted in coinDetails
 * This part display the general data of the coin
 */
const CoinData = (props) => {
  // local state of coin info and loading state
  const [coinData, setCoinData] = useState({
    name: "",
    symbol: "",
    rank: "",
    price: "",
    volume: "",
    bitcoins: "",
  });
  const [loading, setLoading] = useState(true);

  // load coin data when component loads
  useEffect(() => {
    (async function () {
      const data = await getCoinData(props.id);

      setLoading(false);
      setCoinData(data);
    })();
  }, [props.id]);

  // let main part be a spinner at first
  let mainPart = <Spinner />;
  // when done loading show the coin info
  if (!loading) {
    mainPart = (
      <React.Fragment>
        <h1 className="d-flex flex-column flex-md-row justify-content-center">
          <span className="font-weight-bold my-2 my-md-0">
            Rank {coinData.rank}
          </span>{" "}
          <span className="mx-5 font-italic my-2 my-md-0">{coinData.name}</span>{" "}
          <span className="font-weight-bolder my-2 my-md-0">
            {coinData.symbol}
          </span>
        </h1>
        <h2 className="my-2 my-md-3">
          Price:{" "}
          <span className="font-weight-bold font-italic">
            ${coinData.price}
          </span>
        </h2>
        <h2 className="mt-3">
          24h Volume:{" "}
          <span className="font-weight-bold font-italic">
            ${coinData.volume}
          </span>
        </h2>
        <h2 className="mt-3">
          {coinData.name}/Bitcoin:{" "}
          <span className="font-italic">{coinData.bitcoins}</span>
        </h2>
      </React.Fragment>
    );
  }

  return (
    <div className="d-flex flex-column justify-content-around align-items-center text-center">
      {mainPart}
    </div>
  );
};

CoinData.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default React.memo(CoinData);
