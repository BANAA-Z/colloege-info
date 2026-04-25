// assets/js/tcb-stats.js - 带调试日志的最终版
import { db } from "./cloudbase-init.js";

document.addEventListener("DOMContentLoaded", async () => {
  console.log("=== 统计脚本开始执行 ===");

  // 1. 获取DOM元素（先打印结果，看有没有拿到）
  const visitCountEl = document.getElementById("visit-count");
  const visitorCountEl = document.getElementById("visitor-count");
  console.log("DOM元素：", { visitCountEl, visitorCountEl });

  // 2. 检查DOM元素是否存在
  if (!visitCountEl || !visitorCountEl) {
    console.error("❌ 错误：统计模块DOM元素未找到！检查ID是否写错");
    return;
  }

  // 3. 初始化访客ID
  let visitorId = localStorage.getItem("visitor_id");
  if (!visitorId) {
    visitorId = "visitor_" + Math.random().toString(36).substring(2, 15);
    localStorage.setItem("visitor_id", visitorId);
  }
  console.log("访客ID：", visitorId);

  try {
    const statsRef = db.collection("stats").doc("site");

    // 4. 先更新数据库
    console.log("正在更新数据库...");
    await statsRef.update({
      totalViews: db.command.inc(1),
      uniqueVisitors: db.command.addToSet(visitorId)
    });
    console.log("✅ 数据库更新成功");

    // 5. 强制读取最新数据
    console.log("正在读取最新数据...");
    const statsSnap = await statsRef.get();
    const data = statsSnap.data || {};
    console.log("最新数据：", data);

    // 6. 兜底处理字段
    const totalViews = data.totalViews || 0;
    const uniqueVisitors = data.uniqueVisitors || [];
    console.log("处理后的数据：", { totalViews, uniqueVisitors });

    // 7. 更新前端显示（打印赋值前后的值）
    console.log("赋值前的显示：", visitCountEl.textContent, visitorCountEl.textContent);
    visitCountEl.textContent = totalViews;
    visitorCountEl.textContent = uniqueVisitors.length;
    console.log("赋值后的显示：", visitCountEl.textContent, visitorCountEl.textContent);

  } catch (err) {
    console.error("❌ 统计更新失败：", err);
    visitCountEl.textContent = "离线";
    visitorCountEl.textContent = "离线";
  }

  console.log("=== 统计脚本执行结束 ===");
});