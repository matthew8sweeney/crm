import React from "react";
import { useSelector } from "react-redux";
import ActionLI from "./ActionLI";

const InteractionLI = (props) => {
  const interactionTypes = useSelector((state) => state.data.interactionTypes);
  const typeId = props.data.interactionTypeId
  let typeName = "Interaction"
  if(typeId in interactionTypes) typeName = interactionTypes[typeId].name 

  return (
    <ActionLI
      component={props.component}
      primary={typeName}
      secondary={props.data.description}
      data={props.data}
    />
  );
};

export default InteractionLI;
