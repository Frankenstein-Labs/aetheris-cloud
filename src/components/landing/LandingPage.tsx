import { Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowRight,
  Boxes,
  Check,
  Cpu,
  FlaskConical,
  GitBranch,
  Github,
  Layers,
  Menu,
  Network,
  ShieldCheck,
  Sparkles,
  X,
  Zap,
} from "lucide-react";
import computeImage from "@/assets/lab-compute.jpg";

const nav = [
  { label: "Features", href: "#features" },
  { label: "Workspace", href: "#workspace" },
  { label: "Marketplace", href: "#marketplace" },
  { label: "Pricing", href: "#pricing" },
];

function Logo() {
  return (
    <a href="#top" className="flex items-center gap-2.5" aria-label="Aetheris Cloud home">
      <span className="lab-logo grid size-8 place-items-center rounded-md">
        <FlaskConical className="size-4" />
      </span>
      <span className="font-display text-[17px] font-semibold">Aetheris Cloud</span>
    </a>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="lab-header fixed inset-x-0 top-0 z-50">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 md:px-8">
        <Logo />
        <nav className="hidden items-center gap-8 md:flex">
          {nav.map((n) => (
            <a key={n.href} href={n.href} className="lab-link text-sm">
              {n.label}
            </a>
          ))}
        </nav>
        <div className="hidden items-center gap-3 md:flex">
          <Link to="/auth" search={{ mode: "signin", redirect: "/dashboard" }} className="lab-link text-sm">
            Sign in
          </Link>
          <Link to="/auth" search={{ mode: "signup", redirect: "/dashboard" }} className="lab-btn-primary h-9 px-4 text-sm">
            Get Started
          </Link>
        </div>
        <button className="md:hidden" aria-label={open ? "Close menu" : "Open menu"} onClick={() => setOpen(!open)}>
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>
      {open && (
        <div className="lab-mobile-menu grid gap-1 px-5 pb-5 md:hidden">
          {nav.map((n) => (
            <a key={n.href} href={n.href} onClick={() => setOpen(false)} className="py-3 text-base">
              {n.label}
            </a>
          ))}
          <Link to="/auth" search={{ mode: "signup", redirect: "/dashboard" }} className="lab-btn-primary mt-3 h-11">
            Get Started
          </Link>
        </div>
      )}
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="lab-grid relative overflow-hidden pt-16">
      <img
        src={computeImage}
        alt="Graphite compute cluster with mint light seams"
        width={1920}
        height={1024}
        className="lab-hero-image absolute inset-0 h-full w-full object-cover object-[70%_center]"
      />
      <div className="lab-hero-fade absolute inset-0" />
      <div className="relative mx-auto flex min-h-[760px] max-w-7xl flex-col justify-center px-5 py-24 md:px-8">
        <div className="lab-reveal max-w-3xl">
          <div className="lab-pill mb-8 inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs">
            <span className="lab-dot size-1.5 rounded-full" />
            Powered by Frankenstein Lab
          </div>
          <h1 className="font-display text-[44px] font-medium leading-[0.98] sm:text-6xl lg:text-[86px]">
            The cloud where AI models are <span className="lab-accent-text">born</span>.
          </h1>
          <p className="lab-muted mt-8 max-w-2xl text-lg leading-8 md:text-xl">
            Orchestrate containers, run model experiments and ship intelligent services from one precise developer platform.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Link to="/auth" search={{ mode: "signup", redirect: "/dashboard" }} className="lab-btn-primary group h-12 px-6">
              Start Building Free <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link to="/auth" search={{ mode: "signin", redirect: "/dashboard/workspace" }} className="lab-btn-secondary h-12 px-6">
              Explore Workspace
            </Link>
          </div>
        </div>
        <div className="lab-terminal mt-16 max-w-md rounded-lg p-4 font-mono text-xs leading-6 md:absolute md:bottom-24 md:right-8 md:mt-0">
          <div className="lab-muted mb-2 flex justify-between"><span>aetheris lab</span><span>example command</span></div>
          <p><span className="lab-accent-text">$</span> aetheris run hf/mistral --benchmark</p>
          <p className="lab-muted">Connect a provider to run this workload.</p>
        </div>
      </div>
    </section>
  );
}

function Features() {
  return (
    <section id="features" className="mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-32">
      <p className="lab-kicker">Core platform</p>
      <div className="mt-4 flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <h2 className="font-display max-w-2xl text-4xl font-medium leading-tight md:text-6xl">One lab. Every layer of your AI stack.</h2>
        <p className="lab-muted max-w-md text-lg">From the first experiment to a routed production service, every surface is designed for builders.</p>
      </div>
      <div className="mt-14 grid gap-4 lg:grid-cols-3">
        <article id="workspace" className="lab-card lab-card-glow p-7 md:p-9 lg:col-span-2 lg:row-span-2">
          <Sparkles className="lab-accent-text size-6" />
          <h3 className="font-display mt-8 text-3xl font-medium">Advanced AI Workspace</h3>
          <p className="lab-muted mt-4 max-w-xl text-lg">Fine-tune, benchmark, quantize and organise MoE experiments with your providers and models.</p>
          <div className="mt-10 grid gap-3 sm:grid-cols-2">
            {["Fine-tuning", "Benchmarking", "Quantization", "MoE models"].map((x) => (
              <div key={x} className="lab-subcard flex items-center gap-3 rounded-md p-4 text-sm">
                <Check className="lab-accent-text size-4" /> {x}
              </div>
            ))}
          </div>
        </article>
        <article className="lab-card p-7">
          <Boxes className="lab-accent-text size-6" />
          <h3 className="font-display mt-8 text-2xl font-medium">Docker & Swarm</h3>
          <p className="lab-muted mt-3">Traefik routing and real-time monitoring once your infrastructure is connected.</p>
          <div className="lab-route mt-8 flex items-center gap-2 font-mono text-xs"><Network className="size-4" /> api.lab → container</div>
        </article>
        <article className="lab-card p-7">
          <Zap className="lab-accent-text size-6" />
          <h3 className="font-display mt-8 text-2xl font-medium">Cloud Engines</h3>
          <p className="lab-muted mt-3">High-performance workloads that scale with the compute providers you choose.</p>
          <div className="mt-8 flex gap-2">
            {[0, 1, 2, 3, 4].map((i) => <span key={i} className="lab-bar h-12 flex-1 rounded-sm" style={{ opacity: 0.35 + i * 0.13 }} />)}
          </div>
        </article>
      </div>
    </section>
  );
}

function Trust() {
  const items = [
    { icon: GitBranch, title: "Open-source roots", text: "Built with Apache-licensed infrastructure patterns." },
    { icon: ShieldCheck, title: "High-availability ready", text: "Design workloads for resilient, connected providers." },
    { icon: Layers, title: "Zero-friction deployment", text: "Keys, models and services in one workflow." },
  ];
  return (
    <section id="marketplace" className="lab-band">
      <div className="mx-auto grid max-w-7xl gap-px px-5 py-20 md:grid-cols-3 md:px-8">
        {items.map(({ icon: Icon, title, text }) => (
          <div key={title} className="p-2 md:p-8">
            <Icon className="lab-accent-text size-5" />
            <h3 className="mt-5 font-medium">{title}</h3>
            <p className="lab-muted mt-2 text-sm leading-6">{text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Pricing() {
  return (
    <section id="pricing" className="mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-32">
      <div className="lab-card lab-card-glow grid gap-10 p-8 md:grid-cols-[1.4fr_1fr] md:p-14">
        <div>
          <p className="lab-kicker">Private beta</p>
          <h2 className="font-display mt-4 text-4xl font-medium md:text-6xl">Start in the lab today.</h2>
          <p className="lab-muted mt-5 max-w-xl text-lg">Create an account for free access to the workspace. Paid plans are not active yet.</p>
        </div>
        <div className="flex flex-col justify-end gap-3">
          <Link to="/auth" search={{ mode: "signup", redirect: "/dashboard" }} className="lab-btn-primary h-12">Start Building Free</Link>
          <Link to="/docs" className="lab-btn-secondary h-12">Read documentation</Link>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="lab-footer">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-14 md:grid-cols-[1.5fr_1fr_1fr_1fr] md:px-8">
        <div>
          <Logo />
          <p className="lab-muted mt-4 text-sm">Powered by Frankenstein Lab.</p>
        </div>
        <div className="grid content-start gap-3 text-sm">
          <p className="font-medium">Platform</p>
          <a href="#features" className="lab-link">Features</a>
          <a href="#workspace" className="lab-link">Workspace</a>
        </div>
        <div className="grid content-start gap-3 text-sm">
          <p className="font-medium">Developers</p>
          <Link to="/docs" className="lab-link">Documentation</Link>
          <span className="lab-muted inline-flex items-center gap-2"><Cpu className="size-4" /> Status: page not configured</span>
        </div>
        <div className="grid content-start gap-3 text-sm">
          <p className="font-medium">Account</p>
          <Link to="/auth" search={{ mode: "signin", redirect: "/dashboard" }} className="lab-link">Sign in</Link>
          <span className="lab-muted inline-flex items-center gap-2"><Github className="size-4" /> Open-source foundations</span>
        </div>
      </div>
      <div className="lab-muted mx-auto max-w-7xl px-5 pb-8 text-xs md:px-8">© {new Date().getFullYear()} Aetheris Cloud. All rights reserved.</div>
    </footer>
  );
}

export function LandingPage() {
  return (
    <div className="lab-page min-h-screen overflow-x-hidden">
      <Header />
      <main>
        <Hero />
        <Features />
        <Trust />
        <Pricing />
      </main>
      <Footer />
    </div>
  );
}