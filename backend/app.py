import os
from flask import Flask, jsonify, request
from notion_client import Client
from dotenv import load_dotenv
from flask_cors import CORS

# 載入環境變數 (會從 .env 檔案讀取)
load_dotenv()

app = Flask(__name__)
# 啟用 CORS，允許前端應用程式訪問此後端。
# 在實際生產環境中，建議將 origins 限制為你的前端網域，例如：
# CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})
CORS(app)

# 從環境變數獲取 Notion API Key
NOTION_TOKEN = os.getenv("NOTION_TOKEN")
if not NOTION_TOKEN:
    raise ValueError("NOTION_TOKEN 環境變數未設定。請檢查 .env 檔案。")

# 初始化 Notion 客戶端
notion = Client(auth=NOTION_TOKEN)

# 從環境變數獲取 Notion 頁面 ID
NOTION_PAGE_ID = os.getenv("NOTION_PAGE_ID")
if not NOTION_PAGE_ID:
    raise ValueError("NOTION_PAGE_ID 環境變數未設定。請檢查 .env 檔案。")


@app.route('/api/notion/page', methods=['GET'])
def get_notion_page():
    """
    獲取指定 Notion 頁面的內容。
    此函數會獲取頁面標題和各個區塊的純文字內容。
    對於不同類型的區塊，會進行基本的解析。
    """
    try:
        # 1. 獲取頁面屬性 (包含標題)
        page_properties = notion.pages.retrieve(page_id=NOTION_PAGE_ID)
        title = "未命名頁面"  # 預設標題

        # 嘗試從頁面屬性中解析標題
        # Notion 頁面標題的結構可能因其類型（例如資料庫頁面 vs. 普通頁面）而異
        if 'properties' in page_properties and 'title' in page_properties['properties']:
            # 對於普通頁面或資料庫頁面，標題通常在 'title' 屬性中
            if 'title' in page_properties['properties']['title'] and len(page_properties['properties']['title']['title']) > 0:
                title = page_properties['properties']['title']['title'][0]['plain_text']
        elif 'title' in page_properties:
            # 有些情況下，頁面名稱可能直接在頂層 'title' 屬性
            title = page_properties['title']

        # 2. 獲取頁面所有區塊的內容
        blocks_data = notion.blocks.children.list(
            block_id=NOTION_PAGE_ID, page_size=100)  # 每次獲取最多 100 個區塊
        content = []

        for block in blocks_data['results']:
            block_type = block['type']
            text_content = ""

            # 處理常見的文本類區塊，它們通常包含 'rich_text'
            if 'rich_text' in block[block_type] and len(block[block_type]['rich_text']) > 0:
                # 合併所有 rich_text 物件的 plain_text
                text_content = "".join([rt['plain_text']
                                       for rt in block[block_type]['rich_text']])
            elif block_type == 'image':
                # 處理圖片區塊
                if block['image']['type'] == 'external':
                    text_content = f"圖片 (外部): {block['image']['external']['url']}"
                elif block['image']['type'] == 'file':
                    text_content = f"圖片 (上傳): {block['image']['file']['url']}"
            elif block_type == 'to_do':
                # 處理待辦清單
                checked = block['to_do']['checked']
                text_content = f"[{'x' if checked else ' '}] {''.join([rt['plain_text'] for rt in block['to_do']['rich_text']])}"
            elif block_type == 'callout':
                # 處理提示框
                text_content = f"提示: {''.join([rt['plain_text'] for rt in block['callout']['rich_text']])}"
            elif block_type == 'quote':
                # 處理引言
                text_content = f"引言: {''.join([rt['plain_text'] for rt in block['quote']['rich_text']])}"
            elif block_type == 'code':
                # 處理程式碼塊
                language = block['code']['language']
                code_text = ''.join([rt['plain_text']
                                    for rt in block['code']['rich_text']])
                text_content = f"程式碼 ({language}):\n{code_text}"
            elif block_type == 'toggle':
                # 處理開關列表
                text_content = f"開關: {''.join([rt['plain_text'] for rt in block['toggle']['rich_text']])}"
                # 如果有子區塊，這裡可以遞迴處理，但目前範例不包含遞迴
            elif block_type == 'divider':
                # 處理分隔線
                text_content = "---"
            elif block_type == 'child_page':
                # 處理子頁面連結
                text_content = f"子頁面: {block['child_page']['title']}"
            elif block_type == 'column_list':
                # 處理多欄佈局，可能包含多個 column 子區塊
                # 這個範例只標示有欄位，實際內容需要遍歷子區塊
                text_content = "多欄佈局"
            elif block_type == 'bookmark':
                # 處理書籤
                text_content = f"書籤: {block['bookmark'].get('url', 'N/A')}"
            elif block_type == 'link_to_page':
                # 處理連結到頁面
                text_content = f"連結到頁面: {block['link_to_page'].get('page_id', 'N/A')}"
            # 你可以根據 Notion API 文件添加更多區塊類型的處理，例如：
            # table, table_row, equation, breadcrumb, synced_block, template_button 等

            if text_content:  # 只添加有內容的區塊
                content.append({
                    'id': block['id'],  # 區塊的唯一 ID
                    'type': block_type,
                    'text': text_content
                })

        return jsonify({"title": title, "content": content})

    except Exception as e:
        print(f"從 Notion 獲取頁面時發生錯誤: {e}")
        return jsonify({"error": str(e)}), 500  # 返回 500 狀態碼表示伺服器錯誤


if __name__ == '__main__':
    # 在開發模式下運行 Flask 應用程式，並監聽在 5000 埠
    app.run(debug=True, port=5000)
