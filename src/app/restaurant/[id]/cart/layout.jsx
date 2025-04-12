import React from "react";
import Protected from "../../../../hooks/useProtected";

const layout = ({ children }) => {
  return <Protected>{children}</Protected>;
};

export default layout;
