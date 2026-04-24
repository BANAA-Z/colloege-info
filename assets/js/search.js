// search.js - 导航站搜索功能（从config.js取数据，全局搜索）
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

// 扁平化所有导航数据
const allNavItems = Object.values(NAV_DATA).flat();

// DOM元素
const searchInput = document.getElementById("searchInput");
const searchResult = document.getElementById("searchResult");

// 搜索逻辑
const handleSearch = () => {
  const keyword = searchInput.value.trim().toLowerCase();
  if (!keyword) {
    searchResult.innerHTML = "";
    searchResult.style.display = "none";
    return;
  }

  // 模糊匹配
  const result = allNavItems.filter(item => 
    item.name.toLowerCase().includes(keyword)
  );

  if (result.length === 0) {
    searchResult.innerHTML = '<div class="search-empty">未找到相关内容</div>';
  } else {
    searchResult.innerHTML = result.map(item => `
      <a href="${escapeHtml(item.url)}" target="_blank" class="search-item">
        ${escapeHtml(item.name)}
      </a>
    `).join("");
  }
  searchResult.style.display = "block";
};

// 绑定事件
searchInput.addEventListener("input", handleSearch);
// 点击页面其他区域关闭搜索结果
document.addEventListener("click", (e) => {
  if (!searchInput.contains(e.target) && !searchResult.contains(e.target)) {
    searchResult.innerHTML = "";
    searchResult.style.display = "none";
  }
});