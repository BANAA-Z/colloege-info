// config.js - 全局配置中心（纯数据，所有页面共用）
// ==============================================
// 1. 导航站数据（考研/考公/校招/工具，完全沿用你原有结构）
// ==============================================
export const NAV_DATA = {
  //大学生常用
  need: [
  {
    name: "中国大学MOOC",
    url: "https://www.icourse163.org/",
    desc: "免费学习国内顶尖高校的课程，获取官方证书。"
  },
  {
    name: "Bilibili (B站)",
    url: "https://www.bilibili.com/",
    desc: "被戏称为「B站大学」，海量免费学习视频与技能教程。"
  },
  {
    name: "智慧树",
    url: "https://www.zhihuishu.com/",
    desc: "高校通识课、公选课的学习与考试平台。"
  },
  {
    name: "学信网",
    url: "https://www.chsi.com.cn/",
    desc: "查询学籍学历信息，考研报名、求职学历认证的官方渠道。"
  },
  {
    name: "中国教育考试网",
    url: "https://www.neea.edu.cn/",
    desc: "考证大本营，四六级、计算机二级、教资等通用证书报名与查分入口。"
  },
  {
    name: "国家普通话水平测试网",
    url: "https://bm.cltt.org/",
    desc: "普通话水平测试的唯一官方报名平台，支持查成绩与电子证书。"
  },
  {
    name: "全国计算机等级考试网",
    url: "https://ncre-bm.neea.cn/",
    desc: "计算机二级（Office/Python等）官方报名通道，提升办公硬技能。"
  },
  {
    name: "中小学教师资格考试网",
    url: "http://ntce.neea.edu.cn/",
    desc: "教师资格证（笔试+面试）官方报名入口，教育行业从业必备。"
  },
  {
    name: "注册会计师全国统一考试网",
    url: "https://cpaexam.cicpa.org.cn/",
    desc: "财会领域高含金量CPA证书的官方报名平台。"
  }
],
  // 考研板块
  kaoyan: [
  {
    name: "中国研究生招生信息网",
    url: "https://yz.chsi.com.cn/",
    desc: "官方报名与调剂，教育部主管，考研报名、准考证下载、调剂系统、国家线发布的唯一官方入口。"
  },
  {
    name: "中国学位与研究生教育信息网",
    url: "http://www.cdgdc.edu.cn/",
    desc: "学科实力查询，可查询“学科评估”结果，判断目标院校的专业实力，择校必看。"
  },
  {
    name: "中国教育在线-考研频道",
    url: "https://kaoyan.eol.cn/",
    desc: "报录比与分数线查询，提供更友好的界面，可查各高校历年分数线、报录比数据。"
  },
  {
    name: "考研帮",
    url: "https://www.kaoyan.com/",
    desc: "找真题与经验，老牌社区，适合查找专业课真题回忆版、寻找直系学长学姐、看备考经验贴。"
  },
  
  {
    name: "知乎",
    url: "https://www.zhihu.com/",
    desc: "导师评价与经验查询平台，可检索院校导师口碑、考研上岸经验分享，参考价值高。"
  },
  {
    name: "哔哩哔哩 (B站)",
    url: "https://www.bilibili.com/",
    desc: "免费高清备考网课聚集地，可查找专业课教程，联系上岸学长学姐获取真题与备考资料。"
  },
  
  {
    name: "ResearchGate",
    url: "https://www.researchgate.net/",
    desc: "国际权威学术平台，可查询导师论文成果与科研方向，客观评估院校导师学术实力。"
  }

],
  // 考公板块
  kaogong:[
  {
    name: "国家公务员局",
    url: "http://www.scs.gov.cn/",
    desc: "国考唯一官网，发布公告、职位表，支持报名、打印准考证、查询考试成绩。"
  },
  {
    name: "公考雷达",
    url: "https://www.gongkaoleida.com/",
    desc: "智能选岗神器，输入专业学历自动匹配可报岗位，高效筛选公考、事业编职位。"
  },
  {
    name: "全国事业单位招聘网",
    url: "https://www.qgsydw.com/",
    desc: "事业编招考汇总平台，整合全国各地体制内事业单位招聘公告与报考信息。"
  },
  {
    name: "各省人事考试网",
    url: "",
    desc: "省考联考官方入口，搜索对应省份官网，即可查看省考报名、公告、成绩查询等服务。"
  },
  {
    name: "粉笔职教",
    url: "https://www.fenbi.com/",
    desc: "公考刷题必备，收录国考省考历年真题，支持在线模考、智能刷题与详细题目解析。"
  },
  {
    name: "学习强国",
    url: "https://www.xuexi.cn/",
    desc: "优质申论素材库，汇总时政热点、官方评论与权威表述，助力申论写作与面试备考。"
  },
  {
    name: "半月谈",
    url: "http://www.banyuetan.org/",
    desc: "主流权威时评平台，深度解析社会热点，适合模仿行文逻辑，积累申论高分范文素材。"
  },
  {
    name: "QZZN公务员论坛",
    url: "https://bbs.qzzn.com/",
    desc: "老牌公考交流社区，分享选岗、面试经验，了解各地岗位待遇、体制内真实参考信息。"
  }
],
  // 国企校招板块
  xiaozhao: [
  {
    name: "国聘网",
    url: "https://www.iguopin.com/",
    desc: "国家级国企招聘平台，央企、国企招聘信息权威集中发布，求职国企首选渠道。"
  },
  {
    name: "中智招聘",
    url: "https://www.ciic.com.cn/",
    desc: "央企人力资源服务平台，汇集大量央企、国企直聘及优质就业岗位。"
  },
  {
    name: "国务院国资委官网",
    url: "http://www.sasac.gov.cn/",
    desc: "可查询正规央企名录与官方招聘公告，辨别企业资质，避免求职被骗。"
  },
  {
    name: "高校就业信息网",
    url: "",
    desc: "各校校招信息汇总，可查阅多所高校就业公告，获取国企定点校招优质岗位。"
  }
],

  //学术研究
   academic: [
  {
    name: "中国知网 (CNKI)",
    url: "https://www.cnki.net/",
    desc: "文献查找核心，国内最权威的学术资源库，写论文查资料的首选。"
  },
  {
    name: "万方数据",
    url: "https://www.wanfangdata.com.cn/",
    desc: "理工科、医学类文献资源丰富，也是很多高校指定的查重渠道之一。"
  },
  {
    name: "维普网",
    url: "http://www.cqvip.com/",
    desc: "中文科技期刊数据库，适合查找工程技术类文献。"
  },
  {
    name: "国家哲学社会科学文献中心",
    url: "https://www.ncpssd.org/",
    desc: "社科类神器，免费注册即可下载海量哲学、经济、法学等社科类文献。"
  },
  {
    name: "PubScholar 公益学术平台",
    url: "https://pubscholar.cn/",
    desc: "中科院主办的免费平台，堪称“免费版知网”，自然科学类论文很全。"
  },
  {
    name: "学信网 (万方查重)",
    url: "https://chsi.wanfangtech.net/",
    desc: "应届生福利，应届毕业生通常有1次免费的官方论文查重机会，结果权威。"
  },
  {
    name: "PaperPass",
    url: "https://www.paperpass.com/",
    desc: "初稿查重首选，提供每日免费查重额度，适合论文修改阶段反复自查。"
  },
  {
    name: "PaperYY",
    url: "https://www.paperyy.com/",
    desc: "初稿查重首选，提供每日免费查重额度，适合论文修改阶段反复自查。"
  },
 
],
  // 硬核工具板块
  tools: [
  {
    name: "超级简历",
    url: "https://www.wondercv.com/",
    desc: "专业的简历制作工具，提供标准模板和智能优化建议。"
  },
  {
    name: "Canva 可画",
    url: "https://www.canva.cn/",
    desc: "在线设计神器，制作精美的PPT、海报、演示文稿。"
  },
  {
    name: "iLovePDF",
    url: "https://www.ilovepdf.com/zh-cn",
    desc: "全能PDF工具箱，支持PDF转Word、压缩、合并、拆分等。"
  },
  {
    name: "鸠摩搜书",
    url: "https://www.jiumodiary.com/",
    desc: "强大的电子书搜索引擎，帮你找到各种格式的书籍资源。"
  },
  {
    name: "DeepL 翻译",
    url: "https://www.deepl.com/",
    desc: "以准确、自然著称的在线翻译工具，适合阅读外文文献。"
  }
],
  //B站学习资源
  bilibili: []
};

// ==============================================
// 2. 全局站点配置
// ==============================================


