# 新增一个 VR 项目

## 获取链接
- 分享到微信，复制链接
  - 贝壳链接 https://realsee.com/ke/OWaK3jP4a7b9VPy4/pxOw3rLAKYltjhphNTgXVbaToJm56ZBl
  - 如视链接 https://realsee.cn/e0PPrBlY

## 获取 work.json
- 贝壳链接
    1. 浏览器打开链接，进入开发者模式，点击 Network，点击 Doc，选择文档后点击 Response
    2. 直接查看代码
        ```
        window.__module__data = {
                    "defaultMode": "",
                    "work": {
                        // 这里就是 work.json 内容
                    }
        }
        ```
- 如视链接
    1. 浏览器打开链接，command+s，保存网页
    2. vscode 打开保存的 htm 文件
        ```
        <script type="application/json" id="vr-work-state">
        <!-- [{"work":{
            // 这里就是 work.json 内容
        }}] -->
        </script>
        ```

## 创建项目资源
1. 在 assets 目录下新建文件夹，命名格式为「房屋拼音首字母_拍摄日期」，如 jxls_2024.04.03、ysy_2024.03.09
2. 创建 work-original.json（信息存档以及下载资源）和 work.json（项目运行时使用），将上述操作获取的 work.json 内容填入
   - 如果图片后缀如 14_r_kdaoJD.jpg，表示为马赛克图片，手动改为 14_r.jpg
3. 复制创建 download.js 文件
   - 更新 download.js 里项目地址
   - package.json 中添加 `"type": "module",`
   - 在项目目录（如 jxls_2024.04.03）下执行 `node ./download.js`，自动创建 panorama、model 目录并下载相关资源
4. 手动创建 original 目录，拖入 preview_0/1.jpg 原图，利用 https://tinypng.com/ 压缩 preview_0/1.jpg
5. 修改 work.json 内容
   - 只保留 create_time、initial、model、name、observers、panorama、picture_url、title_picture_url、hierarchy_floor_plan、outline_floor_plan 字段
   - 去掉 model.material_base_url 字段
   - 修改 model 中模型文件（file_url）和模型纹理（material_textures）路径
   - 去掉 panorama.base_url 字段
   - 修改 panorama 中图片路径
   - 修改 picture_url、title_picture_url、hierarchy_floor_plan、outline_floor_plan 路径
6. 在 src/common/constant 中添加项目信息 projectKey
  
## 执行项目
- package.json 中移除 `"type": "module",`
- 项目根目录下执行 `npm run dev`

## 提交项目
- 项目根目录下执行 `npm run build`
- git 提交代码，github 自动构建，访问 https://jovenpan.github.io/realsee-vr/dist/ 即为最新版本
- 将 dist 目录内容拷贝至 site-colletion/realsee-vr 目录下，git 提交代码，github 自动构建 ，访问 https://jovenpan.github.io/site-colletion/realsee-vr/ 即为最新版本
- 将 site-colletion 整体更新至服务器

## 关于 work.json
[work 的使用限制](https://developers.realsee.com/docs/#/docs/five/web/tutorial/vanilla/1.displaying-work?id=work-%e7%9a%84%e4%bd%bf%e7%94%a8%e9%99%90%e5%88%b6)
- /five
  - /index-cracked.js 为破解版，绕过了使用限制。主要原理为：取 location.hostname 值的地方都改为 'localhost'
  - /index-cracked-nologo.js 在破解版基础上，去除了 "Powered by 如视"
  - /index-original.js 为原版，在开发环境可以正常运行，但使用域名访问时则报错


# Five 快速上手使用 [Five Quick Start]

Five 提供了快速上手体验的项目生成工具，您可以通过他熟悉 Five 的功能以及尝试基于 Five 开发功能。

1. 先创建一个文件夹(five-quick-start), 作为项目根目录并且使用 `npm init` 命令初始化一个工程。

```shell
mkdir five-quick-start && cd five-quick-start && npm init -y
```

2. 安装 Five

```shell
npm install @realsee/five
```

3. 通过 Five 的内置 Quick-Start 脚本。补完当前项目

```shell
npx five-quick-start-init
```

项目的文件结构如下

```
.
├── README.md
├── assets                   静态文件（测试数据）
│   ├── data0.json
│   └── data1.json
├── index.html               页面模版
├── index.tsx                逻辑代码
├── package.json             npm 包管理描述
├── tsconfig.json            typescript 配置
├── webpack.config.js        webpack 开发环境配置
└── webpack.production.js    webpack 生产配置
```

通过 npm-script 运行测试环境

```shell
npm run dev
```

默认将会在 `port: 3000` 开启 `webpack dev server`。你也可以在 `webpack.config.js` 中修改配置。

4. 现在可以打来浏览器 `http://0.0.0.0:3000` 来看看项目初始化的效果了。你可以修改代码来体验一下如何使用 Five 来二次开发。
