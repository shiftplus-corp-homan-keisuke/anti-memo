"use client";

import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { BlockNoteView } from "@blocknote/shadcn";
import { useCreateBlockNote } from "@blocknote/react";
import { Block } from "@blocknote/core";
import {
  usePagesControllerFindById,
  usePagesControllerUpdate,
  useBlocksControllerFindByPageId,
  useBlocksControllerCreate,
  useBlocksControllerUpdate,
  useBlocksControllerDelete,
  BlockResponseDto,
} from "@/lib/api/generated";
import "@blocknote/core/fonts/inter.css";
import "@blocknote/shadcn/style.css";

interface PageEditorProps {
  pageId: string;
}

export function PageEditor({ pageId }: PageEditorProps) {
  const queryClient = useQueryClient();
  const { data: page, isLoading: pageLoading } =
    usePagesControllerFindById(pageId);
  const { data: blocks, isLoading: blocksLoading } =
    useBlocksControllerFindByPageId(pageId);
  const updatePage = usePagesControllerUpdate();

  const [title, setTitle] = useState("");

  useEffect(() => {
    if (page) {
      setTitle(page.title);
    }
  }, [page]);

  const handleTitleChange = async (newTitle: string) => {
    setTitle(newTitle);
    try {
      await updatePage.mutateAsync({
        id: pageId,
        data: { title: newTitle },
      });
      queryClient.invalidateQueries({ queryKey: ["/pages"] });
    } catch (error) {
      console.error("Failed to update title:", error);
    }
  };

  if (pageLoading || blocksLoading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white" />
      </div>
    );
  }

  if (!page) {
    return (
      <div className="flex-1 flex items-center justify-center text-zinc-500">
        ページが見つかりません
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto bg-zinc-950">
      <div className="max-w-4xl mx-auto px-8 py-12">
        {/* Page Title */}
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onBlur={(e) => handleTitleChange(e.target.value)}
          className="w-full text-4xl font-bold bg-transparent border-none outline-none text-white placeholder-zinc-600 mb-8"
          placeholder="無題"
        />

        {/* BlockNote Editor */}
        <div className="blocknote-editor-wrapper">
          <BlockNoteEditor pageId={pageId} initialBlocks={blocks || []} />
        </div>
      </div>
    </div>
  );
}

function BlockNoteEditor({
  pageId,
  initialBlocks,
}: {
  pageId: string;
  initialBlocks: BlockResponseDto[];
}) {
  const queryClient = useQueryClient();
  const createBlock = useBlocksControllerCreate();
  const updateBlock = useBlocksControllerUpdate();
  const deleteBlock = useBlocksControllerDelete();

  const lastSavedBlocksRef = useRef<BlockResponseDto[]>(initialBlocks);
  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isSavingRef = useRef(false);

  const initialContent = useMemo(() => {
    if (initialBlocks.length === 0) return undefined;
    return initialBlocks
      .sort((a, b) => a.order - b.order)
      .map((block) => ({
        id: block.id,
        type: block.type,
        props: block.props || {},
        content: block.content || [],
        children: [],
      }));
  }, [initialBlocks]); // initialBlocks changes only on mount effectively because parent conditional rendering

  const editor = useCreateBlockNote({
    initialContent: initialContent as any, // Cast to any to avoid partial type mismatch
  });

  // デバウンス付き保存処理
  const handleEditorChange = useCallback(() => {
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }

    saveTimeoutRef.current = setTimeout(async () => {
      if (isSavingRef.current) return;
      isSavingRef.current = true;

      try {
        const currentBlocks = editor.document;
        const existingBlocks = lastSavedBlocksRef.current; // Use ref to track last SAVED state, not necessarily initial prop

        const existingBlockMap = new Map(existingBlocks.map((b) => [b.id, b]));

        const currentBlockIds = new Set(
          currentBlocks
            .map((b) => b.id)
            .filter((id) => existingBlockMap.has(id))
        );

        // 削除されたブロックを削除
        for (const existingBlock of existingBlocks) {
          if (!currentBlockIds.has(existingBlock.id)) {
            try {
              await deleteBlock.mutateAsync({ id: existingBlock.id });
            } catch (error) {
              console.error(
                `Failed to delete block ${existingBlock.id}:`,
                error
              );
            }
          }
        }

        // ブロックを更新または作成
        for (let i = 0; i < currentBlocks.length; i++) {
          const block = currentBlocks[i];
          const existingBlock = existingBlockMap.get(block.id);

          const blockData = {
            type: block.type,
            content: block.content || [],
            props: block.props,
            order: i,
          };
          console.log("Saving block:", block.id, blockData);

          if (existingBlock) {
            // 既存のブロックを更新
            try {
              await updateBlock.mutateAsync({
                id: block.id,
                data: {
                  ...blockData,
                  content: blockData.content as any,
                  props: blockData.props as any,
                },
              });
            } catch (error) {
              console.error(`Failed to update block ${block.id}:`, error);
            }
          } else {
            // 新しいブロックを作成
            try {
              await createBlock.mutateAsync({
                data: {
                  ...blockData,
                  content: blockData.content as any,
                  props: blockData.props as any,
                  pageId,
                },
              });
            } catch (error) {
              console.error("Failed to create block:", error);
            }
          }
        }

        // Update lastSavedBlocksRef to current state approximately (or refetch?)
        // Ideally we should refetch to get DB IDs for new blocks, but editor maintains IDs.
        // BlockNote IDs are UUIDs generated client-side usually.
        // If we trust them, we can update local ref.
        // But simpler to invalidate query and let parent re-fetch blocks?
        // IF parent re-fetches, this component MIGHT REMOUNT or receive new props?
        // If it receives new props, we don't want to reset editor!

        // Strategy: invalidate query to update other parts of UI (if any).
        // BUT we must update lastSavedBlocksRef to currentBlocks so next diff is correct.
        // We'll map currentBlocks to BlockResponseDto format locally. (Simplified)
        lastSavedBlocksRef.current = currentBlocks.map((b) => ({
          id: b.id,
          type: b.type,
          content: b.content as any,
          props: b.props,
          order: 0, // order isn't strictly tracked in ref for map, but useful
          pageId,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }));

        queryClient.invalidateQueries({ queryKey: [`/blocks/page/${pageId}`] });
      } catch (error) {
        console.error("Failed to save blocks:", error);
      } finally {
        isSavingRef.current = false;
      }
    }, 2000);
  }, [editor, pageId, createBlock, updateBlock, deleteBlock, queryClient]);

  useEffect(() => {
    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, []);

  return (
    <BlockNoteView editor={editor} theme="dark" onChange={handleEditorChange} />
  );
}
