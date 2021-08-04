import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Button, ListItem, Menu, TextField } from "@material-ui/core";

const ActionFilterMenu = (props) => {
  const history = useHistory();
  const [searchStr, setSearchStr] = useState("");
  const search = history.location.search;

  // get query params after mounting
  useEffect(() => {
    const params = new URLSearchParams(search);
    if (params.has("actionSearch")) setSearchStr(params.get("actionSearch"));
  }, []);

  // debounce changes to url
  useEffect(() => {
    const timer = setTimeout(() => {
      const params = new URLSearchParams(search);
      params.set("actionSearch", searchStr);
      history.replace({ search: params.toString() });
    }, 500);
    return () => clearTimeout(timer);
  }, [searchStr]);

  const searchStrChangeHandler = (event) => setSearchStr(event.target.value);

  const clearAllHandler = () => {
    setSearchStr("");
  };

  return (
    <Menu {...props}>
      <ListItem style={{ paddingTop: 16 }}>
        <TextField
          value={searchStr}
          label="Contains:"
          onChange={searchStrChangeHandler}
          variant="outlined"
        />
      </ListItem>
      <ListItem style={{ justifyContent: "center" }}>
        <Button onClick={clearAllHandler} color="secondary">
          Clear
        </Button>
      </ListItem>
    </Menu>
  );
};

export default ActionFilterMenu;
