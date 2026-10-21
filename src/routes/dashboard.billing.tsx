import { createFileRoute } from "@tanstack/react-router";
import { BillingPanel } from "@/components/dashboard/BillingPanel";

export const Route = createFileRoute("/dashboard/billing")({
  head: () => ({
    meta: [{ title: "Facturation — Aetheris" }, { name: "description", content: "Facturation de votre compte Aetheris Cloud." }, { property: "og:title", content: "Facturation — Aetheris" }, { property: "og:description", content: "Facturation de votre compte Aetheris Cloud." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }],
  }),
  component: BillingPanel,
});

