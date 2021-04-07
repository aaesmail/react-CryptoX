import React from "react";
import PropTypes from "prop-types";

/*
 * Single page item in pagination to apply different classes based
 * on props
 */
const Pagination = (props) => {
  let classes = "page-item ";
  classes += props.active ? "active " : "";
  classes += props.disabled ? "disabled " : "";

  let buttonClasses = "page-link text-light ";
  buttonClasses += props.disabled
    ? "bg-secondary "
    : props.active
    ? "bg-primary "
    : "bg-dark ";

  return (
    <li className={classes}>
      <button
        onClick={() => props.pageClicked(props.children, props.disabled)}
        className={buttonClasses}
      >
        {props.children}
      </button>
    </li>
  );
};

Pagination.protoTypes = {
  active: PropTypes.bool.isRequired,
  disabled: PropTypes.bool.isRequired,
  pageClicked: PropTypes.func.isRequired,
};

export default Pagination;
