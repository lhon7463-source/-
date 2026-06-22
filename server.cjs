const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const port = 3001;

const baseDir = 'C:\\Users\\Administrator\\Desktop\\陆鸿成的ai作品';

app.use(cors());
app.use('/works', express.static(baseDir));

const videoExtensions = ['.mp4', '.mov', '.avi', '.mkv', '.webm'];
const imageExtensions = ['.png', '.jpg', '.jpeg', '.gif', '.bmp', '.webp'];

function isVideo(file) {
  return videoExtensions.includes(path.extname(file).toLowerCase());
}
function isImage(file) {
  return imageExtensions.includes(path.extname(file).toLowerCase());
}

function scanFolder(folderPath, urlPrefix) {
  const items = fs.readdirSync(folderPath, { withFileTypes: true });
  let videos = [];
  let images = [];
  for (const item of items) {
    if (item.isDirectory()) {
      const sub = scanFolder(path.join(folderPath, item.name), `${urlPrefix}/${encodeURIComponent(item.name)}`);
      videos = videos.concat(sub.videos);
      images = images.concat(sub.images);
    } else if (isVideo(item.name)) {
      videos.push(`${urlPrefix}/${encodeURIComponent(item.name)}`);
    } else if (isImage(item.name)) {
      images.push(`${urlPrefix}/${encodeURIComponent(item.name)}`);
    }
  }
  return { videos, images };
}

function scanWorks() {
  const folders = fs.readdirSync(baseDir, { withFileTypes: true })
    .filter(d => d.isDirectory())
    .map(d => d.name);

  return folders.map(folder => {
    const folderPath = path.join(baseDir, folder);
    const urlPrefix = `/works/${encodeURIComponent(folder)}`;
    const { videos, images } = scanFolder(folderPath, urlPrefix);
    return { title: folder, videos, images };
  });
}

app.get('/api/works', (req, res) => {
  try {
    res.json(scanWorks());
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: '读取文件失败' });
  }
});

app.listen(port, () => {
  console.log(`✅ 本地服务已启动：http://localhost:${port}`);
  console.log(`📂 作品接口：http://localhost:${port}/api/works`);
});
