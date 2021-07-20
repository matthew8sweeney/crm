import React from "react";
import SelectPanelLI from "../../../ui/select-panel/SelectPanelLI";

const InteractionLI = (props) => {
  return (
    <SelectPanelLI
      component={props.component}
      primary={props.data.interactionType}
      secondary={props.data.subject}
    ></SelectPanelLI>
  );
};

export default InteractionLI;
