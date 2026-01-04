"use client";

import { useState } from "react";
import { PageSidebar } from "@/components/page-sidebar";
import { PageEditor } from "@/components/page-editor";
import { FileText } from "lucide-react";

export default function Home() {
  const [selectedPageId, setSelectedPageId] = useState<string | null>(null);

  return (
    <main className="flex h-screen">
      <PageSidebar
        selectedPageId={selectedPageId}
        onSelectPage={setSelectedPageId}
      />

      <div className="flex-1 flex">
        {selectedPageId ? (
          <PageEditor pageId={selectedPageId} />
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-zinc-500">
            <FileText className="h-16 w-16 mb-4 opacity-50" />
            <p className="text-lg">ページを選択してください</p>
            <p className="text-sm mt-2">
              または左側のサイドバーから新規ページを作成
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
