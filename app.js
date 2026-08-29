const TOTAL_PAGE_COUNT = 42;
const STORAGE_KEY = "qingdeng-weigui:visited-pages";
const CLUE_STORAGE_KEY = "qingdeng-weigui:viewed-clues";
const SEARCHED_KEYWORDS_STORAGE_KEY = "qingdeng-weigui:searched-keywords";
const CLAIMED_LOST_ITEMS_STORAGE_KEY = "qingdeng-weigui:claimed-lost-items";
const ACTIVE_JADE_ACCOUNT_STORAGE_KEY = "qingdeng-weigui:jade-active-account";
const SOUL_LANTERN_GATE_UNLOCKED_STORAGE_KEY = "qingdeng-weigui:soul-lantern-gate-unlocked";
const JADE_LOGIN_STORAGE_KEYS = ["hasLoggedWenZhaoYe", "hasLoggedLuXingzhou"];

const PANEL_SECTION_IDS = new Set([
  "disciples-archive",
  "lost-and-found",
  "spirit-root-test",
  "sutra-vault",
  "soul-lantern-office",
  "herbal-records",
]);

const PAGE_CLUE_MAP = {
  luqichen: "disciple:luqichen",
  hondenglu: "book:hondenglu",
  jiugepianmen: "book:jiugepianmen",
  diqideng: "lamp:seventh",
  wumingkan: "page:wumingkan",
  guixujing: "page:guixujing",
};

const SOUL_LANTERN_LOCK_IMAGE = "./assets/records/轮盘.png";
const SOUL_LANTERN_LOCK_CODE = ["卯", "柒", "叁"];
const SOUL_LANTERN_DOOR_LOCK_IMAGE = "./assets/records/soul-lantern-door-lock.png";
const SOUL_LANTERN_NAMELESS_SHRINE_IMAGE = "./assets/records/无名龛.png";
const SOUL_LANTERN_ARCHIVE_BACKGROUND = "./assets/backgrounds/soul-lantern-archive.png";
const SOUL_LANTERN_DOOR_CODE = ["lotus", "lantern", "flame"];
const SOUL_LANTERN_DOOR_SYMBOLS = [
  { id: "lantern", label: "灯" },
  { id: "lotus", label: "莲" },
  { id: "flame", label: "火" },
  { id: "moon", label: "月" },
];
const SOUL_LANTERN_ARCHIVES = [
  {
    id: "shen-zhaowei",
    name: "沈照微",
    lampPosition: "无名龛第一灯",
    identity: "青岚宗旧内门弟子，魂灯术传人",
    status: "灯焰已熄，灯芯留青",
    record: "百年前归墟井异动后迁入无名龛。公开名籍记其以魂封井，灯册却未录归灭日期。",
    note: "高阶玉牒若重启，仍以照微为令。",
    portrait: "./assets/records/shen-zhaowei.png",
  },
  {
    id: "lu-xingzhou",
    name: "陆行舟",
    lampPosition: "无名龛第二灯",
    identity: "青岚宗旧内门弟子，魂灯术传人",
    status: "灯焰已熄，底座余温未散",
    record: "旧册记其曾掌藏经阁秘卷与魂灯房交簿。百年前名籍中断，今岁玉牒以XZ000重启。",
    note: "长老玉牒只认玉印，不认口述。",
    portrait: "./assets/records/xuanzhuo.png",
  },
  {
    id: "lin-hanshuang",
    name: "林寒霜",
    lampPosition: "无名龛第三灯",
    identity: "听雪院旧籍弟子",
    status: "灯焰已熄",
    record: "行照堂第一名记名弟子，疑似被魔修夺舍，被玄濯真人就地处决，迁灯簿缺去半页，仅余姓名与一枚听雪院旧印。",
    note: "不得以院舍旧册补录死期。",
    portrait: "./assets/records/lin-hanshuang.png",
  },
  {
    id: "mei-lin",
    name: "梅琳",
    lampPosition: "无名龛第四灯",
    identity: "药堂旧籍弟子",
    status: "灯焰已熄，灯罩无裂",
    record: "原行照堂预备弟子，疑似第三年历练意外身亡",
    note: "灯底旧刻被磨，不得再拓。",
    portrait: "./assets/records/mei-lin.png",
  },
  {
    id: "cen-aluo",
    name: "岑阿萝",
    lampPosition: "无名龛第五灯",
    identity: "外门旧籍弟子",
    status: "灯焰已熄",
    record: "行照堂内门弟子，第二年春外出历练音信全无，魂灯已灭",
    note: "灯签存疑，暂留无名龛。",
    portrait: "./assets/records/cen-aluo.png",
  },
  {
    id: "su-wanzhou",
    name: "苏晚舟",
    lampPosition: "无名龛第六灯",
    identity: "空翠院旧籍弟子",
    status: "灯焰已熄，灯油未涸",
    record: "因犯重大罪过，被流放至寒霜崖，半月后魂灯熄灭",
    note: "不得据熄灯日期补写死期。",
    portrait: "./assets/records/su-wanzhou.png",
  },
  {
    id: "ji-xiaoman",
    name: "纪小满",
    lampPosition: "无名龛第七灯",
    identity: "杂役院旧籍弟子",
    status: "灯焰已熄",
    record: "入行照堂后，多次不服管教，下放为杂役依旧还试图杀害玄濯真人，逐出宗门但魂灯依旧保留",
    note: "若寻得旧姓，先验灯底，不可直呼。",
    portrait: "./assets/records/ji-xiaoman.png",
  },
  {
    id: "lin-qin",
    name: "林嗪",
    lampPosition: "无名龛第八灯",
    identity: "戒律堂旧籍记录人",
    status: "灯焰已熄",
    record: "曾参与三份失踪卷宗誊录，最后一份交簿当夜灯位被迁。封签注明不得外调。",
    note: "此灯只许执事复核，不许抄名。",
    portrait: "./assets/records/lin-qin.png",
  },
  {
    id: "jiang-yunheng",
    name: "姜云蘅",
    lampPosition: "无名龛第九灯",
    identity: "槐阴渡姜氏女",
    status: "微亮，未灭",
    record: "十年前随引路仙师入山，外门名籍却无正式归宗记录。灯底仅余一笔姜字。",
    note: "不得迁出；若以别名归山，先验魂灯，再验玉牒。",
    portrait: "./assets/records/jiang-yunheng.png",
  },
  {
    id: "bai-heng",
    name: "白蘅",
    lampPosition: "无名龛第十灯",
    identity: "药堂杂役弟子，外门旧籍",
    status: "微亮，焰心不稳",
    record: "三年前问心岭试炼后转入药堂，旧灯未撤。服忘尘散期间，灯焰曾数次忽明忽暗。",
    note: "勿令其近魂灯房。",
    portrait: "./assets/records/bai-heng.png",
  },
  {
    id: "wen-zhaoye",
    name: "温照夜",
    lampPosition: "无名龛第十一灯",
    identity: "空翠院弟子",
    status: "未灭，灯焰细而不散",
    record: "问心岭试炼后从外门名籍除去，魂灯却未撤。灯底残刻姜字，后由旧执事移入无名龛。",
    note: "灯既识其人，则其人未尽失；惟其名不全，归处不明。",
    portrait: "./assets/records/wen-zhaoye.png",
  },
];
const CORRUPTION_EYE_SHELL = "./assets/records/eye-shell.png";
const CORRUPTION_EYE_PUPIL = "./assets/records/eye-pupil.png";
const CORRUPTION_ERROR_MESSAGE = "禁止外门弟子进入！否则后果自负";
const SOUL_LANTERN_LOCK_SYMBOLS = [
  { value: "子", x: 50, y: 14 },
  { value: "丑", x: 69, y: 17 },
  { value: "寅", x: 82, y: 30 },
  { value: "卯", x: 87, y: 49 },
  { value: "辰", x: 82, y: 68 },
  { value: "巳", x: 71, y: 84 },
  { value: "午", x: 50, y: 89 },
  { value: "未", x: 31, y: 84 },
  { value: "申", x: 17, y: 69 },
  { value: "酉", x: 11, y: 50 },
  { value: "戌", x: 17, y: 31 },
  { value: "亥", x: 30, y: 17 },
  { value: "零", x: 50, y: 30 },
  { value: "壹", x: 62, y: 33 },
  { value: "贰", x: 70, y: 43 },
  { value: "叁", x: 70, y: 54 },
  { value: "肆", x: 62, y: 66 },
  { value: "伍", x: 50, y: 70 },
  { value: "陆", x: 38, y: 66 },
  { value: "柒", x: 29, y: 54 },
  { value: "捌", x: 29, y: 43 },
  { value: "玖", x: 38, y: 33 },
];

const STANDALONE_PAGE_LINKS = {
  "mountain-map": "./map.html",
  "mountain-teahouse": "./forum.html",
};

const HOME_ANNOUNCEMENT =
  "九月初七，问心岭试炼已顺利结束。本届外门弟子共二十七人入岭，二十六人归山。外门弟子温照夜因私自离队，已从外门名籍中除去。魂灯房即日起修缮三日，非执事弟子不得入内。霜降将至，各院弟子夜间勿近后山。";

const HOME_NEWS_LEADS = [
  {
    id: "lead-wenxinling-ranking",
    label: "重磅消息",
    title: "问心岭试炼放榜",
    image: "./assets/news/wenxinling-ranking.png",
    source: "执事堂",
    issueTime: "百年前第七日",
    summary:
      "本旬外门弟子试炼已圆满结束，榜单已张于演武堂外。入选者可前往执事堂领取奖励并听候后续安排；未入榜者请回灵田及各峰静修，再择再历。",
    detail: [
      "本旬外门弟子试炼已圆满结束，榜单已张于演武堂外。入选者可前往执事堂领取奖励并听候后续安排；未入榜者请回灵田及各峰静修，再择再历。",
      "事务处整理旧榜时发现，百年前问心岭旧榜有一处残缺。榜首姓名被朱砂遮去，仅余末字：“微”。旧榜旁注：",
      {
        type: "alert",
        text: "此人曾入问心岭，未列归山，亦未列身亡，后由玄濯真人亲手封档。",
      },
    ],
  },
  {
    id: "lead-zhaowei-hall",
    label: "宗门通告",
    title: "玄濯真人重开行照堂，择收外门记名弟子一人",
    image: "./assets/news/zhaowei-hall.png",
    summary:
      "太上长老玄濯真人闭关多年，近日再开行照堂，拟于本届问心岭试炼弟子中择收记名弟子一人。",
    detail: [
      "玄濯真人重开行照堂，择收外门记名弟子。",
      "青岚宗太上长老玄濯真人闭关多年，近日传令重开旧堂“行照堂”。",
      "事务处公告称：“凡心性清明、魂灯稳固、问心岭试炼中表现优异者，皆可入选。入选弟子将得玄濯真人亲自点化，并获藏经阁旧卷暂阅资格。”",
      "本届候选弟子：温照夜。",
      {
        type: "alert",
        text: "候选缘由：问心岭试炼中魂灯波动稳定，心性记录无明显破损，身份玉牌待复核。",
      },
    ],
  },
  {
    id: "lead-crane-strike",
    label: "宗门趣闻",
    title: "灵兽园仙鹤集体罢飞",
    image: "./assets/news/spirit-cranes.png",
    summary:
      "因本月外门弟子御鹤练习次数过多，灵兽园仙鹤出现集体拒载情况。园中执事表示，仙鹤也是要休沐的。",
    detail: [
      "据灵兽园执事记录，昨日共有十一名外门弟子申请御鹤练习，其中七人上鹤姿势不正，三人抱鹤脖过紧，一人试图给仙鹤喂辟谷丹。",
      "仙鹤首领“云白”当场振翅离席，并在灵兽园门口留下三根羽毛，以示抗议。",
      "事务处提醒：御鹤前请先学会不尖叫。不可对仙鹤说“飞快点”。不可称仙鹤为“大白鸡”。",
    ],
    extra: "云白今日拒载 17 次。",
  },
  {
    id: "lead-sutra-recipe",
    label: "宗门趣闻",
    title: "藏经阁抄书弟子误把符咒抄成菜谱",
    image: "./assets/news/copyist-recipe.png",
    summary:
      "藏经阁近日复核旧卷，发现一名抄书弟子将“引雷符”误抄成“引梨符”，导致丹房案台上连续三日出现梨。",
    detail: [
      "藏经阁长老表示，此事虽未造成严重后果，但已影响丹房正常炼丹。",
      "丹房弟子则称，梨很甜，希望该弟子下次可以误抄“引桃符”。",
      {
        type: "alert",
        text: "旧卷复核时，另发现《归墟门考》夹页残缺，已送内阁另行封存。",
      },
    ],
  },
  {
    id: "lead-wangchen-rule",
    label: "事务通告",
    title: "药堂新规：忘尘散不得用于逃避早课",
    summary:
      "近期有弟子借“心神不宁”之名频繁求取忘尘散，药堂现已限制发放。忘尘散不可连服，更不可用于忘记早课、月考、罚抄或欠账。",
    detail: [
      "药堂白蘅师姐提醒诸位弟子：忘尘散不是“忘功课散”。若服后仍记得明日早课，请不要责怪药堂药效不足。",
      "药堂附注：凡因青雾后症领取忘尘散者，需由执事核名。",
      "白蘅名下旧药籍暂不外调。",
    ],
  },
];

const HOME_NEWS_LEAD = HOME_NEWS_LEADS[0];

const HOME_NEWS_BRIEFS = [
  {
    id: "brief-soul-lantern-delay",
    type: "事务",
    title: "魂灯房修缮延期三日",
    image: "./assets/news/soul-lamp-repair.png",
    date: "九月初九",
    detail: [
      "魂灯房原定于九月初七完成修缮，因后廊旧灯架受潮，修缮延期三日。",
      {
        type: "alert",
        text: "执事检查时发现，无名龛最里侧有一盏未编号旧灯，灯名被旧符遮住。魂灯房已将该灯暂列为“零号灯”，待长老核验。",
      },
    ],
  },
  {
    id: "brief-back-road-sealed",
    type: "通告",
    title: "后山禁路暂封",
    date: "九月初八",
    detail: [
      "因霜降将近，后山青雾渐重，事务处暂封问心岭阴面旧道。",
      {
        type: "alert",
        text: "夜巡弟子称，禁路尽头旧井附近有女子声音，其声不呼外门弟子姓名，只反复唤：“行舟。”",
      },
    ],
  },
  {
    id: "brief-night-duty",
    type: "值守",
    title: "夜巡值守名单更新",
    date: "九月初六",
    detail: ["本旬后山值守名单已更新，请各院弟子按时赴任。迟至者扣早课一次，替班者需交木牌验印。"],
  },
  {
    id: "brief-sword-gate",
    type: "趣闻",
    title: "外门弟子御剑撞上山门匾额",
    image: "./assets/news/sword-flight.png",
    date: "九月初五",
    detail: [
      "今日卯时，松月院弟子练习低空御剑，不慎撞上山门匾额。匾额无损，弟子额头微肿。",
      "执事堂提醒：御剑之前，请先学会刹剑。",
    ],
  },
  {
    id: "brief-radish-spirit",
    type: "事务",
    title: "灵田萝卜疑似成精",
    image: "./assets/news/spirit-field-radish.png",
    date: "九月初五",
    detail: [
      "灵田弟子上报，药园东侧一株萝卜夜间自行挪动三尺，并把旁边灵参挤出土。",
      "药堂称此为正常灵植争地现象，请勿惊慌，更不可私自拔走加餐。",
    ],
  },
  {
    id: "brief-book-snacks",
    type: "典籍",
    title: "藏经阁归还书卷请勿夹干粮",
    image: "./assets/news/book-snacks.png",
    date: "九月初四",
    detail: [
      "藏经阁近日在《外门剑诀》中发现桂花糕碎屑，在《符箓初解》中发现半张烧饼。",
      "藏经阁长老表示，书可以借，饼不必还。",
    ],
  },
  {
    id: "brief-danfang-sword",
    type: "趣闻",
    title: "丹房请勿以飞剑切菜",
    image: "./assets/news/flying-sword-cook.png",
    date: "九月初四",
    detail: [
      "丹房今日补贴新砧板三块。原因是有弟子为省刀工，以飞剑切姜丝，剑气顺带削薄了案台。",
      "后厨执事评曰：姜丝确实很细，下次不许。",
    ],
  },
  {
    id: "brief-paper-crane-flock",
    type: "通告",
    title: "外门弟子不得私自饲养纸鹤群",
    date: "九月初三",
    detail: [
      "近日空翠院多名弟子私养传信纸鹤，导致夜间纸鹤扑棱声扰人清修。",
      "事务处提醒：纸鹤可传信，不可群养；若纸鹤送达药堂后被退回，请持原件至事务处核验。",
    ],
  },
];

const HOME_NEWS_RUMORS = [
  {
    id: "rumor-teahouse-ranking",
    image: "./assets/news/teahouse-discussion.png",
    title: "山门茶寮热议",
    text: "茶寮弟子热议试炼榜单，请多辨测因人论道。",
    detail: [
      "茶寮弟子热议试炼榜单，有人称百年前旧榜上曾有一位“沈师姐”。据说她不是失踪，也不是身亡，而是被从名录中“请”了出去。热帖回复：“沈师姐的名字我记得在旧榜出现过？”“我听藏经阁师兄说，她好像和玄濯真人有一段不为人知的关系呢。”“我记得她是旧榜第一。”",
    ],
  },
  {
    id: "rumor-old-well",
    image: "./assets/news/old-well-aura.png",
    title: "旧井附近发现异常灵息",
    text: "巡查弟子在旧井附近感应到微弱灵息波动，正在追查。",
    detail: [
      "巡查弟子在旧井附近感应到微弱灵息波动。灵息与普通邪祟不同，似残魂，又似魂灯余焰。",
    ],
  },
  {
    id: "rumor-cauldron",
    image: "./assets/news/alchemy-pot-at-night.png",
    title: "丹房铜锅夜半自鸣",
    text: "丹房铜锅昨夜无火自鸣，疑有灵气回流。",
    detail: [
      "丹房弟子称，铜锅半夜忽然“咚”了一声，全房弟子惊醒。",
      "后查明，是灵兽园仙鹤叼走丹房灵鱼时撞翻锅盖。丹房已向灵兽园索赔灵鱼三尾。",
    ],
  },
  {
    id: "rumor-broom-sword",
    image: "./assets/news/broom-sword-intent.png",
    title: "山门扫帚疑似修出剑意",
    text: "扫地弟子称，山门旧扫帚近日自行斩落三片竹叶。",
    detail: [
      "山门扫地弟子表示，此扫帚跟随他七年，已有灵性。",
      "执事堂检查后判定：并非剑意，是风太大。扫地弟子仍坚持为其取名“扫雪”。",
    ],
  },
  {
    id: "rumor-sweet-porridge",
    image: "./assets/news/sweet-spirit-rice-porridge.png",
    title: "外门食堂灵米粥变甜",
    text: "今日外门食堂灵米粥味道异常偏甜。",
    detail: [
      "经查，负责早膳的弟子误将糖霜当作盐霜。",
      "多数弟子表示愿意原谅，并建议明日继续误放。",
    ],
    extra: "多数弟子表示：此事不必整改。",
  },
];

const HOME_NEWS_ITEMS = [...HOME_NEWS_LEADS, ...HOME_NEWS_BRIEFS, ...HOME_NEWS_RUMORS];
const homeNewsById = new Map(HOME_NEWS_ITEMS.map((item) => [item.id, item]));

const HOME_DEPARTMENTS = [
  {
    id: "disciples-archive",
    title: "弟子名录",
    image: "./assets/departments/disciples.jpg",
    description: "录外门弟子来历、院舍、试炼往返与除名更动，以备稽核。",
    tag: "卷宗在册",
  },
  {
    id: "lost-and-found",
    title: "失物招领",
    image: "./assets/departments/lost-found.jpg",
    description: "问心岭、院舍与后山拾得之物，皆依号封存，待人核领。",
    tag: "可点查验",
  },
  {
    id: "spirit-root-test",
    title: "灵根复测",
    image: "./assets/spirit-root/灵石.png",
    description: "外门弟子灵根复测处，十问定心，测灵石只作引，不作判。",
    tag: "待测",
  },
  {
    id: "sutra-vault",
    title: "藏经阁",
    image: "./assets/departments/sutra-vault.jpg",
    description: "借阅记录、禁书目录与旧阁偏门抄记，暂由外门事务处代录。",
    tag: "旧卷待考",
  },
  {
    id: "soul-lantern-office",
    title: "魂灯房",
    image: "./assets/departments/soul-lantern.jpg",
    description: "灯册重誊、灯位迁移与无名龛封置，今晨起闭门修缮。",
    tag: "修缮中",
  },
  {
    id: "herbal-records",
    title: "药堂记录",
    image: "./assets/departments/herbal-records.jpg",
    description: "伤药、安神汤、忘尘散与后症批注，可供旁证旧事。",
    tag: "可调药案",
  },
  {
    id: "mountain-map",
    title: "山门地图",
    image: "./assets/departments/mountain-map.jpg",
    description: "外门要地、问心岭山路与后山禁路旧图，尚有残注未显。",
    tag: "待显暗点",
  },
  {
    id: "mountain-teahouse",
    title: "山门茶寮",
    image: "./assets/departments/mountain-teahouse.jpg",
    description: "青岚宗外门弟子与入宗候选人交流区，闲谈里也藏着山门旧事的散句。",
    tag: "新页交流区",
  },
];

const DISCIPLES_ARCHIVE = [
  {
    id: "luqichen-archive",
    clueKey: "disciple:luqichen",
    name: "陆栖尘",
    court: "明照院弟子",
    image: "./assets/disciples/陆栖尘.png",
    summary:
      "明照院弟子。本届问心岭试炼同行者之一，已归山。其证词载明，三更后曾见温照夜独自入岭。",
    note: "备注：证词已交由戒律堂封存。",
  },
  {
    id: "shenhuaibi-archive",
    name: "沈怀璧",
    court: "松月院弟子",
    image: "./assets/disciples/沈怀璧.png",
    summary:
      "松月院弟子。本届试炼名册清点人，负责入岭、归山人数核验。",
    note: "备注：名册上“温照夜除名”四字，似与其笔迹相近。",
  },
  {
    id: "peizhaochuan-archive",
    name: "裴照川",
    court: "砚雪院弟子",
    image: "./assets/disciples/裴照川.png",
    summary:
      "砚雪院弟子。常往藏经阁借阅旧卷，试炼归来后称受青雾侵体，闭门养伤。",
    note: "备注：曾借《真名禁忌》《魂灯录》，归还时缺页一张。",
  },
  {
    id: "luowenzhou-archive",
    name: "洛闻舟",
    court: "空翠院弟子",
    image: "./assets/disciples/洛闻舟.png",
    summary:
      "空翠院弟子，居乙五十号房，与温照夜旧居相邻。试炼后三日，被调往山门值守。",
    note: "备注：调令由魂灯房直接发出，缘由未明。",
  },
  {
    id: "wenzhaoye-archive",
    name: "温照夜",
    court: "空翠院弟子",
    image: "./assets/disciples/温照夜.png",
    summary:
      "空翠院弟子。本届问心岭试炼未归。外门事务处已按“私自离队”除名。",
    note: "备注：名籍已划去，房号未撤，魂灯编号仍留。",
    removed: true,
    sealed: true,
  },
  {
    id: "baiheng-archive",
    name: "白蘅",
    court: "药堂杂役弟子",
    image: "./assets/disciples/白蘅.png",
    summary:
      "药堂杂役弟子。三年前曾为外门弟子，后因试炼伤损，转入药堂。",
    note: "备注：其本人对问心岭旧事记忆不全，药堂称为“青雾后症”。",
  },
  {
    id: "songmianshuang-archive",
    name: "宋眠霜",
    court: "听雪院弟子",
    image: "./assets/disciples/宋眠霜.png",
    summary:
      "听雪院弟子，负责誊抄外门卷宗。本届试炼后曾协助整理名册。",
    note: "备注：其誊本中，温照夜姓名旁曾误添一字：“姜”。",
  },
];

const LOST_AND_FOUND = [
  {
    id: "paper-crane",
    code: "SW-017",
    name: "破损纸鹤",
    location: "问心岭山道",
    image: "./assets/items/纸鹤.png",
    detail:
      "纸翼边角焦脆，腹中留有半句残信。封存旁记：纸面仍见香灰与潮痕，应系匆忙折起后再遭拆看。",
    searchKeyword: "破损纸鹤",
    clueKey: "item:paper-crane",
  },
  {
    id: "bronze-key",
    code: "SW-021",
    name: "青铜钥",
    location: "空翠院乙四十九",
    image: "./assets/items/青铜钥.png",
    detail:
      "钥柄刻有“旧阁偏门”四字。铜色旧而未锈，齿口磨痕齐整，不似弃置多年之物。",
    searchKeyword: "旧阁偏门",
    clueKey: "item:bronze-key",
  },
  {
    id: "old-wick",
    code: "SW-026",
    name: "旧灯芯",
    location: "魂灯房后廊",
    image: "./assets/items/旧灯芯.png",
    detail:
      "执事批注：“此物不可归还，不可焚，不可近魂灯。”灯盏内壁有青黑焦痕，似曾被人强行熄过一次。",
    searchKeyword: "魂灯录",
    clueKey: "item:old-wick",
  },
  {
    id: "bone-flute",
    code: "SW-031",
    name: "骨笛",
    location: "后山青雾外",
    image: "./assets/items/骨笛.png",
    detail:
      "骨笛吹孔处有青雾残痕，笛身刻线近于避邪纹，却在尾端多出一道不成章法的旧姓刻记。",
    searchKeyword: "青雾",
    clueKey: "item:bone-flute",
  },
  {
    id: "identity-jade",
    code: "SW-044",
    name: "身份玉牌",
    location: "药堂水井旁",
    image: "./assets/items/玉牌.png",
    detail:
      "玉牌正面刻着：温\n\n背面有一行极小的刻字：\n\n“若忘口令，便记旧井。”\n\n刻字旁有一道刮痕，像是后来匆忙划上去的。",
    clueKey: "item:identity-jade",
  },
  {
    id: "goose",
    code: "SW-055",
    name: "大鹅",
    location: "后山",
    image: "./assets/items/鹅.png",
    detail:
      "很凶，喜欢乱咬人。值守弟子三人联名批注：请勿再放回山门侧道，否则夜巡全废。",
  },
  {
    id: "sword",
    code: "SW-067",
    name: "一把剑",
    location: "藏经阁",
    image: "./assets/items/剑.png",
    detail:
      "哪位道友的爱妻掉了？剑鞘不见，剑穗却擦得很净，疑似主人曾沿墙站着背书太久。",
  },
  {
    id: "cauldron",
    code: "SW-088",
    name: "炼丹炉",
    location: "后厨",
    image: "./assets/items/炼丹炉.png",
    detail:
      "里面还放有烧鸡一只。药堂与膳房互相推诿三次，最终以“非正经丹事”记入失物招领。",
  },
];

const SPIRIT_ROOT_QUESTIONS = [
  {
    id: "root-question-1",
    prompt: "入宗第一夜，你独自经过一片从未有人提起的山林，深处忽然传来异响。你会？",
    options: [
      { label: "拔剑循声而去", scores: { metal: 2 } },
      { label: "观察草木留下的痕迹", scores: { wood: 2 } },
      { label: "藏匿气息，静观其变", scores: { water: 2 } },
      { label: "点燃灵灯照亮前路", scores: { light: 2 } },
      { label: "先确认脚下是否有阵法", scores: { earth: 2 } },
    ],
  },
  {
    id: "root-question-2",
    prompt: "师尊允许你从藏经阁带走一本无名古卷，你最希望里面记载什么？",
    options: [
      { label: "一剑破万法的杀伐之术", scores: { metal: 2 } },
      { label: "生灵、药理与长生之法", scores: { wood: 2 } },
      { label: "借天地万象而行的变化之术", scores: { water: 1, ice: 1 } },
      { label: "禁忌雷法与天劫秘闻", scores: { thunder: 2 } },
      { label: "被宗门刻意抹去的古老秘术", scores: { dark: 2 } },
    ],
  },
  {
    id: "root-question-3",
    prompt: "修炼时，你发现自己的灵力逐渐失控，你下意识会怎么做？",
    options: [
      { label: "强行将力量压回经脉", scores: { metal: 2 } },
      { label: "顺着灵力流向慢慢引导", scores: { water: 2 } },
      { label: "让灵力彻底爆发后重新掌控", scores: { fire: 2 } },
      { label: "封住经脉，使一切归于静止", scores: { ice: 2 } },
      { label: "稳住丹田，一点点重新筑基", scores: { earth: 2 } },
    ],
  },
  {
    id: "root-question-4",
    prompt: "若必须独自在一个地方闭关十年，你会选择？",
    options: [
      { label: "云海之上的孤峰", scores: { light: 2 } },
      { label: "草木繁盛的幽谷", scores: { wood: 2 } },
      { label: "寂静无人的寒潭", scores: { water: 1, ice: 1 } },
      { label: "地底深处的古老洞府", scores: { earth: 2 } },
      { label: "终年不见天日的废弃神殿", scores: { dark: 2 } },
    ],
  },
  {
    id: "root-question-5",
    prompt: "一只受伤的灵兽倒在你面前，但你发现它身上似乎隐藏着危险，你会？",
    options: [
      { label: "保持距离，先判断它是否具有威胁", scores: { metal: 2 } },
      { label: "尝试替它疗伤", scores: { wood: 2 } },
      { label: "用灵力感知它真正的状态", scores: { water: 2 } },
      { label: "设下禁制，再靠近查看", scores: { earth: 2 } },
      { label: "即使危险也先把它带离这里", scores: { light: 2 } },
    ],
  },
  {
    id: "root-question-6",
    prompt: "问心试炼中，你看见自己未来最强大的模样。那个人正在做什么？",
    options: [
      { label: "一剑斩开万丈山河", scores: { metal: 2 } },
      { label: "站在枯死的大地上令万物复苏", scores: { wood: 2 } },
      { label: "独坐天地之间，四周万籁俱寂", scores: { ice: 2 } },
      { label: "沐浴雷霆，以天劫淬炼自身", scores: { thunder: 2 } },
      { label: "站在黑暗尽头，身后无人敢靠近", scores: { dark: 2 } },
    ],
  },
  {
    id: "root-question-7",
    prompt: "如果有一种力量必须付出代价才能获得，你最能接受哪一种？",
    options: [
      { label: "身受百伤，但永不折断", scores: { metal: 2 } },
      { label: "花费漫长岁月慢慢成长", scores: { wood: 2 } },
      { label: "忘记一部分过去", scores: { water: 2 } },
      // 雷属性略作补强，保证异灵根在完整题库中确实可达。
      { label: "每次使用都承受剧烈痛苦", scores: { thunder: 2, fire: 1 } },
      { label: "被世人畏惧和误解", scores: { dark: 2 } },
    ],
  },
  {
    id: "root-question-8",
    prompt: "宗门大阵突然崩塌，你只能守住一个地方，你会选择？",
    options: [
      { label: "山门——挡住所有入侵者", scores: { metal: 2 } },
      { label: "药园——保住宗门最后的生机", scores: { wood: 2 } },
      { label: "水脉——保证整座山不会灵气枯竭", scores: { water: 2 } },
      { label: "地脉——只要根基还在，一切都能重建", scores: { earth: 2 } },
      { label: "魂灯房——不能让任何人的魂灯熄灭", scores: { light: 2 } },
    ],
  },
  {
    id: "root-question-9",
    prompt: "你在秘境尽头发现五件无人认主的古物，只能拿走一件。你选择？",
    options: [
      { label: "布满裂痕却依旧锋利的古剑", scores: { metal: 2 } },
      { label: "已经枯死却长出新芽的树枝", scores: { wood: 2 } },
      { label: "永远不会干涸的青色玉瓶", scores: { water: 2 } },
      { label: "内部仍有余温的残破丹炉", scores: { fire: 2 } },
      { label: "一面无法照出自己模样的黑色古镜", scores: { dark: 2 } },
    ],
  },
  {
    id: "root-question-10",
    prompt: "最后一问。若有一天，大道与你所珍视之物只能留下一个，你会？",
    options: [
      { label: "斩断牵挂，继续向前", scores: { metal: 2 } },
      { label: "寻找让二者共存的方法", scores: { wood: 1, water: 1 } },
      { label: "接受命运，但不会停止寻找答案", scores: { water: 1, ice: 1 } },
      { label: "与天争一次，哪怕粉身碎骨", scores: { thunder: 2, fire: 1 } },
      { label: "放弃所谓大道，守住自己认定之物", scores: { light: 2 } },
    ],
  },
];

const SPIRIT_ROOT_ATTRIBUTES = ["metal", "wood", "water", "fire", "earth", "thunder", "ice", "light", "dark"];
const SPIRIT_ROOT_FIVE_ELEMENTS = ["metal", "wood", "water", "fire", "earth"];
const SPIRIT_ROOT_SPECIAL_PRIORITY = ["thunder", "ice", "light", "dark"];
const SPIRIT_ROOT_ATTRIBUTE_LABELS = {
  metal: "金",
  wood: "木",
  water: "水",
  fire: "火",
  earth: "土",
  thunder: "雷",
  ice: "冰",
  light: "光",
  dark: "黑暗",
};

const SPIRIT_ROOT_RESULT_DATA = {
  metal: { title: "金灵根", verdict: "锋芒藏骨，一念可断山河。", intro: "天生亲近金行灵气，灵力锋锐凝练，攻伐之力尤盛。适合剑修、刀修以及以杀伐见长的术法。", practice: "剑修 / 刀法 / 炼器", visual: "metal", image: "./assets/spirit-root/results/金元素.png" },
  wood: { title: "木灵根", verdict: "生生不息，枯荣皆在一念。", intro: "灵气温润而绵长，对草木、生机以及疗愈之术有极高亲和力。", practice: "丹道 / 医修 / 御灵", visual: "wood", image: "./assets/spirit-root/results/木元素.png" },
  water: { title: "水灵根", verdict: "上善若水，无形亦可破万法。", intro: "灵力流转自然，擅长变化、感知与持续施法，柔中藏锋。", practice: "术修 / 阵法 / 水系法术", visual: "water", image: "./assets/spirit-root/results/水元素.png" },
  fire: { title: "火灵根", verdict: "烈焰入命，焚尽旧身见真我。", intro: "灵力炽烈强盛，爆发力极高，尤其适合攻击性术法与炼丹炼器。", practice: "火法 / 丹道 / 炼器", visual: "fire", image: "./assets/spirit-root/results/火元素.png" },
  earth: { title: "土灵根", verdict: "厚土承天，万法动而你不动。", intro: "根基厚重，灵力稳定，尤其擅长防御、阵法以及护体术。", practice: "体修 / 阵修 / 防御术法", visual: "earth", image: "./assets/spirit-root/results/土元素.png" },
  thunder: { title: "雷灵根", displayTitle: "天雷异灵根", verdict: "雷霆入骨，天威为你所引。", intro: "极为罕见的异灵根，天生亲近雷霆与天劫之力，灵力迅疾猛烈，攻伐惊人。", practice: "雷法 / 剑修 / 炼体", evaluation: "百年难遇", visual: "thunder", image: "./assets/spirit-root/results/雷元素.png" },
  ice: { title: "冰灵根", displayTitle: "玄冰异灵根", verdict: "霜寒封心，一念冻结千里。", intro: "水行异变而生的罕见灵根，可掌寒霜玄冰，擅长封禁、控制与远程术法。", practice: "冰法 / 控制术 / 剑修", evaluation: "百年难遇", visual: "ice", image: "./assets/spirit-root/results/冰元素.png" },
  light: { title: "光灵根", displayTitle: "曜光异灵根", verdict: "灵台生曜，破妄驱邪，照见诸天。", intro: "极少见的特殊灵根，对净化、驱邪、守护以及神魂类术法具有天然亲和力。", practice: "符修 / 神魂术 / 净化术", evaluation: "世所罕见", visual: "light", image: "./assets/spirit-root/results/光.png" },
  dark: { title: "黑暗灵根", displayTitle: "幽冥异灵根", verdict: "生于无光之处，却能窥见世间隐秘。", intro: "极为特殊的灵根，可以感知阴影、神魂与常人无法察觉的力量。", practice: "魂术 / 幻术 / 隐匿之法", evaluation: "吉凶难定", visual: "dark", image: "./assets/spirit-root/results/黑暗.png" },
  "water-wood": { title: "水木双灵根", verdict: "水养灵木，生机绵延，道途不绝。", intro: "水木相生，灵气兼具流转与生发之性，修行路上续航绵长。", practice: "医修 / 丹修 / 御灵", visual: "water-wood", image: "./assets/spirit-root/results/水木.png" },
  "water-earth": { title: "水土双灵根", verdict: "水行地脉，静中藏势，厚积而后发。", intro: "水行地脉，既能蓄势又能承载，适合以稳制变的修行之道。", practice: "阵修 / 防御 / 控水", visual: "water-earth", image: "./assets/spirit-root/results/水土.png" },
  "water-metal": { title: "水金双灵根", verdict: "水藏金锋，柔中藏刃，变化无常。", intro: "水金相济，灵力柔韧而带锋，变化与攻伐可相互转换。", practice: "剑修 / 水法 / 暗器", visual: "water-metal", image: "./assets/spirit-root/results/水金.png" },
  "fire-earth": { title: "火土双灵根", verdict: "地火同生，可炼万物，亦可焚山。", intro: "火土同源，既有炽烈爆发，也有承受与锻造之力。", practice: "炼器 / 丹修 / 体修", visual: "fire-earth", image: "./assets/spirit-root/results/火土.png" },
  "earth-metal": { title: "土金双灵根", verdict: "金藏厚土，根基如岳，锋芒内敛。", intro: "土金相依，根基稳固而不失锋利，适合攻守兼备的路数。", practice: "剑修 / 炼器 / 防御", visual: "earth-metal", image: "./assets/spirit-root/results/土金.png" },
  "earth-wood": { title: "土木双灵根", verdict: "木扎厚土，根深百丈，生生不绝。", intro: "土木相生，根系深厚，生机与承载之力皆能逐步积累。", practice: "御灵 / 丹道 / 阵法", visual: "earth-wood", image: "./assets/spirit-root/results/土木.png" },
  "fire-metal": { title: "火金双灵根", verdict: "金火相煅，锋芒与烈意同生。", intro: "金火相济，灵力兼具锋锐与爆发，适合在锻造、攻伐与炼器之道上并行。", practice: "剑修 / 炼器 / 火法", visual: "fire-metal", image: "./assets/spirit-root/results/火金.png" },
};

const SUTRA_BORROW_LOGS = [
  {
    date: "七月十二",
    person: "苏砚辞",
    jadeId: "QMF-08",
    book: "《青岚宗异闻卷》",
    status: "未归还",
    alert: true,
    keyword: "青岚宗异闻卷",
    note: "备注：此人名籍已从旧档中隐去，借阅记录仅余残页。",
  },
  {
    date: "七月廿八",
    person: "楚青禾",
    jadeId: "ZPL-22",
    book: "《药草图鉴》",
    status: "已归还",
  },
  {
    date: "八月初三",
    person: "贺云深",
    jadeId: "XKN-35",
    book: "《外门旧档》",
    status: "缺页归还",
    note: "备注：归还时第三卷末页被撕去，撕痕齐整，非虫蛀。",
  },
  {
    date: "八月十二",
    person: "谢临舟",
    jadeId: "WBR-44",
    book: "《山门禁闻录》",
    status: "已归还",
  },
  {
    date: "八月廿六",
    person: "裴照川",
    jadeId: "VTC-17",
    book: "《真名禁忌》",
    status: "缺页归还",
  },
  {
    date: "八月廿七",
    person: "宋眠霜",
    jadeId: "UYH-24",
    book: "《魂灯录》",
    status: "已归还",
    keyword: "魂灯录",
  },
  {
    date: "九月初一",
    person: "温照夜",
    jadeId: "KCY-49",
    book: "《槐阴渡地方志》",
    status: "未归还",
  },
  {
    date: "九月初三",
    person: "白蘅",
    jadeId: "TGD-06",
    book: "《药堂散方》",
    status: "已归还",
  },
  {
    date: "九月初四",
    person: "沈怀璧",
    jadeId: "SFJ-12",
    book: "《外门名籍誊录法》",
    status: "已归还",
    note: "备注：归还时夹入一枚空翠院旧房号签，签上只余“乙四”二字。",
  },
  {
    date: "九月初五",
    person: "洛闻舟",
    jadeId: "REA-50",
    book: "《山门旧图补遗》",
    status: "已归还",
    note: "备注：旧图中后山禁路一页有新近翻折痕，墨点遮处疑为废井。",
  },
  {
    date: "百年前",
    person: "玄濯真人",
    jadeId: "XZ-000",
    book: "《归魂灯法》",
    status: "百年前借出，未归。",
    alert: true,
  },
  {
    date: "百年前",
    person: "玄濯真人",
    jadeId: "XZ-000",
    book: "《归墟门考》",
    status: "缺页归还。",
    alert: true,
  },
  {
    date: "百年前",
    person: "玄濯真人",
    jadeId: "XZ-000",
    book: "《九转补天阵残卷》",
    status: "多次批注，禁外借。",
    alert: true,
    emphasizeBook: true,
    keyword: "九转补天阵残卷",
  },
];

const FORBIDDEN_BOOKS = [
  "《真名禁忌》",
  "《魂灯录》",
  "《人魂灯禁录》",
];

const SOUL_LAMPS = [
  { id: "lamp-1", label: "第一灯", name: "林砚秋", state: "微亮" },
  { id: "lamp-2", label: "第二灯", name: "梅不寒", state: "微亮" },
  { id: "lamp-3", label: "第三灯", name: "岑问雪", state: "微亮" },
  { id: "lamp-4", label: "第四灯", name: "苏听澜", state: "微亮" },
  { id: "lamp-5", label: "第五灯", name: "纪南枝", state: "微亮" },
  { id: "lamp-6", label: "第六灯", name: "姜云蘅", state: "微亮" },
  {
    id: "lamp-7",
    label: "第七灯",
    name: "温照夜",
    state: "未灭",
    detail:
      "灯名：温照夜。灯底残刻：姜。状态：未灭。执事备注：移入无名龛。",
    searchKeywords: ["第七灯", "无名龛"],
    clueKey: "lamp:seventh",
  },
];

const HERBAL_RECORDS = [
  {
    id: "baiheng-record",
    date: "三年前霜降",
    person: "白蘅",
    medicine: "忘尘散",
    symptom: "青雾后症",
    personNote: "",
    medicineNote:
      "忘尘散不可连服。若服后仍记得某人真名，说明此名已入魂灯。",
  },
  {
    id: "luqichen-record",
    date: "九月初六",
    person: "陆栖尘",
    medicine: "安神汤",
    symptom: "夜惊",
    personNote: "",
    medicineNote:
      "安神汤中加朱砂半分，本不宜夜服，除非服者心神不定且目中常见旧景。",
  },
  {
    id: "peizhaochuan-record",
    date: "九月初七",
    person: "裴照川",
    medicine: "止血散",
    symptom: "伤口无血",
    personNote: "",
    medicineNote:
      "止血散照常发放，另附薄荷灰半纸。药童旁记：其人问过两次魂灯房在何处。",
  },
  {
    id: "songmianshuang-record",
    date: "九月初八",
    person: "宋眠霜",
    medicine: "静心丸",
    symptom: "誊卷失误",
    personNote: "",
    medicineNote:
      "静心丸常用于抄卷烦乱。执笔若仍误添旧姓，通常不是手滑，而是记忆受扰。",
  },
];

const HERBAL_OUTER_LEDGER = {
  title: "药堂外账",
  entries: [
    {
      subject: "陆清禾",
      alertName: true,
      fields: [
        { label: "凡籍", value: "临溪镇陆氏" },
        { label: "关系", value: "陆栖尘之妹" },
        { label: "病症", value: "寒脉入骨，需每月送药一丸" },
        { label: "供药来源", value: "青岚宗药堂" },
        { label: "批注", value: "其兄陆栖尘已入外门，可抵药债。" },
      ],
    },
    {
      subject: "周小满",
      fields: [
        { label: "凡籍", value: "青石村周氏" },
        { label: "关系", value: "山门役夫周成之女" },
        { label: "病症", value: "幼时肺寒，入冬需服温肺散" },
        { label: "供药来源", value: "青岚宗药堂" },
        { label: "批注", value: "药资由山门役俸逐月扣抵。" },
      ],
    },
    {
      subject: "沈阿福",
      fields: [
        { label: "凡籍", value: "落霞村沈氏" },
        { label: "关系", value: "药堂杂役沈七之父" },
        { label: "病症", value: "旧岁伤腿，阴雨时疼痛难行" },
        { label: "供药来源", value: "青岚宗药堂" },
        { label: "批注", value: "每两月送续骨膏一盒。" },
      ],
    },
    {
      subject: "顾青萝",
      fields: [
        { label: "凡籍", value: "临溪镇顾氏" },
        { label: "关系", value: "松月院顾承安之妹" },
        { label: "病症", value: "目疾畏光，春秋各送清目丸" },
        { label: "供药来源", value: "青岚宗药堂" },
        { label: "批注", value: "药材照外门亲眷旧例支取。" },
      ],
    },
  ],
};

const MOUNTAIN_MAP_IMAGES = {
  base: "./assets/maps/地图1.png?v=20260727b",
  revealed: "./assets/maps/地图2.png?v=20260727b",
};

const HUMAN_SOUL_EYE_IMAGE = "./assets/records/眼睛.png";
const HUMAN_SOUL_DIALOG_DELAY_MS = 720;
const HUMAN_SOUL_FLICKER_MS = 1300;
const HORROR_SFX_SETTING_KEY = "qingdeng-weigui:settings:horror-sfx";

const pagesData = [
  {
    id: "wenxinling",
    title: "问心岭试炼公告",
    keyword: "问心岭",
    pageNumber: 3,
    media: {
      src: "./assets/records/问心岭.png",
      alt: "问心岭山门石阶旧影",
      caption:
        "附图：问心岭旧道石阶。图册边角批注曰“试炼日寅时留影，午后起雾，不可尽信远景方位”。",
    },
    content: [
      "九月初七，问心岭试炼册存档于此。本届外门弟子共二十七人入岭，二十六人归山，归山名册已逐一验印。",
      "名单最末一列里，“温照夜”三字被朱笔横划，旁边只有一行急写小字：除名。",
      "试炼入口设于问心岭西侧石阶，沿阶而上，经折云亭，再入内岭。执事旧例每逢试炼前一日，会命人于山门立界碑、封偏路，以免弟子误入雾谷。",
      "同卷附记称：当日辰末起，岭中雾势较往年更早，山门外守值弟子曾两次上报“雾线越界”，但批注最终只写“照旧进行”。",
      "页尾批注称，如需追查除名缘由，应先转查弟子名录与归舍登记。另有淡墨旁记一句：若陆栖尘所述属实，则三更之后仍有人见其入岭。",
    ],
    clues: ["整份试炼名单里，唯一被抹去的名字是“温照夜”。"],
    nextSuggestedKeywords: ["温照夜"],
  },
  {
    id: "wenzhaoye",
    title: "温照夜弟子档案",
    keyword: "温照夜",
    pageNumber: 8,
    media: {
      src: "./assets/disciples/温照夜.png",
      alt: "温照夜画像",
      caption: "附图：温照夜入门档案所载画像。",
      fit: "contain",
    },
    content: [
      "温照夜，青岚宗外门弟子，籍贯空缺，入门簿册上只录了“自行投山门”五字。",
      {
        type: "highlight",
        before: "档案注明其常住空翠院",
        text: "乙四十九",
        after: "号房，日常值务为药圃浇灌与夜课灯巡。",
      },
      "灯册附页写着“魂灯已撤”，可魂灯编号却仍保留为“乙四十九”，似有人来不及将旧档一并销去。",
    ],
    clues: ["院舍号与魂灯编号都指向同一个词：乙四十九。"],
    nextSuggestedKeywords: ["乙四十九"],
  },
  {
    id: "yi49",
    title: "空翠院乙四十九号房遗物清单",
    keyword: "乙四十九",
    pageNumber: 14,
    content: [
      "空翠院乙四十九号房于试炼后三日封缄，房中遗物由事务处暂行点录。",
      "登记之物共有四件：破损纸鹤、青铜钥、旧灯芯、骨笛。",
      "其中纸鹤外壳沾有泥水与香灰，似曾被火烘过又匆忙压平，故单独另附注记。",
    ],
    clues: ["遗物里最像被人刻意藏过讯息的，是那只“破损纸鹤”。"],
    nextSuggestedKeywords: ["破损纸鹤"],
  },
  {
    id: "broken-paper-crane",
    title: "纸鹤残信",
    keyword: "破损纸鹤",
    pageNumber: 19,
    content: [
      "纸鹤展开后仅余半张字纸，折痕间残留焦黑指印，末端被人撕去一角。",
      { type: "highlight", before: "尚可辨识的一句只有：“", text: "若我三日未归，远离青岚宗，不要信玄濯……", after: "”" },
      "卷末另记：此信笔势仓促，却与温照夜平日誊写药圃值簿的字迹一致。",
    ],
    clues: ["残句中的“玄濯”指向宗门内某位高位之人。"],
    nextSuggestedKeywords: ["玄濯"],
  },
  {
    id: "luqichen",
    title: "陆栖尘弟子档案",
    keyword: "陆栖尘",
    pageNumber: 27,
    media: {
      src: "./assets/records/lu-qichen.png",
      alt: "陆栖尘画像",
      caption: "附图：明照院弟子陆栖尘存档画像。",
      fit: "contain",
    },
    content: [
      "陆栖尘，青岚宗明照院弟子，本届问心岭试炼同行者之一，试炼结束后已随队归山。",
      "关于温照夜独自离队一事，其证词载明：三更后，他曾在问心岭山道见温照夜独自入岭，身边未有同行之人。",
      "此份证词现由戒律堂收存，外门事务处据此将其列作温照夜离队记录的佐证。",
      { type: "keyword-link", label: "查看陆栖尘证词封卷", keyword: "陆栖尘证词" },
    ],
    clues: ["证词中特别注明了温照夜入岭的时辰：三更。"],
    nextSuggestedKeywords: ["三更"],
  },
  {
    id: "huaijindu",
    title: "槐阴渡地方志",
    keyword: "槐阴渡",
    pageNumber: 32,
    content: [
      "《槐阴渡地方志》残抄本，藏经阁旧录作地方风物卷，实则多记青岚宗立宗前后与山下村镇往来之事。",
      "卷中称，槐阴渡位于后山水脉下游，村中多槐，霜降前后夜雾自渡口升起，灯火照水时常见青色倒影。",
      {
        type: "highlight",
        before: "每逢霜降，村中会向青岚宗献“",
        text: "问心灯",
        after: "”。献灯之日，村人不鸣锣鼓，不列香案，只由族中长者以黑布覆灯，送至山门外三丈处。",
      },
      "地方志旁批写得极轻：问心灯入山后，不入器库，不入供堂，只归魂灯房旧册。若查此灯来历，当先查器谱，不可问村人。",
    ],
    clues: ["每逢霜降，村中会向青岚宗献“问心灯”。"],
    nextSuggestedKeywords: ["问心灯"],
  },
  {
    id: "wenxindeng",
    title: "问心灯器谱",
    keyword: "问心灯",
    pageNumber: 33,
    media: {
      src: "./assets/records/问心灯器谱.png",
      alt: "问心灯器谱残页",
      caption: "附图：问心灯器谱残页。卷面题作“以人为灯，照心内之隐”，边角朱批多处已被烟火熏黑。",
      fit: "contain",
    },
    content: [
      "器谱残页题作《问心灯》，纸色较新，装订却用旧魂灯房封线，似曾被从禁录中拆出另存。",
      "谱中先列灯盏形制：青铜为座，槐木为芯，灯罩以薄玉磨成。其外观与寻常试炼法器无异，故外门旧称其为问心照影之灯。",
      "再往下，文字忽转晦涩，明言此灯不可只以灵石、符火、兽油点燃。灯成之前，须有一魂入芯，一名入灯，一誓压于灯底。",
      "卷尾朱砂批注：问心灯不是普通法器，而是需要人的灵魂献祭做出的人魂灯。此句原被墨线涂去，后又被人以针尖挑开。",
    ],
    clues: ["问心灯不是普通法器，而是需要人的灵魂献祭做出的人魂灯。"],
    nextSuggestedKeywords: ["人魂灯"],
  },
  {
    id: "qingwu",
    title: "后山青雾禁令",
    keyword: "青雾",
    pageNumber: 36,
    content: [
      "后山禁令第十七条，专记雾谷异变。文曰：凡问心岭、折云亭、旧试剑坎三处，若见雾色微青，不类晨岚，须即刻鸣铃退止，不得独行入内。",
      "续条又写：雾中若闻人声呼名，无论所呼为乳名、本名、字、号，皆不可应，不可回头，不可辨其方向。若应声者，轻则神识恍惚三日，重则名籍、灯册、口供皆生错乱。",
      "禁令旁批引自旧案，说三年前药堂曾收治一名外门弟子，其人口称自己一路随同门下山，同席者却皆言从未见过此人。其后病者高热七日，醒来只记得有人在雾里反复唤他全名。",
      "再往下的补录提到：青雾后症常见于试炼幸归之人，初起时记忆断续、笔迹失真、常将他人姓名误添一字或改作本不相干的旧姓。若卷宗中屡见姓名错写，不可只疑抄手，也当疑雾。",
      "末尾加封时，执事以极细小字另记：凡闻雾中唤名而不应者，往往仍能记得那声音与自己极近之人相似。是以山门中人，最忌被知全名。",
    ],
    clues: ["雾中若有人呼你全名，不可应，不可回头。"],
    nextSuggestedKeywords: ["魂灯录", "无名龛"],
  },
  {
    id: "hondenglu",
    title: "《魂灯录》抄页",
    keyword: "魂灯录",
    pageNumber: 37,
    content: [
      {
        type: "highlight",
        before: "《魂灯录》旧抄本第三卷残页：",
        text: "魂灯只系其人真名，不系道号",
        after: "，不系外门玉牌所录别称。",
      },
      "若灯下名签残缺，或真名遭改，则灯可长明而其人行踪不定，归山诸簿亦易随之错乱。",
      "残页旁有借阅批记：此卷不宜外借。若灯底只余旧姓一笔，当转查第七灯，不可只查名籍。",
      "另有旧墨批注：凡灯位迁入无名龛者，非死非灭，多因其名被夺，灯仍识人，人已不识归路。",
    ],
    clues: ["若灯底残刻只余一字，卷中嘱其转查“第七灯”。"],
    nextSuggestedKeywords: ["第七灯"],
  },
  {
    id: "wangchensan",
    title: "药堂方笺",
    keyword: "忘尘散",
    pageNumber: 43,
    media: {
      src: "./assets/records/wangchensan.png",
      alt: "忘尘散药瓶",
      caption: "附图：药堂旧方笺中所记忘尘散。",
      fit: "contain",
    },
    content: [
      "药堂旧方笺记载，多个受青雾影响的弟子都曾服过忘尘散。药堂将此药列为青雾后症的应急方，不得由弟子自行求取或转交。",
      "其中包括原本要成为玄濯真人准外门弟子的白蘅。她因青雾侵体，身心俱损，发作时神识不稳，必须服用此药才能保住性命。",
      "此方原本名为熟络筋，药性在于疏通受损经脉、稳住神魂。只是服用之后，伤者往往会丧失一部分记忆，久而久之，药堂弟子与病者都不再称其原名，皆以“忘尘散”相呼。",
    ],
    clues: ["白蘅的青雾后症与忘尘散有关，药堂旧方或许能解释她为何记不清问心岭旧事。"],
    nextSuggestedKeywords: ["白蘅", "青雾", "魂灯录"],
  },
  {
    id: "xuanzhuozhenren",
    title: "玄濯真人档案",
    keyword: "玄濯真人",
    pageNumber: 28,
    media: {
      src: "./assets/records/xuanzhuo-zhenren.png",
      alt: "玄濯真人画像",
      caption: "附图：玄濯真人旧画像。画像未署年月，卷背批注只写“闭关出世后，容貌未改”。",
      fit: "contain",
    },
    content: [
      "玄濯真人旧档原记其寿数将尽于百年前，后以闭关之名封存行迹。数百年后，此人再度出世，旧档已被损坏无法探知过往细节。",
      "出世之后，玄濯真人开始广收传承人。历年入门弟子无一得善终：或奉命外出后殒命，或因不明缘由叛出师门，姓名遂从传承簿中逐一抹去。",
      "戒律堂旧案称，叛出师门者临行前多曾请求查阅魂灯录，却均被以“师门秘法，不得外传”为由驳回。其后去向，有的列为失踪，有的只留一盏熄灭旧灯。",
      "近期玄濯真人重开行照堂，面向外门弟子广收记名弟子。公告所列候选人为温照夜。",
    ],
    clues: ["玄濯真人重开行照堂，收徒之前要求先验魂灯，再验真名。"],
    nextSuggestedKeywords: ["魂灯录", "第七灯", "沈照微"],
  },
  {
    id: "jiugepianmen",
    title: "旧阁偏门抄记",
    keyword: "旧阁偏门",
    pageNumber: 38,
    content: [
      "旧阁偏门不在藏经阁正图之内，只在旧锁匙清册旁留一行细注：偏门向北，近旧墙，不从正阶入。",
      "门内所藏多为残卷与未誊尽的禁录，其中文字常以真名直书，故非执事不得擅启。",
      "门后木签上仅存一句：魂灯只认真名，不认道号。若名被夺，灯可不灭而人不归。",
      "签尾被人以指腹抹去半行墨，依稀只见“若欲查其归处，当循井……”几个字。",
    ],
    clues: ["旧阁偏门所指，不只是藏书，更像是某种追索失名之人的旁路。"],
    nextSuggestedKeywords: ["归墟井"],
  },
  {
    id: "jiuzhuobutian-juan1",
    title: "九转补天阵残卷一",
    keyword: "九转补天阵残卷",
    pageNumber: 29,
    media: {
      src: "./assets/records/九转.png",
      alt: "九转补天阵残卷图",
      caption: "附图：九转补天阵残卷一。卷面所绘阵图残缺，边角可见旧日封印痕迹。",
      fit: "contain",
    },
    content: [
      "《九转补天阵》乃上古仙门遗阵，相传由第一代九位先祖所创。",
      "此阵：“补天地之缺，护苍生之安。”",
      "完整阵法共分四篇残卷，但千年前仙魔大战后，阵图残缺，只留下两卷残篇，被青岚宗历代祖师收藏。",
      "残卷一内容：“天有裂痕，地有余缺，以山为骨，以灵为血，以阵补天。",
      { type: "selection-hidden", text: "天缺可补，魂缺亦可补。" },
      { type: "selection-hidden", text: "为防止有心人利用，另外两卷交给了陆氏和白氏家族守护" },
    ],
    clues: ["完整阵法共分四篇残卷，如今仅剩两卷残篇。"],
    nextSuggestedKeywords: ["魂灯录"],
  },
  {
    id: "luqichenzhengci",
    title: "陆栖尘证词封卷",
    keyword: "陆栖尘证词",
    pageNumber: 39,
    content: [
      "卷宗编号：JL-097。卷宗来源：戒律堂。问供对象：明照院弟子陆栖尘。问供日期：九月初八。记录人：沈怀璧。封存状态：已封。",
      "问：九月初七夜，你最后一次见到温照夜是在何处？陆栖尘答：问心岭山道。",
      "问：何时？陆栖尘答：三更后。",
      "问：她当时可曾与人同行？陆栖尘答：未曾。她一人往岭中去，行色仓促，似不愿被人撞见。",
      "问：她可曾与你说话？陆栖尘答：没有。",
      "问：你为何不拦？陆栖尘答：我以为她只是回去寻遗落之物。问心岭试炼刚毕，弟子疲惫，我不敢多问。",
      "问：你可确定那人是温照夜？陆栖尘答：确定。",
      "问：你如何确定？陆栖尘答：她穿空翠院弟子服，腰间系白色发带，身形与温照夜相近。",
      "问：你是否听见她回应过旁人呼唤？陆栖尘答：没有。",
      "问：你是否看见青雾？陆栖尘答：没有。",
      "问：你是否知晓温照夜曾私查魂灯房？陆栖尘答：不知。",
      "问：你是否曾收过她的纸鹤？陆栖尘答：没有。",
      "问：此证词可属实？陆栖尘答：属实。",
      "卷尾批注：此人供词前后迟疑，答“纸鹤”一问时手有墨污，疑曾另书一份。然其供称三更后见温照夜独入问心岭，可作除名凭证。",
      "戒律堂朱批：温照夜私自离队一事，证据已足。此卷不得外调。",
    ],
    clues: ["此卷真正可疑之处，不在“见到她”，而在“为何如此肯定那就是她”。"],
    nextSuggestedKeywords: ["第七灯"],
  },
  {
    id: "diqideng",
    title: "第七灯迁记",
    keyword: "第七灯",
    pageNumber: 40,
    media: {
      src: "./assets/records/diqideng.png",
      alt: "第七灯旧灯图",
      caption: "附图：第七灯迁记所附魂灯图。",
      fit: "contain",
    },
    content: [
      "魂灯房重誊残页记：第七灯，温照夜，灯火未灭，灯焰细而不散。",
      "灯底残刻仅余一字“姜”，旧执事以朱砂圈注：此字不可磨尽，留待后核。",
      "迁灯附注写明：该灯自原列移入无名龛，不得与寻常弟子灯同架，不得再以院舍号对照。",
      "页边另有一行极细旁书：灯既识其人，则其人未尽失。惟其名不全，归处不明。",
    ],
    clues: ["第七灯被移入了“无名龛”。"],
    nextSuggestedKeywords: ["无名龛"],
  },
  {
    id: "wumingkan",
    title: "无名龛灯签残页",
    keyword: "无名龛",
    pageNumber: 41,
    content: [
      {
        type: "highlight",
        before: "",
        text: "无名龛位于魂灯房最内侧",
        after: "，不列于寻常灯册，只在旧执事交簿中偶有提及。",
      },
      "交簿原文云：凡真名受损、灯识其人而簿不敢直录者，暂移无名龛，待查旧姓、旧籍、旧井三项之后，再定归架。",
      "龛内木签多不书全名，只留一字、一画或一枚旧印。其意不在藏名，而在防名再失。",
      "残页最末一句被水浸后尚能认出：“若欲追其人曾从何处入山，当查归墟井，不当只问山门。”",
    ],
    clues: ["无名龛与“归墟井”出现在同一条追索指引里。"],
    nextSuggestedKeywords: ["归墟井"],
  },
  {
    id: "guixujing",
    title: "归墟井封存卷宗",
    keyword: "归墟井",
    pageNumber: 42,
    content: ["宗门机密，不可探查"],
    clues: [],
    nextSuggestedKeywords: [],
  },
  {
    id: "shenzhaowei",
    title: "沈照微旧档",
    keyword: "沈照微",
    pageNumber: 35,
    media: {
      src: "./assets/records/沈照微.png",
      alt: "沈照微旧档插图",
      caption: "附图：沈照微旧档。图中为旧时内门装束，据卷旁批注，此像取自归墟门异动前后。",
      fit: "contain",
    },
    content: [
      "沈照微，青岚宗旧时内门弟子，魂灯术传人。",
      "百年前归墟井异动时，她自愿以魂入井，封住归墟门。",
      "旧档残注：",
      "“照微封井，玄濯立誓。愿此门永闭，愿此生不复相见。”",
      "卷尾有玄濯真人私批：",
      { type: "alert", text: "“若高阶玉牒需重启，仍以照微为令。”" },
    ],
    clues: ["沈照微以魂封井，旧档却另留玄濯真人私批。"],
    nextSuggestedKeywords: ["归墟井"],
  },
  {
    id: "jiangyunheng",
    title: "姜云蘅魂灯旧籍",
    keyword: "姜云蘅",
    pageNumber: 34,
    media: {
      src: "./assets/records/jiang-yunheng.png",
      alt: "姜云蘅旧画像",
      caption: "附图：姜云蘅旧画像。画像未注明绘制年月，背面只留“槐阴渡姜氏”五字。",
      fit: "contain",
    },
    content: [
      {
        type: "highlight",
        before: "魂灯房旧籍第六列，原录灯主姜云蘅，槐阴渡姜氏女。其人十年前随引路仙师入山，外门名籍却无正式归宗记录。在凡间曾有一姊妹唤名",
        text: "姜云岫",
        after: "。",
      },
      "卷尾夹着空翠院旧房签，墨书一句：若后来姜氏女以别名归山，不可当面唤其姓，应先验魂灯，再验玉牒。",
    ],
    clues: ["旧籍特别提到姜云蘅在凡间的姊妹：姜云岫。"],
    nextSuggestedKeywords: ["姜云岫"],
  },
  {
    id: "jiangyunxiu",
    title: "姜云岫档案",
    keyword: "姜云岫",
    pageNumber: 30,
    media: {
      src: "./assets/records/jiang-yunxiu-before.jpg",
      alternateSrc: "./assets/records/jiang-yunxiu-found.jpg",
      alt: "姜云岫旧画像",
      alternateAlt: "姜云岫异常画像",
      caption: "附图：槐阴渡姜氏旧户籍所附画像。",
      fit: "contain",
    },
    content: [
      "槐阴渡旧户籍载：姜云岫，凡人，姜云蘅之妹。姐妹二人幼时相依为命，姜云蘅入山之前，二人同住渡口东巷。",
      "姜云蘅失踪后，村中传言她死于山神娶亲。姜云岫不信传言，携旧衣与一盏小灯入山寻找姐姐，自此再无回村记载。",
      "数日后，村民只在山道附近寻到她遗落的布鞋与药囊。有人称曾见她往青雾深处走去，后来便没有消息。",
      "槐阴渡里正口供写道：姜云岫或已在寻人途中被野兽咬死，尸身未能寻回。此说无人亲见，事务处暂以“失踪”落档。",
    ],
    clues: ["姜云岫是姜云蘅在槐阴渡相依为命的妹妹，她进山寻找姐姐后同样失踪。"],
    nextSuggestedKeywords: ["槐阴渡", "山神娶亲", "问心灯"],
  },
  {
    id: "shanshenquqin",
    title: "槐阴渡旧俗",
    keyword: "山神娶亲",
    pageNumber: 31,
    media: {
      src: "./assets/records/shanshen-quqin.png",
      alt: "槐阴渡山神娶亲旧俗图",
      caption: "附图：槐阴渡旧俗图。图中神轿、红灯与山道皆为村中旧传，画师未署名。",
      fit: "contain",
    },
    content: [
      "槐阴渡旧俗卷载，所谓“山神娶亲”，并非山中神祇迎娶凡间女子，而是村民对一桩旧事的避讳称呼。",
      "所谓山神娶亲，其实是青岚宗收走命格特殊的孩子。孩子被带走后，村中不得追问去处，只能以红纸封门，称其已入山侍奉山神。",
      "被选中的孩子多在霜降前后失踪，家中只收到一盏覆黑布的小灯。灯不得点燃，不得送回村中，须由族中长者送至山门外三丈处。",
      "槐阴渡老人称，若有人追问孩子是否还活着，便会被告诫：山神已娶亲，旧名不可再叫。此俗流传多年，村中遂无人敢把失踪与宗门联系起来。",
      "卷册末页记有一条未入正册的旁注：命格特殊者入山后，先验魂灯，再定名籍；若灯火不灭，家属不得认领。",
    ],
    clues: ["槐阴渡所谓山神娶亲，实为青岚宗收走命格特殊的孩子。"],
    nextSuggestedKeywords: ["姜云蘅", "姜云岫", "问心灯"],
  },
  {
    id: "qingtongyao",
    title: "青铜钥封存验记",
    keyword: "青铜钥",
    pageNumber: 12,
    content: [
      "失物编号SW-021，青铜钥一枚，拾得于空翠院乙四十九旧舍。钥柄刻有“旧阁偏门”四字，齿口磨损尚新。",
      "藏经阁执事验过锁齿后称，此钥并非外门常用制式，而是旧阁封门前留下的副钥。该门从正厅内无法开启，只能循北墙旧阶而入。",
      "封存匣底另压着一张试锁纸，写明钥入锁后门闩自行退开，门内可见《真名禁忌》残页与旧魂灯迁册。试锁者未署姓名。",
      "事务处朱批：此物可验，不可归还。若再查其用途，当调阅旧阁偏门，不得擅往藏经阁北墙。",
    ],
    clues: ["青铜钥所开的并非院舍门，而是藏经阁的旧阁偏门。"],
    nextSuggestedKeywords: ["旧阁偏门"],
  },
  {
    id: "jiudengxin",
    title: "旧灯芯封存批注",
    keyword: "旧灯芯",
    pageNumber: 16,
    content: [
      "失物编号SW-026，旧灯芯一截，拾得于魂灯房后廊。灯芯已焦黑，断口却仍有微弱青火余温，入匣后三次自行复燃。",
      "执事初验称其不属七盏现灯，后以旧油浸试，火焰却朝无名龛方向偏斜。凡靠近第六、第七灯时，灯芯表面都会浮出一线旧姓刻痕。",
      "封条上连写三禁：此物不可归还，不可焚，不可近魂灯。末句下方另有极淡补笔：若灯芯自己亮起，先遮灯名，后退三步。",
      "修缮簿未说明此物为何落在后廊，只记寅时有人自无名龛移出一只黑木匣，匣中少了一截灯芯。",
    ],
    clues: ["旧灯芯会对第六灯、第七灯与无名龛产生反应。"],
    nextSuggestedKeywords: ["第七灯", "无名龛"],
  },
  {
    id: "wuhuming",
    title: "勿呼名禁口残令",
    keyword: "勿呼名",
    pageNumber: 26,
    content: [
      "后山禁口残令，只余三字题签：勿呼名。此令不列于现行门规，却与问心岭、归墟井及魂灯房旧册一并封存。",
      "令中写明，青雾起时不可高声呼人全名；若井下先唤其名，更不得替旁人回应。声音虽似故人，也不可问其来处。",
      "违令者初时只觉记忆错乱，数日后名籍、玉牒与魂灯便会出现互不相符之处。其人仍在，名字却可能先一步被带入井中。",
      "残页末行被朱砂反复描重：若有人以你的声音唤另一个名字，闭目退后，不要回答那是谁。",
    ],
    clues: ["所谓勿呼名，不只是不喊真名，也包括不回应井中替人喊出的名字。"],
    nextSuggestedKeywords: ["归墟井"],
  },
  {
    id: "qinglan-yiwen",
    title: "青岚宗异闻卷",
    keyword: "青岚宗异闻卷",
    pageNumber: 45,
    media: {
      src: "./assets/records/异闻.png",
      alt: "青岚宗异闻卷",
      caption: "附图：青岚宗异闻卷残页。不入宗史，不传外门。",
      fit: "contain",
    },
    content: [
      "【序】",
      "青岚立宗千余载。山门之内，偶有怪事。",
      { type: "highlight", before: "历代掌门皆言：“山中灵气汇聚，偶生异象，不足为怪。”然怪事愈积愈多。遂有后人私录于此。不入宗史。不传外门。只供后世守山者查阅。其中记录了一篇：太初", text: "无相", after: "录" },
      "此篇不得诵读。不得誊抄。不得以神识观之。",
      "尤其——",
      "不可念其真名。",
      "【太初】",
      "古卷有载：",
      "混沌未分之时，天地无名，日月无光。",
      "后盘古生于混沌，一斧开天。",
      "清气升而为天。",
      "浊气沉而为地。",
      "日月始明，山河始生，万物自此有“形”。",
      "然天地初分之际，",
      "有一物随第一缕浊气落入人间。",
      "无形。无名。无魂。",
      "既非神。亦非妖。非魔。非鬼。更不在六道轮回之中。",
      "它没有自己的模样。",
      "于是——",
      "它开始寻找别人的模样。",
    ],
    clues: ["异闻卷私录太初无相录：无形无名之物，会寻找别人的模样。"],
    nextSuggestedKeywords: ["太初无相录"],
  },
  {
    id: "wuxiang",
    title: "无相卷",
    keyword: "无相",
    pageNumber: 46,
    media: {
      src: "./assets/records/无相卷.png",
      alt: "无相卷",
      caption: "附图：无相卷残页。记载上古邪祟之形与名。",
      fit: "contain",
    },
    content: [
      "【诞生】",
      "最早关于此物的记载，来自上古一个已经消失的部族。部族之人曾信仰：寂照无生佛。",
      "每年会杀死一个活人向其献祭，数日之后，死去之人却又会自己回来。",
      "声音未变。记得父母。记得妻儿。甚至记得幼时埋在屋后的第一枚铜钱。旁人看不出任何异常。",
      "部落更认为是神明怜惜众人，便更用力地献祭。可唯有一点。归来之人，从不做梦，没有情感。",
      "后来族中巫者发现：真正的人芯子早已被替换。回来的——不是他们。",
      "【吞形】",
      "此邪祟无本相。故需吞噬众生，以得其形。",
      "凡被其吞噬者：皮、骨、血、气、声、魂、忆……皆归其所有。",
      "吞一人，便可化一人。吞百人，便有百相。吞万人——便可藏于万人之中。",
      "它能够完美复制死者的：容貌。声音。习惯。神态。修为气息。甚至神魂波动。",
      "寻常照妖镜、问心术、验魂法，皆不可辨。",
      "【食忆】",
      "真正可怖之处，并非夺人样貌。而是——它会吃掉人的记忆。",
      "被吞噬者一生所见，皆为它所见。被吞噬者一生所学，皆为它所学。",
      "父母姓名。宗门功法。师徒秘密。阵法禁制。乃至一个人临死之前最深的恐惧。它全部都会记得。",
      "所以它每吃一个人，便更像一个“人”。",
      "【夺忆之异】",
      "然古卷记载：此物虽然能够获得记忆，却无法真正理解人的感情。",
      "它知道一个人爱谁，却不知道何为爱。它知道一个人为何流泪，却不知道何为悲伤。它知道一个人恐惧死亡，却不知道为何众生畏死。",
      "因此辨认此物，唯有一法：问其情，不问其事。",
      "问旧事，它皆能答。问秘密，它皆知晓。唯独问：“那一天，你为什么哭？”它会沉默。",
      "【无相】",
      "上古修士第一次见到它真正的模样时，共有十七人在场。十七人留下了十七种记载。",
      "有人说：那是一团黑雾。有人说：那是一具没有皮肤的人。有人说：那是一张不断变化的脸。有人说：那是自己的母亲。有人说：什么都没有看见。",
      "唯有一名修士写道：“吾所见者，并非其形。”“乃吾心中最不愿再见之人。”",
      "故后世称其：无相。",
      "【真名】",
      "上古九位镇阵者曾以窥天之术，追溯其降世之始。终于在天地初开的第一道裂隙中，寻得了它最初的“名”。",
      { type: "highlight", before: "其名为——「", text: "无相祟", after: "」。古文又称：「太初无相」。" },
      "然而后来他们发现了一件极其恐怖的事情。它原本——没有名字。",
      "所谓“无相祟”，并不是它告诉世人的名字。而是人给它起的名字。",
      "可当世间第一次有人称呼这个名字之后，它便第一次拥有了“自己”。",
      "【名即为锚】",
      "无形之物不可杀。无名之物不可镇。",
      "于是九位镇阵者为它取名，以名定魂，以魂定形，以形入阵。这才终于能够将它封印。",
      "所以：名字既是它的弱点。也是它存在于这个世界的锚。",
      "只要还有人记得“无相祟”三个字，它便仍与人间存在联系。但若世间所有人都忘记这个名字——它便再无归途。",
      "【九转封厄】",
      "上古末年，无相祟已经吞噬无数生灵。无人知道身边之人究竟是真是假。",
      "甚至九位镇阵者之中，都曾有人怀疑：“我们九人里……”“是否已经有一个不是人了？”",
      "九人尝试建立九转补天阵，试图消灭他。",
      "可是失败了，九人豁出性命才将其镇压，后世所谓青岚宗——便建立在这座封印之上。",
      "在九人之中只活下来了两人。这两人便是现在的陆氏家族和白氏家族，只是近几年两个家族接连遭受重创。",
      { type: "highlight", before: "传闻曾经的镇阵者给他们留下了一则", text: "咒印", after: "，据说是用来对付无相的，不得而知。" },
      "【为何不可杀】",
      "无相祟没有真正的肉身。杀死它夺来的身体，只不过是毁去它的一张“脸”。",
      "只要世间仍有人记得它，仍有人恐惧它，仍有人呼唤它，它便可以沿着记忆重新归来。",
      "因此九转补天阵从来都不是为了杀死它。而是为了让世间——忘记它。",
      "镇名。镇形。镇魂。镇念。断因果。绝轮回。最终封闭天缺。使其永世不得归于人间。",
    ],
    clues: ["无相祟无形无名，吞噬众生得其形与忆，名字是其存在之锚。"],
    nextSuggestedKeywords: ["九转补天阵", "无相祟"],
  },
];

const app = document.querySelector("#app");
const footerStatus = document.querySelector("#footer-status");
const toastRegion = document.querySelector("#toast-region");

const pagesById = new Map(pagesData.map((page) => [page.id, page]));
const keywordIndex = new Map();

for (const page of pagesData) {
  keywordIndex.set(normalizeKeyword(page.keyword), page);
}

const state = {
  visited: loadVisitedPages(),
  viewedClues: loadViewedClues(),
  searchedKeywords: loadSearchedKeywords(),
  failStreak: 0,
  message: "",
  messageType: "",
  pendingSection: null,
  activePanel: null,
  activeDiscipleId: DISCIPLES_ARCHIVE[0].id,
  activeLostItemId: LOST_AND_FOUND[0].id,
  spiritRootStarted: false,
  spiritRootQuestionIndex: 0,
  spiritRootAnswers: [],
  spiritRootPhase: "intro",
  spiritRootSelectedAnswer: null,
  spiritRootResult: null,
  spiritRootResultScores: null,
  activeSutraTab: "borrow-records",
  activeLampId: "lamp-7",
  lanternGateInput: [],
  lanternGateUnlocked: localStorage.getItem(SOUL_LANTERN_GATE_UNLOCKED_STORAGE_KEY) === "true",
  lanternGateError: "",
  soulLanternDoorOverlay: null,
  soulLanternDoorCode: [null, null, null],
  soulLanternDoorActiveSlot: null,
  soulLanternDoorMessage: "",
  soulLanternDoorUnlocked: false,
  activeSoulLanternArchiveId: null,
  corruptionActive: false,
  activeHerbalRecordId: HERBAL_RECORDS[0].id,
  activeHerbalNoteId: null,
  activeNewsId: null,
  activeNewsCollectionKind: null,
  activeNewsReturnPanel: null,
  activeNewsReturnScrollY: 0,
  hiddenDossierOpen: false,
  mapDossierOpen: false,
  pendingPanelFocus: false,
};

let toastTimer = null;
let humanSoulLampTimers = [];
let humanSoulLampAudioContext = null;
let jiangYunxiuRevealTimer = null;
let jiangYunxiuTypingTimer = null;
let spiritRootAdvanceTimer = null;
let spiritRootSenseTimer = null;

function normalizeKeyword(value) {
  return String(value ?? "").trim();
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function highlightCinnabarTerms(value, terms = []) {
  return terms.reduce(
    (formatted, term) =>
      formatted.replaceAll(
        term,
        `<strong class="news-detail-red-word">${term}</strong>`,
      ),
    escapeHtml(value),
  );
}

function loadVisitedPages() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);

    if (!raw) {
      return new Set();
    }

    const parsed = JSON.parse(raw);

    if (!Array.isArray(parsed)) {
      return new Set();
    }

    return new Set(parsed.filter((id) => pagesById.has(id)));
  } catch {
    return new Set();
  }
}

function loadViewedClues() {
  try {
    const raw = localStorage.getItem(CLUE_STORAGE_KEY);

    if (!raw) {
      return new Set();
    }

    const parsed = JSON.parse(raw);

    if (!Array.isArray(parsed)) {
      return new Set();
    }

    return new Set(parsed.filter((item) => typeof item === "string"));
  } catch {
    return new Set();
  }
}

function loadSearchedKeywords() {
  try {
    const raw = localStorage.getItem(SEARCHED_KEYWORDS_STORAGE_KEY);

    if (!raw) {
      return new Set();
    }

    const parsed = JSON.parse(raw);

    if (!Array.isArray(parsed)) {
      return new Set();
    }

    return new Set(parsed.filter((keyword) => typeof keyword === "string" && keyword.trim()));
  } catch {
    return new Set();
  }
}

function saveVisitedPages() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...state.visited]));
  } catch {
    // Ignore storage failures.
  }
}

function saveViewedClues() {
  try {
    localStorage.setItem(CLUE_STORAGE_KEY, JSON.stringify([...state.viewedClues]));
  } catch {
    // Ignore storage failures.
  }
}

function saveSearchedKeywords() {
  try {
    localStorage.setItem(SEARCHED_KEYWORDS_STORAGE_KEY, JSON.stringify([...state.searchedKeywords]));
  } catch {
    // Ignore storage failures.
  }
}

function markKeywordSearched(keyword) {
  const normalizedKeyword = normalizeKeyword(keyword);

  if (!normalizedKeyword || state.searchedKeywords.has(normalizedKeyword)) {
    return;
  }

  state.searchedKeywords.add(normalizedKeyword);
  saveSearchedKeywords();
}

function markClueViewed(key) {
  if (!key || state.viewedClues.has(key)) {
    return;
  }

  state.viewedClues.add(key);
  saveViewedClues();
}

function hasViewedClue(key) {
  return state.viewedClues.has(key);
}

function markVisited(pageId) {
  const isNew = !state.visited.has(pageId);

  if (isNew) {
    state.visited.add(pageId);
    saveVisitedPages();
  }

  const clueKey = PAGE_CLUE_MAP[pageId];

  if (clueKey) {
    markClueViewed(clueKey);
  }
}

function formatCount(number) {
  return String(number).padStart(2, "0");
}

function getCurrentRoute() {
  const hash = window.location.hash.replace(/^#\/?/, "");

  if (!hash || hash === "home") {
    return { view: "home" };
  }

  if (hash === "notice-board") {
    return { view: "home", section: "notice-board" };
  }

  if (hash === "map") {
    return { view: "map" };
  }

  const [view, pageId] = hash.split("/");

  if (view === "record" && pageId && pagesById.has(pageId)) {
    return { view: "record", pageId };
  }

  return { view: "home" };
}

function navigateHome() {
  if (window.location.hash === "#/home" || window.location.hash === "#home") {
    render();
    window.scrollTo({ top: 0, left: 0 });
    return;
  }

  window.location.hash = "/home";
}

function navigateToPage(pageId) {
  const nextHash = `#/record/${pageId}`;

  if (window.location.hash === nextHash) {
    render();
    window.scrollTo({ top: 0, left: 0 });
    return;
  }

  window.location.hash = nextHash;
}

function navigateToMountainMap() {
  if (window.QingdengGameShell?.openScene) {
    window.QingdengGameShell.openScene("./map.html");
    return;
  }

  const mapUrl = new URL("./map.html", window.location.href).toString();
  const popup = window.open(mapUrl, "_blank");

  if (!popup) {
    showToast("山门地图新页被拦截，请允许弹出新页面后重试。");
  } else {
    popup.opener = null;
  }
}

function setSearchFeedback(message = "", type = "") {
  state.message = message;
  state.messageType = type;

  const messageNode = document.querySelector("#search-message");
  const hintNode = document.querySelector("#search-hint");

  if (messageNode) {
    messageNode.textContent = message;
    messageNode.className = `search-feedback ${type ? `is-${type}` : ""}`;
  }

  if (hintNode) {
    hintNode.textContent =
      state.failStreak >= 3 ? "也许该从公告里出现过的词开始。" : "";
  }
}

function showToast(message) {
  toastRegion.innerHTML = `<div class="toast">${escapeHtml(message)}</div>`;

  if (toastTimer) {
    clearTimeout(toastTimer);
  }

  toastTimer = window.setTimeout(() => {
    toastRegion.innerHTML = "";
  }, 2600);
}

function isDiscipleJadeLoggedIn() {
  const activeAccount = localStorage.getItem(ACTIVE_JADE_ACCOUNT_STORAGE_KEY);

  if (activeAccount === "wzy") {
    return localStorage.getItem(JADE_LOGIN_STORAGE_KEYS[0]) === "true";
  }

  if (activeAccount === "lxz") {
    return localStorage.getItem(JADE_LOGIN_STORAGE_KEYS[1]) === "true";
  }

  return JADE_LOGIN_STORAGE_KEYS.some((key) => localStorage.getItem(key) === "true");
}

function readClaimedLostItems() {
  try {
    const parsed = JSON.parse(localStorage.getItem(CLAIMED_LOST_ITEMS_STORAGE_KEY) ?? "[]");
    return new Set(Array.isArray(parsed) ? parsed.filter((item) => typeof item === "string") : []);
  } catch {
    return new Set();
  }
}

function hasClaimedLostItem(itemId) {
  return readClaimedLostItems().has(itemId);
}

function claimLostItem(itemId) {
  if (!isDiscipleJadeLoggedIn()) {
    showToast("访客不可直接认领失物！");
    return;
  }

  const claimedItems = readClaimedLostItems();
  claimedItems.add(itemId);
  localStorage.setItem(CLAIMED_LOST_ITEMS_STORAGE_KEY, JSON.stringify([...claimedItems]));
  showToast("已存入背包");
  render();
}

function clearHumanSoulLampTimers() {
  for (const timer of humanSoulLampTimers) {
    window.clearTimeout(timer);
  }

  humanSoulLampTimers = [];
}

function getHumanSoulLampAudioContext() {
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;

  if (!AudioContextClass) {
    return null;
  }

  if (!humanSoulLampAudioContext) {
    humanSoulLampAudioContext = new AudioContextClass();
  }

  return humanSoulLampAudioContext;
}

function isHorrorSfxEnabled() {
  return localStorage.getItem(HORROR_SFX_SETTING_KEY) !== "off";
}

function playHumanSoulLampSound(delayMs = 0) {
  if (!isHorrorSfxEnabled()) {
    return;
  }

  const audioContext = getHumanSoulLampAudioContext();

  if (!audioContext) {
    return;
  }

  audioContext.resume().catch(() => {
    // Browsers may block audio; the visual effect should still run.
  });

  const startTime = audioContext.currentTime + delayMs / 1000;
  const duration = HUMAN_SOUL_FLICKER_MS / 1000;
  const endTime = startTime + duration;
  const masterGain = audioContext.createGain();

  masterGain.gain.setValueAtTime(0.0001, startTime);
  masterGain.gain.exponentialRampToValueAtTime(0.18, startTime + 0.08);
  masterGain.gain.exponentialRampToValueAtTime(0.0001, endTime);
  masterGain.connect(audioContext.destination);

  [
    { frequency: 43, type: "sine", gain: 0.9, detune: -8 },
    { frequency: 71, type: "triangle", gain: 0.34, detune: 11 },
  ].forEach((tone) => {
    const oscillator = audioContext.createOscillator();
    const toneGain = audioContext.createGain();

    oscillator.type = tone.type;
    oscillator.frequency.setValueAtTime(tone.frequency, startTime);
    oscillator.detune.setValueAtTime(tone.detune, startTime);
    toneGain.gain.setValueAtTime(tone.gain, startTime);
    toneGain.gain.exponentialRampToValueAtTime(0.0001, endTime);

    oscillator.connect(toneGain);
    toneGain.connect(masterGain);
    oscillator.start(startTime);
    oscillator.stop(endTime + 0.03);
  });

  const sampleRate = audioContext.sampleRate;
  const noiseBuffer = audioContext.createBuffer(1, Math.ceil(sampleRate * duration), sampleRate);
  const noiseData = noiseBuffer.getChannelData(0);

  for (let index = 0; index < noiseData.length; index += 1) {
    noiseData[index] = (Math.random() * 2 - 1) * (1 - index / noiseData.length);
  }

  const noise = audioContext.createBufferSource();
  const noiseFilter = audioContext.createBiquadFilter();
  const noiseGain = audioContext.createGain();

  noise.buffer = noiseBuffer;
  noiseFilter.type = "bandpass";
  noiseFilter.frequency.setValueAtTime(680, startTime);
  noiseFilter.Q.setValueAtTime(0.7, startTime);
  noiseGain.gain.setValueAtTime(0.0001, startTime);
  noiseGain.gain.exponentialRampToValueAtTime(0.055, startTime + 0.12);
  noiseGain.gain.exponentialRampToValueAtTime(0.0001, endTime);

  noise.connect(noiseFilter);
  noiseFilter.connect(noiseGain);
  noiseGain.connect(masterGain);
  noise.start(startTime);
  noise.stop(endTime + 0.03);
}

function getHumanSoulLampOverlay() {
  let overlay = document.querySelector("#human-soul-lamp-overlay");

  if (!overlay) {
    overlay = document.createElement("div");
    overlay.id = "human-soul-lamp-overlay";
    overlay.hidden = true;
    overlay.innerHTML = `
      <div class="human-soul-lamp-dialog" role="alertdialog" aria-live="assertive" aria-label="未知错误">
        <strong>未知错误</strong>
        <span>卷宗读取失败</span>
      </div>
      <div
        class="human-soul-lamp-eyes"
        aria-hidden="true"
        style="--human-soul-eye-image: url('${escapeHtml(HUMAN_SOUL_EYE_IMAGE)}')"
      ></div>
    `;
    document.body.appendChild(overlay);
  }

  return overlay;
}

function showHumanSoulLampEffect() {
  clearHumanSoulLampTimers();
  playHumanSoulLampSound(HUMAN_SOUL_DIALOG_DELAY_MS);

  const overlay = getHumanSoulLampOverlay();
  overlay.hidden = false;
  overlay.classList.remove("is-blackout");
  overlay.classList.add("is-open");

  const dialog = overlay.querySelector(".human-soul-lamp-dialog");

  if (dialog) {
    dialog.hidden = false;
  }

  humanSoulLampTimers.push(
    window.setTimeout(() => {
      overlay.classList.add("is-blackout");
      if (dialog) {
        dialog.classList.add("is-fading");
      }
    }, HUMAN_SOUL_DIALOG_DELAY_MS),
  );

  humanSoulLampTimers.push(
    window.setTimeout(() => {
      overlay.classList.remove("is-open", "is-blackout");
      overlay.hidden = true;
      if (dialog) {
        dialog.classList.remove("is-fading");
      }
      clearHumanSoulLampTimers();
    }, HUMAN_SOUL_DIALOG_DELAY_MS + HUMAN_SOUL_FLICKER_MS + 50),
  );
}

function getImagePreviewRoot() {
  let root = document.querySelector("#image-preview-root");

  if (!root) {
    root = document.createElement("div");
    root.id = "image-preview-root";
    document.body.appendChild(root);
  }

  return root;
}

function isImagePreviewOpen() {
  return Boolean(document.querySelector("#image-preview-root .image-preview-overlay"));
}

function isWenxinRidgePreview(src) {
  return decodeURI(src).replaceAll("\\", "/").endsWith("/assets/records/问心岭.png");
}

function isWenxinRidgeStelePoint(event, image) {
  const bounds = image.getBoundingClientRect();

  if (!bounds.width || !bounds.height) return false;

  const relativeX = (event.clientX - bounds.left) / bounds.width;
  const relativeY = (event.clientY - bounds.top) / bounds.height;

  return relativeX >= 0.72 && relativeX <= 0.97 && relativeY >= 0.62 && relativeY <= 0.99;
}

function openImagePreview({ src, alt, caption }) {
  const root = getImagePreviewRoot();
  root.innerHTML = `
    <section class="image-preview-overlay" data-image-preview-overlay>
      <figure class="image-preview-panel" role="dialog" aria-modal="true" aria-label="图片放大查看">
        <button type="button" class="image-preview-close" data-close-image-preview aria-label="关闭图片预览">×</button>
        <div class="image-preview-frame">
          <img src="${escapeHtml(src)}" alt="${escapeHtml(alt)}" />
        </div>
        ${caption ? `<figcaption>${escapeHtml(caption)}</figcaption>` : ""}
      </figure>
    </section>
  `;
  document.body.classList.add("has-image-preview");
  root.querySelector("[data-close-image-preview]")?.addEventListener("click", () => {
    closeImagePreview();
  });
  root.querySelector("[data-image-preview-overlay]")?.addEventListener("click", (event) => {
    if (event.target === event.currentTarget) {
      closeImagePreview();
    }
  });

  const previewImage = root.querySelector(".image-preview-frame img");

  if (previewImage && isWenxinRidgePreview(src)) {
    previewImage.addEventListener("dblclick", (event) => {
      if (!isWenxinRidgeStelePoint(event, previewImage)) return;

      event.preventDefault();
      event.stopPropagation();
      openImagePreview({
        src: "./assets/clues/side-door-note.png",
        alt: "藏于问心岭石碑后的旧纸条，写有偏门右下角叁下",
        caption: "",
      });
    });
  }

  root.querySelector("[data-close-image-preview]")?.focus();
}

function closeImagePreview() {
  const root = document.querySelector("#image-preview-root");

  if (root) {
    root.innerHTML = "";
  }

  document.body.classList.remove("has-image-preview");
}

function hasUnlockedSideDoor() {
  return hasViewedClue("item:bronze-key");
}

function hasUnlockedLanternDetails() {
  return hasViewedClue("item:old-wick") || state.visited.has("hondenglu");
}

function revealCountForOldWell() {
  const checks = [
    hasViewedClue("item:bronze-key"),
    hasViewedClue("spirit-root:module"),
    hasViewedClue("lamp:seventh") || state.visited.has("diqideng"),
    state.visited.has("wumingkan"),
    hasViewedClue("item:old-wick"),
  ];

  return checks.filter(Boolean).length;
}

function hasUnlockedOldWell() {
  return revealCountForOldWell() >= 3;
}

function getActiveDisciple() {
  return (
    DISCIPLES_ARCHIVE.find((disciple) => disciple.id === state.activeDiscipleId) ??
    DISCIPLES_ARCHIVE[0]
  );
}

function getActiveLostItem() {
  return LOST_AND_FOUND.find((item) => item.id === state.activeLostItemId) ?? LOST_AND_FOUND[0];
}

function createSpiritRootScoreSheet() {
  return Object.fromEntries(SPIRIT_ROOT_ATTRIBUTES.map((attribute) => [attribute, 0]));
}

function getSpiritRootAnswerScores() {
  const scores = createSpiritRootScoreSheet();

  state.spiritRootAnswers.forEach((answerIndex, questionIndex) => {
    const option = SPIRIT_ROOT_QUESTIONS[questionIndex]?.options[answerIndex];

    if (!option) {
      return;
    }

    Object.entries(option.scores).forEach(([attribute, score]) => {
      scores[attribute] += score;
    });
  });

  return scores;
}

function getLastAnswerAttributeHint() {
  const answerIndex = state.spiritRootAnswers[SPIRIT_ROOT_QUESTIONS.length - 1];
  const option = SPIRIT_ROOT_QUESTIONS.at(-1)?.options[answerIndex];
  return Object.keys(option?.scores ?? {});
}

function calculateQuality(relevantScore, totalScore) {
  const ratio = totalScore > 0 ? relevantScore / totalScore : 0;

  if (ratio >= 0.5) {
    return "极品";
  }

  if (ratio >= 0.4) {
    return "上品";
  }

  if (ratio >= 0.3) {
    return "中品";
  }

  return "下品";
}

function calculateResult() {
  const scores = getSpiritRootAnswerScores();
  const totalScore = Object.values(scores).reduce((sum, score) => sum + score, 0);
  const highestScore = Math.max(...Object.values(scores));
  const specialAttribute = SPIRIT_ROOT_SPECIAL_PRIORITY.find(
    (attribute) => scores[attribute] === highestScore,
  );

  if (specialAttribute) {
    const data = SPIRIT_ROOT_RESULT_DATA[specialAttribute];
    return {
      key: specialAttribute,
      data,
      quality: calculateQuality(scores[specialAttribute], totalScore),
      scores,
      totalScore,
    };
  }

  const lastAnswerHint = getLastAnswerAttributeHint();
  const orderedFive = [...SPIRIT_ROOT_FIVE_ELEMENTS].sort((first, second) => {
    const scoreDifference = scores[second] - scores[first];

    if (scoreDifference !== 0) {
      return scoreDifference;
    }

    const firstHintIndex = lastAnswerHint.indexOf(first);
    const secondHintIndex = lastAnswerHint.indexOf(second);

    if (firstHintIndex !== -1 || secondHintIndex !== -1) {
      return (firstHintIndex === -1 ? 99 : firstHintIndex) - (secondHintIndex === -1 ? 99 : secondHintIndex);
    }

    return SPIRIT_ROOT_FIVE_ELEMENTS.indexOf(first) - SPIRIT_ROOT_FIVE_ELEMENTS.indexOf(second);
  });
  const first = orderedFive[0];
  const second = orderedFive[1];
  const pairKey = [
    ["water", "wood", "water-wood"],
    ["water", "earth", "water-earth"],
    ["water", "metal", "water-metal"],
    ["fire", "metal", "fire-metal"],
    ["fire", "earth", "fire-earth"],
    ["earth", "metal", "earth-metal"],
    ["earth", "wood", "earth-wood"],
  ].find(([left, right]) => new Set([first, second]).has(left) && new Set([first, second]).has(right))?.[2] ?? null;
  const isDouble = scores[first] - scores[second] <= 2 && Boolean(pairKey);
  const key = isDouble ? pairKey : first;
  const relevantScore = isDouble ? scores[first] + scores[second] : scores[first];

  return {
    key,
    data: SPIRIT_ROOT_RESULT_DATA[key],
    quality: calculateQuality(relevantScore, totalScore),
    scores,
    totalScore,
  };
}

function getSpiritRootVisualClass(visual) {
  return `spirit-root-result--${String(visual ?? "neutral").replaceAll("-", " ").replaceAll(" ", "-")}`;
}

function renderQuestion(question, questionIndex) {
  const selectedAnswer = state.spiritRootAnswers[questionIndex];
  const progressValue = questionIndex + 1;
  const isFirstQuestion = questionIndex === 0;

  return `
    <div class="spirit-root-question-view">
      <div class="spirit-root-question-topline">
        <span>当前题号</span>
        <strong>${String(progressValue).padStart(2, "0")} / ${SPIRIT_ROOT_QUESTIONS.length}</strong>
      </div>
      <div class="spirit-root-progress-track" role="progressbar" aria-valuemin="1" aria-valuemax="${SPIRIT_ROOT_QUESTIONS.length}" aria-valuenow="${progressValue}" aria-label="灵根测试进度">
        <span style="width: ${(progressValue / SPIRIT_ROOT_QUESTIONS.length) * 100}%"></span>
      </div>
      <p class="spirit-root-question-index">第${progressValue}题</p>
      <h3 class="spirit-root-question">${escapeHtml(question.prompt)}</h3>
      <div class="spirit-root-options" role="group" aria-label="题目选项">
        ${question.options.map((option, optionIndex) => `
          <button type="button" class="spirit-root-option ${selectedAnswer === optionIndex ? "is-selected" : ""}" data-spirit-answer="${optionIndex}" ${state.spiritRootSelectedAnswer !== null ? "disabled" : ""}>
            <span class="spirit-root-option-letter">${String.fromCharCode(65 + optionIndex)}</span>
            <span>${escapeHtml(option.label)}</span>
          </button>
        `).join("")}
      </div>
      <button type="button" class="spirit-root-prev" data-spirit-prev ${isFirstQuestion ? "disabled" : ""} ${state.spiritRootSelectedAnswer !== null ? "disabled" : ""}>上一题</button>
    </div>
  `;
}

function showResult(result) {
  const data = result.data;
  const title = data.displayTitle ?? data.title;

  return `
    <div class="spirit-root-result-stage ${getSpiritRootVisualClass(data.visual)}">
      <div class="spirit-root-result-glow" aria-hidden="true"></div>
      <div class="spirit-root-result-layout">
        <figure class="spirit-root-result-art">
          <img src="${escapeHtml(data.image)}" alt="${escapeHtml(title)}灵纹" />
        </figure>
        <div class="spirit-root-result-copy">
          <p class="detail-code">灵根鉴定</p>
          <h3>${escapeHtml(title)}</h3>
          <p class="spirit-root-quality">品质：<strong>${escapeHtml(result.quality)}</strong></p>
          <blockquote>${escapeHtml(data.verdict)}</blockquote>
          <p class="spirit-root-result-intro">${escapeHtml(data.intro)}</p>
          <p class="spirit-root-practice"><span>推荐修行</span>${escapeHtml(data.practice)}</p>
          ${data.evaluation ? `<p class="spirit-root-evaluation">宗门评价：${escapeHtml(data.evaluation)}</p>` : ""}
          <button type="button" class="inline-action" data-restart-spirit-root>重新测灵</button>
        </div>
      </div>
    </div>
  `;
}

function getActiveLamp() {
  return SOUL_LAMPS.find((lamp) => lamp.id === state.activeLampId) ?? SOUL_LAMPS[6];
}

function getActiveHerbalRecord() {
  return (
    HERBAL_RECORDS.find((entry) => entry.id === state.activeHerbalRecordId) ??
    HERBAL_RECORDS[0]
  );
}

function openPanel(panelId, options = {}) {
  if (panelId === "mountain-map") {
    state.activePanel = null;
    state.mapDossierOpen = false;
    navigateToMountainMap();
    return;
  }

  state.activePanel = panelId;
  state.pendingPanelFocus = true;

  if (panelId === "disciples-archive") {
    state.activeDiscipleId = options.discipleId ?? state.activeDiscipleId;
    const disciple = getActiveDisciple();
    markClueViewed(disciple.clueKey);
  }

  if (panelId === "lost-and-found") {
    state.activeLostItemId = options.itemId ?? state.activeLostItemId;
    const item = getActiveLostItem();
    markClueViewed(item.clueKey);
  }

  if (panelId === "spirit-root-test") {
    window.clearTimeout(spiritRootAdvanceTimer);
    window.clearTimeout(spiritRootSenseTimer);
    spiritRootAdvanceTimer = null;
    spiritRootSenseTimer = null;
    state.spiritRootStarted = false;
    state.spiritRootQuestionIndex = 0;
    state.spiritRootAnswers = [];
    state.spiritRootPhase = "intro";
    state.spiritRootSelectedAnswer = null;
    state.spiritRootResult = null;
    state.spiritRootResultScores = null;
    markClueViewed("spirit-root:module");
  }

  if (panelId === "sutra-vault") {
    state.activeSutraTab = options.tab ?? state.activeSutraTab;
  }

  if (panelId === "soul-lantern-office") {
    state.activeLampId = options.lampId ?? state.activeLampId;
    state.soulLanternDoorOverlay = null;
    state.soulLanternDoorActiveSlot = null;
    state.soulLanternDoorMessage = "";
    if (state.lanternGateUnlocked) {
      const lamp = getActiveLamp();
      markClueViewed(lamp.clueKey);
    } else {
      state.lanternGateInput = [];
      state.lanternGateError = "";
    }
  }

  if (panelId === "herbal-records") {
    state.activeHerbalRecordId = options.recordId ?? state.activeHerbalRecordId;
    state.activeHerbalNoteId = options.noteId ?? state.activeHerbalNoteId;
  }
  render();
}

function openNewsPanel(newsId) {
  if (!homeNewsById.has(newsId)) {
    return;
  }

  const shouldReturnToCollection = state.activePanel === "home-news-collection";
  const collectionKind = shouldReturnToCollection ? state.activeNewsCollectionKind : null;
  state.activeNewsReturnPanel = shouldReturnToCollection ? "home-news-collection" : "home";
  state.activeNewsReturnScrollY = window.scrollY;
  state.activePanel = "home-news";
  state.activeNewsId = newsId;
  state.activeNewsCollectionKind = collectionKind;
  state.pendingPanelFocus = false;
  render();
}

function openNewsCollection(kind) {
  state.activePanel = "home-news-collection";
  state.activeNewsId = null;
  state.activeNewsCollectionKind = kind === "rumors" ? "rumors" : "news";
  state.activeNewsReturnPanel = null;
  state.activeNewsReturnScrollY = 0;
  state.pendingPanelFocus = false;
  render();
}

function closePanel() {
  if (!state.activePanel) {
    return;
  }

  window.clearTimeout(spiritRootAdvanceTimer);
  window.clearTimeout(spiritRootSenseTimer);
  spiritRootAdvanceTimer = null;
  spiritRootSenseTimer = null;

  if (state.activePanel === "home-news") {
    const returnToCollection = state.activeNewsReturnPanel === "home-news-collection";
    const returnScrollY = state.activeNewsReturnScrollY;
    state.activePanel = returnToCollection ? "home-news-collection" : null;
    state.activeNewsId = null;
    if (!returnToCollection) {
      state.activeNewsCollectionKind = null;
    }
    state.activeNewsReturnPanel = null;
    state.activeNewsReturnScrollY = 0;
    render();
    window.requestAnimationFrame(() => {
      window.scrollTo({ top: returnScrollY, left: 0, behavior: "auto" });
    });
    return;
  }

  state.activePanel = null;
  state.activeNewsId = null;
  state.activeNewsCollectionKind = null;
  state.activeNewsReturnPanel = null;
  state.activeNewsReturnScrollY = 0;
  state.hiddenDossierOpen = false;
  state.mapDossierOpen = false;
  state.soulLanternDoorOverlay = null;
  state.soulLanternDoorActiveSlot = null;
  state.soulLanternDoorMessage = "";
  render();
}

function openSectionOrPanel(sectionId, route) {
  if (sectionId === "mountain-map") {
    if (route.view !== "home") {
      navigateToMountainMap();
      return;
    }

    openPanel(sectionId);
    return;
  }

  if (PANEL_SECTION_IDS.has(sectionId)) {
    if (route.view !== "home") {
      state.pendingSection = sectionId;
      navigateHome();
      return;
    }

    openPanel(sectionId);
    return;
  }

  if (route.view !== "home") {
    state.pendingSection = sectionId;
    navigateHome();
    return;
  }

  scrollToSection(sectionId);
}

function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);

  if (!section) {
    return;
  }

  section.scrollIntoView({ behavior: "smooth", block: "start" });
}

function renderSearchPanel(compact = false) {
  if (!compact) {
    return `
      <section class="paper-panel search-panel">
        <div class="panel-heading">
          <h3>卷宗查阅</h3>
        </div>
        <form id="search-form" class="search-form" novalidate>
          <label class="sr-only" for="keyword-input">输入关键词查阅宗门记录</label>
          <input
            id="keyword-input"
            name="keyword"
            type="search"
            autocomplete="off"
            spellcheck="false"
            placeholder="输入关键词查阅宗门记录"
          />
          <button type="submit">搜索</button>
        </form>
        <p id="search-message" class="search-feedback ${state.messageType ? `is-${state.messageType}` : ""}">${escapeHtml(
          state.message
        )}</p>
        <p id="search-hint" class="search-hint">${
          state.failStreak >= 3 ? "也许该从公告里出现过的词开始。" : ""
        }</p>
      </section>
    `;
  }

  return `
    <section class="paper-panel search-panel archive-search-panel is-compact">
      <div class="archive-search-heading">
        <div>
          <h2>关键词查阅 <span class="archive-search-stamp" aria-hidden="true">查</span></h2>
          <p>输入公告或调查中出现过的词，查阅对应宗门记录。</p>
        </div>
        <span class="archive-search-guide"><span aria-hidden="true">▰</span> 检索指引</span>
      </div>
      <form id="search-form" class="search-form" novalidate>
        <label class="sr-only" for="keyword-input">输入关键词查阅宗门记录</label>
        <span class="archive-search-icon" aria-hidden="true"></span>
        <input
          id="keyword-input"
          name="keyword"
          type="search"
          autocomplete="off"
          spellcheck="false"
          placeholder="输入关键词查阅宗门记录"
        />
        <button type="submit">搜索</button>
      </form>
      <p id="search-message" class="search-feedback ${state.messageType ? `is-${state.messageType}` : ""}">${escapeHtml(
        state.message
      )}</p>
      <p id="search-hint" class="search-hint">${state.failStreak >= 3 ? "也许该从公告里出现过的词开始。" : ""}</p>
    </section>
  `;
}

function renderPanelFrame({ titleId, kicker, title, intro, body, panelClass = "" }) {
  return `
    <section class="archive-overlay investigation-overlay" data-overlay-backdrop>
      <div class="archive-panel paper-panel ${panelClass}" role="dialog" aria-modal="true" aria-labelledby="${escapeHtml(
        titleId
      )}">
        <div class="archive-header">
          <div class="archive-header-copy">
            <p class="panel-kicker">${escapeHtml(kicker)}</p>
            <h2 id="${escapeHtml(titleId)}">${escapeHtml(title)}</h2>
            <p class="archive-intro">${escapeHtml(intro)}</p>
          </div>
          <button type="button" class="archive-close" data-close-panel aria-label="关闭面板">×</button>
        </div>
        <div class="archive-body">
          ${body}
        </div>
      </div>
    </section>
  `;
}

function getNewsItem(newsId = state.activeNewsId) {
  return homeNewsById.get(newsId) ?? HOME_NEWS_ITEMS[0];
}

function getNewsLabel(item) {
  return item.label ?? item.type ?? "邸报";
}

function getNewsSummary(item) {
  return item.summary ?? item.text ?? "";
}

function renderNewsImage(item, className) {
  if (!item.image) {
    return "";
  }

  return `
    <figure class="${className}">
      <img src="${escapeHtml(item.image)}" alt="${escapeHtml(`${item.title}配图`)}" loading="lazy" />
    </figure>
  `;
}

function renderNewsDetailParagraph(entry) {
  if (typeof entry === "string") {
    return `<p>${formatNewsDetailText(entry)}</p>`;
  }

  if (entry && typeof entry === "object" && entry.type === "alert") {
    return `<p class="news-detail-alert">${escapeHtml(entry.text)}</p>`;
  }

  if (entry && typeof entry === "object" && entry.type === "note") {
    return `<p class="news-detail-note">${escapeHtml(entry.text)}</p>`;
  }

  return `<p>${escapeHtml(String(entry ?? ""))}</p>`;
}

function formatNewsDetailText(text) {
  return escapeHtml(text)
    .replaceAll("“微”", "“<strong class=\"news-detail-red-word\">微</strong>”")
    .replaceAll("沈师姐", "<strong class=\"news-detail-red-word\">沈师姐</strong>");
}

function renderNewsDetailPanel() {
  const item = getNewsItem();
  const source = item.source ?? item.label ?? "执事堂";
  const publishTime = item.issueTime ?? item.date ?? "九月初七";
  const titleClass = [
    "news-detail-title",
    item.id === "lead-wenxinling-ranking" ? "brush-title" : "",
    item.id === "lead-zhaowei-hall" ? "is-cinnabar-title" : "",
  ]
    .filter(Boolean)
    .join(" ");
  const body = `
    <div class="news-detail-shell">
      <aside class="news-detail-ribbon">
        <span>${escapeHtml(item.title)}</span>
      </aside>

      <article class="news-detail-page">
        <div class="news-detail-topmark">仙门邸报</div>
        <p class="news-detail-eyebrow">${escapeHtml(getNewsLabel(item))}</p>
        <h2 class="${titleClass}">${escapeHtml(item.title)}</h2>
        <div class="news-detail-meta">
          <span>发布：${escapeHtml(source)}</span>
          <span>时间：${escapeHtml(publishTime)}</span>
        </div>

        <div class="news-detail-summary">
          <p>${escapeHtml(getNewsSummary(item))}</p>
        </div>

        <div class="news-detail-content">
          ${(item.detail ?? [getNewsSummary(item)]).map(renderNewsDetailParagraph).join("")}
        </div>

        ${renderNewsImage(item, "news-detail-image")}

        ${item.extra ? `<p class="news-detail-extra">${escapeHtml(item.extra)}</p>` : ""}
      </article>
    </div>
  `;

  return renderPanelFrame({
    titleId: "home-news-detail-title",
    kicker: "仙门邸报",
    title: item.title,
    intro: getNewsSummary(item),
    body,
    panelClass: "news-detail-panel news-detail-sheet",
  });
}

function getNewsCollectionTitle(kind) {
  return kind === "rumors" ? "异闻快讯总览" : "要闻总览";
}

function getNewsCollectionIntro(kind) {
  return kind === "rumors"
    ? "异闻已折入此页。点开任一条目，可再看详情。"
    : "本旬要闻与要闻速递折叠于此。点开任一条目，可再看详情。";
}

const NEWS_COLLECTION_DATES = ["九月初九", "九月初八", "九月初七", "九月初六", "九月初五", "九月初四", "九月初三"];
const NEWS_COLLECTION_HEATS = [3568, 2891, 1827, 2410, 3176, 2098, 1884, 1607];

function renderNewsGlyph(kind) {
  if (kind === "fire") {
    return `
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M13.5 2.5c1.6 2.6 1.9 4.8 1 6.9-.6 1.4-1.6 2.1-2.5 3-.7.6-1.2 1.4-1.2 2.6 0 1.6 1.3 2.9 2.9 2.9 2 0 3.9-1.5 4.4-3.8.8.7 1.4 2 1.4 3.4 0 3.6-3.1 6.5-7.1 6.5S5.3 19.8 5.3 16c0-2.8 1.6-4.8 3.2-6.4.8-.8 1.7-1.7 2.2-2.9.4-1 .5-2.1.2-3.6 1.3 1 2.1 2.2 2.6 3.4Z" />
      </svg>
    `;
  }

  return `
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <circle cx="12" cy="12" r="8.4"></circle>
      <path d="M12 7.6v5l3 1.8"></path>
      <path d="M12 3.8v1.7"></path>
      <path d="M20.2 12h-1.7"></path>
      <path d="M5.5 12H3.8"></path>
      <path d="M18 6l-1.2 1.2"></path>
      <path d="M7.2 17.3 6 18.5"></path>
    </svg>
  `;
}

function getNewsDate(item, index, fallbackOffset = 0) {
  if (item.date) {
    return item.date;
  }

  return NEWS_COLLECTION_DATES[(index + fallbackOffset) % NEWS_COLLECTION_DATES.length];
}

function getNewsHeat(item, index, fallbackOffset = 0) {
  return item.heat ?? NEWS_COLLECTION_HEATS[(index + fallbackOffset) % NEWS_COLLECTION_HEATS.length];
}

function renderNewsCollectionItem(item, options = {}) {
  const label = getNewsLabel(item);
  const summary = getNewsSummary(item);

  if (options.kind === "rumor") {
    return `
      <button type="button" class="news-collection-item is-rumor" data-news-id="${escapeHtml(item.id)}">
        <span class="news-collection-icon">
          <img src="${escapeHtml(item.image ?? "./assets/items/炼丹炉.png")}" alt="" loading="lazy" />
        </span>
        <span class="news-collection-copy">
          <span class="news-collection-meta">
            <span class="news-collection-tag">${escapeHtml(label)}</span>
          </span>
          <strong>${escapeHtml(item.title)}</strong>
          <p>${escapeHtml(summary)}</p>
        </span>
      </button>
    `;
  }

  return `
    <button type="button" class="news-collection-item" data-news-id="${escapeHtml(item.id)}">
      <span class="news-collection-copy">
        <span class="news-collection-meta">
          <span class="news-collection-tag">${escapeHtml(label)}</span>
          ${item.date ? `<time>${escapeHtml(item.date)}</time>` : ""}
        </span>
        <strong>${escapeHtml(item.title)}</strong>
        <p>${escapeHtml(summary)}</p>
      </span>
    </button>
  `;
}

function renderNewsCollectionPanel() {
  const kind = state.activeNewsCollectionKind === "rumors" ? "rumors" : "news";
  const isRumorMode = kind === "rumors";
  const featureItem = isRumorMode ? HOME_NEWS_RUMORS[0] : HOME_NEWS_LEAD;
  const featureDate = getNewsDate(featureItem, 0, isRumorMode ? 4 : 0);
  const featureHeat = getNewsHeat(featureItem, 0, isRumorMode ? 3 : 0);
  const tabs = isRumorMode
    ? ["异闻快讯", "山门茶寮", "旧井残注", "夜巡杂谈"]
    : ["本旬要闻", "宗门通告", "宗门趣闻", "事务通告"];
  const centerItems = isRumorMode ? HOME_NEWS_RUMORS.slice(1, 5) : HOME_NEWS_LEADS.slice(1);
  const rankItems = isRumorMode ? HOME_NEWS_RUMORS.slice(0, 5) : HOME_NEWS_LEADS.slice(0, 5);
  const quickItems = isRumorMode ? HOME_NEWS_RUMORS.slice(0, 5) : HOME_NEWS_BRIEFS;

  const body = `
    <div class="news-overview-shell ${isRumorMode ? "is-rumor-mode" : "is-news-mode"}">
      <div class="news-overview-tabs" aria-hidden="true">
        ${tabs
          .map(
            (tab, index) => `
              <span class="news-overview-tab ${index === 0 ? "is-active" : ""}">${escapeHtml(tab)}</span>
            `,
          )
          .join("")}
      </div>

      <div class="news-overview-grid">
        <div class="news-main-column">
          <article class="news-feature-card">
            <span class="news-feature-label">${escapeHtml(getNewsLabel(featureItem))}</span>
            <h3>${escapeHtml(featureItem.title)}</h3>
            <p>${escapeHtml(getNewsSummary(featureItem))}</p>
            ${renderNewsImage(featureItem, "news-feature-image")}
            <div class="news-feature-meta">
              <span>${escapeHtml(featureDate)}</span>
              <span class="news-feature-heat">热度 ${escapeHtml(String(featureHeat))}</span>
            </div>
            <button type="button" class="news-feature-action" data-news-id="${escapeHtml(featureItem.id)}">查看详情</button>
          </article>

          <section class="news-stream-card" aria-label="中栏新闻">
            ${centerItems
              .map(
                (item, index) => `
                  <button type="button" class="news-stream-item" data-news-id="${escapeHtml(item.id)}">
                    <span class="news-stream-side">${escapeHtml(getNewsLabel(item))}</span>
                    <div class="news-stream-copy">
                      <strong>${escapeHtml(item.title)}</strong>
                      <p>${escapeHtml(getNewsSummary(item))}</p>
                      ${renderNewsImage(item, "news-stream-image")}
                      <span class="news-stream-footer">
                        <em>${escapeHtml(getNewsDate(item, index, 1))}</em>
                        <span>阅读 ${escapeHtml(String(getNewsHeat(item, index, 1)))}</span>
                      </span>
                    </div>
                  </button>
                `,
              )
              .join("")}
          </section>
        </div>

        <aside class="news-right-rail">
          <section class="news-rank-card" aria-label="热议榜">
            <h3>
              <span class="news-card-icon is-fire">${renderNewsGlyph("fire")}</span>
              热议榜
            </h3>
            <ol class="news-rank-list">
              ${rankItems
                .map(
                  (item, index) => `
                    <li>
                      <button type="button" class="news-rank-item" data-news-id="${escapeHtml(item.id)}">
                        <span class="news-rank-no" data-index="${index + 1}"></span>
                        <span class="news-rank-copy">
                          <strong>${escapeHtml(item.title)}</strong>
                        </span>
                        <span class="news-rank-heat">热度 ${escapeHtml(String(getNewsHeat(item, index)))}</span>
                      </button>
                    </li>
                  `,
                )
                .join("")}
            </ol>
          </section>

          <section class="news-quick-card" aria-label="快讯">
            <h3>
              <span class="news-card-icon is-clock">${renderNewsGlyph("clock")}</span>
              快讯
            </h3>
            <ul class="news-quick-list">
              ${quickItems
                .map(
                  (item, index) => `
                    <li>
                      <button type="button" class="news-quick-item" data-news-id="${escapeHtml(item.id)}">
                        <span class="news-quick-dot"></span>
                        <span class="news-quick-date">${escapeHtml(getNewsDate(item, index, 2))}</span>
                        <span class="news-quick-title">${escapeHtml(item.title)}</span>
                      </button>
                    </li>
                  `,
                )
                .join("")}
            </ul>
          </section>
        </aside>
      </div>
    </div>
  `;

  return renderPanelFrame({
    titleId: "home-news-collection-title",
    kicker: "仙门邸报",
    title: getNewsCollectionTitle(kind),
    intro: getNewsCollectionIntro(kind),
    body,
    panelClass: "news-collection-panel",
  });
}

function renderDisciplesPanel() {
  const body = `
    <div class="archive-list">
      ${DISCIPLES_ARCHIVE.map((disciple) => {
        const isActive = disciple.id === state.activeDiscipleId;
        const classes = [
          "disciple-entry",
          isActive ? "is-active" : "",
          disciple.removed ? "is-removed" : "",
          disciple.sealed ? "has-stamp" : "",
        ]
          .filter(Boolean)
          .join(" ");

        return `
          <article class="${classes}">
            ${disciple.sealed ? '<span class="disciple-stamp">已封存</span>' : ""}
            <button type="button" class="disciple-toggle" data-disciple-id="${escapeHtml(disciple.id)}" aria-expanded="${isActive ? "true" : "false"}">
              <span class="disciple-toggle-main">
                <span class="disciple-name">${escapeHtml(disciple.name)}</span>
                <span class="disciple-court">${escapeHtml(disciple.court)}</span>
              </span>
              <span class="disciple-toggle-side">
                <span>${disciple.removed ? "名籍已划去" : "卷宗在册"}</span>
                <span class="disciple-arrow">›</span>
              </span>
            </button>
            ${
              isActive
                ? `
                  <div class="disciple-detail">
                    <div class="disciple-portrait">
                      <img src="${escapeHtml(disciple.image)}" alt="${escapeHtml(disciple.name)}画像" loading="lazy" />
                    </div>
                    <div class="disciple-copy">
                      <p>${highlightCinnabarTerms(
                        disciple.summary,
                        disciple.id === "peizhaochuan-archive" ? ["青雾"] : [],
                      )}</p>
                      <p class="disciple-note">${escapeHtml(disciple.note)}</p>
                    </div>
                  </div>
                `
                : ""
            }
          </article>
        `;
      }).join("")}
    </div>
  `;

  return renderPanelFrame({
    titleId: "disciples-archive-title",
    kicker: "外门卷宗",
    title: "青岚宗外门弟子名录",
    intro:
      "本名录由外门事务处存档，载录本届问心岭试炼相关弟子。若名籍有误，请持身份玉牌至事务处核验。",
    body,
  });
}

function renderLostAndFoundPanel() {
  const activeItem = getActiveLostItem();

  const body = `
    <div class="module-shell">
      <div class="module-list">
        ${LOST_AND_FOUND.map(
          (item) => `
            <button type="button" class="module-card ${item.id === activeItem.id ? "is-active" : ""}" data-lost-item-id="${escapeHtml(
            item.id
          )}">
              <img src="${escapeHtml(item.image)}" alt="${escapeHtml(item.name)}" loading="lazy" />
              <span class="module-card-copy">
                <span class="module-card-topline">${escapeHtml(item.code)}</span>
                <strong>${highlightCinnabarTerms(item.name, item.id === "bronze-key" ? ["青铜钥"] : item.id === "paper-crane" ? ["破损纸鹤"] : [])}</strong>
                <span class="module-card-meta">拾得地点：${highlightCinnabarTerms(item.location, item.id === "bone-flute" ? ["青雾"] : [])}</span>
              </span>
            </button>
          `
        ).join("")}
      </div>
      <article class="module-detail">
        <div class="detail-header">
          <p class="detail-code">${escapeHtml(activeItem.code)}</p>
          <h3>${highlightCinnabarTerms(activeItem.name, activeItem.id === "bronze-key" ? ["青铜钥"] : activeItem.id === "paper-crane" ? ["破损纸鹤"] : [])}</h3>
          <p class="detail-meta">拾得地点：${highlightCinnabarTerms(activeItem.location, activeItem.id === "bone-flute" ? ["青雾"] : [])}</p>
        </div>
        <figure class="detail-figure">
          <img src="${escapeHtml(activeItem.image)}" alt="${escapeHtml(activeItem.name)}" loading="lazy" />
        </figure>
        <p class="detail-note">${highlightCinnabarTerms(activeItem.detail, activeItem.id === "bone-flute" ? ["青雾"] : activeItem.id === "identity-jade" ? ["若忘口令，便记旧井。"] : [])}</p>
        ${
          activeItem.id === "bronze-key"
            ? `
              <div class="detail-actions lost-item-actions">
                <button
                  type="button"
                  class="inline-action claim-action ${hasClaimedLostItem(activeItem.id) ? "is-claimed" : ""}"
                  data-claim-lost-item="${escapeHtml(activeItem.id)}"
                  ${hasClaimedLostItem(activeItem.id) ? "disabled" : ""}
                >
                  ${hasClaimedLostItem(activeItem.id) ? "已存入背包" : "认领"}
                </button>
              </div>
            `
            : ""
        }
      </article>
    </div>
  `;

  return renderPanelFrame({
    titleId: "lost-and-found-title",
    kicker: "封存物件",
    title: "失物招领册",
    intro: "拾得之物依号暂存。若欲核领，请先比对院舍、夜簿与旧卷。",
    body,
    panelClass: "panel-wide",
  });
}

function renderSpiritRootDynamic() {
  return `
    <div class="spirit-root-dynamic">
      ${
        state.spiritRootPhase === "sensing"
          ? `
              <div class="spirit-root-sensing" aria-live="polite">
                <p>测灵石感应中……</p>
                <span class="spirit-root-sensing-ring" aria-hidden="true"></span>
              </div>
            `
          : state.spiritRootPhase === "result" && state.spiritRootResult
            ? showResult(state.spiritRootResult)
            : `
                <div class="spirit-root-intro">
                  <p class="detail-code">外门事务处 · 临时复测台</p>
                  <h3>请将手掌置于测灵石前</h3>
                  <p>灵石只记录当下心念，不替弟子定下道途。</p>
                </div>
                <div class="spirit-root-orb" aria-hidden="true">
                  <img src="./assets/spirit-root/灵石.png" alt="" />
                </div>
                <div class="spirit-root-console">
                  ${
                    state.spiritRootPhase === "testing"
                      ? renderQuestion(SPIRIT_ROOT_QUESTIONS[state.spiritRootQuestionIndex], state.spiritRootQuestionIndex)
                      : `
                          <div class="spirit-root-progress-summary"><span>灵根复测</span><strong>10 / 10 题</strong></div>
                          <p class="spirit-root-status">测灵石尚未唤醒。复测共十问，答案只保留在本次测试中。</p>
                          <button type="button" class="inline-action spirit-root-start" data-start-spirit-root>开始复测</button>
                        `
                  }
                </div>
              `
      }
    </div>
  `;
}

function renderSpiritRootStage() {
  return `
    <div class="spirit-root-stage">
      <img class="spirit-root-backdrop" src="./assets/spirit-root/测灵根.png" alt="" aria-hidden="true" />
      ${renderSpiritRootDynamic()}
    </div>
  `;
}

function renderSpiritRootPanel() {
  const body = renderSpiritRootStage();

  return renderPanelFrame({
    titleId: "spirit-root-title",
    kicker: "灵根复测",
    title: "测灵根",
    intro: "十问定心，测灵石只记录最终选择；答案与属性分数不会对外显示。",
    body,
    panelClass: "panel-wide spirit-root-panel",
  });
}

function refreshSpiritRootStage() {
  const currentDynamic = document.querySelector(".spirit-root-dynamic");

  if (!currentDynamic) {
    render();
    return;
  }

  const template = document.createElement("template");
  template.innerHTML = renderSpiritRootDynamic().trim();
  currentDynamic.replaceWith(template.content.firstElementChild);
  bindSpiritRootEvents(document.querySelector(".spirit-root-stage"));
}

function bindSpiritRootEvents(root) {
  if (!root || root.dataset.eventsBound === "true") {
    return;
  }

  root.dataset.eventsBound = "true";
  root.addEventListener("click", (event) => {
    const target = event.target instanceof Element ? event.target : null;
    const startButton = target?.closest("[data-start-spirit-root]");
    const restartButton = target?.closest("[data-restart-spirit-root]");
    const answerButton = target?.closest("[data-spirit-answer]");
    const previousButton = target?.closest("[data-spirit-prev]");

    if (startButton) {
      state.spiritRootStarted = true;
      state.spiritRootQuestionIndex = 0;
      state.spiritRootAnswers = [];
      state.spiritRootPhase = "testing";
      state.spiritRootSelectedAnswer = null;
      refreshSpiritRootStage();
      return;
    }

    if (restartButton) {
      window.clearTimeout(spiritRootAdvanceTimer);
      window.clearTimeout(spiritRootSenseTimer);
      spiritRootAdvanceTimer = null;
      spiritRootSenseTimer = null;
      state.spiritRootStarted = false;
      state.spiritRootQuestionIndex = 0;
      state.spiritRootAnswers = [];
      state.spiritRootPhase = "intro";
      state.spiritRootSelectedAnswer = null;
      state.spiritRootResult = null;
      state.spiritRootResultScores = null;
      state.activePanel = null;
      navigateHome();
      return;
    }

    if (answerButton) {
      const answerIndex = Number.parseInt(answerButton.getAttribute("data-spirit-answer") ?? "", 10);

      if (!Number.isInteger(answerIndex) || state.spiritRootSelectedAnswer !== null) {
        return;
      }

      state.spiritRootAnswers[state.spiritRootQuestionIndex] = answerIndex;
      state.spiritRootSelectedAnswer = answerIndex;
      root.querySelectorAll("[data-spirit-answer]").forEach((button) => {
        button.disabled = true;
      });
      answerButton.classList.add("is-selected");

      spiritRootAdvanceTimer = window.setTimeout(() => {
        state.spiritRootSelectedAnswer = null;

        if (state.spiritRootQuestionIndex < SPIRIT_ROOT_QUESTIONS.length - 1) {
          state.spiritRootQuestionIndex += 1;
          refreshSpiritRootStage();
          spiritRootAdvanceTimer = null;
          return;
        }

        state.spiritRootPhase = "sensing";
        refreshSpiritRootStage();
        spiritRootSenseTimer = window.setTimeout(() => {
          state.spiritRootResult = calculateResult();
          state.spiritRootResultScores = state.spiritRootResult.scores;
          state.spiritRootPhase = "result";
          refreshSpiritRootStage();
          spiritRootSenseTimer = null;
        }, 1500);
        spiritRootAdvanceTimer = null;
      }, 180);
      return;
    }

    if (previousButton && state.spiritRootQuestionIndex > 0 && state.spiritRootSelectedAnswer === null) {
      state.spiritRootQuestionIndex -= 1;
      refreshSpiritRootStage();
    }
  });
}

function renderSutraVaultPanel() {
  const body = `
    <div class="folio-tabs">
      <button type="button" class="folio-tab ${state.activeSutraTab === "borrow-records" ? "is-active" : ""}" data-sutra-tab="borrow-records">借阅记录</button>
      <button type="button" class="folio-tab ${state.activeSutraTab === "forbidden-books" ? "is-active" : ""}" data-sutra-tab="forbidden-books">禁书目录</button>
    </div>
    ${
      state.activeSutraTab === "borrow-records"
        ? `
          <div class="book-list">
            ${SUTRA_BORROW_LOGS.map(
              (entry) => `
                <article class="book-line ${entry.alert ? "is-alert" : ""}">
                  <span>${escapeHtml(entry.date)}</span>
                  <strong class="book-person">
                    <span>${escapeHtml(entry.person)}</span>
                    <small>玉牒编号：${escapeHtml(entry.jadeId ?? "未录")}</small>
                  </strong>
                   <button type="button" class="text-link ${entry.emphasizeBook ? "is-emphasized-book" : ""}" ${
                    entry.keyword ? `data-search-keyword="${escapeHtml(entry.keyword)}"` : "disabled"
                  }>${escapeHtml(entry.book)}</button>
                  <em>${escapeHtml(entry.status)}</em>
                  ${entry.note ? `<p class="book-note">${escapeHtml(entry.note)}</p>` : ""}
                </article>
              `
            ).join("")}
          </div>
        `
        : ""
    }
    ${
      state.activeSutraTab === "forbidden-books"
        ? `
          <div class="chip-list">
            ${FORBIDDEN_BOOKS.map((book) => `<span class="book-chip">${escapeHtml(book)}</span>`).join("")}
          </div>
        `
        : ""
    }
  `;

  return renderPanelFrame({
    titleId: "sutra-vault-title",
    kicker: "旧卷索引",
    title: "藏经阁分册",
    intro: "旧卷可借阅，禁卷只可誊录。",
    body,
  });
}

function renderSoulLanternGate() {
  const enteredCode = state.lanternGateInput.join("");

  return `
    <section class="lantern-lock" aria-label="魂灯房轮盘门禁">
      <div class="lantern-lock-copy">
        <p class="detail-code">魂灯房门禁</p>
        <h3>轮盘锁闭，非执事不得擅入</h3>
        <p>请依次点击轮盘上的锁文。次序有误，门禁将重新归零。</p>
      </div>
      <div class="lantern-wheel-stage">
        <img src="${escapeHtml(SOUL_LANTERN_LOCK_IMAGE)}" alt="魂灯房轮盘锁" />
        ${SOUL_LANTERN_LOCK_SYMBOLS.map(
          (symbol) => `
            <button
              type="button"
              class="lantern-wheel-hotspot"
              data-lantern-lock-symbol="${escapeHtml(symbol.value)}"
              style="left: ${symbol.x}%; top: ${symbol.y}%;"
              aria-label="点击锁文${escapeHtml(symbol.value)}"
            ></button>
          `,
        ).join("")}
      </div>
      <div class="lantern-lock-status" aria-live="polite">
        <span>已输入锁文</span>
        <strong>${escapeHtml(enteredCode || "未有记录")}</strong>
        ${
          state.lanternGateError
            ? `<p class="lantern-lock-error">${escapeHtml(state.lanternGateError)}</p>`
            : ""
        }
      </div>
    </section>
  `;
}

function updateLanternGateStatus() {
  const status = document.querySelector(".lantern-lock-status");

  if (!status) {
    return;
  }

  const enteredCode = state.lanternGateInput.join("");
  status.innerHTML = `
    <span>已输入锁文</span>
    <strong>${escapeHtml(enteredCode || "未有记录")}</strong>
    ${
      state.lanternGateError
        ? `<p class="lantern-lock-error">${escapeHtml(state.lanternGateError)}</p>`
        : ""
    }
  `;
}

function renderCorruptedPage() {
  const corruptedLines = [
    "████㚯鍵軻 ꬁվնk口⃢ 蟬𰻝 ���烫屯?锟斤拷拵攫",
    "�ԙԗ 〤𰻞ꙝ�� ѭį??7gǁ ��Ѭԙ〥դѾ烫屯?〩",
    "���〥𰻞 霜界未明 / 魂名錯位 / ��� ०४७ ꙮꙮ",
  ];
  const corruptedCards = [
    "███ ���卷軸 / ѭį??7gǁ",
    "ꬁվնk口⃢ / 魂名錯位 / ���",
    "蟬𰻝 ���烫屯? / 锟斤拷攫",
    "�ԙԗ / 〤𰻞ꙝ�� / ꙮꙮ",
  ];

  return `
    <section class="corruption-site" role="alert" aria-live="assertive">
      <header class="site-header corruption-site-header">
        <div class="header-inner">
          <div class="brand-lockup" aria-hidden="true">
            <span class="brand-seal">���</span>
            <span class="brand-copy">
              <span class="brand-overline">████㚯鍵軻</span>
              <span class="brand-title">ꬁվնk口⃢ 事务处</span>
            </span>
          </div>
          <nav class="site-nav" aria-label="���">
            <span class="nav-link is-active">███</span>
            <span class="nav-link">ѭį??</span>
            <span class="nav-link">���</span>
            <span class="nav-link">𰻞ꙝ��</span>
            <span class="nav-link">锟斤拷</span>
          </nav>
        </div>
      </header>

      <main class="corruption-site-main">
        <section class="archive-search-panel corruption-search-panel">
          <p class="corruption-meta">卷宗状态：��� / 録号：Ѭԙԗ / ���</p>
          <h1>████㚯鍵軻 ꬁվնk口⃢</h1>
          <p>蟬𰻝 ���烫屯?锟斤拷拵攫 �ԙԗ 〤𰻞ꙝ��</p>
          <div class="corruption-search-fake" aria-hidden="true">
            <span>输入关键词查阅宗门记录 ���</span>
            <strong>〤</strong>
          </div>
        </section>

        <section class="corruption-site-grid" aria-label="���">
          ${corruptedCards
            .map(
              (title, index) => `
                <article class="paper-panel corruption-record-card">
                  <div class="corruption-image-frame corruption-eye-stage" data-eye-stage>
                    <img
                      class="corruption-eye-pupil"
                      src="${escapeHtml(CORRUPTION_EYE_PUPIL)}"
                      alt=""
                      aria-hidden="true"
                    />
                    <img
                      class="corruption-eye-shell"
                      src="${escapeHtml(CORRUPTION_EYE_SHELL)}"
                      alt=""
                      aria-hidden="true"
                    />
                  </div>
                  <div class="corruption-card-copy">
                    <p class="corruption-meta">${String(index + 1).padStart(2, "0")} / ��� / ����</p>
                    <h2>${escapeHtml(title)}</h2>
                    <p>${escapeHtml(corruptedLines[index % corruptedLines.length])}</p>
                  </div>
                </article>
              `,
            )
            .join("")}
        </section>

        <section class="paper-panel corruption-warning">
          <p class="corruption-kicker">${escapeHtml(CORRUPTION_ERROR_MESSAGE)}</p>
          <h2>��� 𰻞卷 / 锟斤拷失联</h2>
          ${corruptedLines.map((line) => `<p>${escapeHtml(line)}</p>`).join("")}
          <small>ERR_𰻞 / Ѭԙԗ / ���</small>
        </section>
      </main>
    </section>
  `;
}

function bindCorruptedEyeTracking() {
  const eyeStages = document.querySelectorAll("[data-eye-stage]");

  if (!eyeStages.length) {
    return;
  }

  const updatePupils = (event) => {
    eyeStages.forEach((stage) => {
      const rect = stage.getBoundingClientRect();

      if (!rect.width || !rect.height) {
        return;
      }

      const normalizedX = Math.max(
        -1,
        Math.min(1, (event.clientX - (rect.left + rect.width / 2)) / (rect.width / 2)),
      );
      const normalizedY = Math.max(
        -1,
        Math.min(1, (event.clientY - (rect.top + rect.height / 2)) / (rect.height / 2)),
      );
      const maxOffset = Math.min(16, rect.width * 0.08);

      stage.style.setProperty("--pupil-x", `${normalizedX * maxOffset}px`);
      stage.style.setProperty("--pupil-y", `${normalizedY * maxOffset}px`);
    });
  };

  document.addEventListener("mousemove", updatePupils, { passive: true });
  updatePupils({
    clientX: window.innerWidth / 2,
    clientY: window.innerHeight / 2,
  });
}

function activateCorruptionEffect() {
  state.corruptionActive = true;
  state.activePanel = null;
  state.lanternGateError = CORRUPTION_ERROR_MESSAGE;
  document.title = "████㚯鍵軻 | ���";
  render();
}

function renderSoulLanternDoorSymbol(symbolId) {
  const symbolPaths = {
    lantern: `
      <path d="M10 9h12l-1.5 15h-9z" />
      <path d="M12 9l2-4h4l2 4M16 9v15M12 28h8" />
    `,
    lotus: `
      <path d="M16 27c-1-8 1-14 0-19-5 4-7 9-5 14" />
      <path d="M16 27c1-8-1-14 0-19 5 4 7 9 5 14" />
      <path d="M16 27C10 26 6 22 6 16c5 1 8 4 10 11Z" />
      <path d="M16 27c6-1 10-5 10-11-5 1-8 4-10 11Z" />
    `,
    flame: `
      <path d="M17 3c2 6-3 8 1 12 2-2 3-4 3-7 5 5 7 10 4 15-2 4-6 6-10 6-6 0-10-4-10-10 0-5 4-8 7-12 0 4 1 7 3 9 1-4 1-8 2-13Z" />
    `,
    moon: `
      <path d="M22 5a11 11 0 1 0 5 19A12 12 0 0 1 22 5Z" />
    `,
  };

  return `
    <svg class="soul-door-symbol" viewBox="0 0 32 32" aria-hidden="true">
      ${symbolPaths[symbolId] ?? symbolPaths.moon}
    </svg>
  `;
}

function renderSoulLanternDoorOverlay() {
  if (!state.soulLanternDoorOverlay) {
    return "";
  }

  const isCodeOpen = state.soulLanternDoorOverlay === "code";
  const isShrineOpen = state.soulLanternDoorOverlay === "shrine";
  const activeSlot = state.soulLanternDoorActiveSlot;

  return `
    <div class="soul-door-overlay" data-soul-door-overlay>
      <section
        class="soul-door-dialog${isShrineOpen ? " is-shrine-open" : isCodeOpen ? " is-code-open" : " is-lock-open"}"
        role="dialog"
        aria-modal="true"
        aria-label="${isShrineOpen ? "无名龛" : "魂灯房内门机关"}"
      >
        <button type="button" class="soul-door-close" data-close-soul-door aria-label="关闭内门机关">×</button>
        ${
          isShrineOpen
            ? renderSoulLanternNamelessShrine()
            : isCodeOpen
            ? `
              <div class="soul-door-code-panel">
                <p class="soul-door-code-kicker">内门符锁</p>
                <h3>依次嵌入三枚锁纹</h3>
                <div class="soul-door-symbol-slots" role="group" aria-label="三格符纹密码">
                  ${state.soulLanternDoorCode
                    .map(
                      (symbolId, index) => `
                        <button
                          type="button"
                          class="soul-door-symbol-slot${activeSlot === index ? " is-active" : ""}${symbolId ? " is-filled" : ""}"
                          data-soul-door-slot="${index}"
                          aria-label="选择第${index + 1}格符纹"
                        >
                          ${symbolId ? renderSoulLanternDoorSymbol(symbolId) : `<span>${index + 1}</span>`}
                        </button>
                      `,
                    )
                    .join("")}
                </div>
                <div class="soul-door-code-controls">
                  <p class="soul-door-code-hint${activeSlot === null ? "" : " is-hidden"}">
                    点击任意方框，再从四枚符纹中选择。
                  </p>
                  <div
                    class="soul-door-symbol-palette${activeSlot === null ? " is-inactive" : ""}"
                    role="list"
                    aria-label="可选符纹"
                    aria-hidden="${activeSlot === null ? "true" : "false"}"
                  >
                    ${SOUL_LANTERN_DOOR_SYMBOLS.map(
                      (symbol) => `
                        <button
                          type="button"
                          class="soul-door-symbol-choice"
                          data-soul-door-symbol="${symbol.id}"
                          aria-label="选择${symbol.label}纹"
                          title="${symbol.label}纹"
                          tabindex="${activeSlot === null ? "-1" : "0"}"
                        >
                          ${renderSoulLanternDoorSymbol(symbol.id)}
                        </button>
                      `,
                    ).join("")}
                  </div>
                </div>
                <p
                  class="soul-door-code-message${state.soulLanternDoorUnlocked ? " is-success" : ""}"
                  aria-live="polite"
                >${escapeHtml(state.soulLanternDoorMessage)}</p>
              </div>
            `
            : `
              <button
                type="button"
                class="soul-door-lock-image"
                data-open-soul-door-code
                aria-label="查看锁面符纹"
              >
                <img src="${escapeHtml(SOUL_LANTERN_DOOR_LOCK_IMAGE)}" alt="魂灯房内门三纹锁" />
              </button>
            `
        }
      </section>
      ${renderSoulLanternArchiveOverlay()}
    </div>
  `;
}

function renderSoulLanternNamelessShrine() {
  return `
    <figure class="soul-door-shrine-view" data-soul-door-shrine>
      <img
        src="${escapeHtml(SOUL_LANTERN_NAMELESS_SHRINE_IMAGE)}"
        alt="无名龛内景"
      />
      <div class="soul-lantern-archive-hotspots" aria-label="无名龛魂灯档案">
        ${SOUL_LANTERN_ARCHIVES.map(
          (archive) => `
            <button
              type="button"
              class="soul-lantern-archive-hotspot"
              data-soul-lantern-archive="${escapeHtml(archive.id)}"
              aria-label="查看${escapeHtml(archive.name)}魂灯档案"
            ></button>
          `,
        ).join("")}
      </div>
    </figure>
  `;
}

function renderSoulLanternArchiveOverlay() {
  const archive = SOUL_LANTERN_ARCHIVES.find(
    (entry) => entry.id === state.activeSoulLanternArchiveId,
  );

  if (!archive) {
    return "";
  }

  return `
    <div class="soul-lantern-archive-overlay" data-soul-lantern-archive-overlay>
      <article
        class="soul-lantern-archive-sheet"
        role="dialog"
        aria-modal="true"
        aria-labelledby="soul-lantern-archive-title"
        style="--soul-archive-background: url('${escapeHtml(SOUL_LANTERN_ARCHIVE_BACKGROUND)}')"
      >
        <button
          type="button"
          class="soul-lantern-archive-close"
          data-close-soul-lantern-archive
          aria-label="关闭${escapeHtml(archive.name)}魂灯档案"
        >×</button>
        <div class="soul-lantern-archive-content">
          ${archive.portrait ? `<img class="soul-lantern-archive-portrait" src="${escapeHtml(archive.portrait)}" alt="${escapeHtml(archive.name)}证件照" />` : ""}
          <p class="soul-lantern-archive-kicker">魂灯房封存灯籍</p>
          <h3 id="soul-lantern-archive-title">${escapeHtml(archive.name)}魂灯档案</h3>
          <div class="soul-lantern-archive-rule" aria-hidden="true"></div>
          <dl class="soul-lantern-archive-fields">
            <div><dt>灯主</dt><dd>${escapeHtml(archive.name)}</dd></div>
            <div><dt>灯位</dt><dd>${escapeHtml(archive.lampPosition)}</dd></div>
            <div><dt>身份</dt><dd>${escapeHtml(archive.identity)}</dd></div>
            <div><dt>灯况</dt><dd>${escapeHtml(archive.status)}</dd></div>
          </dl>
          <section class="soul-lantern-archive-record">
            <h4>迁录记</h4>
            <p>${escapeHtml(archive.record)}</p>
          </section>
          <blockquote>${escapeHtml(archive.note)}</blockquote>
          <p class="soul-lantern-archive-seal">无名龛 · 内阅</p>
        </div>
      </article>
    </div>
  `;
}

function revealSoulLanternNamelessShrine() {
  const dialog = document.querySelector(".soul-door-dialog");
  const codePanel = dialog?.querySelector(".soul-door-code-panel");

  state.soulLanternDoorOverlay = "shrine";

  if (!dialog || !codePanel) {
    render();
    return;
  }

  dialog.classList.remove("is-code-open", "is-lock-open");
  dialog.classList.add("is-shrine-open");
  dialog.setAttribute("aria-label", "无名龛");
  codePanel.hidden = true;

  if (!dialog.querySelector("[data-soul-door-shrine]")) {
    dialog.insertAdjacentHTML("beforeend", renderSoulLanternNamelessShrine());
  }
}

function updateSoulLanternDoorCodeView() {
  document.querySelectorAll("[data-soul-door-slot]").forEach((button, index) => {
    const symbolId = state.soulLanternDoorCode[index];
    button.classList.toggle("is-active", state.soulLanternDoorActiveSlot === index);
    button.classList.toggle("is-filled", Boolean(symbolId));
    button.innerHTML = symbolId
      ? renderSoulLanternDoorSymbol(symbolId)
      : `<span>${index + 1}</span>`;
  });

  const hint = document.querySelector(".soul-door-code-hint");
  const palette = document.querySelector(".soul-door-symbol-palette");
  const hasActiveSlot = state.soulLanternDoorActiveSlot !== null;

  if (hint) {
    hint.classList.toggle("is-hidden", hasActiveSlot);
  }

  if (palette) {
    palette.classList.toggle("is-inactive", !hasActiveSlot);
    palette.setAttribute("aria-hidden", String(!hasActiveSlot));
    palette.querySelectorAll("[data-soul-door-symbol]").forEach((button) => {
      button.setAttribute("tabindex", hasActiveSlot ? "0" : "-1");
    });
  }

  const message = document.querySelector(".soul-door-code-message");

  if (message) {
    message.textContent = state.soulLanternDoorMessage;
    message.classList.toggle("is-success", state.soulLanternDoorUnlocked);
  }
}

function selectSoulLanternDoorSymbol(symbolId) {
  const activeSlot = state.soulLanternDoorActiveSlot;

  if (
    activeSlot === null ||
    !SOUL_LANTERN_DOOR_SYMBOLS.some((symbol) => symbol.id === symbolId)
  ) {
    return;
  }

  state.soulLanternDoorCode[activeSlot] = symbolId;
  state.soulLanternDoorMessage = "";
  state.soulLanternDoorUnlocked = false;

  const nextEmptySlot = state.soulLanternDoorCode.findIndex(
    (value, index) => value === null && index > activeSlot,
  );
  const firstEmptySlot = state.soulLanternDoorCode.findIndex((value) => value === null);
  state.soulLanternDoorActiveSlot = nextEmptySlot >= 0 ? nextEmptySlot : firstEmptySlot;

  if (state.soulLanternDoorCode.every(Boolean)) {
    const isCorrect = state.soulLanternDoorCode.every(
      (value, index) => value === SOUL_LANTERN_DOOR_CODE[index],
    );

    state.soulLanternDoorUnlocked = isCorrect;
    state.soulLanternDoorMessage = isCorrect ? "密码正常" : "机关未响应，符序有误。";
    state.soulLanternDoorActiveSlot = isCorrect ? null : activeSlot;
    updateSoulLanternDoorCodeView();

    if (isCorrect) {
      showToast("密码正常");
      revealSoulLanternNamelessShrine();
    }
    return;
  }

  updateSoulLanternDoorCodeView();
}

function renderSoulLanternPanel() {
  if (!state.lanternGateUnlocked) {
    return renderPanelFrame({
      titleId: "soul-lantern-title",
      kicker: "灯册重誊",
      title: "魂灯房",
      body: renderSoulLanternGate(),
      panelClass: "soul-lantern-lock-panel",
    });
  }

  const body = `
        <div class="soul-lantern-room-stage">
          <figure class="soul-lantern-room-view">
            <img src="./assets/records/soul-lantern-room.png" alt="魂灯房内景" />
          </figure>
          <button
            type="button"
            class="soul-lantern-door-hotspot"
            data-open-soul-door
            aria-label="查看魂灯房左侧木门"
          ></button>
        </div>
        ${renderSoulLanternDoorOverlay()}
      `;

  return renderPanelFrame({
    titleId: "soul-lantern-title",
    kicker: "灯册重誊",
    title: "魂灯房",
    body,
    panelClass: "soul-lantern-room-panel",
  });
}

function handleLanternLockSelection(symbol) {
  state.lanternGateInput.push(symbol);
  state.lanternGateError = "";

  if (state.lanternGateInput.length < SOUL_LANTERN_LOCK_CODE.length) {
    updateLanternGateStatus();
    return;
  }

  const enteredCode = state.lanternGateInput.join("");
  const expectedCode = SOUL_LANTERN_LOCK_CODE.join("");

  if (enteredCode !== expectedCode) {
    state.lanternGateInput = [];
    state.lanternGateError = CORRUPTION_ERROR_MESSAGE;
    activateCorruptionEffect();
    return;
  }

  state.lanternGateUnlocked = true;
  localStorage.setItem(SOUL_LANTERN_GATE_UNLOCKED_STORAGE_KEY, "true");
  state.lanternGateInput = [];
  markClueViewed(getActiveLamp().clueKey);
  showToast("门禁已解，魂灯房暂许入内。");
  render();
}

function renderHerbalRecordsPanel() {
  const activeRecord = getActiveHerbalRecord();
  const isOuterLedgerActive = state.activeHerbalNoteId === "outer-ledger";
  const activeNote = isOuterLedgerActive
    ? ""
    : state.activeHerbalNoteId === "medicine"
      ? activeRecord.medicineNote
      : state.activeHerbalNoteId === "person"
        ? activeRecord.personNote
        : activeRecord.personNote;

  const detailMarkup = isOuterLedgerActive
    ? `
      <article class="module-detail is-inline">
        <p class="detail-code">${escapeHtml(HERBAL_OUTER_LEDGER.title)}</p>
        <div class="herbal-outer-ledger-list">
          ${HERBAL_OUTER_LEDGER.entries.map(
            (entry) => `
              <section class="herbal-outer-ledger-entry">
                <div class="map-dossier-head">
                  <h3 class="${entry.alertName ? "text-alert" : ""}">${escapeHtml(entry.subject)}</h3>
                </div>
                <dl class="map-dossier-meta">
                  ${entry.fields.map(
                    (field) => `
                      <div>
                        <dt>${escapeHtml(field.label)}</dt>
                        <dd>${escapeHtml(field.value)}</dd>
                      </div>
                    `
                  ).join("")}
                </dl>
              </section>
            `
          ).join("")}
        </div>
      </article>
    `
    : activeNote
      ? `
        <article class="module-detail is-inline">
          <h3>${escapeHtml(activeRecord.person)} · ${escapeHtml(activeRecord.medicine)}</h3>
          <p class="detail-note">${escapeHtml(activeNote)}</p>
        </article>
      `
      : "";

  const body = `
    <div class="table-shell">
      <table class="herbal-table">
        <thead>
          <tr>
            <th>日期</th>
            <th>弟子</th>
            <th>药方</th>
            <th>批症</th>
          </tr>
        </thead>
        <tbody>
          ${HERBAL_RECORDS.map(
            (entry) => `
              <tr class="${entry.id === activeRecord.id && !isOuterLedgerActive ? "is-active" : ""}">
                <td>${escapeHtml(entry.date)}</td>
                <td><button type="button" class="text-link" data-herbal-record-id="${escapeHtml(
                  entry.id
                )}" data-herbal-note-id="person">${escapeHtml(entry.person)}</button></td>
                <td><button type="button" class="text-link" data-herbal-record-id="${escapeHtml(
                  entry.id
                )}" data-herbal-note-id="medicine">${entry.medicine === "忘尘散" ? `<span class="text-alert">${escapeHtml(entry.medicine)}</span>` : escapeHtml(entry.medicine)}</button></td>
                <td>${escapeHtml(entry.symptom)}</td>
              </tr>
            `
          ).join("")}
        </tbody>
      </table>
    </div>
    <div class="detail-actions">
      <button type="button" class="inline-action ${isOuterLedgerActive ? "is-alert" : ""}" data-open-herbal-ledger>
        查看药堂外账
      </button>
    </div>
    ${detailMarkup}
  `;

  return renderPanelFrame({
    titleId: "herbal-records-title",
    kicker: "药案摘录",
    title: "药堂记录",
    intro: "药案只记病与药，不代人作证。可若多人都在同一时节忘了名，就不能只当寻常病看。",
    body,
  });
}

function renderMapDossier() {
  return `
    <article class="map-dossier-card">
      <div class="map-dossier-head">
        <p class="detail-code">卷宗编号：HT-031</p>
        <h3>卷宗名称：归墟井</h3>
      </div>
      <dl class="map-dossier-meta">
        <div>
          <dt>卷宗来源</dt>
          <dd>后山旧图、魂灯房残档、藏经阁禁卷合参</dd>
        </div>
        <div>
          <dt>封存等级</dt>
          <dd><span class="text-alert">禁阅</span></dd>
        </div>
        <div>
          <dt>开启条件</dt>
          <dd>旧井点位已显现</dd>
        </div>
      </dl>
      <div class="map-dossier-body">
        <p>归墟井，旧称“回魂井”。</p>
        <p>
          青岚宗立宗之前，此井便已在后山。旧图载其位于问心岭阴面，井口常年不见日光，霜降前后有青雾自井中上涌。初代宗主曾命人以镇石封井，并立禁令：
        </p>
        <p>凡外门弟子，不得近井。</p>
        <p>凡夜间闻井中呼名者，<span class="text-alert">不得应</span>。</p>
        <p>
          后因山道改修，归墟井自地图中抹去，改记为“旧井”。近二十年来，宗门公开卷宗中再无此名。
        </p>
      </div>
    </article>
  `;
}

function renderMountainMapPage() {
  const oldWellUnlocked = hasUnlockedOldWell();
  const remaining = Math.max(0, 3 - revealCountForOldWell());
  const mapSrc = oldWellUnlocked ? MOUNTAIN_MAP_IMAGES.revealed : MOUNTAIN_MAP_IMAGES.base;

  return `
    <section class="record-shell map-route-shell">
      <article class="paper-panel record-header map-route-header">
        <p class="hero-overline">旧图查验 · 山门暗点</p>
        <h1>山门地图</h1>
        <div class="record-meta">
          <span>当前图册：${oldWellUnlocked ? "地图二" : "地图一"}</span>
          <span>旧井显现：${oldWellUnlocked ? "已显" : `尚缺 ${remaining} 条线索`}</span>
        </div>
        ${renderSearchPanel(true)}
      </article>

      <article class="paper-panel map-route-panel">
        <div class="panel-heading">
          <p class="panel-kicker">旧图残注</p>
          <h2>山门总图对照</h2>
        </div>
        <div class="map-route-grid">
          <figure class="record-figure map-route-figure">
            <div class="map-route-stage">
              <img src="${escapeHtml(mapSrc)}" alt="青岚宗山门地图" loading="lazy" />
            </div>
            <figcaption>
              ${
                oldWellUnlocked
                  ? "地图二已显出旧井点位。"
                  : "地图一仍无旧井。需先比对青铜钥、灵根复测、第七灯、无名龛、旧灯芯中的任意三条线索。"
              }
            </figcaption>
          </figure>

          <div class="map-route-side">
            ${
              oldWellUnlocked
                ? `
                  <div class="map-route-note">
                    <p>旧井点位已显现，查看残注与封存卷宗。</p>
                    <p class="detail-note">旧图残注：此处旧名归墟井。</p>
                    <div class="detail-actions">
                      <button type="button" class="inline-action is-alert" data-open-map-dossier>“归墟井”隐藏卷宗</button>
                    </div>
                  </div>
                `
                : `
                  <div class="map-route-note">
                    <p>地图二尚未显现。</p>
                    <strong>还需再比对 ${remaining} 条线索：青铜钥、灵根复测、第七灯、无名龛、旧灯芯。</strong>
                  </div>
                `
            }
            ${state.mapDossierOpen ? renderMapDossier() : ""}
          </div>
        </div>
      </article>
    </section>
  `;
}

function renderActivePanel() {
  if (!state.activePanel) {
    return "";
  }

  if (state.activePanel === "disciples-archive") {
    return renderDisciplesPanel();
  }

  if (state.activePanel === "lost-and-found") {
    return renderLostAndFoundPanel();
  }

  if (state.activePanel === "spirit-root-test") {
    return renderSpiritRootPanel();
  }

  if (state.activePanel === "sutra-vault") {
    return renderSutraVaultPanel();
  }

  if (state.activePanel === "soul-lantern-office") {
    return renderSoulLanternPanel();
  }

  if (state.activePanel === "herbal-records") {
    return renderHerbalRecordsPanel();
  }

  if (state.activePanel === "home-news") {
    return renderNewsDetailPanel();
  }

  if (state.activePanel === "home-news-collection") {
    return renderNewsCollectionPanel();
  }

  return "";
}

function renderHome() {
  return `
    <section class="hero-grid">
      <article class="paper-panel hero-card">
        <div class="hero-intro">
          <p class="hero-overline">青灯未归 · 外门隐录</p>
          <h1>青岚宗外门事务处</h1>
        </div>
        ${renderSearchPanel()}
      </article>

      <aside class="paper-panel protocol-card">
        <div class="panel-heading">
          <p class="panel-kicker">调卷须知</p>
          <h2>今日执事批注</h2>
        </div>
        <ul class="protocol-list">
          <li>魂灯房卷档修缮中，非执事弟子暂不得入内。</li>
          <li>凡涉除名弟子记录，需比对名录、院舍、遗物与药案四册。</li>
          <li>外门弟子入山后，灵根复测与魂灯记录需分册保存。</li>
        </ul>
      </aside>
    </section>

    <section class="content-grid">
      <article id="notice-board" class="paper-panel notice-card">
        <div class="panel-heading">
          <p class="panel-kicker">首页公告</p>
          <h2>宗门公告</h2>
        </div>
        <p class="notice-text">${escapeHtml(HOME_ANNOUNCEMENT)}</p>
      </article>

      <aside class="paper-panel watch-card">
        <img src="./assets/images/ad-banner.png" alt="本旬记要" class="watch-card-image" />
      </aside>
    </section>

    <section class="paper-panel sect-news" aria-labelledby="sect-news-title">
      <div class="sect-news-heading">
        <p class="panel-kicker">仙门邸报</p>
        <h2 id="sect-news-title">仙门邸报</h2>
        <p>本旬要闻</p>
      </div>

      <div class="sect-news-grid">
        <article class="sect-news-lead">
          <div class="sect-news-lead-main">
            <span class="sect-news-label">${escapeHtml(HOME_NEWS_LEAD.label)}</span>
            <h3>${escapeHtml(HOME_NEWS_LEAD.title)}</h3>
            <p>${escapeHtml(HOME_NEWS_LEAD.summary)}</p>
            ${renderNewsImage(HOME_NEWS_LEAD, "sect-news-image sect-news-lead-image")}
            <button type="button" class="sect-news-action" data-news-id="${escapeHtml(HOME_NEWS_LEAD.id)}">查看详情</button>
          </div>
        </article>

        <article class="sect-news-list" aria-label="要闻速递">
          <h3>要闻速递</h3>
          <div class="sect-news-lines">
            ${HOME_NEWS_BRIEFS.slice(0, 4).map(
              (item) => `
                <button type="button" class="sect-news-line" data-news-id="${escapeHtml(item.id)}">
                  <span class="sect-news-type">${escapeHtml(item.type)}</span>
                  <strong>${escapeHtml(item.title)}</strong>
                  <time>${escapeHtml(item.date)}</time>
                </button>
              `
            ).join("")}
          </div>
          <button type="button" class="sect-news-more" data-open-news-collection="news">查看全部要闻</button>
        </article>

        <aside class="sect-news-rumors" aria-label="异闻快讯">
          <h3>异闻快讯</h3>
          <div class="sect-rumor-list">
            ${HOME_NEWS_RUMORS.slice(0, 3).map(
              (item) => `
                <button type="button" class="sect-rumor-item" data-news-id="${escapeHtml(item.id)}">
                  <span class="sect-rumor-icon">
                    <img src="${escapeHtml(item.image)}" alt="" loading="lazy" />
                  </span>
                  <div>
                    <strong>${escapeHtml(item.title)}</strong>
                    <p>${escapeHtml(item.text)}</p>
                  </div>
                </button>
              `
            ).join("")}
          </div>
          <button type="button" class="sect-news-more" data-open-news-collection="rumors">查看更多异闻</button>
        </aside>
      </div>
    </section>

    <section class="directory-section">
      <div class="section-title">
        <p class="panel-kicker">事务索引</p>
        <h2>宗门分册</h2>
      </div>
      <div class="directory-grid">
        ${HOME_DEPARTMENTS.map((item) => {
          const standaloneHref = STANDALONE_PAGE_LINKS[item.id];

          return `
            <${standaloneHref ? "a" : "article"}
              id="${escapeHtml(item.id)}"
              class="paper-panel directory-card"
              ${
                standaloneHref
                  ? `href="${escapeHtml(
                      standaloneHref
                    )}" target="_blank" rel="noopener noreferrer" data-standalone-link`
                  : ""
              }
            >
              <div class="directory-badge directory-avatar">
                <img
                  src="${escapeHtml(item.image)}"
                  alt="${escapeHtml(item.title)}"
                  width="320"
                  height="320"
                  loading="lazy"
                />
              </div>
              <div class="directory-copy">
                <h3>${escapeHtml(item.title)}</h3>
                <p>${escapeHtml(item.description)}</p>
                <span>${escapeHtml(item.tag)}</span>
              </div>
            </${standaloneHref ? "a" : "article"}>
          `;
        }).join("")}
      </div>
    </section>
    ${renderActivePanel()}
  `;
}

function renderRecord(page) {
  const recordParagraphs = page.content
    .map((paragraph) => {
      if (typeof paragraph === "string") {
        return `<p>${escapeHtml(paragraph)}</p>`;
      }

      if (paragraph && typeof paragraph === "object" && paragraph.type === "alert") {
        return `<p class="record-paragraph is-alert">${escapeHtml(paragraph.text)}</p>`;
      }

      if (paragraph && typeof paragraph === "object" && paragraph.type === "highlight") {
        return `<p>${escapeHtml(paragraph.before)}<span class="text-alert">${escapeHtml(paragraph.text)}</span>${escapeHtml(paragraph.after)}</p>`;
      }

      if (paragraph && typeof paragraph === "object" && paragraph.type === "selection-hidden") {
        return `<p class="record-paragraph record-selection-secret" title="拖动选中此行查看">${escapeHtml(paragraph.text)}</p>`;
      }

      if (paragraph && typeof paragraph === "object" && paragraph.type === "keyword-link") {
        return `<p class="record-paragraph record-keyword-link-wrap"><button type="button" class="inline-action is-alert" data-search-keyword="${escapeHtml(paragraph.keyword)}">${escapeHtml(paragraph.label)}</button></p>`;
      }

      return `<p>${escapeHtml(String(paragraph ?? ""))}</p>`;
    })
    .join("");

  return `
    <section class="record-shell">
      ${renderSearchPanel(true)}

      <article class="paper-panel record-body archive-record-sheet">
        <div class="archive-record-ribbon" aria-hidden="true">卷宗内容</div>
        <div class="archive-record-main">
          <header class="archive-record-heading">
            <div class="archive-record-title">
              <p>卷宗标题</p>
              <h1>${escapeHtml(page.title)}</h1>
            </div>
            <div class="record-meta archive-record-meta">
              <span>卷宗类别：隐录</span>
              <span>记录序号：${formatCount(page.pageNumber)} / ${TOTAL_PAGE_COUNT}</span>
              <span>检索词：${escapeHtml(page.keyword)}</span>
            </div>
            <span class="archive-record-status">已存档</span>
          </header>
          <div class="archive-record-rule" aria-hidden="true"></div>
        </div>
        <div class="record-content-grid archive-record-content ${page.media ? "has-media" : ""}">
          ${
            page.media
              ? `
                <div class="record-media">
                  <figure class="record-figure ${page.media.fit === "contain" ? "is-contain" : ""}">
                    <button
                      type="button"
                      class="record-image-button"
                      data-preview-image
                      data-image-src="${escapeHtml(page.media.src)}"
                      data-image-alt="${escapeHtml(page.media.alt)}"
                      data-image-caption="${escapeHtml(page.media.caption)}"
                      aria-label="放大查看：${escapeHtml(page.media.alt)}"
                    >
                      <img src="${escapeHtml(page.media.src)}" alt="${escapeHtml(page.media.alt)}" loading="lazy" />
                      <span class="record-image-zoom-label">点击放大</span>
                    </button>
                    <figcaption>${escapeHtml(page.media.caption)}</figcaption>
                  </figure>
                </div>
              `
              : ""
          }
          <div class="record-paragraphs">
            ${recordParagraphs}
            ${
              page.id === "jiangyunxiu"
                ? '<p class="jiang-yunxiu-reveal" data-jiang-yunxiu-reveal aria-live="polite" hidden></p>'
                : ""
            }
          </div>
        </div>
        <footer class="archive-record-footer">
          <span>卷宗编号：QL-WM-${String(page.pageNumber).padStart(3, "0")}</span>
          <span>保密等级：内阅</span>
        </footer>
      </article>
    </section>
  `;
}

function scheduleJiangYunxiuReveal(page) {
  if (jiangYunxiuRevealTimer) {
    window.clearTimeout(jiangYunxiuRevealTimer);
    jiangYunxiuRevealTimer = null;
  }

  if (jiangYunxiuTypingTimer) {
    window.clearTimeout(jiangYunxiuTypingTimer);
    jiangYunxiuTypingTimer = null;
  }

  if (page?.id !== "jiangyunxiu" || !page.media?.alternateSrc) {
    return;
  }

  const alternateImage = new Image();
  alternateImage.src = page.media.alternateSrc;

  jiangYunxiuRevealTimer = window.setTimeout(() => {
    jiangYunxiuRevealTimer = null;

    const route = getCurrentRoute();

    if (route.view !== "record" || route.pageId !== page.id) {
      return;
    }

    const revealText = document.querySelector("[data-jiang-yunxiu-reveal]");
    const imageButton = document.querySelector(".record-image-button[data-preview-image]");
    const recordImage = imageButton?.querySelector("img");

    if (revealText) {
      revealText.hidden = false;
      revealText.textContent = "";
      revealText.classList.add("is-typing");

      const message = "我已经找到你了。";
      const characterDelay = 750;
      let characterIndex = 0;
      const typeNextCharacter = () => {
        const currentRoute = getCurrentRoute();

        if (currentRoute.view !== "record" || currentRoute.pageId !== page.id) {
          jiangYunxiuTypingTimer = null;
          return;
        }

        revealText.textContent += message[characterIndex];
        characterIndex += 1;

        if (characterIndex < message.length) {
          jiangYunxiuTypingTimer = window.setTimeout(typeNextCharacter, characterDelay);
        } else {
          jiangYunxiuTypingTimer = null;
          revealText.classList.remove("is-typing");
        }
      };

      jiangYunxiuTypingTimer = window.setTimeout(typeNextCharacter, characterDelay);
    }

    if (imageButton && recordImage) {
      recordImage.src = page.media.alternateSrc;
      recordImage.alt = page.media.alternateAlt;
      imageButton.setAttribute("data-image-src", page.media.alternateSrc);
      imageButton.setAttribute("data-image-alt", page.media.alternateAlt);
      imageButton.setAttribute("aria-label", `放大查看：${page.media.alternateAlt}`);
    }
  }, 3000);
}

function renderFooter(route) {
  const discovered = formatCount(state.visited.size);
  const footerInner = footerStatus.parentElement;

  if (route.view === "record") {
    footerStatus.innerHTML = "";
    footerInner?.classList.add("is-empty");

    return;
  }

  if (route.view === "map") {
    footerInner?.classList.remove("is-empty");
    footerStatus.innerHTML = `
      <div class="footer-pill">
        <span>当前页面</span>
        <strong>山门地图</strong>
      </div>
      <div class="footer-pill">
        <span>旧井点位</span>
        <strong>${hasUnlockedOldWell() ? "已显现" : "尚未显现"}</strong>
      </div>
      <button type="button" class="footer-home-button" data-footer-home>返回首页</button>
    `;

    return;
  }

  footerStatus.innerHTML = "";
  footerInner?.classList.add("is-empty");
}

function handleSearch(rawKeyword) {
  const keyword = normalizeKeyword(rawKeyword);

  if (!keyword) {
    setSearchFeedback("请先输入关键词。", "warning");
    return;
  }

  if (keyword === normalizeKeyword("人魂灯")) {
    state.failStreak = 0;
    setSearchFeedback("未知错误。", "error");
    showHumanSoulLampEffect();
    return;
  }

  const page = keywordIndex.get(keyword);

  if (!page) {
    state.failStreak += 1;
    setSearchFeedback("宗门卷宗中暂无此记录。", "error");
    return;
  }

  state.failStreak = 0;
  state.activePanel = null;
  state.hiddenDossierOpen = false;
  state.mapDossierOpen = false;
  markKeywordSearched(page.keyword);
  setSearchFeedback("", "");
  navigateToPage(page.id);
}

function bindEvents(route) {
  const searchForm = document.querySelector("#search-form");

  if (searchForm) {
    searchForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const formData = new FormData(searchForm);
      handleSearch(String(formData.get("keyword") ?? ""));
    });
  }

  const input = document.querySelector("#keyword-input");

  if (input) {
    input.addEventListener("input", () => {
      if (!state.message && state.failStreak < 3) {
        return;
      }

      state.message = "";
      state.messageType = "";
      setSearchFeedback("", "");
    });
  }

  document.querySelectorAll("[data-nav]").forEach((button) => {
    button.addEventListener("click", () => {
      state.pendingSection = null;
      navigateHome();
    });
  });

  document.querySelectorAll("[data-section]").forEach((button) => {
    button.addEventListener("click", () => {
      const sectionId = button.getAttribute("data-section");

      if (!sectionId) {
        return;
      }

      openSectionOrPanel(sectionId, route);
    });
  });

  const footerHomeButton = document.querySelector("[data-footer-home]");

  if (footerHomeButton) {
    footerHomeButton.addEventListener("click", () => {
      navigateHome();
    });
  }

  document.querySelectorAll(".directory-card").forEach((card) => {
    card.addEventListener("click", () => {
      if (card.hasAttribute("data-standalone-link")) {
        return;
      }

      const panelId = card.id;

      if (panelId === "notice-board") {
        scrollToSection("notice-board");
        return;
      }

      if (PANEL_SECTION_IDS.has(panelId)) {
        openSectionOrPanel(panelId, route);
        return;
      }

      showToast("此处分册尚未开放。");
    });
  });

  document.querySelectorAll("[data-open-panel]").forEach((button) => {
    button.addEventListener("click", () => {
      const panelId = button.getAttribute("data-open-panel");
      const itemId = button.getAttribute("data-item-id") ?? undefined;

      if (!panelId) {
        return;
      }

      if (panelId === "lost-and-found") {
        openPanel(panelId, { itemId });
        return;
      }

      openPanel(panelId);
    });
  });

  document.querySelectorAll("[data-disciple-id]").forEach((button) => {
    button.addEventListener("click", () => {
      const discipleId = button.getAttribute("data-disciple-id");

      if (!discipleId) {
        return;
      }

      state.activeDiscipleId = discipleId;
      const disciple = getActiveDisciple();
      markClueViewed(disciple.clueKey);
      render();
    });
  });

  document.querySelectorAll("[data-lost-item-id]").forEach((button) => {
    button.addEventListener("click", () => {
      const itemId = button.getAttribute("data-lost-item-id");

      if (!itemId) {
        return;
      }

      state.activeLostItemId = itemId;
      const item = getActiveLostItem();
      markClueViewed(item.clueKey);
      render();
    });
  });

  document.querySelectorAll("[data-claim-lost-item]").forEach((button) => {
    button.addEventListener("click", () => {
      const itemId = button.getAttribute("data-claim-lost-item");

      if (itemId) {
        claimLostItem(itemId);
      }
    });
  });

  bindSpiritRootEvents(document.querySelector(".spirit-root-stage"));

  document.querySelectorAll("[data-sutra-tab]").forEach((button) => {
    button.addEventListener("click", () => {
      const tabId = button.getAttribute("data-sutra-tab");

      if (!tabId) {
        return;
      }

      state.activeSutraTab = tabId;
      render();
    });
  });

  document.querySelectorAll("[data-lamp-id]").forEach((button) => {
    button.addEventListener("click", () => {
      const lampId = button.getAttribute("data-lamp-id");

      if (!lampId) {
        return;
      }

      state.activeLampId = lampId;
      const lamp = getActiveLamp();
      markClueViewed(lamp.clueKey);
      render();
    });
  });

  document.querySelectorAll("[data-lantern-lock-symbol]").forEach((button) => {
    button.addEventListener("click", () => {
      const symbol = button.getAttribute("data-lantern-lock-symbol");

      if (symbol) {
        handleLanternLockSelection(symbol);
      }
    });
  });

  const soulLanternDoor = document.querySelector("[data-open-soul-door]");

  if (soulLanternDoor) {
    soulLanternDoor.addEventListener("click", () => {
      state.soulLanternDoorOverlay = "lock";
      state.activeSoulLanternArchiveId = null;
      state.soulLanternDoorCode = [null, null, null];
      state.soulLanternDoorActiveSlot = null;
      state.soulLanternDoorMessage = "";
      state.soulLanternDoorUnlocked = false;
      render();
    });
  }

  const soulDoorLockImage = document.querySelector("[data-open-soul-door-code]");

  if (soulDoorLockImage) {
    soulDoorLockImage.addEventListener("click", () => {
      state.soulLanternDoorOverlay = "code";
      state.soulLanternDoorActiveSlot = null;
      render();
    });
  }

  document.querySelectorAll("[data-soul-door-slot]").forEach((button) => {
    button.addEventListener("click", () => {
      const slotIndex = Number.parseInt(button.getAttribute("data-soul-door-slot") ?? "", 10);

      if (!Number.isInteger(slotIndex) || slotIndex < 0 || slotIndex > 2) {
        return;
      }

      state.soulLanternDoorActiveSlot = slotIndex;
      state.soulLanternDoorMessage = "";
      state.soulLanternDoorUnlocked = false;
      updateSoulLanternDoorCodeView();
    });
  });

  document.querySelectorAll("[data-soul-door-symbol]").forEach((button) => {
    button.addEventListener("click", () => {
      selectSoulLanternDoorSymbol(button.getAttribute("data-soul-door-symbol") ?? "");
    });
  });

  const soulDoorClose = document.querySelector("[data-close-soul-door]");

  if (soulDoorClose) {
    soulDoorClose.addEventListener("click", () => {
      state.soulLanternDoorOverlay = null;
      state.activeSoulLanternArchiveId = null;
      state.soulLanternDoorActiveSlot = null;
      render();
    });
  }

  const soulDoorOverlay = document.querySelector("[data-soul-door-overlay]");

  if (soulDoorOverlay) {
    soulDoorOverlay.addEventListener("click", (event) => {
      const archiveTrigger = event.target.closest("[data-soul-lantern-archive]");

      if (archiveTrigger) {
        state.activeSoulLanternArchiveId = archiveTrigger.getAttribute(
          "data-soul-lantern-archive",
        );
        render();
        return;
      }

      const archiveOverlay = event.currentTarget.querySelector(
        "[data-soul-lantern-archive-overlay]",
      );

      if (
        event.target.closest("[data-close-soul-lantern-archive]") ||
        event.target === archiveOverlay
      ) {
        state.activeSoulLanternArchiveId = null;
        render();
        return;
      }

      if (event.target === soulDoorOverlay) {
        state.soulLanternDoorOverlay = null;
        state.activeSoulLanternArchiveId = null;
        state.soulLanternDoorActiveSlot = null;
        render();
      }
    });
  }

  document.querySelectorAll("[data-herbal-record-id]").forEach((button) => {
    button.addEventListener("click", () => {
      const recordId = button.getAttribute("data-herbal-record-id");
      const noteId = button.getAttribute("data-herbal-note-id");

      if (!recordId || !noteId) {
        return;
      }

      state.activeHerbalRecordId = recordId;
      state.activeHerbalNoteId = noteId;
      render();
    });
  });

  document.querySelectorAll("[data-open-herbal-ledger]").forEach((button) => {
    button.addEventListener("click", () => {
      state.activeHerbalNoteId = "outer-ledger";
      render();
    });
  });

  document.querySelectorAll("[data-search-keyword]").forEach((button) => {
    button.addEventListener("click", () => {
      const keyword = button.getAttribute("data-search-keyword");

      if (!keyword) {
        return;
      }

      handleSearch(keyword);
    });
  });

  document.querySelectorAll("[data-news-id]").forEach((button) => {
    button.addEventListener("click", () => {
      const newsId = button.getAttribute("data-news-id");

      if (!newsId) {
        return;
      }

      openNewsPanel(newsId);
    });
  });

  document.querySelectorAll("[data-open-news-collection]").forEach((button) => {
    button.addEventListener("click", () => {
      const collectionKind = button.getAttribute("data-open-news-collection");
      openNewsCollection(collectionKind);
    });
  });

  document.querySelectorAll("[data-open-map-dossier]").forEach((button) => {
    button.addEventListener("click", () => {
      markClueViewed("map:old-well");
      state.mapDossierOpen = true;
      render();
    });
  });

  document.querySelectorAll("[data-preview-image]").forEach((button) => {
    button.addEventListener("click", () => {
      openImagePreview({
        src: button.getAttribute("data-image-src") ?? "",
        alt: button.getAttribute("data-image-alt") ?? "",
        caption: button.getAttribute("data-image-caption") ?? "",
      });
    });
  });

  const backdrop = document.querySelector("[data-overlay-backdrop]");

  if (backdrop) {
    backdrop.addEventListener("click", (event) => {
      if (event.target === backdrop) {
        closePanel();
      }
    });
  }

  const closeButton = document.querySelector("[data-close-panel]");

  if (closeButton) {
    closeButton.addEventListener("click", () => {
      closePanel();
    });
  }
}

function render() {
  if (jiangYunxiuRevealTimer) {
    window.clearTimeout(jiangYunxiuRevealTimer);
    jiangYunxiuRevealTimer = null;
  }

  if (jiangYunxiuTypingTimer) {
    window.clearTimeout(jiangYunxiuTypingTimer);
    jiangYunxiuTypingTimer = null;
  }

  if (state.corruptionActive) {
    document.body.classList.remove("is-home-view", "is-record-view", "has-overlay");
    document.body.classList.add("is-corrupted");
    app.innerHTML = renderCorruptedPage();
    footerStatus.innerHTML = "";
    toastRegion.innerHTML = "";
    bindCorruptedEyeTracking();
    return;
  }

  document.body.classList.remove("is-corrupted");
  const route = getCurrentRoute();

  document.body.classList.toggle("is-home-view", route.view === "home");
  document.body.classList.toggle("is-record-view", route.view === "record");

  if (route.view === "map") {
    const mapUrl = new URL("./map.html", window.location.href);
    window.location.replace(mapUrl.toString());
    return;
  }

  if (route.view === "record") {
    const page = pagesById.get(route.pageId);

    if (!page) {
      navigateHome();
      return;
    }

    markVisited(page.id);
    app.innerHTML = renderRecord(page);
    scheduleJiangYunxiuReveal(page);
  } else {
    app.innerHTML = renderHome();
  }

  renderFooter(route);
  document.body.classList.toggle("has-overlay", Boolean(state.activePanel));
  bindEvents(route);

  if (state.activePanel && state.pendingPanelFocus) {
    state.pendingPanelFocus = false;
    window.requestAnimationFrame(() => {
      document.querySelector(
        ".module-card.is-active, .disciple-entry.is-active, .folio-tab.is-active, .lantern-button.is-active, .map-point.is-active"
      )?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    });
  }

  if (route.view === "home" && (state.pendingSection || route.section)) {
    const nextSection = state.pendingSection || route.section;
    state.pendingSection = null;

    if (PANEL_SECTION_IDS.has(nextSection)) {
      window.requestAnimationFrame(() => openPanel(nextSection));
      return;
    }

    window.requestAnimationFrame(() => scrollToSection(nextSection));
  } else {
    window.scrollTo({ top: 0, left: 0 });
  }
}

window.addEventListener("hashchange", render);
window.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && isImagePreviewOpen()) {
    closeImagePreview();
    return;
  }

  if (event.key === "Escape" && state.activePanel) {
    closePanel();
  }
});

if (!window.location.hash) {
  window.location.hash = "/home";
}

render();
