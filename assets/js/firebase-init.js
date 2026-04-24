// firebase-init.js - Firebase统一初始化（所有页面共用，解决初始化顺序问题）
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { SITE_CONFIG } from "./config.js";

// 从配置中心读取Firebase配置
const firebaseConfig = SITE_CONFIG.firebase;

// 初始化全局唯一实例
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// 导出供其他模块使用
export { db, app };