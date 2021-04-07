# CryptoX

## App: https://cryptox-1a4cf.web.app/
## Hosted on Firebase

### A web app made with React and Bootstrap to deliver Crptocurrencies information
### Used the public API of Coinlore: https://www.coinlore.com/cryptocurrency-data-api

## How to run source code:
  * Must have npm install globaly on the System
  * Open a terminal window inside project directory
  * run the following commands:
      * npm install
      * npm start

## Description:
A Responsive website that looks and feels good on all screens.
Used React to present all the data in the public API of coinlore in a nice way to the user.
React-router-dom for the general routing functionality of the app.
Axios for fetching api data.
Hosted the Webapp on firebase.
Used Lazy loading/Code Splitting to not load all parts of the app unless required.

## List of used tools:
  * Javascript
  * Coinlore public API: https://www.coinlore.com/cryptocurrency-data-api
  * React: https://reactjs.org/
  * React Router: https://reactrouter.com/
  * Prop-types: https://www.npmjs.com/package/prop-types
  * Axios: https://www.npmjs.com/package/axios

## Critical Overview:
* Responsive web app that adjusts to screen size.
* Used React hooks so the app doesn't have any class based components, everything is function components.
* Used React memo to avoid unnecessary renders of some components that would otherwise render for no reason.
* Made a 404 not found page and redirect to it whenever a route is unknown.
* Performance in the Exchanges page is not the best because the API doesn't provide a paging way in the API so can't request only parts of the data.
* Wanted to make a search in the Coins and Exchanges list but the API doesn't have a filter functionality.
* I think the Pagination component can be made better algorithm wise.
* I think the lazy loading/code splitting was an overkill for an app this small, so it impacted performance a bit. But I used it in this app just to show that I can use it.
