/*
 * シナリオデータ。
 * 文章・背景・時刻・フラグをコード本体から分離しています。
 * 後から章ごとのJSON化や分岐管理へ拡張できます。
 */

export const scenario = [
  {
    chapter: "世界設定",
    time: "――",
    background: "world",
    speaker: "ナレーション",
    text:
      "この世界の地球――一次球は、太陽系のような単純な回転軌道を持たない。メビウスの輪を思わせる特殊な回転軸によって運行している。"
  },
  {
    chapter: "世界設定",
    time: "――",
    background: "world",
    speaker: "ナレーション",
    text:
      "そのメビウス構造の中心部には、非現実的なほど長い寿命を持つマグネターが存在する。そして一次球の近くを周期する、もう一つの地球がある。"
  },
  {
    chapter: "世界設定",
    time: "――",
    background: "world",
    speaker: "ナレーション",
    text:
      "もう一つの地球は『似成球（にせいきゅう）』と呼ばれている。一次球と似た環境を持ちながら、そこには顔や瞳に謎の模様を浮かべる住人――エレメンターが存在する。"
  },
  {
    chapter: "世界設定",
    time: "――",
    background: "world",
    speaker: "ナレーション",
    text:
      "一次球の人間には見えない魂。しかしエレメンターは魂を具現化し、それを質量として扱うことができる。模様の違いは、彼らが持つさまざまな力――『エレメント』の違いを示している。"
  },
  {
    chapter: "第一章　夏期休暇二日前",
    time: "07:10",
    background: "academy",
    speaker: "ナレーション",
    text:
      "マルケサス（ムー大陸）。超難関校、UN・リスクトリア・アカデミー。高部二年生のリース・レイデンは、いつもの朝を迎えていた。"
  },
  {
    chapter: "第一章　夏期休暇二日前",
    time: "07:12",
    background: "academy",
    speaker: "リース",
    text:
      "……今日も普通の日、か。"
  },
  {
    chapter: "第一章　夏期休暇二日前",
    time: "07:15",
    background: "news",
    speaker: "ニュースキャスター",
    text:
      "続いて臨時ニュースです。西マルケサス上空から、形状が異常に整った物体が落下しました。専門家は、似成球由来の人工衛星である可能性を指摘しています。"
  },
  {
    chapter: "第一章　夏期休暇二日前",
    time: "07:16",
    background: "news",
    speaker: "リース",
    text:
      "似成球の人工衛星……？　落ちてきたってことは、何か壊れたのか？"
  },
  {
    chapter: "第一章　夏期休暇前日",
    time: "19:31",
    background: "street",
    speaker: "ナレーション",
    text:
      "翌日。アカデミーの平均帰宅時間は19時30分。リースは人通りの少ない帰路を一人で歩いていた。"
  },
  {
    chapter: "第一章　夏期休暇前日",
    time: "19:34",
    background: "street",
    speaker: "リース",
    text:
      "……ん？　誰かいる？"
  },
  {
    chapter: "第一章　夏期休暇前日",
    time: "19:34",
    background: "street",
    speaker: "ナレーション",
    text:
      "人影が見えた。だが、次の瞬間――何も見えない。なのに、強烈な衝撃がリースを吹き飛ばした。"
  },
  {
    chapter: "第一章　夏期休暇前日",
    time: "19:35",
    background: "street",
    speaker: "リース",
    text:
      "ぐっ……！　今の、何だ……！"
  },
  {
    chapter: "第一章　夏期休暇前日",
    time: "19:35",
    background: "street",
    speaker: "ナレーション",
    text:
      "幼い頃から異常なほど運動能力に恵まれていたリースは、とっさに受け身を取り、大きな怪我を免れた。しかしダメージは重い。"
  },
  {
    chapter: "第一章　夏期休暇前日",
    time: "19:36",
    background: "street",
    speaker: "ナレーション",
    text:
      "街灯が人影を照らす。そこにいたのは、一見すれば普通の人間だった。だが顔にはタトゥーのような紋様。そして右目には、ターゲットスコープを思わせる模様。",
    sprites: [
      { id: "elementer", name: "エレメンター", position: "right", action: "enter", anim: "slideInRight" }
    ]
  },
  {
    chapter: "第一章　夏期休暇前日",
    time: "19:36",
    background: "street",
    speaker: "リース",
    text:
      "……エレメンター。"
  },
  {
    chapter: "第一章　夏期休暇前日",
    time: "19:37",
    background: "street",
    speaker: "ナレーション",
    text:
      "衛星科で習った似成球の知識が、頭の中を駆け巡る。先日の人工衛星らしき落下物。もし、そこからこの存在が出てきたのだとしたら――。"
  },
  {
    chapter: "第一章　夏期休暇前日",
    time: "19:37",
    background: "street",
    speaker: "ナレーション",
    text:
      "敵のエレメントは『慧眼』。魂の形を見て対象を一つに絞り、その存在を見通す力。隠れることはできない。体勢、体温、表情まで把握される。"
  },
  {
    chapter: "第一章　夏期休暇前日",
    time: "19:38",
    background: "street",
    speaker: "リース",
    text:
      "……逃げるしかない。人間の俺が、エレメンターに勝てるわけがない。"
  },
  {
    chapter: "第一章　夏期休暇前日",
    time: "19:39",
    background: "street",
    speaker: "ナレーション",
    text:
      "しかし、逃走はあっけなく終わった。リースは捕らえられ、死の気配がすぐそこまで迫る。"
  },
  {
    chapter: "第一章　夏期休暇前日",
    time: "19:39",
    background: "street",
    speaker: "リース",
    text:
      "……これ、だけでも……！"
  },
  {
    chapter: "第一章　夏期休暇前日",
    time: "19:39",
    background: "street",
    speaker: "ナレーション",
    text:
      "リースの手にあったのは、常備していた懐中電灯。帰路が暗いことを知っていたから持ち歩いていたものだ。"
  },
  {
    chapter: "第一章　夏期休暇前日",
    time: "19:39",
    background: "street",
    speaker: "ナレーション",
    text:
      "偶然にも強い光がエレメンターの右目を直撃する。"
  },
  {
    chapter: "第一章　夏期休暇前日",
    time: "19:39",
    background: "street",
    speaker: "エレメンター",
    text:
      "――ッ……！"
  },
  {
    chapter: "第一章　夏期休暇前日",
    time: "19:40",
    background: "street",
    speaker: "リース",
    text:
      "今だ……！"
  },
  {
    chapter: "第一章　夏期休暇前日",
    time: "19:40",
    background: "street",
    speaker: "ナレーション",
    text:
      "逃げようとした。だが、足がもつれて転ぶ。もう駄目だ――そう思った瞬間、幼い頃の記憶が蘇った。"
  },
  {
    chapter: "第一章　夏期休暇前日",
    time: "――",
    background: "memory",
    speaker: "母",
    text:
      "リース。もし、とんでもない危機が来たらね。いいおまじないがあるの。"
  },
  {
    chapter: "第一章　夏期休暇前日",
    time: "――",
    background: "memory",
    speaker: "母",
    text:
      "『インペリー・オン』。頭の片隅に、ちゃんとしまっておくのよ。"
  },
  {
    chapter: "第一章　夏期休暇前日",
    time: "19:40",
    background: "awakening",
    speaker: "リース",
    text:
      "……インペリー・オン。"
  },
  {
    chapter: "第一章　夏期休暇前日",
    time: "19:40",
    background: "awakening",
    speaker: "ナレーション",
    text:
      "強く願った。助かりたい。生きたい。エマを残して、こんなところで終わりたくない。"
  },
  {
    chapter: "第一章　夏期休暇前日",
    time: "19:40",
    background: "awakening",
    speaker: "ナレーション",
    text:
      "その瞬間、リースの肩にエレメンターとよく似た紋様が浮かび上がった。そして瞳には、十字の模様が刻まれる。"
  },
  {
    chapter: "第一章　夏期休暇前日",
    time: "19:40",
    background: "awakening",
    speaker: "エレメンター",
    text:
      "……何、だ……それは……。"
  },
  {
    chapter: "第一章　夏期休暇前日",
    time: "19:40",
    background: "battle",
    speaker: "ナレーション",
    text:
      "リースは悟った。今なら、反撃できる。"
  },
  {
    chapter: "第一章　夏期休暇前日",
    time: "19:40",
    background: "battle",
    speaker: "リース",
    text:
      "うおおおおおっ！"
  },
  {
    chapter: "第一章　夏期休暇前日",
    time: "19:40",
    background: "battle",
    speaker: "ナレーション",
    text:
      "次の瞬間、リースはエレメンターへ突進した。その速度は、F1カーの速度を優に超えていた――。"
  },
  {
    chapter: "第一章　夏期休暇前日",
    time: "19:41",
    background: "battle",
    speaker: "ナレーション",
    text:
      "エレメンターは息絶えた。すると顔の紋様が消え、そこには普通の人間のような姿だけが残った。",
    sprites: [
      { id: "elementer", action: "exit", anim: "fadeOut" }
    ]
  },
  {
    chapter: "第一章　夏期休暇前日",
    time: "19:43",
    background: "street",
    speaker: "リース",
    text:
      "……帰らないと。"
  },
  {
    chapter: "第一章　夏期休暇前日",
    time: "20:02",
    background: "home",
    speaker: "エマ",
    text:
      "お兄ちゃん！　遅かったから、心配したんだよ！",
    sprites: [
      { id: "emma", name: "エマ", position: "left", action: "enter", anim: "slideInLeft" }
    ]
  },
  {
    chapter: "第一章　夏期休暇前日",
    time: "20:03",
    background: "home",
    speaker: "リース",
    text:
      "ごめん、エマ。もう大丈夫だから。"
  },
  {
    chapter: "第一章　夏期休暇前日",
    time: "22:31",
    background: "room",
    speaker: "ナレーション",
    text:
      "エマを安心させ、眠りについた。家に帰った頃には、肩の紋様も瞳の模様も消えていた。",
    sprites: [
      { id: "emma", action: "exit", anim: "fadeOut" }
    ]
  },
  {
    chapter: "第一章　夏期休暇前日",
    time: "22:32",
    background: "room",
    speaker: "リース",
    text:
      "……いったい、何が起こったんだ。"
  },
  {
    chapter: "第一章　夏期休暇前日",
    time: "22:33",
    background: "room",
    speaker: "ナレーション",
    text:
      "そして、夏期休暇が始まる。リースの知らないところで、一次球と似成球をつなぐ何かが、すでに動き始めていた。"
  },

  // ── 分岐ポイント ──────────────────────────────────────────
  // 「電気を消す」→ 日常エンド（このルートの終わり）
  // 「電気を消さない」→ 第二章（アリー登場）へ続く
  {
    chapter: "第一章　夏期休暇前日",
    time: "22:40",
    background: "room",
    speaker: "ナレーション",
    text:
      "ベッドに入ったリースは、明かりを消すかどうか少し迷った。今日はいろいろありすぎた。まだ気持ちが落ち着かない。",
    choices: [
      { label: "電気を消して眠る", next: "end-daily-1" },
      { label: "電気はつけたままにしておく", next: "ch2-start" }
    ]
  },

  // ── 日常エンド ────────────────────────────────────────────
  {
    id: "end-daily-1",
    chapter: "第一章　夏期休暇前日",
    time: "22:41",
    background: "room",
    speaker: "リース",
    text:
      "……今日はいろいろあったな。でも、明日からはいつも通りの夏休みだ。"
  },
  {
    chapter: "第一章　夏期休暇前日",
    time: "22:42",
    background: "room",
    speaker: "ナレーション",
    text:
      "電気を消すと、部屋はすぐに静けさに包まれた。今日という日の出来事は、まるで夢だったかのように、静かに眠りの中へ溶けていく。"
  },
  {
    ending: true,
    chapter: "日常エンド",
    time: "――",
    background: "room",
    speaker: "END ―― 日常エンド",
    text:
      "いつも通りの朝が来て、いつも通りの夏休みが始まる。少女の記憶も、紋様の記憶も確かめる術がないまま――リースの平穏な日常は、静かに続いていく。\n\n（このルートはここで終わりです）"
  },

  // ── 第二章　姉弟の対面 ───────────────────────────────────
  {
    id: "ch2-start",
    chapter: "第二章　姉弟の対面",
    time: "03:00",
    background: "room",
    speaker: "ナレーション",
    text:
      "電気をつけたまま、リースはいつの間にか眠ってしまっていた。朝の6時に起きるつもりだったのに、目が覚めたのは午前3時。"
  },
  {
    chapter: "第二章　姉弟の対面",
    time: "03:01",
    background: "room",
    speaker: "ナレーション",
    text:
      "メビウス状の回転軸を持つこの星では、この時刻でもすでに日が上っている。だが、そんなことはどうでもよかった。"
  },
  {
    chapter: "第二章　姉弟の対面",
    time: "03:02",
    background: "room",
    speaker: "ナレーション",
    text:
      "窓の縁に、見覚えのない少女が座っていた。年齢は自分と同じくらいだろうか。静かに、リースを見下ろしている。",
    sprites: [
      { id: "ally", name: "アリー", position: "right", action: "enter", anim: "fadeIn" }
    ]
  },
  {
    chapter: "第二章　姉弟の対面",
    time: "03:02",
    background: "room",
    speaker: "リース",
    text:
      "……夢、か……？"
  },
  {
    chapter: "第二章　姉弟の対面",
    time: "03:03",
    background: "room",
    speaker: "ナレーション",
    text:
      "飛び起きた。だが、これは夢ではない。何より、彼女からは昨日戦ったエレメンターと同じ気配がする。"
  },
  {
    chapter: "第二章　姉弟の対面",
    time: "03:04",
    background: "awakening",
    speaker: "リース",
    text:
      "……インペリー・オン。"
  },
  {
    chapter: "第二章　姉弟の対面",
    time: "03:04",
    background: "awakening",
    speaker: "ナレーション",
    text:
      "再び唱えると、肩と瞳に紋様が浮かび上がる。すると――少女の姿にも、変化が起きた。",
    sprites: [
      { id: "ally", effect: "glow" }
    ]
  },
  {
    chapter: "第二章　姉弟の対面",
    time: "03:04",
    background: "awakening",
    speaker: "ナレーション",
    text:
      "バラを思わせる模様が顎から鎖骨にかけて浮かび上がり、左目には五芒星の紋様が刻まれる。"
  },
  {
    chapter: "第二章　姉弟の対面",
    time: "03:05",
    background: "awakening",
    speaker: "アリー",
    text:
      "アガルタ――あなたたちが似成球と呼ぶ星にある、とある国の第二皇女。アーグリヌ・ペトゥシュワ・ドルハダス。愛称でアリーと呼んで。"
  },
  {
    chapter: "第二章　姉弟の対面",
    time: "03:05",
    background: "room",
    speaker: "ナレーション",
    text:
      "彼女もまた人型のエレメンター、それも中位種であるという。"
  },
  {
    chapter: "第二章　姉弟の対面",
    time: "03:06",
    background: "room",
    speaker: "リース",
    text:
      "……昨日の、あれは何だったんだ？"
  },
  {
    chapter: "第二章　姉弟の対面",
    time: "03:07",
    background: "room",
    speaker: "アリー",
    text:
      "あれは、エレメンターの超上位種――カバラの『マルクト』。初代最新型の一体が、城の一部をこちらの一次球へ吹き飛ばしたの。あなたが倒したのは、そこから放り出された中位のエレメンターよ。"
  },
  {
    chapter: "第二章　姉弟の対面",
    time: "03:08",
    background: "room",
    speaker: "アリー",
    text:
      "インペリー・オンは、中位種の力を解き放つ呪文。紋様を発生させて、力を強化する。下位種だと、力をただ垂れ流すだけになってしまうけれど。"
  },
  {
    chapter: "第二章　姉弟の対面",
    time: "03:09",
    background: "room",
    speaker: "アリー",
    text:
      "そもそも、エレメンターは大きく五つに分けられるの。人型、初代型、辰十字型、完望型、異形型。"
  },
  {
    chapter: "第二章　姉弟の対面",
    time: "03:09",
    background: "room",
    speaker: "アリー",
    text:
      "人型以外の四種には、それぞれ『有光魂』と『無光魂』の別があって、種類も相当な数にのぼる。ここが、少しややこしいところね。"
  },
  {
    chapter: "第二章　姉弟の対面",
    time: "03:10",
    background: "room",
    speaker: "リース",
    text:
      "……ちょっと待ってくれ、頭が追いつかない。"
  },
  {
    chapter: "第二章　姉弟の対面",
    time: "03:10",
    background: "room",
    speaker: "アリー",
    text:
      "ふふ、無理もないわ。おいおい覚えていけばいい。"
  },
  {
    chapter: "第二章　姉弟の対面",
    time: "03:11",
    background: "room",
    speaker: "ナレーション",
    text:
      "アリーはもちろん人型。そして彼女の母の名は「ルミ」――幼くして亡くした、リースの母と同じ名前だった。"
  },
  {
    chapter: "第二章　姉弟の対面",
    time: "03:11",
    background: "room",
    speaker: "リース",
    text:
      "……ルミ？　それ、俺の……"
  },
  {
    chapter: "第二章　姉弟の対面",
    time: "03:12",
    background: "room",
    speaker: "アリー",
    text:
      "ええ。私の理解が正しければ――あなたは、私の弟ということになるわね。"
  },
  {
    chapter: "第二章　姉弟の対面",
    time: "03:12",
    background: "room",
    speaker: "ナレーション",
    text:
      "アリーは少なくとも41年を生きているという。エレメンターの寿命は、人間の常識からは大きく外れているらしい。"
  },
  {
    chapter: "第二章　姉弟の対面",
    time: "03:13",
    background: "room",
    speaker: "ナレーション",
    text:
      "アリーの母は、彼女が22歳のときに行方が分からなくなった。リースの生まれた時期を考え合わせると――二人の母は同一人物。父親は違うが、同じ腹から生まれた、正真正銘の姉弟ということになる。"
  },
  {
    chapter: "第二章　姉弟の対面",
    time: "03:14",
    background: "room",
    speaker: "ナレーション",
    text:
      "血のつながりを知った瞬間、リースはアリーに抱きついた。"
  },
  {
    chapter: "第二章　姉弟の対面",
    time: "03:14",
    background: "room",
    speaker: "ナレーション",
    text:
      "ずっと、誰かに甘えたかったのだ。母を亡くしてから、父はどこかへ行ったきり帰ってこない。ひとりで抱え続けてきた感情が、堰を切ったように溢れ出した。"
  },
  {
    chapter: "第二章　姉弟の対面",
    time: "03:15",
    background: "room",
    speaker: "ナレーション",
    text:
      "だが勢いあまってアリーは体勢を崩し、気づけばリースが押し倒しているような格好になっていた。"
  },
  {
    chapter: "第二章　姉弟の対面",
    time: "03:15",
    background: "room",
    speaker: "ナレーション",
    text:
      "ちょうどそこへ、リースを起こしに来たエマが部屋に入ってくる。",
    sprites: [
      { id: "emma", name: "エマ", position: "left", action: "enter", anim: "slideInLeft" }
    ]
  },
  {
    chapter: "第二章　姉弟の対面",
    time: "03:15",
    background: "room",
    speaker: "エマ",
    text:
      "お兄ちゃん、そろそろ起き……",
    sprites: [
      { id: "emma", effect: "shake" }
    ]
  },
  {
    chapter: "第二章　姉弟の対面",
    time: "03:16",
    background: "room",
    speaker: "ナレーション",
    text:
      "言葉が途中で止まる。エマはその体勢を見て、ゆっくりとドアを閉めた。",
    sprites: [
      { id: "emma", action: "exit", anim: "slideOutLeft" }
    ]
  },
  {
    chapter: "第二章　姉弟の対面",
    time: "03:16",
    background: "room",
    speaker: "リース",
    text:
      "い、いや待って、待ってエマ……！？"
  },
  {
    chapter: "第二章　姉弟の対面",
    time: "03:20",
    background: "room",
    speaker: "ナレーション",
    text:
      "慌ててエマを追いかけ、なんとか誤解を解いた。似成球から来た姉だなんて説明できるはずもなく、結局は「居候している同級生」ということで押し通した。"
  },
  {
    chapter: "第二章　姉弟の対面",
    time: "03:22",
    background: "room",
    speaker: "ナレーション",
    text:
      "問題は、アガルタの皇女がこんな場所にいてはいけないということだった。似成球へ戻る方法自体はあるらしいが、エマをどうするかも考えなければならない。"
  },
  {
    chapter: "第二章　姉弟の対面",
    time: "03:23",
    background: "room",
    speaker: "アリー",
    text:
      "幸い、アカデミーはちょうど夏期休暇に入ったところなのよね？"
  },
  {
    chapter: "第二章　姉弟の対面",
    time: "03:23",
    background: "room",
    speaker: "リース",
    text:
      "ああ。だから、しばらくは誤魔化せる……と思う。"
  },
  {
    chapter: "第二章　姉弟の対面",
    time: "03:24",
    background: "room",
    speaker: "ナレーション",
    text:
      "エマの扱いも含め、この状況を託せる相手は一人しかいない。もっとも信頼できる教授――葛城愛莉（かつらぎ あいり）。"
  },
  {
    chapter: "第二章　姉弟の対面",
    time: "03:25",
    background: "room",
    speaker: "ナレーション",
    text:
      "実のところ、これまでの生活資金は、彼女の助力によって成り立っていた。彼女にならば、事情を打ち明けられる。"
  },
  {
    chapter: "第二章　姉弟の対面",
    time: "03:26",
    background: "room",
    speaker: "ナレーション",
    text:
      "そして折しも、似成球へ探査ロボットを送り込むロケットの打ち上げが近々予定されているという。"
  },
  {
    chapter: "第二章　姉弟の対面",
    time: "03:26",
    background: "room",
    speaker: "リース",
    text:
      "それに乗れれば、似成球へ戻れる……ということだよな？"
  },
  {
    chapter: "第二章　姉弟の対面",
    time: "03:27",
    background: "room",
    speaker: "アリー",
    text:
      "ええ。もっとも、不法侵入でもしない限り、ロケットには乗れないでしょうけど。"
  },
  {
    chapter: "第二章　姉弟の対面",
    time: "03:27",
    background: "room",
    speaker: "リース",
    text:
      "……つまり、作戦を立てる必要がある、と。"
  },
  {
    chapter: "第二章　姉弟の対面",
    time: "03:28",
    background: "room",
    speaker: "ナレーション",
    text:
      "三人と一台のロケット――夏期休暇は、思わぬ形で幕を開けようとしていた。"
  }
];
