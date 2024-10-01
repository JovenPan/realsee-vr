import React from "react";
import { createBrowserRouter } from "react-router-dom";
import List from "../pages/list";
import Detail from "../pages/detail";

const router = createBrowserRouter([
  {
    path: "/",
    element: <List />,
    errorElement: <List />,
  },
  {
    path: "/:projectName",
    element: <Detail />,
    errorElement: <List />,
  },
  {
    path: "*",
    element: <List />,
    errorElement: <List />,
  },
]);

export default router;
