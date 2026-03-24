import { Link } from "react-router-dom";
import { BookOpen, Trophy, Zap, Globe, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { commonPhrases } from "@/data/talyshData";
import { useAuth } from "@/hooks/useAuth";
import { useLanguage } from "@/hooks/useLanguage";
import heroImage from "@/assets/hero-talysh.jpg";

const Index = () => {
  const { user } = useAuth();
  const { language, t } = useLanguage();

  const features = [
    { icon: BookOpen, title: t("features.lessons.title"), description: t("features.lessons.desc") },
    { icon: Zap, title: t("features.quizzes.title"), description: t("features.quizzes.desc") },
    { icon: Trophy, title: t("features.progress.title"), description: t("features.progress.desc") },
    { icon: Globe, title: t("features.ancient.title"), description: t("features.ancient.desc") },
  ];

  const getTranslation = (phrase: typeof commonPhrases[0]) => {
    if (language === "ru") return phrase.russian;
    if (language === "en") return phrase.english;
    return phrase.azerbaijani;
  };

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden px-4 py-20 md:py-32">
        <div className="absolute inset-0 -z-10">
          <img src={heroImage} alt="Talysh mountains" className="h-full w-full object-cover opacity-10" width={1920} height={800} />
        </div>
        <div className="absolute inset-0 -z-10 opacity-5">
          <div className="absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-flag-green blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-flag-red blur-3xl" />
        </div>

        <div className="container mx-auto text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border bg-card px-4 py-2 text-sm">
            <span className="flex h-2 w-2 rounded-full bg-success" />
            {t("hero.badge")}
          </div>

          <h1 className="font-heading text-4xl font-bold leading-tight md:text-6xl lg:text-7xl">
            {t("hero.title1")}{" "}
            <span className="text-gradient">{t("hero.title2")}</span>
            <br />
            {t("hero.title3")}
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground">
            {t("hero.subtitle")}
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link to={user ? "/lessons" : "/auth"}>
              <Button variant="hero" size="xl">
                {user ? t("hero.continue") : t("hero.startFree")}
                <ChevronRight className="ml-1 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/lessons">
              <Button variant="outline" size="lg">
                {t("hero.browse")}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-t bg-muted/30 px-4 py-20">
        <div className="container mx-auto">
          <h2 className="mb-12 text-center font-heading text-3xl font-bold">
            {t("features.title")}
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {features.map((f) => (
              <div
                key={f.title}
                className="group rounded-xl border bg-card p-6 transition-all hover:shadow-lg hover:-translate-y-1"
              >
                <div className="mb-4 inline-flex rounded-lg bg-primary/10 p-3">
                  <f.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 font-heading text-lg font-semibold">{f.title}</h3>
                <p className="text-sm text-muted-foreground">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Common Phrases Preview */}
      <section className="px-4 py-20">
        <div className="container mx-auto max-w-3xl">
          <h2 className="mb-2 text-center font-heading text-3xl font-bold">
            {t("phrases.title")}
          </h2>
          <p className="mb-10 text-center text-muted-foreground">
            {t("phrases.subtitle")}
          </p>
          <div className="space-y-3">
            {commonPhrases.slice(0, 5).map((phrase, i) => (
              <div
                key={i}
                className="flex items-center justify-between rounded-xl border bg-card p-4 transition-all hover:shadow-md"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div>
                  <p className="font-heading text-lg font-semibold text-primary">
                    {phrase.talysh}
                  </p>
                  <p className="text-sm text-muted-foreground">{getTranslation(phrase)}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link to="/lessons">
              <Button variant="default" size="lg">
                {t("phrases.startCourse")}
                <ChevronRight className="ml-1" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-muted/30 px-4 py-10">
        <div className="container mx-auto text-center">
          <div className="mb-3 flex items-center justify-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-flag-gradient">
              <span className="text-sm font-bold text-primary-foreground">T</span>
            </div>
            <span className="font-heading text-lg font-bold">LearnTalysh</span>
          </div>
          <p className="text-sm text-muted-foreground">
            {t("footer.text")}
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
