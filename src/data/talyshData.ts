export interface Word {
  talysh: string;
  english: string;
  azerbaijani: string;
  russian: string;
  category: string;
}

export interface Lesson {
  id: string;
  title: string;
  titleTalysh: string;
  description: string;
  icon: string;
  category: string;
  words: Word[];
  xpReward: number;
}

export const lessons: Lesson[] = [
  {
    id: "basics-1",
    title: "Basics 1",
    titleTalysh: "Əsason",
    description: "Learn pronouns and essential words",
    icon: "🌟",
    category: "Basics",
    xpReward: 20,
    words: [
      { talysh: "az", english: "I", azerbaijani: "mən", russian: "я", category: "pronouns" },
      { talysh: "tı", english: "you", azerbaijani: "sən", russian: "ты", category: "pronouns" },
      { talysh: "əv", english: "he/she", azerbaijani: "o", russian: "он/она", category: "pronouns" },
      { talysh: "ha", english: "yes", azerbaijani: "bəli", russian: "да", category: "basics" },
      { talysh: "ne", english: "no", azerbaijani: "yox", russian: "нет", category: "basics" },
      { talysh: "çok", english: "good", azerbaijani: "yaxşı", russian: "хорошо", category: "basics" },
      { talysh: "bevəc", english: "bad", azerbaijani: "pis", russian: "плохо", category: "basics" },
      { talysh: "çiç", english: "what", azerbaijani: "nə", russian: "что", category: "basics" },
      { talysh: "ki", english: "who", azerbaijani: "kim", russian: "кто", category: "basics" },
      { talysh: "boçi", english: "why", azerbaijani: "niyə", russian: "почему", category: "basics" },
    ],
  },
  {
    id: "family",
    title: "Family",
    titleTalysh: "Xeyzon",
    description: "Family members and relationships",
    icon: "👨‍👩‍👧‍👦",
    category: "People",
    xpReward: 25,
    words: [
      { talysh: "moa", english: "mother", azerbaijani: "ana", russian: "мать", category: "family" },
      { talysh: "pə", english: "father", azerbaijani: "ata", russian: "отец", category: "family" },
      { talysh: "kinə", english: "girl/daughter", azerbaijani: "qız", russian: "девочка/дочь", category: "family" },
      { talysh: "zoə", english: "boy/son", azerbaijani: "oğlan", russian: "мальчик/сын", category: "family" },
      { talysh: "jen", english: "woman/wife", azerbaijani: "arvad", russian: "женщина/жена", category: "family" },
      { talysh: "merd", english: "man/husband", azerbaijani: "kişi", russian: "мужчина/муж", category: "family" },
      { talysh: "vəyu", english: "bride", azerbaijani: "gəlin", russian: "невеста", category: "family" },
      { talysh: "yəznə", english: "son-in-law", azerbaijani: "kürəkən", russian: "зять", category: "family" },
      { talysh: "xeyzon", english: "family", azerbaijani: "ailə", russian: "семья", category: "family" },
      { talysh: "dust", english: "friend", azerbaijani: "dost", russian: "друг", category: "family" },
    ],
  },
  {
    id: "nature",
    title: "Nature",
    titleTalysh: "Təbiət",
    description: "Nature, weather, and the environment",
    icon: "🌿",
    category: "Nature",
    xpReward: 25,
    words: [
      { talysh: "həşi", english: "sun", azerbaijani: "günəş", russian: "солнце", category: "nature" },
      { talysh: "ovşum", english: "moon", azerbaijani: "ay", russian: "луна", category: "nature" },
      { talysh: "ov", english: "water", azerbaijani: "su", russian: "вода", category: "nature" },
      { talysh: "dıyo", english: "sea", azerbaijani: "dəniz", russian: "море", category: "nature" },
      { talysh: "band", english: "mountain", azerbaijani: "dağ", russian: "гора", category: "nature" },
      { talysh: "ru", english: "river", azerbaijani: "çay", russian: "река", category: "nature" },
      { talysh: "do", english: "tree", azerbaijani: "ağac", russian: "дерево", category: "nature" },
      { talysh: "vıl", english: "flower", azerbaijani: "gül", russian: "цветок", category: "nature" },
      { talysh: "voş", english: "rain", azerbaijani: "yağış", russian: "дождь", category: "nature" },
      { talysh: "vo", english: "wind", azerbaijani: "yel", russian: "ветер", category: "nature" },
    ],
  },
  {
    id: "colors",
    title: "Colors",
    titleTalysh: "Rənqon",
    description: "Learn the colors in Talysh",
    icon: "🎨",
    category: "Basics",
    xpReward: 20,
    words: [
      { talysh: "sı", english: "red", azerbaijani: "qırmızı", russian: "красный", category: "colors" },
      { talysh: "siyo", english: "black", azerbaijani: "qara", russian: "чёрный", category: "colors" },
      { talysh: "zard", english: "yellow", azerbaijani: "sarı", russian: "жёлтый", category: "colors" },
      { talysh: "havz", english: "green", azerbaijani: "yaşıl", russian: "зелёный", category: "colors" },
      { talysh: "kavu", english: "blue", azerbaijani: "mavi", russian: "синий", category: "colors" },
      { talysh: "soğani", english: "pink", azerbaijani: "çəhrayı", russian: "розовый", category: "colors" },
    ],
  },
  {
    id: "body",
    title: "Body Parts",
    titleTalysh: "Bədən",
    description: "Parts of the human body",
    icon: "🫀",
    category: "People",
    xpReward: 25,
    words: [
      { talysh: "sə", english: "head", azerbaijani: "baş", russian: "голова", category: "body" },
      { talysh: "dıl", english: "heart", azerbaijani: "ürək", russian: "сердце", category: "body" },
      { talysh: "çaş", english: "eye", azerbaijani: "göz", russian: "глаз", category: "body" },
      { talysh: "dast", english: "hand", azerbaijani: "əl", russian: "рука", category: "body" },
      { talysh: "dim", english: "face", azerbaijani: "üz", russian: "лицо", category: "body" },
      { talysh: "lınq", english: "foot/leg", azerbaijani: "ayaq", russian: "нога", category: "body" },
      { talysh: "zıvon", english: "tongue/language", azerbaijani: "dil", russian: "язык", category: "body" },
    ],
  },
  {
    id: "actions",
    title: "Actions",
    titleTalysh: "Kon",
    description: "Common verbs and actions",
    icon: "⚡",
    category: "Verbs",
    xpReward: 30,
    words: [
      { talysh: "boy", english: "come!", azerbaijani: "gəl", russian: "иди сюда!", category: "verbs" },
      { talysh: "bışi", english: "go!", azerbaijani: "get", russian: "иди!", category: "verbs" },
      { talysh: "harde", english: "to eat", azerbaijani: "yemək", russian: "есть", category: "verbs" },
      { talysh: "nıvışte", english: "to write", azerbaijani: "yazmaq", russian: "писать", category: "verbs" },
      { talysh: "hande", english: "to read", azerbaijani: "oxumaq", russian: "читать", category: "verbs" },
      { talysh: "vinde", english: "to see", azerbaijani: "görmək", russian: "видеть", category: "verbs" },
      { talysh: "vote", english: "to say", azerbaijani: "demək", russian: "говорить", category: "verbs" },
      { talysh: "umute", english: "to learn", azerbaijani: "öyrənmək", russian: "учить", category: "verbs" },
      { talysh: "jie", english: "to live", azerbaijani: "yaşamaq", russian: "жить", category: "verbs" },
      { talysh: "doy", english: "to give", azerbaijani: "vermək", russian: "давать", category: "verbs" },
    ],
  },
  {
    id: "time",
    title: "Time & Place",
    titleTalysh: "Vaxt",
    description: "Time expressions and directions",
    icon: "⏰",
    category: "Basics",
    xpReward: 25,
    words: [
      { talysh: "ımruj", english: "today", azerbaijani: "bu gün", russian: "сегодня", category: "time" },
      { talysh: "zinə", english: "yesterday", azerbaijani: "dünən", russian: "вчера", category: "time" },
      { talysh: "maşki", english: "tomorrow", azerbaijani: "sabah", russian: "завтра", category: "time" },
      { talysh: "maştə", english: "morning", azerbaijani: "səhər", russian: "утро", category: "time" },
      { talysh: "şəv", english: "night", azerbaijani: "gecə", russian: "ночь", category: "time" },
      { talysh: "şanqo", english: "evening", azerbaijani: "axşam", russian: "вечер", category: "time" },
      { talysh: "rost", english: "right", azerbaijani: "sağ/doğru", russian: "правый/правильно", category: "place" },
      { talysh: "çəp", english: "left", azerbaijani: "sol", russian: "левый", category: "place" },
      { talysh: "sape", english: "up", azerbaijani: "yuxarı", russian: "вверх", category: "place" },
      { talysh: "bəyji", english: "down", azerbaijani: "aşağı", russian: "вниз", category: "place" },
    ],
  },
  {
    id: "home",
    title: "Home & Life",
    titleTalysh: "Kə iən jimon",
    description: "Home, places and daily life",
    icon: "🏠",
    category: "Daily Life",
    xpReward: 25,
    words: [
      { talysh: "kə", english: "house", azerbaijani: "ev", russian: "дом", category: "home" },
      { talysh: "so", english: "yard", azerbaijani: "həyət", russian: "двор", category: "home" },
      { talysh: "bə", english: "door", azerbaijani: "qapı", russian: "дверь", category: "home" },
      { talysh: "ro", english: "road", azerbaijani: "yol", russian: "дорога", category: "home" },
      { talysh: "di", english: "village", azerbaijani: "kənd", russian: "деревня", category: "home" },
      { talysh: "ko", english: "work", azerbaijani: "iş", russian: "работа", category: "home" },
      { talysh: "jimon", english: "life", azerbaijani: "həyat", russian: "жизнь", category: "home" },
      { talysh: "poə", english: "money", azerbaijani: "para", russian: "деньги", category: "home" },
      { talysh: "kişvər", english: "country", azerbaijani: "ölkə", russian: "страна", category: "home" },
      { talysh: "dınyo", english: "world", azerbaijani: "dünya", russian: "мир", category: "home" },
    ],
  },
];

export interface Phrase {
  talysh: string;
  english: string;
  azerbaijani: string;
  russian: string;
}

export const commonPhrases: Phrase[] = [
  { talysh: "Çoknə i?", english: "How are you?", azerbaijani: "Necəsən?", russian: "Как дела?" },
  { talysh: "Az çoki.", english: "I am good.", azerbaijani: "Mən yaxşıyam.", russian: "У меня всё хорошо." },
  { talysh: "Tı çoknə i?", english: "How are you?", azerbaijani: "Sən necəsən?", russian: "Как ты?" },
  { talysh: "Tı nomi çiçe?", english: "What is your name?", azerbaijani: "Sənin adın nədir?", russian: "Как тебя зовут?" },
  { talysh: "Çımı nom ... -e.", english: "My name is ...", azerbaijani: "Mənim adım ...-dir.", russian: "Меня зовут ..." },
  { talysh: "Xıdo hafiz!", english: "Goodbye!", azerbaijani: "Xudahafiz!", russian: "До свидания!" },
  { talysh: "Sıpas!", english: "Thank you!", azerbaijani: "Təşəkkür!", russian: "Спасибо!" },
  { talysh: "Bışi bə salamat!", english: "Go safely!", azerbaijani: "Salamat get!", russian: "Иди с миром!" },
];
