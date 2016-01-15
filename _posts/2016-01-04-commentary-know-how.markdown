---
layout: post
img: nil
category: commentaries
title: 縦書きレイアウト作成ノウハウ
description: 実際に縦書きレイアウトを作成する際のノウハウを解説します
---

<ul>
<li><small>この記事は、インターネット・アカデミー「縦書きレイアウト実践セミナー」（2015年10月20日）で使用されたテキストを編集したものになります。</small></li>
<li><small>各ブラウザのCSSプロパティの実装は、掲載時の時点のものです。最新の実装状況とは異なる可能性があります。</small></li>
</ul>

## 1．縦書き・横書きの指定

縦書きレイアウトの応用範囲はWeb サイトだけではなく、電子書籍、デジタルサイネージなど様々です。ここでは縦書きレイアウトのポイントを解説します。

ただし、ここに解説する記述方法は最新の書式であり、ブラウザによっては未対応の場合があります。

### 1-1．writing-mode

writing-mode は、縦書き、横書きの方向を指定するCSSプロパティです。writing-mode の値には、行や列を並べる方向を指定します。

| 書式 | 解説 |
| --  | -- |
| writing-mode: 値; | 縦書き・横書きを指定する |

writing-mode を指定しない場合や、値を「horizontal-tb」と指定した場合は横書き表示となります。これに対して「vertical-rl」と指定すると縦書きで表示することができます。

| Chrome,Safari,Firefox | Internet Explorer | 解説 |
| --- | --- | --- |
| horizontal-tb | lr-tb | 横書きで、行は上から下の順に表示 |
| vertical-rl | tb-rl | 縦書きで、列は右から左の順に表示 |
| vertical-lr | tb-lr | 縦書きで、列は左から右の順に表示 |

<b>記述例: HTML</b>

```html
<!doctype html>
<html lang="ja">
<head>
<meta charset="utf-8">
<title> サンプル</title>
<link href="common/css/basic.css" rel="stylesheet" type="text/css">
</head>
<body>
<h1>本日の内容</h1>
<p>縦書きレイアウトのWebコンテンツ実践セミナーです。</p>
</body>
</html>
```

<b>記述例: CSS</b>

```css
body{
  -webkit-writing-mode: vertical-rl; /* 実装済 */
  -moz-writing-mode: vertical-rl; /* 未実装 */
  -ms-writing-mode: tb-rl; /* 実装済 */
  writing-mode: vertical-rl;
}
```

### 1－2．text-orientation

text-orientationは、縦書きの中の文字を回転させます。例えば、writing-mode を縦書きに設定しただけでは、文章中のアルファベットは横向きのまま表示されてしまいます。そこで、text-orientation を使用することで、文字も縦向きにすることができます。

| 書式 | 解説 |
| --  | -- |
| text-orientation: upright; | 縦書きの中の文字を縦に回転させる |

前述のCSSを以下のように書き換えると、縦書きの中で表示されているアルファベットの文字が縦に回転した状態で表示されます。

```css
body{
  -webkit-writing-mode: vertical-rl; /* 実装済 */
  -moz-writing-mode: vertical-rl; /* 未実装 */
  -ms-writing-mode: tb-rl; /* 実装済 */
  writing-mode: vertical-rl;

  -webkit-text-orientation: upright; /* 実装済 */
  -moz-text-orientation: upright; /* 未実装 */
  -ms-text-orientation: upright; /* 未実装 */
  text-orientation: upright;
}
```

### 1－3．text-combine

text-combine を利用すると、１文字分のスペースに複数の文字を表示できるようになります。これを利用すると、縦書きの中に横書きの文字を入れ、縦中横（たてちゅうよこ）と呼ばれるレイアウトを作成することができます。

| 書式 | 解説 |
| --  | -- |
| text-combine-upright: all; | 縦書きの文字を縦中横のレイアウトにする |
| text-combine: horizontal;  | Chrome , Safari での実装 |
| text-combine-horizontal: all; | Internet Explorer での実装 |
| text-combine-upright: all; | Firefox での実装 |

前日の記述例を以下のように書き換えると、1 文字分のスペースに２桁の数字が縦に表示させることができます。

<b>HTML</b>

```html
<!doctype html>
<html lang="ja">
<head>
<meta charset="utf-8">
<title> サンプル</title>
<link href="common/css/basic.css" rel="stylesheet" type="text/css">
</head>
<body>
<h1>本日の内容</h1>
<p>縦書きレイアウトのWebコンテンツ実践セミナーです。</p>
<p>6月<span class="combine">19</span>日のお知らせです。</p>
</body>
</html>
```

<b>CSS</b>

```css
body{
  -webkit-writing-mode: vertical-rl; /* 実装済 */
  -moz-writing-mode: vertical-rl; /* 未実装 */
  -ms-writing-mode: tb-rl; /* 実装済 */
  writing-mode: vertical-rl;
  
  -webkit-text-orientation: upright; /* 実装済 */
  -moz-text-orientation: upright; /* 未実装 */
  -ms-text-orientation: upright; /* 未実装 */
  text-orientation: upright;
}

.combine{
  -webkit-text-combine: horizontal; /* 実装済 */
  -moz-text-combine-upright: all; /* 実装済(Firefox nightly 版) */
  -ms-text-combine-horizontal:all; /* 実装済 */
  text-combine-upright: all;
}
```

## 2．ルビの指定

### 2－1．HTML5 ruby

日本語の「ふりがな」であるruby 要素は、ルビ注記を伴ってマークアップします。ルビテキストは、ベーステキストのどちらか一方の側に、ときには両側に現れることもあります。それは、CSS を使って位置を調整することが可能です。

テキストにルビを指定する場合はruby タグを使用します。また、テキスト（親文字）の上部に表示するルビに対してはrt タグで指定します。


| 書式 | 解説 |
| --  | -- |
| <ruby\>親文字<rt\>ルビ</rt\><ruby\> | 親文字にルビを指定する |

<b>記述例: HTML</b>

```html
<!doctype html>
<html lang="ja">
<head>
<meta charset="utf-8">
<title> サンプル</title>
<link href="common/css/basic.css" rel="stylesheet" type="text/css">
</head>
<body>
<h1>本日の内容</h1>
<p>縦書きレイアウトのWebコンテンツ実践セミナーです。</p>
<p><ruby>日本語<rt>にほんご</rt></ruby>の<ruby>作文<rt>さくぶん</rt></ruby>です。</p>
</body>
</html>
```

### 2－2．ruby-position

ruby-position プロパティを利用すると、ルビの位置を指定することができます。

| 書式 | 解説 |
| --  | -- |
| ruby-position: [ over \| under ]; | ルビの位置を指定する |

横書きの場合、over は上側に、under は下側にルビが表示されます。また、縦書きの場合はover が右側、under が左側に表示されます。記述例を以下のように書き換えることでルビの表示位置が変わります。

```css
body{
  -webkit-writing-mode: vertical-rl; /* 実装済 */
  -moz-writing-mode: vertical-rl; /* 未実装 */
  -ms-writing-mode: tb-rl; /* 実装済 */
  writing-mode: vertical-rl;
  
  -webkit-text-orientation: upright; /* 実装済 */
  -moz-text-orientation: upright; /* 未実装 */
  -ms-text-orientation: upright; /* 未実装 */
  text-orientation: upright;
}

.combine{
  -webkit-text-combine: horizontal; /* 実装済 */
  -moz-text-combine-upright: all; /* 実装済(Firefox nightly 版) */
  -ms-text-combine-horizontal:all; /* 実装済 */
  text-combine-upright: all;
}

ruby{
  -webkit-ruby-position: over; /* 実装済 */
  -moz-ruby-position: over; /* 実装済 */
  -ms-ruby-position: over; /* 実装済 */
  ruby-position: over; /* 実装済 */
}
```

## 3．縦書きの装飾

縦書きの文章において傍線を設定した場合、傍線が文字の左側に配置され、不自然な表示になってしまいます。それを回避するために、text-underline-position を使用します。

| 書式 | 解説 |
| --  | -- |
| text-underline-position: 値; | 傍線の表示位置を指定 |

| CSS3の値 | 解説 |
| -- | -- |
| auto | ブラウザに仕様に依存します |
| left | 縦書きの場合、左側に表示します |
| right | 縦書きの場合、右側に表示します |

記述例を以下のように書き換えることで、縦書き文章の傍線の位置を左側から右側に変更することができます。

<b>記述例: HTML</b>

```html
<!doctype html>
<html lang="ja">
<head>
<meta charset="utf-8">
<title> サンプル</title>
<link href="common/css/basic.css" rel="stylesheet" type="text/css">
</head>
<body>
<h1>本日の内容</h1>
<p>縦書きレイアウトのWebコンテンツ実践セミナーです。</p>
<p><ruby>日本語<rt>にほんご</rt></ruby>の<ruby>作文<rt>さくぶん</rt></ruby>です。</p>
<p><span class="underline"> 重要な箇所</span> は線を引きます。</p>
</body>
</html>
```

<b>記述例: CSS</b>

```css
body{
  -webkit-writing-mode: vertical-rl; /* 実装済 */
  -moz-writing-mode: vertical-rl; /* 未実装 */
  -ms-writing-mode: tb-rl; /* 実装済 */
  writing-mode: vertical-rl;
  
  -webkit-text-orientation: upright; /* 実装済 */
  -moz-text-orientation: upright; /* 未実装 */
  -ms-text-orientation: upright; /* 未実装 */
  text-orientation: upright;
}

.combine{
  -webkit-text-combine: horizontal; /* 実装済 */
  -moz-text-combine-upright: all; /* 実装済(Firefox nightly 版) */
  -ms-text-combine-horizontal:all; /* 実装済 */
  text-combine-upright: all;
}

ruby{
  -webkit-ruby-position: over; /* 実装済 */
  -moz-ruby-position: over; /* 実装済 */
  -ms-ruby-position: over; /* 実装済 */
  ruby-position: over; /* 実装済 */
}

.underline{
  text-decoration: underline;
  -webkit-text-underline-position: right; /* 未実装 */
  -moz-text-underline-position: right; /* 未実装 */
  -ms-text-underline-position: right; /* 実装済 */
  text-underline-position: right;
}
```

### 3－2．圏点の表示

text-emphasis-style プロパティおよびtext-emphasis-color プロパティを利用すると、日本語の語句を強調する圏点を表示し、色を調整することが可能になります。

| 書式 | 解説 |
| --  | -- |
|  text-emphasis-style: 値; | 圏点の種類を設定する |
|  text-emphasis-color: 値  | 圏点の色を設定する |

text-emphasis-style の値は以下の通りです。

| text-emphasis-styleの値 | 解説 |
| -- | -- |
| dot filled | ビュレット |
| dot open | 白ビュレット |
| circle filled | 黒丸 |
| circle open | 白丸 |
| double-circle filled | 蛇の目 |
| double-circle open | 二重丸 |
| triangle filled | 黒三角 |
| triangle open | 三角 |
| dot filled | ビュレット |
| sesame filled | ゴマ |
| sesame open | 白ゴマ |

記述例を以下のように書き換えることで、縦書き文章の横に圏点を表示させ、またその圏点の色を変更することができます。

<b>記述例: HTML</b>

```html
<!doctype html>
<html lang="ja">
<head>
<meta charset="utf-8">
<title> サンプル</title>
<link href="common/css/basic.css" rel="stylesheet" type="text/css">
</head>
<body>
<h1>本日の内容</h1>
<p>縦書きレイアウトのWebコンテンツ実践セミナーです。</p>
<p><ruby>日本語<rt>にほんご</rt></ruby>の<ruby>作文<rt>さくぶん</rt></ruby>です。</p>
<p><span class="underline">重要な箇所</span>は線を引きます。</p>
<p><span class="mark">重要な箇所</span>に圏点をつけます。</p>
</body>
</html>
```

<b>記述例: CSS</b>

```css
body{
  -webkit-writing-mode: vertical-rl; /* 実装済 */
  -moz-writing-mode: vertical-rl; /* 未実装 */
  -ms-writing-mode: tb-rl; /* 実装済 */
  writing-mode: vertical-rl;
  
  -webkit-text-orientation: upright; /* 実装済 */
  -moz-text-orientation: upright; /* 未実装 */
  -ms-text-orientation: upright; /* 未実装 */
  text-orientation: upright;
}

.combine{
  -webkit-text-combine: horizontal; /* 実装済 */
  -moz-text-combine-upright: all; /* 実装済(Firefox nightly 版) */
  -ms-text-combine-horizontal:all; /* 実装済 */
  text-combine-upright: all;
}

ruby{
  -webkit-ruby-position: over; /* 実装済 */
  -moz-ruby-position: over; /* 実装済 */
  -ms-ruby-position: over; /* 実装済 */
  ruby-position: over; /* 実装済 */
}

.underline{
  text-decoration: underline;
  -webkit-text-underline-position: right; /* 未実装 */
  -moz-text-underline-position: right; /* 未実装 */
  -ms-text-underline-position: right; /* 実装済 */
  text-underline-position: right;
}

.mark {
  -webkit-text-emphasis-style: dot filled; /* 実装済 */
  -moz-text-emphasis-style: dot filled; /* 未実装 */
  -ms-text-emphasis-style: dot filled; /* 未実装 */
  text-emphasis-style: dot filled;

  -webkit-text-emphasis-color: #ff0000; /* 実装済 */
  -moz-text-emphasis-color: #ff0000; /* 未実装 */
  -ms-text-emphasis-color: #ff0000; /* 未実装 */
  text-emphasis-color: #ff0000;
}
```

