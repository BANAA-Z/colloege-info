// dark-mode.js - 暗黑模式切换（图标+发光版）
const darkModeToggle = document.getElementById("darkModeToggle");
const html = document.documentElement;

// 初始化主题
const initDarkMode = () => {
  const isDark = localStorage.getItem("dark-mode") === "true";
  html.classList.toggle("dark", isDark);
  updateButton(isDark);
};

// 切换主题
const toggleDarkMode = () => {
  const isDark = html.classList.toggle("dark");
  localStorage.setItem("dark-mode", isDark);
  updateButton(isDark);
};

// 更新按钮图标和样式
const updateButton = (isDark) => {
  if (!darkModeToggle) return;
  
  // 切换图标
  darkModeToggle.textContent = isDark ? "☀️" : "🌙";
  
  // 基础样式（适配深浅模式）
  darkModeToggle.style.fontSize = "22px";
  darkModeToggle.style.padding = "10px 14px";
  darkModeToggle.style.borderRadius = "10px";
  darkModeToggle.style.border = "none";
  darkModeToggle.style.cursor = "pointer";
  darkModeToggle.style.backdropFilter = "blur(10px)";
  darkModeToggle.style.transition = "all 0.3s ease";
  
  // 深浅模式背景色
  if (isDark) {
    darkModeToggle.style.background = "rgba(30, 41, 59, 0.85)";
    darkModeToggle.style.color = "#e5e7eb";
  } else {
    darkModeToggle.style.background = "rgba(255, 255, 255, 0.85)";
    darkModeToggle.style.color = "#1f2937";
  }
};

// 绑定悬浮发光效果
darkModeToggle.addEventListener("mouseenter", () => {
  const isDark = html.classList.contains("dark");
  darkModeToggle.style.transform = "translateY(-2px) scale(1.05)";
  darkModeToggle.style.boxShadow = isDark 
    ? "0 4px 16px rgba(96, 165, 250, 0.3)" 
    : "0 4px 16px rgba(59, 130, 246, 0.25)";
});

darkModeToggle.addEventListener("mouseleave", () => {
  darkModeToggle.style.transform = "translateY(0) scale(1)";
  darkModeToggle.style.boxShadow = "0 2px 8px rgba(0, 0, 0, 0.1)";
});

// 绑定点击事件
if (darkModeToggle) darkModeToggle.addEventListener("click", toggleDarkMode);

// 页面加载初始化
initDarkMode();