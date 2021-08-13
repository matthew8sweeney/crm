import React from "react";
import { useSelector } from "react-redux";
import SelectPanelLI from "../../../ui/select-panel/SelectPanelLI";

const InteractionLI = (props) => {
  const interactionTypes = useSelector((state) => state.data.interactionTypes);
  const typeId = props.data.interactionTypeId
  let typeName = "Interaction"
  if(typeId in interactionTypes) typeName = interactionTypes[typeId].name 

  return (
    <SelectPanelLI
      component={props.component}
      primary={typeName}
      secondary={props.data.description}
    ></SelectPanelLI>
  );
};

export default InteractionLI;
