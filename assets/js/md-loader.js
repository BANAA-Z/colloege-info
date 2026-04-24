// md-loader.js - Markdown渲染（保留你原有逻辑，适配模块化）
// 引入CDN版marked.js（无依赖，直接加载）
import { marked } from "https://cdn.jsdelivr.net/npm/marked@11.1.1/lib/marked.esm.js";

// 加载并渲染Markdown
export async function loadMarkdown(mdPath, containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  try {
    const res = await fetch(mdPath);
    if (!res.ok) throw new Error("加载失败");
    const text = await res.text();
    container.innerHTML = marked.parse(text);
  } catch (error) {
    console.error("Markdown加载失败:", error);
    container.innerHTML = "<p>内容加载失败，请刷新重试</p>";
  }
}

// 页面加载完成后自动渲染（对应你study-bilibili.md）
document.addEventListener("DOMContentLoaded", () => {
  loadMarkdown("md/study-bilibili.md", "md-content");
});