import React from "react";

/**
 * Div that sets its style attribute dynamically for an accordion effect.
 * `in` prop determines whether it is expanded.
 */
const CollapsingDiv = (props) => {
  const style = {
    height: props.in ? props.inHeight || "auto" : props.outHeight || "auto",
    width: props.in ? props.inWidth || "auto" : props.outWidth || "auto",
    transition: props.transition || "height 0.25s ease-out, width 0.2s ease-out",
  };

  return (
    <div className={props.className} style={{ ...props.style, ...style }}>
      {props.children}
    </div>
  );
};

export default CollapsingDiv;
