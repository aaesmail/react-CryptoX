import React from "react";
import PropTypes from "prop-types";

/*
 * this part is hosted in coinMarkets
 * Used to display a single market data
 */
const CoinMarket = (props) => {
  return (
    <div className="d-flex flex-column flex-md-row mx-2 mx-md-0 my-5 justify-content-between bg-dark p-3 rounded-lg align-content-center">
      <h4 className="my-2 my-md-0 text-nowrap">{props.market.name}</h4>
      <h4 className="my-2 my-md-0">
        {props.market.base}/{props.market.quote}
      </h4>
      <h4 className="my-2 my-md-0 text-nowrap">
        Price: <span className="font-italic">${props.market.price}</span>
      </h4>
      <h4 className="my-2 my-md-0">
        24h Volume: <span className="font-italic">${props.market.volume}</span>
      </h4>
    </div>
  );
};

CoinMarket.propTypes = {
  market: PropTypes.shape({
    name: PropTypes.string,
    base: PropTypes.string,
    quote: PropTypes.string,
    price: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    volume: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  }).isRequired,
};

export default CoinMarket;
