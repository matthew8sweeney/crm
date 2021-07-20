import React from "react";

import SelectPanel from "../../ui/select-panel/SelectPanel";
import classes from "./ActionSelectPanel.module.css";

const ActionSelectPanel = (props) => {
  const data = useSelector((state) => state.data);
  const location = useLocation();
  const pathSegments = location.pathname.split("/");
  let tab
  if()

  return (
    <SelectPanel
      tabs={["Interactions", "Tasks", "Notes", "All"]}
      activeTab={tab}
      bodies={[
        "This will be a list of interactions for the selected customer",
        "This will be a list of tasks for the selected customer",
        "This will be a list of notes for the selected customer",
        "This will be a list of all items for the selected customer",
      ]}
      tabsAnchorEl={props.anchorEl}
      className={classes.body}
    />
  );
};

export default ActionSelectPanel;
