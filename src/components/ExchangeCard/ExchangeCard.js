import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

/*
 * A single exchange partial information to display
 * in exchanges list
 */
const ExchangeCard = (props) => {
  return (
    <div className="card d-flex justify-content-between flex-column flex-md-row bg-dark mx-5 my-3 p-4 align-items-center align-items-md-baseline">
      <div className="font-weight-bolder my-2 my-md-0 lead">{props.name}</div>
      <div className="flex-fill text-center my-2 my-md-0">{props.country}</div>
      <div className="flex-fill text-center my-2 my-md-0">
        <a
          className="btn btn-primary"
          href={props.url}
          target="_blank"
          rel="noreferrer"
        >
          Visit Now!
        </a>
      </div>
      <div className="text-monospace flex-fill text-md-right my-2 my-md-0 mr-md-3">
        ${props.volume}
      </div>
      <div className="text-monospace flex-fill text-md-right my-2 my-md-0 mr-md-3">
        Pairs: <span className="font-italic">{props.pairs}</span>
      </div>
      <Link
        to={"/exchanges/" + props.id}
        className="btn btn-primary my-2 my-md-0"
      >
        See All!
      </Link>
    </div>
  );
};

ExchangeCard.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  name: PropTypes.string.isRequired,
  volume: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  pairs: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  url: PropTypes.string.isRequired,
  country: PropTypes.string.isRequired,
};

export default ExchangeCard;
