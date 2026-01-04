import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus } from "lucide-react";

export const Route = createFileRoute("/getting-started")({
  component: GettingStarted,
});

function GettingStarted() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">ご利用開始</h1>
        <p className="text-muted-foreground">
          シンプルでパワフルなメモアプリへようこそ。
        </p>
      </div>

      {/* Step 1: アプリケーション画面の説明 */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold border-b pb-2">
          Step 1: 画面構成を理解する
        </h2>
        <p className="text-muted-foreground">
          アプリケーションを開くと、以下のような画面が表示されます。
        </p>
        <div className="rounded-md border shadow-sm overflow-hidden">
          <img
            src="/images/dashboard.png"
            alt="アプリケーション全体の画面"
            className="w-full"
          />
        </div>
        <div className="grid gap-4 md:grid-cols-2 mt-4">
          <Card>
            <CardHeader className="flex flex-row items-center gap-2 space-y-0 pb-2">
              <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">
                A
              </div>
              <CardTitle className="text-base">サイドバー</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                画面左側にあるエリアです。作成したページの一覧が表示され、ページの選択や新規作成ができます。
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center gap-2 space-y-0 pb-2">
              <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">
                B
              </div>
              <CardTitle className="text-base">エディタエリア</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                画面右側の広いエリアです。ここでページのタイトルや本文を編集します。
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Step 2: 新しいページを作成する */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold border-b pb-2">
          Step 2: 新しいページを作成する
        </h2>
        <div className="space-y-6">
          <div className="flex items-start gap-4">
            <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold shrink-0">
              1
            </div>
            <div className="flex-1">
              <p className="font-medium">
                サイドバー下部の「新規ページ」ボタンにマウスを合わせる
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                <Plus className="inline h-4 w-4" />
                アイコンと「新規ページ」と書かれたボタンを探してください。
              </p>
              <div className="rounded-md border shadow-sm overflow-hidden mt-3">
                <img
                  src="/images/new-page-button-hover.png"
                  alt="新規ページボタンをホバーした状態"
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
                クリックすると新しいページが作成されます
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                サイドバーに新しいページが追加され、エディタエリアに「無題」のページが表示されます。
              </p>
              <div className="rounded-md border shadow-sm overflow-hidden mt-3">
                <img
                  src="/images/empty-page.png"
                  alt="新規ページ作成直後の画面"
                  className="w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Step 3: タイトルを編集する */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold border-b pb-2">
          Step 3: ページタイトルを編集する
        </h2>
        <div className="space-y-6">
          <div className="flex items-start gap-4">
            <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold shrink-0">
              1
            </div>
            <div className="flex-1">
              <p className="font-medium">
                エディタ上部の「無題」と表示されている部分をクリック
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                クリックするとカーソルが表示され、入力可能になります。
              </p>
              <div className="rounded-md border shadow-sm overflow-hidden mt-3">
                <img
                  src="/images/title-focus.png"
                  alt="タイトルにフォーカスした状態"
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
              <p className="font-medium">タイトルを入力</p>
              <p className="text-sm text-muted-foreground mt-1">
                お好きなタイトルを入力してください。入力後、他の場所をクリックすると自動的に保存されます。
              </p>
              <div className="rounded-md border shadow-sm overflow-hidden mt-3">
                <img
                  src="/images/title-editing.png"
                  alt="タイトル編集中の画面"
                  className="w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Step 4: 本文を入力する */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold border-b pb-2">
          Step 4: 本文を入力する
        </h2>
        <div className="space-y-6">
          <div className="flex items-start gap-4">
            <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold shrink-0">
              1
            </div>
            <div className="flex-1">
              <p className="font-medium">タイトル下のエリアをクリック</p>
              <p className="text-sm text-muted-foreground mt-1">
                タイトルの下にある広いエリアをクリックして、本文の入力を開始します。
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold shrink-0">
              2
            </div>
            <div className="flex-1">
              <p className="font-medium">テキストを入力</p>
              <p className="text-sm text-muted-foreground mt-1">
                通常のテキストエディタと同じように文字を入力できます。
              </p>
              <div className="rounded-md border shadow-sm overflow-hidden mt-3">
                <img
                  src="/images/text-input.png"
                  alt="テキスト入力中の画面"
                  className="w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="bg-muted/50 rounded-lg p-4 border">
        <p className="text-sm">
          <strong>次のステップ:</strong>{" "}
          基本的な操作がわかったら、「エディタの使い方」ページで見出しやリストなど、より高度な編集方法を学びましょう。
        </p>
      </div>
    </div>
  );
}
