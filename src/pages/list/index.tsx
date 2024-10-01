import React from "react";
import { Link } from "react-router-dom";
import { PROJECT_LIST } from "../../common/constant";

function List() {
  return (
    <div>
      <h2>List Page</h2>
      {PROJECT_LIST.map((project) => (
        <Link to={`/${project}`} key={project}>
          {project}
        </Link>
      ))}
    </div>
  );
}

export default List;
