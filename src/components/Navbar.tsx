import { Link, useLocation } from "react-router-dom";
import { BookOpen, Trophy, Home, User, LogOut, Flame, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/hooks/useAuth";
import { useLanguage, Language } from "@/hooks/useLanguage";

const langLabels: Record<Language, string> = { az: "AZ", en: "EN", ru: "RU" };

const Navbar = () => {
  const location = useLocation();
  const { user } = useAuth();
  const { language, setLanguage, t } = useLanguage();

  const navItems = [
    { to: "/", icon: Home, label: t("nav.home") },
    { to: "/lessons", icon: BookOpen, label: t("nav.lessons") },
    { to: "/dashboard", icon: Trophy, label: t("nav.progress") },
  ];

  const isActive = (path: string) => location.pathname === path;

  const languages: Language[] = ["az", "en", "ru"];

  return (
    <nav className="sticky top-0 z-50 border-b bg-card/80 backdrop-blur-lg">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-flag-gradient">
            <span className="text-lg font-bold text-primary-foreground">T</span>
          </div>
          <span className="font-heading text-xl font-bold">LearnTalysh</span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <Link key={item.to} to={item.to}>
              <Button
                variant={isActive(item.to) ? "default" : "ghost"}
                size="sm"
                className="gap-2"
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Button>
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          {/* Language Switcher */}
          <div className="flex items-center gap-0.5 rounded-full border bg-muted p-0.5">
            {languages.map((lang) => (
              <button
                key={lang}
                onClick={() => setLanguage(lang)}
                className={`rounded-full px-2.5 py-1 text-xs font-semibold transition-all ${
                  language === lang
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {langLabels[lang]}
              </button>
            ))}
          </div>

          {user ? (
            <>
              <div className="flex items-center gap-1.5 rounded-full bg-muted px-3 py-1.5">
                <Flame className="h-4 w-4 text-accent" />
                <span className="text-sm font-semibold">0</span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => supabase.auth.signOut()}
              >
                <LogOut className="h-4 w-4" />
              </Button>
            </>
          ) : (
            <Link to="/auth">
              <Button variant="default" size="sm" className="gap-2">
                <User className="h-4 w-4" />
                {t("nav.signIn")}
              </Button>
            </Link>
          )}
        </div>
      </div>

      {/* Mobile nav */}
      <div className="flex border-t md:hidden">
        {navItems.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            className={`flex flex-1 flex-col items-center gap-1 py-2 text-xs transition-colors ${
              isActive(item.to) ? "text-primary" : "text-muted-foreground"
            }`}
          >
            <item.icon className="h-5 w-5" />
            {item.label}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
