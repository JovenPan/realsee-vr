import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Five, Mode, State, Work, parseWork } from "@realsee/five";
import {
  createFiveProvider,
  FiveCanvas,
  useFiveCurrentState,
  useFiveWork,
} from "@realsee/five/react";
import { PROJECT_LIST } from "../../common/constant";
import "./index.less";

const FiveProvider = createFiveProvider({
  imageOptions: { size: 1024 },
  onlyRenderIfNeeds: true,
});

const Viewport: React.FC = () => {
  return (
    <div className="viewport">
      <FiveCanvas width={512} height={512}></FiveCanvas>
    </div>
  );
};

const Controller: React.FC = () => {
  return (
    <div className="controller">
      <h1>Five Quick Start</h1>
      <ModeChangePanel />
      <CameraPanel />
      <PanoPanel />
    </div>
  );
};

const MODE_LABELS: Partial<Record<Mode, string>> = {
  [Five.Mode.Panorama]: "全景游走模式",
  [Five.Mode.Floorplan]: "模型总览模式",
  [Five.Mode.Topview]: "户型图模式",
  [Five.Mode.Model]: "模型游走模式",
};

const ModeChangePanel: React.FC = () => {
  const [state, setState] = useFiveCurrentState();

  const changeMode = React.useCallback((mode: Mode) => setState({ mode }), []);
  return (
    <div className="panel">
      <div className="label">模态切换:</div>
      <div className="content">
        <div>{MODE_LABELS[state.mode]}</div>
        <div>
          <button onClick={() => changeMode(Five.Mode.Panorama)}>
            {MODE_LABELS[Five.Mode.Panorama]}
          </button>
          <button onClick={() => changeMode(Five.Mode.Floorplan)}>
            {MODE_LABELS[Five.Mode.Floorplan]}
          </button>
          <button onClick={() => changeMode(Five.Mode.Topview)}>
            {MODE_LABELS[Five.Mode.Topview]}
          </button>
          <button onClick={() => changeMode(Five.Mode.Model)}>
            {MODE_LABELS[Five.Mode.Model]}
          </button>
        </div>
      </div>
    </div>
  );
};

const CameraPanel: React.FC = () => {
  const [state, setState] = useFiveCurrentState();
  return (
    <div className="panel">
      <div className="label">相机控制:</div>
      <div className="content">
        <div>水平角: {state.longitude.toFixed(2)}（弧度）</div>
        <div>俯仰角: {state.latitude.toFixed(2)}（弧度）</div>
        <div>可视角度: {state.fov.toFixed(0)}（角度）</div>
        <div>
          <button
            onMouseDown={() => setState({ longitude: state.longitude + 0.01 })}
          >
            向左
          </button>
          <button
            onMouseDown={() => setState({ latitude: state.latitude - 0.01 })}
          >
            向上
          </button>
          <button
            onMouseDown={() => setState({ latitude: state.latitude + 0.01 })}
          >
            向下
          </button>
          <button
            onMouseDown={() => setState({ longitude: state.longitude - 0.01 })}
          >
            向右
          </button>
          <button onMouseDown={() => setState({ fov: state.fov + 1 })}>
            可视角度+
          </button>
          <button onMouseDown={() => setState({ fov: state.fov - 1 })}>
            可视角度-
          </button>
        </div>
      </div>
    </div>
  );
};

const PanoPanel: React.FC = () => {
  const [work] = useFiveWork();
  const [currentState, setState] = useFiveCurrentState();
  const [panos, setPanos] = React.useState<State[]>(() => [currentState]);
  return (
    <div className="panel">
      <div className="label">存储快照:</div>
      <div className="content">
        {panos.map((state, index) => {
          return (
            <button key={index} onClick={() => setState(state)}>
              快照{index + 1}
            </button>
          );
        })}
        <button onClick={() => setPanos(panos.concat(currentState))}>+</button>
      </div>
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
    if (PROJECT_LIST.indexOf(projectKey) == -1) {
      navigate("/");
      return;
    }

    loadWork(`./assets/${projectKey}/work.json`);
  }, []);

  if (work) {
    return (
      <FiveProvider
        initialWork={work}
        ref={(ref) => Object.assign(window, { five: ref?.five })}
      >
        <div className="layout div">
          <Viewport />
          <Controller />
        </div>
      </FiveProvider>
    );
  }
  return null;
};

export default Detail;
