/*
 * 下载如视 VR 上的资源
 */

import axios from "axios";
import fs from "fs";

// 创建文件夹
function createDir(path) {
  // 判断文件夹是否存在，不存在则创建
  if (!fs.existsSync(path)) {
    fs.mkdir(path, { recursive: true }, (err) => {
      if (err) {
        throw err;
      }
    });
  }
}

// 下载全景图
function downloadPanorama(work) {
  const path = "./panorama/";

  createDir(path);

  work.panorama.list.forEach((point) => {
    const arr = [
      point.front,
      point.back,
      point.left,
      point.right,
      point.up,
      point.down,
    ];

    arr.forEach((image) => {
      console.log(
        image.indexOf("http") === 0 ? image : `${work.base_url}${image}`
      );
      downloadFile(
        image.indexOf("http") === 0 ? image : `${work.base_url}${image}`,
        `${path}${image.split("/").pop()}`
      );
    });
  });
}

// 下载模型和纹理
function downloadModel(work) {
  const path = "./model/";

  createDir(path);

  // 下载模型
  downloadFile(
    work.model.file_url.indexOf("http") === 0
      ? work.model.file_url
      : `${work.base_url}${work.model.file_url}`,
    `${path}auto3d.at3d`
  );

  // 下载 texture
  work.model.material_textures.forEach((texture) => {
    downloadFile(
      texture.indexOf("http") === 0
        ? texture
        : `${work.base_url}${work.model.material_base_url}${texture}`,
      texture.indexOf("http") === 0
        ? `${path}${texture.split("/").pop()}`
        : `${path}${texture}`
    );
  });
}

// 下载预览图
function downloadPreview(work) {
  downloadFile(work.picture_url, "./preview_0.jpg");
  downloadFile(work.title_picture_url, "./preview_1.jpg");
}

// 下载户型图
function downloadFloorPlan(work) {
  work.hierarchy_floor_plan &&
    downloadFile(work.hierarchy_floor_plan[0].url, "./floor_plan.jpg");
  work.outline_floor_plan &&
    downloadFile(work.outline_floor_plan[0].url, "./floor_plan_outline.jpg");
}

// 下载文件
function downloadFile(url, path) {
  axios
    .get(url, {
      // 设置返回的类型是二进制
      responseType: "arraybuffer",
    })
    .then((res) => {
      fs.writeFile(path, res.data, "binary", (err) => {
        if (err) {
          console.log(`${path} download error`, err);
        } else {
          console.log(`${path} download success`);
        }
      });
    });
}

export function download() {
  fs.readFile("./work-original.json", "utf8", (err, data) => {
    if (err) throw err;
    const work = JSON.parse(data);

    downloadPanorama(work);
    downloadModel(work);
    downloadPreview(work);
    downloadFloorPlan(work);
  });
}
