"use client";

import { useState } from "react";
import { Plus, FileText, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  usePagesControllerFindAll,
  usePagesControllerCreate,
  usePagesControllerDelete,
  PageResponseDto,
} from "@/lib/api/generated";
import { useQueryClient } from "@tanstack/react-query";

interface PageSidebarProps {
  selectedPageId: string | null;
  onSelectPage: (id: string) => void;
}

export function PageSidebar({
  selectedPageId,
  onSelectPage,
}: PageSidebarProps) {
  const queryClient = useQueryClient();
  const { data: pages, isLoading } = usePagesControllerFindAll();
  const createPage = usePagesControllerCreate();

  const handleCreatePage = async () => {
    const result = await createPage.mutateAsync({
      data: { title: "無題" },
    });
    queryClient.invalidateQueries({ queryKey: ["/pages"] });
    onSelectPage(result.id);
  };

  if (isLoading) {
    return (
      <div className="w-64 bg-zinc-900 border-r border-zinc-800 p-4">
        <div className="animate-pulse space-y-2">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-8 bg-zinc-800 rounded" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-64 bg-zinc-900 border-r border-zinc-800 flex flex-col h-full">
      <div className="p-4 border-b border-zinc-800">
        <h1 className="text-lg font-semibold text-white">📝 Memo</h1>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-2">
          {pages?.map((page) => (
            <PageItem
              key={page.id}
              page={page}
              isSelected={selectedPageId === page.id}
              onSelect={() => onSelectPage(page.id)}
            />
          ))}
        </div>
      </ScrollArea>

      <div className="p-2 border-t border-zinc-800">
        <Button
          variant="ghost"
          className="w-full justify-start text-zinc-400 hover:text-white hover:bg-zinc-800"
          onClick={handleCreatePage}
          disabled={createPage.isPending}
        >
          <Plus className="h-4 w-4 mr-2" />
          新規ページ
        </Button>
      </div>
    </div>
  );
}

function PageItem({
  page,
  isSelected,
  onSelect,
}: {
  page: PageResponseDto;
  isSelected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      onClick={onSelect}
      className={`w-full flex items-center gap-2 px-2 py-1.5 rounded text-sm transition-colors ${
        isSelected
          ? "bg-zinc-800 text-white"
          : "text-zinc-400 hover:bg-zinc-800/50 hover:text-white"
      }`}
    >
      <span>{page.icon || "📄"}</span>
      <span className="truncate flex-1 text-left">{page.title}</span>
    </button>
  );
}
