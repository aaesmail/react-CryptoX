import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

/*
 * this is info about a single coin in the shape of a card
 * Used in coins list to display data about a single coin
 */
const CoinCard = (props) => {
  return (
    <div className="card d-flex flex-column flex-md-row justify-content-between bg-dark mx-5 my-3 p-4 align-items-md-baseline">
      <div className="font-weight-bolder lead my-2 my-md-0">#{props.rank}</div>
      <div className="d-flex flex-column flex-md-row flex-fill px-5">
        <div className="font-weight-bold flex-fill text-md-left my-2 my-md-0">
          {props.symbol}
        </div>
        <div className="flex-fill text-center my-2 my-md-0">{props.name}</div>
        <div className="text-monospace flex-fill text-md-right text-nowrap my-2 my-md-0">
          ${props.price}
        </div>
      </div>
      <Link
        to={"/coins/" + props.id}
        className="btn btn-primary stretched-link my-2 my-md-0"
      >
        More Details
      </Link>
    </div>
  );
};

CoinCard.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  rank: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  symbol: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default CoinCard;
