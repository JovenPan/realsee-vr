import React from "react";
import { Link } from "react-router-dom";
import { PROJECT_LIST } from "../../common/constant";
import styles from "./index.module.less";

function List() {
  return (
    <div className={styles.layout}>
      <div className={styles.pageWrapper}>
        {PROJECT_LIST.map((group) => {
          return (
            <div className={styles.group} key={group.title}>
              <div className={styles.titleWrapper}>
                <span className={styles.title}>{group.title}</span>
              </div>
              {group.items.map((project) => {
                const work = require(`/assets/${project}/work.json`);

                return (
                  <Link to={`/${project}`} key={project}>
                    <div
                      className={styles.item}
                      style={{
                        backgroundImage: `url(${work.title_picture_url})`,
                      }}
                    >
                      <div className={styles.mask} />
                      <div className={styles.icon}></div>
                      <div className={styles.textWrapper}>
                        <span className={styles.name}>{work.description}</span>
                        <span className={styles.time}>{work.create_time}</span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default List;
