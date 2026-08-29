// Temporary story interactions belong to one page session and reset when its tab/window closes.
const INTERACTION_SESSION_KEY = "qingdeng-weigui:teahouse-interactions:session:v1";

const BOARDS = [
  { id: "all", name: "全部帖子", description: "新茶上案，诸位随意坐下说话。" },
  { id: "qa", name: "入宗问答", description: "报名、院舍、试炼、灵宠，问过才知道怕不怕。" },
  { id: "daily", name: "外门日常", description: "早课、漏风、院舍碎事，今日又是谁差点迟到。" },
  { id: "lost", name: "失物招领", description: "捡到东西先挂帖子，少看一眼少抄十遍。" },
  { id: "pet", name: "灵宠灵植", description: "今日暂无新帖，只有大鹅在门口巡逻。" },
  { id: "sutra", name: "藏经阁互助", description: "借书、抄卷、缺页，最好别让长老先知道。" },
  { id: "night", name: "夜间值守", description: "钟声、封山、巡夜，值守簿没写的不一定没发生。" },
  { id: "ghost", name: "山门怪谈", description: "后山、旧井、青雾，听听可以，照做更好。" },
  { id: "locked", name: "公告锁帖", description: "事务处朱砂锁过的，不要硬抬门。" },
];

const AVATAR_TYPES = [
  { id: "disciple", label: "弟子自绘像" },
  { id: "spirit-pet", label: "灵宠画像" },
  { id: "landscape", label: "山水小景" },
  { id: "artifact", label: "随身法器" },
  { id: "book", label: "藏书封面" },
  { id: "alchemy", label: "丹炉印记" },
];

const AVATAR_PALETTES = [
  { background: "#d9c7a2", ink: "#23474a", accent: "#9b563d", light: "#f4ead3" },
  { background: "#becfc7", ink: "#173f45", accent: "#b48a49", light: "#edf3e9" },
  { background: "#c9c2b3", ink: "#3f4f57", accent: "#7f3f35", light: "#f2eee3" },
  { background: "#d8c8b8", ink: "#493b34", accent: "#315b5c", light: "#f7eddb" },
  { background: "#b8c9cd", ink: "#243e50", accent: "#8f5b3f", light: "#eaf0eb" },
];

const POSTS = [
  {
    id: "newcomer-housing",
    boardId: "qa",
    title: "【新人求问】青岚宗外门包吃包住吗？会不会分配洞府？",
    author: "想御剑但恐高",
    replyCount: 32,
    excerpt: "想带鸡入宗的候选人，正在认真打听外门待遇。",
    body:
      "各位师兄师姐好，我下月想来青岚宗报名。想问问外门弟子待遇如何？包吃包住吗？有没有单人洞府？能不能自带灵宠？我家鸡很有灵性，打鸣特别准。",
    replies: [
      { author: "甲舍通铺老住户", text: "醒醒，外门没有洞府，只有院舍。你要是分到空翠院，冬天风能从门缝里吹出笛声。" },
      { author: "晨课常驻第一排", text: "包住，包早课，包劈柴，包灵田除草，包你三个月内认清自己没有仙缘。" },
      { author: "鹅飞升了我没飞", text: "别带鸡。上一个带鹅来的，现在鹅进了灵兽园，他还在外门扫地。" },
      { author: "鞋底先入道", text: "真正要担心的不是住哪，是问心岭试炼。鞋要穿厚点，心也要穿厚点。" },
    ],
  },
  {
    id: "wenxinling-trial",
    boardId: "qa",
    title: "【避雷】问心岭试炼真的只是爬山吗？我看有人回来鞋都没了",
    author: "山门扫地第七年",
    replyCount: 18,
    excerpt: "山门扫地人每年都能从问心岭脚下扫出点不该在山路上的东西。",
    body:
      "事务处说问心岭试炼只是“登岭问心，择道而行”。说得比早课钟还好听。可我每年扫山门，都能扫到奇奇怪怪的东西。去年扫到半截发带，前年扫到一枚裂开的玉牌，今年更离谱，扫到一只纸鹤，湿得像刚从井里捞出来。",
    replies: [
      { author: "捡漏先看编号", text: "纸鹤？是不是失物招领那只 SW-017？" },
      { author: "事务处话术精修师", text: "别问，问就是“试炼正常损耗”." },
      { author: "名字写错三日", text: "我师兄回来后说，问心岭里有人喊他全名。他应了一声，回来后把自己名字写错三天。" },
      { author: "还没报名先退宗", text: "楼上别吓新人。新人已经开始退宗了。" },
    ],
  },
  {
    id: "jade-number-help",
    boardId: "qa",
    title: "【求助】玉牒编号到底怎么写？我输了三次都不对",
    author: "刚入门就迷路",
    replyCount: 14,
    excerpt: "新弟子试着用名字、道号和真心话登录玉牒，皆未通过。",
    body:
      "救命，弟子玉牒登录是不是坏了？我输入自己名字不行，输入道号也不行，输入“我真的是我”也不行。",
    replies: [
      { author: "编号比脸有用", text: "猪妞，别输名字，玉牒认编号不认脸。" },
      { author: "外门格式背诵员", text: "外门编号格式是：院舍简称 + 房号。比如明照院甲十二，就是 MZJ12。" },
      { author: "同卡三次道友", text: "我也是这样，问题解决了吗道友？" },
      { author: "早课扣分见证人", text: "建议背下来。不然你连自己的早课扣分记录都查不到。" },
    ],
  },
  {
    id: "bronze-key",
    boardId: "lost",
    title: "【失物】谁的青铜钥掉在旧阁偏门了？我捡到后门自己开了",
    author: "手欠不是病",
    replyCount: 11,
    excerpt: "有人捡钥匙捡到开门，顺手把自己也送进了旧阁。",
    body:
      "先声明，我不是故意乱闯藏经阁。我只是捡到一把青铜钥，上面刻着“旧阁偏门”，然后门就自己开了。里面灰特别大，书特别旧，还有一页写着什么“魂灯只认真名，不认道号”。我看不懂，但感觉我再看就要被书看懂了。",
    replies: [
      { author: "脚印比脸先到", text: "你已经完了。藏经阁长老抓人不看脸，看脚印。" },
      { author: "缺页见证人", text: "“魂灯只认真名”这句我好像在《真名禁忌》里见过。" },
      { author: "门栓早该生锈", text: "旧阁偏门不是早封了吗？你钥匙哪来的？" },
      { author: "失物栏常客", text: "建议你把钥匙放失物招领，然后假装你没有手。" },
    ],
  },
  {
    id: "soul-lantern-bell",
    boardId: "night",
    title: "【求助】魂灯房修缮为什么要在半夜？",
    author: "洛某只是路过",
    replyCount: 6,
    excerpt: "值守时见有人搬走几盏怪灯，第七灯忽明忽灭，像是要被移入无名龛。",
    body:
      "我值守时亲眼看见一群人从魂灯房后廊搬出几盏魂灯，灯罩都用黑布裹着，不像寻常修缮。那几盏灯里，第七灯最为奇怪，灯焰一会儿亮得像要烧穿灯罩，一会儿又暗得几乎看不见，反复忽明忽灭。\n\n我曾翻过《魂灯录》，其中提过一句：凡灯位迁入无名龛者，非死非灭。若记载属实，这盏灯莫非已经被移进传说中的无名龛？\n\n若只是换灯位，为何要在半夜搬运，又为何不让外门弟子靠近？知情的师兄师姐若愿意说一句，烦请避开姓名。",
    replies: [
      { author: "夜值只想回舍", text: "我只听见七声钟，没敢靠近后廊。第七声之后，山门方向的风停了一阵。" },
      { author: "后廊抬匣目击者", text: "黑木匣确实是魂灯匣，搬运的人袖口都有戒律堂的青线。那不是普通修缮。" },
      { author: "抄过魂灯录的人", text: "‘非死非灭’不是给弟子看的完整说法。你若还想留在外门，别再追问无名龛。" },
      { author: "不记名的执事", text: "第七灯灯底原本刻着一个名字。后来名字被刮去，灯才开始忽明忽灭。" },
      { author: "山门调令已下", text: "洛师兄，帖子看过便算了。修缮延期不是因为漏雨，夜里也不要再去后山。" },
    ],
  },
  {
    id: "true-name-book",
    boardId: "sutra",
    title: "【藏经阁】《真名禁忌》缺页是不是被谁撕了？",
    author: "抄书抄到手断",
    replyCount: 15,
    excerpt: "借阅记录里连着两本书都指向那张消失的第三页。",
    body:
      "本人今日整理借阅记录，发现《真名禁忌》少了一页。借阅人登记是裴照川，归还时说“原本就缺”。但我翻旧录，之前宋眠霜借《魂灯录》时还备注过“真名与魂灯互证，可查禁忌卷第三页”。所以第三页到底去哪了？",
    replies: [
      { author: "卷册比命难补", text: "你完了，你知道太多了。" },
      { author: "砚雪院门口路过", text: "裴照川最近不是闭门养伤吗？听说伤口不流血。" },
      { author: "经阁八卦抄录员", text: "“真名与魂灯互证”这话听起来不像正经修仙，像正经出事。" },
      { author: "长老喊你补页", text: "藏经阁长老：谁再说缺页，谁就去补页。" },
    ],
  },
  {
    id: "wangchensan",
    boardId: "daily",
    title: "【药堂】忘尘散真的能忘掉早课吗？急，明天抽背",
    author: "丹炉炸了三次",
    replyCount: 26,
    excerpt: "药堂常备话题之一：能不能把晨课恐惧和名字一起忘了。",
    body:
      "如题。明天晨课抽背《外门弟子守则》，我只记得第一句“不可夜入后山”。请问忘尘散能不能选择性忘掉早课恐惧，保留吃饭本能？",
    replies: [
      { author: "药渣里找尊严", text: "忘尘散是药，不是逃课符。" },
      { author: "白师姐不让乱服", text: "白蘅师姐说过，忘尘散不可连服，轻则忘字，重则忘名。" },
      { author: "点名全靠缘分", text: "忘名？那以后点名怎么办？" },
      { author: "魂灯替你应到", text: "点到你时你应一声，魂灯替你亮一下。" },
      { author: "笑完背书去吧", text: "楼上这笑话有点冷，我魂灯都暗了。" },
    ],
  },
  {
    id: "old-well",
    boardId: "ghost",
    title: "【怪谈】后山旧井不要照，井水里会多一个人",
    author: "夜巡不加钱",
    replyCount: 7,
    excerpt: "旧井不在新图上，却一直在夜巡人的嘴里。",
    body:
      "新人别乱跑后山。尤其是旧井。井口镇石裂了以后，晚上会起青雾。你往井里看，井水里不是映你一个人，是两个。你回头，身后没人。你再低头，井里那个人还在笑。",
    replies: [
      { author: "退宗申请已写好", text: "谢谢，已经不想修仙了。" },
      { author: "地图翻烂也没井", text: "旧井不是地图上没有吗？" },
      { author: "罚抄旧图三十遍", text: "旧图里好像叫归什么井，归墟井？我不确定，看完旧图就被罚抄了。" },
      { author: "夜巡三不原则", text: "别照井，别喊名，别问为什么。夜巡三不原则。" },
    ],
  },
  {
    id: "xingzhou-fog-call",
    boardId: "ghost",
    title: "【怪谈】后山青雾里有人喊“行舟”，可宗门没有这个弟子",
    author: "夜巡不加钱",
    replyCount: 6,
    excerpt: "青雾里反复有人喊一个名录里不存在的名字，旧档或许另有记载。",
    body: "昨夜后山值守，青雾里有个女子一直喊“行舟”。\n\n我翻了外门名录，没有这个人。",
    replies: [
      { author: "旧档翻页人", text: "外门没有，不代表旧档没有。" },
      { author: "听名不应声", text: "别应，能喊旧名的更不能应。" },
      { author: "真人旧名考据", text: "我听说玄濯真人年轻时不叫玄濯。" },
    ],
  },
  {
    id: "wumingkan-post",
    boardId: "ghost",
    title: "【匿名】有人知道“无名龛”是什么地方吗？",
    author: "匿名弟子",
    replyCount: 3,
    excerpt: "魂灯房后廊传出来的陌生地名，被人问出来后没人愿意细答。",
    body:
      "我在魂灯房后廊听见执事说“第七灯先移入无名龛”。可我查宗门地图，没找到这个地方。无名龛是放什么的？",
    replies: [
      { author: "只回半句的人", text: "放不该有名字的东西。" },
      { author: "看到这里就停", text: "别查。" },
      { author: "你已经回头了", text: "你已经查了。" },
    ],
  },
  {
    id: "locked-post",
    boardId: "locked",
    title: "不要在雾里喊别人全名",
    author: "外门事务处",
    replyCount: 0,
    excerpt: "锁帖留着标题，不留内容。看得见，未必给你读。",
    locked: true,
    replies: [],
  },
];

const interactionSessionState = loadInteractionSessionState();
// Player-created posts and replies are session-only and reset on refresh.
const userForumContent = {
  posts: [],
  replies: {},
};

const state = {
  activeBoardId: "all",
  openPostId: null,
  namelessOpenCount: interactionSessionState.namelessOpenCount,
  namelessWarningStage: interactionSessionState.namelessWarningStage,
  unauthorizedVisible: false,
};

function getAllPosts() {
  return [...POSTS, ...userForumContent.posts];
}

let unauthorizedTimer = null;
let namelessWarningTimer = null;

function loadInteractionSessionState() {
  try {
    const raw = sessionStorage.getItem(INTERACTION_SESSION_KEY);

    if (!raw) {
      return {
        namelessOpenCount: 0,
        namelessWarningStage: "hidden",
      };
    }

    const parsed = JSON.parse(raw);

    return {
      namelessOpenCount: Number.isFinite(parsed?.namelessOpenCount)
        ? Math.max(0, Number(parsed.namelessOpenCount))
        : 0,
      namelessWarningStage:
        parsed?.namelessWarningStage === "warning" || parsed?.namelessWarningStage === "deleted"
          ? parsed.namelessWarningStage
          : "hidden",
    };
  } catch {
    return {
      namelessOpenCount: 0,
      namelessWarningStage: "hidden",
    };
  }
}

function saveInteractionSessionState() {
  try {
    sessionStorage.setItem(
      INTERACTION_SESSION_KEY,
      JSON.stringify({
        namelessOpenCount: state.namelessOpenCount,
        namelessWarningStage: state.namelessWarningStage,
      })
    );
  } catch {
    // Ignore storage failures on standalone page.
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

function getReplyAvatar(author, index) {
  let hash = index + 17;

  for (const character of author) {
    hash = (hash * 31 + character.codePointAt(0)) >>> 0;
  }

  return {
    ...AVATAR_TYPES[hash % AVATAR_TYPES.length],
    palette: AVATAR_PALETTES[(hash >>> 3) % AVATAR_PALETTES.length],
    variant: (hash >>> 7) % 3,
  };
}

function renderAvatarArt(avatar) {
  const { background, ink, accent, light } = avatar.palette;

  const artwork = {
    disciple: `
      <circle cx="32" cy="22" r="10" fill="${light}" />
      <path d="M18 55c1-12 6-20 14-20s13 8 14 20" fill="${ink}" />
      <path d="M21 23c0-10 5-15 11-15 7 0 12 5 12 15-4-4-8-6-12-6s-8 2-11 6Z" fill="${ink}" />
      <path d="M27 9h10l-2-5h-6Z" fill="${accent}" />
      <path d="M24 39l8 8 8-8" fill="none" stroke="${accent}" stroke-width="2" />
    `,
    "spirit-pet": `
      <path d="M17 25 20 11l10 9h4l10-9 3 14c3 4 4 8 4 12 0 11-8 18-19 18s-19-7-19-18c0-4 1-8 4-12Z" fill="${light}" stroke="${ink}" stroke-width="2" />
      <circle cx="25" cy="34" r="2" fill="${ink}" />
      <circle cx="39" cy="34" r="2" fill="${ink}" />
      <path d="m29 41 3 2 3-2M32 43v4" fill="none" stroke="${accent}" stroke-width="2" stroke-linecap="round" />
      <path d="M18 51c-5 1-8-1-9-5M46 51c5 1 8-1 9-5" fill="none" stroke="${ink}" stroke-width="2" stroke-linecap="round" />
    `,
    landscape: `
      <circle cx="45" cy="17" r="7" fill="${accent}" opacity="0.9" />
      <path d="m5 53 17-25 8 11 8-18 21 32Z" fill="${ink}" />
      <path d="m20 31 3 4 4-2 4 7 7-17 7 13" fill="none" stroke="${light}" stroke-width="2" opacity="0.82" />
      <path d="M8 47c8-4 16-3 23 0s15 4 25-1" fill="none" stroke="${accent}" stroke-width="3" stroke-linecap="round" />
    `,
    artifact: `
      <path d="m39 8-4 34-6 6 1-9 4-31Z" fill="${light}" stroke="${ink}" stroke-width="2" />
      <path d="m23 39 18 5" stroke="${accent}" stroke-width="4" stroke-linecap="round" />
      <path d="m30 45-3 10" stroke="${ink}" stroke-width="4" stroke-linecap="round" />
      <circle cx="26" cy="57" r="3" fill="${accent}" />
      <path d="M14 17c5-5 10-6 15-4" fill="none" stroke="${accent}" stroke-width="2" stroke-linecap="round" opacity="0.8" />
    `,
    book: `
      <path d="M9 15c9-3 16-1 23 5v35c-7-6-14-8-23-5ZM55 15c-9-3-16-1-23 5v35c7-6 14-8 23-5Z" fill="${light}" stroke="${ink}" stroke-width="2" stroke-linejoin="round" />
      <path d="M32 20v35M15 25c5-1 9 0 13 3M15 32c5-1 9 0 13 3M49 25c-5-1-9 0-13 3M49 32c-5-1-9 0-13 3" fill="none" stroke="${accent}" stroke-width="2" stroke-linecap="round" />
    `,
    alchemy: `
      <path d="M18 22h28l4 9-5 16H19l-5-16Z" fill="${ink}" />
      <path d="M20 22c2-7 7-11 12-11s10 4 12 11Z" fill="${accent}" />
      <path d="M25 47 21 56M39 47l4 9" stroke="${ink}" stroke-width="4" stroke-linecap="round" />
      <circle cx="32" cy="34" r="6" fill="${light}" />
      <path d="M28 7c-3-3 1-6-1-9M37 8c3-4-1-6 1-9" fill="none" stroke="${light}" stroke-width="2" stroke-linecap="round" opacity="0.8" />
    `,
  }[avatar.id];

  const cornerMark = avatar.variant === 0
    ? `<circle cx="55" cy="55" r="4" fill="${accent}" />`
    : avatar.variant === 1
      ? `<path d="M51 56h8M55 52v8" stroke="${accent}" stroke-width="2" />`
      : `<path d="m51 55 4-4 4 4-4 4Z" fill="${accent}" />`;

  return `
    <svg viewBox="0 0 64 64" aria-hidden="true" focusable="false">
      <rect width="64" height="64" rx="12" fill="${background}" />
      <circle cx="8" cy="8" r="13" fill="${light}" opacity="0.22" />
      ${artwork}
      ${cornerMark}
    </svg>
  `;
}

function renderReplyAvatar(author, index) {
  const avatar = getReplyAvatar(author, index);

  return `
    <span class="reply-avatar" title="${escapeHtml(avatar.label)}" aria-label="${escapeHtml(avatar.label)}">
      ${renderAvatarArt(avatar)}
    </span>
  `;
}

function getBoardMeta(boardId) {
  return BOARDS.find((board) => board.id === boardId) ?? BOARDS[0];
}

function getPostsForBoard(boardId) {
  const posts = getAllPosts();

  if (boardId === "all") {
    return posts;
  }

  return posts.filter((post) => post.boardId === boardId);
}

function getNamelessSpecialReply() {
  if (state.namelessOpenCount < 2) {
    return null;
  }

  if (state.namelessWarningStage === "warning") {
    return {
      author: "无名回帖",
      text: "勿呼名",
      variant: "warning",
    };
  }

  if (state.namelessWarningStage === "deleted") {
    return {
      author: "无名回帖",
      text: "已删除",
      variant: "deleted",
    };
  }

  return null;
}

function getReplyCount(post) {
  const userReplies = userForumContent.replies[post.id] ?? [];
  let count = (post.replyCount ?? post.replies?.length ?? 0) + userReplies.length;

  if (post.id !== "wumingkan-post") {
    return count;
  }

  if (getNamelessSpecialReply()) {
    count += 1;
  }

  return count;
}

function getReplies(post) {
  const replies = (post.replies ?? []).map((reply) => ({
    author: reply.author,
    text: reply.text,
    variant: "default",
  }));

  const userReplies = userForumContent.replies[post.id] ?? [];
  replies.push(...userReplies);

  if (post.id === "wumingkan-post") {
    const specialReply = getNamelessSpecialReply();

    if (specialReply) {
      replies.push(specialReply);
    }
  }

  return replies;
}

function renderLockedTitle() {
  return `【<span class="title-lock">已锁帖</span>】不要在雾里喊别人全名`;
}

function renderForumPostTitle(title) {
  return escapeHtml(title).replaceAll(
    "无名龛",
    '<span class="forum-keyword-cinnabar">无名龛</span>',
  );
}

function renderForumPostBody(body) {
  return escapeHtml(body)
    .replaceAll("第七灯", '<span class="forum-keyword-cinnabar">第七灯</span>')
    .replaceAll("\n", "<br />");
}

function renderTitle(post) {
  return post.locked ? renderLockedTitle() : renderForumPostTitle(post.title);
}

function renderForumPage() {
  const app = document.querySelector("#forum-app");

  if (!app) {
    return;
  }

  const board = getBoardMeta(state.activeBoardId);
  const posts = getPostsForBoard(state.activeBoardId);
  const allPosts = getAllPosts();

  app.innerHTML = `
    <section class="page-grid">
      <section class="paper-panel forum-hero" aria-labelledby="forum-hero-title">
        <div>
          <p class="hero-overline">青灯未归 · 外门茶寮</p>
          <h1 id="forum-hero-title">山门茶寮</h1>
          <p class="hero-copy">
            青岚宗外门弟子与入宗候选人交流区。闲谈院舍、试炼旧闻、失物线索与夜巡怪谈，诸帖虽杂，偶有可核之处。
          </p>
        </div>
        <div class="forum-hero-stats" aria-label="茶寮帖簿统计">
          <div>
            <span>茶帖存档</span>
            <strong>${String(allPosts.length).padStart(2, "0")} 则</strong>
          </div>
          <div>
            <span>当前分栏</span>
            <strong>${escapeHtml(board.name)}</strong>
          </div>
        </div>
      </section>

      <section class="forum-layout">
        <article class="paper-panel forum-main">
          <div class="panel-heading">
            <p class="panel-kicker">茶牌分栏</p>
            <h2>帖子列表</h2>
          </div>
          <div class="board-rack">
            ${BOARDS.map(
              (item) => `
                <button
                  type="button"
                  class="board-chip ${item.id === state.activeBoardId ? "is-active" : ""}"
                  data-board-id="${escapeHtml(item.id)}"
                >
                  ${escapeHtml(item.name)}
                </button>
              `
            ).join("")}
          </div>
          ${
            posts.length
              ? `
                <div class="thread-list">
                  ${posts
                    .map((post) => {
                      const boardMeta = getBoardMeta(post.boardId);

                      return `
                        <button
                          type="button"
                          class="thread-card ${state.openPostId === post.id ? "is-open" : ""}"
                          data-post-id="${escapeHtml(post.id)}"
                        >
                          <div class="thread-topline">
                            <div>
                              <h3 class="thread-title">${renderTitle(post)}</h3>
                              <p class="thread-excerpt">${escapeHtml(post.excerpt)}</p>
                            </div>
                            <span class="reply-pill">回复 ${getReplyCount(post)}</span>
                          </div>
                          <div class="thread-meta">
                            <span class="board-badge">${escapeHtml(boardMeta.name)}</span>
                            <span>发帖人：${escapeHtml(post.author)}</span>
                          </div>
                        </button>
                      `;
                    })
                    .join("")}
                </div>
              `
              : `
                <article class="empty-state">
                  <strong>${escapeHtml(board.name)}今日暂无新帖</strong>
                  <p>${escapeHtml(board.description)}</p>
                </article>
              `
          }

          <form class="forum-compose" data-new-post-form>
            <div class="compose-heading">
              <div>
                <p class="panel-kicker">茶寮新帖</p>
                <h3>留下你的帖子</h3>
              </div>
              <span class="compose-board-label">${escapeHtml(board.name)}</span>
            </div>
            <label>
              <span>标题</span>
              <input name="title" type="text" maxlength="80" placeholder="例如：后山夜巡又听见钟声" required />
            </label>
            <label>
              <span>内容</span>
              <textarea name="body" rows="4" maxlength="600" placeholder="写下你想和茶寮道友交流的事……" required></textarea>
            </label>
            <div class="compose-actions">
              <span>发帖人：茶寮访客</span>
              <button type="submit">张贴木牌</button>
            </div>
          </form>
        </article>

        <aside class="paper-panel forum-side">
          <div class="side-stack">
            <article class="rule-card">
              <p class="panel-kicker">茶寮规矩</p>
              <h3>木牌三则</h3>
              <ol class="rule-list">
                <li>抱怨院舍可以，互报他人真名不可以。</li>
                <li>捡到旧钥、纸鹤、灯芯，先去失物招领，再来发帖叹气。</li>
                <li>锁帖看标题就够了，别拿自己去试朱砂印。</li>
              </ol>
            </article>

            <article class="notice-card">
              <p class="panel-kicker">板块一览</p>
              <h3>茶牌木签</h3>
              <div class="board-overview">
                ${BOARDS.filter((item) => item.id !== "all")
                  .map((item) => {
                    const count = allPosts.filter((post) => post.boardId === item.id).length;

                    return `
                      <div class="board-overview-line">
                        <span>${escapeHtml(item.name)}</span>
                        <span class="notice-pill">${count} 帖</span>
                      </div>
                    `;
                  })
                  .join("")}
              </div>
            </article>
          </div>
        </aside>
      </section>
    </section>
  `;

  bindForumEvents();
  updateHeaderBoardNav();
  renderPostDetail();
  renderUnauthorizedOverlay();
}

function renderPostDetail() {
  const root = document.querySelector("#forum-detail-root");
  const post = getAllPosts().find((item) => item.id === state.openPostId);

  if (!root) {
    return;
  }

  if (!post || post.locked) {
    root.innerHTML = "";
    document.body.classList.remove("forum-detail-open");
    return;
  }

  document.body.classList.add("forum-detail-open");

  const board = getBoardMeta(post.boardId);
  const replies = getReplies(post);

  root.innerHTML = `
    <section class="detail-overlay" data-close-detail>
        <article
          class="detail-card"
          role="dialog"
          aria-modal="true"
          aria-labelledby="post-detail-title"
          tabindex="-1"
        >
        <div class="detail-head">
          <div class="detail-copy">
            <p class="panel-kicker">茶寮回帖</p>
      <h2 id="post-detail-title">${renderForumPostTitle(post.title)}</h2>
            <div class="detail-meta">
              <span class="board-badge">${escapeHtml(board.name)}</span>
              <span>发帖人：${escapeHtml(post.author)}</span>
              <span>回复数：${getReplyCount(post)}</span>
            </div>
          </div>
          <button type="button" class="detail-close" data-close-detail-button>收起帖子</button>
        </div>

        <section class="detail-section">
          <h3>主楼</h3>
          <p>${renderForumPostBody(post.body)}</p>
        </section>

        <section class="detail-section">
          <h3>回帖摘录</h3>
          <div class="reply-list">
            ${replies
              .map(
                (reply, index) => `
                  <article class="reply-entry${
                    reply.variant === "warning"
                      ? " is-warning"
                      : reply.variant === "deleted"
                        ? " is-deleted"
                        : ""
                  }">
                    ${renderReplyAvatar(reply.author, index)}
                    <div class="reply-message">
                      <div class="reply-head">
                        <span class="reply-author">${escapeHtml(reply.author)}</span>
                        <span class="reply-floor">${index + 1} 楼</span>
                      </div>
                      <div class="reply-bubble">
                        <p>${escapeHtml(reply.text)}</p>
                      </div>
                    </div>
                  </article>
                `
              )
              .join("")}
          </div>
          <form class="reply-compose" data-reply-form>
            <p class="panel-kicker">追加留言</p>
            <label>
              <span>留言内容</span>
              <textarea name="reply" rows="3" maxlength="300" placeholder="说两句你的看法……" required></textarea>
            </label>
            <div class="compose-actions">
              <span>留言人：茶寮访客</span>
              <button type="submit">贴上回复</button>
            </div>
          </form>
        </section>
      </article>
    </section>
  `;

  root.querySelector("[data-close-detail]")?.addEventListener("click", (event) => {
    if (event.target !== event.currentTarget) {
      return;
    }

    closePostDetail();
  });

  root.querySelector("[data-close-detail-button]")?.addEventListener("click", () => {
    closePostDetail();
  });

  root.querySelector("[data-reply-form]")?.addEventListener("submit", (event) => {
    event.preventDefault();
    createUserReply(event.currentTarget, post.id);
  });

  window.requestAnimationFrame(() => {
    const detailCard = root.querySelector(".detail-card");

    if (detailCard) {
      detailCard.scrollTop = 0;
      detailCard.focus({ preventScroll: true });
    }
  });

  if (post.id === "wumingkan-post" && state.namelessWarningStage === "warning" && !namelessWarningTimer) {
    namelessWarningTimer = window.setTimeout(() => {
      state.namelessWarningStage = "deleted";
      saveInteractionSessionState();
      namelessWarningTimer = null;
      renderForumPage();
    }, 2500);
  }
}

function renderUnauthorizedOverlay() {
  const root = document.querySelector("#forum-denied-root");

  if (!root) {
    return;
  }

  if (!state.unauthorizedVisible) {
    root.innerHTML = "";
    return;
  }

  root.innerHTML = `
    <section class="denied-overlay" data-close-denied>
      <div class="denied-copy">
        <h2 class="denied-title">无权限</h2>
        <p>外门事务处已加朱砂锁印。</p>
      </div>
    </section>
  `;

  root.querySelector("[data-close-denied]")?.addEventListener("click", () => {
    hideUnauthorizedOverlay();
  });
}

function openPost(postId) {
  const post = getAllPosts().find((item) => item.id === postId);

  if (!post) {
    return;
  }

  if (post.locked) {
    state.openPostId = null;
    renderPostDetail();
    showUnauthorizedOverlay();
    return;
  }

  if (post.id === "wumingkan-post") {
    state.namelessOpenCount += 1;

    if (state.namelessOpenCount >= 2 && state.namelessWarningStage === "hidden") {
      state.namelessWarningStage = "warning";
    }

    saveInteractionSessionState();
  }

  state.openPostId = post.id;
  renderForumPage();
}

function closePostDetail() {
  state.openPostId = null;
  document.body.classList.remove("forum-detail-open");
  renderForumPage();
}

function createUserPost(form) {
  const formData = new FormData(form);
  const title = String(formData.get("title") ?? "").trim();
  const body = String(formData.get("body") ?? "").trim();

  if (!title || !body) {
    return;
  }

  const id = `user-post-${Date.now()}`;
  userForumContent.posts.unshift({
    id,
    boardId: state.activeBoardId === "all" ? "daily" : state.activeBoardId,
    title,
    author: "茶寮访客",
    replyCount: 0,
    excerpt: body.slice(0, 56),
    body,
    replies: [],
    userCreated: true,
  });
  form.reset();
  showForumNotice("木牌已挂上茶寮。", "success");
  renderForumPage();
}

function createUserReply(form, postId) {
  const formData = new FormData(form);
  const text = String(formData.get("reply") ?? "").trim();

  if (!text || !postId) {
    return;
  }

  if (!Array.isArray(userForumContent.replies[postId])) {
    userForumContent.replies[postId] = [];
  }

  userForumContent.replies[postId].push({
    author: "茶寮访客",
    text,
    variant: "default",
  });
  form.reset();
  showForumNotice("留言已贴上。", "success");
  renderPostDetail();
}

function showForumNotice(message, type = "success") {
  const existing = document.querySelector(".forum-notice");
  existing?.remove();

  const notice = document.createElement("div");
  notice.className = `forum-notice is-${type}`;
  notice.textContent = message;
  document.body.append(notice);
  window.setTimeout(() => notice.remove(), 1800);
}

function showUnauthorizedOverlay() {
  state.unauthorizedVisible = true;
  renderUnauthorizedOverlay();

  if (unauthorizedTimer) {
    window.clearTimeout(unauthorizedTimer);
  }

  unauthorizedTimer = window.setTimeout(() => {
    hideUnauthorizedOverlay();
  }, 1400);
}

function hideUnauthorizedOverlay() {
  state.unauthorizedVisible = false;
  renderUnauthorizedOverlay();

  if (unauthorizedTimer) {
    window.clearTimeout(unauthorizedTimer);
    unauthorizedTimer = null;
  }
}

function bindForumEvents() {
  document.querySelectorAll("[data-board-id]").forEach((button) => {
    button.addEventListener("click", () => {
      const boardId = button.getAttribute("data-board-id");

      if (!boardId) {
        return;
      }

      state.activeBoardId = boardId;
      state.openPostId = null;
      renderForumPage();
    });
  });

  document.querySelectorAll("[data-post-id]").forEach((button) => {
    button.addEventListener("click", () => {
      const postId = button.getAttribute("data-post-id");

      if (!postId) {
        return;
      }

      openPost(postId);
    });
  });

  document.querySelector("[data-new-post-form]")?.addEventListener("submit", (event) => {
    event.preventDefault();
    createUserPost(event.currentTarget);
  });
}

function updateHeaderBoardNav() {
  document.querySelectorAll("[data-forum-board-jump]").forEach((button) => {
    const boardId = button.getAttribute("data-forum-board-jump");
    button.classList.toggle("is-active", boardId === state.activeBoardId);
  });
}

document.querySelectorAll("[data-back-home]").forEach((button) => {
  button.addEventListener("click", () => {
    window.location.href = "./index.html#/home";
  });
});

document.querySelectorAll("[data-forum-board-jump]").forEach((button) => {
  button.addEventListener("click", () => {
    const boardId = button.getAttribute("data-forum-board-jump");

    if (!boardId) {
      return;
    }

    state.activeBoardId = boardId;
    state.openPostId = null;
    renderForumPage();
  });
});

renderForumPage();
