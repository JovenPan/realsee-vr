import React from "react";
import { Link } from "react-router-dom";
import { PROJECT_LIST } from "../../common/constant";
import styles from "./index.module.less";

function List() {
  return (
    <div className={styles.layout}>
      <div className={styles.pageWrapper}>
        {PROJECT_LIST.map((project) => {
          const work = require(`/assets/${project}/work.json`);

          return (
            <Link to={`/${project}`} key={project}>
              <div
                className={styles.preview}
                style={{
                  backgroundImage: `url(${work.title_picture_url})`,
                }}
              >
                <div className={styles.mask} />
                <div className={styles.textWrapper}>
                  <span className={styles.name}>{work.name}</span>
                  <span className={styles.time}>{work.create_time}</span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default List;
