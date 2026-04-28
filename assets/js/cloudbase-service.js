// assets/js/cloudbase-service.js
const ENV_ID = "college-info-d8gllm2mv8ef87c41";
const REGION = "ap-shanghai";

const app = cloudbase.init({ env: ENV_ID, region: REGION });
const auth = app.auth();
export const db = app.database();

// 初始化匿名登录
export async function initCloudbase() {
  await auth.signInAnonymously();
}

// 访客统计 空函数 彻底禁用，交给Firebase
export async function updateViewStat() {}

// 留言列表 - 完整 年-月-日 时:分
export async function loadMessage() {
  try {
    const res = await db
      .collection("messages")
      .where({ status: "approved" })
      .orderBy("createTime", "desc")
      .get();

    const listDom = document.getElementById("messageList");
    listDom.innerHTML = "";

    res.data.forEach(item => {
      let formatTime = "未知时间";
      if (item.createTime) {
        const d = new Date(item.createTime);
        const y = d.getFullYear();
        const m = String(d.getMonth() + 1).padStart(2, "0");
        const day = String(d.getDate()).padStart(2, "0");
        const h = String(d.getHours()).padStart(2, "0");
        const min = String(d.getMinutes()).padStart(2, "0");
        formatTime = `${y}-${m}-${day} ${h}:${min}`;
      }

      listDom.innerHTML += `
        <div class="message-item" style="padding:12px;border-radius:8px;background:#f7f8fa;margin-bottom:10px;">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;">
            <strong style="font-size:14px;">${item.name || "匿名"}</strong>
            <span style="font-size:12px;color:#999;">${formatTime}</span>
          </div>
          <p style="margin:0;font-size:14px;color:#333;line-height:1.6;">${item.content}</p>
        </div>
      `;
    });
  } catch (e) {
    console.error("留言加载失败", e);
  }
}

// 提交留言
export async function postMessage(name, content) {
  await db.collection("messages").add({
    name,
    content,
    status: "pending",
    createTime: new Date()
  });
}

// 页面自动初始化
(async function run() {
  await initCloudbase();
  await loadMessage();
})();

// 留言提交按钮
document.getElementById("submitBtn").addEventListener("click", async () => {
  const name = document.getElementById("nameInput").value.trim() || "匿名";
  const content = document.getElementById("contentInput").value.trim();
  if (!content) return alert("请输入留言内容");

  await postMessage(name, content);
  alert("留言提交成功，等待审核！");
  document.getElementById("nameInput").value = "";
  document.getElementById("contentInput").value = "";
  loadMessage();
});