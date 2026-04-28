// fold.js - 最终版：导航链接下方永久显示描述
import { NAV_DATA } from "./config.js";

// XSS防护
const escapeHtml = (unsafe) => {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
};

// 通用导航板块渲染（考研/考公/校招/工具通用）
const renderNavSection = (list, containerId, title) => {
  const container = document.getElementById(containerId);
  if (!container) return;

  // 每个链接包装成一个带描述的item
  container.innerHTML = `
    <div class="fold-header">
      <h3>${escapeHtml(title)}</h3>
      <span class="fold-icon">▼</span>
    </div>
    <div class="fold-content">
      ${list.map(item => `
        <div class="nav-item">
          <a href="${escapeHtml(item.url)}" target="_blank" class="nav-card">
            ${escapeHtml(item.name)}
          </a>
          <p class="nav-desc">${escapeHtml(item.desc || '')}</p>
        </div>
      `).join("")}
    </div>
  `;

  // 绑定折叠事件
  const header = container.querySelector(".fold-header");
  const content = container.querySelector(".fold-content");
  const icon = container.querySelector(".fold-icon");

  header.addEventListener("click", () => {
    content.classList.toggle("fold-open");
    icon.textContent = content.classList.contains("fold-open") ? "▲" : "▼";
  });
};

// 专门渲染B站学习资源板块（结构和交互和其他板块完全一致）
const renderBilibiliSection = (containerId, title) => {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = `
    <div class="fold-header">
      <h3>${escapeHtml(title)}</h3>
      <span class="fold-icon">▼</span>
    </div>
    <div class="fold-content">
      <div id="md-content" style="width: 100%; padding: 10px 0;"></div>
    </div>
  `;

  // 绑定折叠事件
  const header = container.querySelector(".fold-header");
  const content = container.querySelector(".fold-content");
  const icon = container.querySelector(".fold-icon");

  header.addEventListener("click", () => {
    content.classList.toggle("fold-open");
    icon.textContent = content.classList.contains("fold-open") ? "▲" : "▼";
  });
};

// 页面加载完成后，渲染所有板块
document.addEventListener("DOMContentLoaded", () => {
  renderNavSection(NAV_DATA.need, "need-section", "常用");
  renderNavSection(NAV_DATA.kaoyan, "kaoyan-section", "考研");
  renderNavSection(NAV_DATA.kaogong, "kaogong-section", "考公");
  renderNavSection(NAV_DATA.xiaozhao, "xiaozhao-section", "国企校招");
  renderNavSection(NAV_DATA.academic, "academic-section", "学术研究");
  renderNavSection(NAV_DATA.tools, "tools-section", "硬核工具");
  


  // 渲染B站学习资源板块
  //renderBilibiliSection("bilibili-section", "B站学习资源");
});