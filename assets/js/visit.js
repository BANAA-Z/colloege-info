// 访客统计｜总访问次数 + IP唯一访问人数
const VISIT_BIN = "https://api.jsonbin.io/v3/b/671ca991e41b4b72a8b4d5c9";
const VISIT_KEY = "$2a$10$OXQd1W6y1u5F5c0G7R0y/.m5t0d0X9Z8w7V6b5N4M3K2J1H0G";

const initData = {
  totalView: 0,
  ipList: []
};

async function getVisitData() {
  try {
    const res = await fetch(VISIT_BIN);
    const json = await res.json();
    return json.record || initData;
  } catch (e) {
    return initData;
  }
}

async function saveVisitData(data) {
  await fetch(VISIT_BIN, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "X-Master-Key": VISIT_KEY
    },
    body: JSON.stringify(data)
  });
}

async function getUserIP() {
  try {
    const res = await fetch("https://api.ip.sb/geoip");
    const info = await res.json();
    return info.ip;
  } catch (e) {
    return "unk_" + Math.random().toString(36).slice(2);
  }
}

async function runVisitStat() {
  const data = await getVisitData();
  const ip = await getUserIP();

  data.totalView += 1;
  if (!data.ipList.includes(ip)) {
    data.ipList.push(ip);
  }

  await saveVisitData(data);
  renderStat(data.totalView, data.ipList.length);
}

function renderStat(viewNum, userNum) {
  const box = document.getElementById("visitCount");
  if (!box) return;
  box.innerHTML = `一共访问次数：${viewNum} 次 &nbsp;|&nbsp; 访问人数：${userNum} 人`;
}

document.addEventListener("DOMContentLoaded", runVisitStat);