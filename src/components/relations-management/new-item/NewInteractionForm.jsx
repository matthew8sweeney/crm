import React from "react";

const NewInteractionForm = React.forwardRef((props, ref) => {
  return (
  <form ref={ref}></form>
  );
})

export default NewInteractionForm;
