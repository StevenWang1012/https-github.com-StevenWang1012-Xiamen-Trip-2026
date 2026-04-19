export type ItineraryItem = {
  id: string;
  timeLabel: string;
  title: string;
  description: string;
  food?: string;
  type?: 'flight' | 'activity' | 'split' | 'warning';
  tags?: string[];
  advice?: string;
  links?: { title: string; url: string }[];
};

export type DailyItinerary = {
  dateId: string;
  dateStr: string;
  dayOfWeek: string;
  items: ItineraryItem[];
  warnings?: string[];
};

export const itineraryData: DailyItinerary[] = [
  {
    dateId: '2026-04-28',
    dateStr: '4/28',
    dayOfWeek: '三',
    items: [
      {
        id: '28-1',
        timeLabel: '下午',
        title: '入住、初探廈門',
        description: '翔鷺酒店 Check-in > 中山路步行街',
        food: '花生湯、韭菜盒',
        type: 'activity',
      },
      {
        id: '28-2',
        timeLabel: '晚上',
        title: '輪渡海景',
        description: '鼓浪嶼（精簡版，15:00前返程）',
        food: '海鮮酒樓晚餐',
        type: 'activity',
        advice: '海鮮 (Seafood)：帶長輩我強烈建議 4/28 晚上就直接在湖裡區找大型酒樓吃（例如舒友），環境好、冷氣強、地板不油膩，長輩吃得開心，你離隊前也會比較放心。'
      },
    ],
  },
  {
    dateId: '2026-04-29',
    dateStr: '4/29',
    dayOfWeek: '四',
    items: [
      {
        id: '29-1',
        timeLabel: '上午',
        title: '文化朝聖',
        description: '南普陀寺（提前預約）> 廈大外觀',
        food: '清淡沙茶麵',
        type: 'activity',
        tags: ['需預約: 南普陀寺', '需預約: 廈大'],
      },
      {
        id: '29-2',
        timeLabel: '下午',
        title: '環島漫步',
        description: '環島路觀光車 > 曾厝垵海景',
        food: '土筍凍、海蠣煎',
        type: 'activity',
        advice: '海蠣煎 (Oyster Omelet)：廈門跟台灣最大的差別在於「地瓜粉的比例」跟「甜辣醬」。建議在西街或中山路找那種排隊的老字號，通常口感最穩。',
      },
      {
        id: '29-3',
        timeLabel: '晚上',
        title: '市井煙火',
        description: '八市海鮮市場（現撈現做）',
        food: '必吃：海鮮加工',
        type: 'activity',
      },
    ],
  },
  {
    dateId: '2026-04-30',
    dateStr: '4/30',
    dayOfWeek: '五',
    items: [
      {
        id: '30-1',
        timeLabel: '上午',
        title: '鋼琴之島',
        description: '鼓浪嶼深度遊（菽莊花園、鋼琴博物館）',
        food: '鼓浪嶼特色小吃',
        type: 'activity',
        tags: ['需預約: 菽莊花園'],
      },
      {
        id: '30-2',
        timeLabel: '下午',
        title: '潮點串遊',
        description: '南普陀 > 廈大 > 沙坡尾藝術區',
        food: '文創咖啡、手搖飲',
        type: 'activity',
      },
      {
        id: '30-3',
        timeLabel: '晚上',
        title: '八市回味',
        description: '若長輩疲累可改飯店周邊餐廳',
        food: '八市二刷或閩南菜',
        type: 'activity',
      },
    ],
  },
  {
    dateId: '2026-05-01',
    dateStr: '5/01',
    dayOfWeek: '六',
    warnings: [
      '5/1 警告：連假期間漳州站、泉州站人潮極多，請姪女務必提前在 12306 App 買好所有動車票，避免現場無票。'
    ],
    items: [
      {
        id: '01-1',
        timeLabel: '上午',
        title: '尋根祭祖',
        description: '07:40 廈門站→漳州站 > 包車赴梅林祖祠',
        food: '梅林客家午餐',
        type: 'activity',
        tags: ['前置任務: 買12306動車票'],
        links: [{ title: '導航：梅林祖祠', url: 'https://maps.apple.com/?q=梅林祖祠' }]
      },
      {
        id: '01-2',
        timeLabel: '14:00',
        title: '【分兵行動】',
        description: '用戶：返回廈門拿行李赴碼頭\n家人：前往泉州繼續行程',
        food: '此時段不進食',
        type: 'split',
        tags: ['需預約: 五通船票'],
      },
      {
        id: '01-3',
        timeLabel: '晚上',
        title: '泉州古城',
        description: '家人：開元寺 > 泉州木偶戲 (19:30)',
        food: '泉州麵線糊',
        type: 'activity',
        tags: ['需預約: 泉州木偶戲'],
        links: [{ title: '導航：泉州木偶劇院', url: 'https://maps.apple.com/?q=泉州木偶剧院' }]
      },
    ],
  },
  {
    dateId: '2026-05-02',
    dateStr: '5/02',
    dayOfWeek: '日',
    items: [
      {
        id: '02-1',
        timeLabel: '上午',
        title: '退房返程',
        description: '翔鷺國際大酒店退房 > 前往五通碼頭搭船 > 金門機場搭機',
        food: '飯店早餐 / 準備賦歸',
        type: 'activity',
        advice: '請依照兩批不同的航班時間（09:10 及 12:15），提早預約計程車前往五通碼頭，並預留小三通的通關與乘船時間。',
      },
    ],
  },
];

export const splitPathData = {
  me: [
    { time: '14:15', desc: '漳州站搭乘動車返回廈門站。' },
    { time: '14:50', desc: '抵達廈門站，打車回翔鷺酒店拿行李。' },
    { time: '15:30', desc: '出發赴五通碼頭。' },
    { time: '16:30', desc: '登船赴金門（台胞證現場票，若客滿則順延至 17:00/17:30）。' },
  ],
  family: [
    { time: '15:00', desc: '漳州站搭乘動車赴泉州站。' },
    { time: '16:30', desc: '抵達泉州，入住/前往西街（開元寺旁）。' },
    { time: '19:30', desc: '木偶戲（核心看點，需提前搶票）。' },
    { time: '20:40', desc: '泉州動車返回廈門，打車回翔鷺酒店。' },
  ]
};

export const preparationTasks = [
  { 
    category: '證件準備', 
    items: [
      { id: 't-passport', title: '護照', instruction: '確認護照效期滿六個月以上。' },
      { id: 't-mtp', title: '台胞證', instruction: '確認台胞證效期，並且旅途中請務必隨身攜帶正本過海關。' },
      { id: 't-id', title: '身分證', instruction: '國內備用證件，以備不時之需。' },
    ]
  },
  { 
    category: '行程預約', 
    items: [
      { id: 't1', title: '南普陀寺 / 廈大預約', instruction: '請透過「南普陀寺」或「廈門大學」微信公眾號提前 3-5 天預約。' },
      { id: 't2', title: '泉州木偶戲票', instruction: '人氣極高，請務必提前上泉州木偶劇院公眾號或小程式搶票。' },
      { id: 't3', title: '五通船票 (小三通)', instruction: '請打電話或使用金門縣小三通購票系統訂位，若客滿只能現場排候補順延。' },
      { id: 't4', title: '12306 動車票', instruction: '連假期間務必提前下載 12306 App，並買好「漳州-廈門」與「漳州-泉州」動車票。' },
    ]
  }
];

export const flightData = {
  me: {
    depart: '4/28 11:05 台中國際機場T1 (AE765)',
    return: '5/2 09:10 金門機場'
  },
  family: {
    depart: '4/28 13:00 松山國際機場',
    return: '5/2 12:15 金門機場'
  }
};
