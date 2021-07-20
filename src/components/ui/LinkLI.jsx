import React from "react";
import { NavLink } from "react-router-dom";

const LinkLI = React.forwardRef((props, ref) => {
  return (
    <li ref={ref}>
      <NavLink {...props} />
    </li>
  );
});

export default LinkLI;
