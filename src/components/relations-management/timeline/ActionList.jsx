import { List } from "@material-ui/core";
import React from "react";

//

const ActionList = (props) => {
  const component = props.component  // || some default general component
  
  return (
    <List>
      {props.data.map((actionObj) => (
        <component data={actionObj} />
      ))}
    </List>
  );
};

export default ActionList;
