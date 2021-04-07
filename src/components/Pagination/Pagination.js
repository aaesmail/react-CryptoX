import React from "react";
import PropTypes from "prop-types";

import PageItem from "./PageItem";

/*
 * General pagination component that display the page
 * and reports any click to hosting component
 */
const Pagination = (props) => {
  let pages = [];

  if (props.activePage < 6) {
    pages = [1, 2, 3, 4, 5, 6, 7, "...", props.pagesNum - 1, props.pagesNum];
  } else if (props.activePage > props.pagesNum - 6) {
    pages = [
      1,
      2,
      "...",
      props.pagesNum - 7,
      props.pagesNum - 6,
      props.pagesNum - 5,
      props.pagesNum - 4,
      props.pagesNum - 3,
      props.pagesNum - 2,
      props.pagesNum - 1,
      props.pagesNum,
    ];
  } else {
    pages = [
      1,
      2,
      "...",
      props.activePage - 2,
      props.activePage - 1,
      props.activePage,
      props.activePage + 1,
      props.activePage + 2,
      "...",
      props.pagesNum - 2,
      props.pagesNum,
    ];
  }

  if (window.innerWidth < 768) {
    pages = [1, props.activePage, props.pagesNum];

    if (props.activePage === 1) pages.shift();
    if (props.activePage === props.pagesNum) pages.pop();
  }

  return (
    <ul className="pagination justify-content-center">
      <PageItem
        pageClicked={props.prevPage}
        active={false}
        disabled={props.activePage === 1}
      >
        Previous
      </PageItem>

      {pages.map((page, index) => (
        <PageItem
          key={index}
          pageClicked={props.pageClicked}
          active={page === props.activePage}
          disabled={page === "..."}
        >
          {page}
        </PageItem>
      ))}

      <PageItem
        pageClicked={props.nextPage}
        active={false}
        disabled={props.activePage === props.pagesNum}
      >
        Next
      </PageItem>
    </ul>
  );
};

Pagination.protoTypes = {
  activePage: PropTypes.number.isRequired,
  pagesNum: PropTypes.number.isRequired,
  pageClicked: PropTypes.func.isRequired,
  prevPage: PropTypes.func.isRequired,
  nextPage: PropTypes.func.isRequired,
};

export default Pagination;
