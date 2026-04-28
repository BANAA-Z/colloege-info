const ENV_ID = "college-info-d8gllm2mv8ef87c41";
const REGION = "ap-shanghai";

// 只初始化一次，强制走Worker中转
const app = cloudbase.init({
  env: ENV_ID,
  region: REGION,
  apiHost: "https://nameless-frog-e039.x82717006.workers.dev"
});

const auth = app.auth();
const db = app.database();

export async function initAuth() {
  await auth.signInAnonymously();
}

export { app, auth, db };