import React from "react";
import ActionLI from "./ActionLI";

const TaskLI = (props) => {
  return (
    <ActionLI
      component={props.component}
      primary={props.data.title}
      secondary={props.data.description}
      data={props.data}
    />
  );
};

export default TaskLI;
