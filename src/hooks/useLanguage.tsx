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
