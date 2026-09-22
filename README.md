# Taiwan-Wedding-2026-10-03
Hanru &amp; David's Taiwan wedding digital invitation

李大為 & 周寒茹 婚宴電子請帖：https://freya-and-david.github.io/Taiwan-Wedding-2026-10-03/

⚠️ 這個 repo 是 **public**，只放要給所有賓客看的資訊（新人、時間、地點、停車）。賓客名單、流程負責人、聯絡電話、合約內容等都不要放這裡。

## 結構

```
index.html               # 請帖單頁（內容直接寫在 HTML）
assets/css/style.css
assets/js/main.js        # 倒數計時、捲動淡入、導覽列目前位置
assets/img/floral.svg    # 花草裝飾
assets/img/og-image.png  # LINE／FB 分享預覽圖（由 og.html 截圖產生）
wedding.ics              # 加入 Apple／Outlook 行事曆
og.html                  # 分享預覽圖模板
```

## 本機預覽

```sh
python3 -m http.server 8000
# 打開 http://localhost:8000
```

## 修改內容

- 日期、時間、地點會出現在：`index.html`（含 meta 與 Google 日曆連結）、`assets/js/main.js`（倒數用的 `START`／`END`）、`wedding.ics`、`og.html`。改的時候要一起改。
- 放新人照片：存成 `assets/img/hero.jpg`，然後在 `index.html` 的 `<section id="home" class="hero">` 加上 `has-photo` class。
- 重新產生分享預覽圖：本機預覽時用瀏覽器以 1200×630 打開 `og.html` 並截圖，存成 `assets/img/og-image.png`。

## 部署

GitHub Pages：Settings → Pages → Deploy from a branch → `main` / `(root)`。push 到 `main` 後約一分鐘生效。
