import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

import { getExchangePairs } from "../../network/exchange";

import Spinner from "../Spinner/Spinner";

/*
 * Detail pairs of a single exchange
 */
const ExchangeDetail = (props) => {
  // get id of exchange from url params
  const { id } = useParams();
  // local state of exchange local data and pairs
  const [exchangeData, setExchangeData] = useState({
    name: "",
    date_live: "",
    url: "",
    pairs: [],
  });
  // loading state of page
  const [loading, setLoading] = useState(true);

  // load exchange data on page load, change id
  useEffect(() => {
    (async function () {
      const data = await getExchangePairs(id, 5);

      setLoading(false);
      setExchangeData(data);
    })();
  }, [id]);

  // first load a spinner
  let mainPart = <Spinner />;
  // when done loading, load main content
  if (!loading) {
    mainPart = (
      <React.Fragment>
        <div className="d-flex flex-column align-content-center">
          <h1 className="text-center">{exchangeData.name}</h1>
          <h2 className="text-center mt-3">
            {exchangeData.date_live
              ? "Live Date: " + exchangeData.date_live
              : ""}
          </h2>
          <a
            href={exchangeData.url}
            target="_blank"
            rel="noreferrer"
            className="btn btn-primary mt-4 align-self-center"
          >
            Visit Now!
          </a>
          <h2 className="text-center mt-5">Top 5 Pairs!</h2>
        </div>
        {exchangeData.pairs.map((pair, index) => (
          <div
            key={index}
            className="d-flex flex-column flex-md-row bg-dark rounded-lg p-3 mt-4 text-center"
          >
            <h3 className="mx-5 my-2 my-md-0">
              {pair.base}/{pair.quote}
            </h3>
            <h3 className="mx-5 my-2 my-md-0">
              Volume: <span className="font-italic">${pair.volume}</span>
            </h3>
            <h3 className="mx-5 my-2 my-md-0">
              Price: <span className="font-italic">${pair.price}</span>
            </h3>
          </div>
        ))}
      </React.Fragment>
    );
  }

  return (
    <div className="d-flex flex-column align-content-center mb-5">
      {mainPart}
    </div>
  );
};

export default ExchangeDetail;
