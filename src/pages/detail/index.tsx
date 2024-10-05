import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Five, Mode } from "@realsee/five";
import {
  createFiveProvider,
  FiveCanvas,
  useFiveCurrentState,
} from "@realsee/five/react";
import { useFetchWork } from "./hooks/useFetchWork";
import { useWindowDimensions } from "./hooks/useWindowDimensions";
import { isProjectKey } from "../../common/utils";
import styles from "./index.module.less";

import IconPanorama from "../../static/light/mode_panorama.svg";
import IconModel from "../../static/light/mode_model.svg";
import IconFloorplan from "../../static/light/mode_floorplan.svg";
import IconTopview from "../../static/light/mode_topview.svg";

const MODE_LABELS: Partial<Record<Mode, string>> = {
  [Five.Mode.Panorama]: "全景游走",
  [Five.Mode.Model]: "模型游走",
  [Five.Mode.Floorplan]: "模型总览",
  [Five.Mode.Topview]: "户型图",
};

const FiveProvider = createFiveProvider({
  imageOptions: { size: 2048 },
  onlyRenderIfNeeds: true,
});

const ModeChangePanel: React.FC = () => {
  const [state, setState] = useFiveCurrentState();

  const changeMode = React.useCallback((mode: Mode) => setState({ mode }), []);
  const arr = [
    {
      mode: Five.Mode.Panorama,
      icon: IconPanorama,
    },
    {
      mode: Five.Mode.Floorplan,
      icon: IconFloorplan,
    },
    {
      mode: Five.Mode.Model,
      icon: IconModel,
    },
    {
      mode: Five.Mode.Topview,
      icon: IconTopview,
    },
  ];
  return (
    <div className={styles.controller}>
      {arr.map((item) => (
        <div
          key={item.mode}
          className={`${styles.btn} ${
            state.mode === item.mode ? styles.active : ""
          }`}
          onClick={() => changeMode(item.mode)}
        >
          <item.icon className={styles.icon} width={24} height={24} />
          {MODE_LABELS[item.mode]}
        </div>
      ))}
    </div>
  );
};

const Detail: React.FC = () => {
  const { projectKey = "" } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isProjectKey(projectKey)) {
      // 项目不存在，跳转到 list 页
      navigate("/");
      return;
    }
  }, []);

  const work = isProjectKey(projectKey)
    ? useFetchWork(`./assets/${projectKey}/work.json`)
    : null;
  const size = useWindowDimensions();

  if (work) {
    const { name, create_time } = JSON.parse(work.raw.works[0]);

    return (
      <FiveProvider
        initialWork={work}
        ref={(ref) => Object.assign(window, { five: ref?.five })}
      >
        <div className={styles.layout}>
          <FiveCanvas {...size}></FiveCanvas>
          <div className={styles.textWrapper}>
            <span className={styles.name}>{name}</span>
            <span className={styles.time}>{create_time}</span>
          </div>
          <ModeChangePanel />
        </div>
      </FiveProvider>
    );
  }

  return null;
};

export default Detail;
