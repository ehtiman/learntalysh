import { Link } from "react-router-dom";
import { lessons } from "@/data/talyshData";
import { useProgress } from "@/hooks/useProgress";
import { useLanguage } from "@/hooks/useLanguage";
import { CheckCircle, Star } from "lucide-react";

const Lessons = () => {
  const { progress } = useProgress();
  const { t } = useLanguage();

  const categories = [...new Set(lessons.map((l) => l.category))];

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="font-heading text-3xl font-bold">{t("lessons.title")}</h1>
        <p className="mt-1 text-muted-foreground">
          {t("lessons.subtitle")}
        </p>
      </div>

      {/* Stats bar */}
      <div className="mb-10 grid grid-cols-3 gap-4">
        <div className="rounded-xl border bg-card p-4 text-center">
          <p className="text-2xl font-bold text-primary">{progress.totalXp}</p>
          <p className="text-xs text-muted-foreground">{t("lessons.totalXp")}</p>
        </div>
        <div className="rounded-xl border bg-card p-4 text-center">
          <p className="text-2xl font-bold text-accent">Lv. {progress.level}</p>
          <p className="text-xs text-muted-foreground">{t("lessons.level")}</p>
        </div>
        <div className="rounded-xl border bg-card p-4 text-center">
          <p className="text-2xl font-bold text-xp">
            {progress.lessonsCompleted.length}/{lessons.length}
          </p>
          <p className="text-xs text-muted-foreground">{t("lessons.completed")}</p>
        </div>
      </div>

      {categories.map((cat) => (
        <div key={cat} className="mb-10">
          <h2 className="mb-4 font-heading text-xl font-semibold">{t(`cat.${cat}`)}</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {lessons
              .filter((l) => l.category === cat)
              .map((lesson) => {
                const isCompleted = progress.lessonsCompleted.includes(lesson.id);
                const score = progress.lessonScores[lesson.id];

                return (
                  <Link
                    key={lesson.id}
                    to={`/lesson/${lesson.id}`}
                    className="group block"
                  >
                    <div
                      className={`relative rounded-xl border p-5 transition-all hover:shadow-lg hover:-translate-y-1 ${
                        isCompleted ? "border-primary/30 bg-primary/5" : "bg-card"
                      }`}
                    >
                      {isCompleted && (
                        <CheckCircle className="absolute right-3 top-3 h-5 w-5 text-primary" />
                      )}
                      <span className="text-3xl">{lesson.icon}</span>
                      <h3 className="mt-3 font-heading text-lg font-semibold">
                        {t(`lesson.${lesson.id}`)}
                      </h3>
                      <p className="text-xs text-muted-foreground">{lesson.titleTalysh}</p>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {t(`desc.${lesson.id}`)}
                      </p>
                      <div className="mt-3 flex items-center justify-between">
                        <span className="flex items-center gap-1 text-xs text-xp">
                          <Star className="h-3 w-3" /> +{lesson.xpReward} XP
                        </span>
                        {score && (
                          <span className="text-xs text-muted-foreground">
                            {t("lessons.best")}: {score.bestScore}%
                          </span>
                        )}
                      </div>
                    </div>
                  </Link>
                );
              })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Lessons;
