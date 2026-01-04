import { Link } from "@tanstack/react-router";

export function AppSidebar() {
  return (
    <aside className="w-64 border-r bg-muted/20 hidden md:flex flex-col h-full">
      <div className="p-6 font-bold text-xl border-b">ユーザーマニュアル</div>
      <nav className="flex flex-col gap-1 p-4 overflow-y-auto">
        <Link
          to="/"
          className="px-3 py-2 hover:bg-accent rounded-md text-sm transition-colors [&.active]:bg-accent [&.active]:font-medium [&.active]:text-accent-foreground"
        >
          はじめに
        </Link>

        <div className="mt-4 px-3 text-xs font-semibold text-muted-foreground uppercase">
          ガイド
        </div>
        <Link
          to="/getting-started"
          className="px-3 py-2 hover:bg-accent rounded-md text-sm transition-colors [&.active]:bg-accent [&.active]:font-medium [&.active]:text-accent-foreground"
        >
          ご利用開始
        </Link>
        <Link
          to="/editor"
          className="px-3 py-2 hover:bg-accent rounded-md text-sm transition-colors [&.active]:bg-accent [&.active]:font-medium [&.active]:text-accent-foreground"
        >
          エディタの使い方
        </Link>
      </nav>
    </aside>
  );
}
