// assets/js/tcb-stats.js - 无日志纯净版
import { db } from "./cloudbase-init.js";

document.addEventListener("DOMContentLoaded", async () => {
  const visitCountEl = document.getElementById("visit-count");
  const visitorCountEl = document.getElementById("visitor-count");

  if (!visitCountEl || !visitorCountEl) {
    return;
  }

  // 初始化访客ID
  let visitorId = localStorage.getItem("visitor_id");
  if (!visitorId) {
    visitorId = "visitor_" + Math.random().toString(36).substring(2, 15);
    localStorage.setItem("visitor_id", visitorId);
  }

  try {
    const statsRef = db.collection("stats").doc("site");

    // 更新数据库（访问量+1，添加访客ID）
    await statsRef.update({
      totalViews: db.command.inc(1),
      uniqueVisitors: db.command.addToSet(visitorId)
    });

    // 读取并处理数据格式
    const statsSnap = await statsRef.get();
    const rawData = statsSnap.data;
    const data = Array.isArray(rawData) ? rawData[0] : rawData;

    // 安全读取并赋值
    const totalViews = data?.totalViews ?? 0;
    const uniqueVisitors = data?.uniqueVisitors ?? [];

    visitCountEl.textContent = totalViews;
    visitorCountEl.textContent = uniqueVisitors.length;

  } catch (err) {
    visitCountEl.textContent = "离线";
    visitorCountEl.textContent = "离线";
  }
});