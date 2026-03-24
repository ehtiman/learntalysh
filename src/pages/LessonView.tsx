import { useState, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { lessons, Word } from "@/data/talyshData";
import { useProgress } from "@/hooks/useProgress";
import { useLanguage, Language } from "@/hooks/useLanguage";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, ArrowRight, RotateCcw, BookOpen } from "lucide-react";

const getWordTranslation = (word: Word, lang: Language) => {
  if (lang === "ru") return word.russian;
  if (lang === "en") return word.english;
  return word.azerbaijani;
};

type QuizQuestion = {
  word: Word;
  options: string[];
  correctIndex: number;
  direction: "talysh-to-translation" | "translation-to-talysh";
};

const generateQuestions = (words: Word[], lang: Language): QuizQuestion[] => {
  const questions: QuizQuestion[] = [];
  const shuffled = [...words].sort(() => Math.random() - 0.5);

  for (const word of shuffled) {
    const direction: "talysh-to-translation" | "translation-to-talysh" =
      Math.random() > 0.5 ? "talysh-to-translation" : "translation-to-talysh";

    const correctAnswer =
      direction === "talysh-to-translation" ? getWordTranslation(word, lang) : word.talysh;
    const otherWords = words
      .filter((w) => w.talysh !== word.talysh)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);

    const wrongAnswers = otherWords.map((w) =>
      direction === "talysh-to-translation" ? getWordTranslation(w, lang) : w.talysh
    );

    const options = [...wrongAnswers, correctAnswer].sort(() => Math.random() - 0.5);

    questions.push({
      word,
      options,
      correctIndex: options.indexOf(correctAnswer),
      direction,
    });
  }

  return questions;
};

const LessonView = () => {
  const { lessonId } = useParams();
  const { completeLesson } = useProgress();
  const { language, t } = useLanguage();

  const lesson = lessons.find((l) => l.id === lessonId);
  const [phase, setPhase] = useState<"learn" | "quiz" | "results">("learn");
  const [learnIndex, setLearnIndex] = useState(0);
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);

  const questions = useMemo(
    () => (lesson ? generateQuestions(lesson.words, language) : []),
    [lesson, language]
  );

  if (!lesson) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center">
        <p className="text-lg text-muted-foreground">{t("lv.notFound")}</p>
        <Link to="/lessons">
          <Button variant="default" className="mt-4">
            {t("lv.backToLessons")}
          </Button>
        </Link>
      </div>
    );
  }

  const handleLearnNext = () => {
    if (learnIndex < lesson.words.length - 1) {
      setLearnIndex(learnIndex + 1);
    } else {
      setPhase("quiz");
    }
  };

  const handleAnswer = (index: number) => {
    if (showFeedback) return;
    setSelected(index);
    setShowFeedback(true);
    if (index === questions[currentQ].correctIndex) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentQ < questions.length - 1) {
      setCurrentQ(currentQ + 1);
      setSelected(null);
      setShowFeedback(false);
    } else {
      const percentage = Math.round((score / questions.length) * 100);
      completeLesson(lesson.id, percentage, lesson.xpReward);
      setPhase("results");
    }
  };

  const handleRetry = () => {
    setPhase("learn");
    setLearnIndex(0);
    setCurrentQ(0);
    setSelected(null);
    setScore(0);
    setShowFeedback(false);
  };

  const progressPercent =
    phase === "learn"
      ? ((learnIndex + 1) / lesson.words.length) * 50
      : phase === "quiz"
        ? 50 + ((currentQ + 1) / questions.length) * 50
        : 100;

  const currentWord = lesson.words[learnIndex];

  return (
    <div className="container mx-auto max-w-2xl px-4 py-10">
      {/* Progress bar */}
      <div className="mb-6">
        <div className="mb-2 flex items-center justify-between text-sm">
          <span className="font-semibold">
            {lesson.icon} {t(`lesson.${lesson.id}`)}
          </span>
          <span className="text-muted-foreground">
            {phase === "learn" ? t("lv.learn") : phase === "quiz" ? t("lv.quiz") : t("lv.done")}
          </span>
        </div>
        <div className="h-3 overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full bg-flag-gradient transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Learn Phase */}
      {phase === "learn" && (
        <div className="animate-slide-up space-y-6 text-center">
          <p className="text-sm text-muted-foreground">
            {t("lv.word")} {learnIndex + 1} {t("lv.of")} {lesson.words.length}
          </p>
          <div className="rounded-2xl border bg-card p-10">
            <p className="font-heading text-4xl font-bold text-primary">
              {currentWord.talysh}
            </p>
            <div className="mt-4 space-y-1">
              <p className="text-xl">{getWordTranslation(currentWord, language)}</p>
            </div>
          </div>
          <Button onClick={handleLearnNext} variant="hero" size="lg" className="w-full">
            {learnIndex < lesson.words.length - 1 ? (
              <>
                {t("lv.nextWord")} <ArrowRight className="ml-1" />
              </>
            ) : (
              <>
                {t("lv.startQuiz")} <ArrowRight className="ml-1" />
              </>
            )}
          </Button>
        </div>
      )}

      {/* Quiz Phase */}
      {phase === "quiz" && questions[currentQ] && (
        <div className="animate-slide-up space-y-6">
          <p className="text-center text-sm text-muted-foreground">
            {t("lv.question")} {currentQ + 1} {t("lv.of")} {questions.length}
          </p>
          <div className="rounded-2xl border bg-card p-8 text-center">
            <p className="mb-1 text-xs uppercase tracking-wider text-muted-foreground">
              {questions[currentQ].direction === "talysh-to-translation"
                ? t("lv.whatMean")
                : t("lv.howSay")}
            </p>
            <p className="font-heading text-3xl font-bold">
              {questions[currentQ].direction === "talysh-to-translation"
                ? questions[currentQ].word.talysh
                : getWordTranslation(questions[currentQ].word, language)}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {questions[currentQ].options.map((option, i) => {
              const isCorrect = i === questions[currentQ].correctIndex;
              const isSelected = i === selected;
              let borderClass = "border";
              if (showFeedback) {
                if (isCorrect)
                  borderClass = "border-2 border-primary bg-primary/10";
                else if (isSelected)
                  borderClass = "border-2 border-destructive bg-destructive/10";
              }

              return (
                <button
                  key={i}
                  onClick={() => handleAnswer(i)}
                  className={`relative rounded-xl p-4 text-left transition-all hover:shadow-md ${borderClass} ${
                    !showFeedback ? "cursor-pointer hover:-translate-y-0.5 bg-card" : ""
                  }`}
                  disabled={showFeedback}
                >
                  <span className="font-medium">{option}</span>
                  {showFeedback && isCorrect && (
                    <CheckCircle className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-primary" />
                  )}
                  {showFeedback && isSelected && !isCorrect && (
                    <XCircle className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-destructive" />
                  )}
                </button>
              );
            })}
          </div>

          {showFeedback && (
            <Button onClick={handleNext} variant="default" size="lg" className="w-full">
              {currentQ < questions.length - 1 ? t("lv.nextQuestion") : t("lv.seeResults")}
              <ArrowRight className="ml-1" />
            </Button>
          )}
        </div>
      )}

      {/* Results Phase */}
      {phase === "results" && (
        <div className="animate-bounce-in space-y-6 text-center">
          <div className="text-6xl">
            {score === questions.length ? "🏆" : score >= questions.length * 0.7 ? "🌟" : "💪"}
          </div>
          <h2 className="font-heading text-3xl font-bold">
            {score === questions.length
              ? t("lv.perfect")
              : score >= questions.length * 0.7
                ? t("lv.greatJob")
                : t("lv.keepPracticing")}
          </h2>
          <div className="rounded-2xl border bg-card p-8">
            <p className="text-5xl font-bold text-primary">
              {Math.round((score / questions.length) * 100)}%
            </p>
            <p className="mt-2 text-muted-foreground">
              {score}/{questions.length} {t("lv.correct")}
            </p>
            <div className="mt-4 inline-flex items-center gap-1 rounded-full bg-xp/10 px-4 py-2 text-xp">
              <span className="text-lg font-bold animate-pulse-xp">
                +{lesson.xpReward} XP
              </span>
            </div>
          </div>
          <div className="flex gap-3">
            <Button onClick={handleRetry} variant="outline" size="lg" className="flex-1">
              <RotateCcw className="mr-1" /> {t("lv.retry")}
            </Button>
            <Link to="/lessons" className="flex-1">
              <Button variant="hero" size="lg" className="w-full">
                <BookOpen className="mr-1" /> {t("lv.moreLessons")}
              </Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default LessonView;
