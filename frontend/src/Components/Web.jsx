import React, { useState, useEffect } from "react";
import StickyNavbar from "./StickyNavbar"; // 假設 StickyNavbar 檔案存在且路徑正確

export default function Web() {
  const [notionContent, setNotionContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // frontend/src/Web.js
  // ...
  useEffect(() => {
    const fetchNotionContent = async () => {
      try {
        // 將此更改為 Vercel 部署的相對路徑
        const response = await fetch("/api/notion/page");
        // ... 你的其餘程式碼
      } catch (e) {
        setError(e);
        console.error("未能獲取 Notion 內容:", e);
      } finally {
        setLoading(false);
      }
    };
    fetchNotionContent();
  }, []);
  // ...

  if (loading) {
    return (
      <nav className="absolute w-full min-h-screen pt-20 bg-slate-800 text-white flex justify-center items-center text-xl">
        載入 Notion 內容中...
      </nav>
    );
  }

  if (error) {
    return (
      <nav className="absolute w-full min-h-screen pt-20 bg-slate-800 text-red-500 flex justify-center items-center text-xl">
        載入 Notion 內容失敗: {error.message}
      </nav>
    );
  }

  return (
    <nav className="absolute w-full min-h-screen pt-20 bg-slate-800 text-white">
      <StickyNavbar />
      <div className="container mx-auto p-4 max-w-3xl">
        {notionContent && (
          <div>
            <h1 className="text-4xl font-bold mb-6 text-center">
              {notionContent.title || "Notion 頁面"}
            </h1>
            <div className="space-y-4">
              {notionContent.content.map((block) => (
                <div key={block.id} className="bg-slate-700 p-3 rounded-md">
                  {/* 根據不同的區塊類型渲染不同的 HTML 元素 */}
                  {block.type === "paragraph" && <p>{block.text}</p>}
                  {block.type === "heading_1" && (
                    <h2 className="text-3xl font-semibold">{block.text}</h2>
                  )}
                  {block.type === "heading_2" && (
                    <h3 className="text-2xl font-semibold">{block.text}</h3>
                  )}
                  {block.type === "heading_3" && (
                    <h4 className="text-xl font-semibold">{block.text}</h4>
                  )}
                  {block.type === "bulleted_list_item" && (
                    <ul className="list-disc ml-5">
                      <li>{block.text}</li>
                    </ul>
                  )}
                  {block.type === "numbered_list_item" && (
                    <ol className="list-decimal ml-5">
                      <li>{block.text}</li>
                    </ol>
                  )}
                  {block.type === "image" && (
                    // 圖片連結在 block.text 中以 "圖片 (類型): URL" 格式傳遞
                    <img
                      src={block.text.split(": ")[1]}
                      alt="Notion Image"
                      className="max-w-full h-auto rounded-md"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src =
                          "https://via.placeholder.com/150?text=圖片載入失敗";
                      }} // 錯誤處理
                    />
                  )}
                  {block.type === "to_do" && (
                    <p className="flex items-center">
                      <input
                        type="checkbox"
                        checked={block.text.startsWith("[x]")}
                        readOnly
                        className="mr-2"
                      />
                      {block.text.substring(block.text.indexOf("]") + 2)}
                    </p>
                  )}
                  {block.type === "callout" && (
                    <p className="bg-blue-600 p-2 rounded">
                      {block.text.replace("提示: ", "")}
                    </p>
                  )}
                  {block.type === "quote" && (
                    <blockquote className="border-l-4 border-gray-400 pl-4 italic">
                      {block.text.replace("引言: ", "")}
                    </blockquote>
                  )}
                  {block.type === "code" && (
                    <pre className="bg-gray-900 text-green-400 p-3 rounded-md overflow-x-auto text-sm">
                      <code>
                        {block.text.substring(block.text.indexOf("):") + 3)}
                      </code>
                    </pre>
                  )}
                  {block.type === "toggle" && (
                    <p className="font-bold">
                      {block.text.replace("開關: ", "")}
                    </p>
                  )}
                  {block.type === "divider" && (
                    <hr className="border-t-2 border-gray-600 my-4" />
                  )}
                  {block.type === "child_page" && (
                    <p className="text-blue-400">
                      🔗 {block.text.replace("子頁面: ", "")}
                    </p>
                  )}
                  {block.type === "column_list" && (
                    <p className="italic text-gray-400">({block.text})</p>
                  )}
                  {block.type === "bookmark" && (
                    <a
                      href={block.text.split(": ")[1]}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:underline"
                    >
                      🔗 書籤: {block.text.split(": ")[1]}
                    </a>
                  )}
                  {block.type === "link_to_page" && (
                    <p className="text-blue-400">
                      🔗 連結到頁面: {block.text.split(": ")[1]}
                    </p>
                  )}

                  {/* 如果有未處理的區塊類型，可以添加一個通用顯示，用於調試 */}
                  {![
                    "paragraph",
                    "heading_1",
                    "heading_2",
                    "heading_3",
                    "bulleted_list_item",
                    "numbered_list_item",
                    "image",
                    "to_do",
                    "callout",
                    "quote",
                    "code",
                    "toggle",
                    "divider",
                    "child_page",
                    "column_list",
                    "bookmark",
                    "link_to_page",
                  ].includes(block.type) && (
                    <p className="text-yellow-400">
                      <strong>未處理的區塊類型 ({block.type}):</strong>{" "}
                      {block.text}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
