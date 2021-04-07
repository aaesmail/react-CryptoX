import React, { useState, useEffect, useCallback } from "react";

import { getExchanges } from "../../network/exchange";

import Pagination from "../../components/Pagination/Pagination";
import ExchangeCard from "../../components/ExchangeCard/ExchangeCard";
import Spinner from "../../components/Spinner/Spinner";

/*
 * A container for a list of all exchanges that uses pagination
 */
const Exchanges = (props) => {
  // local state to have exchanges list, active page user is on
  // total number of pages, and loading state
  const [exchanges, setExchanges] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [pagesNumber, setPagesNumber] = useState(50);
  const [loading, setLoading] = useState(true);

  // called by pagination component to turn to next page
  // use callback to not create a new function everytime
  const nextPage = useCallback((page, disabled) => {
    if (disabled) return;

    setActivePage((page) => page + 1);
  }, []);

  // called by pagination component to turn to previous page
  // use callback to not create a new function everytime
  const prevPage = useCallback((page, disabled) => {
    if (disabled) return;

    setActivePage((page) => page - 1);
  }, []);

  // called by pagination component to turn to certain page
  // use callback to not create a new function everytime
  const pageClicked = useCallback((page, disabled) => {
    if (disabled) return;

    setActivePage(page);
  }, []);

  // run this code to fetch all exchanges from server
  // run it only when component gets created
  useEffect(() => {
    (async function () {
      const data = await getExchanges();

      setLoading(false);
      setExchanges(data);
      setPagesNumber(Math.ceil(data.length / 10));
    })();
  }, []);

  // when active page changes run this code to smoothly move user
  // to top of page
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [activePage]);

  // make the exchanges list a spinner at first
  let exchangesList = <Spinner />;
  // if the list is done loading then map all exchanges and remove loading spinner
  if (!loading) {
    exchangesList = exchanges
      .slice((activePage - 1) * 10, activePage * 10)
      .map((exchange) => (
        <ExchangeCard
          key={exchange.id}
          id={exchange.id}
          name={exchange.name}
          volume={exchange.volume}
          pairs={exchange.pairs}
          url={exchange.url}
          country={exchange.country}
        />
      ));
  }

  return (
    <div className="col text-center">
      <p className="d-block d-md-none display-5 mb-2 mt-n4">
        Explore All Crypto Exchanges
      </p>
      <p className="d-none d-md-block display-4 mb-2 mt-n4">
        Explore All Crypto Exchanges
      </p>

      {exchangesList}

      <Pagination
        activePage={activePage}
        pagesNum={pagesNumber}
        pageClicked={pageClicked}
        prevPage={prevPage}
        nextPage={nextPage}
      />
    </div>
  );
};

export default Exchanges;
