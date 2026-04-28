// 环境ID直接写死，不再依赖config.js
const app = cloudbase.init({
  env: "college-info-d8glle2mv8ef87c41", // 你的TCB环境ID
  apiHost: "https://nameless-frog-e039.x82717006.workers.dev" // 你的Worker地址
});
// 新版 CloudBase SDK 初始化
const app = cloudbase.init({ env: ENV_ID });
const auth = app.auth();
const db = app.database();

// 统一匿名登录，所有模块都要调用它
export async function initAuth() {
  await auth.signInAnonymously();
}

export { app, auth, db };