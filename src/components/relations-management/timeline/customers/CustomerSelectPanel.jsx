import React from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

import SelectPanel from "../../../ui/select-panel/SelectPanel";
import CustomerList from "./CustomerList";
import CustomerFilterMenu from "./CustomerFilterMenu";
import classes from "./CustomerSelectPanel.module.css";

const CustomerSelectPanel = (props) => {
  const data = useSelector((state) => state.data);
  const location = useLocation();
  const pathSegments = location.pathname.split("/");

  return (
    <SelectPanel
      tabs={["Leads", "Accounts"]}
      activeTab={pathSegments[2] === "account" ? 1 : 0}
      bodies={[
        <CustomerList data={data.leads} type="lead" />,
        <CustomerList data={data.accounts} type="account" />,
      ]}
      filterMenuComponent={CustomerFilterMenu}
      className={classes.body}
    />
  );
};

export default CustomerSelectPanel;
