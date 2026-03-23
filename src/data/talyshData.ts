export interface Word {
  talysh: string;
  english: string;
  azerbaijani: string;
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
      { talysh: "az", english: "I", azerbaijani: "mən", category: "pronouns" },
      { talysh: "tı", english: "you", azerbaijani: "sən", category: "pronouns" },
      { talysh: "əv", english: "he/she", azerbaijani: "o", category: "pronouns" },
      { talysh: "ha", english: "yes", azerbaijani: "bəli", category: "basics" },
      { talysh: "ne", english: "no", azerbaijani: "yox", category: "basics" },
      { talysh: "çok", english: "good", azerbaijani: "yaxşı", category: "basics" },
      { talysh: "bevəc", english: "bad", azerbaijani: "pis", category: "basics" },
      { talysh: "çiç", english: "what", azerbaijani: "nə", category: "basics" },
      { talysh: "ki", english: "who", azerbaijani: "kim", category: "basics" },
      { talysh: "boçi", english: "why", azerbaijani: "niyə", category: "basics" },
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
      { talysh: "moa", english: "mother", azerbaijani: "ana", category: "family" },
      { talysh: "pə", english: "father", azerbaijani: "ata", category: "family" },
      { talysh: "kinə", english: "girl/daughter", azerbaijani: "qız", category: "family" },
      { talysh: "zoə", english: "boy/son", azerbaijani: "oğlan", category: "family" },
      { talysh: "jen", english: "woman/wife", azerbaijani: "arvad", category: "family" },
      { talysh: "merd", english: "man/husband", azerbaijani: "kişi", category: "family" },
      { talysh: "vəyu", english: "bride", azerbaijani: "gəlin", category: "family" },
      { talysh: "yəznə", english: "son-in-law", azerbaijani: "kürəkən", category: "family" },
      { talysh: "xeyzon", english: "family", azerbaijani: "ailə", category: "family" },
      { talysh: "dust", english: "friend", azerbaijani: "dost", category: "family" },
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
      { talysh: "həşi", english: "sun", azerbaijani: "günəş", category: "nature" },
      { talysh: "ovşum", english: "moon", azerbaijani: "ay", category: "nature" },
      { talysh: "ov", english: "water", azerbaijani: "su", category: "nature" },
      { talysh: "dıyo", english: "sea", azerbaijani: "dəniz", category: "nature" },
      { talysh: "band", english: "mountain", azerbaijani: "dağ", category: "nature" },
      { talysh: "ru", english: "river", azerbaijani: "çay", category: "nature" },
      { talysh: "do", english: "tree", azerbaijani: "ağac", category: "nature" },
      { talysh: "vıl", english: "flower", azerbaijani: "gül", category: "nature" },
      { talysh: "voş", english: "rain", azerbaijani: "yağış", category: "nature" },
      { talysh: "vo", english: "wind", azerbaijani: "yel", category: "nature" },
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
      { talysh: "sı", english: "red", azerbaijani: "qırmızı", category: "colors" },
      { talysh: "siyo", english: "black", azerbaijani: "qara", category: "colors" },
      { talysh: "zard", english: "yellow", azerbaijani: "sarı", category: "colors" },
      { talysh: "havz", english: "green", azerbaijani: "yaşıl", category: "colors" },
      { talysh: "kavu", english: "blue", azerbaijani: "mavi", category: "colors" },
      { talysh: "soğani", english: "pink", azerbaijani: "çəhrayı", category: "colors" },
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
      { talysh: "sə", english: "head", azerbaijani: "baş", category: "body" },
      { talysh: "dıl", english: "heart", azerbaijani: "ürək", category: "body" },
      { talysh: "çaş", english: "eye", azerbaijani: "göz", category: "body" },
      { talysh: "dast", english: "hand", azerbaijani: "əl", category: "body" },
      { talysh: "dim", english: "face", azerbaijani: "üz", category: "body" },
      { talysh: "lınq", english: "foot/leg", azerbaijani: "ayaq", category: "body" },
      { talysh: "zıvon", english: "tongue/language", azerbaijani: "dil", category: "body" },
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
      { talysh: "boy", english: "come!", azerbaijani: "gəl", category: "verbs" },
      { talysh: "bışi", english: "go!", azerbaijani: "get", category: "verbs" },
      { talysh: "harde", english: "to eat", azerbaijani: "yemək", category: "verbs" },
      { talysh: "nıvışte", english: "to write", azerbaijani: "yazmaq", category: "verbs" },
      { talysh: "hande", english: "to read", azerbaijani: "oxumaq", category: "verbs" },
      { talysh: "vinde", english: "to see", azerbaijani: "görmək", category: "verbs" },
      { talysh: "vote", english: "to say", azerbaijani: "demək", category: "verbs" },
      { talysh: "umute", english: "to learn", azerbaijani: "öyrənmək", category: "verbs" },
      { talysh: "jie", english: "to live", azerbaijani: "yaşamaq", category: "verbs" },
      { talysh: "doy", english: "to give", azerbaijani: "vermək", category: "verbs" },
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
      { talysh: "ımruj", english: "today", azerbaijani: "bu gün", category: "time" },
      { talysh: "zinə", english: "yesterday", azerbaijani: "dünən", category: "time" },
      { talysh: "maşki", english: "tomorrow", azerbaijani: "sabah", category: "time" },
      { talysh: "maştə", english: "morning", azerbaijani: "səhər", category: "time" },
      { talysh: "şəv", english: "night", azerbaijani: "gecə", category: "time" },
      { talysh: "şanqo", english: "evening", azerbaijani: "axşam", category: "time" },
      { talysh: "rost", english: "right", azerbaijani: "sağ/doğru", category: "place" },
      { talysh: "çəp", english: "left", azerbaijani: "sol", category: "place" },
      { talysh: "sape", english: "up", azerbaijani: "yuxarı", category: "place" },
      { talysh: "bəyji", english: "down", azerbaijani: "aşağı", category: "place" },
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
      { talysh: "kə", english: "house", azerbaijani: "ev", category: "home" },
      { talysh: "so", english: "yard", azerbaijani: "həyət", category: "home" },
      { talysh: "bə", english: "door", azerbaijani: "qapı", category: "home" },
      { talysh: "ro", english: "road", azerbaijani: "yol", category: "home" },
      { talysh: "di", english: "village", azerbaijani: "kənd", category: "home" },
      { talysh: "ko", english: "work", azerbaijani: "iş", category: "home" },
      { talysh: "jimon", english: "life", azerbaijani: "həyat", category: "home" },
      { talysh: "poə", english: "money", azerbaijani: "para", category: "home" },
      { talysh: "kişvər", english: "country", azerbaijani: "ölkə", category: "home" },
      { talysh: "dınyo", english: "world", azerbaijani: "dünya", category: "home" },
    ],
  },
];

export interface Phrase {
  talysh: string;
  english: string;
  azerbaijani: string;
}

export const commonPhrases: Phrase[] = [
  { talysh: "Çoknə i?", english: "How are you?", azerbaijani: "Necəsən?" },
  { talysh: "Az çoki.", english: "I am good.", azerbaijani: "Mən yaxşıyam." },
  { talysh: "Tı çoknə i?", english: "How are you?", azerbaijani: "Sən necəsən?" },
  { talysh: "Tı nomi çiçe?", english: "What is your name?", azerbaijani: "Sənin adın nədir?" },
  { talysh: "Çımı nom ... -e.", english: "My name is ...", azerbaijani: "Mənim adım ...-dir." },
  { talysh: "Xıdo hafiz!", english: "Goodbye!", azerbaijani: "Xudahafiz!" },
  { talysh: "Sıpas!", english: "Thank you!", azerbaijani: "Təşəkkür!" },
  { talysh: "Bışi bə salamat!", english: "Go safely!", azerbaijani: "Salamat get!" },
];
