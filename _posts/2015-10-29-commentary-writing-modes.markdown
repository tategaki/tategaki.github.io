---
layout: post
img: nil
category: Commentaries
title: CSS3 Writing Modesの仕様解説
description: |
---

Writing Modes
-------------

CSS2では、directionやunicode-bidiプロパティが定義され、横書きの複雑なレイアウトを行うアラビア語などの双方向言語(BIDI)まで扱えるようになっていた。

CSS3では、テキストの進行方向に関する仕様は「Writing Modesモジュール」にまとめられ、BIDIに加えて縦書きへの対応などが追加された。

行の進行方向、文字の進行方向、文字の向き、などの書字方向全般の仕様がWriting Modesモジュールで定義されている。

![Writing Modesモジュールで扱っている書字方向の概略図](/images/tategaki/writing-mode-3.png)

Writing Modesモジュールで扱っている書字方向の概略図


### 基本操作

日本語の縦書き対応について注目すべきは、既存の横書きのHTML文書に、CSS指定を1つ加えるだけで縦書きレイアウトとなるよう、仕様が考えられていることである。
具体的には、bodyに対してwriting-mode: vertical-rlを指定するだけで、右上起点の縦書きレイアウトとなる。

```css
body {
  writing-mode: vertical-rl;
}
```

実際にはベンダープレフィックスを付ける。

```css
body {
  -webkit-writing-mode: vertical-rl;
  -ms-writing-mode: tb-rl;
  writing-mode: vertical-rl;
}
```

<small>※ IE向けには-ms-writing-mode: tb-rlを使用する。歴史的に、IEは早期にこの値で縦書き対応していたため、値が異なる。</small>

![](/images/tategaki/writing-mode--horizontal-tb.png)

![](/images/tategaki/writing-mode--vertical-rl.png)

同一のHTMLから得られる2つの描画結果

上の2つの図は、bodyでwriting-mode: vertical-rlの指定があるかどうかが違う、同一のHTMLから得られている。
下記の点に注目されたい。

- ブロックの進行方向
- テーブルの行と列
- 行の進行方向
- 文字の向き

### ブロックの進行方向

横書きでは、`<h1>`、`<table>`、`<li>`などのブロックは、上から下に積まれるように進む。
writing-mode: vertical-rlを指定すると、右から左に積まれるようになり、縦書きレイアウトとして自然なブロック進行となる。
また、表中の「にする」のように自然改行が発生している場合に行が積まれる方向も、これに従う。

### テーブルの行と列

writing-modeを指定すると、HTMLのほとんどの要素が、回転する。
テーブルは、行と列の配置が入れ替わる。

テーブルの他にも、縦横で位置関係が変換される要素があり、例えば、ルビの位置も縦書きでは文字の横に付くようになる。
インデントも、横書きでは右に食い込ませるように働いていたものが、縦書きでは下に食い込ませるように働く。
例として、「↑Chrome 46で…」の箇所に4字のインデントを指定してある。横書きでは右に、縦書きでは下に食い込んでいる。

一方、画像などの埋め込み要素のように、回転の対象外となるものもある。
写真などがwriting-modeの変更によって天地の向きを変えると困るため、画像は回転しない仕様となっている。

### 行の進行方向

横書きでは、左から右に進行する。
縦書きでは、上から下に進行する。
行の進行方向は、アラビア語などのBIDI要素に関連する場合に必要な要素で、日本語の縦書きを扱う場合にはあまり意識することはない。
日本語の旧式の横書きのように、右から左へ進む横書きを実現するには、direction: rtlを指定し、さらにunicode-bidi: bidi-overrideを指定する。

例：
```css
.ja_rtl {
  direction: rtl;
  unicode-bidi: bidi-override;
}
```

```html
<p class="ja_rtl">東京駅ニテ列車ヲ待ツ</p>
```

![](/images/tategaki/tokyo-station-rtl.png)

### 文字の向き

文字の向きは、text-orientationプロパティーで指定する。
デフォルトはmixedで、英字は横倒し、日本語は正立、記号類はそれぞれ適切な向き、というように自動で配置される。
向きを指定したい場合は、uprightまたはsidewaysの指定が可能である。
uprightを指定すると、英字や数字を、日本語のように正立させて積む。
sidewaysを指定すると、mixedで自動で正立になるような記号を、欧文と一緒に横倒しにする。

例

```css
.mixed { text-orientation: mixed; }
```

```html
<span class="mixed">12月:師走(=December)</span>
```

```css
.upright { text-orientation: upright; }
```

```html
<span class="upright">UPRIGHT©2015</span>
```

```css
.sideways { text-orientation: sideways-right; }
```

```html
<span class="sideways">sideways © 2015</span>
```

mixedのときに各文字が置かれる方向は、Unicodeの付属文書「UTR#50」(<http://unicode.org/reports/tr50/>)を参考に決められている。
UTR#50でRの記号が振られている文字は横倒しとし、U・Tr・Tuの記号が振られている文字は原則的に正立(縦書きグリフがあれば使用する)という2分類となっている。

例

- 英数字や矢印(←→)はR。90度回転して横倒しにする。
- 漢字や仮名、米印(※)や郵便番号(〒)などの記号はU。正立する。
- 括弧、長音記号(ー)、波ダッシュ(〜)などはTr。フォントに縦書きグリフがあれば使い、無ければ90度回転して横倒しにする。
- 小書の仮名(ゃゅょっ)や句読点(、。)などはTu。フォントに縦書きグリフや縦書きメトリクスがあれば使い、無ければ正立する。



### 縦中横

マークアップした数字、記号、漢字などを縦書き中で横組みする。
1文字分の四角形として扱われ、幅は1文字分に圧縮される。
傍線などはその四角形に対して付けられ、中の複数の字のそれぞれに傍線が付くことはない。

例

```css
.tcy { text-combine-upright: all; }
```

```html
<span class="tcy">12</span>月
```


実際には、ベンダープレフィックスを付ける。
なお、仕様は頻繁に変更されるため、ブラウザごとに不統一がある。

```css
.tcy {
  -webkit-text-combine: horizontal;
  -ms-text-combine-horizontal: all;
  text-combine-upright: all;
}
```

縦中横の指定は、横書きのレイアウト時には、無視される。
上の図を見ると、横書きの図では数字部分が違和感ないレイアウトとなっている。

縦中横を文章に対して一括指定できる仕様がある。
広い範囲にtext-combine-upright: digit 2のような指定をしておくと、登場する数字を縦中横に組む。
2桁〜4桁の数字を指定することができる。
実装は現状ではMicrosoftのInternet Explorer 11およびEdgeで、以下のようにベンダープレフィックス付きで使用する。

例

```css
.tcy_2 {
  -ms-text-combine-horizontal: digits 2;
  text-combine-upright: digits 2;
}
```

```html
<p class="tcy_2">「8月、10月、12月」</p>
```

![](/images/tategaki/writing-mode--horizontal-tb-ie.png)


### 用語の再定義

left、right、height、widthは、物理方向を指す。
writing-modeを切り替えても、縦横が入れ替わらず、常に画面に向かってのサイズを示す。
writing-modeの変更に応じて指す方向を変えたい場合には、下記のような論理方向を指すプロパティーを使用する。

- inline-sizeまたはlogical-width：文字列の長さの方向を指す。つまり縦書きでは縦方向。
- block-sizeまたはlogical-height：行の幅の方向を指す。つまり縦書きでは横方向。

なお、line-heightのように、"height"が含まれているものの、縦書きのときは行の横方向の幅を指すように縦横変換されるプロパティーもある。
適切に論理方向を指すプロパティーでサイズ指定してあるHTML文書は、レイアウトを損うことなく、writing-modeの指定の変更だけで縦書き・横書きどちらでも対応する。