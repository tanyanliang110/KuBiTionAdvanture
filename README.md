# 超苦逼冒险者

一个 HTML5 沙盒生存文字游戏。探索地图、收集资源、建造设施，并尽可能深入地牢。

## 启动游戏

Windows 下直接双击 `start.bat`。

脚本会启动本地网页服务器，并自动打开：

```text
http://127.0.0.1:8000
```

电脑需要安装 Python 3，不需要 npm。

也可以手动运行：

```powershell
python -m http.server 8000
```

然后访问上述地址。

## 本地存档

游戏使用浏览器本地存储保存进度。

存档界面提供三个独立存档位，每个存档位支持：

- 保存
- 读取
- 新游戏
- 导入 JSON 存档
- 导出 JSON 存档
- 删除存档

建议定期使用“导出”功能备份存档。清除浏览器网站数据或更换浏览器配置可能会导致本地存档不可见。

## 项目结构

- `index.html`：游戏入口
- `src/main.js`：游戏界面与主要逻辑
- `src/data*.js`：游戏数据
- `src/local_storage.js`：本地存档系统
- `res/`：音效和资源
- `start.bat`：本地启动脚本

## 开发测试

运行本地存档测试：

```powershell
node tests/local_storage.test.js
```
