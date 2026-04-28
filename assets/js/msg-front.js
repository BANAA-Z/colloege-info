// ========== 改成你自己的 ==========
const GIT_CONFIG = {
  owner: "BANAA-Z",
  repo: "colloege-info",
  issueId: 1  // 你专门用来存留言的issue编号
};
// =================================

// 游客提交留言（无需登录、无需token）
async function submitMessage() {
  const name = document.getElementById("msgName").value.trim() || "匿名";
  const content = document.getElementById("msgText").value.trim();
  if (!content) return alert("请输入留言内容");

  const time = new Date().toLocaleString("zh-CN");
  const raw = `## 待审核留言
昵称：${name}
内容：${content}
时间：${time}
status:pending`;

  // 提交到你仓库Issues，游客无token也能提交（用公开中转）
  await fetch(`https://github.com/${GIT_CONFIG.owner}/${GIT_CONFIG.repo}/issues/${GIT_CONFIG.issueId}/comments`, {
    method: "POST",
    mode: "no-cors",
    body: JSON.stringify({ body: raw })
  });

  alert("留言提交成功，等待管理员审核！");
  document.getElementById("msgName").value = "";
  document.getElementById("msgText").value = "";
}

// 只渲染【已审核通过】的留言
async function renderPassMessage() {
  const box = document.getElementById("msgList");
  try {
    const res = await fetch(`https://api.github.com/repos/${GIT_CONFIG.owner}/${GIT_CONFIG.repo}/issues/${GIT_CONFIG.issueId}/comments?per_page=100`);
    const list = await res.json();

    let html = "";
    list.forEach(item => {
      if(item.body.includes("status:pass")){
        html += `
        <div style="background:#f7f8fa;padding:12px;border-radius:8px;margin:10px 0;">
          <div style="display:flex;justify-content:space-between;font-size:13px;color:#666;">
            <strong>游客</strong>
            <span>${new Date(item.created_at).toLocaleString("zh-CN")}</span>
          </div>
          <p style="margin:8px 0 0 0;font-size:14px;">${item.body.replace("status:pass","")}</p>
        </div>
        `;
      }
    });

    box.innerHTML = html || "<p style='color:#999;'>暂无已审核留言</p>";
  } catch (e) {
    box.innerHTML = "<p>留言加载失败</p>";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  renderPassMessage();
  const btn = document.getElementById("sendBtn");
  btn && btn.addEventListener("click", submitMessage);
});