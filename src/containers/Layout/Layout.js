import React, { Suspense, lazy } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import Spinner from "../../components/Spinner/Spinner";

/*
 * Get all main page routes and import them lazily
 * To use code splitting so user doesn't download pages
 * the user doesn't need
 */
const Home = lazy(() => import("../Home/Home"));
const Exchanges = lazy(() => import("../Exchanges/Exchanges"));
const ExchangeDetail = lazy(() =>
  import("../../components/ExchangeDetail/ExchangeDetail")
);
const Coins = lazy(() => import("../Coins/Coins"));
const CoinDetails = lazy(() => import("../CoinDetails/CoinDetails"));
const NotFound = lazy(() => import("../../components/NotFound/NotFound"));

/*
 * Set up all routes of app and put corresponding container
 * to appropriate route
 *
 * Routes:
 * Route => Component
 * / => Home: Landing page of app
 * /coins => Coins: A list of all coins
 * /coins/:id => CoinDetails: Details for as single coin
 * /exchanges => Exchanges: A list of all exchanges
 * /exchanges:id => ExchangeDetail: Details/pairs for a single exchange
 * /404 => NotFound: 404 not found error page
 * All other unknown routes => Redirect to 404 page
 */
const Layout = (props) => {
  return (
    <div className="row flex-fill justify-content-center pt-5 text-light">
      <Suspense fallback={<Spinner />}>
        <Switch>
          <Route path="/exchanges/:id">
            <ExchangeDetail />
          </Route>
          <Route path="/exchanges">
            <Exchanges />
          </Route>
          <Route path="/coins/:id">
            <CoinDetails />
          </Route>
          <Route path="/coins">
            <Coins />
          </Route>
          <Route path="/404">
            <NotFound />
          </Route>
          <Route exact path="/">
            <Home />
          </Route>
          <Route>
            <Redirect to="/404" />
          </Route>
        </Switch>
      </Suspense>
    </div>
  );
};

export default Layout;
