import React from "react";
import { Link } from "react-router-dom";

function List() {
  return (
    <div>
      <h2>List Page</h2>
      <Link to="/jxls_2024.04.03">jxls_2024.04.03</Link>
      <Link to="/jxls_2024.07.21">jxls_2024.07.21</Link>
      <Link to="/ysy_2024.09.28">ysy_2024.09.28</Link>
    </div>
  );
}

export default List;
