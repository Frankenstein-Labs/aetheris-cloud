import { createFileRoute } from "@tanstack/react-router";
import { BillingPanel } from "@/components/dashboard/BillingPanel";

export const Route = createFileRoute("/dashboard/subscription")({
  head: () => ({
    meta: [
      { title: "Abonnement & Facturation — Aetheris" },
      {
        name: "description",
        content:
          "Gérez votre abonnement développeur Aetheris, votre consommation de tokens et vos factures.",
      },
      { property: "og:title", content: "Abonnement & Facturation — Aetheris" },
      {
        property: "og:description",
        content: "Forfaits Free, Pro et Business pour vos moteurs cloud et modèles IA.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: BillingPanel,
});

