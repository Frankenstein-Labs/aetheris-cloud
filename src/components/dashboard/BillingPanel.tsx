// Adapted from Dokploy settings/billing/show-billing.tsx and show-billing-invoices.tsx.
// Copyright 2026-present Dokploy Technology, Inc. Apache-2.0; see vendor/dokploy.
import { CreditCard, FileText, Wallet, Check, Sparkles, Zap, Crown } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const tiers = [
  { id: "free", name: "Free", price: "0 €", period: "à vie", icon: Sparkles, features: ["100k tokens/mois", "1 modèle déployé", "1 Go DB Index", "Communauté"] },
  { id: "pro", name: "Pro", price: "29 €", period: "/mois", icon: Zap, features: ["10M tokens/mois", "10 modèles déployés", "Moteur GPU à la demande", "Support prioritaire"] },
  { id: "business", name: "Business", price: "99 €", period: "/mois", icon: Crown, features: ["Tokens illimités", "Équipe (5 sièges)", "SLA 99.9 %", "Endpoints dédiés"] },
];

export function BillingPanel() {
  const { profile } = useAuth();
  const current = profile?.subscription_tier;
  return <section className="mx-auto w-full max-w-6xl space-y-6">
    <header className="flex flex-wrap items-center justify-between gap-3">
      <div className="space-y-1"><h1 className="flex items-center gap-2 text-xl font-semibold"><CreditCard className="size-5 text-muted-foreground" />Facturation</h1><p className="text-sm text-muted-foreground">Abonnement, moyens de paiement et factures.</p></div>
      <Badge variant="outline">Paiements non activés</Badge>
    </header>
    <Tabs defaultValue="subscription" className="w-full">
      <TabsList className="h-auto w-full justify-start overflow-x-auto rounded-none border-b bg-transparent p-0">
        {[{ id: "subscription", label: "Abonnement", icon: CreditCard }, { id: "payment", label: "Paiement", icon: Wallet }, { id: "invoices", label: "Factures", icon: FileText }].map(tab => <TabsTrigger key={tab.id} value={tab.id} className="gap-2 rounded-none border-b-2 border-transparent px-3 py-3 data-[state=active]:border-primary data-[state=active]:shadow-none"><tab.icon className="size-4" />{tab.label}</TabsTrigger>)}
      </TabsList>
      <TabsContent value="subscription" className="space-y-6 pt-6">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b pb-6">
          <div className="space-y-2"><p className="text-sm text-muted-foreground">Forfait actuel</p><Badge variant="secondary" className="capitalize">{current ?? "Non disponible"}</Badge></div>
          <div className="space-y-2"><p className="text-sm text-muted-foreground">Solde de tokens</p><p className="text-xl font-semibold tabular-nums">{profile ? Number(profile.credits_balance).toLocaleString("fr-FR") : "Non disponible"}</p></div>
          <Button variant="outline" disabled title="Configurez votre propre prestataire de paiement">Gérer l’abonnement</Button>
        </div>
        <div className="grid gap-4 md:grid-cols-3">{tiers.map(tier => <article key={tier.id} className="flex flex-col gap-5 rounded-lg border p-5">
          <div className="flex items-center justify-between gap-2"><h2 className="flex items-center gap-2 text-base font-semibold"><tier.icon className="size-4 text-muted-foreground" />{tier.name}</h2>{current === tier.id && <Badge variant="secondary">Actuel</Badge>}</div>
          <p><span className="text-3xl font-semibold">{tier.price}</span> <span className="text-sm text-muted-foreground">{tier.period}</span></p>
          <ul className="flex-1 space-y-2">{tier.features.map(feature => <li key={feature} className="flex items-start gap-2 text-sm text-muted-foreground"><Check className="mt-0.5 size-4 shrink-0" />{feature}</li>)}</ul>
          <Button variant="outline" disabled title="Paiements non activés">{current === tier.id ? "Forfait actuel" : "Souscription indisponible"}</Button>
        </article>)}</div>
      </TabsContent>
      <TabsContent value="payment" className="space-y-6 pt-6">
        <div className="flex flex-wrap items-center justify-between gap-3"><h2 className="text-base font-semibold">Moyens de paiement</h2><Button variant="outline" disabled><CreditCard />Ajouter un moyen de paiement</Button></div>
        <div className="flex min-h-52 flex-col items-center justify-center gap-3 border-y py-8 text-center"><Wallet className="size-8 text-muted-foreground" /><p className="font-medium">Aucun moyen de paiement connecté</p><p className="max-w-md text-sm text-muted-foreground">Votre compte n’est relié à aucun prestataire de paiement. Aucun débit n’est effectué.</p></div>
      </TabsContent>
      <TabsContent value="invoices" className="space-y-6 pt-6"><h2 className="text-base font-semibold">Historique des factures</h2><div className="overflow-x-auto"><table className="w-full text-left text-sm"><thead className="border-b text-muted-foreground"><tr>{["Facture", "Date", "Montant", "Statut"].map(label => <th key={label} className="px-3 py-3 font-medium">{label}</th>)}</tr></thead><tbody><tr><td colSpan={4} className="py-12 text-center text-muted-foreground"><FileText className="mx-auto mb-3 size-8" />Aucune facture : les paiements ne sont pas activés.</td></tr></tbody></table></div></TabsContent>
    </Tabs>
  </section>;
}