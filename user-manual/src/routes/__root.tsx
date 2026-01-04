import { createRootRoute, Outlet } from "@tanstack/react-router";
// import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { AppSidebar } from "@/components/app-sidebar";

export const Route = createRootRoute({
  component: () => (
    <div className="flex h-screen w-full bg-background text-foreground">
      <AppSidebar />
      <main className="flex-1 overflow-auto">
        <div className="container mx-auto p-8 max-w-4xl">
          <Outlet />
        </div>
      </main>
      {/* <TanStackRouterDevtools /> */}
    </div>
  ),
});
