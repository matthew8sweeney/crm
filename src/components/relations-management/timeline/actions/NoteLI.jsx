import React from "react";
import SelectPanelLI from "../../../ui/select-panel/SelectPanelLI";

const NoteLI = (props) => {
  return (
    <SelectPanelLI
      component={props.component}
      primary={props.data.title}
      secondary={props.data.text}
    ></SelectPanelLI>
  );
};

export default NoteLI;
