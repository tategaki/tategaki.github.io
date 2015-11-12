---
layout: post
img: nil
category: Commentaries
title: CSS Text Decorationの仕様解説
description: 装飾線、圏点、影などの装飾を扱います
---

CSS2では、下線、上線、取り消し線のみが定義されていました。CSS3ではそれに加えて、テキストの色、スタイル、圏点、テキストの影の仕様などが追加されました。

この記事は、最新の Editor's Draft（2015年10月26日改訂）を解説したものです。

<small>参照URL: <https://drafts.csswg.org/css-text-decor-3/></small>

下線、上線、取り消し線
------------------

### 基本操作

`text-decoration` プロパティを利用すると、テキストに装飾線を表示させることができます。

例

```css
.underline   { text-decoration: underline; }
.overline    { text-decoration: overline; }
.linethrough { text-decoration: line-through; }
```

```html
<span class="underline">下に線をひく</span>
<span class="overline">上に線をひく</span>
<span class="linethrough">取り消し線をひく</span>
```

![text-decorationを利用した装飾線の表示例]({{ site.baseurl}}/examples/text-decoration/line-basic.png)

<small>※ 非推奨ですが、文字を点滅させるblinkも線種のひとつとして仕様に入っており、ブラウザは点滅の実装をしなくても良いとされています。</small>

### 装飾線の複数指定

装飾線は複数指定が可能です。

例

```css
.underline_linethrough { text-decoration: underline line-through; }
```

```html
<span class="underline_linethrough">下線と取り消し線を同時にひく</span>
```

![複数指定した装飾線の表示例]({{ site.baseurl}}/examples/text-decoration/line-multiple.png)

### 線の色とスタイル

仕様では、線種・線の色・線のスタイルをまとめてtext-decorationに指定できるとなっています。
主要ブラウザではFirefoxのみで実装されており、Internet Explorer、Edge、Chrome、Safariでの対応が待たれます。
線の色とスタイルを指定しない場合(できない場合)は、それぞれ初期値の「solid」と「currentColor」が適用されます。

例

```css
.underline_wavy     { text-decoration: underline wavy; }
.underline_wavy_red { text-decoration: underline wavy red; }
```

```html
<span class="underline_wavy">波線</span>
<span class="underline_wavy_red">赤い波線</span>
```

![赤い波線の表示例]({{ site.baseurl}}/examples/text-decoration/line-style.png)

なお、線種・線の色・線のスタイルは、それぞれ独立したプロパティで指定することもできます。
これも主要ブラウザではFirefoxのみで実装されています。

例

```css
.my_underline { text-decoration-line:  underline; }
.my_red       { text-decoration-color: red; }
.my_wavy      { text-decoration-style: wavy; }
```

```html
<span class="my_underline">下線</span>
<span class="my_underline my_red">赤い下線</span>
<span class="my_underline my_red my_wavy">赤い波線</span>
```

![線の種類、色、スタイルを独立したプロパティで指定した場合の表示例]({{ site.baseurl}}/examples/text-decoration/line-mystyle.png)

### 縦書きとの組み合せ

仕様上は、text-underline-position: right; を指定すると、縦書き時に右に線を引き、横書き時には下に線を引く、というように縦横で自動で切り替えられるとなっています。
また、under leftのように横書き用の指定と縦書き用の指定を並べておくと、縦横でその通りの位置に線を引く、となっています。
現状では、ブラウザ実装はまだ進められていないようで、横書き用にtext-decoration: underlineまたはoverlineを指定しておくと、縦書き時に左右どちらかに線が引かれるようです。
underline・overlineの線が左右どちらに表示されるかは、ブラウザによってバラつきがあり、仕様に従った実装が待たれるところです。

![Google Chromeの場合]({{ site.baseurl}}/examples/text-decoration/line-vertical-chrome.png)

![FireFoxの場合]({{ site.baseurl}}/examples/text-decoration/line-vertical-firefox.png)

![Internet Explorerの場合]({{ site.baseurl}}/examples/text-decoration/line-vertical-ie.png)

圏点
----

文字の脇に付ける強調のための点を、圏点といいます。
圏点は、主要ブラウザではChromeがベンダープレフィックス付きで対応しています。

### 基本操作

text-emphasisプロパティで、文字に圏点を付け、強調することができます。

例

```css
.filled {
  -webkit-text-emphasis: filled;
  text-emphasis: filled;
}
.sesame_open_red {
  -webkit-text-emphasis: sesame open red;
  text-emphasis: sesame open red;
}
```

```html
<span class="filled">普通の圏点を振る</span>
<span class="sesame_open_red">赤いゴマを振る</span>
```

![普通の圏点と赤いゴマ点の表示例]({{ site.baseurl}}/examples/text-decoration/text-emphasis-basic.png)

### 圏点のスタイル

text-emphasis-styleプロパティで、圏点のスタイルと塗りつぶしを指定できます。
既存のスタイルが5種類あります。

- dot: ドット
- circle: 丸
- double-circle: 二重丸
- triangle: 三角
- sesame: ゴマ

例

```css
.dot           { text-emphasis-style: dot; }
.circle        { text-emphasis-style: circle; }
.double-circle { text-emphasis-style: double-circle; }
.triangle      { text-emphasis-style: triangle; }
.sesame        { text-emphasis-style: sesame; }
```

```html
<div class="dot">ドット</div>
<div class="circle">丸</div>
<div class="double-circle">二重丸</div>
<div class="triangle">三角</div>
<div class="sesame">ゴマ</div>
```

![さまざまな圏点のスタイルの表示例]({{ site.baseurl}}/examples/text-decoration/text-emphasis-style.png)

また、任意の文字を指定できます。
その際は、単一の文字を指定します。複数の文字を指定しても、仕様ではブラウザが無視して良いとされています。

例

```css
.money { text-emphasis-style: '$'; }
```

```html
<span class="money">おかね</span>
```

![圏点に$を指定した場合の表示例]({{ site.baseurl}}/examples/text-decoration/text-emphasis-money.png)

### 白抜き指定

text-emphasis-style: open dot;のようにopenを指定すると、圏点の各記号は白抜きとなります。
デフォルトはfilledです。filledおよびopen以外の値が指定された場合は、filledが適用されます。

例

```css
.dot           { text-emphasis-style: open dot; }
.circle        { text-emphasis-style: open circle; }
.double-circle { text-emphasis-style: open double-circle; }
.triangle      { text-emphasis-style: open triangle; }
.sesame        { text-emphasis-style: open sesame; }
```

```html
<span class="dot">ドット</span>
<span class="circle">丸</span>
<span class="double-circle">二重丸</span>
<span class="triangle">三角</span>
<span class="sesame">ゴマ</span>
```

![圏点を白抜きにした場合の表示例]({{ site.baseurl}}/examples/text-decoration/text-emphasis-style-open.png)

### 圏点の色

text-emphasis-colorで圏点の色を指定可能です。

例

```css
.filled { text-emphasis: filled; }
.red { text-emphasis-color: red; }
```

```html
<span class="filled">普通の圏点</span>
<span class="filled red">赤い圏点</span>
```

![圏点に色を指定した場合の表示例]({{ site.baseurl}}/examples/text-decoration/text-emphasis-color.png)


### 圏点のスタイルをまとめて指定

塗りつぶし、点の種類、点の色は、text-emphasisの中でまとめて指定することができます。

例

```css
.open_sesame_red { text-emphasis: open sesame red; }
```

```html
<span class="open_sesame_red">赤いゴマ</span>
```

![圏点の塗りと種類と色をまとめて指定した場合の表示例]({{ site.baseurl}}/examples/text-decoration/text-emphasis-color2.png)

### 縦書きとの組み合せ

仕様では、text-emphasis-position: over right;のように縦用と横用の値を並べて書けることになっていますが、Chromeでは実装されていません。
Chromeでは、現状はoverを指定しておくと、横書き時は上に、縦書き時は右に表示されます。
また、スタイルを指定せずに塗りつぶしのみを指定した場合、横書きではcircleが、縦書きではsesameが適用されます。

例

```css
.filled { text-emphasis: filled; }
```

```html
<span class="filled">普通の圏点を振る</span>
```

![縦書きと圏点の表示位置]({{ site.baseurl}}/examples/text-decoration/text-emphasis-vertical.png)

影
----

text-shadowプロパティを指定すると、文字に影をつけることができます。

### 基本操作

値として、1番目に横方向のオフセット、2番目に縦方向のオフセットを指定します。
3番目にぼかし量(blur)、4番目に色を指定しますが、これらは省略可能です。
横と縦のオフセットを省略することはできません。

例

```css
.shadow  { text-shadow: 2px 2px 4px red; }
```

```html
<span class="shadow">文字に影をつける</span>
```

![文字に影をつけた表示例]({{ site.baseurl}}/examples/text-decoration/shadow.png)


### 複数の影

値は、カンマ区切りで複数指定することが可能です。
複数指定した場合、最初の影が一番上に表示されます。

例

```css
.shadows { text-shadow: 2px 2px 4px red,
                        4px 4px 8px blue; }
```

```html
<span class="shadows">複数の影をつける</span>
```

![文字に複数の影をつけた表示例]({{ site.baseurl}}/examples/text-decoration/shadows.png)
