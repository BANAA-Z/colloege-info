// 只保留这一份 app 初始化，把原来第7行的重复声明删掉
const app = cloudbase.init({
  env: "college-info-d8glle2mv8ef87c41", // 你的TCB环境ID
  apiHost: "https://nameless-frog-e039.x82717006.workers.dev" // 你的Worker地址
});

const auth = app.auth();
const db = app.database();

// 统一匿名登录，所有模块都要调用它
export async function initAuth() {
  await auth.signInAnonymously();
}

export { app, auth, db };