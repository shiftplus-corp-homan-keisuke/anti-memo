import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">
          ユーザーマニュアル
        </h1>
        <p className="text-xl text-muted-foreground">
          シンプルで直感的なメモアプリケーションの公式ガイドへようこそ。
        </p>
      </div>

      <div className="grid gap-6">
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
          <h2 className="text-2xl font-semibold mb-4">アプリケーション概要</h2>
          {/* 
                TODO: Replace with a better screenshot showing the editor in action if possible.
                For now, preserving existing logic.
             */}
          <div className="aspect-video bg-muted rounded-md mb-4 overflow-hidden border shadow-sm relative group">
            <img
              src="/images/dashboard.png"
              alt="アプリケーション画面"
              className="w-full h-full object-cover object-top"
            />
          </div>
          <p className="mt-4 leading-7">
            このアプリケーションは、日々のアイデアやタスクを整理するためのプライベートなメモスペースです。
            左側のサイドバーでページを管理し、右側のエディタで自由にコンテンツを作成できます。
          </p>
          <div className="mt-6 flex gap-4">
            <Button asChild>
              <Link to="/getting-started">
                使い方を見る <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
