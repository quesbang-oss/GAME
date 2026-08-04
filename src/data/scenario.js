/*
 * シナリオデータ（完全版：リース表情差分・インペリーオン対応）
 * シナリオ内容を一切省略せず、立ち絵演出を強化
 */

// すべての画像パスを一括管理
const ASSETS = {
  backgrounds: {
    // 背景画像は public/images/bg/ 直下にある想定
    world: "/images/bg/world_map.jpg",
    academy: "/images/bg/academy_morning.jpg",
    news: "/images/bg/news_studio.jpg",
    street: "/images/bg/night_street.jpg",
    memory: "/images/bg/memory_blur.jpg",
    awakening: "/images/bg/awakening_light.jpg",
    battle: "/images/bg/battle_effect.jpg",
    home: "/images/bg/living_room.jpg",
    room: "/images/bg/leith_room.jpg",
    lab: "/images/bg/airi_lab.jpg",
    airport: "/images/bg/mona_airport.jpg",
    airplane: "/images/bg/airplane_inside.jpg",
    mona_street: "/images/bg/mona_sunny.jpg",
    manna_entrance: "/images/bg/manna_gate.jpg",
    manna_backyard: "/images/bg/manna_back.jpg",
    manna_scaffold: "/images/bg/manna_high.jpg",
    ceo_office: "/images/bg/ceo_room.jpg",
    prison: "/images/bg/prison.jpg"
  },
  sprites: {
    // スプライト画像はすべて public/images/bg/sprites/ の中にある
    // リース（表情差分）
    reese_normal: "/images/bg/sprites/tuuzyou-reese.png",     // 通常
    reese_closed: "/images/bg/sprites/metuburu-reese.png",     // 目を閉じる
    reese_surprised: "/images/bg/sprites/odoroki-reese.png", // 驚き
    reese_laugh: "/images/bg/sprites/nikkoreese.png",       // 笑う
    reese_goofy: "/images/bg/sprites/huzakereese.png",       // ふざける
    reese_angry: "/images/bg/sprites/kirereese.png",       // 怒り
    reese_awakened: "/images/bg/sprites/kakusei-reese.png", // インペリー・オン（覚醒）

    // その他キャラクター・オブジェクト（画像リストにあるもの）
    elementer: "/images/bg/sprites/erementa-.png",
    donuts: "/images/bg/sprites/donuts_box.png",
    ally: "/images/bg/sprites/ally.png",

    // 以下、画像リストには載っていませんでしたが、同じフォルダにある場合のパスです
    emma: "/images/bg/sprites/emma_uniform.png",
    ally_sparkle: "/images/bg/sprites/ally_happy.png",
    ally_element: "/images/bg/sprites/ally_command.png",
    airi: "/images/bg/sprites/airi_prof.png",
    officer: "/images/bg/sprites/mona_guard.png",
    guard: "/images/bg/sprites/manna_security.png",
    charhan: "/images/bg/sprites/charhan_suit.png"
  }
};

export const scenario = [
  {
    chapter: "世界設定",
    time: "――",
    background: ASSETS.backgrounds.world,
    speaker: "ナレーション",
    text: "この世界の地球――一次球は、太陽系のような単純な回転軌道を持たない。メビウスの輪を思わせる特殊な回転軸によって運行している。"
  },
  {
    chapter: "世界設定",
    time: "――",
    background: ASSETS.backgrounds.world,
    speaker: "ナレーション",
    text: "そのメビウス構造の中心部には、非現実的なほど長い寿命を持つマグネターが存在する。そして一次球の近くを周期する、もう一つの地球がある。"
  },
  {
    chapter: "世界設定",
    time: "――",
    background: ASSETS.backgrounds.world,
    speaker: "ナレーション",
    text: "もう一つの地球は『似成球（にせいきゅう）』と呼ばれている。一次球と似た環境を持ちながら、そこには顔や瞳に謎の模様を浮かべる住人――エレメンターが存在する。"
  },
  {
    chapter: "世界設定",
    time: "――",
    background: ASSETS.backgrounds.world,
    speaker: "ナレーション",
    text: "一次球の人間には見えない魂。しかしエレメンターは魂を具現化し、それを質量として扱うことができる。模様の違いは、彼らが持つさまざまな力――『エレメント』の違いを示している。"
  },
  {
    chapter: "第一章　夏期休暇二日前",
    time: "07:10",
    background: ASSETS.backgrounds.academy,
    speaker: "ナレーション",
    text: "マルケサス（ムー大陸）。超難関校、UN・リスクトリア・アカデミー。高部二年生のリース・レイデンは、いつもの朝を迎えていた。"
  },
  {
    chapter: "第一章　夏期休暇二日前",
    time: "07:12",
    background: ASSETS.backgrounds.academy,
    speaker: "リース",
    text: "……今日も普通の日、か。",
    sprites: [
      { id: "reese", name: "リース", image: ASSETS.sprites.reese_normal, position: "left", action: "enter", anim: "fadeIn" }
    ]
  },
  {
    chapter: "第一章　夏期休暇二日前",
    time: "07:15",
    background: ASSETS.backgrounds.news,
    speaker: "ニュースキャスター",
    text: "続いて臨時ニュースです。西マルケサス上空から、形状が異常に整った物体が落下しました。専門家は、似成球由来の人工衛星である可能性を指摘しています。"
  },
  {
    chapter: "第一章　夏期休暇二日前",
    time: "07:16",
    background: ASSETS.backgrounds.news,
    speaker: "リース",
    text: "似成球の人工衛星……？　落ちてきたってことは、何か壊れたのか？",
    sprites: [
      { id: "reese", image: ASSETS.sprites.reese_surprised, action: "update" }
    ]
  },
  {
    chapter: "第一章　夏期休暇前日",
    time: "19:31",
    background: ASSETS.backgrounds.street,
    speaker: "ナレーション",
    text: "翌日。アカデミーの平均帰宅時間は19時30分。リースは人通りの少ない帰路を一人で歩いていた。",
    sprites: [
      { id: "reese", image: ASSETS.sprites.reese_normal, action: "update" }
    ]
  },
  {
    chapter: "第一章　夏期休暇前日",
    time: "19:34",
    background: ASSETS.backgrounds.street,
    speaker: "リース",
    text: "……ん？　誰かいる？",
    sprites: [
      { id: "reese", image: ASSETS.sprites.reese_surprised, action: "update" }
    ]
  },
  {
    chapter: "第一章　夏期休暇前日",
    time: "19:34",
    background: ASSETS.backgrounds.street,
    speaker: "ナレーション",
    text: "人影が見えた。だが、次の瞬間――何も見えない。なのに、強烈な衝撃がリースを吹き飛ばした。",
    sprites: [
      { id: "reese", image: ASSETS.sprites.reese_surprised, action: "update", effect: "shake" }
    ]
  },
  {
    chapter: "第一章　夏期休暇前日",
    time: "19:35",
    background: ASSETS.backgrounds.street,
    speaker: "リース",
    text: "ぐっ……！　今の、何だ……！",
    sprites: [
      { id: "reese", image: ASSETS.sprites.reese_angry, action: "update" }
    ]
  },
  {
    chapter: "第一章　夏期休暇前日",
    time: "19:35",
    background: ASSETS.backgrounds.street,
    speaker: "ナレーション",
    text: "幼い頃から異常なほど運動能力に恵まれていたリースは、とっさに受け身を取り、大きな怪我を免れた。しかしダメージは重い。"
  },
  {
    chapter: "第一章　夏期休暇前日",
    time: "19:36",
    background: ASSETS.backgrounds.street,
    speaker: "ナレーション",
    text: "街灯が人影を照らす。そこにいたのは、一見すれば普通の人間だった。だが顔にはタトゥーのような紋様。そして右目には、ターゲットスコープを思わせる模様。",
    sprites: [
      { id: "elementer", name: "エレメンター", image: ASSETS.sprites.elementer, position: "right", action: "enter", anim: "slideInRight" }
    ]
  },
  {
    chapter: "第一章　夏期休暇前日",
    time: "19:36",
    background: ASSETS.backgrounds.street,
    speaker: "リース",
    text: "……エレメンター。",
    sprites: [
      { id: "reese", image: ASSETS.sprites.reese_surprised, action: "update" }
    ]
  },
  {
    chapter: "第一章　夏期休暇前日",
    time: "19:37",
    background: ASSETS.backgrounds.street,
    speaker: "ナレーション",
    text: "衛星科で習った似成球の知識が、頭の中を駆け巡る。先日の人工衛星らしき落下物。もし、そこからこの存在が出てきたのだとしたら――。"
  },
  {
    chapter: "第一章　夏期休暇前日",
    time: "19:37",
    background: ASSETS.backgrounds.street,
    speaker: "ナレーション",
    text: "敵のエレメントは『慧眼』。魂の形を見て対象を一つに絞り、その存在を見通す力。隠れることはできない。体勢、体温、表情まで把握される。"
  },
  {
    chapter: "第一章　夏期休暇前日",
    time: "19:38",
    background: ASSETS.backgrounds.street,
    speaker: "リース",
    text: "……逃げるしかない。人間の俺が、エレメンターに勝てるわけがない。",
    sprites: [
      { id: "reese", image: ASSETS.sprites.reese_angry, action: "update" }
    ]
  },
  {
    chapter: "第一章　夏期休暇前日",
    time: "19:39",
    background: ASSETS.backgrounds.street,
    speaker: "ナレーション",
    text: "しかし、逃走はあっけなく終わった。リースは捕らえられ、死の気配がすぐそこまで迫る。"
  },
  {
    chapter: "第一章　夏期休暇前日",
    time: "19:39",
    background: ASSETS.backgrounds.street,
    speaker: "リース",
    text: "……これ、だけでも……！",
    sprites: [
      { id: "reese", image: ASSETS.sprites.reese_angry, action: "update", effect: "shake" }
    ]
  },
  {
    chapter: "第一章　夏期休暇前日",
    time: "19:39",
    background: ASSETS.backgrounds.street,
    speaker: "ナレーション",
    text: "リースの手にあったのは、常備していた懐中電灯。帰路が暗いことを知っていたから持ち歩いていたものだ。"
  },
  {
    chapter: "第一章　夏期休暇前日",
    time: "19:39",
    background: ASSETS.backgrounds.street,
    speaker: "ナレーション",
    text: "偶然にも強い光がエレメンターの右目を直撃する。"
  },
  {
    chapter: "第一章　夏期休暇前日",
    time: "19:39",
    background: ASSETS.backgrounds.street,
    speaker: "エレメンター",
    text: "――ッ……！",
    sprites: [
      { id: "elementer", action: "update", effect: "shake" }
    ]
  },
  {
    chapter: "第一章　夏期休暇前日",
    time: "19:40",
    background: ASSETS.backgrounds.street,
    speaker: "リース",
    text: "今だ……！",
    sprites: [
      { id: "reese", image: ASSETS.sprites.reese_angry, action: "update", anim: "bounce" }
    ]
  },
  {
    chapter: "第一章　夏期休暇前日",
    time: "19:40",
    background: ASSETS.backgrounds.street,
    speaker: "ナレーション",
    text: "逃げようとした。だが、足がもつれて転ぶ。もう駄目だ――そう思った瞬間、幼い頃の記憶が蘇った。",
    sprites: [
      { id: "reese", image: ASSETS.sprites.reese_surprised, action: "update" }
    ]
  },
  {
    chapter: "第一章　夏期休暇前日",
    time: "――",
    background: ASSETS.backgrounds.memory,
    speaker: "母",
    text: "リース。もし、とんでもない危機が来たらね。いいおまじないがあるの。"
  },
  {
    chapter: "第一章　夏期休暇前日",
    time: "――",
    background: ASSETS.backgrounds.memory,
    speaker: "母",
    text: "『インペリー・オン』。頭の片隅に、ちゃんとしまっておくのよ。"
  },
  {
    chapter: "第一章　夏期休暇前日",
    time: "19:40",
    background: ASSETS.backgrounds.awakening,
    speaker: "リース",
    text: "……インペリー・オン。",
    sprites: [
      { id: "reese", image: ASSETS.sprites.reese_awakened, action: "update", effect: "glow" }
    ]
  },
  {
    chapter: "第一章　夏期休暇前日",
    time: "19:40",
    background: ASSETS.backgrounds.awakening,
    speaker: "ナレーション",
    text: "強く願った。助かりたい。生きたい。エマを残して、こんなところで終わりたくない。"
  },
  {
    chapter: "第一章　夏期休暇前日",
    time: "19:40",
    background: ASSETS.backgrounds.awakening,
    speaker: "ナレーション",
    text: "その瞬間、リースの肩にエレメンターとよく似た紋様が浮かび上がった。そして瞳には、十字の模様が刻まれる。"
  },
  {
    chapter: "第一章　夏期休暇前日",
    time: "19:40",
    background: ASSETS.backgrounds.awakening,
    speaker: "エレメンター",
    text: "……何、だ……それは……。",
    sprites: [
      { id: "elementer", action: "update", effect: "shake" }
    ]
  },
  {
    chapter: "第一章　夏期休暇前日",
    time: "19:40",
    background: ASSETS.backgrounds.battle,
    speaker: "ナレーション",
    text: "リースは悟った。今なら、反撃できる。"
  },
  {
    chapter: "第一章　夏期休暇前日",
    time: "19:40",
    background: ASSETS.backgrounds.battle,
    speaker: "リース",
    text: "うおおおおおっ！",
    sprites: [
      { id: "reese", image: ASSETS.sprites.reese_awakened, action: "update", anim: "bounce" }
    ]
  },
  {
    chapter: "第一章　夏期休暇前日",
    time: "19:40",
    background: ASSETS.backgrounds.battle,
    speaker: "ナレーション",
    text: "次の瞬間、リースはエレメンターへ突進した。その速度は、F1カーの速度を優に超えていた――。"
  },
  {
    chapter: "第一章　夏期休暇前日",
    time: "19:41",
    background: ASSETS.backgrounds.battle,
    speaker: "ナレーション",
    text: "エレメンターは息絶えた。すると顔の紋様が消え、そこには普通の人間のような姿だけが残った。",
    sprites: [
      { id: "elementer", action: "exit", anim: "fadeOut" }
    ]
  },
  {
    chapter: "第一章　夏期休暇前日",
    time: "19:43",
    background: ASSETS.backgrounds.street,
    speaker: "リース",
    text: "……帰らないと。",
    sprites: [
      { id: "reese", image: ASSETS.sprites.reese_closed, action: "update" }
    ]
  },
  {
    chapter: "第一章　夏期休暇前日",
    time: "20:02",
    background: ASSETS.backgrounds.home,
    speaker: "エマ",
    text: "お兄ちゃん！　遅かったから、心配したんだよ！",
    sprites: [
      { id: "reese", image: ASSETS.sprites.reese_goofy, position: "left", action: "update" },
      { id: "emma", name: "エマ", image: ASSETS.sprites.emma, position: "right", action: "enter", anim: "slideInRight" }
    ]
  },
  {
    chapter: "第一章　夏期休暇前日",
    time: "20:03",
    background: ASSETS.backgrounds.home,
    speaker: "リース",
    text: "ごめん、エマ。もう大丈夫だから。",
    sprites: [
      { id: "reese", image: ASSETS.sprites.reese_laugh, action: "update" }
    ]
  },
  {
    chapter: "第一章　夏期休暇前日",
    time: "22:31",
    background: ASSETS.backgrounds.room,
    speaker: "ナレーション",
    text: "エマを安心させ、眠りについた。家に帰った頃には、肩の紋様も瞳の模様も消えていた。",
    sprites: [
      { id: "emma", action: "exit", anim: "fadeOut" },
      { id: "reese", image: ASSETS.sprites.reese_normal, position: "center", action: "update" }
    ]
  },
  {
    chapter: "第一章　夏期休暇前日",
    time: "22:32",
    background: ASSETS.backgrounds.room,
    speaker: "リース",
    text: "……いったい、何が起こったんだ。",
    sprites: [
      { id: "reese", image: ASSETS.sprites.reese_closed, action: "update" }
    ]
  },
  {
    chapter: "第一章　夏期休暇前日",
    time: "22:33",
    background: ASSETS.backgrounds.room,
    speaker: "ナレーション",
    text: "そして、夏期休暇が始まる。リースの知らないところで、一次球と似成球をつなぐ何かが、すでに動き始めていた。"
  },

  // ── 分岐ポイント ──────────────────────────────────────────
  {
    chapter: "第一章　夏期休暇前日",
    time: "22:40",
    background: ASSETS.backgrounds.room,
    speaker: "ナレーション",
    text: "ベッドに入ったリースは、明かりを消すかどうか少し迷った。今日はいろいろありすぎた。まだ気持ちが落ち着かない。",
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
    background: ASSETS.backgrounds.room,
    speaker: "リース",
    text: "……今日はいろいろあったな。でも、明日からはいつも通りの夏休みだ。",
    sprites: [
      { id: "reese", image: ASSETS.sprites.reese_closed, action: "update" }
    ]
  },
  {
    chapter: "第一章　夏期休暇前日",
    time: "22:42",
    background: ASSETS.backgrounds.room,
    speaker: "ナレーション",
    text: "電気を消すと、部屋はすぐに静けさに包まれた。今日という日の出来事は、まるで夢だったかのように、静かに眠りの中へ溶けていく。"
  },
  {
    ending: true,
    chapter: "日常エンド",
    time: "――",
    background: ASSETS.backgrounds.room,
    speaker: "END ―― 日常エンド",
    text: "いつも通りの朝が来て、いつも通りの夏休みが始まる。少女の記憶も、紋様の記憶も確かめる術がないまま――リースの平穏な日常は、静かに続いていく。\n\n（このルートはここで終わりです）"
  },

  // ── 第二章　姉弟の対面 ───────────────────────────────────
  {
    id: "ch2-start",
    chapter: "第二章　姉弟の対面",
    time: "03:00",
    background: ASSETS.backgrounds.room,
    speaker: "ナレーション",
    text: "電気をつけたまま、リースはいつの間にか眠ってしまっていた。朝の6時に起きるつもりだったのに、目が覚めたのは午前3時。",
    sprites: [
      { id: "reese", image: ASSETS.sprites.reese_closed, position: "left", action: "enter" }
    ]
  },
  {
    chapter: "第二章　姉弟の対面",
    time: "03:01",
    background: ASSETS.backgrounds.room,
    speaker: "ナレーション",
    text: "メビウス状の回転軸を持つこの星では、この時刻でもすでに日が上っている。だが、そんなことはどうでもよかった。"
  },
  {
    chapter: "第二章　姉弟の対面",
    time: "03:02",
    background: ASSETS.backgrounds.room,
    speaker: "ナレーション",
    text: "窓の縁に、見覚えのない少女が座っていた。年齢は自分と同じくらいだろうか。静かに、リースを見下ろしている。",
    sprites: [
      { id: "ally", name: "アリー", image: ASSETS.sprites.ally, position: "right", action: "enter", anim: "fadeIn" }
    ]
  },
  {
    chapter: "第二章　姉弟の対面",
    time: "03:02",
    background: ASSETS.backgrounds.room,
    speaker: "リース",
    text: "……夢, か……？",
    sprites: [
      { id: "reese", image: ASSETS.sprites.reese_surprised, action: "update" }
    ]
  },
  {
    chapter: "第二章　姉弟の対面",
    time: "03:03",
    background: ASSETS.backgrounds.room,
    speaker: "ナレーション",
    text: "飛び起きた。だが、これは夢ではない。何より、彼女からは昨日戦ったエレメンターと同じ気配がする。"
  },
  {
    chapter: "第二章　姉弟の対面",
    time: "03:04",
    background: ASSETS.backgrounds.awakening,
    speaker: "リース",
    text: "……インペリー・オン。",
    sprites: [
      { id: "reese", image: ASSETS.sprites.reese_awakened, action: "update", effect: "glow" }
    ]
  },
  {
    chapter: "第二章　姉弟の対面",
    time: "03:04",
    background: ASSETS.backgrounds.awakening,
    speaker: "ナレーション",
    text: "再び唱えると、肩と瞳に紋様が浮かび上がる。すると――少女の姿にも、変化が起きた。",
    sprites: [
      { id: "ally", effect: "glow" }
    ]
  },
  {
    chapter: "第二章　姉弟の対面",
    time: "03:04",
    background: ASSETS.backgrounds.awakening,
    speaker: "ナレーション",
    text: "バラを思わせる模様が顎から鎖骨にかけて浮かび上がり、左目には五芒星の紋様が刻まれる。"
  },
  {
    chapter: "第二章　姉弟の対面",
    time: "03:05",
    background: ASSETS.backgrounds.awakening,
    speaker: "アリー",
    text: "アガルタ――あなたたちが似成球と呼ぶ星にある、とある国の第二皇女。アーグリヌ・ペトゥシュワ・ドルハダス。愛称でアリーと呼んで。"
  },
  {
    chapter: "第二章　姉弟の対面",
    time: "03:12",
    background: ASSETS.backgrounds.room,
    speaker: "アリー",
    text: "ええ。私の理解が正しければ――あなたは、私の弟ということになるわね。"
  },
  {
    chapter: "第二章　姉弟の対面",
    time: "03:13",
    background: ASSETS.backgrounds.room,
    speaker: "リース",
    text: "お、俺が弟……！？ 嘘だろ！？",
    sprites: [
      { id: "reese", image: ASSETS.sprites.reese_surprised, action: "update", effect: "shake" }
    ]
  },
  {
    chapter: "第二章　姉弟の対面",
    time: "03:15",
    background: ASSETS.backgrounds.room,
    speaker: "ナレーション",
    text: "ちょうどそこへ、リースを起こしに来たエマが部屋に入ってくる。",
    sprites: [
      { id: "ally", action: "update", position: "right" },
      { id: "reese", image: ASSETS.sprites.reese_goofy, position: "center", action: "update" },
      { id: "emma", name: "エマ", image: ASSETS.sprites.emma, position: "left", action: "enter", anim: "slideInLeft" }
    ]
  },
  {
    chapter: "第二章　姉弟の対面",
    time: "03:15",
    background: ASSETS.backgrounds.room,
    speaker: "エマ",
    text: "お兄ちゃん、そろそろ起き……",
    sprites: [
      { id: "emma", effect: "shake" }
    ]
  },
  {
    chapter: "第二章　姉弟の対面",
    time: "03:16",
    background: ASSETS.backgrounds.room,
    speaker: "ナレーション",
    text: "言葉が途中で止まる。エマはその体勢を見て、ゆっくりとドアを閉めた。",
    sprites: [
      { id: "emma", action: "exit", anim: "slideOutLeft" },
      { id: "reese", image: ASSETS.sprites.reese_surprised, action: "update" }
    ]
  },
  {
    chapter: "第二章　姉弟の対面",
    time: "03:28",
    background: ASSETS.backgrounds.room,
    speaker: "ナレーション",
    text: "三人と一台のロケット――夏期休暇は、思わぬ形で幕を開けようとしていた。"
  },

  // ── 第二章　続き：渡航準備 ───────────────────────────────────
  {
    id: "ch2-lab",
    chapter: "第二章　渡航準備",
    time: "09:00",
    background: ASSETS.backgrounds.lab,
    speaker: "葛城教授",
    text: "……なるほど。事情は把握したわ。ロケットのある『MONA』へ行く必要があるけれど、問題は彼女のパスポートね。",
    sprites: [
      { id: "reese", image: ASSETS.sprites.reese_normal, position: "center", action: "update" },
      { id: "ally", action: "update", position: "right" },
      { id: "airi", name: "葛城愛莉", image: ASSETS.sprites.airi, position: "left", action: "enter", anim: "slideInLeft" }
    ]
  },
  {
    chapter: "第二章　渡航準備",
    time: "09:07",
    background: ASSETS.backgrounds.lab,
    speaker: "アリー",
    text: "……っ、あんまり見ないで。なんだか、中身を全部引きずり出されたみたいで恥ずかしいわ……。",
    sprites: [
      { id: "ally", effect: "shake" }
    ]
  },
  {
    chapter: "第二章　渡航準備",
    time: "15:10",
    background: ASSETS.backgrounds.airport,
    speaker: "ナレーション",
    text: "空港の駐車場裏、人気のない一角。葛城教授が用意してくれた特大のトランクが、リースの足元にどんと置かれていた。",
    sprites: [
      { id: "airi", action: "exit", anim: "fadeOut" },
      { id: "reese", image: ASSETS.sprites.reese_normal, position: "left", action: "update" }
    ]
  },
  {
    chapter: "第二章　渡航準備",
    time: "15:11",
    background: ASSETS.backgrounds.airport,
    speaker: "リース",
    text: "……本当に、これに入ってもらうしかないのか。",
    sprites: [
      { id: "reese", image: ASSETS.sprites.reese_surprised, action: "update" }
    ]
  },
  {
    chapter: "第二章　渡航準備",
    time: "15:11",
    background: ASSETS.backgrounds.airport,
    speaker: "アリー",
    text: "皇女である私が、まさか手荷物にされる日が来るなんてね。……正直、冗談じゃないわ。",
    sprites: [
      { id: "ally", effect: "shake" }
    ]
  },
  {
    chapter: "第二章　渡航準備",
    time: "15:12",
    background: ASSETS.backgrounds.airport,
    speaker: "リース",
    text: "……ごめん。空気穴はちゃんと開けてあるし、中身もクッションで詰めてある。できるだけ急いで済ませるから。",
    sprites: [
      { id: "reese", image: ASSETS.sprites.reese_goofy, action: "update" }
    ]
  },
  {
    chapter: "第二章　渡航準備",
    time: "15:13",
    background: ASSETS.backgrounds.airport,
    speaker: "アリー",
    text: "そういう問題じゃ、ないのだけれど……。まあ、いいわ。可愛い弟の頼みだもの。"
  },
  {
    chapter: "第二章　渡航準備",
    time: "15:14",
    background: ASSETS.backgrounds.airport,
    speaker: "ナレーション",
    text: "アリーは深く息をつくと、身を縮めてトランクの中に収まった。蓋を閉じる直前、くぐもった声が聞こえる。",
    sprites: [
      { id: "ally", action: "exit", anim: "fadeOut" }
    ]
  },
  {
    chapter: "第二章　渡航準備",
    time: "15:14",
    background: ASSETS.backgrounds.airport,
    speaker: "アリー（トランクの中）",
    text: "……もし変な人に中を覗かれたら、承知しないんだから。"
  },
  {
    chapter: "第二章　渡航準備",
    time: "15:15",
    background: ASSETS.backgrounds.airport,
    speaker: "リース",
    text: "分かってる、分かってるから。……よし、行くぞ。",
    sprites: [
      { id: "reese", image: ASSETS.sprites.reese_laugh, action: "update" }
    ]
  },
  {
    chapter: "第二章　渡航準備",
    time: "15:25",
    background: ASSETS.backgrounds.airport,
    speaker: "ナレーション",
    text: "見た目に反してずしりと重いトランクを引きずり、リースはMONA直通便のカウンターへ向かった。慣れない重さに、腕が悲鳴を上げる。",
    sprites: [
      { id: "reese", image: ASSETS.sprites.reese_angry, action: "update" }
    ]
  },
  {
    chapter: "第二章　渡航準備",
    time: "15:35",
    background: ASSETS.backgrounds.airport,
    speaker: "ナレーション",
    text: "手荷物カウンターでのチェックインは、拍子抜けするほどあっさり終わった。だが問題はこの先――大型の荷物は、例外なくX線検査の対象になるという。"
  },
  {
    chapter: "第二章　渡航準備",
    time: "15:39",
    background: ASSETS.backgrounds.airport,
    speaker: "リース",
    text: "……頼む。うまく、誤魔化してくれよ。",
    sprites: [
      { id: "reese", image: ASSETS.sprites.reese_closed, action: "update" }
    ]
  },
  {
    chapter: "第二章　渡航準備",
    time: "15:45",
    background: ASSETS.backgrounds.airport,
    speaker: "ナレーション",
    text: "手荷物検査室。ベルトコンベアに乗せられたトランクが、ゆっくりとX線装置の中へ吸い込まれていく。"
  },
  {
    chapter: "第二章　渡航準備",
    time: "15:46",
    background: ASSETS.backgrounds.airport,
    speaker: "ナレーション",
    text: "モニターには、うずくまるアリーの魂の輪郭が「白い岩」のような影となって映し出されている。係員の目つきが険しくなった。リースは焦りを抑えて答えた。",
    sprites: [
      { id: "reese", image: ASSETS.sprites.reese_surprised, action: "update", effect: "shake" }
    ],
    choices: [
      { label: "市場で買った記念品の庭石だよ", next: "airport-success" },
      { label: "最新式の超重量ポータブル蓄電池だよ", next: "end-detained-battery" },
      { label: "実は, 家出した妹が中に入ってて……", next: "end-detained-sister" }
    ]
  },

  // ── 連行エンド A（失敗） ──────────────────────────────
  {
    id: "end-detained-battery",
    chapter: "第二章　渡航準備",
    time: "15:47",
    background: ASSETS.backgrounds.airport,
    speaker: "空港係員",
    text: "蓄電池だと？　今のX線に映ったのは、どう見ても有機的な『塊』だったぞ。嘘をつくな、開けなさい！",
    sprites: [
      { id: "reese", image: ASSETS.sprites.reese_surprised, position: "left", action: "update" },
      { id: "officer", name: "空港係員", image: ASSETS.sprites.officer, position: "right", action: "enter", anim: "slideInRight" }
    ]
  },
  {
    ending: true,
    chapter: "連行エンド",
    time: "――",
    background: ASSETS.backgrounds.prison,
    speaker: "END",
    text: "厳しい取り調べが始まった。アリーはMONAの秘密研究機関へと連行され、リースの夏休みは冷たい檻の中で終わりを迎えた。"
  },

  // ── 連行エンド B（失敗） ──────────────────────────────
  {
    id: "end-detained-sister",
    chapter: "第二章　渡航準備",
    time: "15:47",
    background: ASSETS.backgrounds.airport,
    speaker: "空港係員",
    text: "……冗談のつもりか？　もし本当なら誘拐か密入国の幇助だ。別室で詳しく話を聞かせてもらおうか。",
    sprites: [
      { id: "reese", image: ASSETS.sprites.reese_surprised, position: "left", action: "update" },
      { id: "officer", name: "空港係員", image: ASSETS.sprites.officer, position: "right", action: "enter", anim: "slideInRight", effect: "shake" }
    ]
  },
  {
    ending: true,
    chapter: "連行エンド",
    time: "――",
    background: ASSETS.backgrounds.prison,
    speaker: "END",
    text: "空港のセキュリティを甘く見たのが運の尽きだった。二人の旅は空港のロビーで幕を閉じた。"
  },

  // ── 成功（物語継続） ────────────────────────────────
  {
    id: "airport-success",
    chapter: "第二章　渡航準備",
    time: "15:51",
    background: ASSETS.backgrounds.airport,
    speaker: "空港係員",
    text: "ふん、物好きな学生だな……。超過料金は払ってあるか？ よし、通れ。",
    sprites: [
      { id: "reese", image: ASSETS.sprites.reese_closed, position: "left", action: "update" },
      { id: "officer", name: "空港係員", image: ASSETS.sprites.officer, position: "right", action: "enter" }
    ]
  },
  {
    chapter: "第二章　渡航準備",
    time: "19:00",
    background: ASSETS.backgrounds.airplane,
    speaker: "ナレーション",
    text: "無事に機内へ。トランクの中でアリーは、魂を見られた恥ずかしさと、皇女を荷物扱いしたリースへの不満で悶絶していたという……。",
    sprites: [
      { id: "reese", image: ASSETS.sprites.reese_laugh, position: "center", action: "update" },
      { id: "officer", action: "exit", anim: "fadeOut" }
    ]
  },

  // ── MONA到着 ──
  {
    chapter: "第二章　渡航準備",
    time: "08:31",
    background: ASSETS.backgrounds.mona_street,
    speaker: "アリー",
    text: "あ、うああっ……！　まぶし, い……っ！",
    sprites: [
      { id: "reese", image: ASSETS.sprites.reese_goofy, position: "left", action: "enter" },
      { id: "ally", name: "アリー", image: ASSETS.sprites.ally, position: "center", action: "enter", anim: "bounce", effect: "shake" }
    ]
  },
  {
    chapter: "第二章　渡航準備",
    time: "10:05",
    background: ASSETS.backgrounds.mona_street,
    speaker: "アリー",
    text: "ふふ、この『さんぐらす』というもの, 暗縁雲のフィルターを通した景色みたいで素敵ね。気に入ったわ。",
    sprites: [
      { id: "reese", image: ASSETS.sprites.reese_laugh, action: "update" },
      { id: "ally", image: ASSETS.sprites.ally_sparkle, action: "update", effect: "glow" }
    ]
  },
  {
    chapter: "第二章　渡航準備",
    time: "10:07",
    background: ASSETS.backgrounds.mona_street,
    speaker: "アリー",
    text: "……っ！　触らないで。これはもう、私の一部なんだから。",
    sprites: [
      { id: "reese", image: ASSETS.sprites.reese_goofy, action: "update", effect: "shake" },
      { id: "ally", action: "update", position: "right", effect: "shake" }
    ]
  },
  {
    chapter: "第二章　渡航準備",
    time: "10:08",
    background: ASSETS.backgrounds.mona_street,
    speaker: "ナレーション",
    text: "リースがサングラスに手を伸ばすと、アリーはムスッとした表情で顔を背けた。ここ数日で彼女にできた、新しい「癖」だった。",
    sprites: [
      { id: "ally", action: "exit", anim: "fadeOut" },
      { id: "reese", action: "exit", anim: "fadeOut" }
    ]
  },

  // ── 第三章 ──
  // ── 第三章　潜入作戦 ──
  {
    chapter: "第三章　潜入作戦",
    time: "13:00",
    background: ASSETS.backgrounds.manna_entrance,
    speaker: "ナレーション",
    text: "二人はついに、ロケットを保有する超巨大企業『MANNA（マナ）』の本社ビル前へと辿り着いた。入り口には屈強な警備員が数名、目を光らせている。"
  },
  {
    chapter: "第三章　潜入作戦",
    time: "13:02",
    background: ASSETS.backgrounds.manna_entrance,
    speaker: "リース",
    text: "（……よし、予定通りに。アリー、合図したら動くぞ）",
    sprites: [
      { id: "reese", name: "リース", image: ASSETS.sprites.reese_angry, position: "left", action: "enter" }
    ]
  },
  {
    chapter: "第三章　潜入作戦",
    time: "13:03",
    background: ASSETS.backgrounds.manna_entrance,
    speaker: "ナレーション",
    text: "リースは抱えていた大きな箱をわざとらしく落とした。中からは、甘い香りを放つ大量のドーナツが転がり出る。",
    sprites: [
      { id: "donuts", name: "ドーナツ", image: ASSETS.sprites.donuts, position: "center", action: "enter", anim: "bounce" }
    ]
  },
  {
    chapter: "第三章　潜入作戦",
    time: "13:04",
    background: ASSETS.backgrounds.manna_entrance,
    speaker: "警備員",
    text: "おいおい、何やってんだ学生さん。……ん？ なんだこの美味そうな匂いは……。",
    sprites: [
      { id: "guard", name: "警備員", image: ASSETS.sprites.guard, position: "right", action: "enter", anim: "slideInRight" }
    ]
  },
  {
    chapter: "第三章　潜入作戦",
    time: "13:04",
    background: ASSETS.backgrounds.manna_entrance,
    speaker: "アリー",
    text: "わあ……！ 一次球にはこんなに丸くて魅力的な食べ物があるのね……！",
    sprites: [
      { id: "ally", name: "アリー", image: ASSETS.sprites.ally_sparkle, position: "center", action: "enter", anim: "bounce", effect: "glow" }
    ]
  },
  {
    chapter: "第三章　潜入作戦",
    time: "13:05",
    background: ASSETS.backgrounds.manna_entrance,
    speaker: "リース",
    text: "（待て待て待て！ なんでお前まで釣られてるんだよ！ 行くぞ！）",
    sprites: [
      { id: "reese", image: ASSETS.sprites.reese_surprised, action: "update", effect: "shake" },
      { id: "ally", action: "update", effect: "shake" }
    ]
  },
  {
    chapter: "第三章　潜入作戦",
    time: "13:06",
    background: ASSETS.backgrounds.manna_entrance,
    speaker: "ナレーション",
    text: "ドーナツに夢中になる警備員の隙をつき、リースはアリーを連れ戻し、どうにかしてここで隠れれそうな場所を探した。",
    sprites: [
      { id: "donuts", action: "exit", anim: "fadeOut" },
      { id: "guard", action: "exit", anim: "fadeOut" },
      { id: "ally", action: "exit", anim: "fadeOut" },
      { id: "reese", action: "exit", anim: "fadeOut" }
    ]
  },
  {
    chapter: "第三章　潜入作戦",
    time: "13:15",
    background: ASSETS.backgrounds.manna_backyard,
    speaker: "ナレーション",
    text: "裏手に回ると、使われていなさそうな非常用の梯子を見つけた。人目がないのを確かめ、二人は足音を殺しながらそれを登っていく。"
  },
  {
    chapter: "第三章　潜入作戦",
    time: "13:20",
    background: ASSETS.backgrounds.manna_scaffold,
    speaker: "リース",
    text: "……あそこがプログラム室、か。だが、それだけじゃ駄目だ。今回の計画は、社長のオフィスを押さえないと成功しない。",
    sprites: [
      { id: "reese", name: "リース", image: ASSETS.sprites.reese_angry, position: "left", action: "enter" },
      { id: "ally", name: "アリー", image: ASSETS.sprites.ally, position: "right", action: "enter", anim: "fadeIn" }
    ]
  },
  {
    chapter: "第三章　潜入作戦",
    time: "13:22",
    background: ASSETS.backgrounds.manna_scaffold,
    speaker: "アリー",
    text: "なら、私のエレメントの出番ね。……あまり見せたくはないのだけれど。"
  },
  {
    chapter: "第三章　潜入作戦",
    time: "13:23",
    background: ASSETS.backgrounds.manna_scaffold,
    speaker: "ナレーション",
    text: "ここでアリーがエレメンターとしての力を使うことに。彼女は皇女らしい『服従』の力を有しているようで。",
    sprites: [
      { id: "ally", action: "update", image: ASSETS.sprites.ally_element, effect: "glow" }
    ]
  },
  {
    chapter: "第三章　潜入作戦",
    time: "13:24",
    background: ASSETS.backgrounds.manna_scaffold,
    speaker: "アリー",
    text: "しかし、効果範囲は相当狭いし、相手を30秒ぐらい見ていないと発動しないらしいわ。……結構、忍耐が必要なのよ。",
    sprites: [
      { id: "ally", action: "update", effect: "none" }
    ]
  },

  {
    chapter: "第三章　潜入作戦",
    time: "13:26",
    background: ASSETS.backgrounds.manna_scaffold,
    speaker: "ナレーション",
    text: "見下ろすと、非常口のすぐそばで、社員証を首から下げた技術者らしき男が一人、警備端末をいじっているのが見えた。"
  },
  {
    chapter: "第三章　潜入作戦",
    time: "13:27",
    background: ASSETS.backgrounds.manna_scaffold,
    speaker: "リース",
    text: "……あの扉、社員証がないと開かなそうだな。あの人に頼るしかないか。",
    sprites: [
      { id: "reese", image: ASSETS.sprites.reese_normal, action: "update" }
    ]
  },
  {
    chapter: "第三章　潜入作戦",
    time: "13:27",
    background: ASSETS.backgrounds.manna_scaffold,
    speaker: "アリー",
    text: "だったら、私の出番ね。……油断しないでよ、リース。ここからが本番なんだから。",
    sprites: [
      { id: "ally", effect: "glow" }
    ]
  },
  {
    chapter: "第三章　潜入作戦",
    time: "13:28",
    background: ASSETS.backgrounds.manna_scaffold,
    speaker: "ナレーション",
    text: "効果範囲が狭いというアリーの言葉を思い出し、二人は梯子を静かに降り、物陰伝いに男との距離を詰めた。"
  },
  {
    chapter: "第三章　潜入作戦",
    time: "13:29",
    background: ASSETS.backgrounds.manna_scaffold,
    speaker: "ナレーション",
    text: "アリーは息を潜め、じっと男を見つめ始めた。左目の五芒星の紋様が、ゆっくりと熱を帯びていく。"
  },
  {
    chapter: "第三章　潜入作戦",
    time: "13:29",
    background: ASSETS.backgrounds.manna_scaffold,
    speaker: "ナレーション",
    text: "……5秒。男はまだ何も気づいていない。"
  },
  {
    chapter: "第三章　潜入作戦",
    time: "13:29",
    background: ASSETS.backgrounds.manna_scaffold,
    speaker: "ナレーション",
    text: "……15秒。ふと、男が顔を上げかけた。視線が、こちらへ向かおうとしている。",
    choices: [
      { label: "リースが物音を立てて気を逸らす", next: "elem-noise" },
      { label: "アリーの集中を信じて動かない", next: "elem-still" }
    ]
  },

  {
    id: "elem-noise",
    chapter: "第三章　潜入作戦",
    time: "13:30",
    background: ASSETS.backgrounds.manna_scaffold,
    speaker: "ナレーション",
    text: "リースはすぐそばに落ちていた空き缶を、そっと壁の向こうへ蹴り飛ばした。乾いた音が響く。",
    sprites: [
      { id: "reese", image: ASSETS.sprites.reese_angry, action: "update" }
    ]
  },
  {
    chapter: "第三章　潜入作戦",
    time: "13:31",
    background: ASSETS.backgrounds.manna_scaffold,
    speaker: "ナレーション",
    text: "男は「……猫か？」とつぶやき、音のした方へ視線を移す。アリーへの注意は、それきり逸れていった。",
    choices: [
      { label: "（続ける）", next: "elem-resolve" }
    ]
  },

  {
    id: "elem-still",
    chapter: "第三章　潜入作戦",
    time: "13:30",
    background: ASSETS.backgrounds.manna_scaffold,
    speaker: "ナレーション",
    text: "リースはあえて動かず、アリーの集中を信じて息を止めた。男の視線が、二人の隠れる物陰のすぐ手前で止まる。",
    sprites: [
      { id: "reese", image: ASSETS.sprites.reese_closed, action: "update" }
    ]
  },
  {
    chapter: "第三章　潜入作戦",
    time: "13:31",
    background: ASSETS.backgrounds.manna_scaffold,
    speaker: "ナレーション",
    text: "……20秒。心臓の音まで聞こえそうな沈黙。だが男は、なぜか興味をなくしたようにまた端末へ向き直った。"
  },

  {
    id: "elem-resolve",
    chapter: "第三章　潜入作戦",
    time: "13:32",
    background: ASSETS.backgrounds.manna_scaffold,
    speaker: "ナレーション",
    text: "……30秒。男の瞳から、ふっと光が消えた。焦点の合わない、ぼんやりとした表情に変わる。"
  },
  {
    chapter: "第三章　潜入作戦",
    time: "13:32",
    background: ASSETS.backgrounds.manna_scaffold,
    speaker: "アリー",
    text: "……はい。これでこの人は、しばらく私の『声』に従うわ。あまり手荒な真似はしたくないのだけれど。",
    sprites: [
      { id: "ally", effect: "none" }
    ]
  },
  {
    chapter: "第三章　潜入作戦",
    time: "13:33",
    background: ASSETS.backgrounds.manna_scaffold,
    speaker: "アリー",
    text: "――その端末の鍵を開けて、少しの間、目を離しなさい。"
  },
  {
    chapter: "第三章　潜入作戦",
    time: "13:33",
    background: ASSETS.backgrounds.manna_scaffold,
    speaker: "ナレーション",
    text: "男は虚ろな表情のまま小さく頷くと、端末を操作して扉を開け放ち、ふらふらとその場を離れていった。"
  },
  {
    chapter: "第三章　潜入作戦",
    time: "13:34",
    background: ASSETS.backgrounds.manna_scaffold,
    speaker: "リース",
    text: "……助かった。でも大丈夫か？　心なしか、顔が青いぞ。",
    sprites: [
      { id: "reese", image: ASSETS.sprites.reese_normal, action: "update" }
    ]
  },
  {
    chapter: "第三章　潜入作戦",
    time: "13:34",
    background: ASSETS.backgrounds.manna_scaffold,
    speaker: "アリー",
    text: "平気よ。ただ、他人の意識に踏み込むのは、あまり気持ちのいいものじゃないの。……早く済ませましょう。",
    sprites: [
      { id: "ally", action: "update", position: "center" }
    ]
  },
  {
    chapter: "第三章　潜入作戦",
    time: "13:36",
    background: ASSETS.backgrounds.manna_scaffold,
    speaker: "ナレーション",
    text: "開いたままの扉から、二人は静かに社内へと滑り込んだ。エレベーターホールを抜け、目的の階を目指す。"
  },

  {
    chapter: "第三章　潜入作戦",
    time: "13:40",
    background: ASSETS.backgrounds.ceo_office,
    speaker: "ナレーション",
    text: "そして、社長のオフィスに来た。",
    sprites: [
      { id: "reese", image: ASSETS.sprites.reese_normal, position: "left", action: "enter" },
      { id: "ally", action: "update", position: "center" }
    ]
  },
  {
    chapter: "第三章　潜入作戦",
    time: "13:42",
    background: ASSETS.backgrounds.ceo_office,
    speaker: "ナレーション",
    text: "あとは社長であるチャーハン・ボールマンを待つことに。",
    sprites: [
      { id: "reese", image: ASSETS.sprites.reese_closed, action: "update" },
      { id: "ally", action: "update", position: "right" }
    ]
  },
  {
    chapter: "第三章　潜入作戦",
    time: "13:51",
    background: ASSETS.backgrounds.ceo_office,
    speaker: "チャーハン・ボールマン",
    text: "やあ。私のデスクに勝手に座っている不届き者は、君たちかな？",
    sprites: [
      { id: "reese", image: ASSETS.sprites.reese_surprised, position: "left", action: "update", effect: "shake" },
      { id: "charhan", name: "チャーハン・ボールマン", image: ASSETS.sprites.charhan, position: "center", action: "enter", anim: "slideInRight" }
    ]
  }
];
