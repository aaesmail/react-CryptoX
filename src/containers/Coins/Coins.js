import React, { useCallback, useEffect, useState } from "react";

import { getCoins } from "../../network/coin";

import CoinCard from "../../components/CoinCard/CoinCard";
import Pagination from "../../components/Pagination/Pagination";
import Spinner from "../../components/Spinner/Spinner";

/*
 * Container for a list of all coins
 * uses pagination to load pages of content
 */
const Coins = (props) => {
  // local state for coins list, active page,
  // total number of pages, loading state of coins list
  const [coins, setCoins] = useState([]);
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

  // run this code to fetch page of coins from server
  // run it only when active page changes to get new coins
  useEffect(() => {
    (async function () {
      const [data, coinsNum] = await getCoins(activePage);

      setLoading(false);
      setCoins(data);
      setPagesNumber(Math.ceil(coinsNum / 10));
    })();
  }, [activePage]);

  // when active page changes run this code to smoothly move user
  // to top of page
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [activePage]);

  // make the coins list a spinner at first
  let coinsList = <Spinner />;
  // if it is not loading then load coins list instead of spinner
  if (!loading) {
    coinsList = coins.map((coin) => (
      <CoinCard
        key={coin.id}
        id={coin.id}
        rank={coin.rank}
        symbol={coin.symbol}
        name={coin.name}
        price={coin.price}
      />
    ));
  }

  return (
    <div className="col text-center">
      <p className="d-block d-md-none mb-2 mt-n4 display-5">
        Explore All Crypto Coins
      </p>
      <p className="d-none d-md-block mb-2 mt-n4 display-4">
        Explore All Crypto Coins
      </p>

      {coinsList}

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

export default Coins;
