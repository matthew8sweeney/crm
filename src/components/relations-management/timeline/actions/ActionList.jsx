import React from "react";
import { List, Typography } from "@material-ui/core";

const ActionList = (props) => {
  const Component = props.component;

  if (Object.keys(props.data).length > 0)
    return (
      <List>
        {Object.keys(props.data).map((actionId, i) => {
          const actionObj = props.data[actionId];
          return <Component component="li" data={actionObj} key={i} />;
        })}
      </List>
    );

  return (
    <Typography color="textSecondary" style={{ marginTop: 10 }}>
      Nothing to show
    </Typography>
  );
};

export default ActionList;
