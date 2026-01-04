import { createFileRoute } from "@tanstack/react-router";
import {
  Heading1,
  List,
  ListOrdered,
  CheckSquare,
  Quote,
  Code2,
  Minus,
  MousePointer,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const Route = createFileRoute("/editor")({
  component: EditorPage,
});

function EditorPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">エディタの使い方</h1>
        <p className="text-muted-foreground">
          直感的なブロックエディタで、思い通りにドキュメントを作成できます。
        </p>
      </div>

      {/* スラッシュコマンドの使い方 */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold border-b pb-2">
          スラッシュコマンドでブロックを追加
        </h2>
        <p className="text-muted-foreground">
          見出しやリストなど、様々な種類のブロックを簡単に追加できます。
        </p>

        <div className="space-y-6">
          <div className="flex items-start gap-4">
            <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold shrink-0">
              1
            </div>
            <div className="flex-1">
              <p className="font-medium">
                本文エリアで{" "}
                <kbd className="px-2 py-1 bg-muted rounded text-sm font-mono">
                  /
                </kbd>{" "}
                キーを入力
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                スラッシュを入力すると、コマンドメニューが表示されます。
              </p>
              <div className="rounded-md border shadow-sm overflow-hidden mt-3">
                <img
                  src="/images/slash-menu-open.png"
                  alt="スラッシュメニューの表示"
                  className="w-full"
                />
              </div>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold shrink-0">
              2
            </div>
            <div className="flex-1">
              <p className="font-medium">
                追加したいブロックをクリック または{" "}
                <kbd className="px-2 py-1 bg-muted rounded text-sm font-mono">
                  ↑
                </kbd>
                <kbd className="px-2 py-1 bg-muted rounded text-sm font-mono">
                  ↓
                </kbd>{" "}
                キーで選択して{" "}
                <kbd className="px-2 py-1 bg-muted rounded text-sm font-mono">
                  Enter
                </kbd>
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                メニュー内の項目をクリックするか、キーボードで選択できます。
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold shrink-0">
              3
            </div>
            <div className="flex-1">
              <p className="font-medium">
                ブロックが挿入され、入力可能になります
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                選択したタイプのブロックが追加され、すぐに内容を入力できます。
              </p>
              <div className="rounded-md border shadow-sm overflow-hidden mt-3">
                <img
                  src="/images/heading-created.png"
                  alt="見出しブロックの例"
                  className="w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 箇条書きリストの例 */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold border-b pb-2">
          リストを作成する
        </h2>
        <p className="text-muted-foreground">
          スラッシュコマンドまたはショートカットでリストを作成できます。
        </p>
        <div className="rounded-md border shadow-sm overflow-hidden">
          <img
            src="/images/bullet-list-example.png"
            alt="箇条書きリストの例"
            className="w-full"
          />
        </div>
        <p className="text-sm text-muted-foreground">
          <strong>ヒント:</strong>{" "}
          <kbd className="px-1.5 py-0.5 bg-muted rounded font-mono text-xs">
            -
          </kbd>{" "}
          + スペース で箇条書き、
          <kbd className="px-1.5 py-0.5 bg-muted rounded font-mono text-xs">
            1.
          </kbd>{" "}
          + スペース で番号付きリストを素早く作成できます。
        </p>
      </section>

      {/* 利用可能なブロック一覧 */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold border-b pb-2">
          利用可能なブロック一覧
        </h2>
        <p className="text-muted-foreground">
          以下のブロックタイプをスラッシュコマンドから選択できます。
        </p>
        <div className="grid gap-3 sm:grid-cols-2">
          <BlockItem
            icon={<Heading1 />}
            label="見出し (Heading)"
            desc="セクションのタイトルを作成します。レベル 1〜3 を選択可能。"
            shortcut="# + スペース"
          />
          <BlockItem
            icon={<List />}
            label="箇条書きリスト"
            desc="シンプルな箇条書きリストを作成します。"
            shortcut="- + スペース"
          />
          <BlockItem
            icon={<ListOrdered />}
            label="番号付きリスト"
            desc="順序のある番号付きリストを作成します。"
            shortcut="1. + スペース"
          />
          <BlockItem
            icon={<CheckSquare />}
            label="ToDo リスト"
            desc="チェックボックス付きのタスクリストを作成します。"
            shortcut="[] + スペース"
          />
          <BlockItem
            icon={<Quote />}
            label="引用"
            desc="重要なテキストを引用形式で強調します。"
            shortcut="> + スペース"
          />
          <BlockItem
            icon={<Code2 />}
            label="コードブロック"
            desc="プログラムコードをシンタックスハイライト付きで表示します。"
            shortcut="``` + Enter"
          />
          <BlockItem
            icon={<Minus />}
            label="区切り線"
            desc="コンテンツを視覚的に分割する水平線を追加します。"
            shortcut="--- + Enter"
          />
        </div>
      </section>

      {/* テキスト書式 */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold border-b pb-2">
          テキストを装飾する
        </h2>
        <p className="text-muted-foreground">
          テキストを選択すると装飾メニューが表示され、太字や斜体などを適用できます。
        </p>

        <div className="space-y-6">
          <div className="flex items-start gap-4">
            <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold shrink-0">
              1
            </div>
            <div className="flex-1">
              <p className="font-medium">
                装飾したいテキストをマウスでドラッグして選択
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                選択するとテキストがハイライトされます。
              </p>
              <div className="rounded-md border shadow-sm overflow-hidden mt-3">
                <img
                  src="/images/text-selected.png"
                  alt="テキスト選択時の画面"
                  className="w-full"
                />
              </div>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold shrink-0">
              2
            </div>
            <div className="flex-1">
              <p className="font-medium">
                表示されたメニューから装飾を選択 または ショートカットキーを使用
              </p>
              <div className="mt-3 grid gap-2 sm:grid-cols-2">
                <FormatItem
                  label="太字"
                  shortcut="Cmd/Ctrl + B"
                  example={<strong>太字テキスト</strong>}
                />
                <FormatItem
                  label="斜体"
                  shortcut="Cmd/Ctrl + I"
                  example={<em>斜体テキスト</em>}
                />
                <FormatItem
                  label="下線"
                  shortcut="Cmd/Ctrl + U"
                  example={<u>下線テキスト</u>}
                />
                <FormatItem
                  label="取り消し線"
                  shortcut="Cmd/Ctrl + Shift + X"
                  example={<s>取り消し線</s>}
                />
                <FormatItem
                  label="インラインコード"
                  shortcut="Cmd/Ctrl + E"
                  example={
                    <code className="bg-muted px-1 py-0.5 rounded text-sm">
                      code
                    </code>
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 完成例 */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold border-b pb-2">完成例</h2>
        <p className="text-muted-foreground">
          見出し、リスト、テキストを組み合わせて、このようなページを作成できます。
        </p>
        <div className="rounded-md border shadow-sm overflow-hidden">
          <img
            src="/images/complete-page.png"
            alt="完成したページの例"
            className="w-full"
          />
        </div>
      </section>

      {/* ブロックの移動 */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold border-b pb-2">
          ブロックを移動する
        </h2>
        <div className="flex items-start gap-4">
          <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold shrink-0">
            <MousePointer className="h-4 w-4" />
          </div>
          <div className="flex-1">
            <p className="font-medium">
              ブロックの左側にマウスを置くと表示される <code>::</code>{" "}
              ハンドルをドラッグ
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              ハンドルをつかんで上下にドラッグすることで、ブロックの順序を自由に並べ替えられます。
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

function BlockItem({
  icon,
  label,
  desc,
  shortcut,
}: {
  icon: React.ReactNode;
  label: string;
  desc: string;
  shortcut: string;
}) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-3 space-y-0 pb-2">
        <div className="text-primary">{icon}</div>
        <CardTitle className="text-base">{label}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-2">{desc}</p>
        <p className="text-xs">
          <span className="text-muted-foreground">ショートカット: </span>
          <kbd className="px-1.5 py-0.5 bg-muted rounded font-mono text-xs">
            {shortcut}
          </kbd>
        </p>
      </CardContent>
    </Card>
  );
}

function FormatItem({
  label,
  shortcut,
  example,
}: {
  label: string;
  shortcut: string;
  example: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between p-2 bg-muted/50 rounded-md">
      <div className="flex items-center gap-2">
        <span className="text-sm">{example}</span>
        <span className="text-xs text-muted-foreground">({label})</span>
      </div>
      <kbd className="px-1.5 py-0.5 bg-background border rounded font-mono text-xs">
        {shortcut}
      </kbd>
    </div>
  );
}
