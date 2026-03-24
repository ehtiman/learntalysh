import { useProgress } from "@/hooks/useProgress";
import { lessons } from "@/data/talyshData";
import { useAuth } from "@/hooks/useAuth";
import { useLanguage } from "@/hooks/useLanguage";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Trophy, Flame, BookOpen, Star, Target } from "lucide-react";

const Dashboard = () => {
  const { progress } = useProgress();
  const { user } = useAuth();
  const { t } = useLanguage();

  const completionPercent = Math.round(
    (progress.lessonsCompleted.length / lessons.length) * 100
  );

  const xpToNextLevel = ((progress.level) * 100) - progress.totalXp;

  if (!user) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center px-4">
        <Trophy className="mb-4 h-16 w-16 text-muted-foreground" />
        <h2 className="mb-2 font-heading text-2xl font-bold">{t("dash.signInTitle")}</h2>
        <p className="mb-6 text-center text-muted-foreground">
          {t("dash.signInText")}
        </p>
        <Link to="/auth">
          <Button variant="hero" size="lg">
            {t("dash.signInBtn")}
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="mb-8 font-heading text-3xl font-bold">{t("dash.title")}</h1>

      {/* Stats Grid */}
      <div className="mb-10 grid grid-cols-2 gap-4 md:grid-cols-4">
        <div className="rounded-xl border bg-card p-5">
          <Star className="mb-2 h-6 w-6 text-xp" />
          <p className="text-3xl font-bold">{progress.totalXp}</p>
          <p className="text-sm text-muted-foreground">{t("dash.totalXp")}</p>
        </div>
        <div className="rounded-xl border bg-card p-5">
          <Flame className="mb-2 h-6 w-6 text-accent" />
          <p className="text-3xl font-bold">Lv. {progress.level}</p>
          <p className="text-sm text-muted-foreground">{xpToNextLevel} {t("dash.xpToNext")}</p>
        </div>
        <div className="rounded-xl border bg-card p-5">
          <BookOpen className="mb-2 h-6 w-6 text-primary" />
          <p className="text-3xl font-bold">{progress.lessonsCompleted.length}</p>
          <p className="text-sm text-muted-foreground">{t("dash.lessonsDone")}</p>
        </div>
        <div className="rounded-xl border bg-card p-5">
          <Target className="mb-2 h-6 w-6 text-primary" />
          <p className="text-3xl font-bold">{completionPercent}%</p>
          <p className="text-sm text-muted-foreground">{t("dash.complete")}</p>
        </div>
      </div>

      {/* XP Progress Bar */}
      <div className="mb-10 rounded-xl border bg-card p-6">
        <div className="mb-3 flex items-center justify-between">
          <span className="font-heading font-semibold">{t("lessons.level")} {progress.level}</span>
          <span className="text-sm text-muted-foreground">
            {t("lessons.level")} {progress.level + 1}
          </span>
        </div>
        <div className="h-4 overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full bg-flag-gradient transition-all duration-700"
            style={{
              width: `${((progress.totalXp % 100) / 100) * 100}%`,
            }}
          />
        </div>
        <p className="mt-2 text-center text-sm text-muted-foreground">
          {progress.totalXp % 100}/100 XP
        </p>
      </div>

      {/* Lesson scores */}
      <h2 className="mb-4 font-heading text-xl font-semibold">{t("dash.lessonScores")}</h2>
      <div className="space-y-3">
        {lessons.map((lesson) => {
          const score = progress.lessonScores[lesson.id];
          const isCompleted = progress.lessonsCompleted.includes(lesson.id);

          return (
            <Link
              key={lesson.id}
              to={`/lesson/${lesson.id}`}
              className="flex items-center justify-between rounded-xl border bg-card p-4 transition-all hover:shadow-md"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{lesson.icon}</span>
                <div>
                  <p className="font-semibold">{t(`lesson.${lesson.id}`)}</p>
                  <p className="text-xs text-muted-foreground">{lesson.words.length} {t("dash.words")}</p>
                </div>
              </div>
              <div className="text-right">
                {isCompleted ? (
                  <>
                    <p className="text-lg font-bold text-primary">{score?.bestScore}%</p>
                    <p className="text-xs text-muted-foreground">{t("dash.bestScore")}</p>
                  </>
                ) : (
                  <span className="rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground">
                    {t("dash.notStarted")}
                  </span>
                )}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Dashboard;
