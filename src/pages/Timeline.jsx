import { AppBar, Divider } from "@material-ui/core";
import React, { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";

import CustomerSelectPanel from "../components/relations-management/customer-select/CustomerSelectPanel";
import WidgetSelectPanel from "../components/relations-management/customer-widget-select/WidgetSelectPanel";
import useTitle from "../hooks/use-title";

import classes from "./Timeline.module.css";

const Timeline = (props) => {
  useTitle("Timeline");

  // TODO consider going back to 2 AppBars, using negative margin
  const customerSelectRef = useRef();
  const widgetSelectRef = useRef();
  const setRerendered = useState(false)[1]
  // rerender after mounting so the refs have have current elements
  useEffect(()=>{
    setRerendered(true)
  }, [setRerendered])

  return (
    <>
      <AppBar>
        <div
          className={`${classes.select} ${classes["customer-select"]}`}
          ref={customerSelectRef}
        ></div>
        <Divider orientation="vertical" />
        <div
          className={`${classes.select} ${classes["widget-select"]}`}
          ref={widgetSelectRef}
        ></div>
      </AppBar>
      <CustomerSelectPanel anchorEl={customerSelectRef.current} />
      <WidgetSelectPanel anchorEl={widgetSelectRef.current} />
    </>
  );
};

export default Timeline;
