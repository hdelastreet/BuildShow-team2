"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

/**
 * Login screen — Microsoft 365 SSO (Azure / Entra ID) is the only sign-in path.
 *
 * The flow lands on `/auth/callback`, which re-enforces the `@wefiit.com`
 * tenant policy server-side. The Azure app registration is single-tenant, so
 * external accounts are already rejected by Microsoft before reaching us.
 */
function LoginForm() {
  const searchParams = useSearchParams();
  const [ssoLoading, setSsoLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const errorParam = searchParams.get("error");
  const redirect = searchParams.get("redirect") ?? "/";

  async function signInWithMicrosoft() {
    setError(null);
    setSsoLoading(true);
    const supabase = createClient();
    const callbackUrl = new URL("/auth/callback", window.location.origin);
    callbackUrl.searchParams.set("redirect", redirect);

    const { error } = await supabase.auth.signInWithOAuth({
      provider: "azure",
      options: {
        redirectTo: callbackUrl.toString(),
        scopes: "email",
      },
    });

    // On success the browser navigates away; we only reach here on error.
    if (error) {
      setError(error.message);
      setSsoLoading(false);
    }
  }

  const banner =
    errorParam === "domain"
      ? "Accès réservé aux adresses @wefiit.com."
      : errorParam
        ? "La connexion a échoué. Réessayez."
        : error;

  return (
    <section className="mx-auto flex w-full max-w-md flex-col px-6 py-20 sm:py-28">
      <p className="wf-eyebrow mb-4">Espace WeFiiT</p>
      <h1 className="wf-h2 wf-dot">Connectez-vous</h1>
      <p className="wf-lead mt-4">
        Accès réservé aux WeFiiTers. Connectez-vous avec votre compte Microsoft
        WeFiiT.
      </p>

      {banner && (
        <p
          role="alert"
          className="mt-6 rounded-2xl border border-orange/40 bg-orange/5 px-4 py-3 text-sm text-fg"
        >
          {banner}
        </p>
      )}

      <button
        type="button"
        onClick={signInWithMicrosoft}
        disabled={ssoLoading}
        className="mt-8 inline-flex items-center justify-center gap-3 rounded-pill bg-marine px-7 py-3 font-medium text-blanc shadow-md transition-colors hover:bg-marine-900 disabled:cursor-not-allowed disabled:opacity-60"
      >
        <svg width="18" height="18" viewBox="0 0 21 21" aria-hidden="true">
          <rect x="1" y="1" width="9" height="9" fill="#f25022" />
          <rect x="11" y="1" width="9" height="9" fill="#7fba00" />
          <rect x="1" y="11" width="9" height="9" fill="#00a4ef" />
          <rect x="11" y="11" width="9" height="9" fill="#ffb900" />
        </svg>
        {ssoLoading ? "Redirection…" : "Se connecter avec Microsoft"}
      </button>

      <p className="wf-legend mt-6 text-fg-muted">
        Connexion réservée aux comptes @wefiit.com.
      </p>
    </section>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  );
}
