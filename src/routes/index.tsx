import { createFileRoute, redirect } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { LandingPage } from "@/components/landing/LandingPage";

const title = "Aetheris Cloud — AI laboratory powered by Frankenstein Lab";
const description =
  "Build, fine-tune, benchmark and deploy AI models with Docker orchestration and cloud engines on Aetheris Cloud, powered by Frankenstein Lab.";

export const Route = createFileRoute("/")({
  beforeLoad: async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (session) throw redirect({ to: "/dashboard" });
  },
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: LandingPage,
});