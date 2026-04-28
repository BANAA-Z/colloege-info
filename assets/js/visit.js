// 只保留这一次声明！
const GIT_CONFIG = {
  owner: "BANAA-Z",
  repo: "colloege-info",
  statIssueId: 2
};

// 下面是原来的代码，不要动
async function getVisitData() {
  try {
    const res = await fetch(`https://api.github.com/repos/${GIT_CONFIG.owner}/${GIT_CONFIG.repo}/issues/${GIT_CONFIG.statIssueId}`);
    const issue = await res.json();
    return JSON.parse(issue.body) || { totalView: 0, uniqueUsers: [] };
  } catch (e) {
    return { totalView: 0, uniqueUsers: [] };
  }
}

async function saveVisitData(data) {
  const adminToken = localStorage.getItem("github_admin_token");
  if (!adminToken) return;

  await fetch(`https://api.github.com/repos/${GIT_CONFIG.owner}/${GIT_CONFIG.repo}/issues/${GIT_CONFIG.statIssueId}`, {
    method: "PATCH",
    headers: {
      "Authorization": `token ${adminToken}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ body: JSON.stringify(data) })
  });
}

function getUserId() {
  let uid = localStorage.getItem("visitor_uid");
  if (!uid) {
    uid = "user_" + Math.random().toString(36).slice(2);
    localStorage.setItem("visitor_uid", uid);
  }
  return uid;
}

async function runVisitStat() {
  const data = await getVisitData();
  const uid = getUserId();

  data.totalView += 1;
  if (!data.uniqueUsers.includes(uid)) {
    data.uniqueUsers.push(uid);
  }

  await saveVisitData(data);

  const box = document.getElementById("visitCount");
  if (box) {
    box.innerHTML = `一共访问次数：${data.totalView} 次 &nbsp;|&nbsp; 访问人数：${data.uniqueUsers.length} 人`;
  }
}

document.addEventListener("DOMContentLoaded", runVisitStat);