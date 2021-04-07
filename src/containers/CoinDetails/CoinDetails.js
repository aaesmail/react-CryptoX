import React from "react";
import { useParams } from "react-router";

import CoinData from "../../components/CoinDetails/CoinData";
import CoinMarkets from "../../components/CoinDetails/CoinMarkets";
import CoinSocialStatus from "../../components/CoinDetails/CoinSocialStatus";

/*
 * Container for coin details page
 * Renders all coin related data
 */
const CoinDetails = (props) => {
  const { id } = useParams();

  return (
    <div className="container justify-content-center">
      <CoinData id={id} />
      <hr className="bg-light" />
      <CoinSocialStatus id={id} />
      <hr className="bg-light" />
      <CoinMarkets id={id} />
    </div>
  );
};

export default CoinDetails;
