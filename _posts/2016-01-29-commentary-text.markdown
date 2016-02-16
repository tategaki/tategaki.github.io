---
layout: post
img: nil
category: commentaries
title: CSS Textの仕様解説
description: 行や文字に関する処理を扱います
---


このモジュールの概要
-----------------
CSS3 Textモジュールでは、改行、均等割り付けや寄せ、スペースの扱い、文字種変換などを扱います。なおこの記事は W3C Last Call Working Draft 10 October 2013 の仕様をもとに解説しています。

参照URL: <https://www.w3.org/TR/2013/WD-css-text-3-20131010/>


## `text-transform` プロパティ

文字種変換を行います。transformと書いてありますが、斜めにしたり遠近効果を付けることではありません。大文字・小文字の変換や、全角への変換などです。英語以外にも、フランス語のœや、ドイツ語のü、ロシア語なども対応しています。値には次の5種類があります。

| 値 | 説明 |
| --- | --- |
| `none` | 文字を記述した通りに表示します。これが初期値になるので、何も指定がなければ`none`になります。 |
| `capitalize` | 単語の先頭文字を大文字で表示します。先頭の文字というのは文字通りで、このプロパティを指定した箇所のスペースで区切られた単語の一番最初の文字です。|
| `uppercase` | 全ての文字を大文字で表示します。 |
| `lowercase` | 全ての文字を小文字で表示します。 |
| `full-width` | 全ての文字を全角で表示します。全角の形式に対応していない文字は変更されません。<br/> <small>※ `full-width`は現在Firefoxでのみ対応済みです。(2016年1月5日時点)</small>|

<b>記述例: CSS</b>

~~~
.trans-none { text-transform:none; }
.trans-capitalize { text-transform:capitalize; }
.trans-uppercase { text-transform:uppercase; }
.trans-lowercase { text-transform:lowercase; }
.trans-full-width { text-transform:full-width; }
~~~
{: .language-css}

<b>記述例: HTML</b>

~~~
<span class="trans-none">Copa del Rey</span>
<span class="trans-capitalize">Copa del Rey</span>
<span class="trans-uppercase">Copa del Rey</span>
<span class="trans-lowercase">Copa del Rey</span>
<span class="trans-full-width">Copa del Rey</span>
~~~
{: .language-html}

<b>表示例</b>

![text-transformの表示例]({{ site.baseurl}}/examples/text/text-transform.png)


## `white-space` プロパティ

このプロパティは、次の2つのことを制御します。

* 空白の圧縮方法
* どこで改行してよいか

空白の圧縮方法は、主に英語のような空白で単語を区切る言語を想定している仕様です。日本語で意識するとしたら、長い英語を引用する箇所や、プログラムのソースコードを引用するなどの箇所でしょう。また、日本語のテキストでは、従来テキスト中に改行が入ると半角スペースが入ってしまっていたのですが、CSS Text Level 3で改善されて、改行を入れて書いても余計な空白が入らなくなりました。値には次の5種類があります。

| 値 | 説明 |
| --- | --- |
| `normal` | 自動改行します。連続する半角スペース・タブ・改行を、1つの半角スペースとして表示します。空白は、連続する場合に折り畳まれて1つになります。これが初期値になるので、何も指定がなければ`normal`になります。|
| `pre` | 自動改行しません。連続する半角スペース・タブ・改行を、そのまま表示します。 |
| `nowrap` | 自動改行しません。連続する半角スペース・タブ・改行を、1つの半角スペースとして表示します。ボックスの大きさが指定されている場合にも、自動改行はされません。 |
| `pre-wrap` | 自動改行します。連続する半角スペース・タブ・改行を、そのまま表示します。|
| `pre-line` | 自動改行します。連続する半角スペース・タブ・改行を、1つの半角スペースとして表示します。ただし改行はそのまま表示します。 |

<b>記述例: CSS</b>

~~~
.space-normal { white-space:normal; width:400px; background-color:#90ee90; }
.space-pre { white-space:pre; width:400px; background-color:#90ee90; }
.space-nowrap { white-space:nowrap; width:400px; background-color:#90ee90; }
.space-pre-wrap { white-space:pre-wrap; width:400px; background-color:#90ee90; }
.space-pre-line { white-space:pre-line; width:400px; background-color:#90ee90; }
~~~
{: .language-css}

<b>記述例: HTML</b>

~~~
<div class="space-normal">
  I   don’t   dream   at   night,
  I   dream   all   day;   I   dream   for   a   living.
</div>
<div class="space-pre">
  I   don’t   dream   at   night,
  I   dream   all   day;   I   dream   for   a   living.
</div>
<div class="space-nowrap">
  I   don’t   dream   at   night,
  I   dream   all   day;   I   dream   for   a   living.
</div>
<div class="space-pre-wrap">
  I   don’t   dream   at   night,
  I   dream   all   day;   I   dream   for   a   living.
</div>
<div class="space-pre-line">
  I   don’t   dream   at   night,
  I   dream   all   day;   I   dream   for   a   living.
</div>
~~~
{: .language-html}

<b>表示例</b>

![white-spaceプロパティの表示例]({{ site.baseurl}}/examples/text/white-space.png)


## `word-break` プロパティ

このプロパティは、表示範囲に合わせて改行するか、単語の切れ目で改行するかなど、文中の改行の仕方を制御します。似た役割を持つプロパティに、単語の途中での改行方法を指定する `overflow-wrap`（`word-wrap`） があります。こちらは長い英単語やURLなどが、テーブルのセル内などの狭い領域から溢れてしまうような場合に、途中での改行を許して領域内に収めるために使います。`word-wrap`は`overflow-wrap`の古い名称で、後方互換性のために残されています。`word-break`の値には次の5種類があります。

| 値 | 説明 |
| --- | --- |
| `normal` | 一般的な規則で改行します。英文では単語の間、和文・漢文などではどの文字の間でも自動改行されます。|
| `keep-all` | 英文、和文に関わらず、空白のある箇所で自動改行されます。 |
| `break-all` | 英文、和文に関わらず空白のある箇所で、英単語などの途中でも自動改行されます。|


<b>記述例: CSS</b>

~~~
.wbreak-normal { word-break:normal; width:150px; background-color:#90ee90; }
.wbreak-keep-all { word-break:keep-all; width:150px; background-color:#90ee90; }
.wbreak-break-all { word-break:break-all width:150px; background-color:#90ee90; }
~~~
{: .language-css}

<b>記述例: HTML</b>

~~~
<div class="wbreak-normal">
    He who runs after two hares will catch neither.
    二兎を追う者は、　一兎をも得ず
</div>
<div class="wbreak-keep-all">
    He who runs after two hares will catch neither.
    二兎を追う者は、　一兎をも得ず
</div>
<div class="wbreak-break-all">
    He who runs after two hares will catch neither.
    二兎を追う者は、　一兎をも得ず
</div>
~~~
{: .language-html}

<b>表示例</b>

![word-breakプロパティの表示例]({{ site.baseurl}}/examples/text/word-break.png)



## `line-break` プロパティ

このプロパティは、禁則処理の適用のさせ方を制御します。禁則処理とは、文章の読みやすさや綺麗さの点から、行頭または行末が句読点や括弧などにならないようにする処理です。値には次の4種類があります。

| 値 | 説明 |
| --- | --- |
| `auto` | 禁則処理の程度が自動的に適用されます。どのように禁則処理の強い弱いを適用するかは、ブラウザに任せられます。制作者側で調整したい場合は、後述の`loose`や`strict`を使います|
| `loose` | 最低限の禁則処理だけが適用されます。新聞のような幅の狭いカラムでは、たくさん禁則すると行末が揃わず、見栄えが悪くなるため、このような場合には`loose`を指定しておきましょう。|
| `normal` | 通常の日本語文章の規則通り、「。」や「、」や「()」などが禁則処理されます。これが初期値になるので、何も指定がなければ`normal`になります。|
| `strict` | 通常の禁則処理に加えて、「っ」や「ゃ」などの小文字も禁則処理されます。|


## `text-align` プロパティ

このプロパティは、文章の行揃えの位置や、均等割付を指定する際に使用します。
文章の見栄えを左右する重要なプロパティです。値には次の7種類があります。

| 値 | 説明 |
| --- | --- |
| `start` | 文章を行頭側に寄せます。通常は左寄せになりますが、アラビア語など右から左に記述する言語では右寄せになります。 |
| `end` | 文章を行末側に寄せます。通常は右寄せになりますが、アラビア語など右から左に記述する言語では左寄せになります。|
| `left` | 文章を左側に寄せます。 |
| `right` | 文章を右側に寄せます。|
| `center` | 文章を表示領域の中央に揃えます。|
| `justify` | 文章が均等割付され、行頭と行末が揃います。特に英文では単語の区切りで改行が入るため、行末が綺麗に揃わない場合がありますが、`justify`を指定しておくと綺麗に揃えることができます。|
| match-parent | 親要素の属性を継承し、適用されます。ただし、`start`と`end`は、親要素の文章方向（direction）が継承されないので、注意が必要です。|

また、テキストのレイアウトやブロックの流れる方向を指定できる`writng-mode`プロパティで、`vertical`(縦書き)を指定した時は、指定された範囲内での方向関係が右に90°回転するので、`left`と`right`は次のようになります。

- `left` 文章を上側に寄せます。
- `right` 文章を下側に寄せます。

<!-- ![]({{ site.baseurl}}/examples/text/vertical-example.png) -->

<b>記述例: CSS</b>

~~~
.align-start { text-align:start; width:200px; background-color:#90ee90; }
.align-end { text-align:end; width:200px; background-color:#90ee90; }
.align-left { text-align:left; width:200px; background-color:#90ee90; }
.align-right { text-align:right; width:200px; background-color:#90ee90; }
.align-center { text-align:center; width:200px; background-color:#90ee90; }
.align-justify { text-align:justify; width:200px; background-color:#90ee90; }
.align-match-parent { text-align:match-parent; width:200px; background-color:#90ee90; }
~~~
{: .language-css}


<b>記述例: HTML</b>

~~~
<div class="align-start float-left">
    スタイルシートはひとつひとつのプロパティを扱うのはとても簡単ですが、
    多くのプロパティを知って理解し、html全体として最適なプロパティを各所に指定していくのは、
    意外と難しいものです。 <br>
    Style sheet is very easy to use with each single property.
    But, To surprisingly it is difficult to understand so many properties
    and to place the property correctly in each DOM.
</div>
<div class="align-end float-left">
    スタイルシートはひとつひとつのプロパティを扱うのはとても簡単ですが、
    多くのプロパティを知って理解し、html全体として最適なプロパティを各所に指定していくのは、
    意外と難しいものです。 <br>
    Style sheet is very easy to use with each single property.
    But, To surprisingly it is difficult to understand so many properties
    and to place the property correctly in each DOM.
</div>
<div class="align-left float-left">
    スタイルシートはひとつひとつのプロパティを扱うのはとても簡単ですが、
    多くのプロパティを知って理解し、html全体として最適なプロパティを各所に指定していくのは、
    意外と難しいものです。 <br>
    Style sheet is very easy to use with each single property.
    But, To surprisingly it is difficult to understand so many properties
    and to place the property correctly in each DOM.
</div>
<div class="align-right float-left">
    スタイルシートはひとつひとつのプロパティを扱うのはとても簡単ですが、
    多くのプロパティを知って理解し、html全体として最適なプロパティを各所に指定していくのは、
    意外と難しいものです。 <br>
    Style sheet is very easy to use with each single property.
    But, To surprisingly it is difficult to understand so many properties
    and to place the property correctly in each DOM.
</div>
<div class="align-center float-left">
    スタイルシートはひとつひとつのプロパティを扱うのはとても簡単ですが、
    多くのプロパティを知って理解し、html全体として最適なプロパティを各所に指定していくのは、
    意外と難しいものです。 <br>
    Style sheet is very easy to use with each single property.
    But, To surprisingly it is difficult to understand so many properties
    and to place the property correctly in each DOM.
</div>
<div class="align-justify float-left">
    スタイルシートはひとつひとつのプロパティを扱うのはとても簡単ですが、
    多くのプロパティを知って理解し、html全体として最適なプロパティを各所に指定していくのは、
    意外と難しいものです。 <br>
    Style sheet is very easy to use with each single property.
    But, To surprisingly it is difficult to understand so many properties
    and to place the property correctly in each DOM.
</div>
<div class="align-match-parent float-left">
    スタイルシートはひとつひとつのプロパティを扱うのはとても簡単ですが、
    多くのプロパティを知って理解し、html全体として最適なプロパティを各所に指定していくのは、
    意外と難しいものです。 <br>
    Style sheet is very easy to use with each single property.
    But, To surprisingly it is difficult to understand so many properties
    and to place the property correctly in each DOM.
</div>
~~~
{: .language-html}

<b>表示例</b>

![text-alignプロパティの表示例]({{ site.baseurl}}/examples/text/text-align.png)
