import React from "react";

import ActionLI from "./ActionLI";

const NoteLI = (props) => {
  return (
    <ActionLI
      component={props.component}
      primary={props.data.title}
      secondary={props.data.text}
      data={props.data}
    />
  );
};

export default NoteLI;
