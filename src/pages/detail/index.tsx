import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Five, Mode, Work, parseWork } from "@realsee/five";
import {
  createFiveProvider,
  FiveCanvas,
  useFiveCurrentState,
} from "@realsee/five/react";
import { PROJECT_LIST } from "../../common/constant";
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

const Viewport: React.FC = () => {
  return (
    <FiveCanvas
      width={window.innerWidth}
      height={window.innerHeight}
    ></FiveCanvas>
  );
};

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
  const [work, setWork] = React.useState<Work>();

  const loadWork = React.useCallback((url: string) => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => setWork(parseWork(data)));
  }, []);

  const { projectKey = "" } = useParams();
  const navigate = useNavigate();

  React.useEffect(() => {
    const combinedItems = PROJECT_LIST.reduce((acc: string[], item) => {
      return acc.concat(item.items);
    }, []);

    if (combinedItems.indexOf(projectKey) == -1) {
      // 项目不存在，跳转到 list 页
      navigate("/");
      return;
    }

    loadWork(`./assets/${projectKey}/work.json`);
  }, []);

  if (work) {
    const { name, create_time } = JSON.parse(work.raw.works[0]);

    return (
      <FiveProvider
        initialWork={work}
        ref={(ref) => Object.assign(window, { five: ref?.five })}
      >
        <div className={styles.layout}>
          <Viewport />
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
