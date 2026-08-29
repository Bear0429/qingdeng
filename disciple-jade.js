const WEN_LOGIN_STORAGE_KEY = "hasLoggedWenZhaoYe";
const ELDER_LOGIN_STORAGE_KEY = "hasLoggedLuXingzhou";
const ACTIVE_LOGIN_STORAGE_KEY = "qingdeng-weigui:jade-active-account";
const VISITED_PAGES_STORAGE_KEY = "qingdeng-weigui:visited-pages";
const SEARCHED_KEYWORDS_STORAGE_KEY = "qingdeng-weigui:searched-keywords";
const CLAIMED_LOST_ITEMS_STORAGE_KEY = "qingdeng-weigui:claimed-lost-items";
const JADE_MESSAGE_VIEWED_STORAGE_KEY = "qingdeng-weigui:jade-message-viewed";
const ELDER_WEN_MESSAGE_VIEWED_STORAGE_KEY = "qingdeng-weigui:xz000-wen-message-viewed";
const KCY_BLACK_MEMORY_STONE_STORAGE_KEY = "qingdeng-weigui:kcy49-black-memory-stone";
const KCY_NINE_TURN_REMNANT_ONE_STORAGE_KEY = "qingdeng-weigui:kcy49-nine-turn-remnant-one";
const WEN_DASHBOARD_HASH = "#/wzy-dashboard";
const ELDER_DASHBOARD_HASH = "#/lxz-dashboard";

const dashboardCards = [
  {
    title: "我的宗卷",
    desc: "查看个人卷宗与档案",
    image: "./assets/dashboard/archive-scroll.png",
    action: "dossier",
  },
  {
    title: "消息回函",
    desc: "宗门来信与回函记录",
    image: "./assets/dashboard/letters.png",
    badge: "3",
    action: "messages",
  },
  {
    title: "签到记录",
    desc: "每日卯时签到情况",
    image: "./assets/dashboard/checkin.png",
  },
  {
    title: "任务批注",
    desc: "任务进度与执事批注",
    image: "./assets/dashboard/tasks.png",
    badge: "2",
  },
  {
    title: "日记",
    desc: "今晨摘记与往昔回看",
    image: "./assets/dashboard/diary.png",
    action: "diary",
  },
  {
    title: "个人物品",
    desc: "查看随身物品与收纳记录",
    image: "./assets/dashboard/personal-items.png",
    action: "inventory",
  },
];

const jadeInventoryItems = [
  {
    id: "identity-jade",
    name: "身份玉牌",
    category: "身份凭证",
    status: "随身",
    location: "空翠院乙四十九",
    image: "./assets/items/玉牌.png",
    description:
      "玉牌正面只留一字“温”。背面极小刻字：“若忘口令，便记旧井。”刻字旁有一道较新的刮痕，像有人匆忙抹去旧姓。",
    note: "玉牒编号：KCY49。玉牌边角沾有少量井沿青苔。",
  },
  {
    id: "unsent-crane",
    name: "未寄纸鹤",
    category: "传信物",
    status: "未寄",
    location: "空翠院乙四十九",
    image: "./assets/items/纸鹤.png",
    description:
      "以旧卷边纸折成，翅缘有多次拆合的痕迹。内侧只写到：“切不可查询真相，如果已经卷入...”收信人处留有一个未写完的“姜”字。",
    note: "旧纸破旧不已，后半截已经看不清字迹。",
  },
  {
    id: "white-ribbon",
    name: "白色发带",
    category: "随身衣物",
    status: "随身",
    location: "问心岭试炼",
    image: "./assets/inventory/white-ribbon.png",
    description:
      "空翠院常见的素白发带，一端磨损，边缘留有很淡的朱砂记号。陆栖尘曾以此物作为辨认温照夜的依据。",
    note: "朱痕不像血，更接近宗门旧卷批注所用的印泥。",
  },
  {
    id: "huaiyin-gazette",
    name: "《槐阴渡地方志》",
    category: "借阅典籍",
    status: "未归还",
    location: "藏经阁",
    image: "./assets/inventory/huaiyin-gazette.png",
    description:
      "九月初一借出。书中夹着姜氏女随仙师离乡的旧拓，归宗记录处整页缺失，几处页角被反复折过。",
    note: "借阅册上仍记在温照夜名下。",
  },
];

const jadeBronzeKeyItem = {
  id: "bronze-key",
  name: "旧阁青铜钥",
  category: "钥具",
  status: "已认领",
  location: "藏经阁旧阁",
  image: "./assets/items/青铜钥.png",
  description:
    "钥柄刻有“旧阁偏门”四字，齿部沾灰，近期曾被使用。温照夜将它包在《槐阴渡地方志》的旧封皮内。",
  note: "旧阁偏门的锁孔与钥齿吻合，钥柄内侧另有一道细小灯形刻纹。",
};

const jadePharmacyDiaryItem = {
  id: "pharmacy-diary",
  name: "药堂日记",
  category: "暗格拾取物",
  status: "已拾取",
  location: "茯苓药柜暗格",
  image: "./assets/records/pharmacy-diary.png",
  description: "从茯苓药柜下方暗格中取出的旧日记。封面无题，纸页边缘残留药香。",
  note: "白蘅曾说，她平时喜欢把一些东西藏在这里。",
};

const jadeBlackMemoryStoneItem = {
  id: "black-memory-stone",
  name: "黑色留影石",
  category: "旧井拾取物",
  status: "已拾取",
  location: "旧井深处",
  image: "./assets/items/black-memory-stone.png",
  description: "从旧井深处拾得的黑色石头。外壳如焦黑琉璃，石心有赤色裂光缓慢游移，握在掌中时隐约传来断续震动。",
  note: "此物已收入KCY49个人物品。尚未查明其中封存的是影像、灵识，还是某段被刻意抹去的记忆。",
};

const jadeNineTurnRemnantOneItem = {
  id: "nine-turn-remnant-one",
  name: "九转补天阵残卷一",
  category: "旧井收存",
  status: "已拾取",
  location: "旧井深处",
  image: "./assets/items/nine-turn-remnant-one.png",
  description: "温照夜从玄濯真人处取出的九转补天阵残卷。卷面残损，仍可辨认阵图与补天旧文。",
  note: "此卷已收入KCY49个人物品，或与旧井下方镇压之物有关。",
};

const SAN_JUAN_CLAIMED_KEY = "qingdeng-weigui:san-juan-claimed";

const jadeSanJuanItem = {
  id: "san-juan",
  name: "九转补天阵残卷三",
  category: "调查收存",
  status: "已拾取",
  location: "陆栖尘交付",
  image: "./assets/items/三卷.png",
  description: "陆栖尘交付的九转补天阵残卷，似乎是第二卷",
  note: "陆栖尘说：或许这个对你有用，也该交给你了。",
};

const SI_JUAN_CLAIMED_KEY = "qingdeng-weigui:si-juan-claimed";

const jadeSiJuanItem = {
  id: "si-juan",
  name: "九转补天阵残卷四",
  category: "调查收存",
  status: "已拾取",
  location: "白蘅交付",
  image: "./assets/items/四卷.png",
  description: "白蘅交付的九转补天阵残卷，似乎是第四卷",
  note: "白蘅说：看来这个残卷兜兜转转还是回到你手上了。",
};

const REMNANT_TWO_OLDWELL_CLAIMED_KEY = "qingdeng-weigui:remnant-two-oldwell-claimed";
const REMNANT_PUZZLE_COMPLETED_KEY = "qingdeng-weigui:remnant-puzzle-completed";

const remnantPuzzlePieces = [
  {
    id: "nine-turn-remnant-one",
    name: "九转补天阵残卷一",
    image: "./assets/items/remnant-one-full.png",
    correctSlot: "top-left",
  },
  {
    id: "si-juan",
    name: "九转补天阵残卷四",
    image: "./assets/items/remnant-four-full.png",
    correctSlot: "top-right",
  },
  {
    id: "san-juan",
    name: "九转补天阵残卷三",
    image: "./assets/items/remnant-three-full.png",
    correctSlot: "bottom-left",
  },
  {
    id: "remnant-two-oldwell",
    name: "九转补天阵残卷二",
    image: "./assets/items/remnant-two-full.png",
    correctSlot: "bottom-right",
  },
];

let puzzleState = {
  placed: {},
  shuffled: [],
  dragging: null,
};

const jadeCompleteFormationItem = {
  id: "complete-formation",
  name: "九转补天阵全图",
  category: "阵图秘卷",
  status: "已拼合",
  location: "四卷归位",
  image: "./assets/items/complete-formation.png",
  description: "四张残卷拼合而成的完整九转补天阵阵图。阵纹相接，灵光隐现，记载了上古封印大阵的全貌。",
  note: "残缺的阵纹彼此相接，一幅完整阵图终于显现。",
};

const jadeRemnantTwoOldWellItem = {
  id: "remnant-two-oldwell",
  name: "九转补天阵残卷二",
  category: "调查收存",
  status: "已拾取",
  location: "沈照微交付",
  image: "./assets/items/remnant-two.png",
  description: "沈照微交付的九转补天阵残卷，似乎是第二卷",
  note: "沈照微说：但是我记得这个东西很重要，是行舟之前偷偷塞给我的。",
};

const elderInventoryVideos = [
  {
    id: "recording-aug17",
    label: "记录一",
    description: "留影石第一段记录",
    source: "./assets/elder-inventory/recording-aug17.mp4",
  },
  {
    id: "recording-aug17-1",
    label: "记录二",
    description: "留影石第二段记录",
    source: "./assets/elder-inventory/recording-aug17-1.mp4",
  },
  {
    id: "recording-aug17-2",
    label: "记录叁",
    description: "留影石第三段记录",
    source: "./assets/elder-inventory/recording-aug17-2.mp4",
  },
  {
    id: "recording-aug17-3",
    label: "记录肆",
    description: "留影石第四段记录",
    source: "./assets/elder-inventory/recording-aug17-3.mp4",
  },
];

const kcyBlackMemoryVideos = [
  {
    id: "black-memory-1",
    label: "记录一",
    description: "黑色留影石第一段记录",
    source: "./assets/inventory/black-memory-video.mp4",
  },
];

const elderInventoryItems = [
  {
    id: "recording-stone",
    name: "留影石",
    category: "影像器物",
    status: "已登记",
    location: "未知",
    image: "./assets/elder-inventory/liuyingshi.png",
    description: "一枚封存的留影石，石心仍有灵光。内存四段旧日影像，需逐段启看。",
    note: "温照夜批注：如果你能找到此处，希望看了这几段我录的影像，自行判断。",
  },
];

const JADE_PHARMACY_DIARY_ENTRIES = [
  {
    title: "第一篇 · 归山后三年",
    time: "三年前，霜降后",
    text: "受伤回来以后，我发现自己忘了很多东西。药堂的人问我在问心岭看见了什么，我只能记得石阶、雾和一盏没有点燃的灯。其余事情像被水泡过，怎么也捞不完整。只有一样东西，我始终记得自己藏在问心岭的石碑后面。那东西很重要，重要到我宁愿忘掉别的，也不能忘掉它。等以后有机会，我让温师妹替我去拿回来。她认得那块碑，也比我更能记住该记住的事。",
  },
  {
    title: "第二篇 · 未入行照堂",
    time: "两年前，春末",
    text: "以前的师兄师姐总替我惋惜，说我本来马上就能成为玄濯真人的亲传弟子，只差最后一次拜师礼，却因为伤势坏了根基，再也无法入门。我应该觉得可惜，应该怨自己命不好，可每次听见他们这样说，我心里却松了一大口气。为什么？我明明没有见过真人几次，却总觉得那扇门后面有什么东西在等我。若真拜入他门下，我或许会忘掉更多，甚至连自己为何害怕都想不起来。",
  },
  {
    title: "第三篇 · 重要之事",
    time: "一年前，秋",
    text: "温师妹今日来药堂找我，问我记不记得魂灯房的密码。我哪敢把那串字直接记在心里，若是被旁人听去，便是大祸。从前我怕自己忘记，便把密码拆进了一首旧诗里。温师妹若能找到那首诗，一个时间加两个数字，便是密码。她比我细心，一定找得到。",
  },
  {
    title: "第四篇 · 残页",
    time: "日期缺失",
    text: "不对劲。玄濯不对劲。不对，不对不对不对……他知道我忘了什么。他问我石碑后面藏了什么，我说没有，他却笑了。药柜下面的暗格不能再放了，若有人看见，便把这本也拿走。温师妹，若你真的读到这里，不要去行照堂，不要相信他说的每一句话。玄濯……玄濯不是——",
  },
];

const JADE_DIARY_GLITCH_COLUMN = "𠂉亗々〆乄ゞヾ𠃌丷乂〻卍彡ゝ龘䨻靐𪚥々乁〱〲ゑゐヿ𠂇亗〆乄𠃍丷ゞゝ〳〴卍乂々𠂉彡䴑𠃌亗ヾ〻𪚥乁ゑ〵ゞ丷𠂇乄々々〆〆乂卍𠂉𠃌彡ゝゟ〱〲龘靐䨻𪚥𠃍丷亗乄ゞヾ〻ゑゐ𠂇乁〳〴〵々卍乂彡𠂉ゝヿ〆亗𠃌丷乄ゞゞ〻𪚥䴑々乁ゑゐヾ𠂉〱〲〳卍彡乂𠃍亗龘䨻靐々〆乄𠂇丷ゝゟ〴〵𪚥亗卍乁〻〻ヾゞ𠃌𠂉彡々〱〲ゑゐ乄乂丷〆𠃍ゝヿ䴑々亗々亗〆〆𠂇乄ゞ卍〳〴龘𪚥䨻靐𠃌丷乁〻ヾゑゐゝ𠂉彡乂々〵〱〲〳〆亗乄ゞ";
const JADE_DIARY_GLITCH_TEXTURE = "͏̷̸̴̵͟͞͠҉҈⃒⃓⃠⃫⃰天̷̸̴̵̾͆͒͌͊͛̑̐̇̍̎̏͟͞͠地̴̵̶̷̖̗̘̙̜̝̿͆͒͛̚̕͟͞͠玄̸̷̴̵̾͆͊͋͌͒̐̍̎̏͟͠͞魂̸̷̴̵̾͆͒͌͊͛̑̐̇̍̎͟͠͞魄̴̷̸̵̾͆͒͌͊͛̑͟͞͠返̸̴̷̶̿͆͒͛͋͌̚̕͟͞͠生̷̸̴̵̾͆͊͋͌͟͠͞𠂉̷̸̴͟͞͠〆̾͆͒卍̐̍̎々̚̕亗̴̷̸͟͞͠乄̾͆〻͒彡̑̐ゞ̍̎龘̸̷̴͟͞͠䨻̿͆靐͛𪚥̚̕卍̖̗̘々̷̸̴̵〆͟͞͠乂̾͆〻͒ヾ̑ゞ̍不̷̸对̴̵劲̶͞不̷͟对̸̴不̵͞要̷̸回̴头͟͞不̸要̷看";

const JADE_DIARY_GLITCH_TEXT = "不对劲，玄濯不对劲。不对，不对不对不对……他知道我忘了什么。他问我石碑后面藏了什么，我说没有，他却笑了。药柜下面的暗格不能再放了，若有人看见，便把这本也拿走。温师妹，若你真的读到这里，不要去行照堂，不要相信他说的每一句话。玄濯……玄濯不是——";

const HUAIYIN_GAZETTE_TEXT = [
  "槐阴渡位于后山水脉下游，村落依河而建，四面多槐。霜降前后夜雾自渡口升起，灯火照水时常见青色倒影。旧志称，渡中居民多以采药、摆渡、制纸为生，逢山雨连日，便将白纸灯挂在槐树下，祈求水路平安。村中有一口旧井，井栏石已被磨平，井水不供饮用，只在每年霜降前由村长封井一次。",
  "地方旧俗又载，槐阴渡每逢霜降，村民会向青岚宗献一盏纸灯，称为‘问心灯’。献灯之日，村人不可击鼓，不可直呼孩童全名，只能以乳名相称。旧志对此解释含混，只说灯入山后，村中病灾便会减轻。若有人在夜雾中听见山上唤名，不得应声，也不得回头寻找。",
  "九月初一借阅此卷时，书中尚夹有姜氏旧事。页上记载，姜氏姐妹幼年相依，姐姐随仙师离渡后，妹妹曾入山寻找，之后再无归讯。归宗记录处缺失整页，唯有几处页角被反复折过，像是有人曾按着同一段文字查阅多次。",
].join("\\n\\n");

const wenDossier = {
  title: "温照夜的个人宗卷",
  subtitle: "青岚宗外门弟子档案 · 玉牒编号KCY49",
  stamp: "档案已启",
  basics: [
    ["姓名", "温照夜"],
    ["玉牒编号", "KCY49"],
    ["身份", "外门弟子"],
    ["所属院舍", "空翠院乙四十九"],
    ["所属峰门", "无迹峰"],
    ["入门时间", "青岚二年 十二月初四"],
    ["当前修为", "炼气二层"],
    ["宗门职务", "暂无"],
    ["档案状态", "已启用"],
    ["原生所在地", "槐阴渡", true],
  ],
  cultivation: [
    ["青岚二年 十二月初四", "入外门，分入空翠院乙四十九。"],
    ["青岚三年 正月初十", "通过灵根复核，评为水木双灵根。"],
    ["青岚三年 三月初三", "完成第一次药园协助任务。"],
    ["青岚三年 五月十二", "藏经阁借阅权限升为外门二阶。"],
    ["青岚三年 九月初一", "借阅《槐阴渡地方志》，尚未归还。"],
    ["青岚三年 九月初六", "申请魂灯状态核验。"],
    ["青岚三年 九月初七", "参加问心岭试炼。"],
  ],
  comments: [
    "此弟子性情沉静，少与人争。入门以来勤勉守规，早课未曾无故缺席，药园、藏经阁、山门值守等事务皆有记录。",
    "修行进境虽不算快，然根基稳定，心性较稳。",
  ],
  stewardNote: "“温照夜行事谨慎，近月常往藏经阁与魂灯房，似有所查。问及缘由，只称寻旧籍。”",
};

const elderDossier = {
  title: "陆行舟的长老宗卷",
  subtitle: "青岚宗长老档案 · 玉牒编号XZ000",
  stamp: "长老档案已重启",
  basics: [
    ["姓名", "陆行舟"],
    ["玉牒编号", "XZ000"],
    ["身份", "长老"],
    ["所属", "青岚宗旧内门"],
    ["任职", "藏经阁、魂灯房旧档复核"],
    ["档案状态", "已重启"],
  ],
  cultivation: [
    ["青岚前纪", "入宗门，列入内门传承簿。"],
    ["旧历九月", "奉命掌理藏经阁旧卷，兼核门中遗失卷宗。"],
    ["旧历霜降", "参与魂灯房灯位复核，接触无名龛旧册。"],
    ["百年前", "名籍记录中断，玉牒随即封存。"],
    ["今岁九月", "以玉牒编号XZ000重新启用，恢复长老权限。"],
  ],
  comments: [
    "陆行舟旧档存续时间远超现行外门名籍，曾负责宗门秘卷、灯位册与封存档案的交接。",
    "其旧名与现行名籍之间存在多处断档，未获长老会核准前，不得以弟子身份查阅。",
  ],
  stewardNote: "旧批注：长老玉牒只认玉印，不认口述。凡涉及旧名、魂灯与封存卷宗者，须由本人验印。",
};

const jadeMessageThread = {
  title: "消息回函",
  subtitle: "温照夜与白蘅 · 宗门往来回函",
  stamp: "回函已阅",
  time: "时间：九月初三，夜",
  messages: [
    { date: "七月廿三" },
    { side: "self", name: "温照夜", avatar: "温", text: "白蘅师姐，我半夜总是心悸，惊醒后许久不能平复。你能不能替我开些药？" },
    { side: "other", name: "白蘅", avatar: "蘅", text: "可以。我先送一味茯苓给你，今晚温水煎服，不要与安神汤同用。" },
    { side: "self", name: "温照夜", avatar: "温", text: "茯苓是放在药堂哪一柜？我明日去取也好。" },
    { side: "other", name: "白蘅", avatar: "蘅", text: "放茯苓的药柜下面有个暗格，我平时喜欢把一些东西藏在那里。此事不要告诉药堂其他人。" },
    { date: "九月初三" },
    { side: "self", name: "温照夜", avatar: "温", text: "白蘅师姐，你还记得问心岭吗？" },
    { side: "other", name: "白蘅", avatar: "蘅", text: "我只记得听同僚和我说我是因为去问心岭受伤回来，才来的药堂" },
    { side: "self", name: "温照夜", avatar: "温", text: "那你可还记得你去过魂灯房吗？" },
    { side: "other", name: "白蘅", avatar: "蘅", text: "我记得是在去问心岭之前，为了调查什么重要的事，进去过" },
    { side: "self", name: "温照夜", avatar: "温", text: "可还记得密码？" },
    { side: "other", name: "白蘅", avatar: "蘅", text: "我忘记了，最近忘得越来越快，我得去翻翻日记" },
    { date: "九月初四" },
    { side: "self", name: "温照夜", avatar: "温", text: "白师姐，如果我三日后没回来，我会让人送纸鹤给你" },
    { side: "other", name: "白蘅", avatar: "蘅", text: "可以让陆栖尘送。" },
    { side: "self", name: "温照夜", avatar: "温", text: "为何？" },
    { side: "other", name: "白蘅", avatar: "蘅", text: "他对药堂的事儿很上心，看得出来人不坏。" },
    { side: "self", name: "温照夜", avatar: "温", text: "好吧，我不太信除你之外的人，必要时我会试一试。" },
  ],
};

const jadeMessageThreads = [
  {
    ...jadeMessageThread,
    id: "baiheng",
    contactName: "白蘅",
    contactAvatar: "蘅",
    preview: "她在灯里，却没人敢写她的名字。",
    listTime: "九月初三",
  },
  {
    id: "luqichen",
    title: "消息回函",
    subtitle: "温照夜与陆栖尘 · 明照院回函",
    stamp: "证词已封",
    time: "九月初七，亥时后",
    contactName: "陆栖尘",
    contactAvatar: "尘",
    preview: "不要再往下查。",
    listTime: "九月初七",
    messages: [
      { date: "九月初七" },
      { side: "other", name: "陆栖尘", avatar: "尘", text: "温师妹，你到底干了什么，为什么把你除名了，上层在抓捕你" },
      { side: "self", name: "温照夜", avatar: "温", text: "陆兄，此时一时半会儿难以解释，你去找药堂找白师姐便知" },
      { side: "other", name: "陆栖尘", avatar: "尘", text: "好，需要我帮你做什么，你救过我妹妹，我必须还你这个人情" },
      { side: "self", name: "温照夜", avatar: "温", text: "他们问你你就说在三更之后见过我即可，还有这纸鹤记得帮我给白师姐" },
      { side: "other", name: "陆栖尘", avatar: "尘", text: "包在我身上" },
    ],
  },
  {
    id: "xuanzhuo",
    title: "消息回函",
    subtitle: "温照夜与玄濯真人 · 行照堂传讯",
    stamp: "行照堂",
    time: "九月初七",
    contactName: "玄濯真人",
    contactAvatar: "玄",
    preview: "规矩就是规矩",
    listTime: "九月初七",
    messages: [
      { date: "八月十三" },
      { side: "self", name: "温照夜", avatar: "温", text: "真人，弟子有事相求" },
      { side: "other", name: "玄濯真人", avatar: "玄", text: "无妨，便说" },
      { side: "self", name: "温照夜", avatar: "温", text: "弟子近日做梦，梦到自己的魂灯有异常，想进魂灯房查看" },
      { side: "other", name: "玄濯真人", avatar: "玄", text: "好，不过魂灯房近日在整改，等你从问心岭试炼归来，可前去查看" },
      { side: "self", name: "温照夜", avatar: "温", text: "多谢真人" },
      { date: "九月初七" },
      { side: "other", name: "玄濯真人", avatar: "玄", text: "明日便去行照堂报道，带好身份玉牌" },
      { side: "self", name: "温照夜", avatar: "温", text: "谢谢真人提醒，我有一问想询问真人" },
      { side: "other", name: "玄濯真人", avatar: "玄", text: "何事？" },
      { side: "self", name: "温照夜", avatar: "温", text: "不知您还记得要准我去魂灯房的事？" },
      { side: "other", name: "玄濯真人", avatar: "玄", text: "不可，有规定外门弟子不可进入" },
      { side: "self", name: "温照夜", avatar: "温", text: "可是以前您不是准许我进入..." },
      { side: "other", name: "玄濯真人", avatar: "玄", text: "规矩就是规矩" },
    ],
  },
];

const elderMessageThreads = [
  {
    id: "wen-zhaoye-elder",
    title: "消息回函",
    subtitle: "陆行舟与温照夜 · 私密传讯",
    stamp: "新讯未阅",
    time: "今日",
    contactName: "温照夜",
    contactAvatar: "温",
    preview: "我在旧井等你。",
    listTime: "今日",
    unread: true,
    messages: [
      { date: "今日" },
      {
        side: "other",
        name: "温照夜",
        avatar: "温",
        text: "你既然查到了这里，看来也想知道真相吧",
      },
      {
        side: "other",
        name: "温照夜",
        avatar: "温",
        text: "玄濯逆转了九转补天阵，他想献祭所有人的魂力",
      },
      {
        side: "other",
        name: "温照夜",
        avatar: "温",
        text: "如果不加以阻止，不愿意离开宗门的人都活不过今晚",
      },
      {
        side: "other",
        name: "温照夜",
        avatar: "温",
        text: "玄濯隐藏的太好，我劝说不了他们，反而弄巧成拙",
      },
      {
        side: "other",
        name: "温照夜",
        avatar: "温",
        text: "不过，我已找到破阵之法，拿上我的魂灯，来旧井找我",
      },
    ],
  },
];

const LUQICHEN_SCRIPT_KEY = "qingdeng-weigui:luqichen-script-triggered";

const LUQICHEN_SCRIPT_MESSAGES = [
  { side: "other", name: "陆栖尘", avatar: "尘", text: "我妹妹怎么样了？他们在偷偷监视我，没机会联系你" },
  { side: "self", name: "温照夜", avatar: "温", text: "我已经托人把她带到我跟你说过那个地方，一户乡下人家愿意收养她，远离这里放心，你也早些走吧" },
  { side: "other", name: "陆栖尘", avatar: "尘", text: "之前多有得罪，我做不到像你这样，放心不下我妹妹" },
  { side: "self", name: "温照夜", avatar: "温", text: "无妨，我本来抱着必死的决心，看我信号，你就带领清醒的弟子们撤离" },
  { side: "other", name: "陆栖尘", avatar: "尘", text: "好，或许这个对你有用，也该交给你了" },
  { type: "image", side: "other", name: "陆栖尘", avatar: "尘", src: "./assets/items/三卷.png", alt: "三卷旧档", itemId: "san-juan" },
];

const LUQICHEN_ZHENJUAN_KEY = "qingdeng-weigui:luqichen-zhenjuan-triggered";

const LUQICHEN_ZHENJUAN_MESSAGES = [
  { side: "other", name: "陆栖尘", avatar: "尘", text: "我妹妹怎么样了？" },
];

const XUANZHUO_SCRIPT_KEY = "qingdeng-weigui:xuanzhuo-script-triggered";

const XUANZHUO_SCRIPT_MESSAGES = [
  { side: "self", name: "温照夜", avatar: "温", text: "真人可还记得沈师姐？" },
  { side: "other", name: "玄濯真人", avatar: "玄", text: "你可是指沈照微？有何事?" },
  { side: "self", name: "温照夜", avatar: "温", text: "真人可还记得和沈师姐是和关系？" },
  { side: "other", name: "玄濯真人", avatar: "玄", text: "不过是同僚，你所问到底何事？" },
  { side: "self", name: "温照夜", avatar: "温", text: "我听闻沈师姐和真人以前是人人艳羡的神仙道侣，可是现在沈师姐去了哪里？" },
  { side: "other", name: "玄濯真人", avatar: "玄", text: "与你无关，不该过问的别问" },
];

const BAIHENG_ZHENJUAN_KEY = "qingdeng-weigui:baiheng-zhenjuan-triggered";

const BAIHENG_ZHENJUAN_MESSAGES = [
  { side: "other", name: "白蘅", avatar: "蘅", text: "原本九转补天残卷是我们和陆氏一起保管的，但是我们家族某一天被人袭击，死伤大半" },
  { side: "other", name: "白蘅", avatar: "蘅", text: "为了保护残卷，交给了一位姜氏夫妇" },
  { side: "self", name: "温照夜", avatar: "温", text: "他们有何特征？" },
  { side: "other", name: "白蘅", avatar: "蘅", text: "他们有两个女儿，我们家族的人把他们安置在了槐阴渡，不知道他们过的如何了" },
];

const BAIHENG_JIANG_KEY = "qingdeng-weigui:baiheng-jiang-triggered";

const BAIHENG_JIANG_MESSAGES = [
  { side: "self", name: "温照夜", avatar: "温", text: "白师姐，可还记得姜云蘅？" },
  { side: "other", name: "白蘅", avatar: "蘅", text: "记得，姜云蘅是和我同期的同僚" },
  { side: "self", name: "温照夜", avatar: "温", text: "其实我是她妹妹，师姐可还眼熟我头上的发带？" },
  { side: "other", name: "白蘅", avatar: "蘅", text: "我想起来了，我说第一次见你怎么这么眼熟，原来是她的妹妹。" },
];

const BAIHENG_ZHENJUAN_AFTER_JIANG_KEY = "qingdeng-weigui:baiheng-zhenjuan-after-jiang-triggered";

const BAIHENG_ZHENJUAN_AFTER_JIANG_MESSAGES = [
  { side: "other", name: "白蘅", avatar: "蘅", text: "看来这个残卷兜兜转转还是回到你手上了" },
  { type: "image", side: "other", name: "白蘅", avatar: "蘅", src: "./assets/items/四卷.png", alt: "四卷旧档", itemId: "si-juan" },
];

const BAIHENG_ZHOUYIN_KEY = "qingdeng-weigui:baiheng-zhouyin-triggered";

const BAIHENG_ZHOUYIN_MESSAGES = [
  { side: "other", name: "白蘅", avatar: "蘅", text: "家族为防止被邪祟追踪，我们把咒印设置在了自己最深层的梦中。" },
  { side: "other", name: "白蘅", avatar: "蘅", text: "若想知道咒印必须进入我的识海，晚上我将在入睡前传一只纸鹤给你，届时你便能潜入我的梦里。" },
  {
    type: "image",
    side: "other",
    name: "白蘅",
    avatar: "蘅",
    src: "./assets/items/zhouyin-paper-crane.png",
    alt: "纸鹤",
    href: "./seal-puzzle.html",
  },
];

const LUQICHEN_ZHOUYIN_KEY = "qingdeng-weigui:luqichen-zhouyin-triggered";

const LUQICHEN_ZHOUYIN_MESSAGES = [
  { side: "other", name: "陆栖尘", avatar: "尘", text: "家族为防止被邪祟追踪，我们把咒印设置在了自己最深层的梦中。" },
  { side: "other", name: "陆栖尘", avatar: "尘", text: "若想知道咒印必须进入我的识海，晚上我将在入睡前传一只纸鹤给你，届时你便能潜入我的梦里。" },
  {
    type: "image",
    side: "other",
    name: "陆栖尘",
    avatar: "尘",
    src: "./assets/items/zhouyin-paper-crane.png",
    alt: "纸鹤",
    href: "./seal-puzzle-earth.html",
  },
];

const jadeChatReplies = {
  baiheng: {
    contactName: "白蘅",
    contactAvatar: "蘅",
    rules: [
      { keywords: ["茯苓", "药"], reply: "可又是心悸了，药在药堂第二层第三格" },
      { keywords: ["咒印"], script: BAIHENG_ZHOUYIN_MESSAGES, storageKey: BAIHENG_ZHOUYIN_KEY },
      { keywords: ["九转补天阵残卷"], script: BAIHENG_ZHENJUAN_AFTER_JIANG_MESSAGES, storageKey: BAIHENG_ZHENJUAN_AFTER_JIANG_KEY, condition: "jiang-triggered" },
      { keywords: ["九转补天阵残卷"], script: BAIHENG_ZHENJUAN_MESSAGES, storageKey: BAIHENG_ZHENJUAN_KEY },
      { keywords: ["姜云蘅"], script: BAIHENG_JIANG_MESSAGES, storageKey: BAIHENG_JIANG_KEY },
    ],
    default: "温师妹，要好好休息",
  },
  luqichen: {
    contactName: "陆栖尘",
    contactAvatar: "尘",
    rules: [
      { keywords: ["陆清禾"], script: LUQICHEN_SCRIPT_MESSAGES, storageKey: LUQICHEN_SCRIPT_KEY },
      { keywords: ["咒印"], script: LUQICHEN_ZHOUYIN_MESSAGES, storageKey: LUQICHEN_ZHOUYIN_KEY },
      { keywords: ["九转补天阵残卷"], script: LUQICHEN_ZHENJUAN_MESSAGES, storageKey: LUQICHEN_ZHENJUAN_KEY },
    ],
    default: "自身难保就不要来找我了",
  },
  xuanzhuo: {
    contactName: "玄濯真人",
    contactAvatar: "玄",
    rules: [
      { keywords: ["沈照微"], script: XUANZHUO_SCRIPT_MESSAGES, storageKey: XUANZHUO_SCRIPT_KEY },
    ],
    default: "无事勿扰",
  },
};

let activeJadeMessageThreadId = "baiheng";

function getJadeMessageThreads() {
  return getActiveAccount() === "lxz" ? elderMessageThreads : jadeMessageThreads;
}

function getActiveJadeMessageThread() {
  const thread = getJadeMessageThreads().find((t) => t.id === activeJadeMessageThreadId);
  if (thread) return thread;
  if (getActiveAccount() === "lxz") return null;
  return getJadeMessageThreads()[0] ?? null;
}

const JADE_DIARY_LOCK_HINT = "解锁封印需找寻对应线索";

const jadeDiaryEntries = [
  {
    id: "diary-1",
    title: "第一篇日记",
    time: "九月初一 · 藏经阁",
    keywords: ["姜云蘅"],
    hint: JADE_DIARY_LOCK_HINT,
    content: [
      "九月初一，雨。",
      "今日借到《槐阴渡地方志》。",
      "书页里夹着一张旧拓，写着十年前姜氏女随仙师离乡，名籍却没有归宗记录。",
      "姐姐的名字被人划去了。",
      "他们说姜云蘅早已死于山神娶亲，可若她死了，魂灯为何还亮？",
      "我不能再用那个姓。",
      "温照夜这个名字，暂且够用。",
    ],
  },
  {
    id: "diary-2",
    title: "第二篇日记",
    time: "九月初五 · 外门旧图",
    keywords: ["青铜钥", "第七灯", "无名龛", "旧灯芯"],
    requiredCount: 3,
    hint: JADE_DIARY_LOCK_HINT,
    content: [
      "九月初五，晴。",
      "外门旧图缺了一角。",
      "新图上没有旧井，旧图上却画着。",
      "井在问心岭阴面，旁边标着两个小字：归墟。",
      "我问管图的执事，他说那只是废井，不必记。",
      "可若不必记，为什么要从新图上抹去？",
    ],
  },
  {
    id: "diary-3",
    title: "第三篇日记",
    time: "九月初六 · 魂灯房",
    keywords: ["沈照微"],
    hint: JADE_DIARY_LOCK_HINT,
    content: [
      "九月初六，子时。",
      "我偷偷去了魂灯房。",
      "无名龛最里面有一盏旧灯，没有灯号。",
      "灯底写着：沈照微。",
      "再往外，是第六灯。",
      "姜云蘅。",
      "我看见姐姐的名字时，灯火晃了一下，像有人在水底睁眼。",
      "她没有死。",
    ],
  },
  {
    id: "diary-4",
    title: "第四篇日记",
    time: "九月初七 · 试炼前",
    keywords: ["姜云岫"],
    hint: JADE_DIARY_LOCK_HINT,
    content: [
      "他们都说我姐姐死于山神娶亲。",
      "我不信，我姐姐是最有天赋之人，怎么可能就此陨落。",
      "我记得姐姐曾告诉我，他们一直在守护一个很重要的东西。",
      "她劝诫我，如果她消失了，不要担心，不要追寻她的下落。",
      "但是她知道我的性子，她说如果要来青岚宗找她，如果她不在，可以找一位叫白蘅的女修。",
      "活要见人，死要见尸。",
      "姐姐，等我。",
    ],
  },
  {
    id: "diary-5",
    title: "第五篇日记",
    time: "九月初七 · 夜",
    keywords: ["勿呼名"],
    hint: JADE_DIARY_LOCK_HINT,
    content: [
      "九月初七，夜。",
      "我听见玄濯真人在井边说话。",
      "他说：“照微，再等等。”",
      "井下也有声音。",
      "那声音很温柔，温柔得像真的。",
      "可白蘅师姐说过，真的沈照微不会让别人替她去死。",
      "若我回不来，后来的人请记住：",
      "不要喊我的名字。",
      "也不要应她的名字。",
    ],
  },
  {
    id: "diary-6",
    title: "日记残页",
    time: "未知时间",
    alwaysUnlocked: true,
    corrupt: true,
    hint: "此页没有封印。",
    content: [],
  },
];

const elderDiaryEntries = [
  {
    id: "diary-1",
    title: "第一篇日记",
    time: "百年前",
    keywords: ["姜云蘅"],
    hint: JADE_DIARY_LOCK_HINT,
    content: [
      "归墟井异动了。",
      "掌门说需要魂力圆满的人自愿以魂入井，才能封住归墟门，才能保全青岚宗。",
      "只有照微一人魂力达到了圆满，是那个最合适的人选。",
      "为什么她还这么年轻。",
      "为什么我达不到魂力圆满。",
      "为什么她要抛下我。",
      "为什么为什么为什么为什么。",
    ],
  },
  {
    id: "diary-2",
    title: "第二篇日记",
    time: "十年前",
    keywords: ["青铜钥", "第七灯", "无名龛", "旧灯芯"],
    requiredCount: 3,
    hint: JADE_DIARY_LOCK_HINT,
    content: [
      "数百年，我终于找到救你的办法了。",
      "照微，在下面的日子很苦吧。",
      "很快我便能救你出来了......",
    ],
  },
  {
    id: "diary-3",
    title: "第三篇日记",
    time: "三年前",
    alwaysUnlocked: true,
    hint: "此页没有封印。",
    content: [
      "本来就差一名拥有先天魂力的人我就可以把你换回来了，为什么总是事与愿违？",
      "罢了，等了数百年，我又差这一点时间吗。",
    ],
  },
  {
    id: "diary-4",
    title: "第四篇日记",
    time: "一月初三",
    alwaysUnlocked: true,
    hint: "此页没有封印。",
    content: [
      "太好了，又来了一名先天魂力之人。",
      "不过此人怎么长的有些眼熟？",
      "无妨，照微，我已经等不及带你脱离苦海了。",
    ],
  },
  {
    id: "diary-5",
    title: "第五篇日记",
    time: "八月三十",
    alwaysUnlocked: true,
    hint: "此页没有封印。",
    content: [
      "为何被我抽取魂魄的人还能复活？样貌变得如此丑陋...这难道是九转补天阵的副作用？",
      "看来我得去找到后面两张残卷了。",
    ],
  },
];

function getDiaryEntries() {
  return getActiveAccount() === "lxz" ? elderDiaryEntries : jadeDiaryEntries;
}

const diaryVisitedKeywordMap = {
  jiangyunheng: "姜云蘅",
  qingtongyao: "青铜钥",
  diqideng: "第七灯",
  wumingkan: "无名龛",
  jiudengxin: "旧灯芯",
  shenzhaowei: "沈照微",
  "broken-paper-crane": "破损纸鹤",
  luqichen: "陆栖尘",
  wuhuming: "勿呼名",
};

const recentRows = [
  ["宗门公告", "青岚宗外门试炼榜单已录", "九月初七", true],
  ["事务通告", "空翠院乙四十九号房待复核", "九月初七", true],
  ["试炼传讯", "问心岭归山名册已交外门事务处", "九月初六", false],
  ["药堂抄录", "安神汤与忘尘散支取记录待核", "九月初六", false],
];

const elderRows = [
  ["门中异动", "归墟井残封二次回响", "百年前", true],
  ["秘卷异变", "高阶玉牒以照微为令", "无日", true],
  ["长老旧档", "玄濯真人名籍重启失败", "无时", false],
  ["魂灯房", "每日查询魂灯是否异常", "无刻", false],
];

const ELDER_GLITCH_LINES = [
  "□□□玉牒重启□□□玄安巛㕥归□□",
  "照微为令  旧名未灭  XZ-000",
  "巛巛巛 不可泄露违者失魂 □□□",
  "愿此门永闭 愿此生不复相见",
  "□□行舟□□行舟□□行舟□□",
];

let jadeBellAudioContext = null;
let visibleJadeMessageCount = 0;
let jadeDiaryHintTimer = null;
let pharmacyDiaryTypingTimer = null;
let pharmacyDiaryScrollTarget = null;
let pharmacyDiaryScrollHandler = null;

function isWenLoggedIn() {
  return localStorage.getItem(WEN_LOGIN_STORAGE_KEY) === "true";
}

function isElderLoggedIn() {
  return localStorage.getItem(ELDER_LOGIN_STORAGE_KEY) === "true";
}

function getActiveAccount() {
  return localStorage.getItem(ACTIVE_LOGIN_STORAGE_KEY);
}

function setBodyMode(mode) {
  document.body.classList.remove("is-login-view", "is-dashboard-view", "is-elder-view", "is-transition-view");

  if (mode === "login") {
    document.body.classList.add("is-login-view");
  }

  if (mode === "wen") {
    document.body.classList.add("is-dashboard-view");
  }

  if (mode === "elder") {
    document.body.classList.add("is-dashboard-view", "is-elder-view");
  }
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function getJadeModalRoot() {
  let root = document.querySelector("#jade-modal-root");

  if (!root) {
    root = document.createElement("div");
    root.id = "jade-modal-root";
    document.body.appendChild(root);
  }

  return root;
}

function closeJadeModal() {
  const root = document.querySelector("#jade-modal-root");

  if (!root) {
    document.body.classList.remove("is-modal-open");
    return;
  }

  root.innerHTML = "";
  clearTimeout(jadeDiaryHintTimer);
  document.body.classList.remove("is-modal-open", "is-diary-red");
}

function renderJadeInventorySlot(item, index, activeItemId) {
  const isActive = item.id === activeItemId;

  return `
    <button
      type="button"
      class="jade-inventory-slot ${isActive ? "is-active" : ""}"
      data-inventory-item="${escapeHtml(item.id)}"
      aria-pressed="${isActive}"
      aria-label="查看${escapeHtml(item.name)}"
    >
      <span class="jade-inventory-slot-number">${String(index + 1).padStart(2, "0")}</span>
      <span class="jade-inventory-slot-image">
        <img src="${escapeHtml(item.image)}" alt="" loading="eager" />
      </span>
      <strong>${escapeHtml(item.name)}</strong>
      <small>${escapeHtml(item.status)}</small>
    </button>
  `;
}

function renderJadeInventoryEmptySlot(index) {
  return `
    <div class="jade-inventory-slot is-empty" aria-label="空物品格">
      <span class="jade-inventory-slot-number">${String(index + 1).padStart(2, "0")}</span>
      <i aria-hidden="true">空</i>
      <small>未登记</small>
    </div>
  `;
}

function hasClaimedLostItem(itemId) {
  try {
    const parsed = JSON.parse(localStorage.getItem(CLAIMED_LOST_ITEMS_STORAGE_KEY) ?? "[]");
    return Array.isArray(parsed) && parsed.includes(itemId);
  } catch {
    return false;
  }
}

function renderJadeInventoryNote(item) {
  return escapeHtml(item.note);
}

function getJadeInventorySlots() {
  if (getActiveAccount() === "lxz") {
    return [...elderInventoryItems, null, null, null, null, null, null, null, null, null, null, null, null].slice(0, 12);
  }

  const regularItems = jadeInventoryItems.slice(1);
  const allItems = [
    jadeInventoryItems[0],
    hasClaimedLostItem("bronze-key") ? jadeBronzeKeyItem : null,
    localStorage.getItem("qingdeng-weigui:pharmacy-diary-claimed") === "true"
      ? jadePharmacyDiaryItem
      : null,
    isPuzzleCompleted() ? jadeCompleteFormationItem : null,
    !isPuzzleCompleted() && localStorage.getItem(SAN_JUAN_CLAIMED_KEY) === "true" ? jadeSanJuanItem : null,
    !isPuzzleCompleted() && localStorage.getItem(REMNANT_TWO_OLDWELL_CLAIMED_KEY) === "true" ? jadeRemnantTwoOldWellItem : null,
    !isPuzzleCompleted() && localStorage.getItem(SI_JUAN_CLAIMED_KEY) === "true" ? jadeSiJuanItem : null,
    localStorage.getItem(KCY_BLACK_MEMORY_STONE_STORAGE_KEY) === "true"
      ? jadeBlackMemoryStoneItem
      : null,
    !isPuzzleCompleted() && localStorage.getItem(KCY_NINE_TURN_REMNANT_ONE_STORAGE_KEY) === "true"
      ? jadeNineTurnRemnantOneItem
      : null,
    ...regularItems,
  ];

  const filledItems = allItems.filter(Boolean);
  return [...filledItems, null, null, null, null, null, null, null, null, null, null, null, null].slice(0, 12);
}

function renderJadeInventoryDetail(item) {
  const isElderRecording = item.id === "recording-stone";
  const isKcyBlackRecording = item.id === "black-memory-stone";
  const recordingVideoList = isElderRecording ? elderInventoryVideos : isKcyBlackRecording ? kcyBlackMemoryVideos : null;
  const recordingLinks = recordingVideoList
    ? `
      <div class="jade-recording-links" aria-label="留影石影像">
        <p class="panel-kicker">留影石影像</p>
        ${recordingVideoList
          .map(
            (video, index) => `
              <button type="button" class="jade-recording-link" data-open-recording-video="${escapeHtml(video.id)}">
                <span>0${index + 1}</span>
                <strong>${escapeHtml(video.label)}</strong>
                <small>${escapeHtml(video.description)} · 点击查看</small>
              </button>
            `,
          )
          .join("")}
      </div>
    `
    : "";

  return `
    <div class="jade-inventory-detail-copy${item.id === "recording-stone" ? " is-recording-stone" : ""}">
      <p class="panel-kicker">物品详情 · ${escapeHtml(item.category)}</p>
      <h2 id="jade-inventory-item-title">${escapeHtml(item.name)}</h2>
      ${recordingLinks}
      <dl class="jade-inventory-meta">
        <div>
          <dt>登记状态</dt>
          <dd>${escapeHtml(item.status)}</dd>
        </div>
        <div>
          <dt>记录地点</dt>
          <dd>${escapeHtml(item.location)}</dd>
        </div>
      </dl>
      <p class="jade-inventory-description">${escapeHtml(item.description)}</p>
      <blockquote>
        <span>调查札记</span>
        <p>${renderJadeInventoryNote(item)}</p>
      </blockquote>
      ${item.id === "huaiyin-gazette" ? '<button type="button" class="jade-gazette-read" data-open-gazette>展开卷志</button>' : ""}
      ${item.id === "pharmacy-diary" ? '<button type="button" class="jade-gazette-read" data-open-pharmacy-diary>查看三篇日记</button>' : ""}
      ${item.id === "san-juan" ? '<button type="button" class="jade-gazette-read" data-open-san-juan>查看残卷内容</button>' : ""}
      ${item.id === "si-juan" ? '<button type="button" class="jade-gazette-read" data-open-si-juan>查看残卷内容</button>' : ""}
      ${item.id === "nine-turn-remnant-one" ? '<button type="button" class="jade-gazette-read" data-open-remnant-image data-remnant-image="./assets/items/remnant-one-full.png" data-remnant-title="九转补天阵残卷一 · 阵法图">查看阵法图</button>' : ""}
      ${item.id === "remnant-two-oldwell" ? '<button type="button" class="jade-gazette-read" data-open-remnant-image data-remnant-image="./assets/items/remnant-two-full.png" data-remnant-title="九转补天阵残卷二 · 阵法图">查看阵法图</button>' : ""}
      ${item.id === "san-juan" ? '<button type="button" class="jade-gazette-read" data-open-remnant-image data-remnant-image="./assets/items/remnant-three-full.png" data-remnant-title="九转补天阵残卷三 · 阵法图">查看阵法图</button>' : ""}
      ${item.id === "si-juan" ? '<button type="button" class="jade-gazette-read" data-open-remnant-image data-remnant-image="./assets/items/remnant-four-full.png" data-remnant-title="九转补天阵残卷四 · 阵法图">查看阵法图</button>' : ""}
      ${["nine-turn-remnant-one", "remnant-two-oldwell", "san-juan", "si-juan"].includes(item.id) && hasAllFourRemnants() && !isPuzzleCompleted() ? '<button type="button" class="jade-gazette-read" data-open-remnant-puzzle>拼合残卷</button>' : ""}
    </div>
    <figure class="jade-inventory-detail-image${item.id === "recording-stone" ? " is-recording-stone" : ""}">
      <img src="${escapeHtml(item.image)}" alt="${escapeHtml(item.name)}" />
    </figure>
  `;
}

function openJadeRecordingVideo(videoId) {
  const video = elderInventoryVideos.find((item) => item.id === videoId) ??
    kcyBlackMemoryVideos.find((item) => item.id === videoId);
  const root = getJadeModalRoot();

  if (!video || root.querySelector("[data-recording-video-overlay]")) {
    return;
  }

  root.insertAdjacentHTML(
    "beforeend",
    `<section class="jade-recording-overlay" data-recording-video-overlay>
      <article class="paper-panel jade-recording-modal" role="dialog" aria-modal="true" aria-labelledby="jade-recording-title">
        <button type="button" class="jade-gazette-close" data-close-recording-video aria-label="关闭留影">×</button>
        <p class="panel-kicker">留影石 · ${escapeHtml(video.description)}</p>
        <h2 id="jade-recording-title">${escapeHtml(video.label)}</h2>
        <video class="jade-recording-video" controls playsinline preload="metadata" src="${escapeHtml(video.source)}"></video>
      </article>
    </section>`,
  );
  root.querySelector("[data-close-recording-video]")?.focus();
}

function openSanJuanDetail() {
  const root = getJadeModalRoot();
  if (root.querySelector("[data-san-juan-overlay]")) return;

  root.insertAdjacentHTML(
    "beforeend",
    `<section class="jade-gazette-overlay" data-san-juan-overlay>
      <article class="paper-panel jade-gazette-modal jade-san-juan-modal" role="dialog" aria-modal="true" aria-labelledby="jade-san-juan-title">
        <button type="button" class="jade-gazette-close" data-close-san-juan aria-label="关闭残卷">×</button>
        <p class="panel-kicker">九转补天阵残卷 · 第二卷</p>
        <h2 id="jade-san-juan-title">残卷二 · 聚魂篇</h2>
        <p class="jade-san-juan-subtitle">【万灵归墟】</p>
        <div class="jade-san-juan-quotes">
          <p>“形灭而魂不灭。”</p>
          <p>“魂散而念不散。”</p>
          <p>“以万灵之火，引故人归途。”</p>
        </div>
        <p class="jade-san-juan-note">温照夜笔记：这是最容易被误解的一卷。</p>
        <div class="jade-san-juan-body">
          <p>卷中记载了一种能够抽取整个宗门弟子生命与魂力的大阵。</p>
          <p>因此历代有人认为：</p>
          <p>只要献祭足够多的弟子，</p>
          <p>便可以——</p>
          <p class="jade-san-juan-emphasis">复活旧魂。</p>
          <p>然而这其实是一个巨大的误会。</p>
          <h4>真正作用</h4>
          <p>所谓“旧魂”，</p>
          <p>并不是某位死去的祖师。</p>
          <p>而是——</p>
          <p class="jade-san-juan-emphasis">第一代镇阵者留下的残魂。</p>
          <p>当年封印邪祟之时，共有九位大修士坐镇九大阵眼。</p>
          <p>他们肉身早已死亡。</p>
          <p>但魂魄被永远留在阵中。</p>
          <p>残卷二真正的作用：</p>
          <p>并非复活他们。</p>
          <p>而是短暂唤醒九位镇阵者的神魂。</p>
          <p>让他们再次主持九转补天阵。</p>
          <p>所以阵法抽取弟子的生命，本质上是在寻找足够庞大的力量，</p>
          <p>去点燃九盏已经熄灭的——</p>
          <p class="jade-san-juan-emphasis">镇魂灯。</p>
        </div>
      </article>
    </section>`,
  );
  document.body.classList.add("is-modal-open");
  root.querySelector("[data-close-san-juan]")?.focus();
}

function openSiJuanDetail() {
  const root = getJadeModalRoot();
  if (root.querySelector("[data-si-juan-overlay]")) return;

  root.insertAdjacentHTML(
    "beforeend",
    `<section class="jade-gazette-overlay" data-si-juan-overlay>
      <article class="paper-panel jade-gazette-modal jade-san-juan-modal" role="dialog" aria-modal="true" aria-labelledby="jade-si-juan-title">
        <button type="button" class="jade-gazette-close" data-close-si-juan aria-label="关闭残卷">×</button>
        <p class="panel-kicker">九转补天阵残卷 · 第四卷</p>
        <h2 id="jade-si-juan-title">残卷四 · 镇邪篇</h2>
        <p class="jade-san-juan-subtitle">【镇厄天书】</p>
        <div class="jade-san-juan-body">
          <p>如果说残卷三是"牢笼"，</p>
          <p>那么残卷四就是——</p>
          <p class="jade-san-juan-emphasis">锁链。</p>
          <p>卷首没有任何阵图。</p>
          <p>只有一幅已经模糊不清的古画。</p>
          <p>画中：</p>
          <p>九位修士跪坐九方。</p>
          <p>中央是一团无法描绘形状的黑影。</p>
          <p>黑影之上插着九柄古剑。</p>
          <p>旁边只有四个字：</p>
          <p class="jade-san-juan-emphasis">不可直视。</p>
          <h4>残卷四记载</h4>
          <p>上古邪祟没有真正意义上的肉身。</p>
          <p>它会寄生于：</p>
          <p>恐惧、欲望、执念与记忆。</p>
          <p>所以普通封印无法困住它。</p>
          <p>即使肉身被毁，</p>
          <p>只要还有人记得它，</p>
          <p>它便有重新归来的可能。</p>
          <p>于是九转补天阵第四层的作用是：</p>
          <p class="jade-san-juan-emphasis">【镇名】</p>
          <p>抹去邪祟的"名字"。</p>
          <p class="jade-san-juan-emphasis">【镇形】</p>
          <p>让世间无人能够记住它真正的模样。</p>
          <p class="jade-san-juan-emphasis">【镇魂】</p>
          <p>压制邪祟意识。</p>
          <p class="jade-san-juan-emphasis">【镇念】</p>
          <p>阻止邪祟进入人的梦境。</p>
          <p class="jade-san-juan-emphasis">【镇因果】</p>
          <p>让所有与邪祟有关的历史逐渐消失。</p>
        </div>
      </article>
    </section>`,
  );
  document.body.classList.add("is-modal-open");
  root.querySelector("[data-close-si-juan]")?.focus();
}

function openRemnantImageDetail(imageSrc, title) {
  const root = getJadeModalRoot();
  if (root.querySelector("[data-remnant-image-overlay]")) return;

  root.insertAdjacentHTML(
    "beforeend",
    `<section class="jade-gazette-overlay" data-remnant-image-overlay>
      <article class="paper-panel jade-gazette-modal jade-remnant-image-modal" role="dialog" aria-modal="true" aria-labelledby="jade-remnant-image-title">
        <button type="button" class="jade-gazette-close" data-close-remnant-image aria-label="关闭阵法图">×</button>
        <p class="panel-kicker">九转补天阵残卷 · 阵法图</p>
        <h2 id="jade-remnant-image-title">${escapeHtml(title)}</h2>
        <figure class="jade-remnant-image-figure">
          <img src="${escapeHtml(imageSrc)}" alt="${escapeHtml(title)}" />
        </figure>
      </article>
    </section>`,
  );
  document.body.classList.add("is-modal-open");
  root.querySelector("[data-close-remnant-image]")?.focus();
}

function hasAllFourRemnants() {
  return (
    localStorage.getItem(KCY_NINE_TURN_REMNANT_ONE_STORAGE_KEY) === "true" &&
    localStorage.getItem(REMNANT_TWO_OLDWELL_CLAIMED_KEY) === "true" &&
    localStorage.getItem(SAN_JUAN_CLAIMED_KEY) === "true" &&
    localStorage.getItem(SI_JUAN_CLAIMED_KEY) === "true"
  );
}

function isPuzzleCompleted() {
  return localStorage.getItem(REMNANT_PUZZLE_COMPLETED_KEY) === "true";
}

function shufflePuzzlePieces() {
  const shuffled = [...remnantPuzzlePieces];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function openRemnantPuzzle() {
  if (isPuzzleCompleted()) {
    return;
  }
  if (!hasAllFourRemnants()) {
    return;
  }
  const root = getJadeModalRoot();
  if (root.querySelector("[data-remnant-puzzle-overlay]")) return;

  puzzleState = {
    placed: {},
    shuffled: shufflePuzzlePieces(),
    dragging: null,
  };

  root.insertAdjacentHTML(
    "beforeend",
    `<section class="jade-gazette-overlay remnant-puzzle-overlay" data-remnant-puzzle-overlay>
      <article class="paper-panel jade-gazette-modal remnant-puzzle-modal" role="dialog" aria-modal="true" aria-labelledby="remnant-puzzle-title">
        <button type="button" class="jade-gazette-close" data-close-remnant-puzzle aria-label="关闭拼图">×</button>
        <p class="panel-kicker">九转补天阵 · 残卷拼合</p>
        <h2 id="remnant-puzzle-title">四卷归位</h2>
        <p class="remnant-puzzle-hint">拖拽下方残卷阵法图至正确位置，阵纹相接方可成图。</p>
        <div class="remnant-puzzle-board" data-puzzle-board>
          <div class="puzzle-slot" data-slot="top-left"></div>
          <div class="puzzle-slot" data-slot="top-right"></div>
          <div class="puzzle-slot" data-slot="bottom-left"></div>
          <div class="puzzle-slot" data-slot="bottom-right"></div>
        </div>
        <div class="remnant-puzzle-tray" data-puzzle-tray></div>
        <div class="remnant-puzzle-complete" data-puzzle-complete hidden>
          <h3>四卷归位</h3>
          <p>残缺的阵纹彼此相接，一幅完整阵图终于显现。</p>
          <button type="button" class="jade-gazette-read" data-puzzle-claim>收取阵图</button>
        </div>
      </article>
    </section>`,
  );
  document.body.classList.add("is-modal-open");
  renderPuzzleTray();
  setupPuzzleDrag();
  root.querySelector("[data-close-remnant-puzzle]")?.focus();
}

function renderPuzzleTray() {
  const tray = document.querySelector("[data-puzzle-tray]");
  if (!tray) return;
  const unplaced = puzzleState.shuffled.filter(
    (piece) => !Object.values(puzzleState.placed).includes(piece.id),
  );
  tray.innerHTML = unplaced
    .map(
      (piece) => `
        <div class="puzzle-piece" draggable="true" data-piece-id="${piece.id}" data-piece-image="${escapeHtml(piece.image)}" data-piece-name="${escapeHtml(piece.name)}">
          <img src="${escapeHtml(piece.image)}" alt="${escapeHtml(piece.name)}阵法图" />
        </div>
      `,
    )
    .join("");
}

function renderPlacedPieces() {
  document.querySelectorAll(".puzzle-slot").forEach((slot) => {
    const slotId = slot.getAttribute("data-slot");
    const pieceId = puzzleState.placed[slotId];
    if (pieceId) {
      const piece = remnantPuzzlePieces.find((p) => p.id === pieceId);
      if (piece) {
        slot.innerHTML = `<img src="${escapeHtml(piece.image)}" alt="${escapeHtml(piece.name)}阵法图" class="puzzle-placed-image" />`;
        slot.classList.add("is-filled");
      }
    } else {
      slot.innerHTML = "";
      slot.classList.remove("is-filled");
    }
  });
}

function setupPuzzleDrag() {
  const pieces = document.querySelectorAll(".puzzle-piece");
  const slots = document.querySelectorAll(".puzzle-slot");

  pieces.forEach((piece) => {
    piece.addEventListener("dragstart", (e) => {
      puzzleState.dragging = piece.getAttribute("data-piece-id");
      e.dataTransfer.effectAllowed = "move";
      piece.classList.add("is-dragging");
    });
    piece.addEventListener("dragend", () => {
      piece.classList.remove("is-dragging");
      puzzleState.dragging = null;
    });
    piece.addEventListener("touchstart", (e) => {
      puzzleState.dragging = piece.getAttribute("data-piece-id");
      piece.classList.add("is-dragging");
      const touch = e.touches[0];
      const ghost = piece.cloneNode(true);
      ghost.style.position = "fixed";
      ghost.style.pointerEvents = "none";
      ghost.style.zIndex = "9999";
      ghost.style.opacity = "0.8";
      ghost.style.width = piece.offsetWidth + "px";
      ghost.style.left = touch.clientX - piece.offsetWidth / 2 + "px";
      ghost.style.top = touch.clientY - piece.offsetHeight / 2 + "px";
      ghost.setAttribute("data-touch-ghost", "");
      document.body.appendChild(ghost);
    });
    piece.addEventListener("touchmove", (e) => {
      e.preventDefault();
      const touch = e.touches[0];
      const ghost = document.querySelector("[data-touch-ghost]");
      if (ghost) {
        ghost.style.left = touch.clientX - ghost.offsetWidth / 2 + "px";
        ghost.style.top = touch.clientY - ghost.offsetHeight / 2 + "px";
      }
    });
    piece.addEventListener("touchend", (e) => {
      piece.classList.remove("is-dragging");
      const ghost = document.querySelector("[data-touch-ghost]");
      if (ghost) {
        const touch = e.changedTouches[0];
        const elementBelow = document.elementFromPoint(touch.clientX, touch.clientY);
        const slot = elementBelow?.closest(".puzzle-slot");
        ghost.remove();
        if (slot) {
          handlePieceDrop(slot.getAttribute("data-slot"));
        }
      }
      puzzleState.dragging = null;
    });
  });

  slots.forEach((slot) => {
    slot.addEventListener("dragover", (e) => {
      e.preventDefault();
      e.dataTransfer.dropEffect = "move";
      slot.classList.add("is-drag-over");
    });
    slot.addEventListener("dragleave", () => {
      slot.classList.remove("is-drag-over");
    });
    slot.addEventListener("drop", (e) => {
      e.preventDefault();
      slot.classList.remove("is-drag-over");
      handlePieceDrop(slot.getAttribute("data-slot"));
    });
  });
}

function handlePieceDrop(slotId) {
  const pieceId = puzzleState.dragging;
  if (!pieceId || !slotId) return;
  if (puzzleState.placed[slotId]) return;

  const piece = remnantPuzzlePieces.find((p) => p.id === pieceId);
  if (!piece) return;

  if (piece.correctSlot === slotId) {
    puzzleState.placed[slotId] = pieceId;
    renderPlacedPieces();
    renderPuzzleTray();
    setupPuzzleDrag();
    const slot = document.querySelector(`[data-slot="${slotId}"]`);
    if (slot) {
      slot.classList.add("is-correct");
      window.setTimeout(() => slot.classList.remove("is-correct"), 600);
    }
    checkPuzzleComplete();
  }
}

function checkPuzzleComplete() {
  const allPlaced = remnantPuzzlePieces.every((piece) => puzzleState.placed[piece.correctSlot] === piece.id);
  if (allPlaced) {
    onPuzzleComplete();
  }
}

function onPuzzleComplete() {
  const board = document.querySelector("[data-puzzle-board]");
  const tray = document.querySelector("[data-puzzle-tray]");
  const complete = document.querySelector("[data-puzzle-complete]");
  if (board) {
    board.classList.add("is-complete");
  }
  if (tray) {
    tray.hidden = true;
  }
  window.setTimeout(() => {
    if (complete) {
      complete.hidden = false;
    }
  }, 1200);
}

function claimPuzzleReward() {
  localStorage.setItem(REMNANT_PUZZLE_COMPLETED_KEY, "true");
  localStorage.removeItem(KCY_NINE_TURN_REMNANT_ONE_STORAGE_KEY);
  localStorage.removeItem(REMNANT_TWO_OLDWELL_CLAIMED_KEY);
  localStorage.removeItem(SAN_JUAN_CLAIMED_KEY);
  localStorage.removeItem(SI_JUAN_CLAIMED_KEY);
  closeRemnantPuzzle();
  const inventoryOverlay = document.querySelector("[data-jade-modal-overlay]");
  if (inventoryOverlay) {
    openJadeInventory("complete-formation");
  }
}

function closeRemnantPuzzle() {
  document.querySelector("[data-remnant-puzzle-overlay]")?.remove();
  document.body.classList.remove("is-modal-open");
}

function openHuaiyinGazette() {
  const root = getJadeModalRoot();
  if (root.querySelector("[data-gazette-overlay]")) return;
  const paragraphs = HUAIYIN_GAZETTE_TEXT
    .split("\\n\\n")
    .map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`)
    .join("");
  root.insertAdjacentHTML(
    "beforeend",
    `<section class="jade-gazette-overlay" data-gazette-overlay>
      <article class="paper-panel jade-gazette-modal" role="dialog" aria-modal="true" aria-labelledby="jade-gazette-title">
        <button type="button" class="jade-gazette-close" data-close-gazette aria-label="关闭卷志">×</button>
        <p class="panel-kicker">藏经阁借阅本 · 槐阴渡旧志</p>
        <h2 id="jade-gazette-title">《槐阴渡地方志》</h2>
        <div class="jade-gazette-text">${paragraphs}</div>
      </article>
    </section>`,
  );
}

function renderPharmacyDiaryText(text) {
  return escapeHtml(text)
    .replace(/在问心岭的石碑后面/g, '<span style="color:#c0392b;font-weight:700;">在问心岭的石碑后面</span>')
    .replace(/拆进了一首旧诗里/g, '<span style="color:#c0392b;font-weight:700;">拆进了一首旧诗里</span>');
}

function openPharmacyDiary() {
  const root = getJadeModalRoot();
  if (root.querySelector("[data-pharmacy-diary-overlay]")) return;
  const entries = JADE_PHARMACY_DIARY_ENTRIES.map(
    (entry, index) => {
      const restoredDiaryText = "\u4e0d\u5bf9\u52b2\u3002\u7384\u6fef\u4e0d\u5bf9\u52b2\u3002\u4e0d\u5bf9\uff0c\u4e0d\u5bf9\u4e0d\u5bf9\u4e0d\u5bf9\u2026\u2026\u4ed6\u77e5\u9053\u6211\u5fd8\u4e86\u4ec0\u4e48\u3002\u4ed6\u95ee\u6211\u77f3\u7891\u540e\u9762\u85cf\u4e86\u4ec0\u4e48\uff0c\u6211\u8bf4\u6ca1\u6709\uff0c\u4ed6\u5374\u7b11\u4e86\u3002\u836f\u67dc\u4e0b\u9762\u7684\u6697\u683c\u4e0d\u80fd\u518d\u653e\u4e86\uff0c\u82e5\u6709\u4eba\u770b\u89c1\uff0c\u4fbf\u628a\u8fd9\u672c\u4e5f\u62ff\u8d70\u3002\u6e29\u5e08\u59b9\uff0c\u82e5\u4f60\u771f\u7684\u8bfb\u5230\u8fd9\u91cc\uff0c\u4e0d\u8981\u53bb\u884c\u7167\u5802\uff0c\u4e0d\u8981\u76f8\u4fe1\u4ed6\u8bf4\u7684\u6bcf\u4e00\u53e5\u8bdd\u3002\u7384\u6fef\u2026\u2026\u7384\u6fef\u4e0d\u662f\u2014\u2014";
      const diaryText = index === 3
        ? "不对劲。玄濯不对劲。不对，不对不对不对……他知道我忘了什么。他问我石碑后面藏了什么，我说没有，他却笑了。药柜下面的暗格不能再放了，若有人看见，便把这本也拿走。温师妹，若你真的读到这里，不要去行照堂，不要相信他说的每一句话。玄濯……玄濯不是——"
        : entry.text;
      const displayedText = false && index === 3
        ? "████㚯鍵軻 ꬁվնk口⃢ 蟬𰻝 ���烫屯?锟斤拷拵攫 �ԙԗ 〤𰻞ꙝ�� ѭį??7gǁ ��Ѭԙ〥դѾ烫屯?〩 ���〥𰻞 不对不对不对 玄濯不对 ���"
        : entry.text;
      return `<article class="jade-diary-entry-card ${index === 3 ? "is-disturbed" : ""}">
      <p class="panel-kicker">${escapeHtml(entry.time)}</p>
      <h3>${escapeHtml(entry.title)}</h3>
      ${false && index === 3
        ? `<div class="jade-diary-glitch-columns" aria-label="异常乱码记录">${Array.from({ length: 8 }, (_, column) => `<span class="jade-diary-glitch-column" style="--column:${column}">${escapeHtml(`${JADE_DIARY_GLITCH_TEXTURE}${JADE_DIARY_GLITCH_COLUMN.slice(column * 9, column * 9 + 34)}`)}</span>`).join("")}</div>`
        : `<p>${renderPharmacyDiaryText(index === 3 ? restoredDiaryText : diaryText)}</p>`}
      ${index === 3 ? `<div class="jade-diary-auto-type" data-pharmacy-diary-auto-type aria-live="off"></div>` : ""}
    </article>`;
    },
  ).join("");
  root.insertAdjacentHTML(
    "beforeend",
    `<section class="jade-gazette-overlay" data-pharmacy-diary-overlay>
      <article class="paper-panel jade-gazette-modal jade-pharmacy-diary-modal" role="dialog" aria-modal="true" aria-labelledby="jade-pharmacy-diary-title">
        <button type="button" class="jade-gazette-close" data-close-pharmacy-diary aria-label="关闭药堂日记">×</button>
        <p class="panel-kicker">茯苓药柜暗格 · 白蘅旧日记</p>
        <h2 id="jade-pharmacy-diary-title">药堂日记</h2>
        <div class="jade-diary-entry-list">${entries}</div>
      </article>
    </section>`,
  );

  setupPharmacyDiaryTyping(root.querySelector("[data-pharmacy-diary-overlay]"));
}

function stopPharmacyDiaryTyping() {
  if (pharmacyDiaryTypingTimer !== null) {
    clearInterval(pharmacyDiaryTypingTimer);
    pharmacyDiaryTypingTimer = null;
  }

  if (pharmacyDiaryScrollTarget && pharmacyDiaryScrollHandler) {
    pharmacyDiaryScrollTarget.removeEventListener("scroll", pharmacyDiaryScrollHandler);
  }

  pharmacyDiaryScrollTarget = null;
  pharmacyDiaryScrollHandler = null;
}

function setupPharmacyDiaryTyping(overlay) {
  stopPharmacyDiaryTyping();
  if (!overlay) return;

  const modal = overlay.querySelector(".jade-pharmacy-diary-modal");
  const output = overlay.querySelector("[data-pharmacy-diary-auto-type]");
  if (!modal || !output) return;
  let shouldFollowTyping = true;

  const startTyping = () => {
    if (pharmacyDiaryTypingTimer !== null) return;

    output.classList.add("is-typing");
    let characterIndex = 0;
    pharmacyDiaryTypingTimer = window.setInterval(() => {
      if (!output.isConnected) {
        stopPharmacyDiaryTyping();
        return;
      }

      const fragment = document.createElement("span");
      fragment.textContent = characterIndex % 2 === 0 ? "不" : "对 ";
      output.append(fragment);
      characterIndex += 1;
      if (shouldFollowTyping) modal.scrollTop = modal.scrollHeight;
    }, 170);
  };

  pharmacyDiaryScrollHandler = () => {
    const distanceFromBottom = modal.scrollHeight - modal.scrollTop - modal.clientHeight;
    shouldFollowTyping = distanceFromBottom <= 12;
    if (shouldFollowTyping) startTyping();
  };
  pharmacyDiaryScrollTarget = modal;
  modal.addEventListener("scroll", pharmacyDiaryScrollHandler, { passive: true });
}

function renderJadeInventory(activeItemId = "") {
  const inventorySlots = getJadeInventorySlots();
  const activeItem = inventorySlots.find((item) => item?.id === activeItemId) ?? inventorySlots.find(Boolean);
  const registeredCount = inventorySlots.filter(Boolean).length;
  const isElder = getActiveAccount() === "lxz";
  const inventoryKicker = isElder ? "旧内门长老 · 随身收纳" : "空翠院乙四十九 · 随身收纳";
  const inventoryTitle = isElder ? "陆行舟的个人物品" : "温照夜的个人物品";
  const inventorySubtitle = isElder
    ? `玉牒编号XZ000 · 已登记 ${String(registeredCount).padStart(2, "0")} / 01`
    : `玉牒编号KCY49 · 已登记 ${String(registeredCount).padStart(2, "0")} / 08`;

  return `
    <section class="jade-inventory-overlay" data-jade-modal-overlay aria-labelledby="jade-inventory-title">
      <article class="paper-panel jade-inventory-modal" role="dialog" aria-modal="true">
        <header class="jade-inventory-header">
          <div>
            <p class="panel-kicker">${inventoryKicker}</p>
            <h1 id="jade-inventory-title">${inventoryTitle}</h1>
            <p class="jade-inventory-subtitle">${inventorySubtitle}</p>
          </div>
          <button type="button" class="jade-inventory-close" data-close-jade-modal aria-label="关闭个人物品">×</button>
        </header>

        <div class="jade-inventory-layout">
          <section class="jade-inventory-bag" aria-label="背包物品格">
            <div class="jade-inventory-bag-heading">
              <div>
                <span>随身布囊</span>
                <strong>物品格</strong>
              </div>
              <small>点击物品查验详情</small>
            </div>
            <div class="jade-inventory-grid">
              ${inventorySlots
                .map((item, index) =>
                  item ? renderJadeInventorySlot(item, index, activeItem.id) : renderJadeInventoryEmptySlot(index)
                )
                .join("")}
            </div>
          </section>

          <section class="jade-inventory-detail" data-inventory-detail aria-live="polite">
            ${renderJadeInventoryDetail(activeItem)}
          </section>
        </div>
      </article>
    </section>
  `;
}

function openJadeInventory(activeItemId = "") {
  const root = getJadeModalRoot();
  root.innerHTML = renderJadeInventory(activeItemId);
  document.body.classList.add("is-modal-open");
  root.querySelector("[data-close-jade-modal]")?.focus();
}

function selectJadeInventoryItem(itemId) {
  const item = getJadeInventorySlots().find((entry) => entry?.id === itemId);
  const detail = document.querySelector("[data-inventory-detail]");

  if (!item || !(detail instanceof HTMLElement)) {
    return;
  }

  document.querySelectorAll("[data-inventory-item]").forEach((slot) => {
    const isActive = slot instanceof HTMLElement && slot.dataset.inventoryItem === item.id;
    slot.classList.toggle("is-active", isActive);
    slot.setAttribute("aria-pressed", String(isActive));
  });

  detail.innerHTML = renderJadeInventoryDetail(item);
}

function openJadeDossier() {
  const root = getJadeModalRoot();
  root.innerHTML = renderJadeDossier(getActiveAccount() === "lxz" ? elderDossier : wenDossier);
  document.body.classList.add("is-modal-open");
  root.querySelector("[data-close-jade-dossier]")?.focus();
}

function closeJadeDossier() {
  closeJadeModal();
}

function openJadeMessageThread(contactId = "") {
  const threads = getJadeMessageThreads();
  const isElder = getActiveAccount() === "lxz";

  if (contactId && threads.some((thread) => thread.id === contactId)) {
    activeJadeMessageThreadId = contactId;
  } else if (!isElder) {
    activeJadeMessageThreadId = threads[0]?.id ?? "";
  } else {
    activeJadeMessageThreadId = "";
  }
  visibleJadeMessageCount = 0;
  localStorage.setItem(JADE_MESSAGE_VIEWED_STORAGE_KEY, "true");

  if (getActiveAccount() === "lxz" && activeJadeMessageThreadId === "wen-zhaoye-elder") {
    localStorage.setItem(ELDER_WEN_MESSAGE_VIEWED_STORAGE_KEY, "true");
    localStorage.setItem("qingdeng-weigui:map-two-unlocked", "true");
  }

  const root = getJadeModalRoot();
  root.innerHTML = renderJadeMessageThread();
  document.body.classList.add("is-modal-open");
  bindJadeChatInput();
}

function selectJadeMessageContact(contactId) {
  if (!getJadeMessageThreads().some((thread) => thread.id === contactId)) {
    return;
  }

  activeJadeMessageThreadId = contactId;
  visibleJadeMessageCount = 0;

  if (getActiveAccount() === "lxz" && activeJadeMessageThreadId === "wen-zhaoye-elder") {
    localStorage.setItem(ELDER_WEN_MESSAGE_VIEWED_STORAGE_KEY, "true");
    localStorage.setItem("qingdeng-weigui:map-two-unlocked", "true");
  }

  const root = getJadeModalRoot();
  root.innerHTML = renderJadeMessageThread();
  root.querySelector(`[data-jade-message-contact="${CSS.escape(contactId)}"]`)?.focus();
  bindJadeChatInput();
}

function readStoredStringSet(storageKey) {
  try {
    const parsed = JSON.parse(localStorage.getItem(storageKey) ?? "[]");
    return new Set(Array.isArray(parsed) ? parsed.filter((item) => typeof item === "string") : []);
  } catch {
    return new Set();
  }
}

function getDiscoveredDiaryKeywords() {
  const discovered = readStoredStringSet(SEARCHED_KEYWORDS_STORAGE_KEY);
  const visited = readStoredStringSet(VISITED_PAGES_STORAGE_KEY);

  // Visited-page migration preserves searches made before keyword history existed.
  for (const pageId of visited) {
    const keyword = diaryVisitedKeywordMap[pageId];

    if (keyword) {
      discovered.add(keyword);
    }
  }

  return discovered;
}

function getDiaryUnlockState(entry, discovered = getDiscoveredDiaryKeywords()) {
  if (entry.alwaysUnlocked) {
    return { unlocked: true, matchedCount: entry.keywords?.length ?? 0, requiredCount: 0 };
  }

  const matchedCount = entry.keywords.filter((keyword) => discovered.has(keyword)).length;
  const requiredCount = entry.requiredCount ?? 1;

  return {
    unlocked: matchedCount >= requiredCount,
    matchedCount,
    requiredCount,
  };
}

function openJadeDiary(activeEntryId = "") {
  const root = getJadeModalRoot();
  root.innerHTML = renderJadeDiary(activeEntryId);
  document.body.classList.add("is-modal-open");
  root.querySelector("[data-close-jade-modal]")?.focus();
}

function refreshOpenJadeDiary() {
  const overlay = document.querySelector("[data-jade-diary-overlay]");

  if (!(overlay instanceof HTMLElement)) {
    return;
  }

  const activeEntryId = overlay.dataset.activeDiaryId ?? "";
  const root = getJadeModalRoot();
  root.innerHTML = renderJadeDiary(activeEntryId);
}

function showJadeDiaryLockHint(entry) {
  const hint = document.querySelector("[data-jade-diary-hint]");

  if (!(hint instanceof HTMLElement)) {
    return;
  }

  clearTimeout(jadeDiaryHintTimer);
  hint.textContent = entry.hint;
  hint.classList.add("is-visible");

  jadeDiaryHintTimer = window.setTimeout(() => {
    hint.classList.remove("is-visible");
  }, 3200);
}

function showJadeDiaryRedPage(title = "日记残页", plainRed = false) {
  if (document.querySelector("[data-jade-diary-red-page]")) {
    return;
  }

  getJadeModalRoot().insertAdjacentHTML(
    "beforeend",
    `
      <button
        type="button"
        class="jade-diary-red-page${plainRed ? " is-plain-red" : ""}"
        data-jade-diary-red-page
        aria-label="${plainRed ? "异常页面" : "查看日记残页"}"
      >
        ${plainRed ? "" : `<span class="jade-diary-corrupt-wall" aria-hidden="true">${"去死".repeat(20000)}</span>`}
        ${plainRed || !title ? "" : `<span class="jade-diary-corrupt-title" aria-hidden="true">我看<span class="is-upside-down">见</span>你<span class="is-upside-down">了</span></span>`}
      </button>
    `,
  );
  document.body.classList.add("is-diary-red");
  document.querySelector("[data-jade-diary-red-page]")?.focus();
}

function revealJadeDiaryRedPage() {
  const page = document.querySelector("[data-jade-diary-red-page]");

  if (!(page instanceof HTMLElement) || page.classList.contains("is-revealed")) {
    return false;
  }

  page.classList.add("is-revealed");
  page.setAttribute("aria-label", "日记残页已显现，再次点击可收起");
  return true;
}

function closeJadeDiaryRedPage() {
  document.querySelector("[data-jade-diary-red-page]")?.remove();
  document.body.classList.remove("is-diary-red");
  document.querySelector('[data-diary-entry="diary-6"]')?.focus();
}

function renderJadeDiary(activeEntryId = "") {
  const discovered = getDiscoveredDiaryKeywords();
  const entries = getDiaryEntries();
  const isElder = getActiveAccount() === "lxz";
  const diaryTitle = isElder ? "陆行舟的日记" : "温照夜的日记";
  const diaryKicker = isElder ? "长老私记 · 封页待启" : "弟子私记 · 封页待启";
  const diarySubtitle = isElder
    ? `玉牒编号XZ000 · 已解封 ${entries.filter((e) => !e.corrupt && getDiaryUnlockState(e, discovered).unlocked).length} / ${entries.length}`
    : `玉牒编号KCY49 · 已解封 ${entries.filter((e) => !e.corrupt && getDiaryUnlockState(e, discovered).unlocked).length} / 5`;
  const activeEntry = entries.find((entry) => entry.id === activeEntryId);
  const activeState = activeEntry ? getDiaryUnlockState(activeEntry, discovered) : null;

  if (activeEntry && activeState?.unlocked && !activeEntry.corrupt) {
    return renderJadeDiaryDetail(activeEntry);
  }

  const unlockedCount = entries.filter(
    (entry) => !entry.corrupt && getDiaryUnlockState(entry, discovered).unlocked,
  ).length;

  return `
    <section class="jade-diary-overlay" data-jade-diary-overlay data-active-diary-id="">
      <article class="paper-panel jade-diary-modal" role="dialog" aria-modal="true" aria-labelledby="jade-diary-title">
        <header class="jade-diary-header">
          <div>
            <p class="panel-kicker">${diaryKicker}</p>
            <h1 id="jade-diary-title">${diaryTitle}</h1>
            <p class="jade-diary-subtitle">${diarySubtitle}</p>
          </div>
          <button type="button" class="jade-diary-close" data-close-jade-modal aria-label="关闭日记">×</button>
        </header>

        <p class="jade-diary-intro">${JADE_DIARY_LOCK_HINT}</p>

        <div class="jade-diary-grid">
          ${entries.map((entry, index) => renderJadeDiaryCard(entry, index, discovered)).join("")}
        </div>

        <p class="jade-diary-lock-hint" data-jade-diary-hint role="status" aria-live="polite"></p>
      </article>
    </section>
  `;
}

function renderJadeDiaryCard(entry, index, discovered) {
  const unlockState = getDiaryUnlockState(entry, discovered);
  const stateClass = entry.corrupt ? "is-corrupt" : unlockState.unlocked ? "is-unlocked" : "is-locked";
  const stateLabel = entry.corrupt
    ? "可阅"
    : unlockState.unlocked
      ? "已解封"
      : entry.requiredCount
        ? `封印 ${unlockState.matchedCount}/${unlockState.requiredCount}`
        : "封印中";

  return `
    <button type="button" class="jade-diary-card ${stateClass}" data-diary-entry="${escapeHtml(entry.id)}" aria-label="${escapeHtml(
      `${entry.title}，${stateLabel}`,
    )}">
      <span class="jade-diary-number">${String(index + 1).padStart(2, "0")}</span>
      <span class="jade-diary-card-copy">
        <strong>${escapeHtml(entry.title)}</strong>
        <time>${escapeHtml(entry.time)}</time>
        <small>${escapeHtml(
          unlockState.unlocked ? (entry.corrupt ? "残页无字" : "点击展卷") : JADE_DIARY_LOCK_HINT,
        )}</small>
      </span>
      <span class="jade-diary-state">${escapeHtml(stateLabel)}</span>
    </button>
  `;
}

function renderJadeDiaryDetail(entry) {
  const isElder = getActiveAccount() === "lxz";
  const detailKicker = isElder ? "陆行舟手记 · 已解封" : "温照夜手记 · 已解封";
  return `
    <section class="jade-diary-overlay" data-jade-diary-overlay data-active-diary-id="${escapeHtml(entry.id)}">
      <article class="paper-panel jade-diary-modal is-detail" role="dialog" aria-modal="true" aria-labelledby="jade-diary-detail-title">
        <header class="jade-diary-header">
          <div>
            <p class="panel-kicker">${detailKicker}</p>
            <h1 id="jade-diary-detail-title">${escapeHtml(entry.title)}</h1>
            <p class="jade-diary-subtitle">${escapeHtml(entry.time)}</p>
          </div>
          <button type="button" class="jade-diary-close" data-close-jade-modal aria-label="关闭日记">×</button>
        </header>

        <section class="jade-diary-paper">
          ${entry.content.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join("")}
        </section>

        <button type="button" class="jade-diary-back" data-diary-back>返回日记目录</button>
      </article>
    </section>
  `;
}

function advanceJadeMessageThread() {
  const modal = document.querySelector(".jade-chat-modal");
  const thread = document.querySelector(".jade-chat-thread");
  const activeThread = getActiveJadeMessageThread();

  if (!modal || !thread || visibleJadeMessageCount >= activeThread.messages.length) {
    return;
  }

  const nextMessage = activeThread.messages[visibleJadeMessageCount];
  visibleJadeMessageCount += 1;

  thread.querySelector(".jade-chat-empty")?.remove();
  thread.insertAdjacentHTML("beforeend", renderJadeChatMessage(nextMessage));

  const isComplete = visibleJadeMessageCount >= activeThread.messages.length;
  const advanceButton = document.querySelector(".jade-chat-advance");

  thread.setAttribute("aria-label", isComplete ? "回函已全部展开" : "点击查看下一条回函");

  if (advanceButton) {
    advanceButton.textContent = isComplete ? "回函已尽" : "下一条回函";
  }
}

function playElderWenChat() {
  const thread = document.querySelector(".jade-chat-thread");
  const activeThread = getActiveJadeMessageThread();

  if (!thread || !activeThread || activeThread.id !== "wen-zhaoye-elder") {
    return;
  }

  thread.classList.remove("is-elder-wen-pending");
  thread.removeAttribute("data-elder-wen-trigger");
  thread.querySelector(".jade-chat-elder-hint")?.remove();

  const remainingMessages = activeThread.messages.slice(2);
  let index = 0;

  const showNext = () => {
    if (index >= remainingMessages.length) {
      localStorage.setItem(ELDER_WEN_CHAT_PLAYED_KEY, "true");
      return;
    }
    const msg = remainingMessages[index];
    thread.insertAdjacentHTML("beforeend", renderJadeChatMessage(msg));
    thread.scrollTop = thread.scrollHeight;
    index += 1;
    setTimeout(showNext, 900);
  };

  setTimeout(showNext, 400);
}

function renderJadeDossier(dossier = wenDossier) {
  return `
    <section class="jade-dossier-overlay" data-jade-dossier-overlay>
      <article class="paper-panel jade-dossier-modal" role="dialog" aria-modal="true" aria-labelledby="jade-dossier-title">
        <header class="jade-dossier-header">
          <div>
            <p class="panel-kicker">弟子私档 · 玉牒调阅</p>
            <h1 id="jade-dossier-title">${escapeHtml(dossier.title)}</h1>
            <p class="jade-dossier-subtitle">${escapeHtml(dossier.subtitle)}</p>
          </div>
            <span class="jade-dossier-stamp">${escapeHtml(dossier.stamp)}</span>
        </header>

        <section class="jade-dossier-section" aria-labelledby="jade-dossier-basic">
          <h2 id="jade-dossier-basic">基础信息</h2>
          <dl class="jade-dossier-meta">
            ${dossier.basics
              .map(
                ([label, value, isAlert]) => `
                  <div>
                    <dt>${escapeHtml(label)}</dt>
                    <dd>${isAlert ? `<span class="jade-dossier-alert">${escapeHtml(value)}</span>` : escapeHtml(value)}</dd>
                  </div>
                `,
              )
              .join("")}
          </dl>
        </section>

        <section class="jade-dossier-section" aria-labelledby="jade-dossier-cultivation">
          <h2 id="jade-dossier-cultivation">修行记录</h2>
          <div class="jade-dossier-timeline">
            ${dossier.cultivation
              .map(
                ([date, text]) => `
                  <article class="jade-dossier-timeline-item">
                    <time>${escapeHtml(date)}</time>
                    <p>${escapeHtml(text)}</p>
                  </article>
                `,
              )
              .join("")}
          </div>
        </section>

        <section class="jade-dossier-section" aria-labelledby="jade-dossier-comment">
          <h2 id="jade-dossier-comment">执事评语</h2>
          ${dossier.comments.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join("")}
          <div class="jade-dossier-note">
            <strong>外门执事批注：</strong>
            <p class="jade-dossier-alert">${escapeHtml(dossier.stewardNote)}</p>
          </div>
        </section>

        <button type="button" class="jade-dossier-close" data-close-jade-dossier>收起宗卷</button>
      </article>
    </section>
  `;
}

const ELDER_WEN_CHAT_PLAYED_KEY = "qingdeng-weigui:elder-wen-chat-played";

function renderJadeMessageThread() {
  const activeThread = getActiveJadeMessageThread();
  const messageThreads = getJadeMessageThreads();
  const isElder = getActiveAccount() === "lxz";
  const isElderWenChat = isElder && activeThread?.id === "wen-zhaoye-elder";
  const elderWenPlayed = localStorage.getItem(ELDER_WEN_CHAT_PLAYED_KEY) === "true";

  if (!activeThread) {
    return `
    <section class="jade-chat-overlay" data-jade-modal-overlay>
      <article class="paper-panel jade-chat-modal" role="dialog" aria-modal="true" aria-labelledby="jade-chat-title">
        <header class="jade-chat-header">
          <div>
            <p class="panel-kicker">宗门来信 · 回函记录</p>
            <h1 id="jade-chat-title">消息回函</h1>
            <p class="jade-chat-subtitle">选择左侧联系人查阅回函</p>
          </div>
        </header>

        <div class="jade-chat-layout">
          <aside class="jade-chat-contacts" aria-label="消息联系人">
            <div class="jade-chat-contacts-heading">
              <strong>联系人</strong>
              <span>${messageThreads.length}</span>
            </div>
            <div class="jade-chat-contact-list">
              ${messageThreads
                .map(
                  (thread) => `
                    <button
                      type="button"
                      class="jade-chat-contact"
                      data-jade-message-contact="${escapeHtml(thread.id)}"
                      aria-pressed="false"
                    >
                      <span class="jade-chat-contact-avatar">${escapeHtml(thread.contactAvatar)}</span>
                      <span class="jade-chat-contact-copy">
                        <strong>${escapeHtml(thread.contactName)}</strong>
                        <small>${escapeHtml(thread.preview)}</small>
                      </span>
                      <time>${escapeHtml(thread.listTime)}</time>
                      ${thread.unread ? '<i class="jade-chat-unread-dot" aria-label="未读消息"></i>' : ""}
                    </button>
                  `,
                )
                .join("")}
            </div>
          </aside>

          <section class="jade-chat-conversation jade-chat-conversation-empty" aria-label="对话区域">
            <div class="jade-chat-empty-placeholder">
              <p>选择联系人开始查阅</p>
            </div>
          </section>
        </div>
      </article>
    </section>
  `;
  }

  let visibleMessages = [...activeThread.messages];

  if (activeThread.id === "luqichen" && localStorage.getItem(LUQICHEN_SCRIPT_KEY) === "true") {
    visibleMessages = visibleMessages.concat(LUQICHEN_SCRIPT_MESSAGES);
  }

  if (activeThread.id === "luqichen" && localStorage.getItem(LUQICHEN_ZHENJUAN_KEY) === "true") {
    visibleMessages = visibleMessages.concat(LUQICHEN_ZHENJUAN_MESSAGES);
  }

  if (activeThread.id === "xuanzhuo" && localStorage.getItem(XUANZHUO_SCRIPT_KEY) === "true") {
    visibleMessages = visibleMessages.concat(XUANZHUO_SCRIPT_MESSAGES);
  }

  if (activeThread.id === "baiheng" && localStorage.getItem(BAIHENG_ZHENJUAN_KEY) === "true") {
    visibleMessages = visibleMessages.concat(BAIHENG_ZHENJUAN_MESSAGES);
  }

  if (activeThread.id === "baiheng" && localStorage.getItem(BAIHENG_JIANG_KEY) === "true") {
    visibleMessages = visibleMessages.concat(BAIHENG_JIANG_MESSAGES);
  }

  if (activeThread.id === "baiheng" && localStorage.getItem(BAIHENG_ZHENJUAN_AFTER_JIANG_KEY) === "true") {
    visibleMessages = visibleMessages.concat(BAIHENG_ZHENJUAN_AFTER_JIANG_MESSAGES);
  }

  return `
    <section class="jade-chat-overlay" data-jade-modal-overlay>
      <article class="paper-panel jade-chat-modal" role="dialog" aria-modal="true" aria-labelledby="jade-chat-title">
        <header class="jade-chat-header">
          <div>
            <p class="panel-kicker">宗门来信 · 回函记录</p>
            <h1 id="jade-chat-title">${escapeHtml(activeThread.title)}</h1>
            <p class="jade-chat-subtitle">${escapeHtml(activeThread.subtitle)}</p>
          </div>
        </header>

        <div class="jade-chat-layout">
          <aside class="jade-chat-contacts" aria-label="消息联系人">
            <div class="jade-chat-contacts-heading">
              <strong>联系人</strong>
              <span>${messageThreads.length}</span>
            </div>
            <div class="jade-chat-contact-list">
              ${messageThreads
                .map(
                  (thread) => `
                    <button
                      type="button"
                      class="jade-chat-contact ${thread.id === activeThread.id ? "is-active" : ""}"
                      data-jade-message-contact="${escapeHtml(thread.id)}"
                      aria-pressed="${thread.id === activeThread.id}"
                    >
                      <span class="jade-chat-contact-avatar">${escapeHtml(thread.contactAvatar)}</span>
                      <span class="jade-chat-contact-copy">
                        <strong>${escapeHtml(thread.contactName)}</strong>
                        <small>${escapeHtml(thread.preview)}</small>
                      </span>
                      <time>${escapeHtml(thread.listTime)}</time>
                      ${thread.unread ? '<i class="jade-chat-unread-dot" aria-label="未读消息"></i>' : ""}
                    </button>
                  `,
                )
                .join("")}
            </div>
          </aside>

          <section class="jade-chat-conversation" aria-labelledby="jade-chat-contact-title">
            <header class="jade-chat-conversation-header">
              <span class="jade-chat-conversation-avatar">${escapeHtml(activeThread.contactAvatar)}</span>
              <div>
                <h2 id="jade-chat-contact-title">${escapeHtml(activeThread.contactName)}</h2>
              </div>
            </header>

            <div
              class="jade-chat-thread ${isElderWenChat && !elderWenPlayed ? "is-elder-wen-pending" : ""}"
              ${isElderWenChat && !elderWenPlayed ? 'data-elder-wen-trigger' : ""}
              aria-label="回函全部内容"
            >
              ${
                isElderWenChat && !elderWenPlayed
                  ? visibleMessages.slice(0, 2).map(renderJadeChatMessage).join("") +
                    `<p class="jade-chat-elder-hint" data-elder-wen-trigger>点击继续查看消息</p>`
                  : visibleMessages.length
                    ? visibleMessages.map(renderJadeChatMessage).join("")
                    : `<p class="jade-chat-empty">点击信笺，逐条查阅回函。</p>`
              }
            </div>

            <div class="jade-chat-input-area">
              <input
                type="text"
                class="jade-chat-input"
                data-jade-chat-input
                placeholder="输入提示词，与${escapeHtml(activeThread.contactName)}对话"
                aria-label="输入消息"
                autocomplete="off"
              />
              <button type="button" class="jade-chat-send" data-jade-chat-send>发送</button>
            </div>

            <div class="jade-chat-actions">
              <button type="button" class="jade-chat-close" data-close-jade-modal>收起回函</button>
            </div>
          </section>
        </div>
      </article>
    </section>
  `;
}

function renderJadeChatMessage(message) {
  if (message.date) {
    return `<div class="jade-chat-date-divider"><span>${escapeHtml(message.date)}</span></div>`;
  }

  if (message.type === "image") {
    const itemId = message.itemId;
    const imageMarkup = `
      <img
        src="${escapeHtml(message.src)}"
        alt="${escapeHtml(message.alt || "")}" 
        class="jade-chat-image"
        data-chat-image-expand
      />
    `;
    if (!itemId) {
      return `
        <article class="jade-chat-row ${message.side === "self" ? "is-self" : "is-other"}">
          <div class="jade-chat-avatar" aria-hidden="true">${escapeHtml(message.avatar)}</div>
          <div class="jade-chat-body">
            <p class="jade-chat-name">${escapeHtml(message.name)}</p>
            <div class="jade-chat-image-bubble">
              ${message.href
                ? `<a class="jade-chat-image-link" data-seal-puzzle-link href="${escapeHtml(message.href)}" aria-label="打开纸鹤中的封印">${imageMarkup}</a>`
                : imageMarkup}
            </div>
          </div>
        </article>
      `;
    }
    const claimedKey = itemId === "si-juan" ? SI_JUAN_CLAIMED_KEY : SAN_JUAN_CLAIMED_KEY;
    const pickupAttr = itemId === "si-juan" ? "data-pickup-si-juan" : "data-pickup-san-juan";
    const claimed = localStorage.getItem(claimedKey) === "true";
    return `
      <article class="jade-chat-row ${message.side === "self" ? "is-self" : "is-other"}">
        <div class="jade-chat-avatar" aria-hidden="true">${escapeHtml(message.avatar)}</div>
          <div class="jade-chat-body">
            <p class="jade-chat-name">${escapeHtml(message.name)}</p>
            <div class="jade-chat-image-bubble">
            ${message.href
              ? `<a class="jade-chat-image-link" data-seal-puzzle-link href="${escapeHtml(message.href)}" aria-label="打开纸鹤中的封印">${imageMarkup}</a>`
              : imageMarkup}
            <button
              type="button"
              class="jade-chat-pickup ${claimed ? "is-claimed" : ""}"
              ${pickupAttr}
              ${claimed ? "disabled" : ""}
            >${claimed ? "已拾取" : "拾取"}</button>
          </div>
        </div>
      </article>
    `;
  }

  const bubbleContent = `<p>${escapeHtml(message.text)}</p>`;

  return `
    <article class="jade-chat-row ${message.side === "self" ? "is-self" : "is-other"}">
      <div class="jade-chat-avatar" aria-hidden="true">${escapeHtml(message.avatar)}</div>
      <div class="jade-chat-body">
        <p class="jade-chat-name">${escapeHtml(message.name)}</p>
        <div class="jade-chat-bubble">${bubbleContent}</div>
      </div>
    </article>
  `;
}

function getJadeChatReply(contactId, userText) {
  const config = jadeChatReplies[contactId];
  if (!config) return null;

  const text = userText.toLowerCase();

  for (const rule of config.rules) {
    if (rule.keywords.some((keyword) => text.includes(keyword.toLowerCase()))) {
      if (rule.condition === "jiang-triggered" && localStorage.getItem(BAIHENG_JIANG_KEY) !== "true") {
        continue;
      }
      if (rule.script) {
        return { name: config.contactName, avatar: config.contactAvatar, script: rule.script, storageKey: rule.storageKey };
      }
      return { name: config.contactName, avatar: config.contactAvatar, text: rule.reply };
    }
  }

  return { name: config.contactName, avatar: config.contactAvatar, text: config.default };
}

function sendJadeChatMessage() {
  const input = document.querySelector("[data-jade-chat-input]");
  if (!(input instanceof HTMLInputElement)) return;

  const text = input.value.trim();
  if (!text) return;

  const thread = document.querySelector(".jade-chat-thread");
  if (!thread) return;

  thread.querySelector(".jade-chat-empty")?.remove();
  thread.insertAdjacentHTML(
    "beforeend",
    renderJadeChatMessage({ side: "self", name: "温照夜", avatar: "温", text }),
  );

  input.value = "";
  thread.scrollTop = thread.scrollHeight;

  const result = getJadeChatReply(activeJadeMessageThreadId, text);
  if (!result) return;

  if (result.script) {
    if (result.storageKey) {
      localStorage.setItem(result.storageKey, "true");
    }

    result.script.forEach((msg, index) => {
      window.setTimeout(() => {
        if (!document.querySelector(".jade-chat-thread")) return;
        thread.insertAdjacentHTML("beforeend", renderJadeChatMessage(msg));
        thread.scrollTop = thread.scrollHeight;
      }, 800 * (index + 1));
    });
    return;
  }

  window.setTimeout(() => {
    if (!document.querySelector(".jade-chat-thread")) return;
    thread.insertAdjacentHTML(
      "beforeend",
      renderJadeChatMessage({ side: "other", name: result.name, avatar: result.avatar, text: result.text }),
    );
    thread.scrollTop = thread.scrollHeight;
  }, 650);
}

function bindJadeChatInput() {
  const input = document.querySelector("[data-jade-chat-input]");
  if (!(input instanceof HTMLInputElement)) return;

  input.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      sendJadeChatMessage();
    }
  });
}

function openChatImageExpand(src) {
  if (document.querySelector("[data-chat-image-overlay]")) return;

  const overlay = document.createElement("div");
  overlay.className = "jade-chat-image-overlay";
  overlay.setAttribute("data-chat-image-overlay", "");
  overlay.innerHTML = `
    <div class="jade-chat-image-stage" data-chat-image-stage>
      <img src="${escapeHtml(src)}" alt="放大查看" />
      <button type="button" class="jade-chat-image-close" data-chat-image-close aria-label="关闭图片">×</button>
    </div>
  `;
  document.body.appendChild(overlay);
  document.body.classList.add("is-modal-open");

  overlay.addEventListener("click", (event) => {
    if (event.target === overlay || event.target.closest("[data-chat-image-close]") || event.target.closest("[data-chat-image-stage]")) {
      closeChatImageExpand();
    }
  });
}

function closeChatImageExpand() {
  document.querySelector("[data-chat-image-overlay]")?.remove();
  document.body.classList.remove("is-modal-open");
}

function pickupSanJuan() {
  if (localStorage.getItem(SAN_JUAN_CLAIMED_KEY) === "true") return;

  localStorage.setItem(SAN_JUAN_CLAIMED_KEY, "true");

  document.querySelectorAll("[data-pickup-san-juan]").forEach((button) => {
    button.textContent = "已拾取";
    button.classList.add("is-claimed");
    button.disabled = true;
  });
}

function pickupSiJuan() {
  if (localStorage.getItem(SI_JUAN_CLAIMED_KEY) === "true") return;

  localStorage.setItem(SI_JUAN_CLAIMED_KEY, "true");

  document.querySelectorAll("[data-pickup-si-juan]").forEach((button) => {
    button.textContent = "已拾取";
    button.classList.add("is-claimed");
    button.disabled = true;
  });
}

function renderLogin() {
  const app = document.querySelector("#jade-app");

  if (!app) {
    return;
  }

  closeJadeDossier();
  setBodyMode("login");

  app.innerHTML = `
    <section class="paper-panel jade-login-panel" aria-labelledby="jade-title">
      <div class="jade-copy">
        <p class="panel-kicker">弟子名籍 · 玉牒核验</p>
        <h1 id="jade-title">青岚宗弟子玉牒</h1>
        <p class="jade-desc">
          请输入弟子玉牒编号与口令。除名弟子名籍不可登录。若遗失口令，请至外门事务处核验身份玉牌。
        </p>
      </div>

      <form class="jade-form" aria-label="弟子玉牒登录" novalidate>
        <label class="jade-field">
          <span>玉牒编号</span>
          <input
            type="text"
            name="jade-id"
            autocomplete="username"
            placeholder="请输入玉牒编号"
          />
        </label>

        <label class="jade-field">
          <span>玉牒口令</span>
          <input
            type="password"
            name="jade-passcode"
            autocomplete="current-password"
            placeholder="请输入玉牒口令"
          />
        </label>

        <button type="submit" class="jade-submit">登录</button>
        <p class="jade-feedback" aria-live="polite"></p>
      </form>
    </section>
  `;

  bindLoginForm();
}

function bindLoginForm() {
  const form = document.querySelector(".jade-form");
  const feedback = document.querySelector(".jade-feedback");

  form?.addEventListener("submit", (event) => {
    event.preventDefault();

    const account = form.elements["jade-id"].value.trim();
    const passcode = form.elements["jade-passcode"].value.trim();
    const lowerAccount = account.toLowerCase();
    const lowerPasscode = passcode.toLowerCase();

    if (!account) {
      setFeedback(feedback, "请输入弟子玉牒编号。");
      return;
    }

    if (!passcode) {
      setFeedback(feedback, "请输入玉牒口令。");
      return;
    }

    if (account === "温照夜" || lowerAccount === "wenzhaoye") {
      setFeedback(feedback, "名籍已除，不可用姓名登录。请使用弟子玉牒编号。");
      return;
    }

    const normalizedAccount = account.replaceAll("-", "").toUpperCase();

    if (normalizedAccount === "XZ000") {
      if (lowerPasscode !== "zhaowei") {
        setFeedback(feedback, "玉牒口令不符。");
        return;
      }

      startElderLoginTransition(form, feedback);
      return;
    }

    if (normalizedAccount !== "KCY49") {
      setFeedback(feedback, "未查到此弟子玉牒。");
      return;
    }

    if (passcode !== "旧井" && lowerPasscode !== "jiujing") {
      setFeedback(feedback, "玉牒口令不符。");
      return;
    }

    localStorage.setItem(WEN_LOGIN_STORAGE_KEY, "true");
    localStorage.setItem(ACTIVE_LOGIN_STORAGE_KEY, "wzy");
    window.location.hash = WEN_DASHBOARD_HASH;
    renderDashboard();
  });
}

function startElderLoginTransition(form, feedback) {
  setFeedback(feedback, "高阶玉牒校验中……");
  primeJadeBellSound();
  form.classList.add("is-pending");
  form.querySelectorAll("input, button").forEach((control) => {
    control.disabled = true;
  });

  window.setTimeout(() => {
    showBlackout();

    window.setTimeout(() => {
      localStorage.setItem(ELDER_LOGIN_STORAGE_KEY, "true");
      localStorage.setItem(ACTIVE_LOGIN_STORAGE_KEY, "lxz");
      window.location.hash = ELDER_DASHBOARD_HASH;
      hideBlackout();
      renderElderDashboard();
    }, 1500);
  }, 2000);
}

function getBlackoutNode() {
  let node = document.querySelector("#jade-blackout");

  if (!node) {
    node = document.createElement("div");
    node.id = "jade-blackout";
    node.hidden = true;
    node.innerHTML = `
      <div class="blackout-copy" aria-live="assertive">
        <span>□□□ 玉牒重启 □□□</span>
        <strong>无权限名籍回写中</strong>
        <em>行舟……不可应。</em>
      </div>
    `;
    document.body.appendChild(node);
  }

  return node;
}

function showBlackout() {
  document.body.classList.add("is-transition-view");
  getBlackoutNode().hidden = false;
  playJadeBellSound();
}

function hideBlackout() {
  document.body.classList.remove("is-transition-view");
  getBlackoutNode().hidden = true;
}

function getJadeBellAudioContext() {
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;

  if (!AudioContextClass) {
    return null;
  }

  if (!jadeBellAudioContext) {
    jadeBellAudioContext = new AudioContextClass();
  }

  return jadeBellAudioContext;
}

function primeJadeBellSound() {
  const audioContext = getJadeBellAudioContext();

  if (!audioContext || audioContext.state !== "suspended") {
    return;
  }

  audioContext.resume().catch(() => {
    // Audio can be blocked by browser policy; the transition should still continue.
  });
}

function playJadeBellSound() {
  const audioContext = getJadeBellAudioContext();

  if (!audioContext) {
    return;
  }

  audioContext.resume().catch(() => {
    // Ignore blocked audio so the page never breaks because of sound permissions.
  });

  const startTime = audioContext.currentTime + 0.02;
  scheduleBellStrike(audioContext, startTime, 0.56);
  scheduleBellStrike(audioContext, startTime + 0.68, 0.28);
}

function scheduleBellStrike(audioContext, startTime, volume) {
  const masterGain = audioContext.createGain();
  masterGain.gain.setValueAtTime(0.0001, startTime);
  masterGain.gain.exponentialRampToValueAtTime(volume, startTime + 0.035);
  masterGain.gain.exponentialRampToValueAtTime(0.0001, startTime + 1.18);
  masterGain.connect(audioContext.destination);

  [
    { frequency: 108, gain: 0.75 },
    { frequency: 216, gain: 0.46 },
    { frequency: 323, gain: 0.34 },
    { frequency: 431, gain: 0.18 },
    { frequency: 651, gain: 0.11 },
  ].forEach((partial, index) => {
    const oscillator = audioContext.createOscillator();
    const partialGain = audioContext.createGain();

    oscillator.type = index === 0 ? "sine" : "triangle";
    oscillator.frequency.setValueAtTime(partial.frequency, startTime);
    oscillator.detune.setValueAtTime(index % 2 === 0 ? -7 : 9, startTime);

    partialGain.gain.setValueAtTime(partial.gain, startTime);
    partialGain.gain.exponentialRampToValueAtTime(0.0001, startTime + 1.1 + index * 0.04);

    oscillator.connect(partialGain);
    partialGain.connect(masterGain);
    oscillator.start(startTime);
    oscillator.stop(startTime + 1.28);
  });
}

function setFeedback(node, message) {
  if (node) {
    node.textContent = message;
  }
}

function renderDashboard() {
  const app = document.querySelector("#jade-app");

  if (!app) {
    return;
  }

  closeJadeDossier();
  setBodyMode("wen");

  app.innerHTML = `
    <section class="dashboard-shell" aria-labelledby="dashboard-title">
      <article class="paper-panel dashboard-hero">
        <div class="dashboard-avatar" aria-hidden="true">
          <span>外门弟子</span>
        </div>
        <div class="dashboard-welcome">
          <p class="panel-kicker">温照夜的弟子玉牒</p>
          <h1 id="dashboard-title">欢迎回山，温照夜</h1>
          <p>空翠院弟子 / 档案已启</p>
          <small>青岚常在，勤修不辍，愿汝在宗门中行稳致远。</small>
        </div>
      </article>

      <section class="dashboard-grid">
        <div class="dashboard-main">
          <section class="paper-panel dashboard-card-rack" aria-label="弟子事务入口">
            ${dashboardCards.map(renderDashboardCard).join("")}
          </section>

          <section class="paper-panel activity-panel" aria-labelledby="activity-title">
            <div class="panel-title-row">
              <div>
                <p class="panel-kicker">近日本门动向</p>
                <h2 id="activity-title">近日本门动向</h2>
              </div>
              <button type="button" class="dashboard-text-button">查看全部</button>
            </div>
            <div class="activity-tabs" aria-hidden="true">
              <span class="is-active">全部</span>
              <span>宗门公告</span>
              <span>事务通告</span>
              <span>试炼传讯</span>
              <span>其他</span>
            </div>
            <div class="activity-list">
              ${recentRows.map(renderRecentRow).join("")}
            </div>
          </section>
        </div>

        <aside class="dashboard-side">
          <section class="paper-panel side-panel">
            <div class="panel-title-row">
              <h2>弟子身份</h2>
            </div>
            <dl class="identity-list">
              <div><dt>姓名</dt><dd>温照夜</dd></div>
              <div><dt>编号</dt><dd>KCY-49</dd></div>
              <div><dt>身份</dt><dd>外门弟子</dd></div>
              <div><dt>所属院舍</dt><dd>空翠院乙四十九</dd></div>
              <div><dt>档案状态</dt><dd><span class="status-pill">已启用</span></dd></div>
            </dl>
          </section>

          <section class="paper-panel side-panel">
            <div class="panel-title-row">
              <h2>本旬记录</h2>
            </div>
            <div class="record-stats">
              <div><span>签到天数</span><strong>7 / 10</strong></div>
              <div><span>任务完成</span><strong>2 / 5</strong></div>
              <div><span>日记</span><strong>12 篇</strong></div>
            </div>
            <button type="button" class="dashboard-text-button">查看详细记录</button>
          </section>

          <section class="paper-panel side-panel">
            <div class="panel-title-row">
              <h2>待办事项</h2>
              <button type="button" class="dashboard-text-button">全部</button>
            </div>
            <ul class="task-list">
              <li><span></span>提交修炼感悟一次 <em>日常</em></li>
              <li><span></span>完成药圃协助任务 <em>事务</em></li>
            </ul>
            <button type="button" class="logout-button" data-logout-jade>退出玉牒</button>
          </section>
        </aside>
      </section>
    </section>
  `;

  document.querySelector("[data-logout-jade]")?.addEventListener("click", () => {
    localStorage.removeItem(WEN_LOGIN_STORAGE_KEY);
    localStorage.removeItem(ACTIVE_LOGIN_STORAGE_KEY);
    window.location.hash = "";
    renderLogin();
  });
}

function renderElderDashboard() {
  const app = document.querySelector("#jade-app");

  if (!app) {
    return;
  }

  closeJadeDossier();
  setBodyMode("elder");

  app.innerHTML = `
    <section class="dashboard-shell elder-dashboard-shell" aria-labelledby="dashboard-title">
      <div class="elder-glyph-field" aria-hidden="true">
        ${ELDER_GLITCH_LINES.map((line) => `<span>${escapeHtml(line)}</span>`).join("")}
      </div>

      <article class="paper-panel dashboard-hero">
        <div class="dashboard-avatar" aria-hidden="true">
          <span>长老身份</span>
        </div>
        <div class="dashboard-welcome">
          <p class="panel-kicker">陆行舟的长老玉牒</p>
          <h1 id="dashboard-title">欢迎回山，陆行舟</h1>
          <p>青岚宗长老 / 高阶玉牒已重启</p>
          <small>照微为令，旧名回写。此页不应仍在宗门新档之中。</small>
        </div>
      </article>

      <section class="dashboard-grid">
        <div class="dashboard-main">
          <section class="paper-panel dashboard-card-rack" aria-label="长老事务入口">
            ${dashboardCards
              .map((card, index) =>
                renderDashboardCard(
                  card.action === "diary" ? { ...card, title: "长老日记残页" } : card,
                  "elder",
                  index,
                ),
              )
              .join("")}
          </section>

          <section class="paper-panel activity-panel" aria-labelledby="activity-title">
            <div class="panel-title-row">
              <div>
                <p class="panel-kicker">近日本门动向</p>
                <h2 id="activity-title">近日本门动向</h2>
              </div>
              <button type="button" class="dashboard-text-button">查看全部</button>
            </div>
            <div class="activity-tabs" aria-hidden="true">
              <span class="is-active">全部</span>
              <span>门中异动</span>
              <span>秘卷异变</span>
              <span>长老旧档</span>
              <span>魂灯房</span>
            </div>
            <div class="activity-list">
              ${elderRows.map((row) => renderRecentRow(row, true)).join("")}
            </div>
          </section>
        </div>

        <aside class="dashboard-side">
          <section class="paper-panel side-panel">
            <div class="panel-title-row">
              <h2>长老身份</h2>
            </div>
            <dl class="identity-list">
              <div><dt>姓名</dt><dd>陆行舟</dd></div>
              <div><dt>编号</dt><dd>XZ-000</dd></div>
              <div><dt>身份</dt><dd>长老</dd></div>
              <div><dt>所属</dt><dd>青岚宗旧内门</dd></div>
              <div><dt>档案状态</dt><dd><span class="status-pill">已重启</span></dd></div>
            </dl>
          </section>

          <section class="paper-panel side-panel">
            <div class="panel-title-row">
              <h2>本旬记录</h2>
            </div>
            <div class="record-stats">
              <div><span>玉牒重启</span><strong>已允</strong></div>
              <div><span>魂灯异常</span><strong>无</strong></div>
              <div><span>封井誓文</span><strong>破损</strong></div>
            </div>
            <button type="button" class="dashboard-text-button">查看残页</button>
          </section>

          <section class="paper-panel side-panel">
            <div class="panel-title-row">
              <h2>待办事项</h2>
              <button type="button" class="dashboard-text-button">全部</button>
            </div>
            <ul class="task-list">
              <li><span></span>复核归墟井残封 <em>禁令</em></li>
              <li><span></span>销去“行舟”旧名 <em>未成</em></li>
            </ul>
            <button type="button" class="logout-button" data-logout-jade>退出玉牒</button>
          </section>
        </aside>
      </section>
    </section>
  `;

  document.querySelector("[data-logout-jade]")?.addEventListener("click", () => {
    localStorage.removeItem(ELDER_LOGIN_STORAGE_KEY);
    localStorage.removeItem(ACTIVE_LOGIN_STORAGE_KEY);
    window.location.hash = "";
    renderLogin();
  });
}

function renderDashboardCard(card, variant = "", index = 0) {
  const isActionCard = Boolean(card.action);
  const tagName = isActionCard ? "button" : "article";
  const actionAttributes = isActionCard
    ? `type="button" data-dashboard-action="${escapeHtml(card.action)}" aria-haspopup="dialog" aria-controls="jade-modal-root"`
    : "";

  return `
    <${tagName} ${actionAttributes} class="dashboard-card ${isActionCard ? "is-link" : ""} ${
      variant === "elder" ? "is-corrupt" : ""
    }">
      <div class="dashboard-card-image">
        <img src="${escapeHtml(card.image)}" alt="" loading="eager" />
        ${card.badge ? `<span class="card-badge">${escapeHtml(card.badge)}</span>` : ""}
        ${card.tag ? `<span class="card-tag">${escapeHtml(card.tag)}</span>` : ""}
      </div>
      <h2>${escapeHtml(card.title)}</h2>
      <p>${escapeHtml(card.desc)}</p>
      ${variant === "elder" ? `<span class="card-glitch" aria-hidden="true">${escapeHtml(ELDER_GLITCH_LINES[index % ELDER_GLITCH_LINES.length])}</span>` : ""}
    </${tagName}>
  `;
}

function renderRecentRow(row, isElder = false) {
  const [type, title, date, isUnread] = row;

  return `
    <div class="activity-row ${isElder ? "is-corrupt" : ""}">
      <span>${escapeHtml(type)}</span>
      <strong>${escapeHtml(title)}</strong>
      <time>${escapeHtml(date)}</time>
      ${isUnread ? `<i aria-label="未读"></i>` : ""}
    </div>
  `;
}

function route() {
  const activeAccount = getActiveAccount();

  if ((window.location.hash === ELDER_DASHBOARD_HASH && isElderLoggedIn()) || (isElderLoggedIn() && activeAccount === "lxz")) {
    renderElderDashboard();
    return;
  }

  if ((window.location.hash === WEN_DASHBOARD_HASH && isWenLoggedIn()) || (isWenLoggedIn() && activeAccount !== "lxz")) {
    renderDashboard();
    return;
  }

  renderLogin();
}

document.addEventListener("click", (event) => {
  if (!(event.target instanceof Element)) {
    return;
  }

  const dashboardAction = event.target.closest("[data-dashboard-action]");

  if (dashboardAction instanceof HTMLElement) {
    event.preventDefault();

    const action = dashboardAction.dataset.dashboardAction;

    if (action === "dossier") {
      openJadeDossier();
      return;
    }

    if (action === "messages") {
      openJadeMessageThread();
      return;
    }

    if (action === "diary") {
      openJadeDiary();
      return;
    }

    if (action === "inventory") {
      openJadeInventory();
      return;
    }
  }

  const inventoryItemTrigger = event.target.closest("[data-inventory-item]");

  if (inventoryItemTrigger instanceof HTMLElement) {
    event.preventDefault();
    selectJadeInventoryItem(inventoryItemTrigger.dataset.inventoryItem ?? "");
    return;
  }

  const diaryEntryTrigger = event.target.closest("[data-diary-entry]");

  if (diaryEntryTrigger instanceof HTMLElement) {
    event.preventDefault();
    const entry = getDiaryEntries().find((item) => item.id === diaryEntryTrigger.dataset.diaryEntry);

    if (!entry) {
      return;
    }

    const unlockState = getDiaryUnlockState(entry);

    if (!unlockState.unlocked) {
      showJadeDiaryLockHint(entry);
      return;
    }

    if (entry.corrupt) {
      showJadeDiaryRedPage();
      return;
    }

    openJadeDiary(entry.id);
    return;
  }

  const recordingVideoTrigger = event.target.closest("[data-open-recording-video]");

  if (recordingVideoTrigger instanceof HTMLElement) {
    event.preventDefault();
    openJadeRecordingVideo(recordingVideoTrigger.dataset.openRecordingVideo ?? "");
    return;
  }

  if (event.target.closest("[data-close-recording-video]") || event.target.matches("[data-recording-video-overlay]")) {
    event.preventDefault();
    document.querySelector("[data-recording-video-overlay]")?.remove();
    return;
  }

  if (event.target.closest("[data-open-gazette]")) {
    event.preventDefault();
    openHuaiyinGazette();
    return;
  }

  if (event.target.closest("[data-open-pharmacy-diary]")) {
    event.preventDefault();
    openPharmacyDiary();
    return;
  }

  if (event.target.closest("[data-open-san-juan]")) {
    event.preventDefault();
    openSanJuanDetail();
    return;
  }

  if (event.target.closest("[data-close-san-juan]") || event.target.matches("[data-san-juan-overlay]")) {
    event.preventDefault();
    document.querySelector("[data-san-juan-overlay]")?.remove();
    return;
  }

  if (event.target.closest("[data-open-si-juan]")) {
    event.preventDefault();
    openSiJuanDetail();
    return;
  }

  if (event.target.closest("[data-close-si-juan]") || event.target.matches("[data-si-juan-overlay]")) {
    event.preventDefault();
    document.querySelector("[data-si-juan-overlay]")?.remove();
    return;
  }

  if (event.target.closest("[data-open-remnant-image]")) {
    event.preventDefault();
    const button = event.target.closest("[data-open-remnant-image]");
    const imageSrc = button.getAttribute("data-remnant-image");
    const title = button.getAttribute("data-remnant-title") || "阵法图";
    openRemnantImageDetail(imageSrc, title);
    return;
  }

  if (event.target.closest("[data-close-remnant-image]") || event.target.matches("[data-remnant-image-overlay]")) {
    event.preventDefault();
    document.querySelector("[data-remnant-image-overlay]")?.remove();
    return;
  }

  if (event.target.closest("[data-open-remnant-puzzle]")) {
    event.preventDefault();
    openRemnantPuzzle();
    return;
  }

  if (event.target.closest("[data-close-remnant-puzzle]") || event.target.matches("[data-remnant-puzzle-overlay]")) {
    event.preventDefault();
    closeRemnantPuzzle();
    return;
  }

  if (event.target.closest("[data-puzzle-claim]")) {
    event.preventDefault();
    claimPuzzleReward();
    return;
  }

  if (event.target.closest("[data-close-pharmacy-diary]")) {
    event.preventDefault();
    stopPharmacyDiaryTyping();
    document.querySelector("[data-pharmacy-diary-overlay]")?.remove();
    return;
  }

  if (event.target.closest("[data-close-gazette]") || event.target.matches("[data-gazette-overlay]")) {
    event.preventDefault();
    document.querySelector("[data-gazette-overlay]")?.remove();
    return;
  }

  if (event.target.closest("[data-diary-back]")) {
    event.preventDefault();
    openJadeDiary();
    return;
  }

  if (event.target.closest("[data-jade-diary-red-page]")) {
    event.preventDefault();
    if (!revealJadeDiaryRedPage()) {
      closeJadeDiaryRedPage();
    }
    return;
  }

  const chatContactTrigger = event.target.closest("[data-jade-message-contact]");

  if (chatContactTrigger instanceof HTMLElement) {
    event.preventDefault();
    selectJadeMessageContact(chatContactTrigger.dataset.jadeMessageContact ?? "");
    return;
  }

  const elderWenTrigger = event.target.closest("[data-elder-wen-trigger]");

  if (elderWenTrigger) {
    event.preventDefault();
    playElderWenChat();
    return;
  }

  const chatAdvanceTrigger = event.target.closest("[data-advance-jade-chat]");

  if (chatAdvanceTrigger) {
    event.preventDefault();
    advanceJadeMessageThread();
    return;
  }

  const chatSendTrigger = event.target.closest("[data-jade-chat-send]");

  if (chatSendTrigger) {
    event.preventDefault();
    sendJadeChatMessage();
    return;
  }

  const chatImageTrigger = event.target.closest("[data-chat-image-expand]");

  if (event.target.closest("[data-seal-puzzle-link]")) {
    return;
  }

  if (chatImageTrigger instanceof HTMLImageElement) {
    event.preventDefault();
    openChatImageExpand(chatImageTrigger.src);
    return;
  }

  const pickupTrigger = event.target.closest("[data-pickup-san-juan]");

  if (pickupTrigger) {
    event.preventDefault();
    pickupSanJuan();
    return;
  }

  const pickupSiJuanTrigger = event.target.closest("[data-pickup-si-juan]");

  if (pickupSiJuanTrigger) {
    event.preventDefault();
    pickupSiJuan();
    return;
  }

  if (
    event.target.closest("[data-close-jade-dossier]") ||
    event.target.closest("[data-close-jade-modal]") ||
    event.target.matches("[data-jade-dossier-overlay]") ||
    event.target.matches("[data-jade-modal-overlay]") ||
    event.target.matches("[data-jade-diary-overlay]")
  ) {
    closeJadeModal();
  }
});

document.addEventListener("keydown", (event) => {
  if ((event.key === "Enter" || event.key === " ") && document.activeElement?.matches("[data-advance-jade-chat]")) {
    event.preventDefault();
    advanceJadeMessageThread();
    return;
  }

  if (event.key === "Escape") {
    if (document.querySelector("[data-chat-image-overlay]")) {
      closeChatImageExpand();
      return;
    }

    if (document.querySelector("[data-jade-diary-red-page]")) {
      closeJadeDiaryRedPage();
      return;
    }

    if (document.querySelector("[data-recording-video-overlay]")) {
      document.querySelector("[data-recording-video-overlay]")?.remove();
      return;
    }

    closeJadeDossier();
  }
});

window.addEventListener("hashchange", route);
window.addEventListener("storage", (event) => {
  if (
    event.key === SEARCHED_KEYWORDS_STORAGE_KEY ||
    event.key === VISITED_PAGES_STORAGE_KEY
  ) {
    refreshOpenJadeDiary();
  }
});
window.addEventListener("focus", refreshOpenJadeDiary);
route();
