import * as React from "react";
import * as ReactDOM from "react-dom";
import { RouterProvider } from "react-router-dom";
import router from "./router";

const App: React.FC = () => {
  return <RouterProvider router={router} />;
};

ReactDOM.render(<App></App>, document.getElementById("app"));
