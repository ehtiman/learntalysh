import { createContext, useContext, useState, ReactNode } from "react";

export type Language = "az" | "en" | "ru";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations: Record<string, Record<Language, string>> = {
  // Navbar
  "nav.home": { az: "Ana Səhifə", en: "Home", ru: "Главная" },
  "nav.lessons": { az: "Dərslər", en: "Lessons", ru: "Уроки" },
  "nav.progress": { az: "İrəliləyiş", en: "Progress", ru: "Прогресс" },
  "nav.signIn": { az: "Daxil ol", en: "Sign In", ru: "Войти" },

  // Index page
  "hero.badge": { az: "50 dərs və 500+ söz mövcuddur", en: "50 lessons with 500+ words available", ru: "50 уроков с 500+ словами" },
  "hero.title1": { az: "Öyrən", en: "Learn", ru: "Изучай" },
  "hero.title2": { az: "Talışca", en: "Talysh", ru: "Талышский" },
  "hero.title3": { az: "Hər dəfə bir söz", en: "One Word at a Time", ru: "По одному слову" },
  "hero.subtitle": { az: "İnteraktiv dərslər vasitəsilə qədim Talış dilini öyrənin. İrəliləyişinizi izləyin və mükafatlar qazanın.", en: "Master the ancient Talysh language through fun, interactive lessons. Track your progress and earn rewards as you go.", ru: "Изучайте древний талышский язык через интерактивные уроки. Отслеживайте прогресс и зарабатывайте награды." },
  "hero.startFree": { az: "Pulsuz Öyrənməyə Başla", en: "Start Learning Free", ru: "Начать бесплатно" },
  "hero.continue": { az: "Öyrənməyə Davam Et", en: "Continue Learning", ru: "Продолжить обучение" },
  "hero.browse": { az: "Dərslərə Bax", en: "Browse Lessons", ru: "Просмотр уроков" },

  // Features
  "features.title": { az: "Niyə LearnTalysh?", en: "Why LearnTalysh?", ru: "Почему LearnTalysh?" },
  "features.lessons.title": { az: "Qısa Dərslər", en: "Bite-Sized Lessons", ru: "Короткие уроки" },
  "features.lessons.desc": { az: "Real Talış sözləri ilə qısa, fokuslanmış dərslərdə lüğət öyrənin.", en: "Learn vocabulary through short, focused lessons with real Talysh words.", ru: "Учите слова через короткие, целенаправленные уроки с настоящими талышскими словами." },
  "features.quizzes.title": { az: "İnteraktiv Testlər", en: "Interactive Quizzes", ru: "Интерактивные тесты" },
  "features.quizzes.desc": { az: "Biliyinizi çoxseçimli testlərlə yoxlayın və XP qazanın.", en: "Test your knowledge with multiple-choice quizzes and earn XP.", ru: "Проверяйте знания с помощью тестов и зарабатывайте XP." },
  "features.progress.title": { az: "İrəliləyişi İzlə", en: "Track Progress", ru: "Отслеживание прогресса" },
  "features.progress.desc": { az: "Seriyalarınızı, səviyyələrinizi və ballarınızı görün.", en: "See your streaks, levels, and scores to stay motivated.", ru: "Следите за сериями, уровнями и баллами для мотивации." },
  "features.ancient.title": { az: "Qədim Dil", en: "Ancient Language", ru: "Древний язык" },
  "features.ancient.desc": { az: "Talış dilini kəşf edin — qədim Avesta dilinin yaşayan nəsli.", en: "Explore the Talysh language — a living descendant of the ancient Avestan language.", ru: "Откройте талышский язык — живой потомок древнего авестийского языка." },

  // Common Phrases
  "phrases.title": { az: "Ümumi İfadələr", en: "Common Phrases", ru: "Общие фразы" },
  "phrases.subtitle": { az: "Bu gündəlik ifadələrlə Talış dilini dadın", en: "Get a taste of Talysh with these everyday expressions", ru: "Познакомьтесь с талышским через повседневные выражения" },
  "phrases.startCourse": { az: "Tam Kursa Başla", en: "Start Full Course", ru: "Начать полный курс" },

  // Footer
  "footer.text": { az: "Talış dilinin qorunması və öyrədilməsi — dünyanın ən qədim yaşayan dillərindən biri.", en: "Preserving and teaching the Talysh language — one of the world's most ancient living languages.", ru: "Сохранение и обучение талышскому языку — одному из древнейших живых языков мира." },

  // Lessons page
  "lessons.title": { az: "Dərslər", en: "Lessons", ru: "Уроки" },
  "lessons.subtitle": { az: "Dərsləri tamamlayın, XP qazanın və səviyyənizi artırın", en: "Complete lessons to earn XP and level up", ru: "Выполняйте уроки, зарабатывайте XP и повышайте уровень" },
  "lessons.totalXp": { az: "Ümumi XP", en: "Total XP", ru: "Всего XP" },
  "lessons.level": { az: "Səviyyə", en: "Level", ru: "Уровень" },
  "lessons.completed": { az: "Tamamlandı", en: "Completed", ru: "Завершено" },
  "lessons.best": { az: "Ən yaxşı", en: "Best", ru: "Лучший" },

  // Lesson categories
  "cat.Basics": { az: "Əsaslar", en: "Basics", ru: "Основы" },
  "cat.People": { az: "İnsanlar", en: "People", ru: "Люди" },
  "cat.Nature": { az: "Təbiət", en: "Nature", ru: "Природа" },
  "cat.Verbs": { az: "Fellər", en: "Verbs", ru: "Глаголы" },
  "cat.Daily Life": { az: "Gündəlik Həyat", en: "Daily Life", ru: "Повседневная жизнь" },

  // Lesson titles
  "lesson.basics-1": { az: "Əsaslar 1", en: "Basics 1", ru: "Основы 1" },
  "lesson.family": { az: "Ailə", en: "Family", ru: "Семья" },
  "lesson.nature": { az: "Təbiət", en: "Nature", ru: "Природа" },
  "lesson.colors": { az: "Rənglər", en: "Colors", ru: "Цвета" },
  "lesson.body": { az: "Bədən Hissələri", en: "Body Parts", ru: "Части тела" },
  "lesson.actions": { az: "Hərəkətlər", en: "Actions", ru: "Действия" },
  "lesson.time": { az: "Vaxt və Yer", en: "Time & Place", ru: "Время и место" },
  "lesson.home": { az: "Ev və Həyat", en: "Home & Life", ru: "Дом и жизнь" },

  // Lesson descriptions
  "desc.basics-1": { az: "Əvəzlikləri və əsas sözləri öyrənin", en: "Learn pronouns and essential words", ru: "Изучите местоимения и основные слова" },
  "desc.family": { az: "Ailə üzvləri və münasibətlər", en: "Family members and relationships", ru: "Члены семьи и отношения" },
  "desc.nature": { az: "Təbiət, hava və ətraf mühit", en: "Nature, weather, and the environment", ru: "Природа, погода и окружающая среда" },
  "desc.colors": { az: "Talış dilində rəngləri öyrənin", en: "Learn the colors in Talysh", ru: "Изучите цвета на талышском" },
  "desc.body": { az: "İnsan bədəninin hissələri", en: "Parts of the human body", ru: "Части человеческого тела" },
  "desc.actions": { az: "Ümumi fellər və hərəkətlər", en: "Common verbs and actions", ru: "Распространённые глаголы и действия" },
  "desc.time": { az: "Vaxt ifadələri və istiqamətlər", en: "Time expressions and directions", ru: "Временные выражения и направления" },
  "desc.home": { az: "Ev, yerlər və gündəlik həyat", en: "Home, places and daily life", ru: "Дом, места и повседневная жизнь" },

  // New lesson categories
  "cat.Grammar": { az: "Qrammatika", en: "Grammar", ru: "Грамматика" },
  "cat.Culture": { az: "Mədəniyyət", en: "Culture", ru: "Культура" },

  // New lesson titles & descriptions (42 lessons)
  "lesson.numbers": { az: "Rəqəmlər 1-10", en: "Numbers 1-10", ru: "Числа 1-10" },
  "desc.numbers": { az: "Talış dilində birdən ona qədər saymağı öyrənin", en: "Learn to count from one to ten in Talysh", ru: "Научитесь считать от одного до десяти на талышском языке" },
  "lesson.food": { az: "Yemək və İçkilər", en: "Food & Drinks", ru: "Еда и напитки" },
  "desc.food": { az: "Yemək və içkilər üçün əsas lüğət", en: "Essential vocabulary for food and drinks", ru: "Основная лексика для еды и напитков" },
  "lesson.animals": { az: "Heyvanlar", en: "Animals", ru: "Животные" },
  "desc.animals": { az: "Ümumi heyvanların adlarını öyrənin", en: "Learn the names of common animals", ru: "Изучите названия распространенных животных" },
  "lesson.greetings": { az: "Salamlaşma və Nəzakət", en: "Greetings & Politeness", ru: "Приветствия и вежливость" },
  "desc.greetings": { az: "Salamlaşma və nəzakət üçün əsas ifadələr", en: "Basic phrases for greetings and showing politeness", ru: "Основные фразы для приветствий и вежливости" },
  "lesson.clothing": { az: "Geyimlər", en: "Clothing", ru: "Одежда" },
  "desc.clothing": { az: "Ümumi geyim əşyaları üçün sözləri öyrənin", en: "Learn words for common items of clothing", ru: "Изучите слова для предметов одежды" },
  "lesson.emotions": { az: "Hisslər və Duyğular", en: "Emotions & Feelings", ru: "Эмоции и чувства" },
  "desc.emotions": { az: "Hisslərinizi Talış dilində ifadə edin", en: "Express your feelings in Talysh", ru: "Выразите свои чувства на талышском языке" },
  "lesson.weather": { az: "Hava və Fəsillər", en: "Weather & Seasons", ru: "Погода и времена года" },
  "desc.weather": { az: "Hava və müxtəlif fəsillər haqqında danışın", en: "Talk about the weather and different seasons", ru: "Расскажите о погоде и разных временах года" },
  "lesson.market": { az: "Bazarda", en: "At the Market", ru: "На рынке" },
  "desc.market": { az: "Bazarda alış-veriş üçün lüğət", en: "Vocabulary for shopping at the market", ru: "Лексика для покупок на рынке" },
  "lesson.travel": { az: "Səyahət və Nəqliyyat", en: "Travel & Transport", ru: "Путешествия и транспорт" },
  "desc.travel": { az: "Ətrafda hərəkət etmək və səyahət üçün sözlər", en: "Words for getting around and traveling", ru: "Слова для передвижения и путешествий" },
  "lesson.school": { az: "Məktəb və Təhsil", en: "School & Education", ru: "Школа и образование" },
  "desc.school": { az: "Məktəb və təhsillə bağlı lüğət", en: "Vocabulary related to school and learning", ru: "Лексика, связанная со школой и обучением" },
  "lesson.occupations": { az: "Peşələr", en: "Occupations", ru: "Профессии" },
  "desc.occupations": { az: "Müxtəlif işlər və peşələr haqqında öyrənin", en: "Learn about different jobs and professions", ru: "Узнайте о различных работах и профессиях" },
  "lesson.adjectives": { az: "Ümumi Sifətlər", en: "Common Adjectives", ru: "Общие прилагательные" },
  "desc.adjectives": { az: "Əşyaları və insanları təsvir etmək üçün əsas sifətlər", en: "Learn basic adjectives to describe things and people", ru: "Изучите основные прилагательные для описания" },
  "lesson.kitchen": { az: "Mətbəx və Bişirmək", en: "Kitchen & Cooking", ru: "Кухня и готовка" },
  "desc.kitchen": { az: "Mətbəx və kulinariya fəaliyyətləri üçün əsas sözlər", en: "Learn key terms for the kitchen and culinary activities", ru: "Изучите основные термины для кухни и кулинарии" },
  "lesson.health": { az: "Sağlamlıq və Həkim", en: "Health & Doctor", ru: "Здоровье и врач" },
  "desc.health": { az: "Sağlamlıq və həkimə getmək haqqında lüğət", en: "Vocabulary for discussing health and visiting the doctor", ru: "Лексика для обсуждения здоровья и посещения врача" },
  "lesson.fruits": { az: "Meyvələr və Tərəvəzlər", en: "Fruits & Vegetables", ru: "Фрукты и овощи" },
  "desc.fruits": { az: "Talış dilində ümumi meyvə və tərəvəzləri öyrənin", en: "Learn common fruits and vegetables in Talysh", ru: "Изучите распространенные фрукты и овощи" },
  "lesson.house-items": { az: "Məişət Əşyaları", en: "Household Items", ru: "Предметы быта" },
  "desc.house-items": { az: "Evdə tapılan ümumi əşyalar üçün sözlər", en: "Discover words for common items found in a house", ru: "Откройте слова для предметов домашнего обихода" },
  "lesson.numbers2": { az: "Rəqəmlər 11-100", en: "Numbers 11-100", ru: "Числа 11-100" },
  "desc.numbers2": { az: "On birdən yüzə qədər saymağı davam etdirin", en: "Continue counting from eleven to one hundred", ru: "Продолжайте считать от одиннадцати до ста" },
  "lesson.verbs2": { az: "Daha çox Hərəkət", en: "More Actions", ru: "Больше действий" },
  "desc.verbs2": { az: "Daha çox fellərlə lüğətinizi genişləndirin", en: "Expand your Talysh vocabulary with more action verbs", ru: "Расширьте словарный запас глаголами действия" },
  "lesson.greetings2": { az: "Vidalaşmalar və Arzular", en: "Farewells & Wishes", ru: "Прощания и пожелания" },
  "desc.greetings2": { az: "Necə vidalaşmağı və xoş arzular bildirməyi öyrənin", en: "Learn how to say goodbye and express good wishes", ru: "Научитесь прощаться и выражать добрые пожелания" },
  "lesson.sports": { az: "İdman və Oyunlar", en: "Sports & Games", ru: "Спорт и игры" },
  "desc.sports": { az: "İdman və fiziki fəaliyyətlərlə bağlı sözlər", en: "Learn words related to sports and physical activities", ru: "Изучите слова, связанные со спортом и играми" },
  "lesson.music": { az: "Musiqi və İncəsənət", en: "Music & Art", ru: "Музыка и искусство" },
  "desc.music": { az: "Musiqi və incəsənətlə bağlı sözlər", en: "Explore words tied to music, art, and culture", ru: "Исследуйте слова о музыке и искусстве" },
  "lesson.religion": { az: "İnam və Ənənələr", en: "Faith & Traditions", ru: "Вера и традиции" },
  "desc.religion": { az: "İnam, din və mədəni ənənələrlə bağlı sözlər", en: "Words related to faith, religion, and cultural traditions", ru: "Слова о вере, религии и культурных традициях" },
  "lesson.garden": { az: "Bağ və Əkinçilik", en: "Garden & Farming", ru: "Сад и хозяйство" },
  "desc.garden": { az: "Bağ, bitkilər və əkinçilik sözləri", en: "Learn words for garden elements, plants, and farming", ru: "Изучите слова для сада, растений и сельского хозяйства" },
  "lesson.tools": { az: "Alətlər və Materiallar", en: "Tools & Materials", ru: "Инструменты и материалы" },
  "desc.tools": { az: "Ümumi alətlər və materialların adlarını öyrənin", en: "Learn names of common tools and materials", ru: "Изучите названия инструментов и материалов" },
  "lesson.city": { az: "Şəhər və Yerlər", en: "City & Places", ru: "Город и места" },
  "desc.city": { az: "Şəhərlər və müxtəlif yerlərlə bağlı lüğət", en: "Learn vocabulary related to cities and places", ru: "Изучите лексику о городах и местах" },
  "lesson.sentences1": { az: "Sadə Cümlələr 1", en: "Simple Sentences 1", ru: "Простые предложения 1" },
  "desc.sentences1": { az: "Talış dilində əsas cümlələr qurmağı məşq edin", en: "Practice forming basic sentences in Talysh", ru: "Потренируйтесь составлять простые предложения" },
  "lesson.sentences2": { az: "Sadə Cümlələr 2", en: "Simple Sentences 2", ru: "Простые предложения 2" },
  "desc.sentences2": { az: "Daha çox gündəlik cümlələr və ifadələr", en: "More everyday sentences and expressions", ru: "Больше повседневных предложений и выражений" },
  "lesson.opposites": { az: "Əksliklər", en: "Opposites", ru: "Противоположности" },
  "desc.opposites": { az: "Antonimlər və əks mənalı sözləri öyrənin", en: "Learn antonyms and words with opposite meanings", ru: "Изучите антонимы и слова с противоположным значением" },
  "lesson.family2": { az: "Geniş Ailə", en: "Extended Family", ru: "Расширенная семья" },
  "desc.family2": { az: "Baba, nənə və digər qohumlar", en: "Grandparents, in-laws, and other relatives", ru: "Бабушки, дедушки и другие родственники" },
  "lesson.days": { az: "Günlər və Aylar", en: "Days & Months", ru: "Дни и месяцы" },
  "desc.days": { az: "Həftənin günləri və ilin ayları", en: "Days of the week and months of the year", ru: "Дни недели и месяцы года" },
  "lesson.insects": { az: "Həşəratlar", en: "Insects & Small Animals", ru: "Насекомые" },
  "desc.insects": { az: "Həşəratlar və kiçik heyvanlar", en: "Insects and small animals", ru: "Насекомые и мелкие животные" },
  "lesson.verbs3": { az: "Gündəlik Rutinlər", en: "Daily Routines", ru: "Ежедневные рутины" },
  "desc.verbs3": { az: "Gündəlik fəaliyyətlərlə bağlı fellər", en: "Verbs related to daily activities", ru: "Глаголы, связанные с повседневными действиями" },
  "lesson.questions": { az: "Sual Sözləri", en: "Question Words & Phrases", ru: "Вопросительные слова" },
  "desc.questions": { az: "Suallar qurmağı öyrənin", en: "Learn to form questions in Talysh", ru: "Научитесь задавать вопросы" },
  "lesson.negation": { az: "İnkar", en: "Negation & Denial", ru: "Отрицание" },
  "desc.negation": { az: "İnkar cümlələr qurmağı öyrənin", en: "Learn to form negative sentences", ru: "Научитесь строить отрицательные предложения" },
  "lesson.plurals": { az: "Cəm və Miqdar", en: "Plurals & Quantities", ru: "Множественное число" },
  "desc.plurals": { az: "Cəm formaları və miqdar bildirən sözlər", en: "Plural forms and quantity words", ru: "Формы множественного числа и количественные слова" },
  "lesson.geography": { az: "Coğrafiya", en: "Geography & Landscape", ru: "География и ландшафт" },
  "desc.geography": { az: "Coğrafi terminlər və landşaft sözləri", en: "Geographic terms and landscape vocabulary", ru: "Географические термины и ландшафтная лексика" },
  "lesson.celebrations": { az: "Bayramlar", en: "Holidays & Celebrations", ru: "Праздники" },
  "desc.celebrations": { az: "Bayramlar və xüsusi günlər haqqında sözlər", en: "Words about holidays and special occasions", ru: "Слова о праздниках и особых событиях" },
  "lesson.proverbs": { az: "Atalar Sözləri", en: "Proverbs & Sayings", ru: "Пословицы и поговорки" },
  "desc.proverbs": { az: "Talış atalar sözləri və deyimləri", en: "Talysh proverbs and traditional sayings", ru: "Талышские пословицы и традиционные поговорки" },
  "lesson.restaurant": { az: "Restoranda", en: "At the Restaurant", ru: "В ресторане" },
  "desc.restaurant": { az: "Restoranda sifariş vermək üçün ifadələr", en: "Phrases for ordering at a restaurant", ru: "Фразы для заказа в ресторане" },
  "lesson.directions": { az: "Yol Soruşmaq", en: "Asking Directions", ru: "Как спросить дорогу" },
  "desc.directions": { az: "Yol və istiqamət soruşmaq üçün ifadələr", en: "Phrases for asking and giving directions", ru: "Фразы для вопросов и указаний дороги" },
  "lesson.feelings2": { az: "Xarakter və Şəxsiyyət", en: "Character & Personality", ru: "Характер и личность" },
  "desc.feelings2": { az: "İnsanların xarakterini təsvir etmək üçün sözlər", en: "Words to describe people's character and personality", ru: "Слова для описания характера и личности людей" },
  "lesson.phrases2": { az: "Faydalı İfadələr", en: "Useful Phrases", ru: "Полезные фразы" },
  "desc.phrases2": { az: "Gündəlik həyatda lazım olan faydalı ifadələr", en: "Useful everyday phrases for daily life", ru: "Полезные повседневные фразы для жизни" },

  // LessonView
  "lv.learn": { az: "Öyrən", en: "Learn", ru: "Учить" },
  "lv.quiz": { az: "Test", en: "Quiz", ru: "Тест" },
  "lv.done": { az: "Hazır!", en: "Done!", ru: "Готово!" },
  "lv.word": { az: "Söz", en: "Word", ru: "Слово" },
  "lv.of": { az: "-dən", en: "of", ru: "из" },
  "lv.nextWord": { az: "Növbəti Söz", en: "Next Word", ru: "Следующее слово" },
  "lv.startQuiz": { az: "Testə Başla", en: "Start Quiz", ru: "Начать тест" },
  "lv.question": { az: "Sual", en: "Question", ru: "Вопрос" },
  "lv.whatMean": { az: "Bu nə deməkdir?", en: "What does this mean?", ru: "Что это значит?" },
  "lv.howSay": { az: "Bunu Talışca necə deyərlər?", en: "How do you say this in Talysh?", ru: "Как это сказать на талышском?" },
  "lv.nextQuestion": { az: "Növbəti Sual", en: "Next Question", ru: "Следующий вопрос" },
  "lv.seeResults": { az: "Nəticələrə Bax", en: "See Results", ru: "Результаты" },
  "lv.perfect": { az: "Mükəmməl!", en: "Perfect!", ru: "Отлично!" },
  "lv.greatJob": { az: "Əla İş!", en: "Great Job!", ru: "Отличная работа!" },
  "lv.keepPracticing": { az: "Təcrübəyə Davam Et!", en: "Keep Practicing!", ru: "Продолжайте практику!" },
  "lv.correct": { az: "düzgün", en: "correct", ru: "правильно" },
  "lv.retry": { az: "Yenidən Cəhd Et", en: "Retry", ru: "Повторить" },
  "lv.moreLessons": { az: "Daha Çox Dərs", en: "More Lessons", ru: "Ещё уроки" },
  "lv.notFound": { az: "Dərs tapılmadı", en: "Lesson not found", ru: "Урок не найден" },
  "lv.backToLessons": { az: "Dərslərə Qayıt", en: "Back to Lessons", ru: "Вернуться к урокам" },

  // Dashboard
  "dash.title": { az: "İrəliləyişiniz", en: "Your Progress", ru: "Ваш прогресс" },
  "dash.totalXp": { az: "Ümumi XP", en: "Total XP", ru: "Всего XP" },
  "dash.xpToNext": { az: "növbəti səviyyəyə XP", en: "XP to next", ru: "XP до следующего" },
  "dash.lessonsDone": { az: "Tamamlanan Dərslər", en: "Lessons Done", ru: "Уроков пройдено" },
  "dash.complete": { az: "Tamamlandı", en: "Complete", ru: "Завершено" },
  "dash.lessonScores": { az: "Dərs Balları", en: "Lesson Scores", ru: "Баллы за уроки" },
  "dash.words": { az: "söz", en: "words", ru: "слов" },
  "dash.bestScore": { az: "Ən yaxşı bal", en: "Best score", ru: "Лучший балл" },
  "dash.notStarted": { az: "Başlanmayıb", en: "Not started", ru: "Не начато" },
  "dash.signInTitle": { az: "İrəliləyişinizi İzləyin", en: "Track Your Progress", ru: "Отслеживайте прогресс" },
  "dash.signInText": { az: "İrəliləyişinizi saxlamaq və öyrənmə yolculuğunuzu izləmək üçün daxil olun", en: "Sign in to save your progress and track your learning journey", ru: "Войдите, чтобы сохранить прогресс и отслеживать обучение" },
  "dash.signInBtn": { az: "Davam Etmək Üçün Daxil Olun", en: "Sign In to Continue", ru: "Войти для продолжения" },

  // Auth
  "auth.welcomeBack": { az: "Xoş Gəlmisiniz", en: "Welcome Back", ru: "С возвращением" },
  "auth.join": { az: "LearnTalysh-a Qoşulun", en: "Join LearnTalysh", ru: "Присоединяйтесь к LearnTalysh" },
  "auth.loginSubtitle": { az: "Talış dili yolculuğunuza davam edin", en: "Continue your Talysh language journey", ru: "Продолжите изучение талышского языка" },
  "auth.signupSubtitle": { az: "Qədim Talış dilini öyrənməyə başlayın", en: "Start learning the ancient Talysh language", ru: "Начните изучать древний талышский язык" },
  "auth.email": { az: "E-poçt", en: "Email", ru: "Эл. почта" },
  "auth.password": { az: "Şifrə", en: "Password", ru: "Пароль" },
  "auth.signIn": { az: "Daxil Ol", en: "Sign In", ru: "Войти" },
  "auth.createAccount": { az: "Hesab Yarat", en: "Create Account", ru: "Создать аккаунт" },
  "auth.loading": { az: "Yüklənir...", en: "Loading...", ru: "Загрузка..." },
  "auth.noAccount": { az: "Hesabınız yoxdur?", en: "Don't have an account?", ru: "Нет аккаунта?" },
  "auth.hasAccount": { az: "Artıq hesabınız var?", en: "Already have an account?", ru: "Уже есть аккаунт?" },
  "auth.signUp": { az: "Qeydiyyat", en: "Sign Up", ru: "Регистрация" },
  "auth.welcomeToast": { az: "Xoş gəlmisiniz! 🎉", en: "Welcome back! 🎉", ru: "С возвращением! 🎉" },
  "auth.accountCreated": { az: "Hesab yaradıldı! Təsdiq üçün e-poçtunuzu yoxlayın.", en: "Account created! Check your email to confirm.", ru: "Аккаунт создан! Проверьте почту для подтверждения." },
  "auth.error": { az: "Xəta", en: "Error", ru: "Ошибка" },
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem("learntalysh-lang");
    return (saved as Language) || "az";
  });

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem("learntalysh-lang", lang);
  };

  const t = (key: string): string => {
    return translations[key]?.[language] || translations[key]?.["en"] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within LanguageProvider");
  return context;
};
