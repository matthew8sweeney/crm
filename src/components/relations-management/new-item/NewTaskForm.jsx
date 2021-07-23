import React from "react";

const NewTaskForm = React.forwardRef((props, ref) => {
  return (
  <form ref={ref}></form>
  );
})

export default NewTaskForm;
