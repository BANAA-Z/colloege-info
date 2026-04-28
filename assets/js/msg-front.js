// 留言公共配置
const MSG_API = "https://api.jsonbin.io/v3/b/671c7921ad19ca34f8b5a925";
const MSG_KEY = "$2a$10$OXQd1W6y1u5F5c0G7R0y/.m5t0d0X9Z8w7V6b5N4M3K2J1H0G";

// 获取全部留言数据
async function getAllMsgData() {
  const res = await fetch(MSG_API);
  const json = await res.json();
  return json.record || { pass: [], pending: [] };
}

// 保存数据
async function saveMsgData(data) {
  await fetch(MSG_API, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "X-Master-Key": MSG_KEY
    },
    body: JSON.stringify(data)
  });
}

// 只渲染【已审核通过】留言
async function renderPassMessage() {
  const data = await getAllMsgData();
  const list = data.pass;
  const box = document.getElementById("msgList");

  if (!box) return;

  if (list.length === 0) {
    box.innerHTML = "<p style='color:#999;'>暂无留言</p>";
    return;
  }

  let html = "";
  list.forEach(item => {
    html += `
    <div style="background:#f7f8fa;padding:12px;border-radius:8px;margin:10px 0;">
      <div style="display:flex;justify-content:space-between;font-size:13px;color:#666;">
        <strong>${item.name || "匿名"}</strong>
        <span>${item.time}</span>
      </div>
      <p style="margin:8px 0 0 0;font-size:14px;color:#333;line-height:1.6;">${item.content}</p>
    </div>
    `;
  });
  box.innerHTML = html;
}

// 游客提交留言 → 进入待审核
async function submitMessage() {
  const name = document.getElementById("msgName").value.trim() || "匿名";
  const content = document.getElementById("msgText").value.trim();

  if (!content) {
    alert("请输入留言内容");
    return;
  }

  const now = new Date();
  const time = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")} ${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;

  const data = await getAllMsgData();
  data.pending.unshift({ name, content, time });
  await saveMsgData(data);

  alert("留言提交成功，等待管理员审核！");
  document.getElementById("msgName").value = "";
  document.getElementById("msgText").value = "";
}

// 绑定按钮 & 初始化
document.addEventListener("DOMContentLoaded", () => {
  renderPassMessage();
  const btn = document.getElementById("sendBtn");
  if (btn) btn.addEventListener("click", submitMessage);
});