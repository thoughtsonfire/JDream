# 单文件，不切片，上传进度条

> [!NOTE] onUploadProgress 和 AbortController  
> 就这两个 api，不清楚直接搜就行  
> 切片的进度条，按传了多少片算就行

```vue
<template>
  <div class="upload-container">
    <el-upload :show-file-list="false" multiple :http-request="customUpload">
      <el-button type="primary">选择文件</el-button>
    </el-upload>

    <div v-for="item in uploadList" :key="item.uid" class="upload-item">
      <div class="file-info">
        <span>{{ item.name }}</span>
        <div>
          <el-button
            v-if="item.status === 'uploading'"
            size="small"
            type="danger"
            text
            @click="cancelUpload(item)"
          >
            取消
          </el-button>
          <span v-if="item.status === 'success'" style="color: #67c23a;"
            >✔ 成功</span
          >
          <span v-else-if="item.status === 'error'" style="color: #f56c6c;"
            >✖ {{ item.errorText || "失败" }}</span
          >
        </div>
      </div>

      <el-progress
        :percentage="item.progress"
        :status="item.status === 'error' ? 'exception' : ''"
        :stroke-width="14"
        text-inside
      />
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      uploadList: [], // { uid, name, progress, status, controller }
    };
  },
  methods: {
    async customUpload({ file }) {
      const controller = new AbortController();
      const uploadItem = {
        uid: file.uid,
        name: file.name,
        progress: 0,
        status: "uploading",
        controller,
      };
      this.uploadList.push(uploadItem);

      const formData = new FormData();
      formData.append("file", file);

      try {
        await axios.post("/api/upload", formData, {
          headers: { "Content-Type": "multipart/form-data" },
          signal: controller.signal,
          onUploadProgress: (e) => {
            if (e.total > 0) {
              uploadItem.progress = Math.round((e.loaded / e.total) * 100);
            }
          },
        });

        uploadItem.status = "success";
        uploadItem.progress = 100;
      } catch (err) {
        if (axios.isCancel(err)) {
          uploadItem.status = "error";
          uploadItem.errorText = "已取消";
        } else {
          uploadItem.status = "error";
          uploadItem.errorText = "上传失败";
        }
      }
    },

    cancelUpload(item) {
      if (item.controller) {
        item.controller.abort();
      }
    },
  },
};
</script>

<style scoped>
.upload-container {
  max-width: 600px;
  margin-top: 20px;
}
.upload-item {
  margin-top: 10px;
  background: #fafafa;
  padding: 10px;
  border-radius: 8px;
}
.file-info {
  display: flex;
  justify-content: space-between;
  margin-bottom: 6px;
  font-size: 14px;
}
</style>
```

> 这个看需求

```js
// ✅ 对 Axios v1.6+ 通用写法
import axios from "axios";
import xhrAdapter from "axios/lib/adapters/xhr.js"; // 如果报错就试 'axios/lib/adapters/xhr'

axios.defaults.adapter = xhrAdapter;

// 或者只在这个请求用
axios.post("/api/upload", formData, {
  adapter: xhrAdapter,
  headers: { "Content-Type": "multipart/form-data" },
  onUploadProgress: (e) => {
    console.log("progress:", Math.round((e.loaded / e.total) * 100));
  },
});
```
