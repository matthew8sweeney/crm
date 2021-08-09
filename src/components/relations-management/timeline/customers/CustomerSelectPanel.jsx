import React from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

import SelectPanel from "../../../ui/select-panel/SelectPanel";
import CustomerList from "./CustomerList";
import CustomerFilterMenu from "./CustomerFilterMenu";
import classes from "./CustomerSelectPanel.module.css";

const filterCustomerData = (customerData, filterConfig) => {
  const filteredKeys = Object.keys(customerData).filter((customerKey) => {
    let result = true;
    for (const criterionKey in filterConfig) {
      const dataVal = customerData[customerKey][criterionKey];
      const criterionTerms = filterConfig[criterionKey].split(" ");
      const criterion = new RegExp(`(${criterionTerms.join(").*(")})`, "i");
      result = result && dataVal.match(criterion);
    }
    return result;
  });
  return Object.fromEntries(
    filteredKeys.map((key) => [key, customerData[key]])
  );
};

const CustomerSelectPanel = (props) => {
  const data = useSelector((state) => state.data);
  const location = useLocation();
  const pathSegments = location.pathname.split("/");

  const params = new URLSearchParams(location.search.toString());
  const filterConfig = {};
  if (params.has("name")) filterConfig.name = params.get("name");
  if (params.has("industry")) filterConfig.industry = params.get("industry");
  if (params.has("website")) filterConfig.website = params.get("website");
  if (params.has("address")) filterConfig.address = params.get("address");

  const leadData = filterCustomerData(data.leads, filterConfig);
  const accountData = filterCustomerData(data.accounts, filterConfig);

  let filterIsActive = false;
  for (const criterionKey in filterConfig)
    if (filterConfig[criterionKey] !== "") filterIsActive = true;

  return (
    <SelectPanel
      tabs={["Leads", "Accounts"]}
      activeTab={pathSegments[2] === "account" ? 1 : 0}
      bodies={[
        <CustomerList data={leadData} type="leads" />,
        <CustomerList data={accountData} type="accounts" />,
      ]}
      filterMenuComponent={CustomerFilterMenu}
      hideFilterBadge={!filterIsActive}
      className={classes.body}
    />
  );
};

export default CustomerSelectPanel;
