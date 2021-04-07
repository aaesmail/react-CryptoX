import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import { getCoinSocialStatus } from "../../network/coin";

import Spinner from "../Spinner/Spinner";

/*
 * hosted in coinDetails
 * This part display the social status of the coin
 */
const CoinSocialStatus = (props) => {
  // local state of coin & loadin state
  const [coinSocialStatus, setCoinSocialStatus] = useState({
    redditActiveUsers: "",
    redditSubscribers: "",
    twitterFollowers: "",
    twitterStatusCount: "",
  });
  const [loading, setLoading] = useState(true);

  // load coin info when page loads
  useEffect(() => {
    (async function () {
      const data = await getCoinSocialStatus(props.id);

      setLoading(false);
      setCoinSocialStatus(data);
    })();
  }, [props.id]);

  // first load a spinner
  let mainPart = <Spinner />;
  // when loading is done show coin status
  if (!loading) {
    mainPart = (
      <React.Fragment>
        <div className="d-flex flex-column flex-md-row justify-content-around mt-2">
          <div className="text-md-left">
            <h3 className="display-4 font-weight-bold">Reddit</h3>
            <p className="display-5 text-center">
              Active Users:{" "}
              <span className="font-italic">
                {coinSocialStatus.redditActiveUsers}
              </span>
            </p>
            <p className="display-5 text-center">
              Subscribers:{" "}
              <span className="font-italic">
                {coinSocialStatus.redditSubscribers}
              </span>
            </p>
          </div>
          <div className="text-md-right">
            <h3 className="display-4 font-weight-bold">Twitter</h3>
            <p className="display-5 text-center">
              Followers:{" "}
              <span className="font-italic">
                {coinSocialStatus.twitterFollowers}
              </span>
            </p>
            <p className="display-5 text-center">
              Status Count:{" "}
              <span className="font-italic">
                {coinSocialStatus.twitterStatusCount}
              </span>
            </p>
          </div>
        </div>
      </React.Fragment>
    );
  }

  return (
    <div className="d-flex flex-column mt-3 justify-content-center">
      <div className="d-none d-md-block display-3 text-center">
        Social Status
      </div>
      <div className="d-block d-md-none display-4 text-center">
        Social Status
      </div>
      <div className="text-center">{mainPart}</div>
    </div>
  );
};

CoinSocialStatus.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default React.memo(CoinSocialStatus);
