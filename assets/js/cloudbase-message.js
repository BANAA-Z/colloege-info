import { db, initAuth } from "./cloudbase-init.js";

// 提交留言
export async function submitMessage(name, content) {
  await initAuth();
  return await db.collection("messages").add({
    name,
    content,
    status: "pending",
    createTime: new Date()
  });
}

// 加载已审核留言
export async function loadApprovedMessages() {
  await initAuth();
  const { data } = await db.collection("messages")
    .where({ status: "approved" })
    .orderBy("createTime", "desc")
    .get();
  return data;
}