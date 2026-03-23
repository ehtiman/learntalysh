import { useProgress } from "@/hooks/useProgress";
import { lessons } from "@/data/talyshData";
import { useAuth } from "@/hooks/useAuth";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Trophy, Flame, BookOpen, Star, Target } from "lucide-react";

const Dashboard = () => {
  const { progress } = useProgress();
  const { user } = useAuth();

  const completionPercent = Math.round(
    (progress.lessonsCompleted.length / lessons.length) * 100
  );

  const xpToNextLevel = ((progress.level) * 100) - progress.totalXp;

  if (!user) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center px-4">
        <Trophy className="mb-4 h-16 w-16 text-muted-foreground" />
        <h2 className="mb-2 font-heading text-2xl font-bold">Track Your Progress</h2>
        <p className="mb-6 text-center text-muted-foreground">
          Sign in to save your progress and track your learning journey
        </p>
        <Link to="/auth">
          <Button variant="hero" size="lg">
            Sign In to Continue
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="mb-8 font-heading text-3xl font-bold">Your Progress</h1>

      {/* Stats Grid */}
      <div className="mb-10 grid grid-cols-2 gap-4 md:grid-cols-4">
        <div className="rounded-xl border bg-card p-5">
          <Star className="mb-2 h-6 w-6 text-xp" />
          <p className="text-3xl font-bold">{progress.totalXp}</p>
          <p className="text-sm text-muted-foreground">Total XP</p>
        </div>
        <div className="rounded-xl border bg-card p-5">
          <Flame className="mb-2 h-6 w-6 text-accent" />
          <p className="text-3xl font-bold">Lv. {progress.level}</p>
          <p className="text-sm text-muted-foreground">{xpToNextLevel} XP to next</p>
        </div>
        <div className="rounded-xl border bg-card p-5">
          <BookOpen className="mb-2 h-6 w-6 text-primary" />
          <p className="text-3xl font-bold">{progress.lessonsCompleted.length}</p>
          <p className="text-sm text-muted-foreground">Lessons Done</p>
        </div>
        <div className="rounded-xl border bg-card p-5">
          <Target className="mb-2 h-6 w-6 text-primary" />
          <p className="text-3xl font-bold">{completionPercent}%</p>
          <p className="text-sm text-muted-foreground">Complete</p>
        </div>
      </div>

      {/* XP Progress Bar */}
      <div className="mb-10 rounded-xl border bg-card p-6">
        <div className="mb-3 flex items-center justify-between">
          <span className="font-heading font-semibold">Level {progress.level}</span>
          <span className="text-sm text-muted-foreground">
            Level {progress.level + 1}
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
      <h2 className="mb-4 font-heading text-xl font-semibold">Lesson Scores</h2>
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
                  <p className="font-semibold">{lesson.title}</p>
                  <p className="text-xs text-muted-foreground">{lesson.words.length} words</p>
                </div>
              </div>
              <div className="text-right">
                {isCompleted ? (
                  <>
                    <p className="text-lg font-bold text-primary">{score?.bestScore}%</p>
                    <p className="text-xs text-muted-foreground">Best score</p>
                  </>
                ) : (
                  <span className="rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground">
                    Not started
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
