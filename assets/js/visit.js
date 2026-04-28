const GIT_CONFIG = {
  owner: "BANAA-Z",
  repo: "colloege-info",
  statIssueId: 2
};

// 读取访问数据
async function getStat() {
  try {
    const res = await fetch(`https://api.github.com/repos/${GIT_CONFIG.owner}/${GIT_CONFIG.repo}/issues/${GIT_CONFIG.statIssueId}`);
    const data = await res.json();
    return JSON.parse(data.body) || { totalView: 0, userList: [] };
  } catch (e) {
    return { totalView: 0, userList: [] };
  }
}

// 保存只有你自己能操作
async function saveStat(newData) {
  const token = localStorage.getItem("git_admin_token");
  if(!token) return;

  await fetch(`https://api.github.com/repos/${GIT_CONFIG.owner}/${GIT_CONFIG.repo}/issues/${GIT_CONFIG.statIssueId}`,{
    method:"PATCH",
    headers:{
      "Authorization":`token ${token}`,
      "Content-Type":"application/json"
    },
    body:JSON.stringify({ body: JSON.stringify(newData) })
  });
}

// 生成临时唯一标识（替代IP）
function getUid(){
  let uid = localStorage.getItem("visit_uid");
  if(!uid){
    uid = "u_" + Math.random().toString(36).slice(2);
    localStorage.setItem("visit_uid",uid);
  }
  return uid;
}

async function initVisit() {
  const data = await getStat();
  const uid = getUid();

  // 总访问次数+1
  data.totalView++;
  // 独立人数
  if(!data.userList.includes(uid)){
    data.userList.push(uid);
  }

  // 仅你浏览器会执行保存
  await saveStat(data);

  // 前台展示
  const el = document.getElementById("visitCount");
  if(el){
    el.innerHTML = `一共访问次数：${data.totalView} 次 &nbsp;|&nbsp; 访问人数：${data.userList.length} 人`;
  }
}

document.addEventListener("DOMContentLoaded",initVisit);