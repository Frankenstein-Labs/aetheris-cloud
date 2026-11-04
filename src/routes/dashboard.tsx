import { createFileRoute, Outlet } from "@tanstack/react-router";
import { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { DashboardSearch } from "@/components/layout/DashboardSearch";
import { DashboardTheme, ThemePicker } from "@/components/layout/DashboardTheme";
import { AppSidebar, useActiveNavLabel } from "@/components/layout/AppSidebar";

export const Route = createFileRoute("/dashboard")({
  ssr: false,
  component: DashboardLayout,
});

function DashboardLayout() {
  const activeLabel = useActiveNavLabel();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && !user) {
      const destination = encodeURIComponent(window.location.pathname + window.location.search);
      window.location.replace(`/auth?mode=signin&redirect=${destination}`);
    }
  }, [loading, user]);

  if (loading || !user) return null;

  return (
    <DashboardTheme><SidebarProvider>
      <div className="bg-background text-foreground flex min-h-screen w-full antialiased">
        <AppSidebar />
        <SidebarInset className="min-w-0">
          <header className="bg-background sticky top-0 z-20 flex h-14 shrink-0 items-center gap-2 border-b px-4 ">
            <SidebarTrigger className="-ms-1" />
            <Separator orientation="vertical" className="me-2 h-4" />
            <div className="flex items-center gap-2 text-sm">
              <span className="text-muted-foreground">Aetheris</span>
              <span className="text-muted-foreground">/</span>
              <span className="font-medium">{activeLabel}</span>
            </div>
            <div className="ml-auto flex items-center gap-2"><DashboardSearch /><ThemePicker /></div>
          </header>
          <main className="flex flex-1 flex-col gap-6 p-4 md:p-6">
            <Outlet />
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider></DashboardTheme>
  );
}
