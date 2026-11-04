import { createFileRoute } from "@tanstack/react-router";
import { LandingPage } from "@/components/landing/LandingPage";

const title = "Aetheris Cloud — AI laboratory powered by Frankenstein Lab";
const description =
  "Build, fine-tune, benchmark and deploy AI models with Docker orchestration and cloud engines on Aetheris Cloud, powered by Frankenstein Lab.";

export const Route = createFileRoute("/")({
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