import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Button, List, ListItem, Popover, TextField } from "@material-ui/core";

import IndustrySelect from "../../IndustrySelect";

const CustomerFilterMenu = (props) => {
  const history = useHistory();
  const industries = useSelector((state) => state.data.industries);
  const [name, setName] = useState("");
  const [industry, setIndustry] = useState(null);
  const [website, setWebsite] = useState("");
  const [address, setAddress] = useState("");
  const search = history.location.search;

  // get query params after mounting
  useEffect(() => {
    const params = new URLSearchParams(search);
    if (params.has("name")) setName(params.get("name"));
    if (params.has("website")) setWebsite(params.get("website"));
    if (params.has("address")) setAddress(params.get("address"));
    if (params.has("industry")) {
      const id = params.get("industry");
      setIndustry(
        industries != null && id in industries ? industries[id] : null
      );
    }
  }, [industries]);

  // debounce changes to query params
  useEffect(() => {
    const timer = setTimeout(() => {
      const params = new URLSearchParams(search);
      params.set("name", name);
      params.set("industry", industry != null ? industry.id : "");
      params.set("website", website);
      params.set("address", address);
      history.replace({ search: params.toString() });
    }, 500);
    return () => clearTimeout(timer);
  }, [name, industry, website, address]);

  const nameChangeHandler = (event) => setName(event.target.value);
  const addressChangeHandler = (event) => setAddress(event.target.value);
  const websiteChangeHandler = (event) => setWebsite(event.target.value);
  const industryChangeHandler = (event, newValue) =>
    setIndustry(newValue != null ? newValue : "");

  const clearAllHandler = () => {
    setName("");
    setIndustry(null);
    setWebsite("");
    setAddress("");
  };

  return (
    <Popover in={props.open} {...props}>
      <List>
        <ListItem style={{ paddingTop: 16 }}>
          <TextField
            value={name}
            label="Name"
            onChange={nameChangeHandler}
            variant="outlined"
            autoComplete="new-password"
          />
        </ListItem>
        <ListItem style={{ flexDirection: "row" }}>
          <IndustrySelect
            value={industry}
            onChange={industryChangeHandler}
            variant="outlined"
            fullwidth
          />
        </ListItem>
        <ListItem>
          <TextField
            value={website}
            label="Website"
            onChange={websiteChangeHandler}
            variant="outlined"
          />
        </ListItem>
        <ListItem>
          <TextField
            value={address}
            label="Address"
            onChange={addressChangeHandler}
            variant="outlined"
          />
        </ListItem>
        <ListItem style={{ justifyContent: "center" }}>
          <Button onClick={clearAllHandler} color="secondary">
            Clear All
          </Button>
        </ListItem>{" "}
      </List>
    </Popover>
  );
};

export default CustomerFilterMenu;
