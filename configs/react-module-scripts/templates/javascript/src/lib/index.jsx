import React from "react";
import p from "prop-types";

export const JsComponent = ({ name, ...rest }) => {
 return <h1 {...rest}>{name}</h1>;
};

JsComponent.propTypes = {
  name: p.string.isRequired,
};
