import { db } from "./firebase-init.js";
import { doc, getDoc, setDoc, updateDoc, increment } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// 只在主页执行统计，其他页面直接退出
if (window.location.pathname !== "/" && !window.location.pathname.includes("index.html")) {
  // 非主页页面，直接终止执行，避免报错
  console.log("非主页页面，不执行统计");
} else {
  // 生成用户唯一标识
  function getVisitorId() {
    let visitorId = localStorage.getItem("visitor_id");
    if (!visitorId) {
      visitorId = "visitor_" + Math.random().toString(36).substring(2, 15);
      localStorage.setItem("visitor_id", visitorId);
    }
    return visitorId;
  }

  // 更新统计数据
  async function updateStats() {
    const visitorId = getVisitorId();
    const statsRef = doc(db, "stats", "site");

    try {
      const statsSnap = await getDoc(statsRef);
      let isNewVisitor = true;

      if (statsSnap.exists()) {
        const data = statsSnap.data();
        const visitors = data.visitors || [];
        if (visitors.includes(visitorId)) {
          isNewVisitor = false;
        }
      }

      const updateData = { totalViews: increment(1) };

      if (isNewVisitor) {
        updateData.visitors = [...(statsSnap.exists() ? statsSnap.data().visitors : []), visitorId];
        updateData.uniqueVisitors = increment(1);
      }

      if (statsSnap.exists()) {
        await updateDoc(statsRef, updateData);
      } else {
        await setDoc(statsRef, {
          totalViews: 1,
          uniqueVisitors: 1,
          visitors: [visitorId]
        });
      }

      // 只在元素存在时赋值
      const newStatsSnap = await getDoc(statsRef);
      if (newStatsSnap.exists()) {
        const newData = newStatsSnap.data();
        const visitCountEl = document.getElementById("visit-count");
        const visitorCountEl = document.getElementById("visitor-count");
        if (visitCountEl) visitCountEl.textContent = newData.totalViews || 0;
        if (visitorCountEl) visitorCountEl.textContent = newData.uniqueVisitors || 0;
      }
    } catch (err) {
      console.error("统计更新失败：", err);
    }
  }

  // 页面加载时执行
  document.addEventListener("DOMContentLoaded", updateStats);
}