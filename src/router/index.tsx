import React from "react";
import { createHashRouter } from "react-router-dom";
import List from "../pages/list";
import Detail from "../pages/detail";

const router = createHashRouter([
  {
    path: "/",
    element: <List />,
  },

  {
    path: "/:projectName",
    element: <Detail />,
  },
]);

export default router;
