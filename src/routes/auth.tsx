import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { safeAuthRedirect } from "@/lib/auth-redirect";
import heroImg from "@/assets/hero-cloud.jpg";

export const Route = createFileRoute("/auth")({
  validateSearch: (search) => ({
    mode: (search.mode as "signin" | "signup" | undefined) ?? "signin",
    redirect: safeAuthRedirect(search.redirect),
  }),
  head: () => ({
    meta: [
      { title: "Connexion — Aetheris Cloud" },
      { name: "description", content: "Connectez-vous à votre console Aetheris Cloud." },
      { property: "og:title", content: "Connexion — Aetheris Cloud" },
      { property: "og:description", content: "Connectez-vous à votre espace Aetheris Cloud." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AuthPage,
});

const schema = z.object({
  email: z.string().email("Email invalide"),
  password: z.string().min(8, "8 caractères minimum"),
  fullName: z.string().min(2).max(100).optional(),
});

function getAuthErrorMessage(error: unknown, action: "login" | "signup" | "github") {
  const message = error instanceof Error ? error.message.toLowerCase() : "";
  if (message.includes("invalid login") || message.includes("invalid email or password")) {
    return "Email ou mot de passe incorrect";
  }
  if (message.includes("email not confirmed")) {
    return "Confirmez votre adresse email avant de vous connecter.";
  }
  if (message.includes("already registered") || message.includes("already been registered")) {
    return "Cet email est déjà utilisé";
  }
  if (message.includes("password") && message.includes("characters")) {
    return "Le mot de passe doit contenir au moins 8 caractères.";
  }
  if (message.includes("rate limit") || message.includes("too many")) {
    return "Trop de tentatives. Réessayez dans quelques minutes.";
  }
  if (action === "github") return "La connexion GitHub est indisponible pour le moment.";
  return "Une erreur d'authentification est survenue. Réessayez.";
}

function AuthPage() {
  const { mode, redirect } = Route.useSearch();
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const [isSignup, setIsSignup] = useState(mode === "signup");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [confirmationPending, setConfirmationPending] = useState(false);

  useEffect(() => {
    if (!authLoading && user) {
      navigate({ to: redirect, replace: true });
    }
  }, [user, authLoading, navigate, redirect]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");
    const authError = params.get("error_description") ?? params.get("error");
    if (!code && !authError) return;

    let cancelled = false;
    const finishCallback = async () => {
      if (authError) {
        toast.error("La connexion a échoué. Réessayez ou utilisez votre email et mot de passe.");
        return;
      }
      setSubmitting(true);
      const { error } = await supabase.auth.exchangeCodeForSession(code!);
      if (cancelled) return;
      if (error) {
        toast.error("Le lien de connexion est invalide ou expiré. Réessayez.");
      }
      setSubmitting(false);
      window.history.replaceState({}, document.title, `/auth?redirect=${encodeURIComponent(redirect)}`);
    };
    void finishCallback();
    return () => { cancelled = true; };
  }, [redirect]);

  useEffect(() => {
    setIsSignup(mode === "signup");
  }, [mode]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse({
      email,
      password,
      fullName: isSignup ? fullName : undefined,
    });
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Champs invalides");
      return;
    }

    setSubmitting(true);
    try {
      if (isSignup) {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/auth?redirect=${encodeURIComponent(redirect)}`,
            data: { full_name: fullName },
          },
        });
        if (error) throw error;
        if (data.session) {
          toast.success("Compte créé. Bienvenue !");
          navigate({ to: redirect });
        } else {
          setConfirmationPending(true);
          toast.success("Compte créé. Consultez votre email pour confirmer votre adresse.");
        }
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        toast.success("Connecté");
        navigate({ to: redirect });
      }
    } catch (err) {
      toast.error(getAuthErrorMessage(err, isSignup ? "signup" : "login"));
    } finally {
      setSubmitting(false);
    }
  };

  const handleGitHub = async () => {
    setSubmitting(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "github",
        options: {
          redirectTo: `${window.location.origin}/auth?redirect=${encodeURIComponent(redirect)}`,
        },
      });
      if (error) throw error;
    } catch (err) {
      toast.error(getAuthErrorMessage(err, "github"));
      setSubmitting(false);
    }
  };

  const inputCls =
    "h-10 w-full rounded-md border border-input bg-transparent px-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring";

  return (
    <div className="grid min-h-svh bg-background text-foreground lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <Link to="/" className="flex items-center gap-2 font-medium">
          <span className="flex size-7 items-center justify-center rounded-md bg-primary font-bold text-primary-foreground">Æ</span>
          Aetheris Cloud
        </Link>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">{isSignup ? "Créer un compte" : "Connexion à votre compte"}</h1>
                <p className="text-sm text-muted-foreground">
                  {isSignup ? "Entrez vos informations pour créer votre compte" : "Entrez votre email ci-dessous pour vous connecter"}
                </p>
              </div>
              {confirmationPending && isSignup && (
                <p className="rounded-md border border-border bg-muted px-3 py-2 text-sm text-muted-foreground">
                  Vérifiez votre boîte mail et confirmez votre adresse avant de vous connecter.
                </p>
              )}
              <div className="grid gap-6">
                {isSignup && (
                  <div className="grid gap-2">
                    <label htmlFor="fullName" className="text-sm font-medium">Nom complet</label>
                    <input id="fullName" type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} required placeholder="Jean Dupont" className={inputCls} />
                  </div>
                )}
                <div className="grid gap-2">
                  <label htmlFor="email" className="text-sm font-medium">Email</label>
                  <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="m@exemple.com" className={inputCls} />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <label htmlFor="password" className="text-sm font-medium">Mot de passe</label>
                    {!isSignup && (
                      <Link to="/reset-password" className="ms-auto text-sm underline-offset-4 hover:underline">Mot de passe oublié ?</Link>
                    )}
                  </div>
                  <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={8} className={inputCls} />
                </div>
                <button type="submit" disabled={submitting} className="flex h-10 w-full items-center justify-center gap-2 rounded-md bg-primary text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-60">
                  {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
                  {isSignup ? "Créer mon compte" : "Se connecter"}
                </button>
                <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                  <span className="relative z-10 bg-background px-2 text-muted-foreground">Ou continuer avec</span>
                </div>
                <button type="button" onClick={handleGitHub} disabled={submitting} className="flex h-10 w-full items-center justify-center gap-2 rounded-md border border-input bg-background text-sm font-medium hover:bg-accent disabled:opacity-60">
                  <svg className="h-4 w-4" viewBox="0 0 24 24" aria-hidden>
                    <path fill="currentColor" d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.18-3.37-1.18-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.9 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.56-1.11-4.56-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02A9.56 9.56 0 0 1 12 7.87c.85 0 1.71.11 2.51.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.69-4.57 4.94.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2" />
                  </svg>
                  Se connecter avec GitHub
                </button>
              </div>
              <div className="text-center text-sm">
                {isSignup ? "Déjà un compte ?" : "Pas encore de compte ?"}{" "}
                <button type="button" onClick={() => setIsSignup(!isSignup)} className="underline underline-offset-4">
                  {isSignup ? "Se connecter" : "S'inscrire"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="relative hidden bg-muted lg:block">
        <img src={heroImg} alt="" className="absolute inset-0 h-full w-full object-cover opacity-60" />
      </div>
    </div>
  );
}
